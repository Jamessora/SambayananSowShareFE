

import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Grid, Typography, Container, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { apiURL } from '../../../services/user/authService';


const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSuccess = async (credentialResponse) => {
        
    console.log(credentialResponse);

    const idToken = credentialResponse.credential;
    console.log("Received ID Token:", idToken);
    try {

      console.log("Sending ID Token to backend for verification...");
      console.log("API Base URL is: ", import.meta.env.VITE_API_BASE_URL);
      const response = await fetch(`${apiURL}/users/sessions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: idToken }),
      });

      const data = await response.json();
      console.log("Received response from backend:", data);

      if (data.success) {
        console.log("Verification successful: user create success");
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('kyc_status', data.kyc_status);
        console.log("Storing the KYC Status Token:", data.kyc_status);
        
        if (data.user) {
          console.log("Storing the user details:", data.user);
          localStorage.setItem('user_details', JSON.stringify(data.user));
        }
        
        navigate('/dashboard');
        // Store session/token and navigate to protected route
      } else {
        console.log("Authentication failed:", data.error);
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("API Base URL is: ", import.meta.env.VITE_API_BASE_URL);
      const response = await fetch(`${apiURL}/users/sessions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        // Store JWT token to browser storage
        localStorage.setItem('jwt', data.jwt);
        console.log ("Storing the JWT Token:", data.jwt);
        localStorage.setItem('kyc_status', data.kyc_status);
        console.log("Storing the KYC Status Token:", data.kyc_status);
        if (data.user) {
          console.log("Storing the user details:", data.user);
          localStorage.setItem('user_details', JSON.stringify(data.user));
        }
        navigate('/dashboard');
      } else {
        console.log('Authentication failed:', data.error);
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.log('Login Failed', error);
          }}
        />
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.log('Login Failed', error);
          }}
        />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleEmailPasswordLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography href="#" variant="body2">
                Forgot password?
              </Typography>
            </Grid>
            <Grid item>
              <Typography href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginComponent;
