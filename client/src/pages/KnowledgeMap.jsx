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
  const [apiResponse, setApiResponse] = useState(null); // Store raw API response for debugging

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/knowledge-map`)
      .then(response => {
        console.log('API Response from /knowledge-map:', response.data);
        setApiResponse(response.data); // Keep for debugging if needed
  
        let processedSystems = [];
  
        if (response.data && response.data.data) {
          processedSystems = response.data.data.map(system => {
            // --- FIX START ---
            // Access properties directly from the 'system' object
            const name = system.name || "Unknown System";
            const percentage = system.percentage || 0;
            const order = system.order || 0; // Assuming 'order' might be a direct property too
            const slug = system.slug || "";   // Get slug if needed later
  
            // Handle topics - Check how they *actually* appear in the raw data.
            // Based *only* on the log provided, topics aren't visible.
            // Let's assume for now they might be a direct property 'system.topics' as an array,
            // or maybe they follow the Strapi relation structure directly on 'system'.
            // If they aren't present, default to an empty array.
            let topicsData = [];
            
            // Example: If topics were structured like Strapi relations but directly on 'system'
            if (system.topics && system.topics.data) { 
               topicsData = system.topics.data.map(topic => ({
                 id: topic.id,
                 // Again, assume Strapi structure for topics if present
                 attributes: topic.attributes || { title: 'Unknown Topic', name: 'Unknown Topic', slug: topic.id } 
               }));
            } 
            // Example: If topics were just a direct array property 'system.topics'
            else if (Array.isArray(system.topics)) { 
               topicsData = system.topics.map(topic => ({
                 id: topic.id,
                 // Adjust based on actual topic object structure
                 attributes: { 
                   title: topic.title || topic.name || 'Unknown Topic', 
                   slug: topic.slug || topic.id 
                 } 
               }));
            }
            // If neither structure matches or 'system.topics' is absent, topicsData remains []
  
            // Create the desired nested structure for the state
            return {
              id: system.id, // Correctly taken from system.id
              attributes: {
                name: name,
                percentage: percentage,
                order: order,
                slug: slug,      // Add slug to attributes if needed by rendering/linking
                topics: topicsData // Assign the processed (or empty) topics array
              }
            };
            // --- FIX END ---
          });
  
          // Sort systems (This part should now work correctly as attributes are populated)
          processedSystems.sort((a, b) => {
            if (a.attributes.order !== b.attributes.order) {
              return a.attributes.order - b.attributes.order;
            }
            return b.attributes.percentage - a.attributes.percentage;
          });
        }
  
        setSystems(processedSystems);
        console.log('Processed systems:', processedSystems); // Check this log again after the fix
  
        // Initialize expanded state
        const initialExpanded = {};
        if (processedSystems.length > 0) {
           initialExpanded[processedSystems[0].id] = true; // Open the first system by default
        }
      //   processedSystems.forEach((system, index) => { // Alternative: Open based on index
      //      initialExpanded[system.id] = index === 0; 
      //    });
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

  // Debug view - show raw API data when having issues
  if (systems.length === 0 && apiResponse) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'} p-8`}>
        <h1 className="text-2xl font-bold mb-4">API Data Debugger</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Raw API Response:</h2>
          <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded overflow-auto max-h-60`}>
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Data Structure Analysis:</h2>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded`}>
            {apiResponse.data ? (
              <div>
                <p>✅ Response has data array with {apiResponse.data.length} items</p>
                {apiResponse.data.map((item, index) => (
                  <div key={index} className="mt-2">
                    <p>Item {index + 1}:</p>
                    <ul className="ml-4 list-disc">
                      <li>ID: {item.id}</li>
                      <li>Has attributes: {item.attributes ? '✅' : '❌'}</li>
                      {item.attributes && (
                        <>
                          <li>Name: {item.attributes.name || 'Not found'}</li>
                          <li>Percentage: {item.attributes.percentage !== undefined ? item.attributes.percentage : 'Not found'}</li>
                          <li>Topics: {item.attributes.topics ? 
                            (item.attributes.topics.data ? 
                              `✅ (${item.attributes.topics.data.length} topics)` : 
                              '❌ No topics.data') : 
                            '❌ No topics property'}
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>❌ No data array in response</p>
            )}
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()} 
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Reload Page
        </button>
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
            No systems match your search criteria.
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
                      <span className="font-bold">{system.attributes.percentage}%</span>
                    </div>
                    <span className={`font-semibold text-lg ${expandedSystems[system.id] ? 'text-purple-500' : ''}`}>
                      {system.attributes.name}
                    </span>
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
                        No topics available for this system.
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