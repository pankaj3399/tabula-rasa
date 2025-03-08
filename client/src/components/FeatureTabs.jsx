import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const FeatureTabs = () => {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tools Built for PA Success</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the features designed to help you master the PANCE efficiently and effectively
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 mb-8">
            <button
              className={`text-lg py-3 ${
                activeTab === 'content'
                  ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 border-b-2 border-purple-600 dark:border-purple-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('content')}
            >
              Learn
            </button>
            <button
              className={`text-lg py-3 ${
                activeTab === 'practice'
                  ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 border-b-2 border-purple-600 dark:border-purple-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('practice')}
            >
              Practice
            </button>
            <button
              className={`text-lg py-3 ${
                activeTab === 'tracking'
                  ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 border-b-2 border-purple-600 dark:border-purple-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('tracking')}
            >
              Track
            </button>
          </div>

          {activeTab === 'content' && (
            <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Interactive Knowledge Maps</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Visualize connections between medical concepts with our interactive knowledge maps, organized by organ systems and task areas.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300">Navigate complex topics visually</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300">Connect pathophysiology to clinical presentations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300">Reinforce relationships between diseases</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/50 p-6 rounded-lg">
                  <h4 className="font-bold mb-3 dark:text-white">Featured Content Areas</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="dark:text-white">Cardiology</span>
                        <span className="text-sm bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded-full dark:text-white">16% of PANCE</span>
                      </div>
                      <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2 mt-1">
                        <div className="bg-purple-600 rounded-full h-2 w-4/5"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-xs p-2 bg-white dark:bg-gray-800 rounded border border-purple-200 dark:border-purple-800 dark:text-white">Cardiomyopathies</div>
                        <div className="text-xs p-2 bg-white dark:bg-gray-800 rounded border border-purple-200 dark:border-purple-800 dark:text-white">Valvular Disorders</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center">
                        <span className="dark:text-white">Pulmonology</span>
                        <span className="text-sm bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded-full dark:text-white">12% of PANCE</span>
                      </div>
                      <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2 mt-1">
                        <div className="bg-purple-600 rounded-full h-2 w-3/4"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-xs p-2 bg-white dark:bg-gray-800 rounded border border-purple-200 dark:border-purple-800 dark:text-white">Obstructive Disease</div>
                        <div className="text-xs p-2 bg-white dark:bg-gray-800 rounded border border-purple-200 dark:border-purple-800 dark:text-white">Pulmonary Infections</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Smart Practice Questions</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Our PANCE-style questions adapt to your knowledge gaps and provide detailed explanations to reinforce learning.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300">Questions mirror PANCE style and difficulty</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300">Detailed explanations for all answer choices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300">Ask Alfred for personalized clarification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300">Create custom quizzes by topic or weakness</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border dark:border-gray-700">
                  <div className="bg-white dark:bg-gray-900 p-4 border-b dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium">Cardiology</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">Question 24 of 50</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-800 dark:text-gray-200 mb-4">
                      A 45-year-old male presents with progressive dyspnea on exertion and peripheral edema.
                      Echo shows dilated left ventricle with EF of 30%. Which of the following is the most
                      likely diagnosis?
                    </p>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg border border-purple-500 bg-purple-50 dark:bg-purple-900/30 dark:text-white">
                        Dilated Cardiomyopathy
                      </div>
                      <div className="p-3 rounded-lg border dark:border-gray-700 hover:border-gray-300 dark:text-gray-300">
                        Hypertrophic Cardiomyopathy
                      </div>
                      <div className="p-3 rounded-lg border dark:border-gray-700 hover:border-gray-300 dark:text-gray-300">
                        Restrictive Cardiomyopathy
                      </div>
                      <div className="p-3 rounded-lg border dark:border-gray-700 hover:border-gray-300 dark:text-gray-300">
                        Stress-Induced Cardiomyopathy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Personalized Analytics</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Track your performance across all PANCE blueprint categories to focus your studying on areas that need improvement.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300">Visual dashboard of your performance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300">Identify knowledge gaps automatically</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300">Track improvement over time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300">Recommended study plan based on your data</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border dark:border-gray-700">
                  <h4 className="font-bold mb-3 dark:text-white">Your PANCE Readiness</h4>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="dark:text-gray-300">Overall Readiness</span>
                        <span className="font-medium dark:text-white">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 rounded-full h-2" style={{ width: '78%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="dark:text-gray-300">Cardiology</span>
                        <span className="font-medium dark:text-white">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 rounded-full h-2" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="dark:text-gray-300">Pulmonology</span>
                        <span className="font-medium dark:text-white">72%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 rounded-full h-2" style={{ width: '72%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="dark:text-gray-300">Gastroenterology</span>
                        <span className="font-medium dark:text-white">64%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 rounded-full h-2" style={{ width: '64%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="dark:text-gray-300">Nephrology</span>
                        <span className="font-medium dark:text-white">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-red-500 rounded-full h-2" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureTabs;