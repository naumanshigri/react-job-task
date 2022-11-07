import React from "react";
import { Link } from "react-router-dom";

import LogoImg from "../../assets/image/ropstam-logo.png";

function Header() {
  let lcStrg = localStorage.getItem("user");

  let handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="mb-5">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/dashboard"}>
            <img className="brand-logo" src={LogoImg} alt="logo-img" />
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {lcStrg ? (
                <li className="nav-item">
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
