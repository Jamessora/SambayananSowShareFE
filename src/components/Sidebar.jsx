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
        <ListItem  key="Dashboard" onClick={() => {navigate('/dashboard') }}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem  key="KYC" onClick={() => { navigate('/kyc')  }}>
          <ListItemIcon><CropIcon /></ListItemIcon>
          <ListItemText primary="KYC" />
        </ListItem>
        <ListItem  key="Market" onClick={() => { navigate('/market')  }}>
          <ListItemIcon><CropIcon /></ListItemIcon>
          <ListItemText primary="Market" />
        </ListItem>
        <ListItem  key="Crops" onClick={() => { navigate('/crops')  }}>
          <ListItemIcon><CropIcon /></ListItemIcon>
          <ListItemText primary="Crops" />
        </ListItem>
        <ListItem  key="Transactions" onClick={() => { navigate('/crops')  }}>
          <ListItemIcon><CropIcon /></ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
