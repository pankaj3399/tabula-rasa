// client/src/pages/KnowledgeMap.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const KnowledgeMap = ({ darkMode, setDarkMode }) => {
  const [systems, setSystems] = useState([]);
  const [expandedSystems, setExpandedSystems] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/systems?populate[topics][populate]=subtopics')
      .then(response => {
        setSystems(response.data.data);
      })
      .catch(error => console.error('Error fetching systems:', error));
  }, []);

  const toggleSystem = systemId => {
    setExpandedSystems(prev => ({
      ...prev,
      [systemId]: !prev[systemId],
    }));
  };

  const toggleTopic = topicId => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Medical Knowledge Map</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Select a system to explore topics</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          *Percent allocation indicates relative importance of each system in medical education (sorted highest to lowest)
        </p>
        {systems.map(system => (
          <div key={system.id} className="mt-4">
            <div
              className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => toggleSystem(system.id)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-purple-600">{system.attributes.icon || '🌐'}</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{system.attributes.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-600">{system.attributes.percentage}%</span>
                <span>{expandedSystems[system.id] ? '▼' : '▲'}</span>
              </div>
            </div>
            {expandedSystems[system.id] && system.attributes.topics?.data.map(topic => (
              <div key={topic.id} className="ml-6 mt-2">
                <div
                  className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-600 rounded-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500"
                  onClick={() => toggleTopic(topic.id)}
                >
                  <span className="text-gray-900 dark:text-white">{topic.attributes.name}</span>
                  <span>{expandedTopics[topic.id] ? '▼' : '▲'}</span>
                </div>
                {expandedTopics[topic.id] && topic.attributes.subtopics?.data.map(subtopic => (
                  <Link
                    key={subtopic.id}
                    to={`/knowledge-map/${subtopic.id}`}
                    className="block ml-6 mt-1 p-2 bg-gray-300 dark:bg-gray-500 rounded-md hover:bg-gray-400 dark:hover:bg-gray-400 text-gray-900 dark:text-white"
                  >
                    {subtopic.attributes.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeMap;