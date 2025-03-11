// client/src/components/QuickActions.jsx
import React from 'react';

const QuickActions = () => {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {/* PANCE PATHWAY Card */}
        <div className="border rounded-lg p-4 flex items-start gap-4">
          <div className="bg-purple-100 p-2 rounded-md">
            <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path>
              <polyline points="10 2 10 10 13 7 16 10 16 2"></polyline>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase">PANCE PATHWAY</h3>
            <p className="text-xs text-gray-600 my-1">Guided study plan for PANCE success based on the official exam blueprint</p>
            <a href="#" className="text-purple-600 text-xs font-medium inline-flex items-center">
              View Knowledge Map 
              <svg className="w-3 h-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Progress Report Card */}
        <div className="border rounded-lg p-4 flex items-start gap-4">
          <div className="bg-green-100 p-2 rounded-md">
            <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Progress Report</h3>
            <p className="text-xs text-gray-600 my-1">Track your study progress and identify areas for improvement</p>
            <a href="#" className="text-green-600 text-xs font-medium inline-flex items-center">
              View Reports
              <svg className="w-3 h-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;