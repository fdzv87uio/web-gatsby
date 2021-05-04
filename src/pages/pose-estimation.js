import React, { useEffect, useRef, useState } from "react"
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
// import { Camera } from "react-cam"
import { Camera } from "react-camera-pro"
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
  const feedRef = useRef(null)
  // Gyroscope coordinates
  const [alpha, setAlpha] = useState()
  const [beta, setBeta] = useState()
  const [gamma, setGamma] = useState()

  // current image hooks
  const [currentImage, setCurrentImage] = useState()
  // camera ready hook
  const [cameraReady, setCameraReady] = useState()

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.navigator !== "undefined"
    ) {
      runCamera()
      runPosenet()
    }
  }, [])
  // //load rotation coordinates

  // async function runGyroscope() {
  //   let wd = await window.addEventListener(
  //     "deviceorientation",
  //     handleOrientation
  //   )
  //   return (
  //     <div>
  //       <span>alpha:{alpha} </span>
  //       <span>beta:{beta} </span>
  //       <span>gamma:{gamma} </span>
  //     </div>
  //   )
  // }

  // const handleOrientation = event => {
  //   if (event) {
  //     console.log(event)
  //     console.log(event.alpha)
  //     var a = event.alpha
  //     var b = event.beta
  //     var g = event.gamma

  //     setAlpha(a)
  //     setBeta(b)
  //     setGamma(g)
  //   } else {
  //     setAlpha(0)
  //     setBeta(0)
  //     setGamma(0)
  //   }
  // }
  // // // load and run posenet function

  const runPosenet = async () => {
    //run posenet
    const net = await posenet.load({
      inputResolution: { width: 600, height: 600 },
      scale: 0.5,
    })
    if (currentImage !== null) {
      setInterval(() => {
        detect(net)
      }, 100)
    }
  }

  const detect = async net => {
    // Get Video Properties
    const image = feedRef.current
    // Make detections
    const pose = await net.estimateSinglePose(image)
    console.log(pose)
    drawCanvas(pose, 600, 600, canvasRef)
  }

  const drawCanvas = (pose, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d")
    canvas.current.width = videoWidth
    canvas.current.height = videoHeight

    var kp = pose["keypoints"]
    drawKeypoints(kp, 0.35, ctx)
  }

  // function capture(imgSrc) {
  //   console.log(imgSrc)
  // }

  const runCamera = () => {
    setInterval(() => {
      try {
        setCurrentImage(camRef.current.takePhoto())
      } catch (error) {
        if (error) {
          console.log(error)
        }
      }
    }, 100)
  }

  return (
    <WelcomePages>
      <S.PageWrapper>
        <Camera ref={camRef} />
        <S.CameraFeed src={currentImage} ref={feedRef} alt="Nada" />
        <canvas ref={canvasRef} style={{ position: "absolute", top: 0 }} />
      </S.PageWrapper>
    </WelcomePages>
  )
})

export default PoseEstimation
