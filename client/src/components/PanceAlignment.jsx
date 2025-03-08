import React from 'react';
import { Bookmark, ListChecks, Target, LightbulbIcon } from 'lucide-react';

const PanceAlignment = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Built Around the PANCE Blueprint</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Every aspect of Tabula Rasa is designed to align with the official NCCPA exam blueprint
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <Bookmark className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold mb-2 dark:text-white">Organ Systems</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Content organized by all 13 organ systems on the PANCE
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <ListChecks className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold mb-2 dark:text-white">Task Areas</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Covers all task areas from assessment to health maintenance
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <Target className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold mb-2 dark:text-white">Weighted Content</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Question distribution matches PANCE percentages
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <LightbulbIcon className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold mb-2 dark:text-white">High-Yield Focus</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Emphasis on frequently tested concepts
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanceAlignment;