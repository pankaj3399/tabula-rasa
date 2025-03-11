// client/src/components/TodaysSchedule.jsx
import React from 'react';

const TodaysSchedule = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Today's Schedule</h3>
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">Cardiovascular System Study: 9:00 AM - 10:30 AM (45 min)</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Pulmonary System Study: 11:00 AM - 12:00 PM (30 min)</p>
      </div>
      <button className="mt-2 text-blue-600 hover:underline">View Full Schedule →</button>
    </div>
  );
};

export default TodaysSchedule;