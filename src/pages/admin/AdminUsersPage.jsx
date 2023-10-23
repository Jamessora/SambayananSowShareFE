import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { token, apiURL } from '../../services/user/authService';
import UserSidebar from '../../components/AdminSidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '250px',
  height: '250px',
  flexGrow: 1,
}));

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`${apiURL}/admin/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
  
      })
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
        const response = await fetch(`${apiURL}/admin/users`,{
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        },
  
      })
        
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
    <UserSidebar>
      <div>
        <h1>Admin Users</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>KYC Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.kyc_status}</TableCell>
                  <TableCell>
                   <Button variant="contained" color="primary"  onClick={() => handleShow(user.id)}>
                      Show
                    </Button>
                    <Button variant="contained" color="secondary"  onClick={() => handleEdit(user.id)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" onClick={() => navigate('/admin/users/create')}>
          Create User
        </Button>
      </div>
    </UserSidebar>
  );
};

export default AdminUsersPage;
