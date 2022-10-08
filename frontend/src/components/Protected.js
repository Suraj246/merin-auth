import React, { useEffect } from 'react'
import { NavLink, useNavigate, Navigate, useLocation, Route, Redirect } from 'react-router-dom'

function Protected({ userSuccess, Component, ...rest }) {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (userSuccess && userSuccess._id) {
            localStorage.getItem(JSON.parse('loginUser'))
            navigate('/')
            console.log(userSuccess)
        }
        navigate('/login')



    }, [])
    return (
        <div>
            {/* {userSuccess && userSuccess._id ? <Component /> : <Navigate to="/login" state={{ from: location }} />} */}
        </div>
    )
}

export default Protected
