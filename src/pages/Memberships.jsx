import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const [Memberships, setMemberships] = useState(
    [...Array(8)].map((_, index) => ({
      id: index,
      plan: `Plan ${index + 1}`,
      price: "1,999 USD/Month",
      issueDate: "Feb 12, 2024",
      expiry: index % 2 === 0 ? "2 Days left" : "Mar 21, 2024",
      isPaid: false, // New field to track payment status
    }))
  );

  const navigate = useNavigate();
  
  const handleDetailsClick = () => {
    navigate("/payments"); 
  };  

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newMembership, setNewMembership] = useState({
    plan: "",
    price: "",
    issueDate: "",
    expiry: "",
    isPaid: false, // Initialize new Memberships as unpaid
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMembership({ ...newMembership, [name]: value });
  };

  const addMembership = () => {
    setMemberships([
      ...Memberships,
      { ...newMembership, id: Memberships.length },
    ]);
    resetForm();
  };

  const editMembership = (id) => {
    const Membership = Memberships.find((sub) => sub.id === id);
    setNewMembership(Membership);
    setIsEditing(true);
    setEditingId(id);
    setShowForm(true);
  };

  const updateMembership = () => {
    setMemberships(
      Memberships.map((sub) =>
        sub.id === editingId ? { ...newMembership, id: editingId } : sub
      )
    );
    resetForm();
  };

  const deleteMembership = (id) => {
    setMemberships(Memberships.filter((sub) => sub.id !== id));
  };

  const handlePayment = (id) => {
    setMemberships(
      Memberships.map((sub) =>
        sub.id === id ? { ...sub, isPaid: true } : sub
      )
    );
    alert(`Membership ${id} marked as paid.`);
  };

  const resetForm = () => {
    setNewMembership({ plan: "", price: "", issueDate: "", expiry: "", isPaid: false });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Memberships</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center text-blue-600 font-medium"
        >
          <span className="material-icons mr-2">add</span> Add Membership
        </button>
      </div>

      {/* Membership Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {Memberships.map((Membership) => (
          <div
          style={{
            borderRadius: "20px",
            boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
            
          }}
            key={Membership.id}
            className={`bg-white rounded-lg shadow-lg p-4 ${
              Membership.id % 2 === 0 ? "border-l-4 border-purple-400" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg text-gray-700">
                {Membership.plan}
              </p>
              <div className="flex space-x-2">
                <button
                  style={{
                    borderRadius: "20px",
                    boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
                    width: "70px",
                  }}
                  onClick={() => editMembership(Membership.id)}
                  className="px-3 py-1 text-blue-500 rounded bg-blue-100 hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  style={{
                    borderRadius: "20px",
                    boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
                    
                  }}
                  onClick={() => deleteMembership(Membership.id)}
                  className="px-3 py-1 text-red-500 rounded bg-red-100 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-1000 mt-1">{Membership.price}</p>
            <p className="text-gray-1000 text-sm mt-4">Date Issue</p>
            <p className="text-sm font-medium">{Membership.issueDate}</p>
            <p className="text-gray-1000 text-sm mt-4">Expiring</p>
            <p
              className={`text-sm font-medium ${
                Membership.id % 2 === 0 ? "text-red-500" : "text-gray-700"
              }`}
            >
              {Membership.expiry}
            </p>
            <div className="flex justify-end mt-4 -mt-9">
            <button
              style={{
                borderRadius: "20px",
                boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
                
              }}
              onClick={() => { 
                handleDetailsClick(); 
                handlePayment(Membership.id);
              }}
              className={`px-3 py-2 text-white rounded ${
                Membership.isPaid
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={Membership.isPaid}
            >
              {Membership.isPaid ? "Paid" : "Pay Now"}
            </button>
          </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Membership Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Membership" : "Add New Membership"}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Plan</label>
              <input
                type="text"
                name="plan"
                value={newMembership.plan}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., Basic Plan"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                name="price"
                value={newMembership.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., 1,999 USD/Month"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Date Issue</label>
              <input
                type="date"
                name="issueDate"
                value={newMembership.issueDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Expiring</label>
              <input
                type="text"
                name="expiry"
                value={newMembership.expiry}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., 2 Days left"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={isEditing ? updateMembership : addMembership}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;
