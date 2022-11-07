import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config";

let { Group, Control } = Form;

const AddCar = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [categoryOption, setCategoryOption] = useState([]);
  const [car, setCar] = useState({
    name: "",
    color: "",
    model: "",
    registrationNo: "",
    categoryId: "",
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    setCar({ ...car, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { name, color, model, registrationNo, categoryId } = car;

    try {
      setError("");
      axios
        .post(
          `${baseUrl}/api/cars`,
          {
            name,
            color,
            model,
            registrationNo,
            categoryId,
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

  useEffect(() => {
    getCategoris();
  }, []);

  async function getCategoris(page) {
    let response = await axios.get(`${baseUrl}/api/cars/categories`);
    let { data } = response.data.body;
    let categoryOps = [];
    for (let i = 0; i < data.length; i++) {
      categoryOps.push({ label: data[i].name, value: data[i]._id });
    }
    setCategoryOption(categoryOps);
  }

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
          <h3>Add Car</h3>
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
                value={car.name}
              />
            </Group>
            <label className="w-100">Color</label>
            <Group className="d-flex search-field py-2">
              <Control
                type="text"
                placeholder="Color"
                required
                size="lg"
                name="color"
                className="h-auto w-100"
                onChange={handleChange}
                value={car.color}
              />
            </Group>
            <label className="w-100">Model</label>
            <Group className="d-flex search-field py-2">
              <Control
                type="text"
                placeholder="Model"
                required
                size="lg"
                name="model"
                className="h-auto w-100"
                onChange={handleChange}
                value={car.model}
              />
            </Group>
            <label className="w-100">Registration No</label>
            <Group className="d-flex search-field py-2">
              <Control
                type="text"
                placeholder="Registration No"
                required
                size="lg"
                name="registrationNo"
                className="h-auto w-100"
                onChange={handleChange}
                value={car.registrationNo}
              />
            </Group>
            <label className="w-100">Category</label>
            <Group className="py-2">
              <select
                name="categoryId"
                className="h-auto custom-select my-2"
                onChange={handleChange}
              >
                {categoryOption.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
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
export default AddCar;
