// src/components/CTASection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white overflow-hidden relative">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 top-0 left-0 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 bottom-0 right-0 bg-indigo-500/30 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative container mx-auto px-6 py-16 text-center rounded-2xl shadow-2xl z-10"
      >
        <h2 className="text-5xl font-bold mb-6 tracking-tight">
          Elevate Your Medical Journey
        </h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
          Join a global community of medical learners unlocking their potential with Tabula Rasa.
        </p>

        <div className="flex justify-center space-x-6">
          <Link
            to="/signup"
            className="group bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-purple-100 transition-all flex items-center font-semibold shadow-lg hover:shadow-xl"
          >
            <UserPlus className="mr-2 w-6 h-6" /> Create Your Account
            <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/dashboard"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center font-semibold shadow-md"
          >
            Explore Features
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;