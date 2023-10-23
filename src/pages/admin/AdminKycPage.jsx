import React, { useState, useEffect } from 'react';
import { token, apiURL } from '../../services/user/authService';
import UserSidebar from '../../components/AdminSidebar';

const AdminKYCPage = () => {
  const [pendingKYC, setPendingKYC] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPendingKYC();
        setPendingKYC(data);
      } catch (error) {
        console.error('Error fetching KYC data:', error);
      }
    };

    fetchData();
  }, []);

  if (pendingKYC.length > 0) {
    console.log("idPhoto:", pendingKYC[0].idPhoto);
  }
  const fetchPendingKYC = async () => {
    console.log("apiURL:", apiURL);
    const response = await fetch(`${apiURL}/admin/kyc`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
              "Accept": "application/json"
        // ... other headers
    },

    });

    if (!response.ok) {
      throw new Error(`Error fetching KYC data: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Received non-JSON response",response);
    }

    const data = await response.json();
    return data;
  };

  const handleApprove = async (userId) => {
    try {
      const data = await approveKYC(userId);
      console.log('KYC approved:', data);
      // Remove this user from pendingKYC state
      setPendingKYC(pendingKYC.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error approving KYC:', error);
    }
  };

  const handleReject = async (userId) => {
    try {
      const data = await rejectKYC(userId);
      console.log('KYC rejected:', data);
      // Remove this user from pendingKYC state
      setPendingKYC(pendingKYC.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error rejecting KYC:', error);
    }
  };

  const approveKYC = async (userId) => {
    const response = await fetch(`${apiURL}/admin/kyc/${userId}/approve`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        
    },

    });
    const data = await response.json();
    return data;
  };

  const rejectKYC = async (userId) => {
    const response = await fetch(`${apiURL}/admin/kyc/${userId}/reject`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        // ... other headers
    },

    });
    const data = await response.json();
    return data;
  };

  return (
    <UserSidebar>
    <div>
    <h1>Admin KYC Page</h1>
    <ul>
      {pendingKYC.map(user => (
        <li key={user.id}>
          <strong>Email:</strong> {user.email} <br />
          <strong>KYC Status:</strong> {user.kyc_status} <br />
          <strong>Full Name:</strong> {user.fullName} <br />
          <strong>Birthday:</strong> {user.birthday} <br />
          <strong>Country:</strong> {user.address_country} <br />
          <strong>City:</strong> {user.address_city} <br />
          <strong>Baranggay:</strong> {user.address_baranggay} <br />
          <strong>Street:</strong> {user.address_street} <br />
          <strong>ID Type:</strong> {user.idType} <br />
          <strong>ID Number:</strong> {user.idNumber} <br />
          {/* Uncomment if idPhoto can be displayed as an image */}
          {user.idPhoto && <img src={user.idPhoto} alt="ID Photo" />}
          <button onClick={() => handleApprove(user.id)}>Approve</button>
          <button onClick={() => handleReject(user.id)}>Reject</button>
        </li>
      ))} 
    </ul>
  </div>
  </UserSidebar>
  );
};

export default AdminKYCPage;