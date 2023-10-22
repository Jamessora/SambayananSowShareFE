import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiBaseURL } from '../../../services/user/authService';

const SetInitialPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tokenValid, setTokenValid] = useState(null);

  useEffect(() => {
    // Validate the token when the component mounts
    const validateToken = async () => {
      try {

        console.log("Validating token:", token);

        console.log("imported apiBaseURL:",apiBaseURL)
        const response = await fetch(`${apiBaseURL}/users/set_initial_password`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        console.log("Token validation response:", data);

        if (data.success) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        console.error('Token validation error:', error);
        setTokenValid(false);
      }
    };

    validateToken();
  }, [token]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      console.log("Submitting new password:", password);

      console.log("imported apiBaseURL:",apiBaseURL)
      const response = await fetch(`${apiBaseURL}/users/update_initial_password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();
      console.log("Password update response:", data);

      console.log('Fetch response:', response);
      console.log('Parsed data:', data);

      if (data.success) {
        console.log('Password set successfully');
        alert('Password set successfully');
        navigate('/login'); // Redirect to login page or dashboard
      } else {
        console.log('Failed to set password:', data.message);
        alert('Failed to set password');
        
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred');
    }
  };

  if (tokenValid === null) {
    return <p>Validating token...</p>;
  }

  if (!tokenValid) {
    return <p>Invalid or expired token</p>;
  }

  return (
    <div>
      <h1>Set Your Initial Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Set Password</button>
      </form>
    </div>
  );
};

export default SetInitialPassword;
