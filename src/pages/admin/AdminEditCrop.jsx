import React, { useState, useEffect } from 'react';

const AdminEditCrop = ({ cropId }) => {
  const [cropData, setCropData] = useState({
    crop_name: '',
    crop_price: '',
    // Add other fields
  });

  useEffect(() => {
    const fetchCropData = async () => {
      const response = await fetch(`/admin/crops/${cropId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCropData(data);
      } else {
        console.error('Failed to fetch crop data', data);
      }
    };
    fetchCropData();
  }, [cropId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/admin/crops/${cropId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers like Authorization
      },
      body: JSON.stringify(cropData),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Crop updated successfully', data);
    } else {
      console.error('Failed to update crop', data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Crop Name:
        <input type="text" name="crop_name" value={cropData.crop_name} onChange={handleChange} />
      </label>
      <label>
        Crop Price:
        <input type="number" name="crop_price" value={cropData.crop_price} onChange={handleChange} />
      </label>
      {/* Add other fields */}
      <button type="submit">Save</button>
    </form>
  );
};
