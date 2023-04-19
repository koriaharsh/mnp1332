import React, { useState, useEffect } from 'react';
import ReportBody from './Body/ReportBody';
import ProfileBar from './Profile/ProfileBar';
import ReportModal from './ReportModal';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './UserReport.css';

function UserReport() {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    setModalShow(true);
  }, []);
  const downloadPdfDocument = () => {
    const input = document.getElementById('download');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [21, 11],
      });
      pdf.addImage(imgData, 'JPEG', 1, 1);
      pdf.save('report.pdf');
    });
  };
  return (
    <>
      <ReportModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setuser={setUser}
        setReport={setReport}
      />
      <div className="ad-report" id="download">
        <div className="ad-report-title">
          <span className="ad-report-title-text">ANALYSIS REPORT</span>
        </div>
        <ProfileBar
          download={downloadPdfDocument}
          user={user === null ? '' : user}
          report={report === null ? '' : report}
        />
        <ReportBody report={report === null ? '' : report} />
      </div>
    </>
  );
}

export default UserReport;
