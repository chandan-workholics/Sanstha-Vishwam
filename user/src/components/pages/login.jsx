import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const LoginCard = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };

    const Submit = async (e) => {
        e.preventDefault();
        const { username, password } = data;
        if (!username || !password) {
            toast.warning('Please enter all the fields.');
            return;
        }
        const fetchdata = fetch("http://206.189.130.102:6292/api/v1/user-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const response = await fetchdata;
        const res = await response.json();

        if (response.status === 200) {
            sessionStorage.setItem("token", res.token);
            toast.success('Log-in successfully')
            navigate("/home");
        } else {
            toast.error("Invalid Credentials");
        }
    };


    return (
        <>
            <div className="container-fluid p-0 h-100 bg-fff0ca">
                <div className="container " style={{ minHeight: "100vh" }}>
                    <div className="row d-flex align-items-center" style={{ minHeight: "100vh" }}>
                        <div className="col-md-6 col-lg-4 mx-auto">
                            <h3 className='text-263F53 text-center fw-bolder mb-4'>लॉग इन करें</h3>
                            <div className="card rounded-5 shadow border-0 overflow-hidden">
                                <div className="card-body p-4">
                                    <div className="form-group mb-3">
                                        <label className='text-263F53 fw-semibold mb-2'>Username</label>
                                        <input
                                            type="email"
                                            placeholder="Enter Username"
                                            className='py-2 form-control'
                                            onChange={handleChange}
                                            name='username'
                                            value={data.username}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='text-263F53 fw-semibold mb-2'>Password</label>
                                        <div className="password-container position-relative">
                                            <input
                                                type='password'
                                                placeholder="Password"
                                                className="form-control py-2"
                                                onChange={handleChange}
                                                name='password'
                                                value={data.password}
                                            />
                                            <span
                                                className="toggle-password position-absolute"
                                                style={{ top: "10px", right: "10px" }}
                                            >
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h6 className=''>
                                            {/* <Link to="#" className='text-263F53' style={{ fontSize: "14px" }}>Forgot password?</Link> */}
                                        </h6>
                                    </div>
                                    <button type="submit" className="btn btn-danger w-100 py-2 bg-00AFEF my-3" onClick={Submit}>Login</button>
                                    <div className="links text-center">
                                        <span className='fw-semibold text-263F53'>संस्था विश्वम् में नये हैं ? <Link to="/sign-up" className='text-premary modal-link'>Signup Now</Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginCard;
