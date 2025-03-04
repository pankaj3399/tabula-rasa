// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Book } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Quick Links',
      links: [
        { to: '/', label: 'Home' },
        { to: '/features', label: 'Features' },
        { to: '/pricing', label: 'Pricing' },
        { to: '/support', label: 'Support' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { to: '/blog', label: 'Blog' },
        { to: '/webinars', label: 'Webinars' },
        { to: '/faq', label: 'FAQ' },
        { to: '/terms', label: 'Terms of Service' },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-6 flex items-center">
              <Book className="mr-3 w-8 h-8" /> Tabula Rasa
            </h3>
            <p className="text-purple-100 leading-relaxed">
              Empowering the future of medical education with innovative, personalized learning solutions.
            </p>
          </div>

          {sections.map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold text-xl mb-6 text-purple-200">{title}</h4>
              <ul className="space-y-3">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-purple-100 hover:text-white transition">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-xl mb-6 text-purple-200">Connect With Us</h4>
            <div className="flex space-x-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="text-purple-100 hover:text-white transition">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700/50 mt-12 pt-8 text-center">
          <p className="text-purple-200">&copy; {currentYear} Tabula Rasa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;