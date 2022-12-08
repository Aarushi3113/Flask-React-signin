import React, { Component } from 'react'
import { useState } from 'react';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit=(e)=>{ 
    e.preventDefault()
    const user = { email , password}
    fetch('https://localhost:5000/login',{
      method : 'POST',
      //mode : 'no-cors',
      headers: {"Content-Type": "application/json", 'Access-Control-Allow-Methods' : "POST",'Referer': 'http://localhost:3000/'},
      body: JSON.stringify(user)
      }).then(response => response.json)
    }



  return (
    <form onSubmit={handleSubmit} method="POST">
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          name = "email"
          id = 'email'
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
          name = "password"
          id = 'password'
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