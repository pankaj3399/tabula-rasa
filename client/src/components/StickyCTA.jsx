import React from 'react';

const StickyCTA = ({ openModal }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg py-3 px-4 z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-3 sm:mb-0">
          <p className="font-bold text-gray-900 dark:text-white">Transform your PANCE prep today</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Special offer: 3 months free, then $16/month</p>
        </div>
        <button
          onClick={openModal}
          className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto px-4 py-2 rounded-md"
        >
          Start Your 3 Months
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;