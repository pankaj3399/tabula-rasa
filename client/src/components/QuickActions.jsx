// client/src/components/QuickActions.jsx
import React from 'react';

const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <h4 className="text-sm font-semibold">PANCE PATHWAY</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">Guided study plan for PANCE success based on the official exam blueprint</p>
          <button className="mt-2 text-blue-600 hover:underline">View Knowledge Map →</button>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <h4 className="text-sm font-semibold">Progress Report</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">Track your study progress and identify areas for improvement</p>
          <button className="mt-2 text-blue-600 hover:underline">View Reports →</button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;