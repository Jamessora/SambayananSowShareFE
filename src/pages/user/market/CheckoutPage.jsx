import React, { useState, useEffect, useRef } from 'react';
import { token, getUserIdFromToken } from '../../../services/user/authService';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { apiURL } from '../../../services/user/authService';
import UserSidebar from '../../../components/UserSidebar';

const CheckoutPage = () => {

    const [isLoading, setIsLoading] = useState(true); // 
    const [transactionCrops, setTransactionCrops] = useState([]);
    const [transactionId, setTransactionId] = useState(null);
    const inputRef = useRef();
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Set userId when the component mounts
        const userIdFromToken = getUserIdFromToken();
        console.log("userIdFromToken inside useEffect:", userIdFromToken);
        if (userIdFromToken) {
            console.log("User ID from token:", userIdFromToken);
          setUserId(userIdFromToken);
          
        }
     
      }, []);
       
      const updateTransactionCrop = async (transactionCropId, newQuantity) => {
        try {
          const payload = { quantity: newQuantity };
      
          const response = await fetch(`${apiURL}/users/${userId}/transactions/${transactionId}/transaction_crops/${transactionCropId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
      
          const data = await fetchTransactionCrops();
            if (data.status === 'success' && Array.isArray(data.transaction_crops)) {
              console.log("All Transaction Crops", data.transaction_crops);
              setTransactionCrops(data.transaction_crops);
              //setTransactionId(data.transaction_crops[0].transaction_id);
            } else {
              // Handle error here
              console.log("Received data is not in expected format", data);
            }
          }
         catch (error) {
          console.error("An error occurred while updating the transaction crop:", error);
        }
      };
      
      const increaseQuantity = async (id, currentQuantity) => {
        updateTransactionCrop(id, currentQuantity + 1);
      }
      
      const decreaseQuantity = async (id, currentQuantity) => {
        if (currentQuantity > 1) {
          updateTransactionCrop(id, currentQuantity - 1);
        }
      }
      
      const handleQuantityChange = async (id, newQuantity) => {
        if (newQuantity > 0) {
          updateTransactionCrop(id, newQuantity);
        }
      }
      const totalPrice = transactionCrops.reduce((acc, item) =>  acc + Number(item.price), 0);

      const removeFromTransaction = async (transactionCropId) => {
        try {
                
          const response = await fetch(`${apiURL}/users/${userId}/transactions/${transactionId}/transaction_crops/${transactionCropId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      
          if (response.ok) {
            // 'cart' is the state variable holding cart items
            const updatedCart = cart.filter(item => item.transactionCropId !== transactionCropId);
            
            setCart(updatedCart);
          } else {
            console.error('Failed to remove item from transaction', data.message);
          }
          
        } catch (error) {
          console.error("An error occurred while removing the item from the transaction:", error);
        }
      };

      
  const fetchTransactionCrops = async () => {
    try {
      const response = await fetch (`${apiURL}/users/${userId}/transaction-crops`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (response.ok) {
        return data;
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.error('Error fetching crop data:', error);
    }
    };

    const updateTransaction = async () => {
        try {
        setIsLoading(true);  
        const payload = { status: "For Seller Confirmation" };

          const response = await fetch(`${apiURL}/users/${userId}/transactions/${transactionId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)   
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log("Updated Transaction data:", data);
           navigate(`/order-success/${data.transaction.id}`); 
           return data.transaction.id;
            
             // returning transaction ID for further use
          } else {
            console.error("Failed to update transaction", error.message);
            return null;
          }
        } catch (error) {
          console.error("An error occurred while creating the transaction:", error);
          return null;
        }finally{
          setIsLoading(false);
        }
      };
        
    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);


            if (userId) {
            // Fetch transaction crops
            const response = await fetchTransactionCrops();
            if (response.status === 'success' && Array.isArray(response.transaction_crops)) {
              console.log("All Transaction Crops", response.transaction_crops);
              setTransactionCrops(response.transaction_crops);
              setTransactionId(response.transaction_crops[0].transaction_id);
            } else {
              // Handle error here
              console.log("Received data is not in expected format", response);
            }
          }
      
      
          } catch (error) {
            console.error('Error fetching crop data:', error);
          } finally {
            setIsLoading(false); // End loading
          }
        };
        fetchData();
      }, [userId]);

      return (
        <UserSidebar>
        <div>
          {isLoading ? 
          <div><CircularProgress /></div> : 
          <div>
          <Typography variant="h4" component="div" gutterBottom>
            Your Cart Items
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price ($)</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionCrops.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {/* Replace with the actual item name if available */}
                      {item.crop.crop_name}
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" onClick={() => decreaseQuantity(item.id, item.quantity)}>-</Button>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      />
                      <Button variant="outlined" onClick={() => increaseQuantity(item.id, item.quantity)}>+</Button>
                    </TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" color="secondary" onClick={() => removeFromTransaction(item.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6" component="div" gutterBottom style={{ marginTop: '1em' }}>
            Total Price: {totalPrice}
          </Typography>
          <Button variant="contained" color="primary" onClick={updateTransaction}>
            Confirm Order
          </Button>
          </div>
          }
    </div>
    </UserSidebar>
  );
};

export default CheckoutPage;