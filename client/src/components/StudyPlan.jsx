// client/src/components/StudyPlan.jsx
import React from 'react';

const StudyPlan = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden mt-6">
      <div className="p-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h2 className="text-lg font-bold text-gray-800">Today's Study Plan</h2>
      </div>
      
      <div className="p-4 pt-0 flex flex-wrap gap-4">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-purple-500 rounded-full mr-2"></div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-md flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Cardiovascular System: 45 min</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-1 h-10 bg-blue-500 rounded-full mr-2"></div>
          <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-md flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Pulmonary System: 30 min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;