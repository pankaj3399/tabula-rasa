// client/src/components/LoginModal.jsx
import React, { useState } from 'react';
import { Brain, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = ({ closeModal, setShowDashboard }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, error: authError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      closeModal();
      setShowDashboard(true);
    } catch (err) {
      setError(err.message || 'Failed to log in');
      setLoading(false);
    }
  };

  const displayError = error || authError;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <Brain className="h-12 w-12 text-purple-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold dark:text-white">Log In to Tabula Rasa</h3>
          <p className="text-gray-600 dark:text-gray-400">Access your personalized dashboard</p>
        </div>

        {displayError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{displayError}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md text-base"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Password</label>
            <input
              type="password"
              className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md text-base"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;