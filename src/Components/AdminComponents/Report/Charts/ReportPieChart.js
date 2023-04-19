import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import './ReportPieChart.css';

function ReportPieChart(props) {
  const options = {
    chart: {
      id: 'Accuracy Chart',
    },
    labels: ['CV', 'EEG', 'EOG'],
    legend: {
      position: 'bottom',
      //   show: false,
    },
  };

  const series = [
    props?.report[1]?.cv_accuracy,
    props?.report[1]?.eeg_accuracy,
    props?.report[1]?.eog_accuracy,
  ];

  return (
    <div style={{ left: 0 }}>
      <Chart
        options={options}
        series={series}
        type="pie"
        width={'290'}
        height={'290'}
      />
    </div>
  );
}

export default ReportPieChart;
