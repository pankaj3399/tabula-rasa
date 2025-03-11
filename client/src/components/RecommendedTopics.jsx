import React from 'react';

const RecommendedTopics = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Recommended Topics</h2>
      
      <div className="border-t-2 border-red-500 pt-2">
        <div className="border rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Valvular Heart Disease</span>
            </div>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm ml-7">Cardiovascular System • High-yield</p>
        </div>
      </div>
      
      <div className="border-t-2 border-blue-500 pt-2">
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.35 3.35l-2.79 2.79c-.32.32-.1.86.35.86H12v5c0 .55.45 1 1 1s1-.45 1-1V7h2.09c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01z" />
                <path d="M16.59 12.67l-2.79 2.79c-.32.32-.1.86.35.86H16v5c0 .55.45 1 1 1s1-.45 1-1v-5h2.09c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01z" />
                <path d="M8.41 12.67l-2.79 2.79c-.32.32-.1.86.35.86H8v5c0 .55.45 1 1 1s1-.45 1-1v-5h2.09c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01z" />
              </svg>
              <span>Pulmonary Neoplasms</span>
            </div>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm ml-7">Pulmonary System • Frequently tested</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedTopics;