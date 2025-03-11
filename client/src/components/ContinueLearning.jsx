// client/src/components/ContinueLearning.jsx
import React from 'react';

const ContinueLearning = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Continue Learning</h3>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h4 className="text-lg font-semibold text-gray-800">Cardiomyopathy</h4>
          <p className="text-sm text-gray-500">Cardiovascular System • Last studied 2 days ago</p>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          A group of diseases affecting the heart muscle. Includes multiple types: dilated, hypertrophic, restrictive, and stress-induced. Tracked as a single topic for PANCE preparation.
        </p>
        <div className="bg-blue-50 h-2 rounded-full mb-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">45% Complete</span>
        </div>
        <div className="flex justify-between mt-4">
          <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">Skip</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
            Continue
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;