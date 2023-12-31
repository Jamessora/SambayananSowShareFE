import React, { useState, useEffect } from 'react';
import { apiURL, token, getUserIdFromToken } from '../../../services/user/authService';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import UserSidebar from '../../../components/UserSidebar';
import { checkKYCStatus } from '../../../services/user/authService';
import SubmitKYCFirstPage from '../auth/SubmitKYCFirstPage';
import CircularProgress from '@mui/material/CircularProgress';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const kycStatus = checkKYCStatus();
  

  if (kycStatus !== 'approved') {
    return <SubmitKYCFirstPage />;
  }

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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


  

  
  
  const convertToDataGridRows = (transactions) => {
    return transactions.map((transaction) => {
      return {
        id: transaction.id,
        status: transaction.status,
        orderedDate: transaction.status_updated_at,
        updatedDate: transaction.updated_at,
        buyer_country: transaction.buyer_country,
        buyer_city: transaction.buyer_city,
        buyer_baranggay: transaction.buyer_baranggay,
        buyer_street: transaction.buyer_street,
        totalPrice: transaction.total_price,
        
      };
    });
  };




const TransactionsPage = () => {
  const [sellerTransactions, setSellerTransactions] = useState([]);
  const [buyerTransactions, setBuyerTransactions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    
    const fetchData = async () => {
        const userIdFromToken = getUserIdFromToken();
        console.log("userIdFromToken inside useEffect:", userIdFromToken);
        if (userIdFromToken) {
            console.log("User ID from token:", userIdFromToken);
          setUserId(userIdFromToken);
          const sellerData = await fetchTransactions(userIdFromToken, 'seller');
          const buyerData = await fetchTransactions(userIdFromToken, 'buyer');
      if (Array.isArray(sellerData)) {
        setSellerTransactions(sellerData);
      }
      if (Array.isArray(buyerData)) {
        setBuyerTransactions(buyerData);
      }
    }
    else {
        console.log("User ID could not be fetched from token");
      }
     
    };
    fetchData();
  }, []);

  const fetchTransactions = async (userId, role) => {
    
    try {
      const response = await fetch(`${apiURL}/users/${userId}/transactions?role=${role}`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      
      if (response.ok) {
        console.log(" User ID inside success fetch:",userId);
        console.log("Fetched Transactions",data)
        return data;
      } else {
        console.log(" User ID inside failed to fetch:",userId);
        
        throw new Error(data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  
  
  const updateTransaction = async (transactionId, newStatus) => {
    if (!newStatus) return;
    try {
      const payload = { status: newStatus };

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
        // Refresh transaction list or update UI
      } else {
        const error = await response.json();
        console.error("Failed to update transaction", error.message);
      }
    } catch (error) {
      console.error("An error occurred while updating the transaction:", error);
    }
  };

  const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };
  
  const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    z-index: 1;
    `,
  );
  
  const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${menuItemClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    `,
  );
  
  const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    border-radius: 12px;
    padding: 8px 14px;
    line-height: 1.5;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:focus-visible {
      border-color: ${blue[400]};
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
    `,
  );

  const generateColumns = (role,updateTransaction) => [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        let options = [];
      
        if (role === 'seller') {
          if (params.row.status === 'For Seller Confirmation') {
            options = ['For Buyer Payment', 'Cancel'];
          } else if (params.row.status === 'For Buyer Payment') {
            options = ['Cancel'];
          } else if (params.row.status === 'Payment Sent For Seller Confirmation') {
            options = ['For Delivery'];
          }
        } else if (role === 'buyer') {
          if (params.row.status === 'For Seller Confirmation') {
            options = ['Cancel'];
          } else if (params.row.status === 'For Buyer Payment') {
            options = ['Cancel', 'Payment Sent For Seller Confirmation'];
          } else if (params.row.status === 'For Delivery') {
            options = ['Completed'];
          }
        }

        return (
          <Dropdown>
          <MenuButton disabled={options.length === 0}>Select Status</MenuButton>
          <Menu slots={{ listbox: Listbox }}>
            {options.map((option, index) => (
              <MenuItem key={index} onClick={() => updateTransaction(params.row.id, option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
        );
      },
    },
    { field: 'id', headerName: 'Transaction ID', width: 150 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'orderedDate', headerName: 'Ordered Date', width: 200 },
    { field: 'updatedDate', headerName: 'Updated Date', width: 200 },
    {
      field: 'deliveryAddress',
      headerName: 'Delivery Address',
      width: 300,
      valueGetter: (params) => {
        const buyer_country = params.row.buyer_country || '';
        const buyer_city = params.row.buyer_city || '';
        const buyer_baranggay = params.row.buyer_baranggay || '';
        const buyer_street = params.row.buyer_street || '';
        return `${buyer_country}, ${buyer_city}, ${buyer_baranggay}, ${buyer_street}`;
      },},
    { field: 'totalPrice', headerName: 'Total Price', type: 'number', width: 150 },
  ];

  
  
  const dataGridSellerRows = convertToDataGridRows(sellerTransactions);
  const dataGridBuyerRows = convertToDataGridRows(buyerTransactions);


  return (
    <UserSidebar>
    <div>
      <h1>Transactions</h1>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="transaction tabs">
            <Tab label="Seller Transactions" {...a11yProps(0)} />
            <Tab label="Buyer Transactions" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid rows={dataGridSellerRows} columns={generateColumns('seller',updateTransaction)} pageSize={5} />
            
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid rows={dataGridBuyerRows} columns={generateColumns('buyer',updateTransaction)}  pageSize={5} />
          </Box>
        </CustomTabPanel>
      </Box>
    </div>
    </UserSidebar>
  );
};

export default TransactionsPage;


