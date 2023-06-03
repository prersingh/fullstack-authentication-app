import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './components/SignupValidation';

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    name: '',
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
    if (errors.name === '' && errors.email === '') {
      const otp_val = Math.floor(Math.random() * 10000);
      setOTP(otp_val);
      setStep(2);
    }
  };

  const handleSignup = () => {

  };

  return (
    <div className="login-page">
      <div className="topp-circle"></div>

      <div className="login-container">
        <div className="login-form">
          <h2>Sign Up</h2>
          <div className="step-completion">
  <div className={`step-dot ${step >= 1 ? 'completed' : ''}`} />
  <div className={`step-line ${step >= 2 ? 'completed' : ''}`} />
  <div className={`step-dot ${step >= 2 ? 'completed' : ''}`} />
  <div className={`step-line ${step >= 3 ? 'completed' : ''}`} />
  <div className={`step-dot ${step >= 3 ? 'completed' : ''}`} />
</div>
<div className="step-text">
  <span className={`${step >= 1 ? 'completed' : ''}`}>
    Get OTP
  </span>
  <span className={`${step >= 2 ? 'completed' : ''}`}>
    Validate OTP
  </span>
  <span className={`${step >= 3 ? 'completed' : ''}`}>
    Sign Up
  </span>
</div>


          {step === 1 && (
            <form action="#">
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
              <button type="button" onClick={handleNext}>
                Get Otp
              </button>
            </form>
          )}

          {step === 2 && (
            <form action="#" onSubmit={handleSignup}>
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
            Have an account? <Link to="/login">Login</Link>
          </h4>
          <div className="logoin">
            <h2>Sign Up</h2>
            <p>
              Sign Up is a registration process that allows users to create a new account on a website or application. By
              providing their name, email, and password, users can create a personalized account and access various features
              and services.
            </p>
          </div>
        </div>
      </div>

      <div className="bottomm-circle"></div>
    </div>
  );
};

export default Signup;
