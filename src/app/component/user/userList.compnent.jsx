import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./user.component";
import { baseUrl } from "../../../config";

const UserList = () => {
  const [userData, setUserData] = useState();
  const [userId, setuserId] = useState();
  const [totalCount, setTotalCount] = useState();

  useEffect(() => {
    axios.get(`${baseUrl}/api/user/list`).then((res) => {
      let result = res.data.body.user;
      let testRes = res.data.body;
      let totalCount = res.data.body.totalItems;
      setTotalCount(totalCount);
      const userId = localStorage.getItem("userId");
      setuserId(userId);
      setUserData(result);
    });
  }, []);

  return (
    <div>
      <div className="userComponent">
        <div className="page-header">
          <h3 className="page-title ">
            {" "}
            Users: <span className="totalCount">( {totalCount} )</span>{" "}
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Users
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                List
              </li>
            </ol>
          </nav>
        </div>

        <div className="row">
          {userData && userData.length
            ? userData.map((user) => (
                <User
                  key={user._id}
                  name={user.name}
                  email={user.email}
                  image={user.image}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default UserList;
