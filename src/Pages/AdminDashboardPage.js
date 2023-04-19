import React from 'react';
import Dashboard from '../Components/AdminComponents/Dashboard';
import NavBar from '../Components/AdminComponents/NavBar';
import SideBar from '../Components/AdminComponents/SideBar';
import './AdminDashboardPage.css';
import SideNav from '../Components/Dummy/SideNav';

function AdminDashboardPage() {
  return (
    <>
      <NavBar />
      <SideBar />
      <Dashboard />
      {/* <div className="admin-bottom-bar">
        <SideNav />
      </div> */}
    </>
  );
}

export default AdminDashboardPage;
