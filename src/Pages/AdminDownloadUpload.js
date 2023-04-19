import React from "react";
import NavBar from "../Components/AdminComponents/NavBar";
import SideBar from "../Components/AdminComponents/SideBar";
import DownloadUpload from "../Components/AdminComponents/DownloadUpload/DownloadUpload";

function AdminDownloadUpload() {
  return (
    <>
      <SideBar />
      <NavBar />
      <DownloadUpload />
    </>
  );
}

export default AdminDownloadUpload;
