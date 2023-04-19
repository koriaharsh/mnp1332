import React, { useRef, useCallback, useState, useEffect } from "react";
import LargeCard from "../Cards/LargeCard";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import "./DownloadUpload.css";
import BasicTable from "../DataTable/BasicTable";
import UploadModal from "./UploadModal";
import Toast from "react-bootstrap/Toast";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function DownloadUpload() {
  const [file, setFile] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [userNames, setUserNames] = useState([]);
  const [show, setShow] = useState(false);
  const [clear, setClear] = useState(false);

  const axios = useAxiosPrivate();

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const inputRef = useRef();

  useEffect(() => {
    if (clear === true) {
      setFile("");
    }
  }, [clear]);

  const fetchAllUsersnames = async () => {
    try {
      const response = await axios.get("/admin/all-usernames");
      const result = response.data;
      console.log(result);

      result.map((item) => {
        setUserNames((val) => [...val, { value: item, label: item }]);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const body = (
    <>
      <div className="upload-body" {...getRootProps()}>
        <div className="upload-icon">
          <AiOutlineCloudUpload size="10em" color="#643CA4" />
        </div>
        <div className="upload-text">Drag and Drop</div>
        <div className="upload-text-2">or</div>
        <div>
          <input
            ref={inputRef}
            {...getInputProps()}
            type="file"
            accept=".xls,.xlsx,.csv"
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
            hidden
          />
          <button
            className="upload-cta-button"
            onClick={() => inputRef.current.click()}
          >
            <span className="upload-text-3">Browse</span>
          </button>
        </div>
        <div>
          <span>{file.name}</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <UploadModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          usernames={userNames}
          file={file}
          setShow={setShow}
          setClear={setClear}
        />
        <button
          className="final-upload-cta-button"
          onClick={() => {
            setModalShow(true);
            fetchAllUsersnames();
          }}
        >
          <span className="upload-text-4">UPLOAD</span>
        </button>
      </div>
    </>
  );

  const downloadBody = (
    <div className="download-body">
      {/* <div className="download-body-top">
        <input
          className="download-search-input"
          type="text"
          placeholder="Search..."
        />
        <div className="download-sort-filter">
          <span>Sort and Filter</span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <IoFilterSharp />
          </div>
        </div>
      </div> */}
      <div className="download-table">
        <BasicTable />
      </div>
    </div>
  );
  return (
    <div className="updown-component">
      <div className="updown-container">
        <LargeCard title="UPLOAD FILE" width="29%" height="500px" body={body} />
        <LargeCard width="69%" height="500px" body={downloadBody} />
      </div>
      <Toast
        className="d-inline-block m-1"
        bg={"success"}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Upload Status</strong>
        </Toast.Header>
        <Toast.Body className="Dark text-white">
          File Uploaded successfully!
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default DownloadUpload;
