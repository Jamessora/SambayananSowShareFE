import React from 'react';
import { useNavigate } from 'react-router-dom';
import {apiBaseURL, token} from '../../../services/user/authService';


const SignOutPage = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Replace with the actual API endpoint and method to sign out
      const response = await fetch(`${apiBaseURL}/users/sign_out`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h1>Are you sure you want to sign out?</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOutPage;
