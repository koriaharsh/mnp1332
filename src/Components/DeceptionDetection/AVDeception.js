import React from 'react';
import NavBar from '../Navigation/NavBar';
import { useNavigate } from 'react-router-dom';
import AUDIO from '../../Images/audio.jpg';
import VIDEO from '../../Images/video.jpg';
import './AV.css';

function AVDeception() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className="deception-detection">
        <div className="dd-av" onClick={() => navigate('/rec')}>
          <img
            src={AUDIO}
            width="100%"
            height="100%"
            style={{ borderRadius: '20px' }}
          />
          <h3 style={{ textAlign: 'center' }}>AUDIO</h3>
        </div>
        <div className="dd-av" onClick={() => navigate('/video')}>
          <img
            src={VIDEO}
            width="100%"
            height="100%"
            style={{ borderRadius: '20px' }}
          />
          <h3 style={{ textAlign: 'center' }}>VIDEO</h3>
        </div>
      </div>
    </>
  );
}

export default AVDeception;
