import React, { useState, useEffect } from 'react';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import './ProgressBar.css';

function ProgressBar(props) {
  const [playing, setPlaying] = useState(props?.playing);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSliderChange = (event) => {
    setProgress(Number(event.target.value));
  };

  useEffect(() => {
    console.log(props?.length);
    let intervalId = null;

    if (playing) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1);
      }, 100); // adjust this interval to match your data frequency
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [playing]);
  return (
    <>
      <div>
        <div className="progress-bar-flex">
          {playing ? (
            <BsPauseFill onClick={handlePlayPause} size="1.5em" />
          ) : (
            <BsPlayFill onClick={handlePlayPause} size="1.5em" />
          )}
          <input
            type="range"
            min="0"
            max={props?.length}
            value={progress}
            onChange={handleSliderChange}
            style={{ width: '100%' }}
          />
        </div>

        {/* <p>Current progress: {progress}</p> */}
        {/* render your EEG data visualization here using the `progress` state */}
      </div>
    </>
  );
}

export default ProgressBar;
