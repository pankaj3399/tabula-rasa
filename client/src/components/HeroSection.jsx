// src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Stethoscope, Brain, ChevronRight, TrendingUp, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Gradient Orbs */}
    <div className="absolute w-screen h-screen">
      <div className="absolute w-80 h-80 -top-40 -left-40 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute w-80 h-80 top-1/4 right-1/3 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute w-80 h-80 -bottom-40 -right-40 bg-blue-500/20 rounded-full blur-3xl"></div>
    </div>

    {/* Subtle Grid Overlay */}
    <div
      className="absolute inset-0 opacity-50"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
  </div>
);

const FeatureBadge = ({ icon: Icon, text, color }) => (
  <div
    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium 
      bg-${color}-500/10 text-${color}-600 border border-${color}-500/20 
      shadow-md hover:shadow-lg hover:bg-${color}-500/20 transition-all duration-300`}
  >
    <Icon className="w-5 h-5 mr-2" />
    {text}
  </div>
);

const HeroSection = () => {
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
    <div className="relative flex justify-center items-center min-h-[85vh] bg-gradient-to-br from-purple-50 via-white to-indigo-50 text-gray-900 overflow-hidden">
      <BackgroundEffect />

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative container mx-auto px-6 py-20 md:py-32 text-center"
      >
        {/* Central Icon */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <Stethoscope className="w-16 h-16 text-purple-600" />
        </motion.div>

        {/* Feature Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <FeatureBadge icon={BookOpen} text="Comprehensive Learning" color="purple" />
          <FeatureBadge icon={Brain} text="Adaptive Quizzes" color="indigo" />
          <FeatureBadge icon={Stethoscope} text="Clinical Insights" color="blue" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          <span className="block">Empower Your</span>
          <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
            Medical Future
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Tabula Rasa: Master medical knowledge with cutting-edge tools and personalized learning paths.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-center gap-6"
        >
          <Link
            to="/signup"
            className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center font-semibold"
          >
            Get Started
            <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/features"
            className="bg-white border border-purple-300 text-purple-600 px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:bg-purple-50 transition-all duration-300 flex items-center justify-center font-semibold"
          >
            Explore Features
            <BookOpen className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>

        {/* Stats or Trust Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center items-center space-x-6 text-gray-700"
        >
          <span className="flex items-center">
            <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
            95% Student Success
          </span>
          <span className="flex items-center">
            <UserCheck className="w-6 h-6 text-blue-500 mr-2" />
            10K+ Active Learners
          </span>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HeroSection;