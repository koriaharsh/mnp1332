import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardSmallCards from "../Cards/DashboardSmallCards";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import DashboardLineCharts from "./Charts/DashboardLineCharts";
import DashboardMulBarChart from "./Charts/DashboardMulBarChart";
import DashboardLargeCard from "../Cards/DashboardLargeCard";
import NavBar from "../Navigation/NavBar";

function Dashboard() {
  const navigate = useNavigate();
  const [counts, setCounte] = useState({
    active: "NA",
    in_active: "NA",
    session_counts: "NA",
  });

  const [active, setActive] = useState([]);
  const [inactive, setInavtive] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/counts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCounte(response.data);
        setActive((val) => [...val, response.data.active]);
        setInavtive((val) => [...val, response.data.in_active]);
        setTasks((val) => [...val, response.data.session_counts]);
      })
      .catch((err) => {
        console.log(err);
      });
    setInterval(() => {
      axios
        .get("http://localhost:8000/admin/counts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setCounte(response.data);
          setActive((val) => [...val, response.data.active]);
          setInavtive((val) => [...val, response.data.in_active]);
          setTasks((val) => [...val, response.data.session_counts]);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 120000);
  }, []);
  return (
    <>
      <NavBar />

      <div className="container">
        <div className="d-flex flex-row justify-content-around mt-5">
          <DashboardSmallCards
            width="20%"
            title="Active Users"
            icon={AiOutlineUserAdd}
            value={counts?.active}
            color="#6e79de"
            onClick={() => navigate("/active")}
          />
          <DashboardSmallCards
            width="20%"
            title="Inactive Users"
            icon={AiOutlineUserDelete}
            value={counts?.in_active}
            color="#d42d1d"
            onClick={() => navigate("/inactive")}
          />
          <DashboardSmallCards
            width="20%"
            title="Tasks"
            icon={BiTask}
            value={counts?.session_counts}
            color="#3b6430"
            onClick={() => navigate("/tasks")}
          />
          <DashboardSmallCards
            width="20%"
            title="Live Users"
            icon={AiOutlineUserSwitch}
            value="25"
            color="#593c72"
          />
        </div>
        <div className="d-flex flrx-row justify-content-around align-items-center mt-5">
          <DashboardLargeCard
            title="Line Chart"
            body={
              <DashboardLineCharts
                active={active}
                inactive={inactive}
                tasks={tasks}
              />
            }
          />
          <DashboardLargeCard
            title="Radial Chart"
            body={
              <DashboardMulBarChart
                truth={counts?.truth_count}
                lie={counts?.lie_count}
              />
            }
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
