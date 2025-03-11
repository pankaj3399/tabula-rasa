import React from 'react';

const UpcomingTests = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upcoming Tests</h2>
      
      <div className="space-y-4">
        <div className="flex">
          <div className="w-1 bg-purple-500 rounded-l-md"></div>
          <div className="flex-1 bg-purple-50 p-4 rounded-r-md">
            <div className="text-gray-700">Cardiovascular System</div>
            <div className="text-gray-500 text-sm">Friday, March 13</div>
          </div>
        </div>
        
        <div className="flex">
          <div className="w-1 bg-blue-500 rounded-l-md"></div>
          <div className="flex-1 bg-blue-50 p-4 rounded-r-md">
            <div className="text-gray-700">Pulmonary System</div>
            <div className="text-gray-500 text-sm">Tuesday, March 17</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTests;