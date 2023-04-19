import React from "react";
import MUIDataTable from "mui-datatables";

function DashboardTable(props) {
  return (
    <div>
      <MUIDataTable
        title={props?.title}
        data={props?.data}
        columns={props?.columns}
        options={props?.options}
        theme="Dark"
      />
    </div>
  );
}

export default DashboardTable;
