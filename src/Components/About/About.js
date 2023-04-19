import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AboutProject from './AboutProject';
import NavBar from '../Navigation/NavBar';
import './About.css';
import AboutCdac from './AboutCdac';

function About() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <NavBar />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="About MNP" />
          <Tab label="About C-DAC" />
        </Tabs>
      </Box>
      <div className="about-page-container">
        {value === 0 ? <AboutProject /> : <AboutCdac />}
      </div>
    </>
  );
}

export default About;
