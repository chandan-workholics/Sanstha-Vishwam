import React, { useState, useEffect } from 'react'
import { Modal } from "react-bootstrap";
import Navbar from '../Template/Navbar'
import Home from './Home';

const Master = () => {
    const usertoken = sessionStorage.getItem('token')
    const [deleteid, Setdeleteid] = useState('')
    const [data, setData] = useState('');

    const [post, setPost] = useState({ name: '' });
    const [edit, setedit] = useState({ name: '' });
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [showeditModal, seteditShowModal] = useState(false);
    const handleeditClose = () => seteditShowModal(false);

    const handleeditShow = (val) => {
        seteditShowModal(true);
        setedit(val)
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPost({ ...post, [name]: value });
    };

    const handleChanges = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setedit({ ...edit, [name]: value });
    };

    const addproduct = async (e) => {
        e.preventDefault();
        const { name } = post
        const fetchdata = fetch('http://206.189.130.102:6292/api/v1/add-Ocupation', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name }),
        })
        const response = await fetchdata;
        await response.json();
        if (response.status === 200) {
            alert('ocupation add successfully')
            handleClose();
            getocupation();
            setPost({ name: '' })
        } else {
            alert("Invalid Credentials");
        }
    }

    const upadateproduct = async (id) => {
        const { name } = edit
        const fetchdata = fetch(`http://206.189.130.102:6292/api/v1/update-Ocupation/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name }),
        })
        const response = await fetchdata;
        await response.json();
        if (response.status === 200) {
            handleeditClose();
            getocupation();
        } else {
            alert("Invalid Credentials");
        }
    }

    const getocupation = () => {
        fetch(`http://206.189.130.102:6292/api/v1/get-Ocupation`)
            .then((res) => {
                return res.json()
            }).then((data) => {
                setData(data)
            })
    }

    function deleteproduct(_id) {
        fetch(`http://206.189.130.102:6292/api/v1/delete-ocupation/${_id}`, {
            method: "DELETE"
        }).then((result) => {
            result.json().then((res) => {
                getocupation();
            })
        })
    }

    useEffect(() => {
        getocupation();
    }, [])

    if (!usertoken) {
        return <Home />
    }
    return (
        <>
            < Navbar />

            <div className='container my-5 pb-5'>
                <div className='row'>
                    <div className='col-md-6 mx-auto'>
                        <div className='d-flex justify-content-end'>
                            <button type="button" class="btn btn-info my-2 text-white" onClick={handleShow}>Add <span><i class="fa-solid fa-plus "></i></span></button>
                        </div>
                        <div className="card tbl-card mt-3">
                            <div className="table-responsive">
                                <table class="table table-striped tbl-blue-theme">
                                    <thead>
                                        <tr>
                                            <th>S.no</th>
                                            <th className='text-start'>Ocupation</th>
                                            <th className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.Ocupation?.map((val, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className='text-capitalize'>{val.name}</td>
                                                    <td>
                                                        <div className='d-flex justify-content-center'>
                                                            <button type="button" class="btn btn-warning mx-1" onClick={() => { handleeditShow(val) }}>Edit <span class="material-symbols-outlined">Edit</span></button>
                                                            <button type="button" class="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => { Setdeleteid(val._id) }}>Delete <span class="material-symbols-outlined"> delete </span></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title> <span className="text-red">Add Ocupation</span>  </Modal.Title>
                    <button type="button" className="close modal-closebtn" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                        <span aria-hidden="true"><i class="fa-solid fa-xmark"></i></span>
                    </button>
                </Modal.Header>
                <Modal.Body>


                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <form >
                                    <div class="mb-3 mt-3">
                                        <label for="name" class="form-label">Ocupation Name:</label>
                                        <input type="text" class="form-control" id="name" placeholder="Ocupation Name" name="name" value={post.name} onChange={handleChange} />
                                    </div>


                                    <button type="submit" class="btn btn-info" onClick={addproduct}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>



                </Modal.Body>
            </Modal>

            <Modal show={showeditModal} onHide={handleeditClose}>
                <Modal.Header >
                    <Modal.Title> <span className="text-red">Edit Product</span>  </Modal.Title>
                    <button type="button" className="close modal-closebtn" data-dismiss="modal" aria-label="Close" onClick={handleeditClose}>
                        <span aria-hidden="true"><i class="fa-solid fa-xmark"></i></span>
                    </button>
                </Modal.Header>
                <Modal.Body>


                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <form >
                                    <div class="mb-3 mt-3">
                                        <label for="name" class="form-label">Ocupation Name:</label>
                                        <input type="text" class="form-control" id="name" placeholder="Ocupation Name" name="name" value={edit.name} onChange={handleChanges} />
                                    </div>


                                    <button type="submit" class="btn btn-info" onClick={() => { upadateproduct(edit._id) }}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">

                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div className="modal-body">
                            Do You Want To Delete Permanently
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn" data-bs-dismiss="modal" onClick={() => deleteproduct(deleteid)}>Yes</button>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default Master