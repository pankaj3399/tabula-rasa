// UpcomingTests.jsx
import React from 'react';

const UpcomingTests = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upcoming Tests</h2>
      
      <div className="space-y-3">
        <div className="flex">
          <div className="w-1 bg-purple-500 rounded-l-md"></div>
          <div className="flex-1 bg-purple-50 p-3 rounded-r-md">
            <div className="text-gray-700 text-sm">Cardiovascular System</div>
            <div className="text-gray-500 text-xs">Friday, March 13</div>
          </div>
        </div>
        
        <div className="flex">
          <div className="w-1 bg-blue-500 rounded-l-md"></div>
          <div className="flex-1 bg-blue-50 p-3 rounded-r-md">
            <div className="text-gray-700 text-sm">Pulmonary System</div>
            <div className="text-gray-500 text-xs">Tuesday, March 17</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTests;