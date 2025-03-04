import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  PieChart, 
  Target, 
  Shield 
} from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Content",
      description: "Extensive medical study materials across multiple specialties.",
      color: "text-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Detailed analytics to monitor your learning progress.",
      color: "text-green-500"
    },
    {
      icon: Clock,
      title: "Adaptive Learning",
      description: "Personalized study plans tailored to your pace.",
      color: "text-purple-500"
    },
    {
      icon: PieChart,
      title: "Detailed Insights",
      description: "Deep dive into your learning metrics and performance.",
      color: "text-red-500"
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set and track your medical education milestones.",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and progress are always protected.",
      color: "text-indigo-500"
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-purple-800 mb-4">
          Features That Empower Your Learning
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover how Tabula Rasa transforms your medical education experience 
          with cutting-edge learning tools and personalized insights.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <div className="flex justify-center mb-4">
              <feature.icon 
                className={`w-12 h-12 ${feature.color}`} 
              />
            </div>
            <h3 className="text-xl font-semibold text-purple-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;