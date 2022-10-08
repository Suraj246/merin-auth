import React, { useState } from "react";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";

import { NavLink, useNavigate } from 'react-router-dom'

function Login({ userSuccess, setUserSuccess }) {
    const navigate = useNavigate()

    const [loginUser, setLoginUser] = useState({ email: "", password: "" });
    const [visible, setInvisible] = useState(false)
    const show = () => {
        setInvisible(!visible)
    }

    const loginForm = (e) => {
        const { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value });
    };
    const checkLogin = (e) => {
        e.preventDefault();
        const { email, password } = loginUser;
        if (!email || !password) {
            toast.error("Fill Every Field");
            return false;
        }
        axios.post('http://localhost:5000/login', loginUser)
            .then((res) => {
                toast.success("Login Successful")
                setUserSuccess(res.data.loginUser);
                localStorage.setItem('loginUser', JSON.stringify(res.data));
                // navigate('/home')

            })
            .catch((err) => toast.error("Login Failed", err)
            )

    }
    return (
        <>
            <div className="home-page">
                <div className="login-page">
                    <h4 className="text-center welcome">Welcome </h4>
                    <p className="text-center login-header">Enter your email and password </p>
                    <div className="login-container">

                        <Form method="post" className="form">
                            <Form.Group className="mb-3">
                                {/* <Form.Label>Email address</Form.Label> */}
                                <div className="d-flex align-items-center border">
                                    <span><i className='bx bxs-user-detail px-1'></i></span>
                                    <Form.Control
                                        type="email" placeholder="Enter email"
                                        name="email"
                                        id="emailUser"
                                        value={loginUser.email}
                                        onChange={loginForm}
                                        autoComplete="off"
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <div className="d-flex align-items-center border">
                                    <i className='bx bx-lock-alt px-1' ></i>
                                    <Form.Control
                                        type={visible ? "text" : "password"}
                                        placeholder="Password"
                                        name="password"
                                        id="passwordUser"
                                        value={loginUser.password}
                                        onChange={loginForm}
                                        autoComplete="off"

                                    />

                                    <Form.Label className="label px-2 pt-2">
                                        {
                                            visible ? <i className='bx bx-show' onClick={show} ></i>
                                                :
                                                <i className='bx bx-low-vision' onClick={show} ></i>
                                        }
                                    </Form.Label>

                                </div>

                            </Form.Group>

                            <Button variant="primary" type="submit" id="btn" onClick={checkLogin} className="w-100">
                                Login
                            </Button>
                            <div className="d-flex justify-content-between align-items-center py-1 flex-wrap">
                                <NavLink to="/signup" className="navlink">Not Registered Yet?</NavLink>
                                <NavLink to="/signup" className="navlink">Forgot Password?</NavLink>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className="right-container d-flex flex-column flex-wrap overlay-container">
                    <div className="img-container">

                    </div>
                    <div className="overlay">

                    </div>
                    <div className="address">
                        <h3>360&#176; Solution for Asset Management</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam delectus voluptas</p>
                    </div>
                </div>

            </div>
            <div className="footer-container">
                <footer className="p-1">
                    <span className="px-2">Terms of User</span>
                    <span>Privacy Policy</span><br />
                    <span>&#169; Punctualiti 2022 All rights reserved</span>
                </footer>
            </div>
        </>
    );
}

export default Login;
