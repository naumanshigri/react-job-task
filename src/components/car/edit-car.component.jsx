import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config";

let { Group, Control } = Form;

const UpdateCarRecord = () => {
  const { search } = useLocation();
  const carId = search.split("=")[1];

  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [categoryOption, setCategoryOption] = useState([]);
  const [car, setCar] = useState({
    color: "",
    model: "",
    categoryId: "",
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    setCar({ ...car, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { color, model, categoryId } = car;

    try {
      setError("");
      axios
        .put(
          `${baseUrl}/api/cars/${carId}`,
          {
            color,
            model,
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
          <h3>Update Car Record</h3>
          <form onSubmit={handleSubmit}>
            <label className="w-100">Color</label>
            <Group className="d-flex search-field py-2">
              <Control
                type="text"
                placeholder="Color"
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
                size="lg"
                name="model"
                className="h-auto w-100"
                onChange={handleChange}
                value={car.model}
              />
            </Group>

            <label className="w-100">Category</label>
            <Group className="py-2">
              <Group>
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
export default UpdateCarRecord;
