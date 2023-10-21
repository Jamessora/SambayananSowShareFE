// import React, {useState} from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';

// const LoginComponent = () => {
//     const navigate =  useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const onSuccess = async (credentialResponse) => {
        
//         console.log(credentialResponse);
    
//         const idToken = credentialResponse.credential;
//         console.log("Received ID Token:", idToken);
//         try {
//           console.log("Sending ID Token to backend for verification...");
//           const response = await fetch('${apiBaseURL}/users/sessions/create', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id_token: idToken }),
//           });
    
//           const data = await response.json();
//           console.log("Received response from backend:", data);

//           if (data.success) {
//             console.log("Verification successful: user create success");
//             localStorage.setItem('jwt', data.jwt);
//             navigate('/dashboard');
//             // Store session/token and navigate to protected route
//           } else {
//             console.log("Authentication failed:", data.error);
//           }
//         } catch (error) {
//           console.log('An error occurred:', error);
//         }
//       };
    
//       const handleEmailPasswordLogin = async (e) => {
//         e.preventDefault();
//         try {
//           const response = await fetch('${apiBaseURL}/users/sessions/create', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//           });
    
//           const data = await response.json();
//           if (data.success) {
//             // Store JWT token to browser storage
//             localStorage.setItem('jwt', data.jwt);
//             console.log ("Storing the JWT Token:", data.jwt);
//             navigate('/dashboard');
//           } else {
//             console.log('Authentication failed:', data.error);
//           }
//         } catch (error) {
//           console.log('An error occurred:', error);
//         }
//       };

//       return (
//         <div>
//           <h1>Login</h1>
//         <GoogleLogin
//           onSuccess={onSuccess}
//           onError={() => {
//             console.log('Login Failed', error);
//           }}
//         />

//          {/* Email and Password Login */}
//       <form onSubmit={handleEmailPasswordLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login with Email</button>
//       </form>
//     </div>
//       );
//     };

// export default LoginComponent;

import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Grid, Typography, Container, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
      const response = await fetch('https://sambayanansowshare.onrender.com/users/sessions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: idToken }),
      });
      console.log("Raw Response:", response);
      const data = await response.json();
      console.log("Received response from backend:", data);

      if (data.success) {
        console.log("Verification successful: user create success");
        localStorage.setItem('jwt', data.jwt);
        navigate('/dashboard');
        // Store session/token and nav thaigate to protected route
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
      const response = await fetch('https://sambayanansowshare.onrender.com/users/sessions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("Raw Response:", response);
      const data = await response.json();
      if (data.success) {
        // Store JWT token to browser storage
        localStorage.setItem('jwt', data.jwt);
        console.log ("Storing the JWT Token:", data.jwt);
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
          onError={(error) => {
            console.log('Login Failed', error);
          }}
        />
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        
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
