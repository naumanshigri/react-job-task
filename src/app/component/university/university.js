import React from "react";
import { Form } from 'react-bootstrap';
import {Box, Modal } from '@mui/material';
import { baseUrl } from "../../../config";

import FormInput from '../form-input/input.compnent';
import axios from 'axios'


const eidtModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height:430,
    borderRadius:'20px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const deleteModal = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      height:350,
      borderRadius:'20px',
      bgcolor: 'background.paper',
      border: '2px solid #fff',
    // border:'none',
      boxShadow: 24,
      p: 4,
    };

const University = (props) =>{

    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const [university, setUniversity] = React.useState({name:props.name, city:props.city, website:props.website})

    const deleteBlog = async() =>{
        axios.delete(`${baseUrl}/api/university/delete/${props.id}`).then(res => {
                window.location.reload(false)
        })
    }

  const handleChange = event => {
    let {name, value} = event.target
    setUniversity({...university, [name]:value})
  };

  const handleSubmit = async event => {
    console.log('form submited')
    event.preventDefault()

    let data = {
      _id:props.id,
      name:university.name,
      city:university.city,
      website:university.website
    }

    axios.put(`${baseUrl}/api/university/edit`, data).then(res => {
        window.location.reload(false)
})

}

    return (
        <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="university position-relative">
                 <div className="uni_logo">  <img className="logo" src={props.logo} alt="event image" /> </div>
                 <div className="uni-name text-center pt-2"> {props.name} </div>
                 <div className="d-flex justify-content-between position-absolute ED-btns"> 
                    {/* Edit ICON  */}
                    <span className="edit-btn">
                        <svg onClick={handleOpenEdit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </span>

                    {/* Delete ICON  */}
                    <span className="delete-btn">
                        <svg  onClick={handleOpenDelete} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </span>
                </div>
            </div>

             {/* Edit moal  */}
             <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={eidtModal}>
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
                                                    required
                                                    type='text'
                                                    name='city'
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={university.city}
                                                    />
                                                </Form.Group>
                                                <Form.Group> 
                                                    <label>Website</label>
                                                    <FormInput
                                                    required
                                                    type='text'
                                                    name='website'
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={university.website}
                                                    />
                                                </Form.Group>
                                                <button type="submit" className="btn btn-primary mr-2">update</button>
                                            </form>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </Box>
                </Modal>

              {/* Delete moal  */}
              <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='deleteModel'
                >
                    <Box sx={deleteModal} className='deleteModelBox'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <p>Are you sure want to delete </p>
                        <button onClick={deleteBlog}>Delete</button>
                    </Box>
                </Modal>
         
        </div>
    )
}

export default University