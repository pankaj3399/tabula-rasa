import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-purple-600 text-white rounded-xl p-12 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">
          Ready to Elevate Your Medical Learning?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of medical students and professionals 
          who are transforming their education with Tabula Rasa.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            to="/signup"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg 
            hover:bg-purple-100 transition flex items-center"
          >
            <UserPlus className="mr-2" /> Create Your Account
          </Link>
          <Link 
            to="/dashboard"
            className="border border-white text-white px-8 py-4 
            rounded-lg hover:bg-purple-700 transition flex items-center"
          >
            Explore Features
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;