// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, LogIn, UserPlus, LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const auth = useAuth();
  const { currentUser, logout, loading } = auth || { currentUser: null, logout: () => {}, loading: true };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  if (loading) {
    return (
      <nav className="bg-[#0E0526] text-white">
        <div className="container mx-auto px-4 py-4">Loading...</div>
      </nav>
    );
  }

  const navItems = [
    { to: '/about', label: 'About' },
    { to: '/features', label: 'Features' },
    { to: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className="bg-[#0E0526] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-xl sm:text-2xl font-bold text-white">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 mr-2" viewBox="0 0 24 24" fill="#6366F1">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
            Tabula Rasa
          </Link>
          <div className="ml-2 sm:ml-4 bg-[#6C2BD9] px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium">
            PA Exam Prep
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-white hover:text-indigo-300 font-medium transition"
            >
              {label}
            </Link>
          ))}

          {!currentUser ? (
            <div className="flex space-x-4">
              <Link to="/login" className="border border-white text-white px-5 py-2 rounded-lg hover:bg-white hover:text-[#0E0526] transition flex items-center">
                <LogIn className="mr-2 w-4 h-4" />
                Login
              </Link>
              <Link to="/signup" className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition flex items-center">
                <UserPlus className="mr-2 w-4 h-4" />
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex space-x-4 items-center">
              <Link to="/dashboard" className="text-white hover:text-indigo-300 font-medium transition flex items-center">
                <User className="mr-2 w-5 h-5" /> Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition flex items-center"
              >
                <LogOut className="mr-2 w-5 h-5" /> Logout
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#1A103B] overflow-hidden"
        >
          <div className="px-4 py-6 space-y-6">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={toggleMobileMenu}
                className="block py-2 text-white hover:text-indigo-300 transition text-center"
              >
                {label}
              </Link>
            ))}
            {!currentUser ? (
              <div className="space-y-4 mt-6">
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center w-full py-3 border border-white text-white text-center rounded-lg hover:bg-white hover:text-[#0E0526] transition"
                >
                  <LogIn className="mr-2 w-5 h-5" /> Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center w-full py-3 bg-indigo-500 text-white text-center rounded-lg hover:bg-indigo-600 transition"
                >
                  <UserPlus className="mr-2 w-5 h-5" /> Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-4 mt-6">
                <Link
                  to="/dashboard"
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center w-full py-3 border border-white text-white text-center rounded-lg hover:bg-white hover:text-[#0E0526] transition"
                >
                  <User className="mr-2 w-5 h-5" /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className="flex items-center justify-center w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut className="mr-2 w-5 h-5" /> Logout
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;