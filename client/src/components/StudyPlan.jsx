// client/src/components/StudyPlan.jsx
import React from 'react';

const StudyPlan = () => {
  return (
    <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl sm:text-2xl font-bold">Today's Study Plan</h3>
      <div className="flex space-x-4 mt-4">
        <button className="bg-purple-700 text-white px-4 py-2 rounded-md">Cardiovascular System: 45 min</button>
        <button className="bg-purple-700 text-white px-4 py-2 rounded-md">Pulmonary System: 30 min</button>
      </div>
    </div>
  );
};

export default StudyPlan;