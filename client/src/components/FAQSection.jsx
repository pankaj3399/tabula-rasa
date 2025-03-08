import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const faqItems = [
    {
      question: 'Is Tabula Rasa suitable for both first-time PANCE and PANRE takers?',
      answer:
        'Yes! Our content is designed for both first-time PA students preparing for PANCE and practicing PAs preparing for recertification. The system adapts to your specific needs based on your profile settings.',
    },
    {
      question: 'How much does Tabula Rasa cost?',
      answer:
        'During our introductory launch period, we offer 3 months free, then $16/month thereafter. This allows you to fully experience the platform before committing.',
    },
    {
      question: 'Can I use Tabula Rasa on mobile devices?',
      answer:
        'Absolutely! Tabula Rasa is fully responsive and works on desktop, tablet, and mobile devices, allowing you to study wherever and whenever works best for you.',
    },
  ];

  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get answers to common questions about Tabula Rasa
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-medium dark:text-white">{item.question}</span>
                {activeAccordion === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              <div
                className={`p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700 accordion-content ${
                  activeAccordion === index ? 'active' : ''
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;