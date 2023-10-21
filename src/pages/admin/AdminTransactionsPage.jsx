import React, { useEffect, useState } from 'react';

const AdminTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  const handleEditTransaction = async (transactionId) => {
    // Navigate to edit page or open a modal
  };
  
  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(`/api/admin/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${YOUR_ADMIN_TOKEN_HERE}`
        }
      });
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
        const response = await fetch('/api/admin/transactions', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${YOUR_ADMIN_TOKEN_HERE}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTransactions(data);
        } else {
          console.error('Failed to fetch transactions:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Admin Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Total Price</th>
            {/* Add more columns as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id}</td>
              <td>{transaction.status}</td>
              <td>{transaction.total_price}</td>
              {/* Add more cells as needed */}
              <td>
                <button onClick={() => handleEditTransaction(transaction.id)}>Edit</button>
                <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
                {/* Add more action-specific buttons here */}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransactionsPage;
