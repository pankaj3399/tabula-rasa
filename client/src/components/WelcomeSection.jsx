// client/src/components/WelcomeSection.jsx
import React from 'react';

const WelcomeSection = () => {
  return (
    <div className="bg-purple-600 text-white p-3 rounded-lg shadow-md">
      <h2 className="text-sm sm:text-base font-semibold">Welcome back, Student!</h2>
      <p className="text-xs sm:text-sm mt-1">Tuesday, March 11 • Ready to continue your medical journey?</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
        <div className="text-center">
          <p className="text-xs">Study Time</p>
          <p className="text-sm font-medium">2.5 hours</p>
        </div>
        <div className="text-center">
          <p className="text-xs">Topics</p>
          <p className="text-sm font-medium">12 covered</p>
        </div>
        <div className="text-center">
          <p className="text-xs">Mastery</p>
          <p className="text-sm font-medium">85% score</p>
        </div>
        <div className="text-center">
          <p className="text-xs">Streak</p>
          <p className="text-sm font-medium">5 days</p>
        </div>
      </div>
      <button className="mt-2 bg-white text-purple-600 px-2 py-1 rounded text-xs sm:text-sm">Weekly Goals</button>
    </div>
  );
};

export default WelcomeSection;