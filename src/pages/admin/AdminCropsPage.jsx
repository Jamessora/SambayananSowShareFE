import React, { useEffect, useState } from 'react';
import { apiBaseURL} from '../../services/user/authService';

const AdminCropsPage = () => {
  const [crops, setCrops] = useState([]);
  
  const handleEditCrop = async (cropId) => {
    // Navigate to edit page or open a modal
  };
  
  const handleDeleteCrop = async (cropId) => {
    try {
      const response = await fetch(`${apiBaseURL}/admin/crops/${cropId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${YOUR_ADMIN_TOKEN_HERE}`
        }
      });
      if (response.ok) {
        // Remove the crop from the state to update the UI
        setCrops(crops.filter(crop => crop.id !== cropId));
      } else {
        console.error('Failed to delete crop');
      }
    } catch (error) {
      console.error('An error occurred while deleting the crop:', error);
    }
  };
  
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch(`${apiBaseURL}/admin/crops`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${YOUR_ADMIN_TOKEN_HERE}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setCrops(data);
        } else {
          console.error('Failed to fetch crops:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching crops:', error);
      }
    };

    fetchCrops();
  }, []);

  return (
    <div>
      <h1>Admin Crops</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            {/* Add more columns as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop, index) => (
            <tr key={index}>
              <td>{crop.id}</td>
              <td>{crop.crop_name}</td>
              <td>{crop.crop_price}</td>
              {/* Add more cells as needed */}
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                {/* Add more action-specific buttons here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCropsPage;
