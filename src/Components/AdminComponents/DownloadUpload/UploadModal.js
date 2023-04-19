import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const fileTypeOptions = [
  { value: "EEG", label: "EEG" },
  { value: "ECG", label: "ECG" },
  { value: "EOG", label: "EOG" },
  { value: "EYE_TREAKING", label: "EYE_TREAKING" },
  { value: "VIDEO", label: "VIDEO" },
];
function UploadModal(props) {
  const [userName, setUserName] = useState("");
  const [fileType, setFileType] = useState("");

  const axios = useAxiosPrivate();

  const handleFileUpload = async () => {
    console.log(props.file);
    console.log(userName.value);
    console.log(fileType.value);
    let formData = new FormData();
    formData.append("file", props.file);
    formData.append("username", userName.value);
    formData.append("file_type", fileType.value);

    try {
      const response = await axios.post("/admin/upload", formData);
      console.log(response.data);
      props.onHide();
      props.setShow(true);
      props.setClear(true);
    } catch (e) {
      console.log(e);
      props.onHide();
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload File
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Select User</h5>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={userName}
            isDisabled={false}
            isLoading={false}
            isClearable={true}
            isRtl={false}
            isSearchable={true}
            name="usernames"
            options={props?.usernames}
            onChange={setUserName}
          />
          <h5 style={{ marginTop: "10px" }}>Select File Type</h5>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={fileType}
            isDisabled={false}
            isLoading={false}
            isClearable={true}
            isRtl={false}
            isSearchable={true}
            name="usernames"
            options={fileTypeOptions}
            onChange={setFileType}
          />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
          <button className="report-modal-button" onClick={handleFileUpload}>
            Upload
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadModal;
