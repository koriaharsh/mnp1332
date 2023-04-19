import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import { Signup } from '../../Services/UserService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { HiInformationCircle } from 'react-icons/hi';
import Tooltip from '@mui/material/Tooltip';
import NavBar from '../Navigation/NavBar';
import Footer from '../Footer/Footer';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [age, setAge] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [vertical] = React.useState('bottom');
  const [horizontal] = React.useState('right');

  const handleSignUp = async () => {
    console.log(username, fullName, email, password, gender, age, role);
    try {
      const response = await Signup(
        username,
        fullName,
        email,
        password,
        gender,
        age,
        role
      );
      setOpen(true);
      console.log(response.data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
    setUsername('');
    setEmail('');
    setFullName('');
    setGender('');
    setAge('');
    setPassword('');
    setRole('');
  };
  return (
    <>
      <NavBar />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          // marginTop: '5vh',
          height: '85vh',
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={() => setOpen(false)}
          message="I love snacks"
          key={vertical + horizontal}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            Logged In successfully
          </Alert>
        </Snackbar>

        <Card
          className="login-card"
          sx={{
            minWidth: 275,
            width: '40%',
            height: '75vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: '10px',
            boxShadow: ' 0 32px 64px rgba(0,0,0,0.2)',
            padding: '10px',
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
              <h1 className="login-font">Register</h1>
            </Box>

            <TextField
              error={false}
              required
              label="username"
              variant="outlined"
              sx={{ marginTop: '40px' }}
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              helperText={''}
            />
            <TextField
              error={false}
              required
              label="full name"
              variant="outlined"
              sx={{ marginTop: '20px' }}
              size="small"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              helperText={''}
            />
            <TextField
              error={false}
              required
              label="email"
              variant="outlined"
              type={'email'}
              sx={{ marginTop: '20px' }}
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={''}
            />
            <TextField
              error={false}
              required
              label="password"
              variant="outlined"
              type={'password'}
              sx={{ marginTop: '20px' }}
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={''}
              InputProps={{
                endAdornment: (
                  <Tooltip
                    title={
                      'password must be min 8 characters having 1 upper, 1 lower case, one digit and one special character'
                    }
                  >
                    <InputAdornment position="end">
                      <HiInformationCircle />
                    </InputAdornment>
                  </Tooltip>
                ),
              }}
            />
            <div className="d-flex flex-row align-items-end justify-content-between">
              <FormControl variant="standard" sx={{ minWidth: '40%' }}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  // onChange={handleChange}
                  size="small"
                  label="Age"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  error={false}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>MALE</MenuItem>
                  <MenuItem value={20}>FEMALE</MenuItem>
                  <MenuItem value={30}>OTHERS</MenuItem>
                </Select>
              </FormControl>
              <TextField
                error={false}
                required
                id="outlined-number"
                label="Age"
                type="number"
                size="small"
                variant="standard"
                sx={{ minWidth: '30%' }}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                helperText={''}
              />
            </div>
            <FormControl sx={{ marginTop: '10px' }}>
              <RadioGroup
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <div className="d-flex flex-row justify-content-center align-items-end">
                  <FormControlLabel
                    value="INVIGILATOR"
                    control={<Radio size="small" />}
                    label="Invigilator"
                  />
                  <FormControlLabel
                    value="USER"
                    control={<Radio size="small" />}
                    label="User"
                  />
                </div>
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#643ca4', marginTop: '20px' }}
              onClick={handleSignUp}
              disabled={false}
            >
              SIGNUP
            </Button>

            <div className="mt-3">
              <Link to="/" style={{ color: '#643ca4' }}>
                Already have an account, signin
              </Link>
            </div>
          </Box>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default SignUp;
