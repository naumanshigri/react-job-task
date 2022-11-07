import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios'
import Select from 'react-select';
import { baseUrl } from "../../config";

const Register = () => {

  const [userToken, setUserToken ] = useState({ name:'', email:'', password:'',  })
  const [genderData, setGenderData] = useState('')
  const [error, setError] = useState('')

  const handleChange = event => {
      let { name, value} = event.target
      setUserToken({...userToken, [name]:value})
    }; 

  const handleChangeSelect = (selected) => {
    setUserToken({...userToken, gender: selected.value})
    setGenderData(selected)

  };

    let history = useHistory();
  
    const handleSubmit = async event => {
      event.preventDefault()
    try { 

      setError('');
     let users = await axios.post(`${baseUrl}/api/admin/register`, userToken)
     console.log('the user', users)
     history.push("/login");

    } catch (error) {
      const { message } = error.response.data;
      setError(message);
    }

  
  }
    return (
      <div>
        <div className="d-flex align-items-center auth px-0"  style={{paddingTop:'200px'}}>
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={'https://algowebsite.s3.amazonaws.com/market_place/logo_y.png'} alt="logo" />
                </div>
                <div className='registerText'>
                  <h4>New here?</h4>
                  <h6 className="font-weight-light">Sign in your account</h6>
                  {error &&  <div class="alert-login">
                  <strong>{error}</strong>
                </div>}
                </div>
                <form className="pt-3" onSubmit={handleSubmit}>
                <Form.Group className="d-flex search-field">
                <Form.Control 
                      type="text"
                      placeholder="User Name"
                      required size="lg"
                      name='name'
                      className="h-auto" 
                      onChange={handleChange}
                      value={userToken.name} />
                  </Form.Group>
                <Form.Group className="d-flex search-field">
                    <Form.Control 
                      type="email"
                      placeholder="Email"
                      required size="lg"
                      name='email'
                      className="h-auto" 
                      onChange={handleChange}
                      value={userToken.email} />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                     type="password" 
                     name='password'
                     placeholder="Password" 
                     required size="lg" 
                     className="h-auto"
                     onChange={handleChange}
                     value={userToken.password} />
                  </Form.Group>
                  
                  <button type='submit' className='btn btn-block btn-icicb auth-form-btn'>Register</button>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/user-pages/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Register
