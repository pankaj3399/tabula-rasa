// src/pages/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-purple-100"
      >
        <h1 className="text-4xl font-bold text-purple-800 mb-6 flex items-center">
          <User className="mr-3 w-8 h-8" /> Welcome, {currentUser?.name || 'User'}!
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Your personalized medical learning dashboard.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-purple-50 p-6 rounded-xl shadow-md"
          >
            <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-2xl font-semibold text-purple-800 mb-2">Learning Paths</h2>
            <p className="text-gray-600">Continue your studies with tailored content.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-purple-50 p-6 rounded-xl shadow-md"
          >
            <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
            <h2 className="text-2xl font-semibold text-purple-800 mb-2">Progress</h2>
            <p className="text-gray-600">Track your performance and milestones.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;