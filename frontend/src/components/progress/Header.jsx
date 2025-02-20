import React from 'react';

const Header = () => {
  return (
    <div className="border-b pb-4 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Project Progress Tracker
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Track and manage project phases and tasks
      </p>
    </div>
  );
};

export default Header;