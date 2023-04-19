import * as faceapi from '@vladmandic/face-api';
import React, { useState, useEffect } from 'react';
import { TbDeviceComputerCamera } from 'react-icons/tb';
import { TbDeviceComputerCameraOff } from 'react-icons/tb';
import NavBar from '../Navigation/NavBar';
import axios from 'axios';

function CV68() {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [landmark, setLandmark] = useState([]);

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('error:', err);
      });
  };

  const handleVideoOnPlay = () => {
    // const socket = new WebSocket('ws://192.168.137.112:8000/cv_landmarks');
    // setSocket(socket);
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();

        if (detections.length != 0) {
          const landmarkPositions = detections[0].landmarks.positions;
          const data = {
            landmarks: landmarkPositions,
            // timestamp: new Date().getTime(),
          };
          console.log(data);

          setLandmark((val) => [...val, data]);

          //   const socket = new WebSocket(
          //     'ws://192.168.137.112:8000/cv_landmarks'
          //   );

          //   socket.onopen = () => socket.send(JSON.stringify(data));

          //   socket.send(JSON.stringify(data));

          //   socket.onmessage = (event) => {
          //     console.log(event.data);
          //   };

          //   socket.onerror = (err) => {
          //     console.log(err);
          //   };
        }

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext('2d')
            .clearRect(0, 0, videoWidth, videoHeight);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      }
    }, 100);
  };

  const closeWebcam = async () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
    const reqData = {
      data: landmark,
    };
    console.log(reqData);
    try {
      const response = await axios.post(
        'http://10.224.1.33:8000/cv_landmarks',
        reqData
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <NavBar />
      <div
        className=" d-flex flex-row justify-content-around"
        style={{ height: '80vh', width: '100%' }}
      >
        <div>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            {captureVideo && modelsLoaded ? (
              <TbDeviceComputerCamera size="3em" onClick={closeWebcam} />
            ) : (
              <TbDeviceComputerCameraOff
                size="3em"
                onClick={startVideo}
                style={{ cursor: 'pointer' }}
              />
            )}
          </div>
          {captureVideo ? (
            modelsLoaded ? (
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '10px',
                  }}
                >
                  <video
                    ref={videoRef}
                    height={videoHeight}
                    width={videoWidth}
                    onPlay={handleVideoOnPlay}
                    style={{ borderRadius: '10px' }}
                  />
                  <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                </div>
              </div>
            ) : (
              <div>loading...</div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default CV68;
