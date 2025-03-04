import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Book, 
  LogIn, 
  UserPlus, 
  LogOut, 
  User, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold text-purple-800">
          <Book className="mr-2" /> Tabula Rasa
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-purple-600 transition"
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className="text-gray-700 hover:text-purple-600 transition"
          >
            Features
          </Link>
          <Link 
            to="/pricing" 
            className="text-gray-700 hover:text-purple-600 transition"
          >
            Pricing
          </Link>

          {/* Authentication Links */}
          {!currentUser ? (
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link 
                  to="/login" 
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center"
                >
                  <LogIn className="mr-2" /> Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link 
                  to="/signup" 
                  className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition flex items-center"
                >
                  <UserPlus className="mr-2" /> Sign Up
                </Link>
              </motion.div>
            </div>
          ) : (
            <div className="flex space-x-4 items-center">
              <Link 
                to="/dashboard" 
                className="flex items-center text-gray-700 hover:text-purple-600"
              >
                <User className="mr-2" /> Dashboard
              </Link>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center"
              >
                <LogOut className="mr-2" /> Logout
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu} 
            className="text-purple-800"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:bg-purple-50"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="block py-2 text-gray-700 hover:bg-purple-50"
              onClick={toggleMobileMenu}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="block py-2 text-gray-700 hover:bg-purple-50"
              onClick={toggleMobileMenu}
            >
              Pricing
            </Link>

            {!currentUser ? (
              <div className="space-y-2">
                <Link 
                  to="/login" 
                  className="block py-2 bg-purple-600 text-white text-center rounded-lg"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block py-2 border border-purple-600 text-purple-600 text-center rounded-lg"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <Link 
                  to="/dashboard" 
                  className="block py-2 text-gray-700 hover:bg-purple-50"
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className="w-full py-2 bg-red-500 text-white rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;