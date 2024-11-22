import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Memberships from './pages/Memberships';
import EMI from './pages/EMI';
import Payments from './pages/Payments';
import Profile from './pages/Profile';
import Layout from './components/Layout';

const App = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <PrivateRoute>
              <Layout>
                <Subscriptions />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/memberships"
          element={
            <PrivateRoute>
              <Layout>
                <Memberships />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/emi"
          element={
            <PrivateRoute>
              <Layout>
                <EMI />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <PrivateRoute>
              <Layout>
                <Payments />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;