import React from 'react';
import NavBar from '../Navigation/NavBar';
import LandingCard from '../Cards/LandingCard';
import EMOTION from './images/emotion.jpg';
import AM from './images/meditation.jpg';
import CV from './images/cv.jpg';
import EEG from './images/eeg.jpg';
import AUDIO from './images/audio.jpg';
import TopCard from '../Cards/TopCard';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import Footer from '../Footer/Footer';

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div>
        <TopCard />
      </div>
      <div
        className="landing-page-card-container"
        style={{ marginTop: '15px' }}
      >
        <LandingCard
          image={AM}
          title="Meditation / Attention"
          onClick={() => navigate('/visualize')}
        />
        <LandingCard
          image={EEG}
          title="EEG + CV"
          onClick={() => navigate('/cv')}
        />
        <LandingCard
          image={EMOTION}
          title="Emotion Detection"
          onClick={() => navigate('/emotion')}
        />
        <LandingCard
          image={AUDIO}
          title="Audio/Video Based Deception"
          onClick={() => navigate('/av')}
        />
      </div>
      <Footer />
    </>
  );
}

export default Landing;
