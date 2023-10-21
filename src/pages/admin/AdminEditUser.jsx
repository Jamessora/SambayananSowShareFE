import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AdminEditUser = () => {
  const [userData, setUserData] = useState(null);
  
  const { userId } = useParams();

  useEffect(() => {
    console.log("User Id:",userId)
    const fetchUserData = async () => {
      const response = await fetch(`/api/admin/users/${userId}`);
         
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
      } else {
        console.error('Failed to fetch user data', data);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/admin/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers like Authorization
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('User updated successfully', data);
    } else {
      console.error('Failed to update user', data);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={userData.email} onChange={handleChange} />
      </label>
      <label>
        Birthday:
        <input type="date" name="birthday" value={userData.birthday} onChange={handleChange} />
      </label>
      <label>
        Country:
        <input type="text" name="country" value={userData.address_country} onChange={handleChange} />
      </label>
      <label>
        City:
        <input type="text" name="city" value={userData.address_city} onChange={handleChange} />
      </label>
      <label>
        KYC Status:
        <select name="kyc_status" value={userData.kyc_status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            {/* Add more options if needed */}
        </select>
        </label>

      {/* Add other fields */}
      <button type="submit">Save</button>
    </form>
  );
};
export default AdminEditUser;