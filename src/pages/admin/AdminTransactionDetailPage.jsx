import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { token, apiURL } from '../../services/user/authService';
import { Container, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import UserSidebar from '../../components/AdminSidebar';

const AdminTransactionDetailPage = () => {
  const [transactionDetails, setTransactionDetails] = useState([])
  const { transactionId } = useParams();

  useEffect(() => {
    console.log("Transaction Id:",transactionId)
    const fetchTransactionDetails = async () => {
      try {
        const response = await fetch(`${apiURL}/admin/transactions/${transactionId}`,{
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            
        },


        })
        const data = await response.json();
        if (response.ok) {
            setTransactionDetails(data);
            console.log("Transaction Details:",data);
          } else {
            console.error('Failed to fetch transaction details:', data);
          }
        }
       catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchTransactionDetails();
  }, [transactionId]);

  if (!transactionDetails || Object.keys(transactionDetails).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <UserSidebar>
      <Container>
        <Box sx={{ maxWidth: 500, margin: 'auto', mt: 3, mb: 3, p: 3, border: '1px solid #ccc', borderRadius: '4px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Transaction Details
          </Typography>
          <Typography variant="h5" align="center">Transaction ID: {transactionDetails.id}</Typography>
          <Typography variant="h6" align="center">Seller: {transactionDetails.seller.fullName || 'Loading...'}</Typography>
          <Typography variant="h6" align="center">Buyer: {transactionDetails.buyer.fullName || 'Loading...'}</Typography>

          <Typography variant="subtitle1" align="center" gutterBottom>Buyer Address:</Typography>
          <Typography variant="body1" align="center">
            Country: {transactionDetails.buyer.address_country} <br />
            City: {transactionDetails.buyer.address_city} <br />
            Barangay: {transactionDetails.buyer.address_baranggay} <br />
            Street: {transactionDetails.buyer.address_street} <br />
          </Typography>

          <Typography variant="subtitle1" align="center" gutterBottom>Order Created: {transactionDetails.status_updated_at || 'N/A'}</Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>Last Updated: {transactionDetails.updated_at}</Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>Status: {transactionDetails.status}</Typography>

          <Typography variant="h6" align="center" gutterBottom>Crops:</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Crop Name</TableCell>
                  <TableCell align="right">Crop Quantity</TableCell>
                  <TableCell align="right">Crop Price</TableCell>
                  <TableCell align="right">Sub Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionDetails.transaction_crops.map((tc, index) => (
                  <TableRow key={index}>
                    <TableCell>{tc.crop.crop_name}</TableCell>
                    <TableCell align="right">{tc.quantity}</TableCell>
                    <TableCell align="right">{tc.crop.crop_price}</TableCell>
                    <TableCell align="right">{tc.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" align="center" gutterBottom>Total Price: {transactionDetails.total_price}</Typography>
        </Box>
      </Container>
    </UserSidebar>
);
};

export default AdminTransactionDetailPage;
