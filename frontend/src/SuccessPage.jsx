import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="success-page">
      <div className="success-box">
        <h2>Sign Up Successful</h2>
        <p>Redirecting to the login page ...</p>
      </div>
    </div>
  );
};

export default SuccessPage;