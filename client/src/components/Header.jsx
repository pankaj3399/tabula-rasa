// client/src/components/Header.jsx
import React from 'react';
import { Brain, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ openSignUpModal, openLoginModal, darkMode, setDarkMode, toggleDashboard, showDashboard, setShowDashboard }) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setShowDashboard(false);
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 sticky top-0 z-20 transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tabula Rasa</h1>
            <span className="text-sm text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded-full">PA Exam Prep</span>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <button
                  onClick={toggleDashboard}
                  className={`px-4 py-2 rounded-md ${
                    showDashboard
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Dashboard
                </button>
                <button className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
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
              </>
            )}
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;