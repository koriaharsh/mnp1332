import React from "react";
import "./DashboardSmallCard.css";

function DashboardSmallCards(props) {
  return (
    <div
      className="small-card"
      style={{ width: props.width }}
      onClick={props.onClick}
    >
      <div className="sm-card-heading">{props.title}</div>
      <div className="sm-card-icon mt-3 d-flex flex-row justify-content-center">
        <props.icon size="2em" color={props.color} />
      </div>
      <div className="d-flex flex-row justify-content-center">
        <div className="h5">{props.value}</div>
      </div>
    </div>
  );
}

export default DashboardSmallCards;
