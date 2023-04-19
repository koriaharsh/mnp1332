import React from 'react';
import Chart from 'react-apexcharts';

const options = {
  chart: {
    id: 'Multi-Modalities Comparision',
  },
  labels: ['EEG', 'ECG', 'EOG', 'EYE TREAKER', 'VIDEO'],
  legend: {
    position: 'bottom',
  },
};

function ModalitiesPieChart(props) {
  console.log(props?.data[0]?.eeg);
  const series = [
    parseInt(props?.data[0]?.eeg.substring(0, 2)),
    parseInt(props?.data[0]?.eog.substring(0, 2)),
    parseInt(props?.data[0]?.ecg.substring(0, 2)),
    parseInt(props?.data[0]?.eye_treaking.substring(0, 2)),
    parseInt(props?.data[0]?.video.substring(0, 2)),
  ];
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="pie"
        // width={"250%"}
        // height={"200%"}
        width={'330'}
        height={'330'}
      />
    </div>
  );
}

export default ModalitiesPieChart;
