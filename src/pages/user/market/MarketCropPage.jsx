import React, { useState, useEffect, useRef } from 'react';
import { token, getUserIdFromToken } from '../../../services/user/authService';
import { useNavigate } from 'react-router-dom';
import { IconButton, Card,TableContainer, Table, TableBody, TableCell, TableHead, TableRow ,CardContent, CardActions, Button, Dialog, DialogTitle, DialogContent, Select, MenuItem, Paper, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useSnackbar from '../../../services/snackbarService';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '250px',
  height: '250px',
  flexGrow: 1,
}));

const MarketCropPage = () => {
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // You forgot to include this state variable
  const [transactionCrops, setTransactionCrops] = useState([]);
  const inputRefs = useRef([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [filterByPrice, setFilterByPrice] = useState('all');
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const { SnackbarComponent, showSnackbar } = useSnackbar();
   
 
  const updateQuantity = (index, operation) => {
    const currentRef = inputRefs.current[index];
    if (currentRef) {
      let currentValue = parseInt(currentRef.value, 10);
      if (operation === 'add') {
        currentRef.value = currentValue + 1;
      } else {
        currentRef.value = Math.max(1, currentValue - 1);
      }
    }
  };

  const initializeTransaction = async (cropId) => {
    try {
      
      const response = await fetch(`https://sambayanansowshare.onrender.com/users/${userId}/transactions/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ crop_id: cropId })
        
      });
      
      
      
      
      
      if (response.ok) {
        const data = await response.json();
        console.log("Transaction data:", data);
        return data.transaction.id; // returning transaction ID for further use
      } else {
        console.error("Failed to create transaction", data.message);
        return null;
      }
    } catch (error) {
      console.error("An error occurred while creating the transaction:", error);
      return null;
    }
  };

  const addTransactionCrops = async (crop, quantity) => {
    try {

      if (quantity > crop.crop_quantity) {
        showSnackbar('Failed, Crop quantity is not enough!', 'error');
        return;
      }

      const transactionId = await initializeTransaction(crop.id); // Initialize transaction if not done already
      
    console.log("Transaction ID in addTransactionCrops:", transactionId);
    if (transactionId.status)
    if (!transactionId) {
      console.log("Failed to get a valid transaction ID.");
      return;
    }
    const payload = {
        transaction_id: transactionId,
        crop_id: crop.id,
        quantity: quantity
      };
      
      const response = await fetch(`https://sambayanansowshare.onrender.com/users/${userId}/transactions/${transactionId}/transaction_crops`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      console.log("TransactionCrops data:", data);
      showSnackbar('Added to Cart');
      
      
      // Update the available quantity in the crops state
      const updatedCrops = crops.map((c) => {
        if (c.id === crop.id) {
          return {
            ...c,
            crop_quantity: c.crop_quantity - quantity,
          };
        }
        return c;
      });
      setCrops(updatedCrops);
      if (userId) {
        // Fetch transaction crops
        const response = await fetchTransactionCrops();
        if (response.status === 'success' && Array.isArray(response.transaction_crops)) {
          console.log("All Transaction Crops", response.transaction_crops);
          //setTransactionCrops(response.transaction_crops);
          const mappedTransactionCrops = response.transaction_crops.map(transactionCrop => {
            console.log("Filtered Crops inside addtransactions:",filteredCrops);
            const correspondingCrop = filteredCrops.find(c => c.id === transactionCrop.crop_id);
            return {
              ...transactionCrop,
              crop_name: correspondingCrop ? correspondingCrop.crop_name : 'Unknown'
            };
          });
          console.log("Mapped:",mappedTransactionCrops);
          setTransactionCrops(mappedTransactionCrops);
        } else {
          // Handle error here
          console.log("Received data is not in expected format", response);
        }
      }
    } catch (error) {
      console.error("An error occurred while adding the item to the transaction:", error);
      showSnackbar('Failed to add to cart. Please try again!', 'error');
    }
  };
  
  
  
  
    // This function fetches all crops
    const fetchAllCrops = async () => {
      try {
        const response = await fetch(`https://sambayanansowshare.onrender.com/market`);
        const data = await response.json();
    if (response.ok) {
      console.log("Fetching all crops aside from the useeffect",data);
      return data;
      
    } else {
      throw new Error(data);
    }
  } catch (error) {
    console.error('Error fetching crop data:', error);
  }
  };

  const fetchTransactionCrops = async () => {
    try {
      const response = await fetch (`https://sambayanansowshare.onrender.com/users/${userId}/transaction-crops`, {
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

    const userIdFromToken = getUserIdFromToken();
    useEffect(() => {
      if (userIdFromToken) {
        setUserId(userIdFromToken);
      }
    }, [userIdFromToken]);

    useEffect(() => {
      const fetchData = async () => {
        if (userId) {
          const data = await fetchAllCrops();
          const filteredCrops = data.filter(crop => crop.user_id !== userId);
          console.log("Filtered Crops", filteredCrops);
          setCrops(filteredCrops);
          setIsLoading(false);
        }
      };
      fetchData();
    }, [userId]);

    useEffect(() => {
      const fetchTransactionData = async () => {
        if (userId && crops.length > 0) { // Make sure crops are available
          const response = await fetchTransactionCrops();
          if (response.status === 'success') {
            console.log("All Transaction Crops", response.transaction_crops);
            const mappedTransactionCrops = response.transaction_crops.map(transactionCrop => {
              console.log("Filtered Crops inside useeffect fetchdata:",filteredCrops);
              const correspondingCrop = crops.find(c => c.id === transactionCrop.crop_id);
              return {
                ...transactionCrop,
                crop_name: correspondingCrop ? correspondingCrop.crop_name : 'Unknown'
              };
            });
            console.log("Mapped:",mappedTransactionCrops);
            setTransactionCrops(mappedTransactionCrops);
          }
        }
      };
      fetchTransactionData();
    }, [userId, crops]); 
  // useEffect(() => {

  //   const userIdFromToken = getUserIdFromToken();
  //         console.log("userIdFromToken inside useEffect:", userIdFromToken);
  //         if (userIdFromToken) {
  //             console.log("User ID from token:", userIdFromToken);
  //           setUserId(userIdFromToken);
            
  //         }


  //   const fetchData = async () => {
  //     try {
  //       if (userIdFromToken) {
  //       const data = await fetchAllCrops();
  //       console.log("will filter out user", userId)
  //       const filteredCrops = data.filter(crop => crop.user_id !== userIdFromToken);
  //       if (Array.isArray(filteredCrops)) {                    
  //         console.log("Filtered Crops", filteredCrops);
  //         setCrops(filteredCrops);
  //         setIsLoading(false); // End loading
  //       } else {
  //         // Handle error here
  //       }
  //       }

  //       if (userId) {
  //       // Fetch transaction crops
  //       const response = await fetchTransactionCrops();
  //       if (response.status === 'success' && Array.isArray(response.transaction_crops)) {
  //         console.log("All Transaction Crops", response.transaction_crops);
  //         //setTransactionCrops(response.transaction_crops);
  //         const mappedTransactionCrops = response.transaction_crops.map(transactionCrop => {
  //           console.log("Filtered Crops inside useeffect fetchdata:",filteredCrops);
  //           const correspondingCrop = filteredCrops.find(c => c.id === transactionCrop.crop_id);
  //           return {
  //             ...transactionCrop,
  //             crop_name: correspondingCrop ? correspondingCrop.crop_name : 'Unknown'
  //           };
  //         });
  //         console.log("Mapped:",mappedTransactionCrops);
  //         setTransactionCrops(mappedTransactionCrops);
  //       } else {
  //         // Handle error here
  //         console.log("Received data is not in expected format", response);
  //       }
  //     }


  //     } catch (error) {
  //       console.error('Error fetching crop data:', error);
  //       setIsLoading(false); // End loading
  //     }
  //   };
  //   fetchData();
  // }, [userId]);

  if (userId === null) {
    return <p>Loading...</p>;
  }
  // Filtering the crops based on the selected price filter
  let filteredCrops = [...crops];
  if (filterByPrice === 'low') {
    filteredCrops.sort((a, b) => a.crop_price - b.crop_price);
  } else if (filterByPrice === 'high') {
    filteredCrops.sort((a, b) => b.crop_price - a.crop_price);
  }

  
  
return (
  <div>
      <h1>All Available Crops</h1>

      <Select
        value={filterByPrice}
        onChange={(e) => setFilterByPrice(e.target.value)}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="low">Low to High</MenuItem>
        <MenuItem value="high">High to Low</MenuItem>
      </Select>

      <Button variant="contained" color="secondary" onClick={() => setCartModalOpen(true)}>View Cart</Button>
      <button onClick={() => navigate('/checkout')}>
        Checkout
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
            {filteredCrops.map((crop, index) => (
              <Item key={index}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent style={{ flex: 1 }}>
                    <h3>{crop.crop_name}</h3>
                    <p>Price: ${crop.crop_price}</p>
                    <p>Available Quantity: {crop.crop_quantity}</p>
                  </CardContent>
                  <CardActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <IconButton onClick={() => updateQuantity(index, 'subtract')}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <input type="number" min="1" max={crop.crop_quantity} defaultValue="1" ref={(el) => inputRefs.current[index] = el} style={{ textAlign: 'center' }} />
                  <IconButton onClick={() => updateQuantity(index, 'add')}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <IconButton onClick={() => {
                    const currentRef = inputRefs.current[index];
                    if (currentRef) {
                      addTransactionCrops(crop, currentRef.value);
                    }
                  }}>
                    <AddShoppingCartIcon />
                  </IconButton>
                </CardActions>
                </Card>
              </Item>
            ))}
          </Stack>
        </Box>
      )}

<Dialog open={cartModalOpen} onClose={() => setCartModalOpen(false)}>
      <DialogTitle>Your Cart</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Crop Name</TableCell>
                <TableCell align="right">Price ($)</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionCrops.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.crop_name}
                  </TableCell>
                  <TableCell align="right">${item.price}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" onClick={() => navigate('/checkout')}>
          Checkout
        </Button>
      </DialogContent>
    </Dialog>

      
      <SnackbarComponent />
    </div>
  );
};

export default MarketCropPage;
