import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function RecordedVisualize(props) {
  const [maxDataPoints] = useState(100);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      y: {
        // display: false,
      },
      x: {
        display: false,
      },
    },
    scaleShowLabels: false,
  };

  const data1 = {
    labels: props?.lab.slice(-maxDataPoints),
    datasets: [
      {
        data: props?.c1.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data2 = {
    labels: props?.lab.slice(-maxDataPoints),
    datasets: [
      {
        data: props?.c2.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data3 = {
    labels: props?.lab.slice(-maxDataPoints),
    datasets: [
      {
        data: props?.c3.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data4 = {
    labels: props?.lab.slice(-maxDataPoints),
    datasets: [
      {
        data: props?.c4.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data5 = {
    labels: props?.lab.slice(-maxDataPoints),
    datasets: [
      {
        data: props?.c5.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data6 = {
    labels: props?.lab.slice(-maxDataPoints),
    datasets: [
      {
        data: props?.c6.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data7 = {
    labels: props?.lab.slice(-maxDataPoints),
    datasets: [
      {
        data: props?.c7.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data8 = {
    labels: props?.lab.slice(-maxDataPoints),
    datasets: [
      {
        data: props?.c8.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  return (
    <>
      <div className="container" style={{ width: '80%', fontWeight: 400 }}>
        <div className="d-flex flex-row align-items-center">
          <span style={{ marginRight: '10px' }}>Fp1</span>
          <Line options={options} data={data1} height={30} />
        </div>
        <div className="d-flex flex-row align-items-center">
          <span style={{ marginRight: '10px' }}>Fp2</span>
          <Line options={options} data={data2} height={30} />
        </div>
        <div className="d-flex flex-row align-items-center">
          <span style={{ marginRight: '10px' }}>F3</span>
          &nbsp;&nbsp;
          <Line options={options} data={data3} height={30} />
        </div>
        <div className="d-flex flex-row align-items-center">
          <span style={{ marginRight: '10px' }}>F4</span>
          &nbsp;&nbsp;
          <Line options={options} data={data4} height={30} />
        </div>

        <div className="d-flex flex-row align-items-center">
          <span style={{ marginRight: '10px' }}>Fz</span>
          &nbsp;&nbsp;
          <Line options={options} data={data7} height={30} />
        </div>
        <div className="d-flex flex-row align-items-center">
          <span style={{ marginRight: '10px' }}>Pz</span>
          &nbsp;&nbsp;
          <Line options={options} data={data8} height={30} />
        </div>
        {/* <Line options={options} data={data2} height={30} />
        <Line options={options} data={data3} height={30} />
        <Line options={options} data={data4} height={30} />
        <Line options={options} data={data7} height={30} />
        <Line options={options} data={data8} height={30} /> */}
        <br />
      </div>
    </>
  );
}

export default RecordedVisualize;
