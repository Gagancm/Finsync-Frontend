/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const CustomAlert = ({ message }) => (
  <div className="fixed top-4 right-4 z-50 max-w-md bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded shadow-lg">
    <div className="font-bold">Success</div>
    <div className="text-sm">{message}</div>
  </div>
);

const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60";

const ProfilePage = () => {
  const { user, updateUser, deleteUser, logout } = useAuth();

  // State for the profile data
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || DEFAULT_PROFILE_IMAGE);
  const [password, setPassword] = useState("");
  const [imageError, setImageError] = useState(false);

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(null);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (isLoggingOut) {
        clearTimeout(isLoggingOut);
      }
    };
  }, [isLoggingOut]);

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setImageError(false);
        updateUser({ profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    setProfilePic(DEFAULT_PROFILE_IMAGE);
  };

  const handleLogoutWithDelay = (message) => {
    setSuccessMessage(message);
    setShowSuccessAlert(true);
    const timeoutId = setTimeout(() => {
      setShowSuccessAlert(false);
      logout();
    }, 3000);
    setIsLoggingOut(timeoutId);
  };

  const handleSaveProfileData = async () => {
    try {
      await updateUser({ name, email });
      setShowProfileModal(false);
      
      const changes = [];
      if (name !== user.name) changes.push("name");
      if (email !== user.email) changes.push("email");
      
      const changeMessage = changes.length > 1 
        ? `Your ${changes.join(" and ")} were updated successfully. You will be logged out in 3 seconds.`
        : `Your ${changes[0]} was updated successfully. You will be logged out in 3 seconds.`;
      
      handleLogoutWithDelay(changeMessage);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setSuccessMessage("Failed to update profile. Please try again.");
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }
  };

  const handleSavePassword = async () => {
    try {
      await updateUser({ password });
      setPassword("");
      setShowPasswordModal(false);
      handleLogoutWithDelay("Password changed successfully. You will be logged out in 3 seconds.");
    } catch (error) {
      console.error("Failed to update password:", error);
      setSuccessMessage("Failed to update password. Please try again.");
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteUser();
      handleLogoutWithDelay("Profile deleted successfully. You will be logged out in 3 seconds.");
    } catch (error) {
      console.error("Failed to delete profile:", error);
      setSuccessMessage("Failed to delete profile. Please try again.");
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {showSuccessAlert && <CustomAlert message={successMessage} />}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Profile</h2>
        <button
          style={{
            borderRadius: "20px",
            boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Profile
        </button>
      </div>

      {/* Profile Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          style={{
            borderRadius: "20px",
            boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
            height: "130px",
          }}
          className="mb-12 bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={imageError ? DEFAULT_PROFILE_IMAGE : profilePic}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover"
                  onError={handleImageError}
                />
                <label
                  htmlFor="profile-pic-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow-md cursor-pointer"
                  title="Edit Profile Picture"
                >
                  <span className="material-icons text-sm">edit</span>
                </label>
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-semibold">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-gray-500">{email}</p>
              </div>
            </div>
            <button
              style={{
                borderRadius: "8px",
                boxShadow: "2px 4px 4px 0 rgba(0, 0, 0, 0.25)",
                width: "120px",
                height: "40px"
              }}
              className="bg-blue-600 text-white"
              onClick={() => setShowProfileModal(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="mb-12">
        <h3 className="font-semibold text-lg mb-4">Account Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            style={{
              borderRadius: "20px",
              boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
              height: "130px",
            }}
            className="bg-white rounded-lg shadow-lg p-4 relative"
          >
            <h4 className="text-lg font-bold text-gray-700">Email</h4>
            <p className="text-sm text-gray-500">{email}</p>
            <button
              style={{
                borderRadius: "8px",
                boxShadow: "2px 4px 4px 0 rgba(0, 0, 0, 0.25)",
                width: "120px",
                height: "40px",
                position: "absolute",
                bottom: "45px",
                right: "25px"
              }}
              className="bg-blue-600 text-white"
              onClick={() => setShowProfileModal(true)}
            >
              Edit Email
            </button>
          </div>
          <div 
            style={{
              borderRadius: "20px",
              boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
              height: "130px",
            }}
            className="bg-white rounded-lg shadow-lg p-4 relative"
          >
            <h4 className="text-lg font-bold text-gray-700">Password</h4>
            <p className="text-sm text-gray-500">*******</p>
            <button
              style={{
                borderRadius: "8px",
                boxShadow: "2px 4px 4px 0 rgba(0, 0, 0, 0.25)",
                width: "160px",
                height: "40px",
                position: "absolute",
                bottom: "45px",
                right: "25px"
              }}
              className="bg-blue-600 text-white"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="font-semibold text-lg mb-4">Edit Profile</h3>
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowProfileModal(false)}
                className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfileData}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Edit Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="font-semibold text-lg mb-4">Change Password</h3>
            <div>
              <label className="block mb-2">New Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePassword}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Profile Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="font-semibold text-lg mb-4">Delete Profile</h3>
            <p>
              Are you sure you want to delete your profile? This action cannot be
              undone.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;