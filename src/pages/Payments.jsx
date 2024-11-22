import React from "react";

const PaymentsHistory = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Payments</h2>
        <button className="flex items-center text-blue-600 font-medium">
          <span className="material-icons mr-2">add</span> Add Payment
        </button>
      </div>

      {/* My Payments Section */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              style={{
                borderRadius: "20px",
                boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
              }}
              className={`bg-white rounded-lg shadow-lg p-4 ${
                index % 2 === 0 ? "border-l-4 border-green-400" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg text-gray-700">Transaction</p>
                <button
                  style={{
                    borderRadius: "20px",
                    boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
                    height: "40px",
                  }}
                  className={`px-4 py-1 rounded-lg text-white ${
                    index % 2 === 0
                      ? "bg-green-400"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                >
                  View
                </button>
              </div>
              <p className="text-gray-1000 mt-1">150 USD</p>
              <p className="text-gray-1000 text-sm mt-4">Date</p>
              <p className="text-sm font-medium">Nov 12, 2024</p>
              <p className="text-gray-1000 text-sm mt-4">Status</p>
              <p
                className={`text-sm font-medium ${
                  index % 2 === 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {index % 2 === 0 ? "Paid" : "Pending"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Payments Section */}
      <div className="mb-12">
        <h3 className="font-semibold text-lg mb-4">Completed Payments</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              style={{
                borderRadius: "20px",
                boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
                
              }}
              key={index}
              className="bg-white rounded-lg shadow-lg h-28 p-4"
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg text-gray-700">Payment #{index + 1}</p>
                <span className="text-green-500 font-medium">Paid</span>
              </div>
              <p className="text-gray-1000 text-sm mt-2">Amount: 120 USD</p>
              <p className="text-gray-1000 text-sm">Date: Oct 21, 2024</p>
            </div>
          ))}
        </div>
      </div>

      {/* Failed Payments Section */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Failed Payments</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(2)].map((_, index) => (
            <div
              style={{
                borderRadius: "20px",
                boxShadow: "3px 6px 4px 0 rgba(0, 0, 0, 0.39), inset -5px -5px 10.2px 0 rgba(0, 0, 0, 0.38)",
                
              }}
              key={index}
              className="bg-white rounded-lg shadow-lg h-28 p-4"
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg text-gray-700">Payment #{index + 1}</p>
                <span className="text-red-500 font-medium">Failed</span>
              </div>
              <p className="text-gray-1000 text-sm mt-2">Amount: 90 USD</p>
              <p className="text-gray-1000 text-sm">Date: Sep 15, 2024</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentsHistory;
