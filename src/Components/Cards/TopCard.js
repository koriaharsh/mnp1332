import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopCard.css';

function TopCard() {
  const navigate = useNavigate();
  return (
    <div className="topcard">
      <div className="topcard-title">
        A Multi-Model Neuro-Physiological Framework for Behavior Analysis
      </div>
      <div className="topcard-sec-container">
        <div className="topcard-secondary-title">
          The Multineurophysiological (MNP) framework for behavior analysis is a
          project that aims to develop a tool for detecting deception using
          multiple neurophysiological modalities, including EEG
          (electroencephalography), ECG (electrocardiography), EOG
          (electrooculography), GSR (galvanic skin response), and eyetracking.
        </div>
      </div>
      <div className="topcard-sec-container">
        <button className="topcard-sec-btn" onClick={() => navigate('/about')}>
          READ MORE
        </button>
      </div>
    </div>
  );
}

export default TopCard;
