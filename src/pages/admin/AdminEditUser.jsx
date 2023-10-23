import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { token, apiURL } from '../../services/user/authService';
import UserSidebar from '../../components/AdminSidebar';
import { Container, TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AdminEditUser = () => {
  const [userData, setUserData] = useState(null);
  
  const { userId } = useParams();

  useEffect(() => {
    console.log("User Id:",userId)
    const fetchUserData = async () => {
      const response = await fetch(`${apiURL}/admin/users/${userId}`,{
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        });
         
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
      } else {
        console.error('Failed to fetch user data', data);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiURL}/admin/users/${userId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('User updated successfully', data);
    } else {
      console.error('Failed to update user', data);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <UserSidebar>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Edit User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                type="date"
                id="birthday"
                label="Birthday"
                name="birthday"
                value={userData.birthday}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                value={userData.address_country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                value={userData.address_city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="kyc_status-label">KYC Status</InputLabel>
                <Select
                  labelId="kyc_status-label"
                  id="kyc_status"
                  name="kyc_status"
                  value={userData.kyc_status}
                  onChange={handleChange}
                  label="KYC Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  {/* Add more options if needed */}
                </Select>
              </FormControl>
            </Grid>
            {/* Add other fields */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </UserSidebar>
  );
};
export default AdminEditUser;