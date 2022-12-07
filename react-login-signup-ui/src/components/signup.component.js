import React, { Component } from 'react'
import { useState } from 'react';

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [preferences, setPreferences] = useState({});

  const handleSubmit=(e)=>{ 
    e.preventDefault()
    const user = {name, email , password1, password2, preferences}
    fetch('http://localhost:5000/register',{
      method : 'POST',
      mode : 'cors',
      headers: {"Content-Type": "application/json", 'Access-Control-Allow-Methods' : "POST",'Referer': 'http://localhost:3000/'},
      body: JSON.stringify(user)
    }).then(response => response.json)
  }

    const handleSelect = (e) =>{
        var options = e.target.options;
        var value = {};
        for (var i = 0, l = options.length; i < l; i++) {
            var id = i
            if (options[i].selected) {
                
                value[id] = options[i].value
            }
        }
        setPreferences(value)
    }    

      return (
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>Full name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              defaultValue={name}
              onChange={(e)=> setName(e.target.value)}
              required
              name = "name"
              
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              defaultValue={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              name = "email"
              
            />
          </div>
          <div className="mb-3">
            <label>Enter Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              defaultValue={password1}
              onChange={(e)=>setPassword1(e.target.value)}
              required
              name = "password1"
              
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              defaultValue={password2}
              onChange={(e)=>setPassword2(e.target.value)}
              required
              name = "password2"
            />
          </div>
          <div className="mb-3">
            <label>Which news category do you belong to?</label>
          </div>
          <select id = "select" multiple onChange={handleSelect} name = 'preferences'>
              <option>Business</option>
              <option>Entertainment</option>
              <option>Politics</option>
              <option>Sports</option>
              <option>Tech</option>
          </select>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      )
}

export default Register;