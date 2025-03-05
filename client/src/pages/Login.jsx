// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

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
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log in');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-purple-100 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-purple-800 flex items-center justify-center">
            <LogIn className="mr-3 w-8 h-8" /> Login
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Welcome Back to Tabula Rasa
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center shadow-sm"
          >
            <AlertCircle className="mr-2 text-red-500 w-5 h-5" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: 'email', label: 'Email Address', value: email, setValue: setEmail, Icon: Mail, placeholder: 'Enter your email', type: 'email' },
            { id: 'password', label: 'Password', value: password, setValue: setPassword, Icon: Lock, placeholder: 'Enter your password', type: 'password' },
          ].map(({ id, label, value, setValue, Icon, placeholder, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-gray-700 font-medium mb-2">{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={type}
                  id={id}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/50 transition-all shadow-sm"
                  required
                />
              </div>
            </div>
          ))}

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-800 font-medium transition"
            >
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center font-semibold shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-medium transition">
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;