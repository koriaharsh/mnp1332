import React from "react";
import { Line } from "react-chartjs-2";

const ROCChart = ({ yTest, yPred }) => {
  // Calculate false positive rate (fpr) and true positive rate (tpr)
  const thresholds = [];
  const step = 0.01;
  for (let i = 0; i <= 1; i += step) {
    thresholds.push(i);
  }

  const fpr = [];
  const tpr = [];
  for (let i = 0; i < thresholds.length; i++) {
    const threshold = thresholds[i];
    let tp = 0;
    let fp = 0;
    let tn = 0;
    let fn = 0;

    for (let j = 0; j < yPred.length; j++) {
      if (yPred[j] >= threshold) {
        if (yTest[j] === 1) {
          tp++;
        } else {
          fp++;
        }
      } else {
        if (yTest[j] === 0) {
          tn++;
        } else {
          fn++;
        }
      }
    }

    fpr.push(fp / (fp + tn));
    tpr.push(tp / (tp + fn));
  }

  // Create data for the ROC chart
  const data = {
    labels: fpr,
    datasets: [
      {
        label: "ROC Curve",
        data: tpr,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // Create options for the ROC chart
  const options = {
    scales: {
      xAxes: [
        {
          type: "linear",
          position: "bottom",
          scaleLabel: {
            display: true,
            labelString: "False Positive Rate",
          },
        },
      ],
      yAxes: [
        {
          type: "linear",
          position: "left",
          scaleLabel: {
            display: true,
            labelString: "True Positive Rate",
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

export default ROCChart;
