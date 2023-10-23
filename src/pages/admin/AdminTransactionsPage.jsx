import React, { useEffect, useState } from 'react';
import { token, apiURL } from '../../services/user/authService';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../../components/AdminSidebar';
import { Container, Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const AdminTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const handleShowTransaction = async (transactionId) => {
    navigate(`/admin/transactions/${transactionId}`);
  };
  
  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(`${apiURL}/admin/transactions/${transactionId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
        },


        })
      if (response.ok) {
        // Remove the transaction from the state to update the UI
        setTransactions(transactions.filter(transaction => transaction.id !== transactionId));
      } else {
        console.error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('An error occurred while deleting the transaction:', error);
    }
  };
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${apiURL}/admin/transactions`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
        },
        });
        const data = await response.json();
        if (response.ok) {
          setTransactions(data);
          console.log("Transactions received:",data)
        } else {
          console.error('Failed to fetch transactions:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'total_price', headerName: 'Total Price', type: 'number', width: 150 },
    { field: 'seller', headerName: 'Seller', width: 150, valueGetter: (params) => params.row.seller.fullName },
    { field: 'buyer', headerName: 'Buyer', width: 150, valueGetter: (params) => params.row.buyer.fullName },
    {
      field: 'buyer_address',
      headerName: 'Buyer Address',
      width: 300,
      valueGetter: (params) => `${params.row.buyer.address_country}, ${params.row.buyer.address_city}, ${params.row.buyer.address_baranggay}, ${params.row.buyer.address_street}`
    },
    { field: 'status_updated_at', headerName: 'Order Created', width: 200 },
    { field: 'updated_at', headerName: 'Last Updated', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <button onClick={() => handleShowTransaction(params.row.id)}>Show</button>
        // <button onClick={() => handleDeleteTransaction(params.row.id)}>Delete</button>
      ),
    },
  ];

  return (
    <UserSidebar>
    <Container>
        <Typography variant="h4" gutterBottom>
          Admin Transactions
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={transactions} columns={columns} pageSize={5} />
        </div>
      </Container>
</UserSidebar>

  );
};

export default AdminTransactionsPage;
