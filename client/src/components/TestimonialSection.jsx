// src/components/TestimonialSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "Tabula Rasa transformed my study approach with its personalized learning paths!",
      name: "Dr. Emily Roberts",
      specialty: "Cardiology Resident",
      rating: 5,
    },
    {
      quote: "The performance tracking helped me pinpoint and improve my weak areas.",
      name: "Michael Chen",
      specialty: "Medical Student",
      rating: 4,
    },
    {
      quote: "A must-have platform for serious medical learners—technology meets education!",
      name: "Sarah Thompson",
      specialty: "Pediatrics Trainee",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-purple-800 mb-4 tracking-tight">
          Voices of Success
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how Tabula Rasa empowers medical professionals and students worldwide.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 px-6 md:px-12">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-8 rounded-2xl shadow-lg relative border border-purple-100"
          >
            <Quote className="absolute top-4 left-4 text-purple-200 w-12 h-12 opacity-50" />
            <p className="text-gray-700 italic text-lg mb-6 mt-6">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-purple-800 text-xl">
                  {testimonial.name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {testimonial.specialty}
                </p>
              </div>
              <div className="flex">
                {Array(testimonial.rating).fill().map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;