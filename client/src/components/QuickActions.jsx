import React from 'react';

const QuickActions = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PANCE PATHWAY Card */}
        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-md">
              <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2z"/>
                <path d="M9 2v20M15 12l-3-3m0 0l-3 3m3-3v9"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-400 uppercase">PANCE PATHWAY</h3>
              <p className="text-gray-600 my-2">Guided study plan for PANCE success based on the official exam blueprint</p>
              <a href="#" className="text-purple-500 font-medium inline-flex items-center">
                View Knowledge Map 
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Progress Report Card */}
        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-md">
              <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 13v-1m4 1v-3m4 3V8M12 3v1M5.45 5.11L6.5 6.75m12.05-1.64L17.5 6.75M5.45 17.89L6.5 16.25m12.05 1.64L17.5 16.25M3 10h1m16 0h1M3 14h1m16 0h1M10 3h4"/>
                <path d="M4 21.5v-18A1.5 1.5 0 015.5 2H20v18a1.5 1.5 0 01-1.5 1.5H4z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Progress Report</h3>
              <p className="text-gray-600 my-2">Track your study progress and identify areas for improvement</p>
              <a href="#" className="text-green-600 font-medium inline-flex items-center">
                View Reports
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;