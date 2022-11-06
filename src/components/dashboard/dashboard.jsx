import React from "react";
import "../../assets/style/dashboard.style.scss";

function dashboard() {
  let lcStrg = localStorage.getItem("token");
  return (
    <>
      <div className="dashboard">
        <div className="row">
          <div className="col-md-2 side-bar">
            <div className="mt-5">
              <ul>
                <li>Cars </li>
                <li> Category </li>
              </ul>
            </div>
          </div>
          <div className="col-md-10 mt-5">dashboard lc {lcStrg} </div>
        </div>
      </div>
    </>
  );
}

export default dashboard;
