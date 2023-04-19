import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './ReportModal.css';

const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: '1em' }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

function ReportModal(props) {
  const axios = useAxiosPrivate();
  const [options, setOptions] = useState([]);
  const [username, setUsername] = useState('');

  const fetchUserDetails = async () => {
    try {
      console.log(username);
      const response = await axios.get(`/admin/details/${username.value}`);
      console.log(response.data);
      props.setuser(response.data);
      props.onHide();
    } catch (e) {
      console.log(e);
      props.onHide();
    }
  };

  const fetchUserReport = async () => {
    try {
      const response = await axios.get(`/admin/report/${username.value}`);
      console.log(response.data);
      props.setReport(response.data);
      props.onHide();
    } catch (e) {
      console.log(e);
      alert('No Report Found For The User');
      props.onHide();
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('/admin/all-usernames');
      const result = response.data;
      console.log(result);

      result.map((item) => {
        setOptions((val) => [...val, { value: item, label: item }]);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Generate Report
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Select Patient</h4>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={username}
          isDisabled={false}
          isLoading={false}
          isClearable={true}
          isRtl={false}
          isSearchable={true}
          name="usernames"
          options={options}
          onChange={setUsername}
        />
        <div style={{ marginTop: '10px' }}>
          <FloatingLabel label="Findings">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
        </div>
        <div
          style={{ marginTop: '10px' }}
          className="user-modal-checkbox-container"
        >
          <div className="user-modal-checkbox">
            <label>EEG</label>
            <input type="checkbox" style={{ marginLeft: '5px' }} checked />
          </div>
          <div className="user-modal-checkbox">
            <label>EOG</label>
            <input type="checkbox" style={{ marginLeft: '5px' }} checked />
          </div>
          <div className="user-modal-checkbox">
            <label>ECG</label>
            <input type="checkbox" style={{ marginLeft: '5px' }} checked />
          </div>
          <div className="user-modal-checkbox">
            <label>EYE TREAKER</label>
            <input type="checkbox" style={{ marginLeft: '5px' }} checked />
          </div>
          <div className="user-modal-checkbox">
            <label>VIDEO</label>
            <input type="checkbox" style={{ marginLeft: '5px' }} checked />
          </div>
        </div>
        <div>
          {/* <FloatingLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <button
          className="report-modal-button"
          onClick={() => {
            fetchUserDetails();
            fetchUserReport();
          }}
        >
          Generate
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReportModal;

// insert into address (address1, address2, city, state, country, postalcode, user_id) values ('house no 131 ward no 12', 'hanuman gali bhanpura', 'Bhanpura', 'MP', 'INDIA', 458775, 91 );
