import React from 'react';
import { Brain, ArrowRight, Check } from 'lucide-react';

const HeroSection = ({ openModal }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Next-Generation <span className="text-purple-600">PANCE & PANRE</span> Preparation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              The smarter approach to PA certification - adaptive learning, AI tutoring, and strategic practice for students and certified PAs alike.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={openModal}
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 rounded-md"
              >
                Start Your 3 Months
              </button>
              <button className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 text-lg px-8 py-6 rounded-md">
                Watch Demo
              </button>
            </div>

            <div className="inline-block bg-purple-100 dark:bg-purple-900 rounded-full px-4 py-2">
              <span className="text-purple-800 dark:text-purple-300 font-medium">
                Special Offer: 3 months free, then $16/month
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full opacity-50"></div>
            <div className="w-full shadow-lg border border-purple-100 dark:border-purple-900 relative z-10 overflow-hidden rounded-lg bg-white dark:bg-gray-800">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Brain className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-bold text-lg dark:text-white">Meet Alfred</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your AI PA Tutor</p>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <p className="text-gray-800 dark:text-gray-200 text-sm">
                    "I'm struggling with the differences between Dilated and Hypertrophic Cardiomyopathy..."
                  </p>
                </div>

                <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 mb-4 overflow-x-auto">
                  <p className="text-gray-800 dark:text-gray-200 text-sm mb-3">
                    <span className="font-bold">Alfred:</span> Let me break down the key differences with this clinical decision-making table:
                  </p>
                  <div className="text-xs">
                    <p className="font-bold text-purple-700 dark:text-purple-300 mb-2">
                      Clinical Decision-Making Table: Differentiating Between Hypertrophic Cardiomyopathy (HCM) and Dilated Cardiomyopathy (DCM)
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-purple-200 dark:bg-purple-800">
                            <th className="border border-purple-300 dark:border-purple-700 px-2 py-1 text-left">Feature</th>
                            <th className="border border-purple-300 dark:border-purple-700 px-2 py-1 text-left">Hypertrophic Cardiomyopathy (HCM)</th>
                            <th className="border border-purple-300 dark:border-purple-700 px-2 py-1 text-left">Dilated Cardiomyopathy (DCM)</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-800 dark:text-gray-200">
                          <tr className="even:bg-purple-50 dark:even:bg-purple-900/30">
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1 font-medium">Pathophysiology</td>
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1">Left ventricular hypertrophy (LVH) not due to pressure overload</td>
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1">Left ventricular dilation with systolic dysfunction</td>
                          </tr>
                          <tr className="odd:bg-white dark:odd:bg-transparent">
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1 font-medium">Etiology</td>
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1">Genetic (autosomal dominant, sarcomere mutations)</td>
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1">Idiopathic, viral myocarditis, ischemia, toxins (alcohol), genetic</td>
                          </tr>
                          <tr className="even:bg-purple-50 dark:even:bg-purple-900/30">
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1 font-medium">Heart Size</td>
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1">Normal or slightly enlarged</td>
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1">Significantly enlarged</td>
                          </tr>
                          <tr className="odd:bg-white dark:odd:bg-transparent">
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1 font-medium">Ejection Fraction (EF)</td>
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1">Preserved or hyperdynamic (>55%)</td>
                            <td className="border border-purple-300 dark:border-purple-700 px-2 py-1">Reduced (&lt;40%)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2">
                  Try Alfred <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;