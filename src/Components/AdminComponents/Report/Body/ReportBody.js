import React from 'react';
import './ReportBody.css';
import LargeCard from '../../Cards/LargeCard';
import ReportPieChart from '../Charts/ReportPieChart';

function ReportBody(props) {
  return (
    <div className="report-body">
      <div className="report-body-top">
        <LargeCard
          width="280px"
          height="280px"
          body={<ReportPieChart report={props.report} />}
          // className="report-pie-chart"
        />
        <LargeCard title="Card2" width="280px" height="280px" />
        <LargeCard title="Card3" width="280px" height="280px" />
      </div>
      <div className="report-body-center">
        <LargeCard title="Card4" height="220px" />
      </div>
      <div className="report-body-end">
        <LargeCard title="Card5" height="120px" width="59%" />
        <LargeCard title="Card6" height="120px" width="39%" />
      </div>
    </div>
  );
}

export default ReportBody;
