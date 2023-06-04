import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch the stored user email
    const userEmail = localStorage.getItem('userEmail');

    // Fetch user data from the server using the user email
    axios
      .get(`http://localhost:8081/user/${userEmail}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className="success-page">
      <div className="topp-circle">
        <Link to="/login" className="back-link">
          &lt;
        </Link>
      </div>
      <div className="success-box">
        {userData ? (
          <>
            <h2>Name: <span>{userData.name}</span></h2>
            <h2>Email: <span>{userData.email}</span></h2>
            <h2>Email status: <strong>Verified</strong></h2>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
