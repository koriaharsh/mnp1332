import React from 'react';

function Footer() {
  return (
    <div
      className="text-center p-3 d-flex flex-row justify-content-center align-items-center"
      style={{
        backgroundColor: '#edeaf7',
        height: '5vh',
        borderTop: '0.5px solid #643ca4',
        color: '#643ca4',
        bottom: '0',
      }}
    >
      <span>© 2020 Copyright CDAC-DELHI </span>
    </div>
  );
}

export default Footer;
