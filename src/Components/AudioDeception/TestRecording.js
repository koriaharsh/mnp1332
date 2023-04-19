// src/components/AudioRecorder.js
import React, { useState, useRef } from 'react';
import toWav from 'audiobuffer-to-wav';

const TestRecording = () => {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);

  const handleStartRecording = async () => {
    if (recording) return;

    // Request access to the user's microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Create a MediaRecorder instance
    mediaRecorder.current = new MediaRecorder(stream);
    recordedChunks.current = [];

    // Handle 'dataavailable' events
    mediaRecorder.current.addEventListener('dataavailable', (e) => {
      if (e.data.size > 0) {
        recordedChunks.current.push(e.data);
      }
    });

    // Start recording
    mediaRecorder.current.start();
    setRecording(true);
  };

  const handleStopRecording = async () => {
    if (!recording) return;

    // Stop recording
    mediaRecorder.current.stop();
    setRecording(false);

    // Convert the recorded chunks to an ArrayBuffer
    const blob = new Blob(recordedChunks.current, { type: 'audio/wav' });
    const arrayBuffer = await blob.arrayBuffer();
    console.log(arrayBuffer);
    // Convert the ArrayBuffer to an AudioBuffer
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Convert the AudioBuffer to a WAV file
    const wav = toWav(audioBuffer);
    const wavBlob = new Blob([new DataView(wav)], { type: 'audio/wav' });

    // Create a download link for the WAV file
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(wavBlob);
    downloadLink.download = 'recorded-audio.wav';
    downloadLink.click();
  };

  return (
    <div>
      <button onClick={handleStartRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={handleStopRecording} disabled={!recording}>
        Stop Recording & Save as WAV
      </button>
    </div>
  );
};

export default TestRecording;
