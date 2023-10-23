import React, { useState, useEffect } from 'react';

const AdminEditTransaction = ({ transactionId }) => {
  const [transactionData, setTransactionData] = useState({
    status: '',
    // Add other fields
  });

  useEffect(() => {
    const fetchTransactionData = async () => {
      const response = await fetch(`/admin/transactions/${transactionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
  
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTransactionData(data);
      } else {
        console.error('Failed to fetch transaction data', data);
      }
    };
    fetchTransactionData();
  }, [transactionId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/admin/transactions/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(transactionData),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Transaction updated successfully', data);
    } else {
      console.error('Failed to update transaction', data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Status:
        <select name="status" value={transactionData.status} onChange={handleChange}>
          <option value="For Seller Confirmation">For Seller Confirmation</option>
          <option value="For Buyer Payment">For Buyer Payment</option>
        
        </select>
      </label>
      {/* Add other fields */}
      <button type="submit">Save</button>
    </form>
  );
};
