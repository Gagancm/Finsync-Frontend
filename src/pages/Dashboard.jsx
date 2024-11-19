import React from 'react';
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ title, children, className, style }) => (
  <div className={`rounded-lg p-4 text-black ${className}`} style={style}>
    <h3 className="font-bold text-lg">{title}</h3>
    {children}
  </div>
);

const SubscriptionCard = ({ brand, amount, duration, dueIn, color }) => (
  <div 
    style={{
      borderRadius: "20px",
      boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
    }}
  className="bg-white rounded-lg shadow-lg p-4 text-black">
    <h3 className={`font-bold text-${color}-500`}>{brand}</h3>
    <p className="text-sm mt-1">{duration}</p>
    <p className="font-bold text-lg mt-2">{amount} USD / year</p>
    <p className="text-sm mt-1">1,200 USD Every {duration}</p>
    {dueIn && <p className="text-sm mt-2 text-gray-500">Due in {dueIn}</p>}
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const handleDetailsClick1 = () => {
    navigate("/subscriptions"); 
  };

  const handleDetailsClick2 = () => {
    navigate("/memberships"); 
  };

  const handleDetailsClick3 = () => {
    navigate("/emi"); 
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Active Section */}
      <h2 className="text-xl font-semibold mb-4">Active</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Active Subscriptions */}
        <DashboardCard 
          title="1 Active Subscriptions" 
          className="bg-yellow-400 p-6" // Added padding and background
          style={{
            borderRadius: "20px",
            boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)", // Drop shadow + Inner shadow
          }}
        >
          <div className="mt-10 flex items-center justify-between">
            <img src="/api/placeholder/50/50" alt="AT&T" className="rounded" />
            <button 
              style={{
                borderRadius: "15px",
                boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
              }}
              onClick={handleDetailsClick1}
              className="bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              Details
            </button>
          </div>
        </DashboardCard>

        {/* Active Memberships */}
        <DashboardCard 
          title="3 Active Memberships" 
          className="bg-blue-200 p-6" // Added padding and background
          style={{
            borderRadius: "20px",
            boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)", // Drop shadow + Inner shadow
          }}
        >
          <div className="mt-10 flex items-center justify-between">
            <div className="flex gap-2">
              <img src="/api/placeholder/50/50" alt="Amazon" className="rounded" />
              <img src="/api/placeholder/50/50" alt="Disney" className="rounded" />
              <img src="/api/placeholder/50/50" alt="Netflix" className="rounded" />
            </div>
            <button 
              style={{
                borderRadius: "15px",
                boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
              }}
              onClick={handleDetailsClick2}
              className="bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              Details
            </button>
          </div>
        </DashboardCard>

        {/* Active EMI */}
        <DashboardCard 
          title="1 Active EMI" 
          className="bg-purple-200 p-6" // Added padding and background
          style={{
            borderRadius: "20px",
            boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)", // Drop shadow + Inner shadow
          }}
        >
          <div className="mt-10 flex items-center justify-between">
            <img src="/api/placeholder/50/50" alt="Apple" className="rounded" />
            <button 
            style={{
              borderRadius: "15px",
              boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
            }}
              onClick={handleDetailsClick3}
              className="bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              Details
            </button>
          </div>
        </DashboardCard>
      </div>

      {/* Upcoming Dues Section */}
      <h2 className="text-xl font-semibold mb-4">Upcoming Dues</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <SubscriptionCard
        brand="NETFLIX"
        duration="12 MONTHS"
        amount="1,999"
        dueIn="2 Days"
        color="red"
        style={{
          borderRadius: "20px",
          boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
        }}
      />

      <SubscriptionCard
        brand="AMAZON"
        duration="12 MONTHS"
        amount="1,999"
        dueIn="2 Days"
        color="yellow"
        style={{
          borderRadius: "20px",
          boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
        }}
      />

      <SubscriptionCard
        brand="DISNEY"
        duration="12 MONTHS"
        amount="1,999"
        dueIn="2 Days"
        color="blue"
        style={{
          borderRadius: "20px",
          boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
        }}
      />
    </div>


      {/* Monthly Plans Section */}
      <h2 className="text-xl font-semibold mb-4">Monthly Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SubscriptionCard
          brand="NETFLIX"
          duration="12 MONTHS"
          amount="1,999"
          color="red"
        />
        <SubscriptionCard
          brand="AMAZON"
          duration="12 MONTHS"
          amount="1,999"
          color="yellow"
        />
        <SubscriptionCard
          brand="DISNEY"
          duration="12 MONTHS"
          amount="1,999"
          color="blue"
        />
      </div>
    </div>
  );
};

export default Dashboard;
