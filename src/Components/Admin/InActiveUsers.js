import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import NavBar from '../AdminComponents/NavBar';
import SideBar from '../AdminComponents/SideBar';
import DashboardTable from './Tables/DashboardTable';
import TabSelect from './TabSelect';

const options = {
  filterType: 'multiselect',
  sort: true,
  rowsPerPageOptions: [5, 10, 15, 20],
  rowsPerPage: 5,
};

const columns = ['Name', 'Email', 'Gender', 'Age'];

function InActiveUsers() {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const Inactive = async () => {
      const response = await axiosPrivate.get('/admin/inactive_users');
      console.log(response.data);
      setData(response.data);
    };
    Inactive();
  }, []);
  return (
    <>
      <NavBar />
      <SideBar />
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
        <TabSelect selected={1} />
        <DashboardTable
          columns={columns}
          data={data}
          options={options}
          title={'Inactive Users'}
        />
      </div>
    </>
  );
}

export default InActiveUsers;
