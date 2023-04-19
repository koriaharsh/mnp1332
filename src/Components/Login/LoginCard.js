import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Validate } from './Validation';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import Footer from '../Footer/Footer';
import './Login.css';
import NavBar from '../Navigation/NavBar';
import ReactTypingEffect from 'react-typing-effect';
import IMAGE from '../../Images/saumya.jpg';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginCard() {
  const [open, setOpen] = React.useState(false);
  const [vertical] = React.useState('bottom');
  const [horizontal] = React.useState('right');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('Oops something went wrong!');
  const [severity, setSeverity] = React.useState('error');
  const [error, setError] = React.useState({
    username: '',
    password: '',
  });
  const [err1, setErr1] = React.useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const localtion = useLocation();

  const { setAuth, persist, setPersist } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 550px)');
    setIsMobile(mediaQuery.matches);
  }, []);

  const handleLogin = async () => {
    console.log(username, password);

    try {
      // const response = await Login(username, password);
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await axiosPrivate.post('/auth/token', formData);
      const accessToken = response?.data?.token;
      const role = response?.data?.role;
      const email = response?.data?.email;
      const fullname = response?.data?.fullname;

      // Code to be removed in future
      localStorage.setItem('token', accessToken);
      localStorage.setItem('email', email);
      localStorage.setItem('fullname', fullname);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);

      setAuth({
        username: username,
        token: accessToken,
        email: email,
        fullname: fullname,
        role: role,
      });

      console.log(response.data);
      setSeverity('success');
      setOpen(true);
      setUsername('');
      setPassword('');
      if (role === 'ADMIN') {
        const from = localtion.state?.from?.pathname || '/admin_dashboard';
        navigate(from, { replace: true });
      } else {
        const from = localtion.state?.from?.pathname || '/landing';
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log(err);
      setSeverity('error');
      if (err.code === 'ERR_NETWORK') {
        setOpen(true);
        setErrMsg('Please check your network connectivity');
      } else if (err.code === 'ERR_BAD_REQUEST') {
        setOpen(true);
        setErrMsg(err.response.data.detail);
      } else {
        setOpen(true);
        setErrMsg('OOPS Something went wrong, Please try again');
      }
    }
  };

  // const togglePersist = () => {
  //   setPersist((prev) => !prev);
  // };

  React.useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  const validateAndLogin = async () => {
    const validate = Validate(username, password);
    setError(validate);
    setErr1(false);
    console.log(validate);
    if (validate === true) {
      setErr1(true);
      await handleLogin();
      console.log('ok');
    }
  };
  return (
    <>
      <NavBar />

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'space-between',
        }}
        // style={{ marginTop: '5vh' }}
        className="login-cont"
      >
        <div className="d-flex flex-column">
          <img
            src={IMAGE}
            width="320px"
            // height="500px"
            style={{ borderRadius: '10px', marginTop: '40px' }}
          />
          <ReactTypingEffect
            text={[
              'Multi Model Neuro-Physiological Framework ',
              'EEG (electroencephalography)',
              'EOG (electrooculography)',
              'ECG (electrocardiography)',
              'GSR (galvanic skin response)',
              'EYE TRACKING',
            ]}
            speed={50}
            eraseSpeed={1}
            className="h3"
            eraseDelay={600}
            typingDelay={200}
            style={{ color: '#371567' }}
          />
        </div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={() => setOpen(false)}
          message={'welcome...'}
          key={vertical + horizontal}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {errMsg}
          </Alert>
        </Snackbar>
        <Card
          className="login-card"
          sx={{
            minWidth: 275,
            width: '40%',
            height: '53vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: '10px',
            boxShadow: ' 0 32px 64px rgba(0,0,0,0.2)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 300,
              width: '90%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '10%',
              }}
            >
              <h1 className="login-font">Login</h1>
            </Box>
            <TextField
              error={err1 === true ? false : true}
              required
              label="username"
              variant="outlined"
              sx={{ marginTop: '40px' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              helperText={error.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUserAlt color="#643ca4" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={err1 === true ? false : true}
              required
              label="password"
              variant="outlined"
              type={'password'}
              sx={{ marginTop: '20px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={error.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiLockPasswordFill color="#643ca4" size="1.2em" />
                  </InputAdornment>
                ),
              }}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={persist === true ? true : false}
                    sx={{
                      color: '#643ca4',
                      '&.Mui-checked': {
                        color: '#643ca4',
                      },
                    }}
                    // onChange={togglePersist}
                  />
                }
                label="Trust this device"
              />
            </FormGroup>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#643ca4', marginTop: '20px' }}
              onClick={validateAndLogin}
            >
              LOGIN
            </Button>
            <div className="mt-3">
              <Link to="/signup" style={{ color: '#643ca4' }}>
                Dont have an account, signup
              </Link>
            </div>
          </Box>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
