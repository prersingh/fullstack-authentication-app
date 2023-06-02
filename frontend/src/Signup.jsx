import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './components/SignupValidation';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));

  };

  return (
    <div className="login-page">
            <div className='topp-circle'></div>

      <div className="login-container">
        <div className="login-form">
          <h2>Sign Up</h2>
          <form action="#" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input type="name" placeholder="Enter Name" name="name" onChange={handleInput} />
              {errors.name && <span>{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Enter Email" name="email" onChange={handleInput} />
              {errors.email && <span>{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter Password" name="password" onChange={handleInput} />
              {errors.password && <span>{errors.password}</span>}
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="login-info">
          <h4>Have an account ? <Link to="/login">Login</Link></h4>
          <div className='logoin'>
          <h2>Login</h2>
          <p>Sign Up is a registration process that allows users to create a new account on a website or application. By providing their name, email, and password, users can create a personalized account and access various features and services.</p>
          </div>
                  </div>
      </div>
      <div className='bottomm-circle'></div>

    </div>
  );
};

export default Signup;
