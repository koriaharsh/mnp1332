import React from 'react';

function TopNav() {
  return (
    <>
      <input type="checkbox" />
      <span></span>
      <span></span>
      <ul className="menu__list">
        <li>Dashboard</li>
        <li>Report</li>
        <li>Visualize</li>
        <li>Download</li>
      </ul>
    </>
  );
}

export default TopNav;
