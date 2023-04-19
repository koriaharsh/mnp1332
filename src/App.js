import './App.css';
import Footer from './Components/Footer/Footer';
import LoginCard from './Components/Login/LoginCard';
import NavBar from './Components/Navigation/NavBar';
import AlphaBetaBarChart from './Components/Visualization/AlphaBetaBarChart';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from 'react-router-dom';
import FaceLandmark from './Components/FacialLandmarks/FaceLandmark';
import LandMarks from './Components/FacialLandmarks/LandMarks';
import SignUp from './Components/SignUp/SignUp';
import UserState from './Context/UserState';
import BtVisualization from './Components/EEG/BtVisualization';
import AdminPage from './Components/Admin/AdminPage';
import RequireAuth from './Components/ProtectedRoutes/RequireAuth';
import PersistLogin from './Components/Persist/PersistLogin';
import Dashboard from './Components/Admin/Dashboard';
import ActiveUsers from './Components/Admin/ActiveUsers';
import InActiveUsers from './Components/Admin/InActiveUsers';
import Tasks from './Components/Admin/Tasks';
import ROCChart from './Components/Admin/Roc/ROCChart';
import ROCComponent from './Components/Admin/Roc/ROCComponent';
import CircleDrawer from './Components/Dummy/CircleDrawer';
import AdminDashboardPage from './Pages/AdminDashboardPage';
import AdminReportPage from './Pages/AdminReportPage';
import AdminDownloadUpload from './Pages/AdminDownloadUpload';
import VisualizeRecordedData from './Components/AdminComponents/VisualizeRecordedData/VisualizeRecordedData';
import AdminVisualizeRecorded from './Pages/AdminVisualizeRecorded';
import AudioRecorder from './Components/AudioDeception/AudioRecorder';
import RecorderJSDemo from './Components/AudioDeception/RecorderJSDemo';
// import TestRecording from './Components/AudioDeception/TestRecording';
import CV68 from './Components/FacialLandmarks/CV68';
import EmotionDetection from './Components/FacialEmotion/EmotionDetection';
import TestRecording from './Components/AudioDeception/TestRecording';
import UnAuth from './Components/UnAuthorized/UnAuth';
import Landing from './Components/UserLanding/Landing';
import VideoRecorder from './Components/VideoDeception/VideoRecorder';
import SideNav from './Components/Dummy/SideNav';
import About from './Components/About/About';
import AVDeception from './Components/DeceptionDetection/AVDeception';

function App() {
  return (
    <>
      <div className="App">
        <UserState>
          <Router>
            {/* <NavBar /> */}
            {/* <div className="mt-5"> */}
            {/* <ReactTypingEffect
              text={[
                "Multi Model Neuro-Physiological Framework for Behavior Analysis.",
              ]}
              staticText="MNP:"
              speed={100}
              eraseSpeed={1}
              className="h3"
              style={{ color: "#371567" }}
            /> */}
            {/* </div> */}
            <LoginCard />
            <Routes>
              {/* Public Route */}
              <Route path="/" element={<LoginCard />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/roc" element={<ROCComponent />} />
              <Route path="/canvas" element={<CircleDrawer />} />
              <Route path="/record" element={<TestRecording />} />
              <Route path="/rec" element={<AudioRecorder />} />
              <Route path="/emotion" element={<EmotionDetection />} />
              <Route path="/unauthorized" element={<UnAuth />} />
              <Route path="/video" element={<VideoRecorder />} />
              <Route path="/sidenav" element={<SideNav />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/pose" element={<PoseLandmark />} />
              <Route path="/pose1" element={<Pose />} /> */}

              {/* INVIGILATOR Route */}
              <Route element={<PersistLogin />}>
                <Route element={<RequireAuth allowedRole={'INVIGILATOR'} />}>
                  <Route path="/visualize" element={<AlphaBetaBarChart />} />
                  <Route path="/cv" element={<FaceLandmark />} />
                  <Route path="/landmarks" element={<LandMarks />} />
                  <Route path="/bt" element={<BtVisualization />} />
                  <Route path="/cv68" element={<CV68 />} />
                  <Route path="/landing" element={<Landing />} />
                  <Route path="/av" element={<AVDeception />} />
                </Route>

                {/* ADMIN Route */}
                <Route element={<RequireAuth allowedRole={'ADMIN'} />}>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/active" element={<ActiveUsers />} />
                  <Route path="/inactive" element={<InActiveUsers />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route
                    path="/admin_dashboard"
                    element={<AdminDashboardPage />}
                  />
                  <Route path="/admin_report" element={<AdminReportPage />} />
                  <Route
                    path="/admin_updown"
                    element={<AdminDownloadUpload />}
                  />
                  <Route
                    path="/visualize-recorded"
                    element={<AdminVisualizeRecorded />}
                  />
                </Route>
              </Route>
            </Routes>
          </Router>
        </UserState>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
