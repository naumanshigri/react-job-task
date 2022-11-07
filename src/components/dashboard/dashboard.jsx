import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { AiOutlineDelete, AiTwotoneEdit } from "react-icons/ai";

import { baseUrl } from "../../config";
import "../../assets/style/dashboard.style.scss";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
// tabels end
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function Dashboard() {
  let pageSize = 5;
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [userPageCount, setUserPageCount] = useState(0);
  const [userPage, setUserPage] = useState(1);

  const [cars, setCar] = useState([]);
  const [carPageCount, setCarPageCount] = useState(0);
  const [carPage, setCarPage] = useState(1);

  const [category, setCategory] = useState([]);
  const [categoryPageCount, setCategoryPageCount] = useState(0);
  const [categoryPage, setCategoryPage] = useState(1);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // get user list
  useEffect(() => {
    getUsers(userPage);
    console.log("use call");
  }, [userPage]);

  async function getUsers(page) {
    let pageNo;
    if (page) {
      pageNo = `?pageNo=${page}`;
    } else {
      pageNo = `?pageNo=${1}`;
    }
    let response = await axios.get(`${baseUrl}/api/users${pageNo}`);
    let { data, count } = response.data.body;
    count = Math.ceil(count / pageSize);
    setUserPageCount(count);
    setUser(data);
  }

  // get car list
  useEffect(() => {
    getCars(carPage);
  }, [carPage]);
  async function getCars(page) {
    let pageNo;
    if (page) {
      pageNo = `?pageNo=${page}`;
    } else {
      pageNo = `?pageNo=${1}`;
    }
    let response = await axios.get(`${baseUrl}/api/cars${pageNo}`);
    console.log("resonse", response);
    // let cars = response.data.body.data;
    let { data, count } = response.data.body;
    count = Math.ceil(count / pageSize);
    setCarPageCount(count);
    setCar(data);
  }

  const handleDeteleCars = async (id) => {
    alert("you are deleting car");
    axios
      .delete(`${baseUrl}/api/cars/${id}`, {
        headers: { "auth-token": token },
      })
      .then((e) => {
        window.location.reload();
      });
  };

  // get Category list
  useEffect(() => {
    getCategoris(categoryPage);
  }, [categoryPage]);

  async function getCategoris(page) {
    let pageNo;
    if (page) {
      pageNo = `?pageNo=${page}`;
    } else {
      pageNo = `?pageNo=${1}`;
    }
    let response = await axios.get(`${baseUrl}/api/cars/categories${pageNo}`);
    let { data, count } = response.data.body;
    let categoryOps = [];
    for (let i = 0; i < data.length; i++) {
      categoryOps.push({ label: data[i].name, value: data[i]._id });
    }
    count = Math.ceil(count / pageSize);
    setCategoryPageCount(count);
    setCategory(data);
  }

  // delete category
  const handleDeteleCategory = async (id) => {
    alert("you are deleting category");
    axios
      .delete(`${baseUrl}/api/cars/categories/${id}`, {
        headers: { "auth-token": token },
      })
      .then((e) => {
        window.location.reload();
      });
  };

  const handleAddCar = () => {
    navigate("/addcar");
  };

  const handleUpdateCar = (id) => {
    navigate({
      pathname: "/updatecar",
      search: `?${createSearchParams({ query: id })}`,
    });
  };

  const handleAddCategory = () => {
    navigate("/addcategory");
  };

  const handleUpdateCategory = (id) => {
    navigate({
      pathname: "/updatecategory",
      search: `?${createSearchParams({ query: id })}`,
    });
  };

  return (
    <>
      <div className="dashboard">
        <Box
          className="pt-5"
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: "100vh",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Users" {...a11yProps(0)} />
            <Tab label="Cars" {...a11yProps(1)} />
            <Tab label="Categories" {...a11yProps(2)} />
          </Tabs>

          {/* users  */}
          <TabPanel value={value} index={0}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Role</TableCell>
                    <TableCell align="right">Password</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.slice(0, 5).map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{row._id}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                      <TableCell align="right">{row.password}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={userPageCount}
                  variant="outlined"
                  color="primary"
                  onChange={(event, val) => setUserPage(val)}
                />
              </Stack>
            </div>
          </TabPanel>

          {/* cars  */}
          <TabPanel value={value} index={1}>
            <div className="add-btn">
              <span onClick={handleAddCar}>+</span>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>category</TableCell>
                    <TableCell align="right">Color</TableCell>
                    <TableCell align="right">Model</TableCell>
                    <TableCell align="right">Registration No</TableCell>
                    <TableCell align="right">Owner</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cars.map(
                    ({
                      _id,
                      color,
                      category,
                      model,
                      registrationNo,
                      ownerId,
                    }) => (
                      <TableRow
                        key={_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">{_id}</TableCell>
                        <TableCell component="th" scope="row">
                          {color}
                        </TableCell>
                        <TableCell align="right">{category}</TableCell>
                        <TableCell align="right">{model}</TableCell>
                        <TableCell align="right">{registrationNo}</TableCell>
                        <TableCell align="right">{ownerId}</TableCell>
                        <TableCell align="right">
                          <a
                            href="javascript:void(0);"
                            onClick={() => handleUpdateCar(_id)}
                          >
                            <AiTwotoneEdit
                              className="mr-2"
                              style={{ color: "green" }}
                            />
                          </a>
                        </TableCell>
                        <TableCell align="right">
                          <a href="#" onClick={() => handleDeteleCars(_id)}>
                            <AiOutlineDelete
                              className="mr-2"
                              style={{ color: "red" }}
                            />
                          </a>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* car pagination */}
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={carPageCount}
                  variant="outlined"
                  color="primary"
                  onChange={(event, val) => setCarPage(val)}
                />
              </Stack>
            </div>
          </TabPanel>

          {/* categoris  */}
          <TabPanel value={value} index={2}>
            <div className="add-btn">
              <span onClick={handleAddCategory}>+</span>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.map(({ _id, name }) => (
                    <TableRow
                      key={_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{_id}</TableCell>
                      <TableCell component="th" scope="row">
                        {name}
                      </TableCell>
                      <TableCell align="right">
                        <a href="#" onClick={() => handleUpdateCategory(_id)}>
                          <AiTwotoneEdit
                            className="mr-2"
                            style={{ color: "green" }}
                          />
                        </a>
                      </TableCell>
                      <TableCell align="right">
                        <a href="#" onClick={() => handleDeteleCategory(_id)}>
                          <AiOutlineDelete
                            className="mr-2"
                            style={{ color: "red" }}
                          />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Categories pagination */}
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={categoryPageCount}
                  variant="outlined"
                  color="primary"
                  onChange={(event, val) => setCategoryPage(val)}
                />
              </Stack>
            </div>
          </TabPanel>
        </Box>
      </div>
    </>
  );
}
export default Dashboard;
