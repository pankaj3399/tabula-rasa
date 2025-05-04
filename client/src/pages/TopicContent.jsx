import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const renderContent = (content, isDarkMode) => {
  return content.map((block, index) => {
    if (block.type === 'paragraph') {
      return (
        <p key={index}>{block.children.map((child) => child.text).join('')}</p>
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedSections, setExpandedSections] = useState({
    introduction: true,
    types: false,
    highYield: false,
  });
  const [viewMode, setViewMode] = useState('both'); // 'both', 'notes', 'summary'
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle', 'saving', 'saved', 'error'
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Multiple pages for notes
  const [pages, setPages] = useState(['Page 1']);
  const [activePage, setActivePage] = useState('Page 1');
  const [pageNotes, setPageNotes] = useState({ 'Page 1': '' });

  // Refs for scrolling to sections
  const introductionRef = useRef(null);
  const typesRef = useRef(null);
  const highYieldRef = useRef(null);
  const autoSaveTimerRef = useRef(null);
  const sidebarRef = useRef(null);

  const subtopicId = id || slug;

  // Dark mode classes
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const cardBgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const cardBorderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const highlightColor = darkMode ? 'text-blue-400' : 'text-blue-600';
  const mutedTextColor = darkMode ? 'text-gray-400' : 'text-gray-500';
  const sectionBgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const activeSectionBg = darkMode ? 'bg-gray-700' : 'bg-gray-200';
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200';

  // Rich text editor modules configuration with added colors
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ color: [] }, { background: [] }], // Added color options
      ['link'],
      ['clean'],
    ],
  };

  // Rich text editor formats
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'background', // Added color formats
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
    switch (viewMode) {
      case 'both':
        return 'Summary & Notes';
      case 'notes':
        return 'Notes Only';
      case 'summary':
        return 'Summary Only';
      default:
        return 'Summary & Notes';
    }
  };

  // Function to add a new page
  const addNewPage = () => {
    // Save current page notes before adding a new page
    const updatedPageNotes = {
      ...pageNotes,
      [activePage]: notes,
    };

    // Create a new page name (Page 2, Page 3, etc.)
    const newPageNum = pages.length + 1;
    const newPageName = `Page ${newPageNum}`;

    // Update the pages list and page notes
    setPages((prev) => [...prev, newPageName]);
    setPageNotes(updatedPageNotes);

    // Switch to the new page (with empty content)
    setActivePage(newPageName);
    setNotes('');
  };

  // Function to switch between pages
  const switchPage = (pageName) => {
    // Save the current page content before switching
    setPageNotes((prev) => ({
      ...prev,
      [activePage]: notes,
    }));

    // Switch to the selected page
    setActivePage(pageName);
    setNotes(pageNotes[pageName] || '');
  };

  // Auto-save function
  const autoSaveNotes = async () => {
    if (!currentUser || !hasUnsavedChanges) return;

    try {
      setSaveStatus('saving');

      // Update page notes with current content
      const updatedPageNotes = {
        ...pageNotes,
        [activePage]: notes,
      };
      setPageNotes(updatedPageNotes);

      // Check if we're using relative or absolute URL in the API calls
      const baseUrl = import.meta.env.VITE_API_URL;
      const notesEndpoint = baseUrl.includes('/api')
        ? '/update-notes'
        : '/api/update-notes';

      await axios.post(`${baseUrl}${notesEndpoint}`, {
        userId: currentUser.id,
        contentId: slug,
        contentType: 'topic',
        notes: JSON.stringify(updatedPageNotes), // Save all pages
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
          highyieldPoints: topicData.highyieldPoints,
          types: topicData.types || [],
          subtopics: topicData.subtopics || [],
          isTopic: true,
          image: topicData.image || null,
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
          // Try to parse notes data as a JSON string of multiple pages
          try {
            if (response.data.notes) {
              const parsedNotes = JSON.parse(response.data.notes);

              // Check if it's our multi-page format (object with page names as keys)
              if (
                typeof parsedNotes === 'object' &&
                !Array.isArray(parsedNotes)
              ) {
                setPageNotes(parsedNotes);
                setPages(Object.keys(parsedNotes));
                setActivePage(Object.keys(parsedNotes)[0]);
                setNotes(parsedNotes[Object.keys(parsedNotes)[0]] || '');
                return;
              }
            }

            // If not in our format or no notes, use default single page
            setNotes(response.data.notes || '');
            setPageNotes({ 'Page 1': response.data.notes || '' });
          } catch (e) {
            // If parsing fails, use as a single page note
            setNotes(response.data.notes || '');
            setPageNotes({ 'Page 1': response.data.notes || '' });
          }
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

      // Update current page in pageNotes
      const updatedPageNotes = {
        ...pageNotes,
        [activePage]: notes,
      };
      setPageNotes(updatedPageNotes);

      // Check if we're using relative or absolute URL in the API calls
      const baseUrl = import.meta.env.VITE_API_URL;
      const notesEndpoint = baseUrl.includes('/api')
        ? '/update-notes'
        : '/api/update-notes';

      await axios.post(`${baseUrl}${notesEndpoint}`, {
        userId: currentUser.id,
        contentId: slug,
        contentType: 'topic',
        notes: JSON.stringify(updatedPageNotes), // Save all pages as JSON
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

  // Function to delete a page
  const deletePage = (pageToDelete) => {
    // Don't delete if it's the last page
    if (pages.length <= 1) {
      return;
    }

    // Confirm before deleting
    if (!window.confirm(`Are you sure you want to delete ${pageToDelete}?`)) {
      return;
    }

    // Create a new pages array without the deleted page
    const newPages = pages.filter((page) => page !== pageToDelete);

    // Create new pageNotes without the deleted page
    const { [pageToDelete]: deletedNotes, ...remainingNotes } = pageNotes;

    // Update state
    setPages(newPages);
    setPageNotes(remainingNotes);

    // If the active page was deleted, switch to the first available page
    if (activePage === pageToDelete) {
      setActivePage(newPages[0]);
      setNotes(remainingNotes[newPages[0]] || '');
    }
  };

  // Render save status indicator
  const renderSaveStatus = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <div className='flex items-center text-gray-300 text-sm ml-2'>
            <svg
              className='animate-spin h-4 w-4 mr-1 text-blue-400'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            Saving...
          </div>
        );
      case 'saved':
        return (
          <div className='flex items-center text-green-400 text-sm ml-2'>
            <svg
              className='h-4 w-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 13l4 4L19 7'
              ></path>
            </svg>
            Saved
          </div>
        );
      case 'error':
        return (
          <div className='flex items-center text-red-400 text-sm ml-2'>
            <svg
              className='h-4 w-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            Error saving
          </div>
        );
      case 'idle':
      default:
        return hasUnsavedChanges ? (
          <div className='text-blue-400 text-sm ml-2'>Unsaved changes</div>
        ) : null;
    }
  };

  if (error) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div
            className={`${cardBgColor} p-8 rounded-lg text-center shadow-lg`}
          >
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
      <div className={`min-h-screen ${bgColor} ${textColor}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      <style jsx>{`
        /* Quill editor custom styling */
        .quill-custom .ql-toolbar {
          background-color: ${darkMode ? '#374151' : '#f3f4f6'};
          border-color: ${darkMode ? '#4b5563' : '#e5e7eb'};
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
        }

        .quill-custom .ql-container {
          background-color: ${darkMode ? '#1f2937' : '#ffffff'};
          border-color: ${darkMode ? '#4b5563' : '#e5e7eb'};
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          font-family: inherit;
          font-size: 1rem;
          color: ${darkMode ? '#e5e7eb' : '#374151'};
        }

        .quill-custom .ql-editor {
          color: ${darkMode ? '#e5e7eb' : '#374151'};
          min-height: 200px;
        }

        .quill-custom .ql-stroke {
          stroke: ${darkMode ? '#9ca3af' : '#6b7280'};
        }

        .quill-custom .ql-fill {
          fill: ${darkMode ? '#9ca3af' : '#6b7280'};
        }

        .quill-custom .ql-picker {
          color: ${darkMode ? '#9ca3af' : '#6b7280'};
        }

        .quill-custom .ql-picker-options {
          background-color: ${darkMode ? '#374151' : '#f9fafb'};
          border-color: ${darkMode ? '#4b5563' : '#e5e7eb'};
        }

        .quill-custom .ql-toolbar button:hover .ql-stroke,
        .quill-custom .ql-toolbar button.ql-active .ql-stroke {
          stroke: ${darkMode ? '#60a5fa' : '#2563eb'};
        }

        .quill-custom .ql-toolbar button:hover .ql-fill,
        .quill-custom .ql-toolbar button.ql-active .ql-fill {
          fill: ${darkMode ? '#60a5fa' : '#2563eb'};
        }

        .quill-custom .ql-picker.ql-expanded .ql-picker-label {
          color: ${darkMode ? '#60a5fa' : '#2563eb'};
          border-color: ${darkMode ? '#60a5fa' : '#2563eb'};
        }

        /* Color picker specific styles */
        .quill-custom .ql-color .ql-picker-label,
        .quill-custom .ql-background .ql-picker-label {
          padding: 0 4px;
        }

        .quill-custom .ql-color .ql-picker-options,
        .quill-custom .ql-background .ql-picker-options {
          padding: 3px 5px;
          width: 152px;
        }

        .quill-custom .ql-color .ql-picker-item,
        .quill-custom .ql-background .ql-picker-item {
          border: 1px solid transparent;
          float: left;
          height: 16px;
          margin: 2px;
          padding: 0;
          width: 16px;
        }

        /* Page button styles */
        .page-button {
          background-color: ${darkMode ? '#4b5563' : '#e5e7eb'};
          color: ${darkMode ? '#e5e7eb' : '#374151'};
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          margin-right: 0.5rem;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s;
        }

        .page-button.active {
          background-color: ${darkMode ? '#4f46e5' : '#3b82f6'};
          color: ${darkMode ? '#ffffff' : '#ffffff'};
        }

        .page-button:hover:not(.active) {
          background-color: ${darkMode ? '#6b7280' : '#d1d5db'};
        }

        .page-button .delete-icon {
          margin-left: 0.5rem;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .page-button:hover .delete-icon {
          opacity: 1;
        }

        /* Content transitions */
        .section-content {
          transition: all 0.3s ease;
        }

        /* High-yield styling */
        .high-yield-section {
          background-color: ${darkMode ? '#1f2a37' : '#f0f4ff'};
          border-left: 4px solid ${darkMode ? '#6366f1' : '#4f46e5'};
          border-radius: 15px;
          color: ${darkMode ? '#e5e7eb' : '#1e293b'};
          margin-top: 16px;
          padding: 16px;
        }

        .high-yield-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .info-icon {
          background-color: ${darkMode ? '#374151' : '#e0e7ff'};
          border-radius: 50%;
          color: ${darkMode ? '#818cf8' : '#4f46e5'};
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 32px;
          margin-right: 12px;
        }

        .high-yield-title {
          color: ${darkMode ? '#e5e7eb' : '#1e293b'};
          font-size: 18px;
          font-weight: 600;
        }

        .high-yield-list {
          list-style-type: disc;
          margin-left: 24px;
          color: ${darkMode ? '#d1d5db' : '#334155'};
        }

        .high-yield-list li {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .quill-custom .ql-editor {
            max-height: 50vh;
          }
        }

        /* Sticky sidebar */
        .sticky-sidebar {
          position: sticky;
          top: 60px;
          height: calc(100vh - 60px);
          overflow-y: auto;
        }
      `}</style>

      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Navigation Bar */}
      <div
        className={`flex justify-between items-center px-4 py-3 ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-gray-100 border-gray-200'
        } border-b sticky top-0 z-10`}
      >
        <Link
          to='/knowledge-map'
          className={`${
            darkMode
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-700'
          } transition flex items-center`}
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
          Back to Content Map
        </Link>

        <div className='flex items-center space-x-4'>
          {/* View Toggle Button */}
          <button
            onClick={toggleViewMode}
            className={`${
              darkMode
                ? 'bg-indigo-700 hover:bg-indigo-600'
                : 'bg-indigo-600 hover:bg-indigo-500'
            } text-white px-4 py-2 rounded-md text-sm transition flex items-center`}
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
            className={`${
              darkMode
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-indigo-500 hover:bg-indigo-600'
            } text-white px-4 py-2 rounded-md flex items-center transition`}
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
          <div
            ref={sidebarRef}
            className={`w-full md:w-40 ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-100 border-gray-200'
            } border-r p-4 sticky-sidebar`}
          >
            <div className='mb-4'>
              <h3
                className={`text-sm font-semibold ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } mb-2`}
              >
                JUMP TO:
              </h3>
              <nav className='flex md:block overflow-x-auto md:overflow-visible pb-2 md:pb-0'>
                <ul className='flex md:block space-x-2 md:space-x-0 md:space-y-1'>
                  <li>
                    <button
                      onClick={() => scrollToSection('introduction')}
                      className={`whitespace-nowrap text-left py-1 px-2 rounded ${
                        activeSection === 'introduction'
                          ? `${activeSectionBg} ${highlightColor}`
                          : `${textColor} ${hoverBg}`
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
                          ? `${activeSectionBg} ${highlightColor}`
                          : `${textColor} ${hoverBg}`
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
                          className={`w-full text-left py-1 px-2 pl-6 rounded ${
                            darkMode
                              ? 'text-gray-400 hover:bg-gray-700'
                              : 'text-gray-500 hover:bg-gray-200'
                          } text-sm whitespace-nowrap`}
                        >
                          {type.abbreviation || type.name}
                        </button>
                      ))}
                  </li>

                  <li>
                    <button
                      onClick={() => scrollToSection('highYield')}
                      className={`whitespace-nowrap text-left py-1 px-2 rounded ${
                        activeSection === 'highYield'
                          ? `${activeSectionBg} ${highlightColor}`
                          : `${textColor} ${hoverBg}`
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
            <div
              className={`flex-1 p-4 ${
                viewMode === 'both' ? 'md:w-2/3' : 'w-full'
              }`}
            >
              {/* Introduction Section */}
              <div
                ref={introductionRef}
                className={`${sectionBgColor} p-4 md:p-6 rounded-lg shadow-lg mb-6 transition-all duration-300`}
              >
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => toggleSection('introduction')}
                >
                  <h2 className={`text-xl font-bold ${textColor}`}>
                    Introduction
                  </h2>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-6 w-6 ${mutedTextColor} transition-transform duration-300 ${
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
     {/* Topic Image Display */}
{subtopic.image && (
  <div className="mb-6">
    <img 
      src={subtopic.image.url} 
      alt={subtopic.title}
      className="rounded-lg shadow-md w-full max-w-2xl mx-auto object-cover mb-4"
    />
    {subtopic.image.caption && (
      <p className={`text-center text-sm ${mutedTextColor}`}>
        {subtopic.image.caption}
      </p>
    )}
  </div>
)}
                    <div className='prose prose-invert max-w-none'>
                      <div
                        className={darkMode ? 'text-white' : 'text-gray-800'}
                      >
                        {renderContent(subtopic.content)}
                      </div>{' '}
                    </div>
                  </div>
                )}
              </div>

              {/* Types Section */}
              <div
                ref={typesRef}
                className={`${sectionBgColor} p-4 md:p-6 rounded-lg shadow-lg mb-6 transition-all duration-300`}
              >
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => toggleSection('types')}
                >
                  <h2 className={`text-xl font-bold ${textColor}`}>
                    Types of {subtopic.title}
                  </h2>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-6 w-6 ${mutedTextColor} transition-transform duration-300 ${
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
                          className={`p-4 ${
                            darkMode
                              ? 'bg-gray-700 bg-opacity-50 hover:bg-opacity-70'
                              : 'bg-gray-100 hover:bg-gray-200'
                          } rounded-lg transition-all duration-300`}
                        >
                          <h3
                            className={`text-lg font-semibold ${
                              darkMode ? 'text-blue-300' : 'text-blue-600'
                            } mb-2`}
                          >
                            {type.name}{' '}
                            <span
                              className={
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                              }
                            >
                              ({type.abbreviation})
                            </span>
                          </h3>
                          <p
                            className={`${
                              darkMode ? 'text-gray-300' : 'text-gray-600'
                            } mb-4`}
                          >
                            {type.description}
                          </p>

                          {type.symptoms && type.symptoms.length > 0 && (
                            <div className='mb-3'>
                              <h4
                                className={`${
                                  darkMode
                                    ? 'text-purple-200'
                                    : 'text-purple-600'
                                } text-sm font-medium mb-2`}
                              >
                                Key Symptoms
                              </h4>
                              <ul
                                className={`list-disc list-inside ${
                                  darkMode ? 'text-gray-300' : 'text-gray-600'
                                } pl-2`}
                              >
                                {type.symptoms.map((symptom, idx) => (
                                  <li key={idx}>{symptom.text}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* High-Yield Points Section - Updated to match image 2 with dark mode support */}
              <div
                ref={highYieldRef}
                className={`${sectionBgColor} p-4 md:p-6 rounded-lg shadow-lg transition-all duration-300`}
              >
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => toggleSection('highYield')}
                >
                  <h2 className={`text-xl font-bold ${textColor}`}>
                    High-Yield Points
                  </h2>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-6 w-6 ${mutedTextColor} transition-transform duration-300 ${
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
                  <div className='high-yield-section'>
                    <div className='high-yield-header'>
                      <div className='info-icon'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                      <h3 className='high-yield-title'>
                        PANCE High-Yield Points
                      </h3>
                    </div>
                    <ul className='high-yield-list'>
                      {subtopic.highyieldPoints
                        .split('\n')
                        .filter((point) => point.trim())
                        .map((point, index) => (
                          <li key={index}>
                            {point.trim().replace(/^[•-]\s*/, '')}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes Column - With Multiple Pages Support */}
          {(viewMode === 'both' || viewMode === 'notes') && (
            <div
              className={`
              ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}
              ${viewMode === 'notes' ? 'w-full' : 'w-full md:w-1/3'} 
              p-1
            `}
            >
              <div className='rounded-lg overflow-hidden'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className={`text-xl font-bold ${textColor}`}>Notes</h2>
                  <div className='flex items-center'>
                    {renderSaveStatus()}
                    <button
                      onClick={saveNotes}
                      className={`${
                        darkMode
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-blue-600 hover:text-blue-700'
                      } transition text-sm flex items-center ml-2`}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-1'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Save
                    </button>
                    <button
                      onClick={addNewPage}
                      className={`${
                        darkMode
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-blue-600 hover:text-blue-700'
                      } transition text-sm flex items-center ml-4`}
                    >
                      <span className='text-lg mr-1'>+</span> Add Page
                    </button>
                  </div>
                </div>

                {/* Page tabs */}
                <div className='mb-4 flex flex-wrap gap-2'>
                  {pages.map((page) => (
                    <button
                      key={page}
                      onClick={() => switchPage(page)}
                      className={`page-button ${
                        activePage === page ? 'active' : ''
                      }`}
                    >
                      {page}
                      {/* Show delete button for all pages except the first one */}
                      {pages.length > 1 && page !== 'Page 1' && (
                        <span
                          className='delete-icon ml-2'
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the page switch
                            deletePage(page);
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-4 w-4'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className='notes-editor-container'>
                  {/* ReactQuill Editor with Color Options */}
                  <ReactQuill
                    theme='snow'
                    value={notes}
                    onChange={handleNotesChange}
                    modules={modules}
                    formats={formats}
                    className='quill-custom'
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
