import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InfoTimeline from './InfoTimeline';
import InfoTimeline2 from './InfoTimeline2';

function InfoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Setup Guide
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props?.type === '2' ? <InfoTimeline2 /> : <InfoTimeline />}
      </Modal.Body>
    </Modal>
  );
}

export default InfoModal;
