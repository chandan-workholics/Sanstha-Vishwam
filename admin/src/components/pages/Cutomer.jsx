import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import Navbar from '../Template/Navbar';
import Home from './Home';
import { toast } from "react-toastify";

const Customer = () => {
  const usertoken = sessionStorage.getItem('token');
  const [deleteid, setDeleteid] = useState('');
  const [data, setData] = useState([]);
  const [ocupation, setOcupation] = useState([]);
  const [post, setPost] = useState({ name: '', email: '', number: '', whatsappno: '', adress: '', ocupation: '', state: '', city: '', adharno: '', reference: '', status: '0' });
  const [editId, setEditId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = (customer) => {
    setPost(customer);
    setEditId(customer._id);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const getOcupation = () => {
    fetch(`http://206.189.130.102:6292/api/v1/get-Ocupation`)
      .then((res) => res.json())
      .then((data) => setOcupation(data?.Ocupation));
  };



  const editCustomer = async (e) => {
    e.preventDefault();
    const { name, email, number, whatsappno, ocupation, adress, state, city, adharno, reference, status } = post;
    const response = await fetch(`http://206.189.130.102:6292/api/v1/update-customer/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, number, whatsappno, ocupation, adress, state, city, adharno, reference, status }),
    });
    if (response.ok) {
      toast.success("Edit successfully");
      getCustomer();
      handleClose();
    } else {
      toast.error("Invalid Credentials");
    }
  };

  const getCustomer = () => {
    fetch(`http://206.189.130.102:6292/api/v1/get-customer`)
      .then((res) => res.json())
      .then((data) => setData(data.data));
  };

  const deleteCustomer = (_id) => {
    fetch(`http://206.189.130.102:6292/api/v1/delete-customer/${_id}`, {
      method: "DELETE"
    }).then((result) => {
      if (result.ok) {
        getCustomer();
      }
    });
  };

  useEffect(() => {
    getCustomer();
    getOcupation();
  }, []);

  if (!usertoken) {
    return <Home />
  }
  return (
    <>
      <Navbar />

      <div className='container my-5 pb-5'>
        <div className='row'>
          <div className='col-md-12'>
            <div className="card tbl-card mt-3">
              <div className="table-responsive">
                <table className="table table-striped tbl-blue-theme" >
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Name</th>
                      {/* <th>Email</th> */}
                      <th>Contact No</th>
                      <th>Ocupation</th>
                      <th>Adress</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Adhar</th>
                      {/* <th>Reference</th> */}
                      <th className='text-center'>Status</th>
                      <th className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((val, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{val.name}</td>
                        {/* <td>{val.email}</td> */}
                        <td><i class="fa-solid fa-phone me-2"></i>{val.number} <br /><i class="fa-brands fa-whatsapp me-2"></i>{val.whatsappno}</td>
                        <td>{val.ocupation?.name}</td>
                        <td>{val.adress}</td>
                        <td>{val.state}</td>
                        <td>{val.city}</td>
                        <td>{val.adharno}</td>
                        {/* <td>{val.reference}</td> */}
                        <td>{val.status === 1 ?
                          <button type="button" className="btn btn-sm py-1 btn-success text-white mx-1 d-flex justify-content-center" style={{ width: "90px" }}>Active </button> : <button type="button" className="btn btn-sm py-1 btn-warning text-white mx-1 d-flex justify-content-center" style={{ width: "90px" }}>Inactive </button>}</td>
                        <td>
                          <div className='d-flex justify-content-center'>
                            <button type="button" className="btn btn-sm btn-info mx-1 text-white d-flex justify-content-center" style={{ width: "35px", height: "35px" }} onClick={() => handleShow(val)}><i class="fa-solid fa-pen-to-square"></i> </button>
                            <button type="button" className="btn btn-sm btn-danger mx-1 text-white d-flex justify-content-center" style={{ width: "35px", height: "35px" }} data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => { setDeleteid(val._id) }}><i class="fa-solid fa-trash-can"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title><span className="text-red">Edit Customer</span></Modal.Title>
          <button type="button" className="close modal-closebtn" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
            <span aria-hidden="true"><i className="fa-solid fa-xmark"></i></span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form onSubmit={editCustomer}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">Name:</label>
                      <input type="text" className="form-control" id="name" placeholder="Customer Name" name="name" value={post.name} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">Email:</label>
                      <input type="text" className="form-control" id="email" placeholder="Customer Email" name="email" value={post.email} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="number" className="form-label">Number:</label>
                      <input type="text" className="form-control" id="number" placeholder="Customer Number" name="number" value={post.number} onChange={handleChange} minLength={10}
                        maxLength={10} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="number" className="form-label">Whatsapp Number:</label>
                      <input type="text" className="form-control" id="number" placeholder="Customer Number" name="whatsappno" value={post.whatsappno} onChange={handleChange} minLength={10}
                        maxLength={10} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="ocupation" className="form-label">Ocupation:</label>
                      <select className="form-select" name="ocupation" value={post.ocupation} onChange={handleChange}>
                        {ocupation.map((val) => (
                          <option key={val._id} value={val._id}>{val.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="adress" className="form-label">Adress:</label>
                      <input type="text" className="form-control" id="adress" placeholder="Customer Address" name="adress" value={post.adress} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="state" className="form-label">State:</label>
                      <input type="text" className="form-control" id="state" placeholder="Customer State" name="state" value={post.state} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="city" className="form-label">City:</label>
                      <input type="text" className="form-control" id="city" placeholder="Customer City" name="city" value={post.city} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="adharno" className="form-label">Aadhar:</label>
                      <input type="text" className="form-control" id="adharno" placeholder="Customer Aadhar No" name="adharno" value={post.adharno} onChange={handleChange}
                        minLength={12} maxLength={12} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="reference" className="form-label">Reference:</label>
                      <input type="text" className="form-control" id="reference" placeholder="Customer Reference" name="reference" value={post.reference} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">Status:</label>
                      <select className="form-select" name="status" value={post.status} onChange={handleChange}>
                        <option value="1">Active</option>
                        <option value="0">Deactive</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-info mx-auto">Submit</button>
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
              <button type="button" className="btn" data-bs-dismiss="modal" onClick={() => deleteCustomer(deleteid)}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
