import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const KnowledgeMap = ({ darkMode, setDarkMode }) => {
  const [systems, setSystems] = useState([]);
  const [expandedSystems, setExpandedSystems] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch systems data (mapped from Strapi Topics) with nested subtopics
    axios
      .get(`${import.meta.env.VITE_API_URL}/knowledge-map`)
      .then(response => {
        console.log('API Response from /knowledge-map:', JSON.stringify(response.data, null, 2));

        // Map Strapi's Topic data to the UI's expected "systems" structure
        let mappedSystems = response.data.data.map(topic => {
          // Handle subtopics directly under topic.subtopics or topic.attributes.subtopics
          const subtopicsData = topic.subtopics
            ? Array.isArray(topic.subtopics)
              ? topic.subtopics
              : topic.subtopics.data || []
            : topic.attributes?.subtopics?.data || [];

          console.log(`Topic ${topic.attributes?.title || topic.title} Subtopics:`, JSON.stringify(subtopicsData, null, 2));

          // Fix typo in the display (but Strapi should be updated)
          const topicName = topic.attributes?.title || topic.title;
          const correctedName = topicName === 'Cardiovuscular system' ? 'Cardiovascular System' : topicName;

          return {
            id: topic.id,
            attributes: {
              name: correctedName,
              percentage: topic.attributes?.percentage || topic.percentage || 0, // Use Strapi percentage, default to 0 if missing
              topics: {
                data: subtopicsData.map(subtopic => ({
                  id: subtopic.id,
                  attributes: {
                    name: subtopic.attributes?.title || subtopic.title,
                  },
                })),
              },
            },
          };
        });

        // Sort systems by percentage (highest to lowest) using Strapi data
        mappedSystems.sort((a, b) => b.attributes.percentage - a.attributes.percentage);

        console.log('Mapped Systems:', JSON.stringify(mappedSystems, null, 2));

        setSystems(mappedSystems);

        // Initially collapse all systems to reduce crowding
        const initialExpanded = {};
        mappedSystems.forEach(system => {
          initialExpanded[system.id] = false; // Set to false to collapse by default
        });
        setExpandedSystems(initialExpanded);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching systems:', error);
        setError('Failed to load knowledge map. Please try again later.');
      });
  }, []);

  const toggleSystem = systemId => {
    setExpandedSystems(prev => ({
      ...prev,
      [systemId]: !prev[systemId],
    }));
  };

  // Commenting out the getSystemImage function as icons are being removed for now
  /*
  const getSystemImage = systemName => {
    const images = {
      'Cardiovascular System': 'https://media.istockphoto.com/id/1182472970/vector/red-heart-sign-isolated-on-transparent-background-valentines-day-icon-hand-drawn-heart-shape.jpg?s=612x612&w=0&k=20&c=ZbzqqSjwkthlELr35fgYUad-drRcSKPUF7zMx0e3rEE=', // Heart
      'Dermatologic System': 'https://my.clevelandclinic.org/-/scassets/images/org/health/articles/10978-skin', // Skin
      'Endocrine System': 'https://media.sciencephoto.com/image/f0244301/800wm', // Glands (placeholder)
      'Eyes, Ears, Nose, and Throat': 'https://thumbs.dreamstime.com/b/nose-eye-mouth-ear-pictogram-8495638.jpg', // ENT (placeholder)
      'Gastrointestinal System/Nutrition': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQ0LCggLJwURQLx17Av6WC2xH5rQjTsQkDw&s', // Stomach
      'Genitourinary System': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR8LsTmfxDq8auxv0atlCWChIK9oycAUO1jw&s', // Kidneys (placeholder)
      'Hematologic System': 'https://static.vecteezy.com/system/resources/previews/055/319/967/non_2x/blood-drop-and-red-blood-cells-icon-illustration-free-vector.jpg', // Blood cells (placeholder)
      'Infectious Diseases': 'https://cdn5.vectorstock.com/i/1000x1000/88/19/bacteria-virus-icon-vector-10978819.jpg', // Virus
      'Musculoskeletal System': 'https://media.istockphoto.com/id/2187007394/vector/human-man-skeleton-anatomy-flat-illustration-of-skull-and-bones-in-body-halloween-medical.jpg?s=612x612&w=0&k=20&c=5pUEFqcF8RN_AzPA-EevNil-tcp-nBGiWBosBXyicko=', // Bones
      'Neurologic System': 'https://media.istockphoto.com/id/853956564/vector/silhouette-of-the-brain-on-a-white-background.jpg?s=612x612&w=0&k=20&c=lgb2a_SMdRz4VNZB2X5heDilBVctOoWQITCkS-FaA_M=', // Brain
      'Psychiatry/Behavioral Science': 'https://thumbs.dreamstime.com/z/human-head-brain-silhouette-heart-shape-as-love-mental-health-emotional-intelligence-concept-129583892.jpg', // Mind (placeholder)
      'Pulmonary System': 'https://media.istockphoto.com/id/1217564568/vector/human-lungs-silhouette.jpg?s=612x612&w=0&k=20&c=i1udWQEWmzTJ92OR_tzgdJLFhSdwMrXQFB6_boey4nQ=', // Lungs
      'Renal System': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ylJWh_OI6k-VU7s-tREvVmAoSEkcvABIUw&s', // Kidneys
      'Reproductive System': 'https://www.shutterstock.com/image-vector/gender-icon-pink-blue-symbol-260nw-1705888177.jpg', // Reproductive organs (placeholder)
      'Professional Practice': 'https://www.shutterstock.com/image-vector/cross-stethoscope-medical-health-care-260nw-478791523.jpg', // Stethoscope (placeholder)
    };
    return images[systemName] || 'https://www.shutterstock.com/image-vector/medical-snake-caduceus-logo-sign-600nw-1511110730.jpg'; // Default image
  };
  */

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

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
                {/* Commenting out the image tag to remove icons */}
                {/* <img
                  src={getSystemImage(system.attributes.name)}
                  alt={`${system.attributes.name} icon`}
                  className="w-8 h-8 mr-2 rounded-lg object-cover"
                /> */}
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
                {system.attributes.topics?.data.length > 0 ? (
                  system.attributes.topics.data.map(topic => (
                    <Link
                      key={topic.id}
                      to={`/subtopic-content/${topic.id}`}
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
                  ))
                ) : (
                  <p className="text-gray-500 text-sm p-3">No subtopics available for this system.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeMap;