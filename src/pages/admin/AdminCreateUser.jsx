import React, { useState, useEffect } from 'react';
import { token, apiURL } from '../../services/user/authService';
import UserSidebar from '../../components/AdminSidebar';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Paper, Grid, Typography } from '@mui/material';


const AdminCreateUser = () => {
const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    fullName: '',
    // birthday: '',
    // idType: '',
    // idNumber: '',
    // address_country: '',
    // address_city: '',
    // address_baranggay: '',
    // address_street: '',
    kyc_status: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New user params:",newUser);
    const response = await fetch(`${apiURL}/admin/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user:newUser})
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('User created successfully', data);
      // Redirect or update UI as needed
    } else {
      console.error('Failed to create user', data);
    }
  };

  return (
    <UserSidebar>
    <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Create User
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1em' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={newUser.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={newUser.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="fullName"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  value={newUser.fullName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>KYC Status</InputLabel>
                  <Select
                    name="kyc_status"
                    value={newUser.kyc_status}
                    onChange={handleChange}
                    label="KYC Status"
                  >
                    <MenuItem value="nil">To Submit KYC</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Create User
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </UserSidebar>
  );
  };

  export default AdminCreateUser;