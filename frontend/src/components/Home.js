import React, { useState ,useEffect}from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

function Home({ setUserSuccess,userSuccess }) {
  const navigate = useNavigate()

  const [name,setName] = useState('')
  useEffect(()=>{
    const user = async()=>{
      const config = {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("loginUser")
        }
      }
      try{
        const dat=await axios.get('http://localhost:5000/user',config)
        setName(dat.data)

      }
      catch(err){console.log(err)}
    }
    // console.log(user())
    user()
  },[])
  const logout = ()=>{
          
          const userDelete = localStorage.removeItem('loginUser')
          if(userDelete === localStorage.removeItem('loginUser')){
            return navigate('/')
          }
  }
  return (
    <div>
      <h1>i am Home now {name}</h1>
      {/* {userSuccess.userAvailable.map((user)=>{
        return (
          <div>
            <h1>{user.name}</h1>
          </div>
        )
      })} */}
      {/* <div className="button" onClick={() => setUserSuccess({})} >Logout</div> */}
          <button onClick={logout}> logout</button>
    </div>
  )
}

export default Home
