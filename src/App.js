import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout'; // Your existing layout component
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Memberships from './pages/Memberships';
import EMI from './pages/EMI';
import Payments from './pages/Payments';
import Profile from './pages/Profile';
import Login from './pages/login'; // Import the Login page
import Signup from './pages/signup'; // Import the Signup page
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

const App = () => {
  const isAuthenticated = localStorage.getItem('authToken');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes - Layout will be applied only if user is authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/subscriptions"
          element={
            isAuthenticated ? (
              <Layout>
                <Subscriptions />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/memberships"
          element={
            isAuthenticated ? (
              <Layout>
                <Memberships />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/emi"
          element={
            isAuthenticated ? (
              <Layout>
                <EMI />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/payments"
          element={
            isAuthenticated ? (
              <Layout>
                <Payments />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Layout>
                <Profile />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
