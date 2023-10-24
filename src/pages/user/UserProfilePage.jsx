import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { userDetails } from '../../services/user/authService';
import UserSidebar from '../../components/UserSidebar';

const ProfilePage = () => {
    // Retrieve user details from local storage via authService
    const userDetailsStr = userDetails();
    const user = userDetailsStr ? JSON.parse(userDetailsStr) : null;
  
    return (
        <UserSidebar>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
          <Typography variant="h4">Profile Details</Typography>
  
          {user ? (
            <>
              <Typography variant="h6">
                Full Name: {user.fullName || 'Not Available'}
              </Typography>
              <Typography variant="h6">
                Email: {user.email || 'Not Available'}
              </Typography>
              <Typography variant="h6">
                Country: {user.country || 'Not Available'}
              </Typography>
              <Typography variant="h6">
                City: {user.city || 'Not Available'}
              </Typography>
              <Typography variant="h6">
                Street: {user.street || 'Not Available'}
              </Typography>
              {/* Add more fields as needed */}
            </>
          ) : (
            <Typography variant="h6">No User Details Available</Typography>
          )}
        </Paper>
      </Container>
      </UserSidebar>
    );
  };
  
  export default ProfilePage;
  