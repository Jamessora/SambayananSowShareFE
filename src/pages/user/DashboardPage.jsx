import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../../components/UserSidebar'


const DashboardPage = () =>{ 
const navigate = useNavigate();

return(
  
<UserSidebar>


    <div>

        this is the DashboardPage
        <button onClick={() => navigate('/kyc')}>
            Submit KYC Form
          </button>
        
          <button onClick={() => navigate('/crops')}>
            Check Crops
          </button>

    </div>
</UserSidebar>
)

};
export default DashboardPage