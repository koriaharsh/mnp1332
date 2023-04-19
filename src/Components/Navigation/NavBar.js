import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { getSVG } from './AllSvgs';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';
import CDACLOGO from './Images/cdac-logo.png';
import GROUPLOGO from './Images/group-logo.png';
import './NavBar.css';

const pages = ['About', 'Contact Us'];
const settings = ['Account', 'Dashboard', 'Logout'];

function NavBar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [count, setCount] = useState(0);
  const [fullname, setFullname] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState('none');
  const [isMobile, setIsMobile] = useState(false);

  const logout = useLogout();

  const { auth } = useAuth();

  useEffect(() => {
    // console.log("hi");
    const fn = localStorage.getItem('fullname');
    console.log(auth?.fullname);
    setFullname(auth?.fullname);

    setProfile(auth?.fullname?.toUpperCase()?.charAt(0));
  }, [auth]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuSelect = async (setting) => {
    if (setting === 'Logout') {
      await logout();
      navigate('/');
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 550px)');
    setIsMobile(mediaQuery.matches);
  }, []);
  return (
    <AppBar position="static" sx={{ backgroundColor: '#643ca4' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isMobile ? (
            ''
          ) : (
            <>
              <img src={CDACLOGO} width={50} />
              <div className="navbar-verticle-line"></div>
              <img src={GROUPLOGO} width={50} className="navbar-group-logo" />
            </>
          )}
          &nbsp;
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {/* Multi Model Neuro-Physiological Framework for Behavior Analysis */}
            MNP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    // onClick={() => navigate('/dashboard')}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MNP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>
          <Typography variant="h6" sx={{ marginRight: '10px' }}>
            <span className="navbar-title-text">
              {auth?.token != null ? `Hello, ${auth?.fullname}` : ''}
            </span>
          </Typography>
          {auth?.token != null ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={getSVG(profile)} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      value={setting}
                      onClick={() => handleMenuSelect(setting)}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            ''
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
