import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SubtopicContent = ({ darkMode, setDarkMode }) => {
  const { slug } = useParams(); // Use slug instead of id
  const { currentUser } = useAuth();
  const [topic, setTopic] = useState(null);
  const [notes, setNotes] = useState('');
  const [activePage, setActivePage] = useState('Page 1');
  const [error, setError] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    // Fetch topic content by slug
    axios
      .get(`${import.meta.env.VITE_API_URL}/topic-content/${slug}`)
      .then(response => {
        console.log('Topic Content Response:', response.data);
        if (!response.data.data || response.data.data.length === 0) {
          throw new Error('Topic not found');
        }
        const topicData = response.data.data[0];
        setTopic({
          id: topicData.id,
          title: topicData.attributes.title,
          introduction: topicData.attributes.introduction,
          types: topicData.attributes.types || [],
          diagnosis: topicData.attributes.diagnosis,
          highYieldPoints: topicData.attributes.highYieldPoints,
        });
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching topic content:', error.response ? error.response.data : error.message);
        setError('Failed to load topic content. Please try again later.');
      });

    // Fetch user notes
    if (currentUser) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/subtopic-notes`, {
          params: { userId: currentUser.id, subtopicId: slug },
        })
        .then(response => {
          setNotes(response.data.notes || '');
        })
        .catch(error => {
          console.error('Error fetching notes:', error);
        });
    }
  }, [slug, currentUser]);

  const handleNotesChange = value => {
    setNotes(value);
  };

  const saveNotes = async () => {
    if (!currentUser) {
      alert('Please log in to save notes.');
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/update-subtopic-notes`, {
        userId: currentUser.id,
        subtopicId: slug,
        notes,
      });
      alert('Notes saved successfully!');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes.');
    }
  };

  const scrollToSection = section => {
    sectionRefs.current[section]?.scrollIntoView({ behavior: 'smooth' });
  };

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!topic) return <div className="text-center py-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex">
        {/* Sticky Table of Contents */}
        <div className="w-1/4 pr-6 sticky top-20 self-start">
          <h2 className="text-lg font-bold mb-4">Jump To:</h2>
          <ul className="space-y-2">
            {topic.introduction && (
              <li>
                <button
                  onClick={() => scrollToSection('introduction')}
                  className="text-blue-400 hover:underline"
                >
                  Introduction
                </button>
              </li>
            )}
            {topic.types.length > 0 && (
              <li>
                <button
                  onClick={() => scrollToSection('types')}
                  className="text-blue-400 hover:underline"
                >
                  Types of Cardiomyopathies
                </button>
              </li>
            )}
            {topic.diagnosis && (
              <li>
                <button
                  onClick={() => scrollToSection('diagnosis')}
                  className="text-blue-400 hover:underline"
                >
                  Diagnosis and Management
                </button>
              </li>
            )}
            {topic.highYieldPoints && (
              <li>
                <button
                  onClick={() => scrollToSection('highYieldPoints')}
                  className="text-blue-400 hover:underline"
                >
                  High-Yield Points
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-2/4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/knowledge-map" className="text-blue-400 hover:underline">
              ← Back to Mind Map
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Tabula Rasa</span>
              <Link
                to={`/hippocampus-hustle/${slug}`}
                className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center"
              >
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
              </Link>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{topic.title}</h2>

            {topic.introduction && (
              <div ref={el => (sectionRefs.current['introduction'] = el)} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Introduction</h3>
                <div
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{ __html: topic.introduction }}
                />
              </div>
            )}

            {topic.types.length > 0 && (
              <div ref={el => (sectionRefs.current['types'] = el)} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Types of Cardiomyopathies</h3>
                {topic.types.map((type, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-md font-medium">{type.name} ({type.abbreviation})</h4>
                    <div
                      className="text-gray-300"
                      dangerouslySetInnerHTML={{ __html: type.description }}
                    />
                    <p><strong>Symptoms:</strong> {type.symptoms.join(', ')}</p>
                    <p><strong>Diagnostic Findings:</strong> {type.diagnosticFindings.join(', ')}</p>
                    <p><strong>Causes:</strong> {type.causes.join(', ')}</p>
                  </div>
                ))}
              </div>
            )}

            {topic.diagnosis && (
              <div ref={el => (sectionRefs.current['diagnosis'] = el)} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Diagnosis and Management</h3>
                <div
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{ __html: topic.diagnosis.overview }}
                />
                <p><strong>Tools:</strong> {topic.diagnosis.tools.join(', ')}</p>
              </div>
            )}

            {topic.highYieldPoints && (
              <div ref={el => (sectionRefs.current['highYieldPoints'] = el)} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">High-Yield Points</h3>
                <div
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{ __html: topic.highYieldPoints }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Notes Section */}
        <div className="w-1/4 pl-6">
          <div className="bg-gray-800 p-6 rounded-lg sticky top-20">
            <h2 className="text-xl font-bold mb-4">Notes</h2>
            <div className="flex justify-between items-center mb-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
                {activePage}
              </button>
              <button className="text-gray-400 border border-gray-600 px-4 py-2 rounded-md">
                Add Page
              </button>
            </div>
            <ReactQuill
              theme="snow"
              value={notes}
              onChange={handleNotesChange}
              className="bg-gray-700 text-white rounded-md"
              style={{ height: '300px', marginBottom: '50px' }}
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