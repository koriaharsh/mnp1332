import React from 'react';
import { MdOutlineNoEncryptionGmailerrorred } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './UnAuth.css';

function UnAuth() {
  const navigate = useNavigate();
  return (
    <div className="unauth-container">
      <MdOutlineNoEncryptionGmailerrorred size="10em" color="#643CA4" />
      <p className="unauth-text">UNAUTHORIZED</p>
      <p className="unauth-text-2">You are not authorized for this service</p>
      <button className="unauth-btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}

export default UnAuth;
