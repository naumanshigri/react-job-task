import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import FormInput from "../form-input/input.compnent";
import { baseUrl } from "../../../config";

const UniversityComponent = () => {
  let history = useHistory();

  const [inputList, setInputList] = useState([{ title: "", content: "" }]);
  const [uniOOption, setUniOOption] = useState(null);
  const [university, setUniversity] = useState(null);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { title: "", content: "" }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let universityResponse = await axios.post(
      `${baseUrl}/api/university/details`,
      {
        university,
        inputList,
      }
    );
    console.log("uniersity ", universityResponse);
    if (universityResponse.status === 200) {
      console.log("ther is no errror");
    } else {
      console.log("ther is errror");
    }
    history.push("/university/list");

    return;
  };

  useEffect(() => {
    axios.get(`${baseUrl}/api/university/uniOOption`).then((res) => {
      let result = res.data.body.data;
      setUniOOption(result);
    });
  }, []);
  return (
    <div className="university-component">
      <div className="page-header">
        <h3 className="page-title"> University Details</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Universitys
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Details Create
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card university-nft-card">
            <div className="card-body">
              <form className="forms-sample" id="form" onSubmit={handleSubmit}>
                {/* university  */}
                <Form.Group>
                  <label>University</label>
                  <Select
                    required
                    options={uniOOption}
                    placeholder="Select University"
                    className="mb-3"
                    onChange={setUniversity}
                  />
                </Form.Group>
                {inputList.map((x, i) => {
                  return (
                    <div className="box">
                      <Form.Group>
                        <label>Title</label>
                        <FormInput
                          name="title"
                          placeholder="Enter First Name"
                          value={x.title}
                          className="form-control my-2"
                          required
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <label>Content</label>
                        <textarea
                          className="ml10 form-control my-2"
                          name="content"
                          placeholder="Enter Last Name"
                          value={x.content}
                          rows={8}
                          required
                          onChange={(e) => handleInputChange(e, i)}
                        ></textarea>
                      </Form.Group>
                      <div className="btn-box">
                        {inputList.length !== 1 && (
                          <div className="w-100 text-right">
                            <button
                              className="btn btn-danger mr-2"
                              onClick={() => handleRemoveClick(i)}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                        {inputList.length - 1 === i && (
                          <div className="w-100 text-right pt-4 mr-5">
                            <button
                              className="btn btn-success mr-2"
                              onClick={handleAddClick}
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <button type="submit" className="btn btn-primary mr-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityComponent;
