import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import TestimonialSection from '../components/TestimonialSection';
import CTASection from '../components/CTASection';
import HowItWorks from '../components/HowItWorks';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto px-4">
        <HeroSection />
        <HowItWorks />
        <FeatureSection />
        <TestimonialSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Home;