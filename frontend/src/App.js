import "./App.css";
import React, { useState } from "react";
// import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./Error";
// import Protected from "./components/Protected";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import { Error } from "mongoose";

function App() {
  const [userSuccess, setUserSuccess] = useState({});
  return (
    <div className="App">
      <ToastContainer position="bottom-left" limit={1} />
      <div>
        {/* <span><NavLink to="/login"> login</NavLink> </span> */}
        {/* <button onClick={() =>
          localStorage.removeItem('loginUser')
        }> logout</button> */}
      </div>
      <Routes>
        {/* <Route
          exact
          path="/"
          // element={<Protected Component={Home} userSuccess={userSuccess} setUserSuccess={setUserSuccess} />}
          element={<Home userSuccess={userSuccess} setUserSuccess={setUserSuccess} />}

        /> : */}
        <Route path="/" element={<Login setUserSuccess={setUserSuccess} />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
