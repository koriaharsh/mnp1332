import React, { useState, useRef } from 'react';
import axios from 'axios';
import NavBar from '../Navigation/NavBar';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './Video.css';

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

function VideoRecorder() {
  const [recordState, setRecordState] = useState('idle');
  const [videoBlob, setVideoBlob] = useState(null);
  const [message, setMessage] = useState('');
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);

  const [classes, setClasses] = useState([]);
  const [pred, setPred] = useState([]);

  const [open, setOpen] = useState(false);
  const [colors] = useState(['primary', 'secondary', 'warning', 'success']);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const recorder = new MediaRecorder(stream);

      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const chunks = [];
      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        setVideoBlob(blob);
        setRecordState('recorded');
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecordState('recording');
    } catch (error) {
      console.error(error);
      setMessage('Error: Could not access camera');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    videoRef.current.srcObject = null;
  };

  const sendVideo = async () => {
    try {
      setOpen(true);
      let formData = new FormData();
      formData.append('file', videoBlob, 'myVideo.mp4');
      const response = await axios.post(
        'http://10.224.1.33:8000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setOpen(false);
      console.log(response.data);
      setClasses(response.data.likely_class);
      setPred(response.data.prediction);
    } catch (e) {
      console.log(e);
      setOpen(false);
    }
  };
  return (
    <>
      <NavBar />
      <div className="video-record-container">
        <video
          ref={videoRef}
          style={{
            width: '100%',
            maxWidth: '500px',
            display: recordState === 'idle' ? 'none' : 'block',
            marginTop: '10px',
          }}
          src={videoBlob != null ? URL.createObjectURL(videoBlob) : ''}
          controls={recordState === 'recording' ? false : true}
        />
        {recordState === 'idle' && (
          <button onClick={startRecording} className="audio-control-btn">
            Record Video
          </button>
        )}
        {recordState === 'recording' && (
          <div>
            <button onClick={stopRecording} className="audio-control-btn">
              Stop Recording
            </button>
          </div>
        )}
        {recordState === 'recorded' && (
          <>
            <div>
              <button onClick={sendVideo} className="audio-control-btn">
                Send Video
              </button>
            </div>
          </>
        )}
        {message && <p>{message}</p>}
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
        {classes.map((item, index) => (
          <>
            {/* <div key={index}> */}
            {/* {item} ---- {pred[index] * 100} */}
            {/* <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style="width: 25%;"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  25%
                </div>
              </div> */}
            {/* </div> */}
            <Box sx={{ width: '50%' }} key={index}>
              <div>
                {item}
                &nbsp;&nbsp;&nbsp;
                <LinearProgressWithLabel
                  value={pred[index] * 100}
                  color={colors[index]}
                />
              </div>
            </Box>
          </>
        ))}
        {/* {pred.map((item, index) => (
        <>
          <div key={index}>{item * 100}</div>
        </>
      ))} */}
      </div>
    </>
  );
}

export default VideoRecorder;
