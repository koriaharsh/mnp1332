import React, { useState, useEffect } from 'react';
import ProgressCard from './Card/ProgressCard';
import RecordedVisualize from './Chart/RecordedVisualize';
import ProgressBar from './ProgressBar';
import './VisualizeRecorded.css';

function VisualizeRecordedData(props) {
  const [resData, setResData] = useState([]);
  const [channel1, setChannel1] = useState([]);
  const [channel2, setChannel2] = useState([]);
  const [channel3, setChannel3] = useState([]);
  const [channel4, setChannel4] = useState([]);
  const [channel5, setChannel5] = useState([]);
  const [channel6, setChannel6] = useState([]);
  const [channel7, setChannel7] = useState([]);
  const [channel8, setChannel8] = useState([]);
  const [timeStamp, setTimeStamp] = useState([]);

  useEffect(() => {
    console.log(props.details);
    let socket = new WebSocket('ws://localhost:8000/admin-stream/download');

    socket.onopen = () => {
      socket.send(JSON.stringify(props.details));
    };

    socket.onmessage = (response) => {
      const resData = JSON.parse(response.data);
      console.log(resData);
      setResData((val) => [...val, resData]);
      // setChannel1((val) => [...val, parseInt(resData[0].substring(1))]);
      setChannel1((val) => [...val, parseInt(resData[0])]);
      setChannel2((val) => [...val, parseInt(resData[1])]);
      setChannel3((val) => [...val, parseInt(resData[2])]);
      setChannel4((val) => [...val, parseInt(resData[3])]);
      setChannel5((val) => [...val, parseInt(resData[4])]);
      setChannel6((val) => [...val, parseInt(resData[5])]);
      setChannel7((val) => [...val, parseInt(resData[6])]);
      setChannel8((val) => [...val, parseInt(resData[7])]);
      setTimeStamp((val) => [...val, parseInt(resData[8])]);
    };
  }, []);
  return (
    <div className="admin-visualize-component">
      <div className="admin-progress-card-comp">
        <h2
          style={{ marginLeft: '10%', marginBottom: '10px', color: '#643CA4' }}
        >
          Visualize
        </h2>
        <RecordedVisualize
          c1={channel1}
          c2={channel2}
          c3={channel3}
          c4={channel4}
          c5={channel5}
          c6={channel6}
          c7={channel7}
          c8={channel8}
          lab={timeStamp}
          style={{ marginTop: '30px' }}
        />
        <div className="admin-progress-card-flex">
          <ProgressCard
            width="80%"
            height="20%"
            bar={<ProgressBar playing={true} length={resData.length} />}
          />
        </div>
      </div>
    </div>
  );
}

export default VisualizeRecordedData;
