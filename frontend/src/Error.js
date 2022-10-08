import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Error() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/')
    }, [])
    return (
        <div>
            <h1>page does not exist</h1>
        </div>
    )
}

export default Error
