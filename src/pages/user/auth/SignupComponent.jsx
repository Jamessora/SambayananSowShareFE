import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const SignupComponent = () => {
    const navigate =  useNavigate();
    const [error, setError] = useState('');
    
    const onSuccess = async (credentialResponse) => {
        
        console.log(credentialResponse);
    
        const idToken = credentialResponse.credential;
        console.log("Received ID Token:", idToken);
        try {
          console.log("Sending ID Token to backend for verification...");
          console.log("API Base URL is: ", import.meta.env.VITE_API_BASE_URL)
          const response = await fetch('/api/users/registrations/create', {
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
            navigate('/email-sent')
            // Store session/token and navigate to protected route
          } else {
            console.log("Verification failed:", data.error);
            setError(data.error);
          }
        } catch (error) {
          console.log('An error occurred:', error);
          setError(error);
        }
      };
    
      return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Grid container spacing={2}>
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error">{error}</Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <GoogleLogin
                    onSuccess={onSuccess}
                    onError={() => {
                      console.log('Login Failed', error);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </ThemeProvider>
      );
    };
    

export default SignupComponent;