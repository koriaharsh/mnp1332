import React from "react";
import "./DashboardLargeCard.css";

function DashboardLargeCard(props) {
  return (
    <div className="large-card">
      <div className="large-card-title">{props?.title}</div>
      <div className="large-card-body">{props?.body}</div>
    </div>
  );
}

export default DashboardLargeCard;
