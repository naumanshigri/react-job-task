import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import axios from "axios";
import { Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import FormInput from '../form-input/input.compnent';
import { baseUrl } from '../../../config'


  const UniversityComponent = ()=> {
    let history = useHistory();

    const [country, setCountry] = useState(null)
    const [university, setUniversity ] = useState({ name:'', city:'', website:'' })
    const [image, setImage] = useState({ preview: '', data: '' })

  const [countryOOption, setCountryOOption] = useState(null);
  

   
  const handleChange = event => {
    let {name, value} = event.target
    setUniversity({...university, [name]:value})
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    console.log('imge', img)
    setImage(img)
  }



  const handleSubmit = async event => {
    console.log('form submited')
 
    event.preventDefault()
    const formData = new FormData()
    formData.append("file", image.data)
    formData.append("upload_preset", "international")
    formData.append("cloud_name","djafy8g9w")

    console.log('the form formData', formData)

    let imageUrlRes = await axios.post('https://api.cloudinary.com/v1_1/djafy8g9w/image/upload', formData)


    console.log('the cloud', imageUrlRes)
    console.log('the actual image', imageUrlRes.data.secure_url)
    let data = {
      name:university.name,
      city:university.city,
      website:university.website,
      logo:imageUrlRes.data.secure_url,
      countryId:country.value
    }

    console.log('the api call data', data)
    let universityResponse = await  axios.post(`${baseUrl}/api/university/add`, data) 
    console.log('the university respone', universityResponse)
    history.push("/university/list")

}

useEffect(() => {
axios.get(`${baseUrl}/api/country/countryOption`).then(res => {
let result = res.data.body.data
setCountryOOption(result)
})
},[])

    return (
      <div className='university-component'>
        <div className="page-header">
          <h3 className="page-title"> University </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Universitys</a></li>
              <li className="breadcrumb-item active" aria-current="page">Create </li>
            </ol>
          </nav>
        </div>
        <div className="row">
  
          <div className="col-12 grid-margin stretch-card">
            <div className="card university-nft-card">
           
              <div className="card-body">
                <form className="forms-sample" id='form'  onSubmit={handleSubmit}>

             <Form.Group> 
                  <label>Name</label>
                    <FormInput
                      required
                      type='text'
                      name='name'
                      className="form-control"
                      onChange={handleChange}
                      value={university.name}
                    />
                </Form.Group>
                <Form.Group> 
                  <label>City</label>
                  <FormInput
                  type='text'
                  required
                  name='city'
                  className="form-control"
                  onChange={handleChange}
                  value={university.city}
                   />
                </Form.Group>
                <Form.Group> 
                  <label>Website</label>
                  <FormInput
                  type='text'
                  required
                  name='website'
                  className="form-control"
                  onChange={handleChange}
                  value={university.website}
                   />
                </Form.Group>
            
              <Form.Group>
                    <label>Image</label>
                    <div className="custom-file">  
                    {image.preview && <img style={{marginTop: '60px', borderRadius: '10px'}} src={image.preview} width='100' height='100' />}
                      <Form.Control required type="file" name='file' onChange= {handleFileChange} className="form-control visibility-hidden" id="customFileLang" lang="es"/>
                      <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                    </div>
                  </Form.Group>
                <Form.Group> 
                  <label>Country</label>
                  <Select
                    required
                    options={countryOOption}
                    placeholder='Select Country'
                    className='mb-3'
                    onChange={setCountry}
                  />
                </Form.Group>
                  <button type="submit" className="btn btn-primary mr-2">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default UniversityComponent


