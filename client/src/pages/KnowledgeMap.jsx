import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const KnowledgeMap = ({ darkMode, setDarkMode }) => {
  const [systems, setSystems] = useState([]);
  const [expandedSystems, setExpandedSystems] = useState({});
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    axios.get(`${import.meta.env.VITE_API_URL}/systems?populate=topics`)
      .then(response => {
        console.log('API Response from /knowledge-map:', response.data);
        setApiResponse(response.data);
  
        let processedSystems = [];
  
        if (response.data && response.data.data) {
          processedSystems = response.data.data.map(system => {
            console.log('Processing system:', system);
            
            // Handle both flattened and nested structures
            let systemData;
            if (system.attributes) {
              // Nested structure (Strapi v4 style)
              systemData = system.attributes;
            } else {
              // Flattened structure (Strapi v5 style)
              systemData = system;
            }
            
            const name = systemData.name || "Unknown System";
            const percentage = systemData.percentage || 0;
            const order = systemData.order || 0;
            const slug = systemData.slug || "";
  
            // Handle topics - support both structures
            let topicsData = [];
            
            // Check for nested structure first
            if (systemData.topics && systemData.topics.data) {
              topicsData = systemData.topics.data.map(topic => {
                const topicData = topic.attributes || topic;
                return {
                  id: topic.id,
                  attributes: {
                    title: topicData.title || topicData.name || 'Unknown Topic',
                    name: topicData.name || topicData.title || 'Unknown Topic',
                    slug: topicData.slug || topic.id
                  }
                };
              });
            } 
            // Check for flattened array structure
            else if (Array.isArray(systemData.topics)) {
              topicsData = systemData.topics.map(topic => ({
                id: topic.id,
                attributes: {
                  title: topic.title || topic.name || 'Unknown Topic',
                  name: topic.name || topic.title || 'Unknown Topic',
                  slug: topic.slug || topic.id
                }
              }));
            }
            // Check for direct topics property on system
            else if (systemData.topics) {
              console.log('Topics found but not in expected format:', systemData.topics);
              // Sometimes Strapi returns topics as an object or different structure
              // Try to handle this case
              if (typeof systemData.topics === 'object' && !Array.isArray(systemData.topics)) {
                // Could be a single topic or object with properties
                topicsData = [];
              }
            }
  
            console.log(`System "${name}" has ${topicsData.length} topics:`, topicsData);
  
            return {
              id: system.id,
              attributes: {
                name: name,
                percentage: percentage,
                order: order,
                slug: slug,
                topics: topicsData
              }
            };
          });
  
          // Sort systems by order, then by percentage
          processedSystems.sort((a, b) => {
            if (a.attributes.order !== b.attributes.order) {
              return a.attributes.order - b.attributes.order;
            }
            return b.attributes.percentage - a.attributes.percentage;
          });
        }
  
        setSystems(processedSystems);
        console.log('Final processed systems:', processedSystems);
  
        // Initialize expanded state - open first system by default
        const initialExpanded = {};
        if (processedSystems.length > 0) {
          initialExpanded[processedSystems[0].id] = true;
        }
        setExpandedSystems(initialExpanded);
        setError(null);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching systems:', error);
        setError('Failed to load knowledge map. Please try again later.');
        setLoading(false);
      });
  }, []);

  const toggleSystem = systemId => {
    setExpandedSystems(prev => ({
      ...prev,
      [systemId]: !prev[systemId],
    }));
  };

  const filteredSystems = search
    ? systems.filter(system =>
        system.attributes.name.toLowerCase().includes(search.toLowerCase()) ||
        system.attributes.topics.some(topic => 
          (topic.attributes?.title || topic.attributes?.name || "").toLowerCase().includes(search.toLowerCase())
        )
      )
    : systems;

  if (loading) return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading medical systems...</p>
      </div>
    </div>
  );

  // Enhanced debug view
  if (systems.length === 0 && apiResponse) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'} p-8`}>
        <h1 className="text-2xl font-bold mb-4">Systems Debug View</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Raw API Response:</h2>
          <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded overflow-auto max-h-60 text-xs`}>
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Systems Analysis:</h2>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded`}>
            {apiResponse.data ? (
              <div>
                <p className="mb-2">✅ Found {apiResponse.data.length} systems</p>
                {apiResponse.data.map((system, index) => (
                  <div key={index} className="mb-4 p-3 border rounded">
                    <p><strong>System {index + 1}:</strong></p>
                    <ul className="ml-4 list-disc">
                      <li>ID: {system.id}</li>
                      <li>Name: {system.name || system.attributes?.name || 'Not found'}</li>
                      <li>Has attributes: {system.attributes ? '✅' : '❌'}</li>
                      <li>Topics structure: {
                        system.topics ? (
                          Array.isArray(system.topics) ? `Array with ${system.topics.length} items` :
                          system.topics.data ? `Object with data array (${system.topics.data.length} items)` :
                          'Object (unknown structure)'
                        ) : 
                        system.attributes?.topics ? (
                          Array.isArray(system.attributes.topics) ? `Nested array with ${system.attributes.topics.length} items` :
                          system.attributes.topics.data ? `Nested object with data array (${system.attributes.topics.data.length} items)` :
                          'Nested object (unknown structure)'
                        ) : '❌ No topics found'
                      }</li>
                      {(system.topics || system.attributes?.topics) && (
                        <li className="mt-2">
                          <details>
                            <summary>Topics details</summary>
                            <pre className="text-xs mt-2">
                              {JSON.stringify(system.topics || system.attributes?.topics, null, 2)}
                            </pre>
                          </details>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>❌ No systems data found</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Reload Page
          </button>
          <button 
            onClick={() => {
              setSystems([]);
              setApiResponse(null);
              setError(null);
              setLoading(false);
            }} 
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Hide Debug
          </button>
        </div>
      </div>
    );
  }

  if (error) return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
      <div className="text-center py-10 text-red-500">{error}</div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} search={search} setSearch={setSearch} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
          Medical Knowledge Map
        </h1>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
          Explore topics by system - percentages indicate relative importance in medical education
        </p>

        {filteredSystems.length === 0 ? (
          <div className={`text-center py-10 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>No systems found.</p>
            <button 
              onClick={() => setApiResponse({data: systems})} 
              className="mt-4 text-purple-500 hover:text-purple-700 underline"
            >
              Show debug info
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredSystems.map(system => (
              <div 
                key={system.id} 
                className={`rounded-xl overflow-hidden ${darkMode 
                  ? 'bg-gray-800 shadow-xl border border-gray-700' 
                  : 'bg-white shadow-lg border border-gray-100'}`}
              >
                <div
                  className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors duration-200 ${
                    darkMode 
                      ? (expandedSystems[system.id] ? 'bg-purple-900/30' : 'hover:bg-gray-700') 
                      : (expandedSystems[system.id] ? 'bg-purple-50' : 'hover:bg-gray-50')
                  }`}
                  onClick={() => toggleSystem(system.id)}
                >
                  <div className="flex items-center">
                    <div className={`mr-4 flex items-center justify-center w-10 h-10 rounded-full ${
                      expandedSystems[system.id] 
                        ? 'bg-purple-100 text-purple-600' 
                        : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'}`
                    }`}>
                      <span className="font-bold text-sm">{system.attributes.percentage}%</span>
                    </div>
                    <div>
                      <span className={`font-semibold text-lg ${expandedSystems[system.id] ? 'text-purple-500' : ''}`}>
                        {system.attributes.name}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {system.attributes.topics.length} topics
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`transition-transform duration-300 transform ${expandedSystems[system.id] ? 'rotate-180' : ''}`}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className={expandedSystems[system.id] ? 'text-purple-500' : ''}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSystems[system.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6">
                    {system.attributes.topics && system.attributes.topics.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {system.attributes.topics.map(topic => (
                          <Link
                            key={topic.id}
                            to={`/topic/${topic.attributes?.slug || topic.id}`}
                            className={`flex items-center p-4 rounded-lg transition-all duration-200 
                              ${darkMode 
                                ? 'bg-gray-700/50 hover:bg-purple-900/30 hover:translate-x-1' 
                                : 'bg-gray-50 hover:bg-purple-50 hover:translate-x-1'
                              } group`}
                          >
                            <div className="flex-1">
                              <h3 className={`font-medium group-hover:text-purple-500 transition-colors`}>
                                {topic.attributes?.title || topic.attributes?.name}
                              </h3>
                            </div>
                            <div className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                              </svg>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-4`}>
                        No topics available for this system yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeMap;