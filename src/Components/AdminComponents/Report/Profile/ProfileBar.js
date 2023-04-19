import React from 'react';
import './ProfileBar.css';
import AVATAR from '../../../../Images/avatar.png';
import { HiOutlineDownload } from 'react-icons/hi';

function ProfileBar(props) {
  // const address =
  //   "Ward no. 12 House no 131, Hanuman Gali, Bhanpura, M.P, 458775`";
  const address = `${props?.report[7]?.address1} ${props?.report[7]?.address2} ${props?.report[7]?.city} ${props?.report[7]?.state} ${props?.report[7]?.postalcode}`;
  return (
    <div className="profile-bar">
      <div className="profile-bar-header">
        <div className="profile-bar-header-image">
          <img src={AVATAR} width="150" height="150" />
        </div>
        <div className="profile-bar-header-title">{props?.report[3]}</div>
      </div>
      <div className="profile-bar-user-info">
        <div className="user-info-text">{props?.report[4]?.split(' ')[0]}</div>
        <div className="user-info-text">{props?.report[4]?.split(' ')[1]}</div>
        <div className="user-info-text">{props?.report[6]}</div>
        <div className="user-info-text">{props?.report[5]}</div>
        <div className="user-info-text">{address}</div>
      </div>
      <div className="profile-bar-my-flex-container">
        <hr
          style={{ width: '60%', border: '1px solid black', opacity: '28%' }}
        />
      </div>
      <div className="profile-bar-note">
        <div className="profile-bar-note-text">
          Findings: {props?.report[0]}
        </div>
      </div>
      <div className="profile-bar-download-button">
        <button
          className="download-report-button"
          onClick={() => props.download()}
        >
          <span className="profile-bar-flex-container">
            <HiOutlineDownload size="1.8em" style={{ padding: '5px' }} />{' '}
            Download Report
          </span>
        </button>
      </div>
    </div>
  );
}

export default ProfileBar;

// create table analysis_report (
//   id INT AUTO_INCREMENT,
//   findings VARCHAR(150),
//   modalities_id INT,
//   task_id INT,
//   user_id INT,
//   PRIMARY KEY (`id`),
//   FOREIGN KEY (`modalities_id`) REFERENCES multi_modalities (`id`),
//   FOREIGN KEY (`task_id`) REFERENCES session_log (`id`),
//   FOREIGN KEY (`user_id`) REFERENCES users (`id`)
// );
