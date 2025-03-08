import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError('Please fill in all fields');
      return;
    }
    try {
      setError('');
      setLoading(true);
      await signup(email, password, name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign up');
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-[#0E0526] text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-800 rounded-full opacity-30 blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-800 rounded-full opacity-20 blur-3xl -ml-20 -mb-20"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#1A103B] border border-indigo-900 shadow-2xl rounded-lg p-8 w-full max-w-md relative z-10"
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 absolute top-0 left-0 right-0 rounded-t-lg"></div>
        
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#6366F1">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Join Tabula Rasa</h2>
          <p className="text-gray-300 text-lg">
            Create your account for PANCE & PANRE preparation
          </p>
        </motion.div>

        {error && (
          <motion.div
            variants={itemVariants}
            className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center"
          >
            <AlertCircle className="mr-2 text-red-400 w-5 h-5" />
            {error}
          </motion.div>
        )}

        <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: 'name', label: 'Full Name', value: name, setValue: setName, Icon: User, placeholder: 'Enter your name' },
            { id: 'email', label: 'Email Address', value: email, setValue: setEmail, Icon: Mail, placeholder: 'Enter your email', type: 'email' },
            { id: 'password', label: 'Password', value: password, setValue: setPassword, Icon: Lock, placeholder: 'Create a password', type: 'password' },
          ].map(({ id, label, value, setValue, Icon, placeholder, type = 'text' }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-gray-300 font-medium mb-2">{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
                <input
                  type={type}
                  id={id}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-4 py-3 bg-[#121520] border border-indigo-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition-all flex items-center justify-center font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing up...' : 'Create Account'}
          </motion.button>
        </motion.form>

        <motion.div variants={itemVariants} className="text-center mt-6 text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
            Login
          </Link>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-8">
          <div className="flex justify-center">
            <div className="bg-purple-800 text-white px-5 py-3 rounded-full text-sm font-medium">
              Special Offer: 3 months free, then $16/month
            </div>
          </div>
          
          <div className="mt-4 text-center text-gray-400 text-sm">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;