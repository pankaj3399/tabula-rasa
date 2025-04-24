import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const renderContent = (content) => {
  return content.map((block, index) => {
    if (block.type === "paragraph") {
      return (
        <p key={index} className="text-gray-300 mb-4 leading-relaxed">
          {block.children.map((child) => child.text).join("")}
        </p>
      );
    }
    return null;
  });
};

const TopicContent = ({ darkMode, setDarkMode }) => {
  const { id, slug } = useParams();
  const { currentUser } = useAuth();
  const [subtopic, setSubtopic] = useState(null);
  const [notes, setNotes] = useState("");
  const [activePage, setActivePage] = useState("Page 1");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("introduction");
  const [expandedSections, setExpandedSections] = useState({
    introduction: true,
    types: false,
    diagnosis: false,
    highYield: false
  });
  
  // Refs for scrolling to sections
  const introductionRef = useRef(null);
  const typesRef = useRef(null);
  const diagnosisRef = useRef(null);
  const highYieldRef = useRef(null);

  const subtopicId = id || slug;
  
  // Function to toggle accordion sections
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Function to scroll to a section and highlight it in the navigation
  const scrollToSection = (section) => {
    setActiveSection(section);
    
    const refs = {
      introduction: introductionRef,
      types: typesRef,
      diagnosis: diagnosisRef,
      highYield: highYieldRef
    };
    
    if (refs[section] && refs[section].current) {
      refs[section].current.scrollIntoView({ behavior: 'smooth' });
      setExpandedSections(prev => ({
        ...prev,
        [section]: true // Expand the section when navigating to it
      }));
    }
  };

  useEffect(() => {
    console.log(`Fetching topic content for slug: ${slug}`);
    setLoading(true);
    
    // Get topic content
    axios
      .get(`${import.meta.env.VITE_API_URL}/topic-content/${slug}`)
      .then((response) => {
        console.log("Topic Content Response:", JSON.stringify(response.data, null, 2));
        
        if (!response.data.data || response.data.data.length === 0) {
          throw new Error("Topic not found");
        }
        
        const topicData = response.data.data[0]; // Topics return an array
        
        // Check if data has the expected structure
        if (!topicData) {
          throw new Error("Invalid topic data structure");
        }
        
        // Update this section to match the actual data structure from the API
        setSubtopic({
          id: topicData.id,
          title: topicData.title, // Direct access instead of through attributes
          content: [{
            type: "paragraph",
            children: [{ type: "text", text: topicData.introduction }]
          }],
          management: topicData.management,
          highyieldPoints: topicData.highyieldPoints,
          types: topicData.types || [],
          subtopics: topicData.subtopics || [],
          isTopic: true // Add this property to distinguish between topics and subtopics
        });
        
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching topic content:", error);
        setError(
          error.response?.status === 404
            ? "Topic not found. Please check the slug or ensure it is published."
            : "Failed to load topic content. Please try again later."
        );
      })
      .finally(() => setLoading(false));
  
    // Fetch notes for this topic using the updated API
    if (currentUser) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/notes`, {
          params: { 
            userId: currentUser.id, 
            contentId: slug, 
            contentType: 'topic'
          },
        })
        .then((response) => {
          setNotes(response.data.notes || "");
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
          // Don't set an error state here to allow the page to load even if notes fail
        });
    }
  }, [slug, currentUser]);
  
  const saveNotes = async () => {
    if (!currentUser) {
      alert("Please log in to save notes.");
      return;
    }
    
    try {
      // Check if we're using relative or absolute URL in the API calls
      const baseUrl = import.meta.env.VITE_API_URL;
      const notesEndpoint = baseUrl.includes('/api') ? '/update-notes' : '/api/update-notes';
      
      await axios.post(
        `${baseUrl}${notesEndpoint}`,
        {
          userId: currentUser.id,
          contentId: slug,
          contentType: 'topic',
          notes,
        }
      );
      alert("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
      alert(`Failed to save notes: ${error.response?.status || error.message}`);
    }
  };

  const handleNotesChange = (value) => {
    setNotes(value);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p className="text-red-400">{error}</p>
            <Link to="/knowledge-map" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
              Return to Mind Map
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !subtopic) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <Link to="/knowledge-map" className="text-blue-400 hover:text-blue-300 transition flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Mind Map
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Tabula Rasa</span>
          <Link
            to={`/hippocampus-hustle/${subtopic.id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition"
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
      
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="w-48 min-h-screen bg-gray-800 border-r border-gray-700 p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">JUMP TO:</h3>
            <nav>
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => scrollToSection('introduction')}
                    className={`w-full text-left py-1 px-2 rounded ${activeSection === 'introduction' ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    Introduction
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('types')}
                    className={`w-full text-left py-1 px-2 rounded ${activeSection === 'types' ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    Types
                  </button>
                </li>
                {subtopic.types && subtopic.types.map(type => (
                  <li key={type.id}>
                    <button 
                      className="w-full text-left py-1 px-2 pl-6 rounded text-gray-400 hover:bg-gray-700 text-sm"
                    >
                      {type.abbreviation || type.name}
                    </button>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => scrollToSection('diagnosis')}
                    className={`w-full text-left py-1 px-2 rounded ${activeSection === 'diagnosis' ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    Diagnosis
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('management')}
                    className={`w-full text-left py-1 px-2 rounded ${activeSection === 'management' ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    Management
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('highYield')}
                    className={`w-full text-left py-1 px-2 rounded ${activeSection === 'highYield' ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    High-Yield
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex">
            {/* Content Area */}
            <div className="flex-1 p-6">
              {/* Introduction Section */}
              <div 
                ref={introductionRef}
                className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection('introduction')}
                >
                  <h2 className="text-2xl font-bold text-white">Introduction</h2>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-6 w-6 text-gray-400 transition-transform ${expandedSections.introduction ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {expandedSections.introduction && (
                  <div className="mt-4">
                    <div className="prose prose-invert max-w-none">
                      {renderContent(subtopic.content)}
                    </div>
                  </div>
                )}
              </div>

              {/* Types Section */}
              <div 
                ref={typesRef}
                className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection('types')}
                >
                  <h2 className="text-2xl font-bold text-white">Types of {subtopic.title}</h2>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-6 w-6 text-gray-400 transition-transform ${expandedSections.types ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {expandedSections.types && subtopic.types && subtopic.types.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {subtopic.types.map(type => (
                      <div key={type.id} className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-300 mb-2">
                          {type.name} <span className="text-gray-400">({type.abbreviation})</span>
                        </h3>
                        <p className="text-gray-300 mb-4">{type.description}</p>
                        
                        {type.symptoms && type.symptoms.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-purple-200 text-sm font-medium mb-2">Key Symptoms</h4>
                            <ul className="list-disc list-inside text-gray-300 pl-2">
                              {type.symptoms.map((symptom, idx) => (
                                <li key={idx}>{symptom.text}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {type.diagnosticFindings && type.diagnosticFindings.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-purple-200 text-sm font-medium mb-2">Diagnostic Findings</h4>
                            <ul className="list-disc list-inside text-gray-300 pl-2">
                              {type.diagnosticFindings.map((finding, idx) => (
                                <li key={idx}>{finding.text}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {type.causes && type.causes.length > 0 && (
                          <div>
                            <h4 className="text-purple-200 text-sm font-medium mb-2">Common Causes</h4>
                            <ul className="list-disc list-inside text-gray-300 pl-2">
                              {type.causes.map((cause, idx) => (
                                <li key={idx}>{cause.text}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Diagnosis and Management Section */}
              <div 
                ref={diagnosisRef}
                className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection('diagnosis')}
                >
                  <h2 className="text-2xl font-bold text-white">Diagnosis and Management</h2>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-6 w-6 text-gray-400 transition-transform ${expandedSections.diagnosis ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {expandedSections.diagnosis && subtopic.management && (
                  <div className="mt-4">
                    <p className="text-gray-300 whitespace-pre-wrap">{subtopic.management}</p>
                  </div>
                )}
              </div>

              {/* High-Yield Points Section */}
              <div 
                ref={highYieldRef}
                className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection('highYield')}
                >
                  <h2 className="text-2xl font-bold text-white">High-Yield Points</h2>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-6 w-6 text-gray-400 transition-transform ${expandedSections.highYield ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {expandedSections.highYield && subtopic.highyieldPoints && (
                  <div className="mt-4">
                    <pre className="text-gray-300 whitespace-pre-wrap font-sans">{subtopic.highyieldPoints}</pre>
                  </div>
                )}
              </div>
            </div>

            {/* Notes Column */}
            <div className="w-80 p-4 border-l border-gray-700">
              <div className="sticky top-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Notes</h2>
                  <button className="text-blue-400 hover:text-blue-300">
                    + Add Page
                  </button>
                </div>
                
                <div className="mb-4">
                  <button className="bg-indigo-700 text-white px-4 py-1 rounded-md text-sm mb-4">
                    Page 1
                  </button>
                </div>
                
                <div className="border border-gray-700 rounded-md">
                  <div className="flex items-center p-2 border-b border-gray-700 bg-gray-700">
                    <button className="p-1 text-gray-400 hover:text-white">
                      <span className="font-bold">B</span>
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <span className="italic">I</span>
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <span className="underline">U</span>
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <span className="line-through">S</span>
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      " "
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      {"</>"}
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      H₁
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      H₂
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      ≡
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      •
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      A
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      A
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      🔗
                    </button>
                  </div>
                  
                  <ReactQuill
                    theme="snow"
                    value={notes}
                    onChange={handleNotesChange}
                    modules={{ toolbar: false }}
                    className="custom-quill bg-gray-800 text-white rounded-b-md"
                    style={{ height: "300px", border: "none" }}
                    placeholder="Enter your notes here..."
                  />
                </div>
                
                <button
                  onClick={saveNotes}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md w-full flex items-center justify-center transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                  </svg>
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicContent;