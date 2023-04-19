import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NavBar from "../Navigation/NavBar";

const columns = [
  { field: "id", headerName: "ID", width: 10 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "fullname", headerName: "Name", width: 100 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 10,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function AdminPage() {
  const [data, setData] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/admin/all_users");
        console.log(response.data);
        const data = response.data;
        data.map((item) => {
          setData((val) => [
            ...val,
            {
              id: item.id,
              fullname: item.full_name,
              email: item.email,
              age: item.age,
            },
          ]);
        });
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, []);
  return (
    <>
      <NavBar />
      <div
        className="d-flex flex-row justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div style={{ height: 400, width: "60%" }} className="container ">
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            style={{ backgroundColor: "white" }}
          />
        </div>
      </div>
    </>
  );
}

export default AdminPage;
