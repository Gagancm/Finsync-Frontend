import React, { useState } from "react";
import { Bell, Search, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60";

const Navbar = ({ isDrawerOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Payment Received",
      message: "You received a payment of $50",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Subscription Updated",
      message: "Your subscription plan has been updated",
      time: "5 hours ago",
      isRead: false,
    },
    {
      id: 3,
      title: "Welcome Message",
      message: "Welcome to our platform! Get started by exploring features",
      time: "1 day ago",
      isRead: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const commonButtonStyles = {
    borderRadius: "20px",
    boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0"
  };

  const dropdownStyles = {
    borderRadius: "20px",
    boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "DASHBOARD";
      case "/subscriptions":
        return "SUBSCRIPTIONS";
      case "/memberships":
        return "MEMBERSHIPS";
      case "/emi":
        return "EMI";
      case "/payments":
        return "PAYMENTS";
      case "/profile":
        return "MY PROFILE";
      default:
        return "DASHBOARD";
    }
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleChangePassword = () => {
    setIsProfileMenuOpen(false);
    navigate("/profile#change-password");
  };

  const handleProfileRedirect = () => {
    setIsProfileMenuOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav
      className={`fixed right-0 z-10 bg-gray-100 transition-all duration-300 ${
        isDrawerOpen ? "left-60 w-[calc(100%-240px)]" : "left-20 w-[calc(100%-80px)]"
      }`}
    >
      <div className="flex items-center justify-between h-16">
        <div className="pl-6">
          <h1 className="text-xl font-bold">{getPageTitle()}</h1>
        </div>
        <div className="flex items-center gap-4 pr-6 relative">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <div
              style={isSearchOpen ? dropdownStyles : commonButtonStyles}
              className={`flex items-center bg-white transition-all duration-300 overflow-hidden ${
                isSearchOpen ? "w-60 rounded-lg" : ""
              }`}
            >
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center justify-center w-10 h-10"
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>
              <input
                type="text"
                placeholder="Search..."
                className={`w-full outline-none ${isSearchOpen ? "block mr-4" : "hidden"}`}
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              style={commonButtonStyles}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="bg-white hover:bg-gray-100 transition-all relative"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            {isNotificationsOpen && (
              <div 
                style={dropdownStyles}
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                        notification.isRead ? "opacity-70" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <div 
              style={commonButtonStyles}
              className="bg-white hover:bg-gray-100 transition-all cursor-pointer overflow-hidden"
              onClick={handleProfileClick}
            >
              <img
                src={user?.profilePic || (imageError ? DEFAULT_PROFILE_IMAGE : user?.profilePic || DEFAULT_PROFILE_IMAGE)}
                alt="User profile"
                className="w-full h-full object-cover rounded-full"
                onError={handleImageError}
              />
            </div>
            {isProfileMenuOpen && (
              <div 
                style={dropdownStyles}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
              >
                <button
                  onClick={handleProfileRedirect}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                >
                  View Profile
                </button>
                <button
                  onClick={handleChangePassword}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                >
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-500"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;