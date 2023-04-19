import React from "react";
import ROCChart from "./ROCChart";

function ROCComponent() {
  return (
    <div
      className="container d-flex flex-row justify-content-center"
      style={{ height: "70vh" }}
    >
      <ROCChart
        yPred={[0.21, 0.32, 0.63, 0.35, 0.92, 0.79, 0.82, 0.99, 0.04]}
        yTest={[0, 1, 0, 0, 1, 1, 0, 1, 0]}
      />
    </div>
  );
}

export default ROCComponent;
