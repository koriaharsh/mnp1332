import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoTimeline2 from '../Infformation/InfoTimeline2';
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
import NavBar from '../Navigation/NavBar';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import InfoModal from '../Infformation/InfoModal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//Properties for Line chart
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
    y: {},
    x: {
      display: false,
    },
  },
  scaleShowLabels: false,
};

const NEUPHONY_SERVICE_UUID = '7d7c7319-742f-4012-82d2-b585ea610038';
const READ_CHARACTERISTIC_UUID = '04f82299-1e15-443c-94cf-301cf260c2ca';
const WRITE_CHARACTERISTIC_UUID = 'bb608bbb-d995-4b26-bd86-7010a8a41228';

function BtVisualization(props) {
  var channelList = ['Fp1', 'Fp2', 'F3', 'F4', 'T3', 'T4', 'Fz', 'Pz']; //List of all channels of EEG headset

  const [channel1, setChannel1] = useState([]);
  const [channel2, setChannel2] = useState([]);
  const [channel3, setChannel3] = useState([]);
  const [channel4, setChannel4] = useState([]);
  const [channel5, setChannel5] = useState([]);
  const [channel6, setChannel6] = useState([]);
  const [channel7, setChannel7] = useState([]);
  const [channel8, setChannel8] = useState([]);
  const [lab, setLab] = useState([]);
  const [maxDataPoints] = useState(150);

  const [device, setDevice] = useState(null);
  const [writeCharacteristic, setWriteCharacteristic] = useState(null);

  const [deviceConnected, setDeviceConnected] = useState(false);
  const [streamStarted, setStreamStarted] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    setModalShow(true);
  }, []);

  const data1 = {
    labels: lab.slice(-maxDataPoints),
    datasets: [
      {
        data: channel1.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data2 = {
    labels: lab.slice(-maxDataPoints),
    datasets: [
      {
        data: channel2.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data3 = {
    labels: lab.slice(-maxDataPoints),
    datasets: [
      {
        data: channel3.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data4 = {
    labels: lab.slice(-maxDataPoints),
    datasets: [
      {
        data: channel4.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data5 = {
    labels: lab.slice(-maxDataPoints),
    datasets: [
      {
        data: channel5.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data6 = {
    labels: lab.slice(-maxDataPoints),
    datasets: [
      {
        data: channel6.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data7 = {
    labels: lab.slice(-maxDataPoints),
    datasets: [
      {
        data: channel7.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };
  const data8 = {
    labels: lab.slice(-maxDataPoints),
    datasets: [
      {
        data: channel8.slice(-maxDataPoints),
        borderColor: '#5161CE',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 0.8,
      },
    ],
  };

  const connectEEG = () => {
    if (!navigator.bluetooth) {
      return;
    }

    navigator.bluetooth
      .requestDevice({
        filters: [
          {
            services: [NEUPHONY_SERVICE_UUID],
          },
        ],
      })
      .then((selectedDevice) => {
        console.log(selectedDevice);
        setDevice(selectedDevice);
        setDeviceConnected(true);
        return selectedDevice.gatt.connect();
      })
      .then((server) => {
        console.log(server);
        return server.getPrimaryService(NEUPHONY_SERVICE_UUID);
      })
      .then((service) => {
        console.log(service);
        return Promise.all([
          service.getCharacteristic(WRITE_CHARACTERISTIC_UUID),
          service.getCharacteristic(READ_CHARACTERISTIC_UUID),
        ]);
      })
      .then(([writeChar, readChar]) => {
        console.log(writeChar);
        console.log(readChar);
        setWriteCharacteristic(writeChar);
        return readChar.startNotifications();
      })
      .then((readChar) => {
        readChar.addEventListener('characteristicvaluechanged', (event) => {
          const value = event.target.value;
          const decoded = new TextDecoder().decode(value);
          if (
            decoded.startsWith('A5') &&
            decoded.endsWith('C3') &&
            decoded.length > 7
          ) {
            // console.log("eeg :" + decoded);
            const channel1 = parseInt(decoded.substring(4, 10), 16);
            const channel2 = parseInt(decoded.substring(10, 16), 16);
            const channel3 = parseInt(decoded.substring(16, 22), 16);
            const channel4 = parseInt(decoded.substring(22, 28), 16);
            const channel5 = parseInt(decoded.substring(28, 34), 16);
            const channel6 = parseInt(decoded.substring(34, 40), 16);
            const channel7 = parseInt(decoded.substring(40, 46), 16);
            const channel8 = parseInt(decoded.substring(46, 53), 16);

            setChannel1((val) => [...val, channel1]);
            setChannel2((val) => [...val, channel2]);
            setChannel3((val) => [...val, channel3]);
            setChannel4((val) => [...val, channel4]);
            setChannel5((val) => [...val, channel5]);
            setChannel6((val) => [...val, channel6]);
            setChannel7((val) => [...val, channel7]);
            setChannel8((val) => [...val, channel8]);
            setLab((val) => [...val, new Date().getTime()]);

            console.log(
              channel1,
              channel2,
              channel3,
              channel4,
              channel5,
              channel6,
              channel7,
              channel8
            );
          }
        });
      })
      .catch((error) => {
        console.log(error);
        setDeviceConnected(false);
      });
  };

  const writeData = async (value) => {
    // const buffer = new Uint8Array([value]);
    try {
      await writeCharacteristic.writeValue(new TextEncoder().encode(value));
      if (value === 'c') {
        setStreamStarted(true);
      } else if (value === 'd') {
        setStreamStarted(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disconnect = () => {
    try {
      device.gatt.disconnect();
      setDeviceConnected(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <InfoModal show={modalShow} onHide={() => setModalShow(false)} type="2" />
      <div style={{ width: '50%', height: '100%', marginTop: '20px' }}>
        <h2 style={{ marginLeft: '2.5%', color: '#643ca4' }}>Visualize EEG</h2>
        <div className="container">
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
          {/* <Line options={options} data={data1} height={30} />
          <Line options={options} data={data2} height={30} />
          <Line options={options} data={data3} height={30} />
          <Line options={options} data={data4} height={30} />
          <Line options={options} data={data7} height={30} />
          <Line options={options} data={data8} height={30} />
          <Line options={options} data={newData} height={20} /> */}
          <br />
        </div>
        <IoArrowBackCircleOutline
          size={'3em'}
          color="#643ca4"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        />
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: '#643ca4',
            marginLeft: '2%',
            border: '0px',
          }}
          onClick={connectEEG}
          disabled={deviceConnected}
        >
          <span className="d-flex flex-row align-items-center">
            <span>Connect</span>
          </span>
        </button>

        <button
          className="btn btn-primary"
          style={{
            backgroundColor: '#643ca4',
            marginLeft: '2%',
            border: '0px',
          }}
          onClick={() => writeData('c')}
          disabled={!deviceConnected || streamStarted}
        >
          <span className="d-flex flex-row align-items-center">
            <span>Start</span>
          </span>
        </button>
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: '#643ca4',
            marginLeft: '2%',
            border: '0px',
          }}
          onClick={() => writeData('d')}
          disabled={!deviceConnected || !streamStarted}
        >
          <span className="d-flex flex-row align-items-center">
            <span>Stop</span>
          </span>
        </button>
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: '#643ca4',
            marginLeft: '2%',
            border: '0px',
          }}
          onClick={disconnect}
          disabled={!deviceConnected}
        >
          <span className="d-flex flex-row align-items-center">
            <span>Disconnect</span>
          </span>
        </button>
      </div>
    </>
  );
}

export default BtVisualization;
