// client/src/components/UpcomingTests.jsx
import React from 'react';

const UpcomingTests = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Upcoming Tests</h3>
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">Cardiovascular System - Friday, March 13</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Pulmonary System - Tuesday, March 17</p>
      </div>
    </div>
  );
};

export default UpcomingTests;