import { useState, useRef, useEffect } from 'react';
import './AudioRecorder.css';
import axios from 'axios';
import NavBar from '../Navigation/NavBar';
import toWav from 'audiobuffer-to-wav';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { BsRecordCircle } from 'react-icons/bs';

const API_URL = 'http://10.224.1.33:8000/uploadfile';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const AudioRecorder = () => {
  const mimeType = 'audio/wav';

  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const audioRef = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [audioBLOB, setAudioBLOB] = useState(null);
  const [audioBase64, setAudioBase64] = useState('');
  const [waweBLOB, setWaveBLOB] = useState('');

  const [sec, setSec] = useState(0);
  const [inter, setInter] = useState('');
  const [pred, setPred] = useState([]);
  const [classes] = useState(['Truth', 'Lie']);
  const [colors] = useState(['success', 'error']);

  const [open, setOpen] = useState(false);

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
        setOpen(false);
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.');
    }
  };

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  const startRecording = async () => {
    setRecordingStatus('recording');
    const clockInterval = setInterval(() => {
      setSec((val) => val + 1);
      setInter(clockInterval);
    }, 1000);
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream);
    //set the MediaRecorder instance to the mediaRecorder ref
    console.log(media);
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    clearInterval(inter);
    setSec(0);
    setRecordingStatus('inactive');
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      //creates a blob file from the audiochunks data
      console.log(audioChunks);
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const arrayBuffer = await audioBlob.arrayBuffer();
      // Convert the ArrayBuffer to an AudioBuffer
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      console.log(audioBuffer);
      setAudioBLOB(audioBlob);

      // Convert the AudioBuffer to a WAV file
      const wav = toWav(audioBuffer);
      const wavBlob = new Blob([new DataView(wav)], { type: 'audio/wav' });
      setWaveBLOB(wavBlob);

      // Create a download link for the WAV file
      // const downloadLink = document.createElement('a');
      // downloadLink.href = URL.createObjectURL(wavBlob);
      // downloadLink.download = 'recorded-audio.wav';
      // downloadLink.click();

      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);

      var reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = function () {
        var base64data = reader.result;
        setAudioBase64(base64data);
      };
      console.log(audioUrl);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  const handleSendAudio = async () => {
    try {
      // let blobFile = new File(audioChunks, 'harsh.wav', {
      //   type: mimeType,
      // });
      // console.log(blobFile);
      setOpen(true);
      let formData = new FormData();

      formData.append('file', waweBLOB, 'recording.wav');

      // console.log(audioBase64);

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      console.log(response.data);
      setPred(response.data.pred[0]);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <h2 className="audio-record-title">Audio Based Deception Detection</h2>
        <main>
          <div className="audio-controls">
            {!permission ? (
              <button
                onClick={getMicrophonePermission}
                type="button"
                className="audio-control-btn"
              >
                Get Microphone
              </button>
            ) : null}
            {permission && recordingStatus === 'inactive' ? (
              <button
                onClick={startRecording}
                type="button"
                className="audio-control-btn"
              >
                Start Recording
              </button>
            ) : null}
            {recordingStatus === 'recording' ? (
              <>
                <div>
                  <button
                    onClick={stopRecording}
                    type="button"
                    className="audio-control-btn"
                  >
                    Stop Recording
                  </button>
                  <BsRecordCircle size="2em" color="red" />
                  &nbsp;
                  <span>{sec}</span>
                </div>
              </>
            ) : null}
          </div>
          {audio ? (
            <div className="audio-container">
              <audio ref={audioRef} src={audio} controls></audio>

              <button onClick={handleSendAudio} className="audio-control-btn">
                Send Audio
              </button>
              <Backdrop
                sx={{
                  color: '#fff',
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
                // onClick={() => setOpen(false)}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              {pred.map((item, index) => (
                <Box sx={{ width: '30%' }} key={index}>
                  <div>
                    {classes[index]}
                    &nbsp;&nbsp;&nbsp;
                    <LinearProgressWithLabel
                      value={item * 100}
                      color={colors[index]}
                    />
                  </div>
                </Box>
              ))}
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
};
export default AudioRecorder;
