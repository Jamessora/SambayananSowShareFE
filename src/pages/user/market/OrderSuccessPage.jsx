import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { token, getUserIdFromToken } from '../../../services/user/authService';

const OrderSuccessPage = () => {
  const [transaction, setTransaction] = useState(null);
  const { transactionId } = useParams();  // Get the transaction ID from the URL
  const [userId, setUserId] = useState(null);
 
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {

    const userIdFromToken = getUserIdFromToken();
        console.log("userIdFromToken inside useEffect:", userIdFromToken);
        if (userIdFromToken) {
            console.log("User ID from token:", userIdFromToken);
          setUserId(userIdFromToken);
          
        }

    
    const fetchTransactionDetails = async () => {
      // Fetch transaction details based on transactionId and set them in state
      const response = await fetch(`/api/users/${userId}/transactions/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTransaction(data.transaction);
      }
    };

    if (userId) {
        fetchTransactionDetails();
      } else {
        console.log("User not found");
      }
  }, [transactionId, userId]);

  return (
    <div>
      <h2>Order Successful!</h2>
      {transaction && (
        <>
          <p>Status: {transaction.status}</p>
          <p>Total Price: {transaction.total_price}</p>
          <p>Updated At: {formatDate(transaction.updated_at)}</p>
        </>
      )}
    </div>
  );
};

export default OrderSuccessPage;
