// client/src/components/PANCEBlueprintProgress.jsx
import React from 'react';

const PANCEBlueprintProgress = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">PANCE Blueprint Progress</h3>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Cardiovascular System <span className="text-red-600">11%</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '11%' }}></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Overall completion <span className="text-red-600">54%</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '54%' }}></div>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Pulmonary System <span className="text-blue-600">9%</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '9%' }}></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Overall completion <span className="text-blue-600">32%</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '32%' }}></div>
          </div>
        </div>
      </div>
      <button className="mt-4 text-blue-600 hover:underline">View All Systems →</button>
    </div>
  );
};

export default PANCEBlueprintProgress;