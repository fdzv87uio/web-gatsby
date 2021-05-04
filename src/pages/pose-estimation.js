import React, { useEffect, useRef, useState } from "react"
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import { Camera } from "react-cam"
import * as S from "../styles/pose_estimation.styles"
import WelcomePages from "../layouts/WelcomePages"
import { observer } from "mobx-react"
import UserStore from "../stores/UserStore"
import {
  drawKeypoints,
  drawSkeleton,
  drawPoint,
} from "../utils/tensorflow-utils"

const PoseEstimation = observer(() => {
  // refs for both the webcam and canvas components
  const camRef = useRef(null)
  const canvasRef = useRef(null)
  // Gyroscope coordinates
  const [alpha, setAlpha] = useState()
  const [beta, setBeta] = useState()
  const [gamma, setGamma] = useState()

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.navigator !== "undefined"
    ) {
      runGyroscope()
      runPosenet()
    }
  }, [])
  // //load rotation coordinates

  function runGyroscope() {
    var res = window.addEventListener("deviceorientation", handleOrientation)
  }

  const handleOrientation = event => {
    console.log(event)
    if (event) {
      var a = event.alpha
      var b = event.beta
      var g = event.gamma

      setAlpha(a)
      setBeta(b)
      setGamma(g)
    } else {
      setAlpha(0)
      setBeta(0)
      setGamma(0)
    }
  }
  // // // load and run posenet function

  async function runPosenet() {
    const net = await posenet.load({
      inputResolution: { width: 320, height: 320 },
      scale: 0.5,
    })

    setInterval(() => {
      detect(net)
    }, 100)
  }

  const detect = async net => {
    if (
      typeof camRef.current.camRef.current !== "undefined" &&
      camRef.current.camRef.current !== null &&
      camRef.current.camRef.current.readyState == 4
    ) {
      // Get Video Properties
      const video = camRef.current.camRef.current
      const videoWidth = camRef.current.props.width
      const videoHeight = camRef.current.props.height

      // Make detections
      const pose = await net.estimateSinglePose(video)
      console.log(pose)
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef)
    }
  }

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d")
    canvas.current.width = videoWidth
    canvas.current.height = videoHeight

    var kp = pose["keypoints"]
    drawKeypoints(kp, 0.35, ctx)
  }

  function capture(imgSrc) {
    console.log(imgSrc)
  }

  return (
    <WelcomePages>
      <S.PageWrapper>
        {typeof window !== "undefined" &&
        typeof window.navigator !== "undefined" ? (
          <Camera
            showFocus={true}
            front={false}
            capture={capture}
            ref={camRef}
            width="320"
            height="320"
          />
        ) : null}
        {typeof window !== "undefined" &&
        typeof window.navigator !== "undefined" ? (
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 9,
              width: 320,
              height: 320,
            }}
          />
        ) : null}
      </S.PageWrapper>
      <p>
        a: {alpha} <br /> b: {beta} <br /> g: {gamma}{" "}
      </p>
    </WelcomePages>
  )
})

export default PoseEstimation
