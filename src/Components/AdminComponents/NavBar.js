import React from 'react';
import useAuth from '../../hooks/useAuth';
import './NavBar.css';
import { FcSearch } from 'react-icons/fc';

function NavBar() {
  const { auth } = useAuth();
  return (
    <div className="admin-nav-container">
      <div className="admin-nav">
        <div className="admin-navbar">
          <div className="d-flex">
            <div className="admin-navbar-title">DASHBOARD</div>
            <div className="admin-navbar-search-container">
              <input
                className="admin-navbar-search"
                type="text"
                placeholder="Search..."
              />
            </div>
            <div type="button" className="search-btn">
              <FcSearch size="1.5em" />
            </div>
          </div>
          <div className="d-flex-rev">
            <div className="admin-navbar-username admin-txt">{`Hello, ${auth?.fullname}`}</div>
            <div className="admin-flex-cont">
              <div className="admin-navbar-username admin-navbar-username-logo">
                {auth?.fullname?.toUpperCase()?.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
