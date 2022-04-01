import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom'

const Login = (props) => {
    const [userInfo, setUserInfo] = useState({ email: "", password: "" })
    const {showAlert} = props
    let history = useNavigate();
    const host = 'http://localhost:5000'
    const handleSubmit = async(e) => {
        e.preventDefault();
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: userInfo.email, password: userInfo.password}) 
            });
            const json = await response.json(); 
            console.log(json);

            if(json.success){
                localStorage.setItem('token', json.authToken )
                showAlert("You have been logged in", "success")

                history("/")
            }
            else{
                showAlert("Invalid User Authentication", "danger")

            }
    }

    const onChange = (e)=>{
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={userInfo.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={userInfo.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login