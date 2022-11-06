import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config";

import "../../assets/style/user.style.scss";

let { Group, Control } = Form;

const Login = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    let { name, value } = event.target;
    setUserToken({ ...userToken, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { email, password } = userToken;

    try {
      setError("");
      let res = await axios.post(`${baseUrl}/api/users/login`, {
        email,
        password,
      });
      console.log("res", res);
      navigate("/dashboard");
    } catch (error) {
      const { message } = error.response.data;
      setError(message);
    }
  };
  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          {error && (
            <div class="text-danger text-center mb-3">
              <strong>{error}</strong>
            </div>
          )}
          <h3>Sign In</h3>
          <form onSubmit={handleSubmit}>
            <label className="w-100">Email</label>
            <Group className="d-flex search-field py-2">
              <Control
                type="email"
                placeholder="Username"
                required
                size="lg"
                name="email"
                className="h-auto w-100"
                onChange={handleChange}
                value={userToken.email}
              />
            </Group>

            <label className="w-100">Password</label>
            <Group className="d-flex search-field py-2">
              <Control
                type="password"
                name="password"
                placeholder="Password"
                required
                size="lg"
                className="h-auto"
                onChange={handleChange}
                value={userToken.password}
              />
            </Group>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <p className="forgot-password text-right">
              Don't have account <Link to="/sign-up">Register ?</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
