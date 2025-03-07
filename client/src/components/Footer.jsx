import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 pt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 gap-y-12">
          {/* Logo and Tagline Section */}
          <div className="col-span-1 text-center sm:text-left">
            <div className="flex items-center mb-4 justify-center sm:justify-start">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#9F7AEA"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#9F7AEA"/>
              </svg>
              <h2 className="text-xl font-bold">Tabula Rasa</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Helping PA students master their exams through smart practice and AI-powered learning.
            </p>
          </div>

          {/* Features Section */}
          <div className="col-span-1 text-center sm:text-left">
            <h3 className="font-medium text-lg mb-4">Features</h3>
            <ul className="space-y-3">
              <li><Link to="/knowledge-maps" className="text-gray-400 hover:text-white text-sm">Knowledge Maps</Link></li>
              <li><Link to="/practice-questions" className="text-gray-400 hover:text-white text-sm">Practice Questions</Link></li>
              <li><Link to="/alfred-ai" className="text-gray-400 hover:text-white text-sm">Alfred AI Tutor</Link></li>
              <li><Link to="/progress-tracking" className="text-gray-400 hover:text-white text-sm">Progress Tracking</Link></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="col-span-1 text-center sm:text-left">
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/getting-started" className="text-gray-400 hover:text-white text-sm">Getting Started</Link></li>
              <li><Link to="/free-question-pack" className="text-gray-400 hover:text-white text-sm">Free Question Pack</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white text-sm">Support</Link></li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="col-span-1 text-center sm:text-left">
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Tabula Rasa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;