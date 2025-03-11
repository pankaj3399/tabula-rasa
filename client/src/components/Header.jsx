// client/src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Search, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ openSignUpModal, openLoginModal, darkMode, setDarkMode }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout(); // This already redirects to '/' via AuthContext
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            <Link to={currentUser ? '/dashboard' : '/'} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Tabula Rasa
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center text-xs sm:text-sm md:text-base lg:text-lg ${
                    location.pathname === '/dashboard' ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }`}
                >
                  <span className="mr-1">🏠</span> Home
                </Link>
                <Link
                  to="/knowledge-map"
                  className={`px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center text-xs sm:text-sm md:text-base lg:text-lg ${
                    location.pathname === '/knowledge-map' ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }`}
                >
                  <span className="mr-1">🌐</span> Knowledge Map
                </Link>
                <Link
                  to="/synaptic-sprint"
                  className="opacity-50 cursor-not-allowed px-3 py-2 text-gray-600 dark:text-gray-300 rounded-md flex items-center text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  <span className="mr-1">⚡</span> Synaptic Sprint Practice
                </Link>
                <Link
                  to="/calendar"
                  className="opacity-50 cursor-not-allowed px-3 py-2 text-gray-600 dark:text-gray-300 rounded-md flex items-center text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  <span className="mr-1">📅</span> Calendar
                </Link>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search topics..."
                    className="pl-8 pr-3 py-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md text-xs sm:text-sm md:text-base"
                  />
                  <Search className="h-4 w-4 text-gray-400 absolute left-2 top-3" />
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {darkMode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </button>
                <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-1" /> Logout
                </button>
                <Link
                  to="/profile"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  My Profile
                </Link>
              </>
            ) : (
              <>
                <button className="hidden md:inline-flex px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">About</button>
                <button className="hidden md:inline-flex px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Features</button>
                <button className="hidden md:inline-flex px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Pricing</button>
                <button
                  onClick={openLoginModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Login
                </button>
                <button
                  onClick={openSignUpModal}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {darkMode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;