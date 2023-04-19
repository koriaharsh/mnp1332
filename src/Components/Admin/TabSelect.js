import * as React from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function TabSelect(props) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(props?.selected);

  return (
    <>
      <Tabs value={value} aria-label="icon tabs example">
        <Tab
          label="Active Users"
          aria-label="Active"
          onClick={() => {
            navigate("/active");
            setValue(0);
          }}
        />
        <Tab
          label="Inactive Users"
          aria-label="Inactive"
          onClick={() => {
            navigate("/inactive");
            setValue(1);
          }}
        />
        <Tab
          label="Tasks"
          aria-label="Tasks"
          onClick={() => {
            navigate("/tasks");
            setValue(2);
          }}
        />
      </Tabs>
    </>
  );
}
