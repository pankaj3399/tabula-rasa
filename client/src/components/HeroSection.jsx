import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener to detect when page has been scrolled
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // You may want to adjust this threshold based on your hero section height
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative w-full bg-[#0E0526] text-white overflow-hidden">
      {/* Purple gradient circle in top right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-800 rounded-full opacity-30 blur-3xl -mr-20 -mt-20"></div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-16">
        {/* Left Column - Main Content */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center px-4 sm:px-6 lg:pl-16"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight text-center lg:text-left"
          >
            <span className="text-white">Next-Generation </span>
            <span className="text-indigo-400">PANCE & PANRE </span>
            <span className="text-white">Preparation</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            The smarter approach to PA certification - adaptive learning, AI tutoring, and strategic practice for students and certified PAs alike.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-8 w-full justify-center lg:justify-start"
          >
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-lg transition-colors font-medium text-lg text-center"
            >
              Start Your 3 Months
            </Link>
            <Link
              to="/demo"
              className="w-full sm:w-auto bg-[#1A103B] hover:bg-[#251550] text-white px-8 py-4 rounded-lg border border-indigo-800 transition-colors font-medium text-lg text-center"
            >
              Watch Demo
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-start"
          >
            <div className="bg-purple-800 text-white px-5 py-3 rounded-full text-sm font-medium">
              Special Offer: 3 months free, then $16/month
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 text-center lg:text-left"
          >
            <h2 className="text-2xl font-bold mb-4">Transform your PANCE prep today</h2>
            <p className="text-gray-300">Special offer: 3 months free, then $16/month</p>
          </motion.div>
        </motion.section>

        {/* Right Column - AI Tutor Card */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center px-4 sm:px-6 lg:pr-16"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-[#1A103B] border border-indigo-900 rounded-lg shadow-xl w-full overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2"></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-4 mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#6366F1">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold">Meet Alfred</h3>
                  <p className="text-gray-400">Your AI PA Tutor</p>
                </div>
              </div>

              {/* User Message */}
              <div className="bg-[#121520] rounded-lg p-4 mb-4">
                <p className="text-gray-300">
                  "I'm struggling with the differences between Dilated and Hypertrophic Cardiomyopathy..."
                </p>
              </div>

              {/* AI Response */}
              <div className="bg-purple-700 rounded-lg p-4 mb-4">
                <p className="font-bold mb-2">Alfred: Let me break down the key differences with this clinical decision-making table:</p>
                
                <p className="font-medium mb-2 text-sm sm:text-base">Clinical Decision-Making Table: Differentiating Between Hypertrophic Cardiomyopathy (HCM) and Dilated Cardiomyopathy (DCM)</p>
                
                {/* Table - Updated with all rows from the image */}
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-purple-800 text-white">
                        <th className="p-2 text-left">Feature</th>
                        <th className="p-2 text-left">Hypertrophic Cardiomyopathy (HCM)</th>
                        <th className="p-2 text-left">Dilated Cardiomyopathy (DCM)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-purple-600">
                        <td className="p-2 font-medium">Pathophysiology</td>
                        <td className="p-2">Left ventricular hypertrophy (LVH) not due to pressure overload</td>
                        <td className="p-2">Left ventricular dilation with systolic dysfunction</td>
                      </tr>
                      <tr className="border-t border-purple-600">
                        <td className="p-2 font-medium">Etiology</td>
                        <td className="p-2">Genetic (autosomal dominant, sarcomere mutations)</td>
                        <td className="p-2">Idiopathic, viral myocarditis, ischemia, toxins (alcohol), genetic</td>
                      </tr>
                      <tr className="border-t border-purple-600">
                        <td className="p-2 font-medium">Heart Size</td>
                        <td className="p-2">Normal or slightly enlarged</td>
                        <td className="p-2">Significantly enlarged</td>
                      </tr>
                      <tr className="border-t border-purple-600">
                        <td className="p-2 font-medium">Ejection Fraction (EF)</td>
                        <td className="p-2">Preserved or hyperdynamic (55%)</td>
                        <td className="p-2">Reduced (40%)</td>
                      </tr>
                      <tr className="border-t border-purple-600">
                        <td className="p-2 font-medium">Key Symptoms</td>
                        <td className="p-2">Syncope, dyspnea, chest pain, palpitations, sudden death risk</td>
                        <td className="p-2">Fatigue, dyspnea, orthopnea, peripheral edema</td>
                      </tr>
                      <tr className="border-t border-purple-600">
                        <td className="p-2 font-medium">Echocardiography</td>
                        <td className="p-2">Asymmetric septal hypertrophy, LV outflow obstruction</td>
                        <td className="p-2">Dilated LV, reduced EF, global hypokinesis</td>
                      </tr>
                      <tr className="border-t border-purple-600">
                        <td className="p-2 font-medium">Management</td>
                        <td className="p-2">Beta-blockers, calcium channel blockers, implantable cardioverter-defibrillator (ICD) in high-risk patients</td>
                        <td className="p-2">ACE inhibitors, beta-blockers, diuretics, possible ICD, heart transplant in severe cases</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Try Alfred Button */}
              <Link to="/try-alfred" className="bg-indigo-500 hover:bg-indigo-600 text-white w-full py-3 rounded-lg flex items-center justify-center transition-colors">
                Try Alfred <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* Bottom CTA banner with fixed position when scrolled */}
      {/* Using position fixed when scrolled, otherwise relative positioning */}
      <div 
        className={`w-full bg-[#0a0318] py-6 px-4 sm:px-6 left-0 right-0 z-50 ${
          isScrolled ? 'fixed bottom-0' : 'relative'
        }`}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold">Transform your PANCE prep today</h2>
            <p className="text-gray-300">Special offer: 3 months free, then $16/month</p>
          </div>
          <Link
            to="/signup"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg transition-colors font-medium text-base md:text-lg w-full md:w-auto text-center"
          >
            Start Your 3 Months
          </Link>
        </div>
      </div>
      
      {/* Spacer div to prevent content from jumping when CTA becomes fixed */}
      {isScrolled && <div className="h-24"></div>}
    </div>
  );
};

export default HeroSection;