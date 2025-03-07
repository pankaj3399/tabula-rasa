import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Dumbbell, MessagesSquare, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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

  const steps = [
    {
      number: "1",
      title: "Learn",
      description: "Study PANCE blueprint-aligned content organized by organ systems and task areas",
      icon: <BookOpen className="w-8 h-8 text-white" />,
    },
    {
      number: "2",
      title: "Practice",
      description: "Reinforce knowledge with \"Hippocampus Hustle\" practice questions and track your progress",
      icon: <Dumbbell className="w-8 h-8 text-white" />,
    },
    {
      number: "3",
      title: "Master",
      description: "Get personalized explanations from Alfred, your AI tutor, to fill knowledge gaps",
      icon: <MessagesSquare className="w-8 h-8 text-white" />,
    },
    {
      number: "4",
      title: "Build Test Fitness",
      description: "Train your brain for test-day performance with timed \"Synaptic Sprint\" sessions that build confidence and stamina",
      icon: <Timer className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <div className="relative w-full bg-[#0A0B18] text-white py-16 px-4 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How Tabula Rasa Works</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our four-step system helps you master the PANCE through effective learning, practice, 
            reinforcement, and test fitness
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-purple-700 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold">{step.number}</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              
              <div className="mb-4">
                {step.icon}
              </div>
              
              <p className="text-gray-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer CTA */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-20 border-t border-gray-800 pt-8"
      >

      </motion.div>
    </div>
  );
};

export default HowItWorks;