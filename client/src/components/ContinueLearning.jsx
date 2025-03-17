// client/src/components/ContinueLearning.jsx
import React from 'react';

const ContinueLearning = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Continue Learning</h3>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h4 className="text-xl font-semibold text-gray-800">Cardiomyopathy</h4>
          <p className="text-sm text-gray-500 mt-1">Cardiovascular System • Last studied 2 days ago</p>
        </div>
        
        <p className="text-sm text-gray-700 my-4">
          A group of diseases affecting the heart muscle. Includes multiple types: dilated, hypertrophic, restrictive, and stress-induced. Tracked as a single topic for PANCE preparation.
        </p>
        
        <div className="bg-gray-100 h-2 rounded-full mb-2 overflow-hidden">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
        </div>
        
        <div className="flex justify-end mb-4">
          <span className="text-sm text-blue-600 font-medium">45% Complete</span>
        </div>
        
        <div className="flex justify-between items-center mt-5">
          <button className="text-gray-500 hover:text-gray-700 font-medium py-2 px-4 border border-transparent hover:border-gray-200 rounded-md transition-all">
            Skip
          </button>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium flex items-center transition-all">
            Continue
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;