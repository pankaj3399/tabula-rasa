import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="min-h-[80vh] flex items-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full grid md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <h1 className="text-5xl font-bold text-purple-800 mb-6 leading-tight">
            Accelerate Your Medical Learning Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tabula Rasa: Your comprehensive platform for medical education, 
            personalized learning, and professional growth.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              to="/signup"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center"
            >
              <UserCheck className="mr-2" /> Get Started
            </Link>
            <Link 
              to="/login"
              className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-100 transition flex items-center"
            >
              <BookOpen className="mr-2" /> Learn More
            </Link>
          </div>

          <div className="mt-10 flex items-center space-x-6">
            <div className="flex items-center">
              <TrendingUp className="text-green-500 mr-2" />
              <span className="text-gray-700">95% Student Satisfaction</span>
            </div>
          </div>
        </div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="hidden md:block"
        >
          <img 
            src="/api/placeholder/500/400" 
            alt="Medical Education" 
            className="w-full rounded-xl shadow-xl"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;