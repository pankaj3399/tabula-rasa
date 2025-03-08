import React from 'react';
import { Brain, ArrowRight, CheckCircle } from 'lucide-react';

const BetaFeature = ({ openModal }) => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Coming Soon (In Beta Testing)</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get early access to our innovative AI tutor feature currently in beta testing.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow max-w-2xl">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white text-center">Alfred AI Tutor</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                Get personalized explanations for complex topics and instant answers to your medical questions. Alfred uses advanced AI to provide clinical decision support and learning assistance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-600 dark:text-purple-300 mb-3">Learning Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm dark:text-gray-300">Instant topic explanations with detailed clinical tables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm dark:text-gray-300">Personalized learning paths based on your needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm dark:text-gray-300">Question-driven learning with detailed explanations</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-600 dark:text-purple-300 mb-3">Clinical Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm dark:text-gray-300">Differential diagnosis assistance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm dark:text-gray-300">Treatment guidelines and clinical pearls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm dark:text-gray-300">Medical visualization and concept mapping</span>
                    </li>
                  </ul>
                </div>
              </div>
              <button
                className="mt-8 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md inline-flex items-center gap-2"
                onClick={openModal}
              >
                Join Beta Waiting List <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaFeature;