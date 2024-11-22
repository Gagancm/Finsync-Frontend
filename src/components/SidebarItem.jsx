import React from 'react';

const SidebarItem = ({ icon, text, isActive, onClick, isDrawerOpen }) => {
  return (
    <button
    
      onClick={onClick}
      className={`flex items-center ${
        isDrawerOpen ? 'gap-4 px-4' : 'justify-center'
      } py-3 w-full rounded-lg hover:bg-gray-700 ${
        isActive ? 'bg-gray-700' : ''
      }`}
    >
      <span className="h-5 w-5">{icon}</span>
      {isDrawerOpen && <span>{text}</span>}
    </button>
  );
};

export default SidebarItem;
