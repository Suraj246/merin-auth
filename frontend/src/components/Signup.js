import React, { useState } from "react";
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";

function Signup() {
    const navigate = useNavigate()
    const [signupUser, setsignupUser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });
    const [visible, setInvisible] = useState(false)
    const show = () => {
        setInvisible(!visible)
    }

    const signupForm = (e) => {
        const { name, value } = e.target;
        setsignupUser({ ...signupUser, [name]: value });
    };
    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = signupUser;
        if (password !== cpassword) {
            toast.error("password do not match");

            return false;
        }
        else if (!name || !email || !password) {
            toast.error("fill empty field");
            return false;
        }
        else {
            try {
                // const res = await axios.post('http://localhost:5000/signup', { name, email, password })
                const res = await fetch("http://localhost:5000/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                });
                const resJson = await res.json();
                if (res.status === 409 || !resJson) {
                    toast.error("email already exists");
                    return false;
                }
                setsignupUser({
                    name: "",
                    email: "",
                    password: "",
                    cpassword: "",
                })
                navigate('/')


            } catch (e) {
                toast.error("invalid email or password");

            }
            //     .then(() => {

            //         setsignupUser({
            //             name: "",
            //             email: "",
            //             password: "",
            //             cpassword: "",
            //         })
            //         navigate('/login')
            //     })
            //     .catch(err => {
            //         alert("error: " + err)
            //     })
        }


    }
    return (
        <>
            <div className="home-page">
                <div className="login-page">
                    <h4 className="text-center welcome">Welcome </h4>
                    <p className="text-center login-header">Create Your Account</p>
                    <div className="login-container">

                        <Form method="post" className="form">
                            <Form.Group className="mb-3">
                                <div className="d-flex align-items-center border">
                                    <span><i className='bx bxs-user-detail px-1'></i></span>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        id="text"
                                        value={signupUser.name}
                                        onChange={signupForm}
                                        placeholder="Enter your name"
                                        autoComplete="off"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div className="d-flex align-items-center border">
                                    <span><i className='bx bx-envelope'></i></span>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={signupUser.email}
                                        onChange={signupForm}
                                        placeholder="Enter your email"
                                        autoComplete="off"
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <div className="d-flex align-items-center border">
                                    <i className='bx bx-lock-alt px-1' ></i>
                                    <Form.Control
                                        type={visible ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={signupUser.password}
                                        onChange={signupForm}
                                        placeholder="Enter your password"
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
                            <Form.Group className="mb-3" >
                                <div className="d-flex align-items-center border">
                                    <i className='bx bx-lock-alt px-1' ></i>
                                    <Form.Control
                                        type={visible ? "text" : "password"}
                                        name="cpassword"
                                        id="cpassword"
                                        value={signupUser.cpassword}
                                        onChange={signupForm}
                                        placeholder="Enter your confirm password"
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

                            <Button variant="primary" type="submit" id="btn" onClick={registerUser} className="w-100">
                                Signup
                            </Button>
                            <div className="d-flex justify-content-between align-items-center py-1 flex-wrap">
                                <NavLink to="/" className="navlink">Already signed in?</NavLink>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className="right-container d-flex flex-column overlay-container">
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

export default Signup;
