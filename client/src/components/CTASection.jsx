import React from 'react';

const CTASection = ({ openModal }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your PANCE/PANRE Prep?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join the Tabula Rasa beta program today and get a head start on your exam preparation.
        </p>
        <div className="flex justify-center">
          <button
            onClick={openModal}
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-md"
          >
            Start Your 3 Months
          </button>
        </div>
        <p className="mt-6 text-purple-200">
          Special offer: First 3 months free, then $16/month -- No credit card required to start
        </p>
      </div>
    </section>
  );
};

export default CTASection;