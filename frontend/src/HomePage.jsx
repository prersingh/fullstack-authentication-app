import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

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
