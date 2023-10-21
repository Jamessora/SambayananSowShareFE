import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiBaseURL} from '../../services/user/authService';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`${apiBaseURL}/admin/users/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Remove the user from the state to update the UI
        setUsers(users.filter(user => user.id !== userId));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('An error occurred while deleting the user:', error);
    }
  };

  const handleShow = (userId) => {
    navigate(`/admin/users/${userId}`); // Navigate to the user details page
  };
  const handleEdit = (userId) => {
    navigate(`/admin/users/${userId}/edit`); // Navigate to the user details page
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiBaseURL}/admin/users`);
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', data);
        }
      } catch (error) {
        console.error('An error occurred while fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>KYC Status</th>
            {/* Add more columns as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
              <td>{user.kyc_status}</td>
              {/* Add more cells as needed */}
              <td>
                <button onClick={() => handleShow(user.id)}>Show</button>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                {/* Add more action-specific buttons here */}
               </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate('/admin/users/create')}>Create user</button>
    </div>
  );
};

export default AdminUsersPage;
