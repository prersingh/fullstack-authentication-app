import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './components/SignupValidation';
import axios from 'axios';
import emailjs from 'emailjs-com';

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

  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    setOTP(otp.toString());
    return otp;
  };

  const sendOTPEmail = () => {
    const generatedOTP = generateOTP();

    const templateParams = {
      to_email: values.email,
      from_name: 'Disney',
      from_email: 'disney@gmail.com',
      otp: generatedOTP,
    };

    emailjs
      .send('service_1gfs15h', 'template_q4n1qfg', templateParams, '3_35bjSippjOHCRGX')
      .then((response) => {
        console.log('OTP email sent successfully!', response.status, response.text);
        setOTP(generatedOTP);
        setStep(2);
      })
      .catch((error) => {
        console.error('Error sending OTP email:', error);
        alert('Error sending OTP email. Please try again later.');
      });
  };

  const handleNext = () => {
    setErrors(validation(values));
    if (!errors.name && !errors.email) {
      sendOTPEmail();
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (Number(userOTP) === Number(otp)) {
      setStep(3);
      handleSignup(); 
    } else {
      alert('Invalid OTP');
    }
  };
  
  const handleSignup = () => {
    axios
      .post('http://localhost:8081/signup', values)
      .then((res) => {
        if (res.data === 'Success') {
          navigate('/success');
        } else {
          alert('Signup failed. Please try again.');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error occurred during signup. Please try again later.');
      });
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
            <span className={`${step >= 1 ? 'completed' : ''}`}>Get OTP</span>
            <span className={`${step >= 2 ? 'completed' : ''}`}>Validate OTP</span>
            <span className={`${step >= 3 ? 'completed' : ''}`}>Sign Up</span>
          </div>

          {step === 1 && (
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Enter Name" name="name" onChange={handleInput} />
                {errors.name && <span>{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter Email" name="email" onChange={handleInput} />
                {errors.email && <span>{errors.email}</span>}
              </div>
              <button type="button" onClick={handleNext}>
                Get OTP
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP}>
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