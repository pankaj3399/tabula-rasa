import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const KnowledgeMap = ({ darkMode, setDarkMode }) => {
  const [systems, setSystems] = useState([]);
  const [expandedSystems, setExpandedSystems] = useState({});

  useEffect(() => {
    // Fetch systems data (mapped from Strapi Topics) with nested subtopics
    axios
      .get('http://localhost:3000/api/knowledge-map')
      .then(response => {
        // Map Strapi's Topic data to the UI's expected "systems" structure
        const mappedSystems = response.data.data.map(topic => ({
          id: topic.id,
          attributes: {
            name: topic.attributes.title, // Map Strapi's title to system name
            percentage: topic.attributes.percentage || 10, // Use percentage if added, else mock
            topics: {
              data: topic.attributes.subtopics.data.map(subtopic => ({
                id: subtopic.id,
                attributes: {
                  name: subtopic.attributes.title, // Map subtopic title to topic name
                },
              })),
            },
          },
        }));

        setSystems(mappedSystems);

        // Initially expand all systems for better visibility
        const initialExpanded = {};
        mappedSystems.forEach(system => {
          initialExpanded[system.id] = true;
        });
        setExpandedSystems(initialExpanded);
      })
      .catch(error => console.error('Error fetching systems:', error));
  }, []);

  const toggleSystem = systemId => {
    setExpandedSystems(prev => ({
      ...prev,
      [systemId]: !prev[systemId],
    }));
  };

  // Function to determine icon based on system name
  const getSystemIcon = (systemName) => {
    const icons = {
      'Cardiomyopathies': '❤️', // Map to match sample data
      'Hypertension': '🩺',     // Custom icon for Hypertension
    };
    return icons[systemName] || '🔬'; // Default icon if not found
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Medical Knowledge Map</h1>
        <p className="text-sm text-gray-600 mb-1">Select a system to explore topics</p>
        <p className="text-xs text-gray-500 mb-4">
          *Percent allocation indicates relative importance of each system in medical education (sorted highest to lowest)
        </p>

        {systems.map(system => (
          <div key={system.id} className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div
              className="flex items-center justify-between px-4 py-3 bg-white cursor-pointer hover:bg-gray-100"
              onClick={() => toggleSystem(system.id)}
            >
              <div className="flex items-center">
                <span className="inline-block w-8 h-8 mr-2 flex items-center justify-center text-purple-600 bg-purple-100 rounded-lg">
                  {getSystemIcon(system.attributes.name)}
                </span>
                <span className="font-semibold text-gray-900">{system.attributes.name}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-purple-600 font-medium bg-purple-100 rounded-full px-2 py-1 text-xs">
                  {system.attributes.percentage}%
                </span>
                <button className="text-gray-500 focus:outline-none">
                  {expandedSystems[system.id] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {expandedSystems[system.id] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
                {system.attributes.topics?.data.map(topic => (
                  <Link
                    key={topic.id}
                    to={`/subtopic-content/${topic.id}`} // Update route to match SubtopicContent.jsx
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-800 text-sm">{topic.attributes.name}</span>
                    <span className="text-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeMap;