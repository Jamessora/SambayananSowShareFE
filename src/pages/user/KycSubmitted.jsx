import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KycSubmitted = () => {

  const navigate = useNavigate();
  
    // Initialize with default values or empty strings
  


  return (
    <div>
      <h1> KYC Submitted Successfully</h1>

      <div>

        Go back to the DashboardPage

        <button onClick={() => navigate('/dashboard')}>
            Back to dashboard
          </button>
      </div>

    </div>
  );
};

export default KycSubmitted
