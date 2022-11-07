import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config";

let { Group, Control } = Form;

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { name, email, password } = user;

    try {
      setError("");
      axios
        .post(`${baseUrl}/api/users/register`, {
          name,
          email,
          password,
        })
        .then((e) => {
          navigate("/sign-in");
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
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

          <h3>Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <label className="w-100">Name</label>
            <Group className="d-flex search-field py-2">
              <Control
                type="text"
                name="name"
                placeholder="Name"
                required
                size="lg"
                className="h-auto"
                onChange={handleChange}
                value={user.name}
              />
            </Group>

            <label className="w-100">Email</label>
            <Group className="d-flex search-field py-2">
              <Control
                type="email"
                placeholder="Email"
                required
                size="lg"
                name="email"
                className="h-auto w-100"
                onChange={handleChange}
                value={user.email}
              />
            </Group>

            <label className="w-100">Password</label>
            <Group className="d-flex search-field py-2">
              <Control
                type="password"
                placeholder="Password"
                required
                size="lg"
                name="password"
                className="h-auto w-100"
                onChange={handleChange}
                value={user.password}
              />
            </Group>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <p className="forgot-password text-right">
              already have an account <Link to="/sign-in">Login </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
