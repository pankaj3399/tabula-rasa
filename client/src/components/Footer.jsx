import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Book 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-purple-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Book className="mr-2" /> Tabula Rasa
            </h3>
            <p className="text-purple-200">
              Revolutionizing medical education through personalized, 
              technology-driven learning experiences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-purple-200">Home</Link></li>
              <li><Link to="/features" className="hover:text-purple-200">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-purple-200">Pricing</Link></li>
              <li><Link to="/support" className="hover:text-purple-200">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="hover:text-purple-200">Blog</Link></li>
              <li><Link to="/webinars" className="hover:text-purple-200">Webinars</Link></li>
              <li><Link to="/faq" className="hover:text-purple-200">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-purple-200">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-200"><Facebook /></a>
              <a href="#" className="hover:text-purple-200"><Twitter /></a>
              <a href="#" className="hover:text-purple-200"><Instagram /></a>
              <a href="#" className="hover:text-purple-200"><Linkedin /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 pt-6 text-center">
          <p>&copy; {currentYear} Tabula Rasa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;