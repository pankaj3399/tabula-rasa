// client/src/pages/SubtopicContent.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const SubtopicContent = ({ darkMode, setDarkMode }) => {
  const { subtopicId } = useParams();
  const [subtopic, setSubtopic] = useState(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/subtopics/${subtopicId}?populate=*`)
      .then(response => {
        setSubtopic(response.data.data);
        setNotes(response.data.data.attributes.notes || '');
      })
      .catch(error => console.error('Error fetching subtopic:', error));
  }, [subtopicId]);

  const handleNotesChange = e => {
    setNotes(e.target.value);
  };

  const saveNotes = async () => {
    try {
      await axios.put(`http://localhost:1337/api/subtopics/${subtopicId}`, {
        data: { notes },
      });
      alert('Notes saved successfully!');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes.');
    }
  };

  if (!subtopic) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <Link to="/knowledge-map" className="text-blue-600 hover:underline">
            ← Back to Mind Map
          </Link>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md">Hippocampus Hustle</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-800 text-white p-6 rounded-lg">
            <h2 className="text-xl font-bold">{subtopic.attributes.topic?.data.attributes.name}</h2>
            {subtopic.attributes.content && (
              <div
                className="mt-4 prose prose-invert"
                dangerouslySetInnerHTML={{ __html: subtopic.attributes.content }}
              />
            )}
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-lg">
            <h2 className="text-xl font-bold">Notes</h2>
            <div className="mt-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md mb-4">Page 1</button>
              <textarea
                className="w-full h-64 p-3 bg-gray-700 text-white rounded-md"
                value={notes}
                onChange={handleNotesChange}
                placeholder="Enter your notes here..."
              />
              <button
                onClick={saveNotes}
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubtopicContent;