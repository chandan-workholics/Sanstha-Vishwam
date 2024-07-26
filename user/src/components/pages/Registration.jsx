import React, { useState, useEffect } from 'react';
import registrationFormImg from '../img/registrationfrom-img.png'

const Registration = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    state: '',
    city: '',
    adharno: '',
    reference: '',
    ocupation: ''
  });
  const [occupations, setOccupations] = useState([]);

  // const handleChange = (event) => {
  //   // Destructure the event target for easier access
  //   const { name, value } = event.target;

  //   // Special handling for specific fields
  //   if (name === 'number') {
  //     // Remove non-digit characters and limit to 10 characters
  //     const cleanedValue = value.replace(/\D/g, '').slice(0, 10);
  //     setFormData({ ...formData, [name]: cleanedValue });
  //   } else if (name === 'adharno') {
  //     // Remove non-digit characters and limit to 12 characters
  //     const cleanedValue = value.replace(/\D/g, '').slice(0, 12);
  //     setFormData({ ...formData, [name]: cleanedValue });
  //   } else if (name === 'name') {
  //     // Validate name to allow only alphabetic characters
  //     const cleanedValue = value.replace(/[^A-Za-z]/ig, '');
  //     setFormData({ ...formData, [name]: cleanedValue });
  //   } else {
  //     // For other fields, update form data as usual
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'number') {
      const cleanedValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prevState => ({ ...prevState, [name]: cleanedValue }));
    } else if (name === 'adharno') {
      const cleanedValue = value.replace(/\D/g, '').slice(0, 12);
      setFormData(prevState => ({ ...prevState, [name]: cleanedValue }));
    } else if (name === 'name') {
      const cleanedValue = value.replace(/[^A-Za-z]/ig, '');
      setFormData(prevState => ({ ...prevState, [name]: cleanedValue }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Basic form validation (optional):
    if (!formData.name || !formData.email) {
      alert('Please enter your name and email.');
      return;
    }
    const formDataToSend = new FormData();

    formDataToSend.append('ocupation', formData.ocupation);


    try {
      const response = await fetch('http://206.189.130.102:6292/api/v1/add-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data); // Handle successful response (e.g., display success message)

      // Display success message
      alert('Successfully Registered');
    } catch (error) {
      console.error('Error:', error); // Handle errors (e.g., display error message)
    }
  };





  const fetchOccupations = async () => {
    try {
      const response = await fetch('http://206.189.130.102:6292/api/v1/get-Ocupation');
      const data = await response.json();
      setOccupations(data.Ocupation);
      // console.log(data.occupations);
    } catch (error) {
      console.error('Error fetching occupations:', error);
    }
  };

  useEffect(() => {
    fetchOccupations();
  }, [])


  return (
    <>
      <main className='main-container container-fluid px-0 registration-page'>
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
                <div class="card w-100 rounded-4 shadow overflow-hidden mb-4" style={{ background: "#fff0ca" }}>
                  <div class="card-body">
                    <div className="row">
                      <div class="col-md-12 mb-3">
                        <label for="exampleInput" class="form-label text-263F53 fw-medium">Full Name</label>
                        <input
                          type="text"
                          className="form-control text-263F53 rounded-3"
                          id="exampleInput"
                          placeholder="Enter Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />

                      </div>
                      <div class="col-md-12 mb-3">
                        <label for="exampleInput" class="form-label text-263F53 fw-medium">Email</label>
                        <input type="email" class="form-control text-8A8A8A rounded-3" id="exampleInput" placeholder='abc@example.com' name='email'
                          value={formData.email}
                          onChange={handleChange} />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="exampleInput" class="form-label text-263F53 fw-medium">Occupation</label>
                        <select id="inputState" className="form-select text-8A8A8A rounded-3" name='ocupation' onChange={handleChange}>
                          <option value="" disabled >Select Occupation</option>
                          {occupations.map((val, index) => (
                            <option key={index} value={val._id}>{val.name}</option>
                          ))}
                        </select>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="exampleInput" class="form-label text-263F53 fw-medium">Mobile No.</label>
                        <input
                          type="number"
                          class="form-control text-263F53 rounded-3"
                          id="exampleInput"
                          placeholder="xxxxxxxxxx"
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                          minLength={10}
                          maxLength={10}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="exampleInput" class="form-label text-263F53 fw-medium">Address </label>
                        <textarea class="form-control rounded-3" placeholder="Enter address here" id="floatingTextarea2" style={{ height: "70px" }} name='address'
                          value={formData.address}
                          onChange={handleChange}></textarea>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="exampleInput" class="form-label text-263F53 fw-medium">State</label>
                        <input type="text" class="form-control text-263F53 rounded-3" id="exampleInput" placeholder='Enter Full Name' name='state'
                          value={formData.state}
                          onChange={handleChange} />

                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="exampleInput" class="form-label text-263F53 fw-medium">City</label>
                        <input type="text" class="form-control text-263F53 rounded-3" id="exampleInput" placeholder='Enter Full Name' name='city'
                          value={formData.city}
                          onChange={handleChange} />

                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="exampleInput" class="form-label text-263F53 fw-medium">Aadhar No.</label>
                        <input
                          type="number"
                          class="form-control text-263F53 rounded-3"
                          id="exampleInput"
                          placeholder="xxxxxxxxxxxx"
                          name="adharno"
                          value={formData.adharno}
                          onChange={handleChange}
                          minLength={12}
                          maxLength={12}
                        />

                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="exampleInput" class="form-label text-263F53 fw-medium">Reference</label>
                        <input type="text" class="form-control text-263F53 rounded-3" id="exampleInput" placeholder='Enter Reference Name' name='reference'
                          value={formData.reference}
                          onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn theme-btn btn-warning px-3" onClick={handleSubmit} >Submit</button>
              </form>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}

export default Registration