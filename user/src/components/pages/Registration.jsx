import React, { useState, useEffect } from 'react';
import registrationFormImg from '../img/registrationfrom-img.png';
import Navbar from '../Template/Navbar';
import thankyouImg from '../img/thankyou-png.png';
import { Link } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    adress: '',
    state: '',
    city: '',
    adharno: '',
    reference: '',
    ocupation: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [occupations, setOccupations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // New state for modal visibility

  const handleChange = (event) => {
    const { name, value } = event.target;
    let cleanedValue = value;
    let error = '';

    switch (name) {
      case 'number':
        cleanedValue = value.replace(/\D/g, '').slice(0, 10);
        if (cleanedValue.length !== 10) {
          error = 'Mobile number must be 10 digits.';
        }
        break;
      case 'adharno':
        cleanedValue = value.replace(/\D/g, '').slice(0, 12);
        if (cleanedValue.length !== 12) {
          error = 'Aadhar number must be 12 digits.';
        }
        break;
      case 'name':
        cleanedValue = value.replace(/[^A-Za-z\s]/ig, '');
        if (!cleanedValue) {
          error = 'Name is required and must contain only letters.';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = 'Invalid email address.';
        }
        break;
      default:
        if (!value) {
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
        }
        break;
    }

    setFormData(prevState => ({ ...prevState, [name]: cleanedValue }));
    setValidationErrors(prevState => ({ ...prevState, [name]: error }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;
    let errors = {};

    if (!formData.name) {
      errors.name = 'Name is required.';
      valid = false;
    }
    if (!formData.email) {
      errors.email = 'Email is required.';
      valid = false;
    }
    if (!formData.number) {
      errors.number = 'Mobile number is required.';
      valid = false;
    }
    if (!formData.adharno) {
      errors.adharno = 'Aadhar number is required.';
      valid = false;
    }

    setValidationErrors(errors);

    if (!valid) return;

    try {
      const response = await fetch('http://206.189.130.102:6292/api/v1/add-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setModalVisible(true); // Show modal on successful registration
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchOccupations = async () => {
    try {
      const response = await fetch('http://206.189.130.102:6292/api/v1/get-Ocupation');
      const data = await response.json();
      setOccupations(data.Ocupation);
    } catch (error) {
      console.error('Error fetching occupations:', error);
    }
  };

  useEffect(() => {
    fetchOccupations();
  }, []);

  return (
    <>
      <main className='main-container container-fluid px-0 registration-page'>
        <Navbar />
        <div className="container d-flex my-auto" style={{ minHeight: "100vh" }}>
          <div className="row my-md-3 ">
            <div className="col-md-6 d-flex align-items-center mb-3 mb-md-0">
              <div className="text-center text-md-start">
                <img src={registrationFormImg} alt="" className="w-75 my-auto" />
              </div>
            </div>
            <div className="col-md-6 my-auto">
              <h3 className="text-263F53 mb-md-4 mb-3 fw-bolder text-center">Registration Form</h3>
              <form action="" className='' onSubmit={handleSubmit}>
                <div className="card w-100 rounded-4 shadow overflow-hidden mb-4" style={{ background: "#fff0ca" }}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="exampleInput" className="form-label text-263F53 fw-medium">Full Name</label>
                        <input
                          type="text"
                          className="form-control text-263F53 rounded-3"
                          id="exampleInput"
                          placeholder="Enter Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {validationErrors.name && <small className="text-danger">{validationErrors.name}</small>}
                      </div>
                      <div className="col-md-12 mb-3">
                        <label htmlFor="exampleInput" className="form-label text-263F53 fw-medium">Email</label>
                        <input type="email" className="form-control text-8A8A8A rounded-3" id="exampleInput" placeholder='abc@example.com' name='email'
                          value={formData.email}
                          onChange={handleChange} />
                        {validationErrors.email && <small className="text-danger">{validationErrors.email}</small>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleInput" className="form-label text-263F53 fw-medium">Occupation</label>
                        <select id="inputState" className="form-select text-8A8A8A rounded-3" name='ocupation' onChange={handleChange}>
                          <option value="" disabled selected hidden>Select Occupation</option>
                          {occupations.map((val, index) => (
                            <option key={index} value={val._id}>{val.name}</option>
                          ))}
                        </select>
                        {validationErrors.ocupation && <small className="text-danger">{validationErrors.ocupation}</small>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleInput" className="form-label text-263F53 fw-medium">Mobile No.</label>
                        <input
                          type="number"
                          className="form-control text-263F53 rounded-3"
                          id="exampleInput"
                          placeholder="xxxxxxxxxx"
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                          minLength={10}
                          maxLength={10}
                        />
                        {validationErrors.number && <small className="text-danger">{validationErrors.number}</small>}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInput" className="form-label text-263F53 fw-medium">Address </label>
                        <textarea className="form-control rounded-3" placeholder="Enter address here" id="floatingTextarea2" style={{ height: "70px" }} name='adress'
                          value={formData.adress}
                          onChange={handleChange}></textarea>
                        {validationErrors.adress && <small className="text-danger">{validationErrors.adress}</small>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleInput" className="form-label text-263F53 fw-medium">State</label>
                        <input type="text" className="form-control text-263F53 rounded-3" id="exampleInput" placeholder='Enter State' name='state'
                          value={formData.state}
                          onChange={handleChange} />
                        {validationErrors.state && <small className="text-danger">{validationErrors.state}</small>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleInput" className="form-label text-263F53 fw-medium">City</label>
                        <input type="text" className="form-control text-263F53 rounded-3" id="exampleInput" placeholder='Enter City' name='city'
                          value={formData.city}
                          onChange={handleChange} />
                        {validationErrors.city && <small className="text-danger">{validationErrors.city}</small>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleInput" className="form-label text-263F53 fw-medium">Aadhar No.</label>
                        <input
                          type="number"
                          className="form-control text-263F53 rounded-3"
                          id="exampleInput"
                          placeholder="xxxxxxxxxxxx"
                          name="adharno"
                          value={formData.adharno}
                          onChange={handleChange}
                          minLength={12}
                          maxLength={12}
                        />
                        {validationErrors.adharno && <small className="text-danger">{validationErrors.adharno}</small>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleInput" className="form-label text-263F53 fw-medium">Reference</label>
                        <input type="text" className="form-control text-263F53 rounded-3" id="exampleInput" placeholder='Enter Reference Name' name='reference'
                          value={formData.reference}
                          onChange={handleChange} />
                        {validationErrors.reference && <small className="text-danger">{validationErrors.reference}</small>}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn theme-btn btn-warning px-3" type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {modalVisible && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-5 shadow">
              {/* <div className="modal-header">
                <button type="button" className="btn-close" onClick={() => setModalVisible(false)} aria-label="Close"></button>
              </div> */}
              <div className="modal-body">
                <img src={thankyouImg} alt="" className="w-100 img-fluid" />
              </div>
              <div className="modal-footer justify-content-center">
                <Link to="/home" className="text-danger link-underline-light" onClick={() => setModalVisible(false)}>Go to Home Page <i class="fa-solid fa-house ms-2 text-danger"></i></Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Registration;
