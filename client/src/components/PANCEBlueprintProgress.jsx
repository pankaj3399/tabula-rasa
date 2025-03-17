// PANCEBlueprintProgress.jsx
import React from 'react';

const PANCEBlueprintProgress = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">PANCE Blueprint Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cardiovascular System Card */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center mb-2">
            <svg className="w-4 h-4 text-red-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-gray-500 text-sm">Cardiovascular System</span>
            <span className="ml-auto text-sm">11%</span>
          </div>
          
          <div className="mb-4">
            <div className="text-gray-500 flex justify-between mb-1 text-xs">
              <span>Overall completion</span>
              <span>54%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '54%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-gray-500 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span>Cardiomyopathy</span>
              </div>
              <span>45%</span>
            </div>
            
            <div className="flex justify-between text-gray-500 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span>Coronary Artery Disease</span>
              </div>
              <span>65%</span>
            </div>
            
            <div className="flex justify-between text-gray-500 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span>Heart Failure</span>
              </div>
              <span>40%</span>
            </div>
          </div>
        </div>
        
        {/* Pulmonary System Card */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center mb-2">
            <svg className="w-4 h-4 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.35 3.35l-2.79 2.79c-.32.32-.1.86.35.86H12v5c0 .55.45 1 1 1s1-.45 1-1V7h2.09c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01z" />
              <path d="M16.59 12.67l-2.79 2.79c-.32.32-.1.86.35.86H16v5c0 .55.45 1 1 1s1-.45 1-1v-5h2.09c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01z" />
              <path d="M8.41 12.67l-2.79 2.79c-.32.32-.1.86.35.86H8v5c0 .55.45 1 1 1s1-.45 1-1v-5h2.09c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01z" />
            </svg>
            <span className="text-gray-500 text-sm">Pulmonary System</span>
            <span className="ml-auto text-sm">9%</span>
          </div>
          
          <div className="mb-4">
            <div className="text-gray-500 flex justify-between mb-1 text-xs">
              <span>Overall completion</span>
              <span>32%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-gray-500 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>Infectious disorders</span>
              </div>
              <span>15%</span>
            </div>
            
            <div className="flex justify-between text-gray-500 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>Obstructive pulmonary diseases</span>
              </div>
              <span>55%</span>
            </div>
            
            <div className="flex justify-between text-gray-500 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>Pulmonary circulation</span>
              </div>
              <span>25%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <a href="#" className="text-purple-500 hover:text-purple-700 text-sm">View All Systems →</a>
      </div>
    </div>
  );
};

export default PANCEBlueprintProgress;