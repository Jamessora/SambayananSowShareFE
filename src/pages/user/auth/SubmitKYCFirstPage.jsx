import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';

const SubmitKYCFirstPage = () => {
  const navigate = useNavigate();

  const handleKYCClick = () => {
    navigate('/kyc');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Submit Your KYC
        </Typography>
        <Typography component="p">
          You need to complete the KYC process to access this page.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleKYCClick}>
          Go to KYC Page
        </Button>
      </Box>
    </Container>
  );
};

export default SubmitKYCFirstPage;
