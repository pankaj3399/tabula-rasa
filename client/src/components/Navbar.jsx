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
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 text-gray-600">Loading...</div>
      </nav>
    );
  }

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/features', label: 'Features' },
    { to: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-2xl font-bold text-purple-800">
          <Book className="mr-2 w-8 h-8" /> Tabula Rasa
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-gray-700 hover:text-purple-600 font-medium transition relative group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {!currentUser ? (
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition flex items-center shadow-md">
                  <LogIn className="mr-2 w-5 h-5" /> Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup" className="border border-purple-600 text-purple-600 px-5 py-2 rounded-lg hover:bg-purple-50 transition flex items-center shadow-md">
                  <UserPlus className="mr-2 w-5 h-5" /> Sign Up
                </Link>
              </motion.div>
            </div>
          ) : (
            <div className="flex space-x-4 items-center">
              <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium transition flex items-center">
                <User className="mr-2 w-5 h-5" /> Dashboard
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition flex items-center shadow-md"
              >
                <LogOut className="mr-2 w-5 h-5" /> Logout
              </motion.button>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-purple-800 focus:outline-none">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-lg overflow-hidden"
        >
          <div className="px-4 py-4 space-y-4">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={toggleMobileMenu}
                className="block py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
              >
                {label}
              </Link>
            ))}
            {!currentUser ? (
              <div className="space-y-4">
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="block py-2 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMobileMenu}
                  className="block py-2 border border-purple-600 text-purple-600 text-center rounded-lg hover:bg-purple-50 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <Link
                  to="/dashboard"
                  onClick={toggleMobileMenu}
                  className="block py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
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