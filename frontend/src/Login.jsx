import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './components/LoginValidation';
import axios from 'axios';
import emailjs from 'emailjs-com';

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

  const loginUser = () => {
    axios
      .post('http://localhost:8081/login', values)
      .then((res) => {
        if (res.data === 'Success') {
          // Store the email in local storage
          localStorage.setItem('userEmail', values.email);
          navigate('/home');
        } else {
          alert('No record exists');
        }
      })
      .catch(err => console.log(err))
  };

  const verifyOTP = () => {
    if (Number(userOTP) === Number(otp)) {
      loginUser();
    } else {
      alert('Invalid OTP');
    }
  };

  const handleNext = () => {
    const validationErrors = validation(values);
    setErrors(validationErrors);
    if (!validationErrors.email) {
      sendOTPEmail();
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    verifyOTP();
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
                Next
              </button>
            </form>
          )}

          {step === 2 && (
            <form action="#" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <input type="text" placeholder="Enter OTP" name="otp" onChange={(e) => setUserOTP(e.target.value)} />
              </div>
              <button type="submit">Log In</button>
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
