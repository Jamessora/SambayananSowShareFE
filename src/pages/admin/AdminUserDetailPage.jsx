import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { token, apiURL } from '../../services/user/authService';
import UserSidebar from '../../components/AdminSidebar';
import { Typography, Paper, Box, Tabs, Tab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminUserDetailPage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [value, setValue] = useState(0);
    const { userId } = useParams();

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  useEffect(() => {
    console.log("User Id:",userId)
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${apiURL}/admin/users/${userId}`,{
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            
        },


        })
        const data = await response.json();
        if (response.ok) {
            setUserDetails(data);
          } else {
            console.error('Failed to fetch user details:', data);
          }
        }
       catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const cropsColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'crop_name', headerName: 'Crop Name', width: 200 },
    { field: 'crop_price', headerName: 'Crop Price', type: 'number', width: 150 },
  ];

  const transactionsColumns = [
    { field: 'id', headerName: 'Transaction ID', width: 150 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'total_price', headerName: 'Total Price', type: 'number', width: 150 },
  ];

  return (
    <UserSidebar>
      <div sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#fff', // You can set this to match your theme
      }}>
        <Typography variant="h4">User Details</Typography>
        <Typography variant="h6">Email: {userDetails.email}</Typography>
        <Typography variant="h6">Full Name: {userDetails.fullName}</Typography>
      </div>
      {/* ... Other user details here ... */}
      
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Crops" {...a11yProps(0)} />
            <Tab label="Bought Transactions" {...a11yProps(1)} />
            <Tab label="Sold Transactions" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <DataGrid rows={userDetails.crops} columns={cropsColumns} pageSize={5} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <DataGrid rows={userDetails.bought_transactions} columns={transactionsColumns} pageSize={5} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <DataGrid rows={userDetails.sold_transactions} columns={transactionsColumns} pageSize={5} />
        </CustomTabPanel>
      </Box>
    </UserSidebar>
  );
};

export default AdminUserDetailPage;
