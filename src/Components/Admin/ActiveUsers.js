import React, { useState, useEffect } from 'react';
import DashboardTable from './Tables/DashboardTable';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import TabSelect from './TabSelect';
// import NavBar from '../Navigation/NavBar';
import NavBar from '../AdminComponents/NavBar';
import SideBar from '../AdminComponents/SideBar';

function ActiveUsers() {
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const columns = ['Name', 'Email', 'Gender', 'Age'];

  const options = {
    filterType: 'dropdown',
    sort: true,
    rowsPerPageOptions: [5, 10, 15, 20],
    rowsPerPage: 5,
  };

  useEffect(() => {
    const Active = async () => {
      const response = await axiosPrivate.get('/admin/active_users');
      console.log(response.data);
      setData(response.data);
    };
    Active();
  }, []);
  return (
    <>
      {/* <NavBar /> */}
      <SideBar />
      <NavBar />
      <div
        className="container"
        style={{
          marginTop: '10%',
          // marginLeft: '8%',
          // width: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TabSelect selected={0} />
        <DashboardTable
          columns={columns}
          data={data}
          options={options}
          title={'Active Users'}
        />
      </div>
    </>
  );
}

export default ActiveUsers;
