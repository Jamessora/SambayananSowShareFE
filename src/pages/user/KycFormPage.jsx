import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiBaseURL } from '../../services/user/authService';
const KycFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    birthday: '',
    address_country: '',
    address_city: '',
    address_baranggay: '',
    address_street: '',
    idType: '',
    idNumber: '',
    idPhoto: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, idPhoto: file });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt');

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    

    const response = await fetch(`${apiBaseURL}/kyc`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        // Include the JWT token here
        'Authorization': `Bearer ${token}`
        //'Content-Type': 'multipart/form-data',
        //'Accept': 'application/json'
      },
      body: formDataObj,
    });

    const data = await response.json();

    if (data.status === 'success') {
      navigate('/kyc-submitted');
      console.log("Success:", data);
    } else {
      // Handle error (show error message, log it, etc.)
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Birthday</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          required
        />
      </div>
      Address
      <div>
        <label>Country</label>
        <input
          type="text"
          name="address_country"
          value={formData.address_country}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          name="address_city"
          value={formData.address_city}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Baranggay</label>
        <input
          type="text"
          name="address_baranggay"
          value={formData.address_baranggay}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Street</label>
        <input
          type="text"
          name="address_street"
          value={formData.address_street}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>ID Type</label>
        <select name="idType" value={formData.idType} onChange={handleChange} required>
          <option value="" disabled>Select ID Type</option>
          <option value="passport">Passport</option>
          <option value="driverLicense">Driver's License</option>
          <option value="nationalID">National ID</option>
        </select>
      </div>

      <div>
        <label>ID Number</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>ID Photo</label>
        <input
          type="file"
          name="idPhoto"
          onChange={handleFileChange}
          required
        />
      </div>


      <button type="submit">Submit KYC</button>
    </form>
  );
};



export default KycFormPage;
