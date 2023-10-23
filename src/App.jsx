import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'
// import GoogleIdentityComponent from './GoogleIdentityComponent';
// import CallbackComponent from './CallbackComponent';

import './App.css'
{/* imports for User */}
import SetInitialPassword from './pages/user/auth/SetInitialPassword';
import SignupComponent from './pages/user/auth/SignupComponent';
import LoginComponent from './pages/user/auth/LoginComponent';
import DashboardPage from './pages/user/DashboardPage';


{/* imports for Admin */}

import AdminSignupPage from './pages/admin/auth/AdminSignupPage';


{/* General imports */}
import EmailSent from './components/EmailSent';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import KycFormPage from './pages/user/KycFormPage';
import KycSubmitted from './pages/user/KycSubmitted';
import AdminLoginPage from './pages/admin/auth/AdminLoginPage';
import ConfirmationSuccess from './pages/admin/auth/ConfirmSuccessPage';
import AdminKYCPage from './pages/admin/AdminKycPage';
import CropsPage from './pages/user/crops/CropPage';


import MarketCropPage from './pages/user/market/MarketCropPage';
import SignOutPage from './pages/user/auth/SignoutPage';
import CheckoutPage from './pages/user/market/CheckoutPage';
import OrderSuccessPage from './pages/user/market/OrderSuccessPage';

import TransactionsPage from './pages/user/market/TransactionsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminCropsPage from './pages/admin/AdminCropsPage';
import AdminTransactionsPage from './pages/admin/AdminTransactionsPage';
import AdminUserDetailPage from './pages/admin/AdminUserDetailPage';
import AdminEditUser from './pages/admin/AdminEditUser';
import AdminCreateUser from './pages/admin/AdminCreateUser';
import AdminTransactionDetailPage from './pages/admin/AdminTransactionDetailPage';




function App() {


  return (
    <Router>
      <Routes>
    
    {/* User Views */}
    <Route path="/signup" element={<SignupComponent/>} />
    <Route path="/login" element={<LoginComponent/>} />
    <Route path="/email-sent" element={<EmailSent/>} />
    <Route path="/dashboard" element={<DashboardPage/>} />
    <Route path="/set-initial-password/:token" element={<SetInitialPassword/>} />
    <Route path="/kyc" element={<KycFormPage/>} />
    <Route path="/kyc-submitted" element={<KycSubmitted/>} />
    <Route path="/crops" element={<CropsPage/>} />
    <Route path="/market" element={<MarketCropPage/>} />
    <Route path="/signout" element={<SignOutPage/>} />
    <Route path="/checkout" element={<CheckoutPage/>} />
    <Route path="/order-success/:transactionId" element={<OrderSuccessPage/>} />
    <Route path="/transactions" element={<TransactionsPage/>} />

     {/* Admin Views */}
     <Route path="/admin/signup" element={<AdminSignupPage/>} />
    <Route path="/admin/login" element={<AdminLoginPage/>} />
    <Route path="/admin/email-sent" element={<EmailSent/>} />
    <Route path="/admin/dashboard" element={<AdminDashboardPage/>} />
    <Route path="/admin/kyc" element={<AdminKYCPage/>} />
    <Route path="/admin/users" element={<AdminUsersPage/>} />
    <Route path="/admin/crops" element={<AdminCropsPage/>} />
    <Route path="/admin/transactions" element={<AdminTransactionsPage/>} />
    <Route path="/confirmation-success" element={<ConfirmationSuccess/>} />
    <Route path="/admin/users/:userId" element={<AdminUserDetailPage/>} />
    <Route path="/admin/users/:userId/edit" element={<AdminEditUser/>} />
    <Route path="/admin/users/create" element={<AdminCreateUser/>} />
    <Route path="/admin/transactions" element={<AdminTransactionsPage/>} />
    <Route path="/admin/transactions/:transactionId" element={<AdminTransactionDetailPage/>} />
    


    </Routes>
    </Router>
  )
}

export default App
