import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const renderContent = (content) => {
  return content.map((block, index) => {
    if (block.type === 'paragraph') {
      return (
        <p key={index} className='text-gray-300 mb-4 leading-relaxed'>
          {block.children.map((child) => child.text).join('')}
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
  const [notes, setNotes] = useState('');
  const [activePage, setActivePage] = useState('Page 1');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedSections, setExpandedSections] = useState({
    introduction: true,
    types: false,
    diagnosis: false,
    highYield: false,
  });
  const [viewMode, setViewMode] = useState('both'); // 'both', 'notes', 'summary'
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle', 'saving', 'saved', 'error'
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Refs for scrolling to sections
  const introductionRef = useRef(null);
  const typesRef = useRef(null);
  const diagnosisRef = useRef(null);
  const highYieldRef = useRef(null);
  const autoSaveTimerRef = useRef(null);

  const subtopicId = id || slug;

  // Rich text editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
  };

  // Rich text editor formats
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link'
  ];

  // Function to toggle accordion sections
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Function to scroll to a section and highlight it in the navigation
  const scrollToSection = (section) => {
    setActiveSection(section);

    const refs = {
      introduction: introductionRef,
      types: typesRef,
      diagnosis: diagnosisRef,
      highYield: highYieldRef,
    };

    if (refs[section] && refs[section].current) {
      refs[section].current.scrollIntoView({ behavior: 'smooth' });
      setExpandedSections((prev) => ({
        ...prev,
        [section]: true, // Expand the section when navigating to it
      }));
    }
  };

  // Function to toggle view mode
  const toggleViewMode = () => {
    const modes = ['both', 'notes', 'summary'];
    const currentIndex = modes.indexOf(viewMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setViewMode(modes[nextIndex]);
  };

  // Get view mode display name
  const getViewModeDisplay = () => {
    switch(viewMode) {
      case 'both': return 'Summary & Notes';
      case 'notes': return 'Notes Only';
      case 'summary': return 'Summary Only';
      default: return 'Summary & Notes';
    }
  };

  // Auto-save function
  const autoSaveNotes = async () => {
    if (!currentUser || !hasUnsavedChanges) return;
    
    try {
      setSaveStatus('saving');
      
      // Check if we're using relative or absolute URL in the API calls
      const baseUrl = import.meta.env.VITE_API_URL;
      const notesEndpoint = baseUrl.includes('/api')
        ? '/update-notes'
        : '/api/update-notes';

      await axios.post(`${baseUrl}${notesEndpoint}`, {
        userId: currentUser.id,
        contentId: slug,
        contentType: 'topic',
        notes,
      });
      
      setSaveStatus('saved');
      setHasUnsavedChanges(false);
      
      // Reset status to idle after a few seconds
      setTimeout(() => {
        if (setSaveStatus) setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error auto-saving notes:', error);
      setSaveStatus('error');
    }
  };

  // Trigger auto-save with debounce
  useEffect(() => {
    if (!currentUser || !hasUnsavedChanges) return;
    
    // Clear any existing timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    // Set new timer for auto-save (2 seconds after typing stops)
    autoSaveTimerRef.current = setTimeout(() => {
      autoSaveNotes();
    }, 2000);
    
    // Cleanup function
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [notes, hasUnsavedChanges, currentUser]);

  useEffect(() => {
    console.log(`Fetching topic content for slug: ${slug}`);
    setLoading(true);

    // Get topic content
    axios
      .get(`${import.meta.env.VITE_API_URL}/topic-content/${slug}`)
      .then((response) => {
        console.log(
          'Topic Content Response:',
          JSON.stringify(response.data, null, 2)
        );

        if (!response.data.data || response.data.data.length === 0) {
          throw new Error('Topic not found');
        }

        const topicData = response.data.data[0]; // Topics return an array

        // Check if data has the expected structure
        if (!topicData) {
          throw new Error('Invalid topic data structure');
        }

        // Update this section to match the actual data structure from the API
        setSubtopic({
          id: topicData.id,
          title: topicData.title,
          content: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: topicData.introduction }],
            },
          ],
          management: topicData.management,
          highyieldPoints: topicData.highyieldPoints,
          types: topicData.types || [],
          subtopics: topicData.subtopics || [],
          isTopic: true, // Add this property to distinguish between topics and subtopics
        });

        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching topic content:', error);
        setError(
          error.response?.status === 404
            ? 'Topic not found. Please check the slug or ensure it is published.'
            : 'Failed to load topic content. Please try again later.'
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
            contentType: 'topic',
          },
        })
        .then((response) => {
          setNotes(response.data.notes || '');
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
          // Don't set an error state here to allow the page to load even if notes fail
        });
    }

    // Cleanup function to cancel any pending auto-save when unmounting
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [slug, currentUser]);

  const saveNotes = async () => {
    if (!currentUser) {
      alert('Please log in to save notes.');
      return;
    }

    try {
      setSaveStatus('saving');
      
      // Check if we're using relative or absolute URL in the API calls
      const baseUrl = import.meta.env.VITE_API_URL;
      const notesEndpoint = baseUrl.includes('/api')
        ? '/update-notes'
        : '/api/update-notes';

      await axios.post(`${baseUrl}${notesEndpoint}`, {
        userId: currentUser.id,
        contentId: slug,
        contentType: 'topic',
        notes,
      });
      
      setSaveStatus('saved');
      setHasUnsavedChanges(false);
      
      // Reset status to idle after a few seconds
      setTimeout(() => {
        if (setSaveStatus) setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error saving notes:', error);
      setSaveStatus('error');
      alert(`Failed to save notes: ${error.response?.status || error.message}`);
    }
  };

  const handleNotesChange = (value) => {
    setNotes(value);
    setHasUnsavedChanges(true);
    if (saveStatus === 'saved' || saveStatus === 'error') {
      setSaveStatus('idle');
    }
  };

  // Render save status indicator
  const renderSaveStatus = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <div className="flex items-center text-gray-300 text-sm ml-2">
            <svg className="animate-spin h-4 w-4 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </div>
        );
      case 'saved':
        return (
          <div className="flex items-center text-green-400 text-sm ml-2">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Saved
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-red-400 text-sm ml-2">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Error saving
          </div>
        );
      case 'idle':
      default:
        return hasUnsavedChanges ? (
          <div className="text-blue-400 text-sm ml-2">Unsaved changes</div>
        ) : null;
    }
  };

  if (error) {
    return (
      <div className='min-h-screen bg-gray-900 text-white'>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='bg-gray-800 p-8 rounded-lg text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 text-red-500 mx-auto mb-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
            <h2 className='text-xl font-bold mb-2'>Error</h2>
            <p className='text-red-400'>{error}</p>
            <Link
              to='/knowledge-map'
              className='mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition'
            >
              Return to Mind Map
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !subtopic) {
    return (
      <div className='min-h-screen bg-gray-900 text-white'>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <style jsx>{`
        /* Quill editor custom styling */
        .quill-custom .ql-toolbar {
          background-color: #374151;
          border-color: #4b5563;
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
        }
        
        .quill-custom .ql-container {
          background-color: #1f2937;
          border-color: #4b5563;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          font-family: inherit;
          font-size: 1rem;
        }
        
        .quill-custom .ql-editor {
          color: #e5e7eb;
          min-height: 200px;
        }
        
        .quill-custom .ql-stroke {
          stroke: #9ca3af;
        }
        
        .quill-custom .ql-fill {
          fill: #9ca3af;
        }
        
        .quill-custom .ql-picker {
          color: #9ca3af;
        }
        
        .quill-custom .ql-picker-options {
          background-color: #374151;
          border-color: #4b5563;
        }
        
        .quill-custom .ql-toolbar button:hover .ql-stroke,
        .quill-custom .ql-toolbar button.ql-active .ql-stroke {
          stroke: #60a5fa;
        }
        
        .quill-custom .ql-toolbar button:hover .ql-fill,
        .quill-custom .ql-toolbar button.ql-active .ql-fill {
          fill: #60a5fa;
        }
        
        .quill-custom .ql-picker.ql-expanded .ql-picker-label {
          color: #60a5fa;
          border-color: #60a5fa;
        }
        
        /* Content transitions */
        .section-content {
          transition: all 0.3s ease;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .quill-custom .ql-editor {
            max-height: 50vh;
          }
        }
      `}</style>
      
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Navigation Bar */}
      <div className='flex justify-between items-center px-4 py-3 bg-gray-800 border-b border-gray-700 sticky top-0 z-10'>
        <Link
          to='/knowledge-map'
          className='text-blue-400 hover:text-blue-300 transition flex items-center'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mr-1'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
              clipRule='evenodd'
            />
          </svg>
          Back to Mind Map
        </Link>
        
        <div className='flex items-center space-x-4'>
          {/* View Toggle Button */}
          <button 
            onClick={toggleViewMode}
            className='bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm transition flex items-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
            Toggle View [{getViewModeDisplay()}]
          </button>
                    
          <Link
            to={`/study-dashboard/${slug}`}
            className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 10V3L4 14h7v7l9-11h-7z'
              />
            </svg>
            <span className='hidden sm:inline'>Hippocampus Hustle</span>
            <span className='sm:hidden'>Study</span>
          </Link>
        </div>
      </div>

      <div className='flex flex-col md:flex-row'>
        {/* Left Sidebar Navigation - Show only in summary or both modes */}
        {(viewMode === 'both' || viewMode === 'summary') && (
          <div className='w-full md:w-48 bg-gray-800 border-r border-gray-700 p-4 md:min-h-screen'>
            <div className='mb-4'>
              <h3 className='text-sm font-semibold text-gray-400 mb-2'>
                JUMP TO:
              </h3>
              <nav className='flex md:block overflow-x-auto md:overflow-visible pb-2 md:pb-0'>
                <ul className='flex md:block space-x-2 md:space-x-0 md:space-y-1'>
                  <li>
                    <button
                      onClick={() => scrollToSection('introduction')}
                      className={`whitespace-nowrap text-left py-1 px-2 rounded ${
                        activeSection === 'introduction'
                          ? 'bg-gray-700 text-blue-400'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      Introduction
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('types')}
                      className={`whitespace-nowrap text-left py-1 px-2 rounded ${
                        activeSection === 'types'
                          ? 'bg-gray-700 text-blue-400'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      Types
                    </button>
                  </li>
                  <li className='hidden md:block'>
                    {subtopic.types &&
                      subtopic.types.map((type) => (
                        <button 
                          key={type.id}
                          className='w-full text-left py-1 px-2 pl-6 rounded text-gray-400 hover:bg-gray-700 text-sm whitespace-nowrap'
                        >
                          {type.abbreviation || type.name}
                        </button>
                      ))}
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('diagnosis')}
                      className={`whitespace-nowrap text-left py-1 px-2 rounded ${
                        activeSection === 'diagnosis'
                          ? 'bg-gray-700 text-blue-400'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      Diagnosis
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('management')}
                      className={`whitespace-nowrap text-left py-1 px-2 rounded ${
                        activeSection === 'management'
                          ? 'bg-gray-700 text-blue-400'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      Management
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('highYield')}
                      className={`whitespace-nowrap text-left py-1 px-2 rounded ${
                        activeSection === 'highYield'
                          ? 'bg-gray-700 text-blue-400'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      High-Yield
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className='flex-1 flex flex-col md:flex-row'>
          {/* Content Area - Hide when in notes-only mode */}
          {(viewMode === 'both' || viewMode === 'summary') && (
            <div className={`flex-1 p-4 md:p-6 ${viewMode === 'both' ? 'md:w-2/3' : 'w-full'}`}>
              {/* Introduction Section */}
              <div
                ref={introductionRef}
                className='bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg mb-6 transition-all duration-300'
              >
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => toggleSection('introduction')}
                >
                  <h2 className='text-xl md:text-2xl font-bold text-white'>
                    Introduction
                  </h2>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
                      expandedSections.introduction
                        ? 'transform rotate-180'
                        : ''
                    }`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>

                {expandedSections.introduction && (
                  <div className='mt-4 section-content'>
                    <div className='prose prose-invert max-w-none'>
                      {renderContent(subtopic.content)}
                    </div>
                  </div>
                )}
              </div>

              {/* Types Section */}
              <div
                ref={typesRef}
                className='bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg mb-6 transition-all duration-300'
              >
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => toggleSection('types')}
                >
                  <h2 className='text-xl md:text-2xl font-bold text-white'>
                    Types of {subtopic.title}
                  </h2>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
                      expandedSections.types ? 'transform rotate-180' : ''
                    }`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>

                {expandedSections.types &&
                  subtopic.types &&
                  subtopic.types.length > 0 && (
                    <div className='mt-4 space-y-4 section-content'>
                      {subtopic.types.map((type) => (
                        <div
                          key={type.id}
                          className='p-4 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-300'
                        >
                          <h3 className='text-lg font-semibold text-blue-300 mb-2'>
                            {type.name}{' '}
                            <span className='text-gray-400'>
                              ({type.abbreviation})
                            </span>
                          </h3>
                          <p className='text-gray-300 mb-4'>
                            {type.description}
                          </p>

                          {type.symptoms && type.symptoms.length > 0 && (
                            <div className='mb-3'>
                              <h4 className='text-purple-200 text-sm font-medium mb-2'>
                                Key Symptoms
                              </h4>
                              <ul className='list-disc list-inside text-gray-300 pl-2'>
                                {type.symptoms.map((symptom, idx) => (
                                  <li key={idx}>{symptom.text}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {type.diagnosticFindings &&
                            type.diagnosticFindings.length > 0 && (
                              <div className='mb-3'>
                                <h4 className='text-purple-200 text-sm font-medium mb-2'>
                                  Diagnostic Findings
                                </h4>
                                <ul className='list-disc list-inside text-gray-300 pl-2'>
                                  {type.diagnosticFindings.map(
                                    (finding, idx) => (
                                      <li key={idx}>{finding.text}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {type.causes && type.causes.length > 0 && (
                            <div>
                              <h4 className='text-purple-200 text-sm font-medium mb-2'>
                                Common Causes
                              </h4>
                              <ul className='list-disc list-inside text-gray-300 pl-2'>
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
                className='bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg mb-6 transition-all duration-300'
              >
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => toggleSection('diagnosis')}
                >
                  <h2 className='text-xl md:text-2xl font-bold text-white'>
                    Diagnosis and Management
                  </h2>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
                      expandedSections.diagnosis ? 'transform rotate-180' : ''
                    }`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>

                {expandedSections.diagnosis && subtopic.management && (
                  <div className='mt-4 section-content'>
                    <p className='text-gray-300 whitespace-pre-wrap'>
                      {subtopic.management}
                    </p>
                  </div>
                )}
              </div>

              {/* High-Yield Points Section */}
              <div
                ref={highYieldRef}
                className='bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg transition-all duration-300'
              >
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => toggleSection('highYield')}
                >
                  <h2 className='text-xl md:text-2xl font-bold text-white'>
                    High-Yield Points
                  </h2>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
                      expandedSections.highYield ? 'transform rotate-180' : ''
                    }`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>

                {expandedSections.highYield && subtopic.highyieldPoints && (
                  <div className='mt-4 section-content'>
                    <pre className='text-gray-300 whitespace-pre-wrap font-sans'>
                      {subtopic.highyieldPoints}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes Column */}
          {(viewMode === 'both' || viewMode === 'notes') && (
            <div className={`
              ${viewMode === 'notes' ? 'w-full' : 'w-full md:w-1/3'} 
              p-4 
              ${viewMode === 'both' ? 'md:border-l md:border-gray-700' : ''}
              bg-gray-800 md:bg-transparent
            `}>
              <div className={`${viewMode === 'both' ? 'md:sticky md:top-16' : ''} bg-gray-800 p-4 rounded-lg`}>
                <div className='flex justify-between items-center mb-4'>
                  <div className="flex items-center">
                    <h2 className='text-xl font-bold text-white'>Notes</h2>
                    {/* Save status indicator */}
                    {renderSaveStatus()}
                  </div>
                  <button className='text-blue-400 hover:text-blue-300 transition text-sm'>
                    + Add Page
                  </button>
                </div>

                <div className='mb-4'>
                  <button className='bg-indigo-700 text-white px-4 py-1 rounded-md text-sm transition hover:bg-indigo-600'>
                    {activePage}
                  </button>
                </div>

                <div className='notes-editor-container'>
                  {/* ReactQuill Editor */}
                  <ReactQuill
                    theme="snow"
                    value={notes}
                    onChange={handleNotesChange}
                    modules={modules}
                    formats={formats}
                    className='quill-custom'
                    style={{ 
                      borderRadius: '0.5rem',
                      height: viewMode === 'notes' ? '60vh' : '40vh',
                    }}
                  />
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicContent;