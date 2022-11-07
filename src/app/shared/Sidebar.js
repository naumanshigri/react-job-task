import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { Trans } from "react-i18next";
import axios from "axios";
import { baseUrl } from "../../config";

const Sidebar = (props) => {
  const [state, setState] = useState({});

  const toggleMenuState = (menuState) => {
    if (state[menuState]) {
      setState({ [menuState]: false });
    } else if (Object.keys(state).length === 0) {
      setState({ [menuState]: true });
    } else {
      Object.keys(state).forEach((i) => {
        setState({ [i]: false });
      });
      setState({ [menuState]: true });
    }
  };

  useEffect(() => {
    onRouteChanged();
  }, [props.location]);

  const isPathActive = (path) => {
    return props.location.pathname.startsWith(path);
  };

  // Get user name
  const getUserId = async () => {
    const userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");
  };

  useEffect(() => {
    onRouteChanged();
    getUserId();
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }, []);

  const onRouteChanged = () => {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(state).forEach((i) => {
      setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/blog", state: "blogMenuOpen" },
      { path: "/university", state: "universityMenuOpen" },
      { path: "/event", state: "eventMenuOpen" },
      { path: "/level", state: "levelMenuOpen" },
      { path: "/studentLife", state: "studentLifeMenuOpen" },
      { path: "/country", state: "countryMenuOpen" },
      { path: "/course", state: "courseMenuOpen" },
      { path: "/department", state: "departmentMenuOpen" },
      { path: "/requirement", state: "requirementMenuOpen" },
      { path: "/user", state: "userMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (isPathActive(obj.path)) {
        setState({ [obj.state]: true });
      }
    });
  };

  return (
    <nav className="sidebar sidebar-offcanvas pb-5" id="sidebar">
      <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
        <p className="mt-5 sidebar-brand brand-logo custom-logo">
          <h5 className="heading">ANGlobal</h5>
        </p>
        <a className="sidebar-brand brand-logo-mini pt-3" href="index.html">
          <img src={require("../../assets/images/logo-mini.svg")} alt="logo" />
        </a>
      </div>
      <ul className="nav">
        <li className="nav-item nav-profile not-navigation-link">
          <div className="nav-link">
            <div className="d-flex justify-content-between align-items-start">
              <div className="profile-image"></div>
              <div className="text-wrapper">
                <p className="designation">Welcome to Admin Panel </p>
              </div>
            </div>
          </div>
        </li>
        <li
          className={
            isPathActive("/dashboard") ? "nav-item active" : "nav-item"
          }
          onClick={() => getUserId()}
        >
          <Link className="nav-link" to="/dashboard">
            <i className="mdi mdi-television menu-icon"></i>
            <span className="menu-title">
              <Trans>Dashboard</Trans>
            </span>
          </Link>
        </li>
        <li className={isPathActive("/user") ? "nav-item active" : "nav-item"}>
          <div
            className={
              state.userMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => {
              getUserId();
              toggleMenuState("userMenuOpen");
            }}
            data-toggle="collapse"
          >
            <i className="mdi mdi-format-list-bulleted menu-icon"></i>
            <span className="menu-title">
              <Trans>User</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={state.userMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <Link
                  className={
                    isPathActive("/user/list") ? "nav-link active" : "nav-link"
                  }
                  to="/user/list"
                >
                  <Trans>User List</Trans>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        {/* university  */}
        <li
          className={
            isPathActive("/form-elements") ? "nav-item active" : "nav-item"
          }
        >
          <div
            className={
              state.universityMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => {
              getUserId();
              toggleMenuState("universityMenuOpen");
            }}
            data-toggle="collapse"
          >
            <i className="mdi mdi-format-list-bulleted menu-icon"></i>
            <span className="menu-title">
              <Trans>University</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={state.universityMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={
                    isPathActive("/compnent/university")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/university/create"
                >
                  <Trans>Create</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    isPathActive("/compnent/university/university")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/university/list"
                >
                  <Trans>List</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    isPathActive("/compnent/university/university")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/university/detail"
                >
                  <Trans>Details</Trans>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Sidebar);
