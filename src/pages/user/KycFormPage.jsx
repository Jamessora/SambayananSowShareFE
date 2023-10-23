import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../services/user/authService';
import { TextField, Button, Container, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import UserSidebar from '../../components/UserSidebar';

const KycFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    birthday: '',
    address_country: '',
    address_city: '',
    address_baranggay: '',
    address_street: '',
    idType: '',
    idNumber: '',
    idPhoto: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, idPhoto: file });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt');

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    const response = await fetch(`${apiURL}/kyc`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        
        'Authorization': `Bearer ${token}`
        
      },
      body: formDataObj,
    });

    const data = await response.json();

    if (data.status === 'success') {
      navigate('/kyc-submitted');
      console.log("Success:", data);
    } else {
      // Handle error (show error message, log it, etc.)
      console.error("Error:", error);
    }
  };

  return (
    <UserSidebar>
    <Container component="main" maxWidth="xs">
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography component="h1" variant="h5">
        Submit KYC
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Birthday"
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Country"
          name="address_country"
          value={formData.address_country}
          onChange={handleChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="City"
          name="address_city"
          value={formData.address_city}
          onChange={handleChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Baranggay"
          name="address_baranggay"
          value={formData.address_baranggay}
          onChange={handleChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Street"
          name="address_street"
          value={formData.address_street}
          onChange={handleChange}
        />

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>ID Type</InputLabel>
          <Select
            name="idType"
            value={formData.idType}
            onChange={handleChange}
            label="ID Type"
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="passport">Passport</MenuItem>
            <MenuItem value="driverLicense">Driver's License</MenuItem>
            <MenuItem value="nationalID">National ID</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="ID Number"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          component="label"
          fullWidth
          margin="normal"
        >
          Upload ID Photo
          <input
            type="file"
            name="idPhoto"
            hidden
            onChange={handleFileChange}
            required
          />
        </Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Box>
  </Container>
  </UserSidebar>
  );
};



export default KycFormPage;
