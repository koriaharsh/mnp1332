import React from 'react';
import Chart from 'react-apexcharts';

function UsersBarChart(props) {
  const options = {
    chart: {
      id: 'Multi-Modalities Comparision',
    },
    labels: ['1', '2', '3', '4'],
    plotOptions: {
      bar: {
        horizontal: props?.horizontal,
      },
    },
  };
  const series = [
    {
      name: 'EEG',
      data: [44, 55, 57, 56],
      color: '#6D2723',
    },
    {
      name: 'EOG',
      data: [76, 85, 101, 98],
      color: '#9C1950',
    },
    {
      name: 'ECG',
      data: [35, 41, 36, 26],
      color: '#25ACD0',
    },
    {
      name: 'EYE TREAKING',
      data: [38, 55, 66, 23],
      color: '#045D28',
    },
    {
      name: 'VIDEO',
      data: [39, 31, 30, 44],
      color: '#758E29',
    },
  ];
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        // width={"250%"}
        // height={"200%"}
        width={props?.width}
        height={props?.height}
      />
    </div>
  );
}

export default UsersBarChart;
