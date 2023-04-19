import React, { useEffect } from 'react';
import SideBar from '../Components/AdminComponents/SideBar';
import VisualizeRecordedData from '../Components/AdminComponents/VisualizeRecordedData/VisualizeRecordedData';
import { useLocation } from 'react-router-dom';

function AdminVisualizeRecorded() {
  const { state } = useLocation();
  // console.log(state);

  return (
    <>
      <SideBar />
      <VisualizeRecordedData details={state} />
    </>
  );
}

export default AdminVisualizeRecorded;
