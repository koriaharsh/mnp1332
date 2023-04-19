import React from 'react';
import './SmallCard.css';

function SmallCard(props) {
  return (
    <div className="ad-small-card" onClick={props.onClick} style={props.style}>
      <div className="db-flex-comp">
        <div className="ad-small-card-title">{props.title}</div>
        <div className="ad-small-card-icon">{props.icon}</div>
        <div className="ad-small-card-value">{props.value}</div>
      </div>
    </div>
  );
}

export default SmallCard;
