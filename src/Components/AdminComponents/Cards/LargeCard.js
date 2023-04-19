import React from 'react';
import './LargeCard.css';

function LargeCard(props) {
  return (
    <div
      className={`ad-large-card ${props.className}`}
      style={{ width: props.width, height: props.height }}
    >
      <div
        className="ad-large-card-title"
        style={{ padding: '10px', display: props?.title2 ? 'none' : '' }}
      >
        {props?.title}
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center">
        <div
          className="ad-large-card-title2"
          style={{ padding: '10px', display: props?.title1 ? 'none' : '' }}
        >
          {props?.titleSM}
        </div>
        <div className="ad-large-card-body">{props.body}</div>
      </div>
    </div>
  );
}

export default LargeCard;
