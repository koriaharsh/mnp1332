import React from 'react';
import './LandingCard.css';

function LandingCard(props) {
  return (
    <div className="landing-card roll-out" onClick={props.onClick}>
      <div>
        <img
          className="landing-card-image"
          src={props.image}
          width={256}
          height={240}
        />
      </div>
      <div className="landing-card-title">{props.title}</div>
    </div>
  );
}

export default LandingCard;
