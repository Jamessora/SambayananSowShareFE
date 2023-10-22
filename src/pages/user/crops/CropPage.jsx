import React, { useState, useEffect } from 'react';
import {token, getUserIdFromToken } from '../../../services/user/authService';
import { Container, CssBaseline, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton  } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useSnackbar from '../../../services/snackbarService';
import Sidebar from '../../../components/Sidebar';
import { apiURL } from '../../../services/user/authService';


import ChevronRightIcon from '@mui/icons-material/ChevronRight';

console.log("Initial token:", token);

const CropsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [crops, setCrops] = useState([]);
    const [newCrop, setNewCrop] = useState({ 
        crop_name: '', 
        crop_price: 0,
        crop_quantity: 0,
        crop_expiry_date: '',
        crop_status: 'available' });
    const [editingCrop, setEditingCrop] = useState(null);
    const [userId, setUserId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const { SnackbarComponent, showSnackbar } = useSnackbar();
    const theme = createTheme();  


    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    const handleOpenDialog = (crop) => {
      setEditingCrop(crop);
      setOpenDialog(true);
    };
    
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setEditingCrop(null);
    };

    const handleOpenAddDialog = () => {
      setOpenAddDialog(true);
    };
    
    const handleCloseAddDialog = () => {
      setOpenAddDialog(false);
    };

    
    
    
    const formatDate = (isoString) => {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    
    useEffect(() => {
        // Set userId when the component mounts
        const userIdFromToken = getUserIdFromToken();
        console.log("userIdFromToken inside useEffect:", userIdFromToken);
        if (userIdFromToken) {
            console.log("User ID from token:", userIdFromToken);
          setUserId(userIdFromToken);
          
        }
       
      }, []);

    useEffect(() => {
        
      const fetchData = async () => {
        if (userId) {
        try {
          const data = await fetchCrops();
          console.log("Crops of:",userId,"are the following:",data);
          setCrops(data);
        } catch (error) {
          console.error('Error fetching crop data:', error);
        }
      }
    };
  
      fetchData();
      
    }, [userId]);
  
    const fetchCrops = async () => {
      console.log("API Base URL is: ", import.meta.env.VITE_API_BASE_URL);
        const response = await fetch(`${apiURL}/users/${userId}/crops`, {
          credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      const data = await response.json();
      console.log("Crops", data);
      return data;
    };

    //Add New Crops
    const addCrop = async () => {
      console.log("API Base URL is: ", import.meta.env.VITE_API_BASE_URL);
        const response = await fetch(`${apiURL}/users/${userId}/crops`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

          },
          body: JSON.stringify(newCrop),
        });
        const data = await response.json();
      
        if (data.status === 'success') {
          setCrops([...crops, data.crop]);
          showSnackbar('Crop added successfully!');
          console.log("Crops:",crops);
        } else {
          console.error('Error adding crop:', data.message);
          showSnackbar('Error adding crop!','error');
        }
    };

    //Updating of a crop
    const updateCrop = async () => {

        const updatedEditingCrop = { ...editingCrop };
        if (updatedEditingCrop.crop_expiry_date) {
            const date = new Date(updatedEditingCrop.crop_expiry_date);
            updatedEditingCrop.crop_expiry_date = date.toISOString();
        }
        
        const response = await fetch(`${apiURL}/users/${userId}/crops/${editingCrop.id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updatedEditingCrop),
        });
      
        const data = await response.json();
        
        if (data.status === 'success') {
          const updatedCrops = crops.map(crop => 
            crop.id === editingCrop.id ? editingCrop : crop
          );
          showSnackbar('Crop successfully updated!');
          setCrops(updatedCrops);
          setEditingCrop(null);
          handleCloseDialog();
        } else {
          console.error('Error updating crop:', data.message);
          showSnackbar('An error occurred while updating the crop', 'error');
        }
      };
      
    //Delete a crop
    const deleteCrop = async (cropId) => {
        const response = await fetch(`${apiURL}/users/${userId}/crops/${cropId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            
            'Authorization': `Bearer ${token}`
          },
        });
      
        const data = await response.json();
        
        if (data.status === 'success') {
          const updatedCrops = crops.filter(crop => crop.id !== cropId);
          setCrops(updatedCrops);
        } else {
          console.error('Error deleting crop:', data.message);
        }
      };
    
      useEffect(() => {
        if (editingCrop && editingCrop.crop_expiry_date) {
          const date = new Date(editingCrop.crop_expiry_date);
          const formattedDate = date.toISOString().split('T')[0];
          setEditingCrop({ ...editingCrop, crop_expiry_date: formattedDate });
        }
      }, [editingCrop]);
    

return (
  <>
   <IconButton 
  edge="start" 
  color="inherit" 
  aria-label="menu" 
  onClick={toggleSidebar}
  sx={{ position: 'absolute', left: 0, top: 0 }}
>
  <ChevronRightIcon />
</IconButton>

   <Sidebar open={sidebarOpen} onClose={toggleSidebar} /> {/* Sidebar component */}
  <SnackbarComponent/>
  <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="md">

      <CssBaseline />
      <Typography component="h1" variant="h4">
        Your Crops
      </Typography>
    <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Crop</DialogTitle>
      <DialogContent>
      {editingCrop ? (
      <div>
                {/* Material UI TextFields for editingCrop */}
                {/* ... same as the newCrop fields above ... */}
                {/* You can basically copy-paste and adjust variable names */}
                {/* ... */}
                {/* The TextField for editingCrop status */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Crop Name"
                  value={editingCrop.crop_name}
                  onChange={e => setEditingCrop({ ...editingCrop, crop_name: e.target.value })}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Price"
                  type="number"
                  value={editingCrop.crop_price}
                  onChange={e => setEditingCrop({ ...editingCrop, crop_price: Number(e.target.value) })}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Quantity"
                  type="number"
                  value={editingCrop.crop_quantity}
                  onChange={e => setEditingCrop({ ...editingCrop, crop_quantity: Number(e.target.value) })}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Expiry Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={editingCrop.crop_expiry_date}
                  onChange={e => setEditingCrop({ ...editingCrop, crop_expiry_date: e.target.value })}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Status"
                  select
                  value={editingCrop.crop_status || 'available'}
                  onChange={e => setEditingCrop({ ...editingCrop, crop_status: e.target.value })}
                  SelectProps={{ native: true }}
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="expired">Expired</option>
                </TextField>
                <Button variant="contained" color="primary" onClick={updateCrop}>
                  Save
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setEditingCrop(null)}>
                  Cancel
                </Button>
              </div>
               ) : (
                <div>Loading...</div>  // You can customize this part
              )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={updateCrop} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog open={openAddDialog} onClose={handleCloseAddDialog} aria-labelledby="form-dialog-add-title"  sx={{ '& .MuiDialog-paper': { width: '300px' } }}>
        <DialogTitle id="form-dialog-add-title">Add Crop</DialogTitle>
        <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Crop Name"
          value={newCrop.crop_name}
          onChange={e => setNewCrop({ ...newCrop, crop_name: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Price"
          type="number"
          value={newCrop.crop_price}
          onChange={e => setNewCrop({ ...newCrop, crop_price: Number(e.target.value) })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Quantity"
          type="number"
          value={newCrop.crop_quantity}
          onChange={e => setNewCrop({ ...newCrop, crop_quantity: Number(e.target.value) })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Expiry Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={newCrop.crop_expiry_date}
          onChange={e => setNewCrop({ ...newCrop, crop_expiry_date: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Status"
          select
          value={newCrop.crop_status}
          onChange={e => setNewCrop({ ...newCrop, crop_status: e.target.value })}
          SelectProps={{ native: true }}
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
          <option value="expired">Expired</option>
        </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { addCrop(); handleCloseAddDialog(); }} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
        Add New Crop
      </Button>   
      {/* Add a new Crop */}
      <Typography component="h2" variant="h5">
        Add a new Crop
      </Typography>
      
        
     

      {/* List of Crops */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Crop Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Expiry Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {crops.map(crop => (
          <TableRow key={crop.id}>
            {editingCrop && editingCrop.id === crop.id ? (
              <TableCell colSpan={6}>
              
              </TableCell>

            ) : (
              <>
              <TableCell component="th" scope="row">
                    {crop.crop_name}
                  </TableCell>
                  <TableCell align="right">{crop.crop_price}</TableCell>
                  <TableCell align="right">{crop.crop_quantity}</TableCell>
                  <TableCell align="right">{formatDate(crop.crop_expiry_date)}</TableCell>
                  <TableCell align="right">{crop.crop_status}</TableCell>
                  <TableCell align="right">
                    <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog(crop)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteCrop(crop.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </>
            )}
        </TableRow>
        ))}
      </TableBody>
      </Table>
    </Container>
  </ThemeProvider>
  </>
);
  };

  
  export default CropsPage;
  