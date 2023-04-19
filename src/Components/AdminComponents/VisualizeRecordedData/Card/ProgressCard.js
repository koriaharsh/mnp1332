import React from 'react';
import './ProgressCard.css';

function ProgressCard(props) {
  return (
    <div
      className="admin-progress-card"
      style={{ width: props.width, height: props.height }}
    >
      <div className="admin-play-pause">{props?.icon}</div>
      <div className="admin-progress-bar">{props?.bar}</div>
    </div>
  );
}

export default ProgressCard;
