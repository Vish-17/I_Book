import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "", cpassword: "" })
  const { showAlert } = props

  let history = useNavigate();
  const host = 'http://localhost:5000'
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: userInfo.name, email: userInfo.email, password: userInfo.password })
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authToken)
      showAlert("You Signed-Up Successfully","success");
      history("/")
    }
    else {
      showAlert("User With this email already exist","danger");

    }
  }

  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' value={userInfo.name} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={userInfo.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={userInfo.password} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' value={userInfo.cpassword} onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">SignUp</button>
      </form>
    </div>
  )
}

export default Signup
