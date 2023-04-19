import React, { useRef, useEffect, useState } from "react";
import BtVisualization from "../EEG/BtVisualization";
import * as faceapi from "@vladmandic/face-api";
import NavBar from "../Navigation/NavBar";

const LandMarks = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  useEffect(() => {
    async function run() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      const video = videoRef.current;
      //   const canvas = canvasRef.current;
      video.addEventListener("playing", () => {
        setDimensions({ width: video.width, height: video.height });
      });
    }
    run();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const intervalId = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();
      const resizedDetections = faceapi.resizeResults(detections, dimensions);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }, 100);
    return () => clearInterval(intervalId);
  }, [dimensions]);

  return (
    <>
      <NavBar />
      <BtVisualization />

      <div>
        <video
          id="video"
          width={dimensions.width}
          height={dimensions.height}
          ref={videoRef}
        />
        <canvas
          id="canvas"
          width={dimensions.width}
          height={dimensions.height}
          ref={canvasRef}
        />
      </div>
    </>
  );
};

export default LandMarks;
