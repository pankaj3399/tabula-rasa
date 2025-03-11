// client/src/components/ContinueLearning.jsx
import React from 'react';

const ContinueLearning = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Continue Learning</h3>
      <div className="mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Cardiomyopathy - Last studied 2 days ago</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Cardiovascular System - Last studied 2 days ago</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          A group of diseases affecting the heart muscle. Includes multiple types: dilated, hypertrophic, restrictive, and stress-induced. Tracked as a single topic for PANCE preparation.
        </p>
        <div className="mt-2 flex justify-between">
          <button className="text-blue-600 hover:underline">Skip</button>
          <button className="text-blue-600 hover:underline">Continue →</button>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;