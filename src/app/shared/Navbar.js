import React from "react";

import { Box, Modal } from "@mui/material";
import { Dropdown, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../config";
import FormInput from "../component/form-input/input.compnent";
import axios from "axios";

const updatePassword = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 350,
  borderRadius: "20px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  let history = useHistory();
  let token = localStorage.getItem("token");

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [password, setPassword] = React.useState({ old: "", new: "" });
  const [error, setError] = React.useState("");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("smartWallet");
    history.push("/login");
  }

  function toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  function toggleRightSidebar() {
    document.querySelector(".right-sidebar").classList.toggle("open");
  }

  const handleChange = (event) => {
    let { name, value } = event.target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log("form submited");
    event.preventDefault();

    let data = {
      newpassword: password.new,
      oldpassword: password.old,
    };

    axios
      .put(`${baseUrl}/api/user/updatepassword`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setError("");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("the error", error);
        const { message } = error.response.data;
        setError(message);
      });
  };

  return (
    <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item  nav-profile border-0">
            <Dropdown>
              <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                <img
                  className="img-xs rounded-circle"
                  src="https://res.cloudinary.com/atari/atari/defaultUser_juvi6h"
                  alt="Profile"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="preview-list navbar-dropdown py-3">
                <Dropdown.Item
                  className="dropdown-item preview-item d-flex align-items-center border-0 pt-2"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div onClick={handleLogout}>Sign Out</div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          onClick={toggleOffcanvas}
        >
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
