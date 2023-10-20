import React from 'react';
import { useNavigate } from 'react-router-dom';


const AdminDashboardPage = () =>{ 
const navigate = useNavigate();
return(

    <div>

        this is the DashboardPage
        <button onClick={() => navigate('/admin/kyc')}>
            Submit KYC Form
          </button>


    </div>
)

};
export default AdminDashboardPage