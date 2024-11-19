// Layout.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar toggleDrawer={toggleDrawer} />
      <Navbar isDrawerOpen={isDrawerOpen} />
      <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <main 
        className={`transition-all duration-300 ${
          isDrawerOpen ? 'ml-60' : 'ml-20'  // Changed from ml-64 to ml-72 and ml-16 to ml-20
        } pt-16`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;