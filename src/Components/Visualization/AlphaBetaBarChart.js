import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import MentaStateBar from './Charts/MentaStateBar';
import AttentionLevel from './Charts/AttentionLevel';
import MeditationLevel from './Charts/MeditationLevel';
import MeanChart from './Charts/MeanChart';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import NavBar from '../Navigation/NavBar';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InfoModal from '../Infformation/InfoModal';
import './AlphaBeta.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Attention Level',
    },
  },
};

const NEUPHONY_SERVICE_UUID = '7d7c7319-742f-4012-82d2-b585ea610038';
const READ_CHARACTERISTIC_UUID = '04f82299-1e15-443c-94cf-301cf260c2ca';
const WRITE_CHARACTERISTIC_UUID = 'bb608bbb-d995-4b26-bd86-7010a8a41228';

function AlphaBetaBarChart() {
  const [alpha, setAlpha] = useState([]);
  const [beta, setBeta] = useState([]);
  const [theta, setTheta] = useState([]);
  const [gama, setGama] = useState([]);
  const [attention, setAttention] = useState([]);
  const [meditation, setMeditation] = useState([]);
  const [meanA, setMeanA] = useState([]);
  const [meanB, setMeanB] = useState([]);
  const [meanT, setMeanT] = useState([]);
  const [meanG, setMeanG] = useState([]);
  const [lab, setLab] = useState([]);

  const [device, setDevice] = useState(null);
  const [writeCharacteristic, setWriteCharacteristic] = useState(null);
  const [readValue, setReadValue] = useState('');

  const [connected, setConnected] = useState(false);
  const [start, setStart] = useState(false);

  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    setModalShow(true);
  }, []);

  const data = {
    labels: ['Mental States'],
    datasets: [
      {
        label: 'Alpha',
        data: alpha,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Beta',
        data: beta,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Theta',
        data: theta,
        backgroundColor: 'rgba(40, 150, 123, 0.5)',
      },
      {
        label: 'Gama',
        data: gama,
        backgroundColor: 'rgba(15, 77, 999, 0.5)',
      },
    ],
  };

  const data2 = {
    labels: lab.slice(-10),
    datasets: [
      {
        fill: true,
        label: 'attention score',
        data: attention.slice(-10),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const data3 = {
    labels: lab.slice(-10),
    datasets: [
      {
        fill: true,
        label: 'Meditation score',
        data: meditation.slice(-10),
        borderColor: 'rgb(53, 162, 111)',
        backgroundColor: 'rgba(53, 162, 111, 0.5)',
      },
    ],
  };

  const data4 = {
    labels: lab.slice(-10),
    datasets: [
      {
        fill: false,
        label: 'alpha',
        data: meanA.slice(-10),
        borderColor: 'rgba(255, 99, 132, 0.5)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        fill: false,
        label: 'beta',
        data: meanB.slice(-10),
        borderColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        fill: false,
        label: 'theta',
        data: meanT.slice(-10),
        borderColor: 'rgba(40, 150, 123, 0.5)',
        backgroundColor: 'rgba(40, 150, 123, 0.5)',
      },
      {
        fill: false,
        label: 'gamma',
        data: meanG.slice(-10),
        borderColor: 'rgba(15, 77, 999, 0.5)',
        backgroundColor: 'rgba(15, 77, 999, 0.5)',
      },
    ],
  };

  // const handleSerialPort = async () => {
  //   const port = await navigator.serial.requestPort();
  //   await port.open({
  //     baudRate: 921600,
  //     bufferSize: 2,
  //     dataBits: 8,
  //     stopBits: 1,
  //     parity: "none",
  //   });

  //   const textEncoder = new TextEncoderStream();
  //   const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
  //   const writer = textEncoder.writable.getWriter();
  //   const textDecoder = new TextDecoderStream();
  //   const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
  //   const reader = textDecoder.readable.getReader();

  //   // setWriter1(writer);

  //   await sleep(1000);
  //   await writer.write("x"); // writing data to the EEG device

  //   await sleep(2000);
  //   await writer.write("c");

  //   //data : A59EFFF7E7FFE8EBFFF4DAFFD333000000000000FFE864FFD2F0DA50CD40F820C3
  //   var str = "";

  //   await sleep(2000);
  //   // while (true) {
  //   const interval = setInterval(async () => {
  //     const { value, done } = await reader.read();

  //     if (done) {
  //       // Allow the serial port to be closed later.
  //       console.log("closing serial port...");
  //       reader.releaseLock();
  //       clearInterval(interval);
  //     }

  //     str = str + value;
  //     // console.log(str);
  //     // console.log(str[str.length - 2]);
  //     if (str[str.length - 2] === "3") {
  //       let c1 = parseInt(str.substring(7, 13), 16);
  //       let c2 = parseInt(str.substring(13, 19), 16);
  //       let c3 = parseInt(str.substring(19, 25), 16);
  //       let c4 = parseInt(str.substring(25, 31), 16);
  //       let c5 = parseInt(str.substring(31, 37), 16);
  //       let c6 = parseInt(str.substring(37, 43), 16);
  //       let c7 = parseInt(str.substring(43, 49), 16);
  //       let c8 = parseInt(str.substring(49, 55), 16);
  //       let timestamp = new Date().getTime();

  //       // let result = {
  //       //   data: {
  //       //     channel1: c1,
  //       //     channel2: c2,
  //       //     channel3: c3,
  //       //     channel4: c4,
  //       //     channel5: c5,
  //       //     channel6: c6,
  //       //     channel7: c7,
  //       //     channel8: c8,
  //       //   },
  //       //   timestamp: timestamp,
  //       // };

  //       if (
  //         !Number.isNaN(c1) &&
  //         !Number.isNaN(c2) &&
  //         !Number.isNaN(c3) &&
  //         !Number.isNaN(c4) &&
  //         !Number.isNaN(c5) &&
  //         !Number.isNaN(c6) &&
  //         !Number.isNaN(c7) &&
  //         !Number.isNaN(c8)
  //       ) {
  //         let result = {
  //           data: [c1, c2, c3, c4, c5, c6, c7, c8, timestamp],
  //         };

  //         // console.log(result);
  //         const socket = new WebSocket(
  //           "ws://10.224.1.212:8000/stream/eeg/analysis"
  //         );
  //         socket.onopen = () => socket.send(JSON.stringify(result));

  //         socket.onmessage = (event) => {
  //           let response = JSON.parse(event.data);
  //           console.log(JSON.parse(response).alphaAvg);
  //           setAlpha([JSON.parse(response).alphaAvg]);
  //           setBeta([JSON.parse(response).betaAvg]);
  //           setTheta([JSON.parse(response).thetaAvg]);
  //           setGama([JSON.parse(response).gammaAvg]);
  //           setMeditation((val) => [
  //             ...val,
  //             JSON.parse(response).meditationScore,
  //           ]);
  //           setAttention((val) => [
  //             ...val,
  //             JSON.parse(response).attentionScore,
  //           ]);
  //           setMeanA((val) => [...val, JSON.parse(response).meanA]);
  //           setMeanB((val) => [...val, JSON.parse(response).meanB]);
  //           setMeanT((val) => [...val, JSON.parse(response).meanC]);
  //           setMeanG((val) => [...val, JSON.parse(response).meanG]);
  //           setLab((val) => [...val, new Date().getTime()]);
  //         };
  //       }

  //       str = " ";
  //     }
  //     // }
  //   }, 0);
  // };

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
        return selectedDevice.gatt.connect();
      })
      .then((server) => {
        console.log(server);
        setOpen(true);
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
        setConnected(true);
        setOpen(false);
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

            const result = {
              data: [
                channel1,
                channel2,
                channel3,
                channel4,
                channel5,
                channel6,
                channel7,
                channel8,
                new Date().getTime(),
              ],
            };

            const socket = new WebSocket(
              'ws://localhost:8000/stream/eeg/analysis'
            );

            socket.onopen = () => socket.send(JSON.stringify(result));

            socket.onmessage = (event) => {
              let response = JSON.parse(event.data);
              console.log(JSON.parse(response).alphaAvg);
              setAlpha([JSON.parse(response).alphaAvg]);
              setBeta([JSON.parse(response).betaAvg]);
              setTheta([JSON.parse(response).thetaAvg]);
              setGama([JSON.parse(response).gammaAvg]);
              setMeditation((val) => [
                ...val,
                JSON.parse(response).meditationScore,
              ]);
              setAttention((val) => [
                ...val,
                JSON.parse(response).attentionScore,
              ]);
              setMeanA((val) => [...val, JSON.parse(response).meanA]);
              setMeanB((val) => [...val, JSON.parse(response).meanB]);
              setMeanT((val) => [...val, JSON.parse(response).meanC]);
              setMeanG((val) => [...val, JSON.parse(response).meanG]);
              setLab((val) => [...val, new Date().getTime()]);
            };
            console.log(result);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        setConnected(false);
        setOpen(false);
      });
  };

  const writeData = async (value) => {
    // const buffer = new Uint8Array([value]);
    try {
      await writeCharacteristic.writeValue(new TextEncoder().encode(value));
      if (value === 'c') {
        setStart(true);
      } else if (value === 'd') {
        setStart(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disconnect = () => {
    try {
      device.gatt.disconnect();
      setConnected(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        // onClick={() => setOpen(false)}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="inherit" />
          <p>Connecting...</p>
        </div>
      </Backdrop>
      <InfoModal show={modalShow} onHide={() => setModalShow(false)} />
      <div className="d-flex flex-row justify-content-center">
        <div className="container row" style={{ marginTop: '3vh' }}>
          <p className="mental-title">Mental States</p>
          <div className="col">
            <div className="card h-50">
              <div className="card-body">
                <MentaStateBar data={data} height={100} />
              </div>
            </div>
            <div className="card mt-3 h-50">
              <div className="card-body">
                <AttentionLevel data={data2} height={100} />
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-50">
              <div className="card-body">
                <MeditationLevel data={data3} height={100} />
              </div>
            </div>
            <div className="card mt-3 h-50">
              <div className="card-body">
                <MeanChart data={data4} height={100} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <IoArrowBackCircleOutline
              size={'3em'}
              color="#824ee2"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(-1)}
            />
            <button
              className="btn btn-sm btn-primary"
              onClick={connectEEG}
              style={{
                marginLeft: '10px',
                background: '#824ee2',
                border: '0px',
              }}
              disabled={connected}
            >
              Connect
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => writeData('c')}
              style={{
                marginLeft: '10px',
                background: '#824ee2',
                border: '0px',
              }}
              disabled={!connected || start}
            >
              Read
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => writeData('d')}
              style={{
                marginLeft: '10px',
                background: '#824ee2',
                border: '0px',
              }}
              disabled={!connected || !start}
            >
              Pause
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={disconnect}
              style={{
                marginLeft: '10px',
                background: '#824ee2',
                border: '0px',
              }}
              disabled={!connected}
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlphaBetaBarChart;
