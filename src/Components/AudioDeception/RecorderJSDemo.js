import { useState } from 'react';
import axios from 'axios';

let gumStream = null;
// let recorder = null;
let audioContext = null;

function RecorderJSDemo() {
  const [recorder, setRecorder] = useState(null);
  const startRecording = () => {
    let constraints = {
      audio: true,
      video: false,
    };

    audioContext = new window.AudioContext();
    console.log('sample rate: ' + audioContext.sampleRate);

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        console.log('initializing Recorder.js ...');

        gumStream = stream;

        let input = audioContext.createMediaStreamSource(stream);

        const recorder = new window.Recorder(input, {
          numChannels: 1,
        });
        console.log(recorder);

        setRecorder(recorder);

        recorder.record();
        console.log('Recording started');
      })
      .catch(function (err) {
        //enable the record button if getUserMedia() fails
      });
  };

  const stopRecording = () => {
    console.log('stopButton clicked');
    console.log(recorder);
    recorder.stop(); //stop microphone access
    gumStream.getAudioTracks()[0].stop();

    recorder.exportWAV(onStop);
  };

  const onStop = (blob) => {
    console.log('uploading...');

    let data = new FormData();

    // data.append('text', 'this is the transcription of the audio file');
    data.append('file', blob, 'recording.wav');

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    axios.post('http://192.168.137.112:8000/uploadfile', data, config);
  };

  return (
    <div>
      <button onClick={startRecording} type="button">
        Start
      </button>
      <button onClick={stopRecording} type="button">
        Stop
      </button>
    </div>
  );
}

export default RecorderJSDemo;
