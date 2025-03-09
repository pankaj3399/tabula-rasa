import React, { useState } from 'react';
import { Brain, X, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignUpModal = ({ closeModal, setShowDashboard }) => {
  const [programSearch, setProgramSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    program: '',
    stage: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, error: authError } = useAuth();

  const paPrograms = [
    'Duke University PA Program',
    'University of Iowa PA Program',
    'Yale University PA Program',
    'Stanford University PA Program',
    'Johns Hopkins PA Program',
    'Emory University PA Program',
    'Mayo Clinic PA Program',
    'Baylor College of Medicine PA Program',
    'George Washington University PA Program',
    'University of Texas PA Program',
    'University of Colorado PA Program',
    'University of Washington PA Program',
    'University of Wisconsin PA Program',
    'University of Florida PA Program',
    'Other (please specify)',
  ];

  const filteredPrograms = paPrograms.filter(program =>
    program.toLowerCase().includes(programSearch.toLowerCase())
  );

  const handleSelectProgram = program => {
    setSelectedProgram(program);
    setProgramSearch(program);
    setShowResults(false);
    setFormData({ ...formData, program });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.program || !formData.stage) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signup(formData.email, formData.password, formData.name);
      closeModal();
      setShowDashboard(true);
    } catch (err) {
      setError(err.message || 'Failed to sign up');
      setLoading(false);
    }
  };

  const displayError = error || authError;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* The main change: Added max-h-[90vh] and overflow-y-auto to make the modal scrollable */}
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <Brain className="h-12 w-12 text-purple-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold dark:text-white">Join Tabula Rasa Beta</h3>
          <p className="text-gray-600 dark:text-gray-400">Start your journey to PANCE success</p>
        </div>

        {displayError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{displayError}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md text-base"
              placeholder="Your name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md text-base"
              placeholder="your@email.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Password</label>
            <input
              type="password"
              className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md text-base"
              placeholder="Your password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">PA Program</label>
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2 pl-8 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md text-base"
                  placeholder="Search for your PA program..."
                  value={programSearch}
                  onChange={e => {
                    setProgramSearch(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-2 top-3" />
              </div>
              {showResults && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredPrograms.length > 0 ? (
                    filteredPrograms.map((program, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
                        onClick={() => handleSelectProgram(program)}
                      >
                        {program}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500 dark:text-gray-400">No matching programs found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Current Stage</label>
            <select
              className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md text-base"
              value={formData.stage}
              onChange={e => setFormData({ ...formData, stage: e.target.value })}
              required
            >
              <option value="">Select your current stage</option>
              <option>1st Year PA Student</option>
              <option>2nd Year PA Student</option>
              <option>Preparing for PANCE</option>
              <option>Recertifying (PANRE)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Start 3 Months Free'}
          </button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;