import React, { Component } from 'react'
import { useState } from 'react';

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const sendData = (user) =>{
        fetch(`http://localhost:5000/login`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json',
            'Access-Control-Allow-Methods' : "POST",
            'Referer': 'http://localhost:3000/sign-in'
            },
        user: JSON.stringify(user)
        }).then(response => response.json())
        .catch(error => console.log(error))

    }

    const handleSubmit=(e)=>{ 
        const user = {email , password}
        e.preventDefault()
        console.log(user)
        sendData(user)
      }



    return (
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              defaultValue={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              defaultValue={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      )

}

export default Login;