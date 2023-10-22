import React, {useState} from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { apiURL } from '../../../services/user/authService';


const AdminLoginPage = () => {
    const navigate =  useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

      const handleEmailPasswordLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${apiURL}/admins/sign_in`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json"
            },
            body: JSON.stringify({ admin: { email, password } }),
          });
    
          const data = await response.json();
          if (data.success) {
            // Store JWT token to browser storage
            if (data.jwt) {
              localStorage.setItem('jwt', data.jwt);
              console.log("Storing the JWT Token:", data.jwt);
            }
            
            navigate('/admin/dashboard');
          } else {
            console.log('Authentication failed:', data.error);
          }
        } catch (error) {
          console.log('An error occurred:', error);
        }
      };

      return (
        <div>
          <h1>Login</h1>
        {/* Email and Password Login */}
      <form onSubmit={handleEmailPasswordLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login with Email</button>
      </form>
      </div>
      );
    };

export default AdminLoginPage;