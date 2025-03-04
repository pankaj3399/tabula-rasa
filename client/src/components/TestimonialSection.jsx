import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "Tabula Rasa completely transformed my medical study approach. The personalized learning paths are game-changing!",
      name: "Dr. Emily Roberts",
      specialty: "Cardiology Resident"
    },
    {
      quote: "The performance tracking features helped me identify my weak areas and improve my overall understanding.",
      name: "Michael Chen",
      specialty: "Medical Student"
    },
    {
      quote: "An incredible platform that combines technology with medical education. Highly recommended for serious learners!",
      name: "Sarah Thompson",
      specialty: "Pediatrics Trainee"
    }
  ];

  return (
    <section className="py-16 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-purple-800 mb-4">
          What Our Students Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear from medical professionals who have accelerated their learning 
          with Tabula Rasa.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-8">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-purple-50 p-6 rounded-xl relative"
          >
            <Quote className="absolute top-4 left-4 text-purple-300 w-10 h-10" />
            <p className="text-gray-700 italic mb-6">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center">
              <div>
                <h4 className="font-semibold text-purple-800">
                  {testimonial.name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {testimonial.specialty}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;