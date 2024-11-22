import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, LayoutGrid, ScrollText, Users, CreditCard, UserCircle, LogOut } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { logoutUser } from '../services/authService'; // Import the logoutUser function

const Sidebar = ({ isDrawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Logout handler function
  const handleLogout = () => {
    logoutUser(); // Call the logoutUser function to remove the token and user data
    navigate('/login'); // Redirect the user to the login page
  };

  return (
    <div
    style={{
      borderRadius: "0 20px 20px 0",
      boxShadow: "3px 6px 10px 0 rgba(0, 0, 0, 0.8), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 1.3)", // Drop shadow + Inner shadow
    }}
      className={`fixed left-0 top-0 h-full bg-gray-800 text-white transition-all duration-300 ${isDrawerOpen ? 'w-60' : 'w-17'} z-20 flex flex-col`}
    >
      {/* Logo with Toggle Button */}
      <div className="flex items-center justify-center relative p-4 transition-all">
        {/* Centered Logo */}
        <img
          src={isDrawerOpen ? require('./Logo/logo.png') : require('./Logo/logo 2.png')}
          alt="Finsync Logo"
          className="transition-all h-12 w-25"
        />

        {/* Toggle Button */}
        <button
          style={{
            borderRadius: "20px",
            boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)", // Drop shadow + Inner shadow
          }}
          onClick={toggleDrawer}
          className="absolute right-[-14px] p-2 bg-gray-700 rounded-full hover:bg-gray-600 transform transition-transform"
        >
          <ChevronLeft
            className={`h-6 w-6 text-white ${!isDrawerOpen && 'rotate-180'}`}
          />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 flex flex-col items-center px-4 py-2 w-full rounded-lg space-y-2 mt-4">
        <SidebarItem
          icon={<LayoutGrid />}
          text="DASHBOARD"
          isActive={location.pathname === '/'}
          onClick={() => navigate('/')}
          isDrawerOpen={isDrawerOpen}
        />
        <SidebarItem
          icon={<ScrollText />}
          text="SUBSCRIPTIONS"
          isActive={location.pathname === '/subscriptions'}
          onClick={() => navigate('/subscriptions')}
          isDrawerOpen={isDrawerOpen}
        />
        <SidebarItem
          icon={<Users />}
          text="MEMBERSHIPS"
          isActive={location.pathname === '/memberships'}
          onClick={() => navigate('/memberships')}
          isDrawerOpen={isDrawerOpen}
        />
        <SidebarItem
          icon={<CreditCard />}
          text="EMI"
          isActive={location.pathname === '/emi'}
          onClick={() => navigate('/emi')}
          isDrawerOpen={isDrawerOpen}
        />
        <SidebarItem
          icon={<CreditCard />}
          text="PAYMENTS"
          isActive={location.pathname === '/payments'}
          onClick={() => navigate('/payments')}
          isDrawerOpen={isDrawerOpen}
        />
        <SidebarItem
          icon={<UserCircle />}
          text="MY PROFILE"
          isActive={location.pathname === '/profile'}
          onClick={() => navigate('/profile')}
          isDrawerOpen={isDrawerOpen}
        />
      </nav>

      {/* Logout Button */}
      <div className={`p-4 ${isDrawerOpen ? 'flex justify-start' : 'flex justify-center'}`}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 w-full rounded-lg hover:bg-gray-700 active:ring-4 active:ring-blue-300"
          style={{
            borderRadius: "20px",
            boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)", // Drop shadow + Inner shadow
          }}
        >
          <LogOut className="h-5 w-5" />
          {isDrawerOpen && <span>LOG OUT</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;