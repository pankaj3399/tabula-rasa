// client/src/components/TodaysSchedule.jsx
import React from 'react';

const TodaysSchedule = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Today's Schedule</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              <div className="w-1 bg-purple-500 h-16 rounded-full"></div>
            </div>
            <div className="flex-1">
              <h4 className="text-gray-800 font-medium text-base">Cardiovascular System Study</h4>
              <p className="text-xs text-gray-500 mt-1">9:00 AM - 10:30 AM</p>
              <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs mt-2">45 min</span>
            </div>
            <div className="ml-auto">
              <span className="text-sm font-medium text-purple-600">45 min</span>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              <div className="w-1 bg-blue-500 h-16 rounded-full"></div>
            </div>
            <div className="flex-1">
              <h4 className="text-gray-800 font-medium text-base">Pulmonary System Study</h4>
              <p className="text-xs text-gray-500 mt-1">11:00 AM - 12:00 PM</p>
              <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs mt-2">30 min</span>
            </div>
            <div className="ml-auto">
              <span className="text-sm font-medium text-blue-600">30 min</span>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              <div className="w-1 bg-green-500 h-16 rounded-full"></div>
            </div>
            <div className="flex-1">
              <h4 className="text-gray-800 font-medium text-base">Research Methods</h4>
              <p className="text-xs text-gray-500 mt-1">2:00 PM - 3:00 PM</p>
              <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs mt-2">60 min</span>
            </div>
            <div className="ml-auto">
              <span className="text-sm font-medium text-green-600">60 min</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <a href="#" className="text-purple-600 hover:text-purple-800 text-sm font-medium inline-flex items-center">
            View Full Schedule
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TodaysSchedule;