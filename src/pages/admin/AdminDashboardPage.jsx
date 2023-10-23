import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../../components/AdminSidebar';


const AdminDashboardPage = () =>{ 
const navigate = useNavigate();
return(
<UserSidebar>
    <div>
        
        this is the DashboardPage
        <button onClick={() => navigate('/admin/kyc')}>
            Submit KYC Form
          </button>


    </div>
</UserSidebar>
)

};
export default AdminDashboardPage