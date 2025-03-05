// src/components/FeatureSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Clock, PieChart, Target, Shield } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    { icon: BookOpen, title: "Comprehensive Content", description: "Access extensive medical study materials across all specialties.", color: "text-blue-500" },
    { icon: TrendingUp, title: "Performance Tracking", description: "Monitor your progress with detailed analytics.", color: "text-green-500" },
    { icon: Clock, title: "Adaptive Learning", description: "Personalized study plans tailored to your pace.", color: "text-purple-500" },
    { icon: PieChart, title: "Detailed Insights", description: "Analyze your learning metrics in depth.", color: "text-red-500" },
    { icon: Target, title: "Goal Setting", description: "Set and achieve your educational milestones.", color: "text-yellow-500" },
    { icon: Shield, title: "Secure Platform", description: "Your data stays safe and protected.", color: "text-indigo-500" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-purple-800 mb-4 tracking-tight">
          Tools for Medical Mastery
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Elevate your learning with Tabula Rasa’s innovative features designed for medical success.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 px-6 md:px-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center border border-purple-100"
          >
            <div className="flex justify-center mb-6">
              <feature.icon className={`w-14 h-14 ${feature.color}`} />
            </div>
            <h3 className="text-2xl font-semibold text-purple-800 mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-lg">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;