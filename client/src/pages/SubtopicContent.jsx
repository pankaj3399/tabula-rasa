import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const SubtopicContent = ({ darkMode, setDarkMode }) => {
  const { id } = useParams();
  const [subtopic, setSubtopic] = useState(null);
  const [notes, setNotes] = useState('');
  const [activePage, setActivePage] = useState('Page 1');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch subtopic content from backend
    axios
      .get(`${import.meta.env.VITE_API_URL}/subtopic-content/${id}`)
      .then(response => {
        console.log('Subtopic Content Response:', response.data);
        
        // Handle potential null or undefined response
        if (!response.data || !response.data.data) {
          throw new Error('Invalid response format');
        }
        
        const data = response.data.data.attributes; // Strapi wraps fields in attributes
        setSubtopic({
          id: response.data.data.id,
          title: data.title,
          content: data.content || 'No content available',
          notes: data.notes || '',
          topic: data.topic?.data?.attributes || null, // Access related topic
        });
        setNotes(data.notes || '');
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching subtopic content:', error.response ? error.response.data : error.message);
        setError('Failed to load subtopic content. Please try again later.');
      });
  }, [id]);

  const handleNotesChange = e => {
    setNotes(e.target.value);
  };

  const saveNotes = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/subtopic-content/${id}`, {
        notes,
      });
      alert('Notes saved successfully!');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes.');
    }
  };

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!subtopic) return <div className="text-center py-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <Link to="/knowledge-map" className="text-blue-400 hover:underline">
            ← Back to Mind Map
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Tabula Rasa</span>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Hippocampus Hustle
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{subtopic.topic?.title || 'Topic'}</h2>
            <h3 className="text-lg font-semibold mb-2">{subtopic.title}</h3>
            {/* Placeholder for image - replace with actual image from Strapi if available */}
            <img
              src="https://via.placeholder.com/400x300?text=Heart+Anatomy"
              alt="Heart Anatomy"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-gray-300">
              {subtopic.content || 'Understanding the normal heart structure is crucial for comprehending...'}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Notes</h2>
            <div className="flex justify-between items-center mb-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
                {activePage}
              </button>
              <button className="text-gray-400 border border-gray-600 px-4 py-2 rounded-md">
                Add Page
              </button>
            </div>
            <textarea
              className="w-full h-64 p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={notes}
              onChange={handleNotesChange}
              placeholder="Enter your notes here..."
            />
            <button
              onClick={saveNotes}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md w-full"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubtopicContent;