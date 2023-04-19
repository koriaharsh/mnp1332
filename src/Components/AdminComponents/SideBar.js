import React from 'react';
import './SideBar.css';
import { AiFillHome } from 'react-icons/ai';
import {
  BsUiRadiosGrid,
  BsFillFileEarmarkTextFill,
  BsInfoCircleFill,
} from 'react-icons/bs';
import { BiBarChart, BiLogOutCircle } from 'react-icons/bi';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';

function SideBar() {
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const logOut = useLogout();
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (e) {
      console.log(e);
      setAuth({});
      navigate('/');
    }
  };
  return (
    <div className="admin-sidenbar">
      <div className="admin-sidebar-logo">
        <img src="group-logo.svg" />
      </div>
      <div className="admin-sidebar-menu">
        <Tooltip title="Home" placement="right" arrow>
          <div className="admin-sidebar-menu-item">
            <AiFillHome
              className="a-s-m-i"
              color="#EAEAEA"
              size="1.8em"
              onClick={() => navigate('/admin_dashboard')}
            />
          </div>
        </Tooltip>
        <Tooltip title="Dashboard" placement="right" arrow>
          <div className="admin-sidebar-menu-item">
            <BsUiRadiosGrid
              color="#EAEAEA"
              size="1.5em"
              onClick={() => navigate('/admin_dashboard')}
            />
          </div>
        </Tooltip>
        <Tooltip title="Visualize" placement="right" arrow>
          <div className="admin-sidebar-menu-item">
            <BiBarChart
              color="#EAEAEA"
              size="1.8em"
              onClick={() => navigate('/visualize-recorded')}
            />
          </div>
        </Tooltip>
        <Tooltip title="Report" placement="right" arrow>
          <div className="admin-sidebar-menu-item">
            <BsFillFileEarmarkTextFill
              color="#EAEAEA"
              size="1.5em"
              onClick={() => navigate('/admin_report')}
            />
          </div>
        </Tooltip>
        <Tooltip title="Upload/Download" placement="right" arrow>
          <div className="admin-sidebar-menu-item">
            <RiArrowUpDownFill
              color="#EAEAEA"
              size="1.8em"
              onClick={() => navigate('/admin_updown')}
            />
          </div>
        </Tooltip>
      </div>

      <div className="admin-sidebar-bottom-menu">
        <Tooltip title="Info" placement="right" arrow>
          <div className="admin-sidebar-bottom-menu-item">
            <BsInfoCircleFill color="#EAEAEA" size="1.5em" />
          </div>
        </Tooltip>
        <Tooltip title="Logout" placement="right" arrow>
          <div className="admin-sidebar-bottom-menu-item" onClick={logout}>
            <BiLogOutCircle color="#EAEAEA" size="1.8em" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default SideBar;
