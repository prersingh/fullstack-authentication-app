import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './components/LoginValidation';


const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
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
      <div className='top-circle'></div>
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <form action="#" onSubmit={handleSubmit}>
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
            <button type="submit">Log In</button>
          </form>
        </div>
        <div className="login-info">
          <h4>Don't have an account ? <Link to="/">Sign Up</Link></h4>
          <div className='logoin'>
          <h2>Login</h2>
          <p>Login is a secure authentication process that allows users to access their personal accounts on a website or application. By entering their registered email and password, users can verify their identity and gain access to their personalized features, data, and settings.</p>
          </div>
        </div>
      </div>
      <div className='bottom-circle'></div>
    </div>
  );
};

export default Login;
