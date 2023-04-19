// // App.js
// import React, { useRef, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import * as posenet from '@tensorflow-models/posenet';

// function Pose() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     async function loadPosenetModel() {
//       const net = await posenet.load({
//         architecture: 'MobileNetV1',
//         outputStride: 16,
//         inputResolution: { width: 640, height: 480 },
//         multiplier: 0.75,
//       });

//       setupWebcam(net);
//     }

//     async function setupWebcam(net) {
//       if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         const webcamStream = await navigator.mediaDevices.getUserMedia({
//           audio: false,
//           video: {
//             facingMode: 'user',
//             width: 640,
//             height: 480,
//           },
//         });

//         videoRef.current.srcObject = webcamStream;
//         videoRef.current.addEventListener('loadeddata', () => {
//           detectPose(net);
//         });
//       } else {
//         console.error('Webcam not supported in this browser');
//       }
//     }

//     async function detectPose(net) {
//       while (true) {
//         const pose = await net.estimateSinglePose(videoRef.current, {
//           flipHorizontal: false,
//         });

//         drawKeypoints(pose.keypoints);
//         await tf.nextFrame();
//       }
//     }

//     function drawKeypoints(keypoints) {
//       const ctx = canvasRef.current.getContext('2d');
//       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//       keypoints.forEach((keypoint) => {
//         if (keypoint.score > 0.2) {
//           ctx.beginPath();
//           ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
//           ctx.fillStyle = 'red';
//           ctx.fill();
//         }
//       });
//     }

//     loadPosenetModel();
//   }, []);

//   return (
//     <div>
//       <video
//         ref={videoRef}
//         width="640"
//         height="480"
//         autoPlay
//         style={{ display: 'none' }}
//       />
//       <canvas ref={canvasRef} width="640" height="480" />
//     </div>
//   );
// }

// export default Pose;
