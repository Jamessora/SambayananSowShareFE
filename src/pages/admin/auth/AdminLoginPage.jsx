import React, {useState} from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Paper, Grid } from '@mui/material';
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
        <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <form onSubmit={handleEmailPasswordLogin} style={{ width: '100%', marginTop: '1em' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0 16px' }}
          >
            Login with Email
          </Button>
        </form>
      </Paper>
    </Container>
      );
    };

export default AdminLoginPage;