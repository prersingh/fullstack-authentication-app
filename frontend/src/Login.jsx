import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './components/LoginValidation'

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [otp, setOTP] = useState('');
  const [userOTP, setUserOTP] = useState('');

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleNext = () => {
    setErrors(validation(values));
    if (errors.email === '') {
      const otp_val = Math.floor(Math.random() * 10000);
      setOTP(otp_val);
      setStep(2);
    }
  };

  const handleLogin = () => {
    
  };

  return (
    <div className="login-page">
      <div className="top-circle"></div>
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          {step === 1 && (
            <form action="#">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter Email" name="email" onChange={handleInput} />
                {errors.email && <span>{errors.email}</span>}
              </div>
              <button type="button" onClick={handleNext}>
                Get Otp
              </button>
            </form>
          )}

          {step === 2 && (
            <form action="#" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <input type="text" placeholder="Enter OTP" name="otp" onChange={(e) => setUserOTP(e.target.value)} />
              </div>
              <button type="submit">Validate</button>
            </form>
          )}
        </div>
        <div className="login-info">
          <h4>
            Don't have an account? <Link to="/">Sign Up</Link>
          </h4>
          <div className="logoin">
            <h2>Login</h2>
            <p>
              Login is a secure authentication process that allows users to access their personal accounts on a website or
              application.
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-circle"></div>
    </div>
  );
};

export default Login;
