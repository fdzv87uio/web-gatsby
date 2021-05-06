import React, { useEffect, useRef, useState } from "react"
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
// import { Camera } from "react-camera-pro"
import { Camera } from "react-cam"
import * as S from "../styles/pose_estimation.styles"
import WelcomePages from "../layouts/WelcomePages"
import { observer } from "mobx-react"
import UserStore from "../stores/UserStore"
import { drawKeypoints } from "../utils/tensorflow-utils"
import DeviceOrientation from "react-device-orientation"
import { number } from "prop-types"

const PoseEstimation = observer(() => {
  // refs for both the webcam and canvas components
  const camRef = useRef(null)
  const canvasRef = useRef(null)
  const cIRef = useRef(null)
  // Gyroscope coordinates
  const [alpha, setAlpha] = useState()
  const [beta, setBeta] = useState()
  const [gamma, setGamma] = useState()

  const [log, setLog] = useState()
  // current image hook
  const [gyroscopeOn, setGyroscopeOn] = useState()

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.navigator !== "undefined" 
    ) {
      runPosenet()
      setGyroscopeOn(true)
    }
  }, [])
  // //load rotation coordinates

  // // // load and run posenet function

  async function runPosenet() {
    const net = await posenet.load({
      inputResolution: { width: 320, height: 320 },
      scale: 0.5
    })

    setInterval(() => {
      detect(net)
    }, 500)
  }

  const detect = async net => {
    if (
      typeof camRef.current !== "undefined" &&
      camRef.current !== null &&
      typeof camRef.current.camRef.current !== "undefined" &&
      camRef.current.camRef.current.readyState === 4
    ) {
      // Get Video Properties
      const video = camRef.current.camRef.current
      const videoWidth = 320
      const videoHeight = 320

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
        {/* <img
          src={currentImage}
          style={{ width: 320, height: 320 }}
          ref={cIRef}
        /> */}
        {typeof window !== "undefined" &&
        typeof window.navigator !== "undefined"  ? (
          <Camera
            showFocus={true}
            front={false}
            capture={capture}
            ref={camRef}
            width="320"
            height="320"
          />
        ) : // <div style={{ display: "none" }}>
        //   <Camera ref={camRef} />
        //   <Camera
        //     showFocus={true}
        //     front={false}
        //     capture={capture}
        //     ref={camRef}
        //     width="320"
        //     height="320"
        //   />
        // </div>
        null}
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
        { gyroscopeOn ?
        <DeviceOrientation>
        {({ absolute, alpha, beta, gamma }) => (
          <div>
            {`Absolute: ${absolute}`}
            {`Alpha: ${alpha}`}
            {`Beta: ${beta}`}
            {`Gamma: ${gamma}`}
          </div>
        )}
      </DeviceOrientation> : null}
      </S.PageWrapper>
      
    </WelcomePages>
  )
})

export default PoseEstimation
