import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AdminUserDetailPage = () => {
    const [userDetails, setUserDetails] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    console.log("User Id:",userId)
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/admin/users/${userId}`);
        const data = await response.json();
        if (response.ok) {
            setUserDetails(data);
          } else {
            console.error('Failed to fetch user details:', data);
          }
        }
       catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Email: {userDetails.email}</p>
      <p>Full Name: {userDetails.fullName}</p>
      <p>Birthday: {userDetails.birthday}</p>
      {/* ...other attributes... */}

      <h2>Crops</h2>
      <ul>
        {userDetails.crops.map((crop) => (
          <li key={crop.id}>{crop.crop_name} - {crop.crop_price}</li>
        ))}
      </ul>

      <h2>Bought Transactions</h2>
      <ul>
        {userDetails.bought_transactions.map((transaction) => (
          <li key={transaction.id}>Status: {transaction.status}, Total Price: {transaction.total_price}</li>
        ))}
      </ul>

      <h2>Sold Transactions</h2>
      <ul>
        {userDetails.sold_transactions.map((transaction) => (
          <li key={transaction.id}>Status: {transaction.status}, Total Price: {transaction.total_price}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserDetailPage;
