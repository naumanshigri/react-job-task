import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config";

let { Group, Control } = Form;

const AddCategory = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [category, setCategory] = useState({
    name: "",
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { name } = category;

    try {
      setError("");
      axios
        .post(
          `${baseUrl}/api/cars/categories`,
          {
            name,
          },
          {
            headers: { "auth-token": token },
          }
        )
        .then((e) => {
          navigate("/dashboard");
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
      <div className="container py-5 add-car">
        <div className="">
          {error && (
            <div class="text-danger text-center mb-3">
              <strong>{error}</strong>
            </div>
          )}
          <div className="back-btn">
            <Link to="/dashboard">back</Link>
          </div>
          <h3>Add Category</h3>
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
                value={category.name}
              />
            </Group>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddCategory;
