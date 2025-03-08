import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How Tabula Rasa Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our four-step system helps you master the PANCE through effective learning, practice, reinforcement, and test fitness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">Learn</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Study PANCE blueprint-aligned content organized by organ systems and task areas
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">Practice</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Reinforce knowledge with "Hippocampus Hustle" practice questions and track your progress
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">Master</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get personalized explanations from Alfred, your AI tutor, to fill knowledge gaps
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">4</span>
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">Build Test Fitness</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Train your brain for test-day performance with timed "Synaptic Sprint" sessions that build confidence and stamina
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;