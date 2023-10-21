import React, { useState, useEffect } from 'react';


const AdminCreateUser = () => {
const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    fullName: '',
    // birthday: '',
    // idType: '',
    // idNumber: '',
    // address_country: '',
    // address_city: '',
    // address_baranggay: '',
    // address_street: '',
    kyc_status: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New user params:",newUser);
    const response = await fetch('${apiBaseURL}/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user:newUser})
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('User created successfully', data);
      // Redirect or update UI as needed
    } else {
      console.error('Failed to create user', data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields here, tied to newUser state */}
      <label>
        Email:
      <input name="email" value={newUser.email} onChange={handleChange} />
      </label>
      <label>
        Password:
      <input name="password" value={newUser.password} onChange={handleChange} />
      </label>
      <label>
        Full Name:
      <input name="fullName" value={newUser.fullName} onChange={handleChange} />
      </label>
      <label>
        KYC Status:
      <select name="kyc_status" value={newUser.kyc_status} onChange={handleChange}>
            <option value="nil">To Submit KYC</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            {/* Add more options if needed */}
        </select>
    </label>
        {/* <label>
        Email:
      <input type="date" name="Birthday" value={newUser.birthday} onChange={handleChange} />
      </label> */}
      {/* ... other fields ... */}
      <button type="submit">Create User</button>
    </form>
  );
  };

  export default AdminCreateUser;