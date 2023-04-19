import React, { useState, useEffect } from 'react';
import DashboardTable from './Tables/DashboardTable';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import TabSelect from './TabSelect';
import NavBar from '../AdminComponents/NavBar';
import SideBar from '../AdminComponents/SideBar';

const options = {
  filterType: 'multiselect',
  sort: true,
  rowsPerPageOptions: [5, 10, 15, 20],
  rowsPerPage: 5,
};

const columns = [
  'Name',
  'Start Time',
  'End Time',
  'No. of questions',
  'Truth',
  'Lie',
  'EEG accuracy',
  'EOG accuracy',
  'CV accuracy',
];
function Tasks() {
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const Sessions = async () => {
      const response = await axiosPrivate.get('/admin/sessions');
      const result = response.data;
      console.log(result);
      setData(result);
    };
    Sessions();
  }, []);
  return (
    <>
      {/* <NavBar /> */}
      <NavBar />
      <SideBar />
      <div
        className="container"
        style={{
          marginTop: '10%',
          // marginLeft: '8%',
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TabSelect selected={2} />
        <DashboardTable options={options} columns={columns} data={data} />
      </div>
    </>
  );
}

export default Tasks;
