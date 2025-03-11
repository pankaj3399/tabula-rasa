import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const KnowledgeMap = ({ darkMode, setDarkMode }) => {
  const [systems, setSystems] = useState([]);
  const [expandedSystems, setExpandedSystems] = useState({});

  useEffect(() => {
    // Fetch systems data with nested topics and subtopics
    axios
      .get('http://localhost:1337/api/systems?populate[topics][populate]=subtopics')
      .then(response => {
        setSystems(response.data.data);
        
        // Initially expand all systems for better visibility
        const initialExpanded = {};
        response.data.data.forEach(system => {
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
      'Cardiovascular System': '❤️',
      'Pulmonary System': '🫁',
      'Gastrointestinal System/Nutrition': '☕',
      'Musculoskeletal System': '💪',
      'Infectious Diseases': '🛡️',
      'Neurologic System': '🧠',
      'Psychiatry/Behavioral Science': '😊',
      'Reproductive System': '👥',
      'Endocrine System': '💉',
      'Eyes, Ears, Nose, and Throat': '👁️',
      'Hematologic System': '💧',
      'Renal System': '🧪'
    };
    
    return icons[systemName] || '🔬'; // Default icon if not found
  };

  return (
    <div className="min-h-screen bg-white">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Medical Knowledge Map</h1>
        <p className="text-sm text-gray-600 mb-1">Select a system to explore topics</p>
        <p className="text-xs text-gray-500 mb-4">
          *Percent allocation indicates relative importance of each system in medical education (sorted highest to lowest)
        </p>

        {systems.map(system => (
          <div key={system.id} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
            {/* System header */}
            <div 
              className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer"
              onClick={() => toggleSystem(system.id)}
            >
              <div className="flex items-center">
                <span className="inline-block w-8 h-8 mr-2 flex items-center justify-center text-purple-600 bg-purple-100 rounded-lg">
                  {getSystemIcon(system.attributes.name)}
                </span>
                <span className="font-semibold text-gray-900">{system.attributes.name}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-purple-600 font-medium">{system.attributes.percentage}%</span>
                <button className="text-gray-500">
                  {expandedSystems[system.id] ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Topics grid */}
            {expandedSystems[system.id] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white">
                {system.attributes.topics?.data.map(topic => (
                  <div key={topic.id} className="border border-gray-200 rounded-md overflow-hidden">
                    <Link 
                      to={`/knowledge-map/topic/${topic.id}`}
                      className="flex items-center justify-between p-3 bg-white hover:bg-gray-50"
                    >
                      <span className="text-gray-800">{topic.attributes.name}</span>
                      <span className="text-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                      </span>
                    </Link>
                  </div>
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