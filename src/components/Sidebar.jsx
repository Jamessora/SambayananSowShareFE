import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CropIcon from '@mui/icons-material/Crop';

import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
    const navigate =  useNavigate();

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItem  key="Home" onClick={() => {navigate('/') }}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem  key="Crops" onClick={() => { navigate('/dashboard')  }}>
          <ListItemIcon><CropIcon /></ListItemIcon>
          <ListItemText primary="Crops" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
