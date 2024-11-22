import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, updateUser, deleteUser, logout } = useAuth();

  // State for the profile data
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [password, setPassword] = useState("");

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        updateUser({ profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfileData = async () => {
    await updateUser({ name, email });
    setShowProfileModal(false);
  };

  const handleSavePassword = async () => {
    await updateUser({ password });
    setPassword("");
    setShowPasswordModal(false);
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      await deleteUser();
      logout();
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
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
            {/* Profile Picture with Circle Border */}
            <div className="relative">
            
                <img
                  src={profilePic || "/default-avatar.png"}
                  alt="Profile Picture"
                  className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover"
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
            {/* User Name Display */}
            <div className="ml-6">
              <h3 className="text-2xl font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-500">{email}</p>
            </div>
          </div>
          {/* Edit Profile Button */}
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