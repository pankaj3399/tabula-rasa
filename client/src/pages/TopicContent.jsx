import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TopicContent = ({ darkMode, setDarkMode }) => {
  const { slug } = useParams();
  const { currentUser } = useAuth();
  const [topic, setTopic] = useState(null);
  const [subtopics, setSubtopics] = useState([]);
  const [activeSubtopic, setActiveSubtopic] = useState(null);
  const [activeHeading, setActiveHeading] = useState(null);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('both'); // 'both', 'notes', 'content'
  const [saveStatus, setSaveStatus] = useState('idle');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [navigationItems, setNavigationItems] = useState([]);

  // Multiple pages for notes
  const [pages, setPages] = useState(['Page 1']);
  const [activePage, setActivePage] = useState('Page 1');
  const [pageNotes, setPageNotes] = useState({ 'Page 1': '' });

  const autoSaveTimerRef = useRef(null);
  const subtopicRefs = useRef({});
  const headingRefs = useRef({});
  const contentContainerRef = useRef(null);

  // Dark mode classes
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const cardBgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const sidebarBgColor = darkMode
    ? 'bg-gray-800 border-gray-700'
    : 'bg-gray-100 border-gray-200';

  // Rich text editor modules configuration
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
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
  };

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
    'background',
  ];

  // Enhanced heading extraction to support H2 and H3 with hierarchy
  const extractHeadings = (content) => {
    if (!content) return [];

    const isMarkdown = content.includes('##') && !content.includes('<h2');

    if (isMarkdown) {
      const lines = content.split('\n');
      const headings = [];

      lines.forEach((line, index) => {
        // Match H2 headings (## text)
        const h2Match = line.match(/^##\s+(.+)$/);
        if (h2Match) {
          headings.push({
            id: `heading-h2-${headings.filter((h) => h.level === 2).length}`,
            text: h2Match[1].trim(),
            originalText: h2Match[1].trim(),
            lineNumber: index,
            level: 2,
            type: 'h2',
          });
        }

        // Match H3 headings (### text)
        const h3Match = line.match(/^###\s+(.+)$/);
        if (h3Match) {
          headings.push({
            id: `heading-h3-${headings.filter((h) => h.level === 3).length}`,
            text: h3Match[1].trim(),
            originalText: h3Match[1].trim(),
            lineNumber: index,
            level: 3,
            type: 'h3',
            parentH2:
              headings.filter((h) => h.level === 2).slice(-1)[0]?.id || null,
          });
        }
      });

      return headings;
    } else {
      // Extract from HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;

      const headings = [];

      // Extract H2 elements
      const h2Elements = tempDiv.querySelectorAll('h2');
      Array.from(h2Elements).forEach((h2, index) => {
        headings.push({
          id: `heading-h2-${index}`,
          text: h2.textContent.trim(),
          originalText: h2.textContent.trim(),
          level: 2,
          type: 'h2',
        });
      });

      // Extract H3 elements
      const h3Elements = tempDiv.querySelectorAll('h3');
      Array.from(h3Elements).forEach((h3, index) => {
        // Find the parent H2 by checking previous siblings
        let parentH2 = null;
        let previousElement = h3.previousElementSibling;
        while (previousElement) {
          if (previousElement.tagName === 'H2') {
            const h2Index = Array.from(tempDiv.querySelectorAll('h2')).indexOf(
              previousElement
            );
            parentH2 = `heading-h2-${h2Index}`;
            break;
          }
          previousElement = previousElement.previousElementSibling;
        }

        headings.push({
          id: `heading-h3-${index}`,
          text: h3.textContent.trim(),
          originalText: h3.textContent.trim(),
          level: 3,
          type: 'h3',
          parentH2: parentH2,
        });
      });

      return headings.sort((a, b) => {
        // Sort by DOM order
        const aElement = tempDiv.querySelector(a.type);
        const bElement = tempDiv.querySelector(b.type);
        return aElement && bElement
          ? Array.from(tempDiv.querySelectorAll('h2, h3')).indexOf(aElement) -
              Array.from(tempDiv.querySelectorAll('h2, h3')).indexOf(bElement)
          : 0;
      });
    }
  };

  // Enhanced navigation generation with hierarchical structure - REMOVED MAIN HEADINGS
  const generateNavigationItems = (subtopicsData) => {
    const items = [];

    subtopicsData.forEach((subtopic) => {
      const subtopicData = subtopic.attributes || subtopic;

      // Extract and add headings with hierarchy (removed subtopic main item)
      const headings = extractHeadings(subtopicData.content);

      headings.forEach((heading) => {
        items.push({
          id: `subtopic-${subtopic.id}-${heading.id}`,
          text: heading.text,
          type: heading.type,
          subtopicId: subtopic.id,
          headingId: heading.id,
          level: heading.level === 2 ? 0 : 1, // Adjusted levels since we removed main items
          parentH2: heading.parentH2
            ? `subtopic-${subtopic.id}-${heading.parentH2}`
            : null,
        });
      });
    });

    return items;
  };

  // Enhanced scroll function
  const scrollToItem = (item) => {
    const headingKey = `subtopic-${item.subtopicId}-${item.headingId}`;
    const element = headingRefs.current[headingKey];

    if (element && contentContainerRef.current) {
      const container = contentContainerRef.current;
      const elementTop = element.offsetTop;
      const containerHeight = container.clientHeight;
      const scrollPosition =
        elementTop - containerHeight / 2 + element.clientHeight / 2;

      container.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth',
      });

      setActiveSubtopic(item.subtopicId);
      setActiveHeading(headingKey);
    }
  };

  // Enhanced markdown to HTML conversion with medical formatting
  const renderContentWithHeadingIds = (content, subtopicId) => {
    if (!content) return '';

    let processedContent = content;

    const isMarkdown = content.includes('##') && !content.includes('<h2');

    if (isMarkdown) {
      // Enhanced markdown processing with medical formatting
      processedContent = content
        // Process High-Yield Points sections first (before other headers)
        .replace(
          /^##\s+(.*High-Yield Points.*)\s*\n((?:(?!^##)[\s\S])*)/gim,
          (match, title, content) => {
            const processedPoints = content
              .split('\n')
              .filter((line) => line.trim())
              .map((line) => {
                if (
                  line.trim().startsWith('•') ||
                  line.trim().startsWith('-') ||
                  line.trim().startsWith('*')
                ) {
                  return `<li>${line
                    .replace(/^[\s]*[•\-*]\s*/, '')
                    .trim()}</li>`;
                }
                return line.trim() ? `<p>${line.trim()}</p>` : '';
              })
              .filter((line) => line)
              .join('\n');

            return `<div class="high-yield-section">
            <h2>${title}</h2>
            <div class="high-yield-box">
              <div class="high-yield-title">PANCE High-Yield Points</div>
              <ul class="high-yield-list">
                ${processedPoints}
              </ul>
            </div>
          </div>`;
          }
        )

        // Convert other headers (order matters - most specific first)
        .replace(/^##### (.+)$/gm, '<h5>$1</h5>')
        .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')

        // Convert bold and italic
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')

        // Convert bullet points that aren't already processed
        .replace(/^[\s]*[•\-*]\s+(.+)$/gm, '<li>$1</li>')

        // Wrap consecutive <li> elements in <ul>
        .replace(/(<li>.*<\/li>)(\s*<li>.*<\/li>)*/gs, '<ul>$&</ul>')

        // Convert line breaks to paragraphs
        .split('\n\n')
        .map((paragraph) => {
          const trimmed = paragraph.trim();
          if (!trimmed) return '';

          // Don't wrap if it's already an HTML element or high-yield section
          if (trimmed.match(/^<(h[1-6]|ul|ol|blockquote|hr|div|li)/)) {
            return trimmed;
          }

          // Replace single newlines with <br> within paragraphs
          const withBreaks = trimmed.replace(/\n/g, '<br>');
          return `<p>${withBreaks}</p>`;
        })
        .filter((p) => p)
        .join('\n');
    }

    // Add IDs to headings for navigation
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = processedContent;

    // Add IDs to H2 elements
    const h2Elements = tempDiv.querySelectorAll('h2');
    h2Elements.forEach((h2, index) => {
      const headingId = `subtopic-${subtopicId}-heading-h2-${index}`;
      h2.setAttribute('id', headingId);
      h2.setAttribute('data-heading-key', headingId);
      h2.setAttribute('data-subtopic-id', subtopicId);
      h2.setAttribute('data-heading-level', '2');
    });

    // Add IDs to H3 elements
    const h3Elements = tempDiv.querySelectorAll('h3');
    h3Elements.forEach((h3, index) => {
      const headingId = `subtopic-${subtopicId}-heading-h3-${index}`;
      h3.setAttribute('id', headingId);
      h3.setAttribute('data-heading-key', headingId);
      h3.setAttribute('data-subtopic-id', subtopicId);
      h3.setAttribute('data-heading-level', '3');
    });

    return tempDiv.innerHTML;
  };

  // Intersection Observer for auto-highlighting active section
  useEffect(() => {
    if (!contentContainerRef.current || navigationItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const subtopicId = entry.target.getAttribute('data-subtopic-id');
            const headingKey = entry.target.getAttribute('data-heading-key');

            if (headingKey) {
              setActiveHeading(headingKey);
              setActiveSubtopic(subtopicId);
            } else if (subtopicId) {
              setActiveSubtopic(subtopicId);
              if (entry.target.tagName === 'H1') {
                setActiveHeading(null);
              }
            }
          }
        });
      },
      {
        root: contentContainerRef.current,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    // Observe all subtopic elements
    Object.values(subtopicRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Observe all heading elements
    Object.values(headingRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [navigationItems]);

  // Set up heading refs after content is rendered
  useEffect(() => {
    if (contentContainerRef.current && subtopics.length > 0) {
      headingRefs.current = {};

      subtopics.forEach((subtopic) => {
        const subtopicData = subtopic.attributes || subtopic;
        const headings = extractHeadings(subtopicData.content);

        headings.forEach((heading) => {
          const headingKey = `subtopic-${subtopic.id}-${heading.id}`;
          const element = contentContainerRef.current.querySelector(
            `#${headingKey}`
          );
          if (element) {
            headingRefs.current[headingKey] = element;
          }
        });
      });
    }
  }, [subtopics]);

  // Fetch topic and subtopics
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/topic-content/${slug}`)
      .then((response) => {
        console.log('Topic Response:', response.data);

        if (!response.data.data || response.data.data.length === 0) {
          throw new Error('Topic not found');
        }

        const topicData = response.data.data[0];
        setTopic(topicData);

        // Handle both flattened and nested structures for subtopics
        let subtopicsData = [];
        if (topicData.attributes?.subtopics?.data) {
          subtopicsData = topicData.attributes.subtopics.data;
        } else if (topicData.subtopics?.data) {
          subtopicsData = topicData.subtopics.data;
        } else if (Array.isArray(topicData.subtopics)) {
          subtopicsData = topicData.subtopics;
        } else if (Array.isArray(topicData.attributes?.subtopics)) {
          subtopicsData = topicData.attributes.subtopics;
        }

        console.log('Processed subtopics:', subtopicsData);
        setSubtopics(subtopicsData);

        // Generate navigation items
        const navItems = generateNavigationItems(subtopicsData);
        setNavigationItems(navItems);

        // Set first subtopic as active
        if (subtopicsData.length > 0) {
          setActiveSubtopic(subtopicsData[0].id);
        }

        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching topic:', error);
        if (error.response?.status === 404) {
          setError(
            `Topic "${slug}" not found. Please check the URL or return to the knowledge map.`
          );
        } else {
          setError('Failed to load topic content. Please try again later.');
        }
      })
      .finally(() => setLoading(false));

    // Fetch notes for this topic
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
          try {
            if (response.data.notes) {
              const parsedNotes = JSON.parse(response.data.notes);

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

            setNotes(response.data.notes || '');
            setPageNotes({ 'Page 1': response.data.notes || '' });
          } catch (e) {
            setNotes(response.data.notes || '');
            setPageNotes({ 'Page 1': response.data.notes || '' });
          }
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
        });
    }
  }, [slug, currentUser]);

  // Function to toggle view mode
  const toggleViewMode = () => {
    const modes = ['both', 'content', 'notes'];
    const currentIndex = modes.indexOf(viewMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setViewMode(modes[nextIndex]);
  };

  // Get view mode display name
  const getViewModeDisplay = () => {
    switch (viewMode) {
      case 'both':
        return 'Content & Notes';
      case 'content':
        return 'Content Only';
      case 'notes':
        return 'Notes Only';
      default:
        return 'Content & Notes';
    }
  };

  // Function to add a new page
  const addNewPage = () => {
    const updatedPageNotes = {
      ...pageNotes,
      [activePage]: notes,
    };

    const newPageNum = pages.length + 1;
    const newPageName = `Page ${newPageNum}`;

    setPages((prev) => [...prev, newPageName]);
    setPageNotes(updatedPageNotes);
    setActivePage(newPageName);
    setNotes('');
  };

  // Function to switch between pages
  const switchPage = (pageName) => {
    setPageNotes((prev) => ({
      ...prev,
      [activePage]: notes,
    }));

    setActivePage(pageName);
    setNotes(pageNotes[pageName] || '');
  };

  // Auto-save function
  const autoSaveNotes = async () => {
    if (!currentUser || !hasUnsavedChanges) return;

    try {
      setSaveStatus('saving');

      const updatedPageNotes = {
        ...pageNotes,
        [activePage]: notes,
      };
      setPageNotes(updatedPageNotes);

      const baseUrl = import.meta.env.VITE_API_URL;
      const notesEndpoint = baseUrl.includes('/api')
        ? '/update-notes'
        : '/api/update-notes';

      await axios.post(`${baseUrl}${notesEndpoint}`, {
        userId: currentUser.id,
        contentId: slug,
        contentType: 'topic',
        notes: JSON.stringify(updatedPageNotes),
      });

      setSaveStatus('saved');
      setHasUnsavedChanges(false);

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

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      autoSaveNotes();
    }, 2000);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [notes, hasUnsavedChanges, currentUser]);

  const saveNotes = async () => {
    if (!currentUser) {
      alert('Please log in to save notes.');
      return;
    }

    try {
      setSaveStatus('saving');

      const updatedPageNotes = {
        ...pageNotes,
        [activePage]: notes,
      };
      setPageNotes(updatedPageNotes);

      const baseUrl = import.meta.env.VITE_API_URL;
      const notesEndpoint = baseUrl.includes('/api')
        ? '/update-notes'
        : '/api/update-notes';

      await axios.post(`${baseUrl}${notesEndpoint}`, {
        userId: currentUser.id,
        contentId: slug,
        contentType: 'topic',
        notes: JSON.stringify(updatedPageNotes),
      });

      setSaveStatus('saved');
      setHasUnsavedChanges(false);

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
    if (pages.length <= 1) return;

    if (!window.confirm(`Are you sure you want to delete ${pageToDelete}?`)) {
      return;
    }

    const newPages = pages.filter((page) => page !== pageToDelete);
    const { [pageToDelete]: deletedNotes, ...remainingNotes } = pageNotes;

    setPages(newPages);
    setPageNotes(remainingNotes);

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
          <div className='flex items-center text-gray-300 text-xs ml-1'>
            <svg
              className='animate-spin h-3 w-3 mr-1 text-blue-500'
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
          <div className='flex items-center text-green-400 text-xs ml-1'>
            <svg
              className='h-3 w-3 mr-1'
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
          <div className='flex items-center text-red-400 text-xs ml-1'>
            <svg
              className='h-3 w-3 mr-1'
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
      default:
        return hasUnsavedChanges ? (
          <div className='text-blue-500 text-xs ml-1'>Unsaved changes</div>
        ) : null;
    }
  };

  if (error) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className='max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-8'>
          <div
            className={`${cardBgColor} p-6 rounded-lg text-center shadow-lg`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-12 text-red-500 mx-auto mb-3'
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
            <h2 className='text-lg font-bold mb-2'>Error</h2>
            <p className='text-red-400 text-sm'>{error}</p>
            <Link
              to='/knowledge-map'
              className='mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition text-sm'
            >
              Return to Knowledge Map
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !topic) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className='flex justify-center items-center h-48'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500'></div>
        </div>
      </div>
    );
  }

  // Helper function to get topic data (handle both nested and flattened)
  const getTopicData = (topic) => {
    return topic.attributes || topic;
  };

  const topicData = getTopicData(topic);

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Sticky Navigation Bar */}
      <div
        className={`flex justify-between items-center px-3 py-2 ${sidebarBgColor} border-b sticky top-0 z-50 shadow-sm`}
      >
        <Link
          to='/knowledge-map'
          className={`${
            darkMode
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-500 hover:text-blue-600'
          } transition flex items-center text-sm`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 mr-1'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
              clipRule='evenodd'
            />
          </svg>
          Back to Knowledge Map
        </Link>

        <div className='flex items-center space-x-3'>
          <button
            onClick={toggleViewMode}
            className={`${
              darkMode
                ? 'bg-indigo-700 hover:bg-indigo-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-3 py-1 rounded-md text-xs transition flex items-center`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3 w-3 mr-1'
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
            {getViewModeDisplay()}
          </button>

          <Link
            to={`/hippocampus-hustle/${slug}`}
            className={`${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-3 py-1 rounded-md flex items-center transition text-xs`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3 w-3 mr-1'
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
            <span className='inline'>Hippocampus Hustle</span>
          </Link>
        </div>
      </div>

      <div className='flex h-[calc(100vh-100px)]'>
        {/* Enhanced Sticky Left Sidebar - Table of Contents */}
        {(viewMode === 'both' || viewMode === 'content') && (
          <div
            className={`w-56 ${sidebarBgColor} border-r overflow-y-auto sticky top-0 h-full`}
          >
            <div className='p-3'>
              <div className='mb-4'>
                <h2 className={`text-base font-bold ${textColor} mb-1`}>
                  {topicData?.name || topicData?.title}
                </h2>
                {topicData?.description && (
                  <p
                    className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    } mb-3`}
                  >
                    {topicData.description}
                  </p>
                )}
              </div>

              <div>
                <h3
                  className={`text-xs font-semibold ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  } mb-2 uppercase tracking-wide`}
                >
                  Table of Contents
                </h3>

                {navigationItems.length === 0 ? (
                  <p
                    className={`text-xs ${
                      darkMode ? 'text-gray-500' : 'text-gray-600'
                    }`}
                  >
                    No content available
                  </p>
                ) : (
                  <nav className='space-y-1'>
                    {navigationItems.map((item) => {
                      const isActiveHeading = activeHeading === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToItem(item)}
                          className={`block w-full text-left p-2 transition-all duration-200 ${
                            item.level === 1 ? 'ml-4' : ''
                          } ${
                            isActiveHeading
                              ? `${
                                  darkMode ? 'text-blue-600' : 'text-blue-500'
                                } font-semibold border-l-3 border-blue-500`
                              : `${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                } hover:${
                                  darkMode ? 'text-blue-600' : 'text-blue-500'
                                }`
                          }`}
                        >
                          <span className='text-xs'>{item.text}</span>
                        </button>
                      );
                    })}
                  </nav>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className='flex-1 flex overflow-hidden'>
          {/* Scrollable Content Display */}
          {(viewMode === 'both' || viewMode === 'content') && (
            <div
              className={`${
                viewMode === 'both' ? 'flex-1' : 'w-full'
              } overflow-y-auto`}
              ref={contentContainerRef}
            >
              <div className='p-4 space-y-8'>
                {subtopics.length === 0 ? (
                  <div
                    className={`text-center mt-16 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-12 w-12 mx-auto mb-3 opacity-50'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                    <h3 className='text-base font-medium mb-2'>
                      No subtopics available
                    </h3>
                    <p className='text-sm'>
                      This topic doesn't have any subtopics yet.
                    </p>
                  </div>
                ) : (
                  subtopics.map((subtopic, index) => {
                    const subtopicData = subtopic.attributes || subtopic;

                    return (
                      <section
                        key={subtopic.id}
                        ref={(el) => (subtopicRefs.current[subtopic.id] = el)}
                        data-subtopic-id={subtopic.id}
                        className={`scroll-mt-6 ${
                          index !== subtopics.length - 1 ? 'border-b pb-8' : ''
                        } ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
                      >
                        <h1
                          className={`text-xl font-bold ${textColor} mb-3 sticky top-0 ${
                            darkMode ? 'bg-gray-900' : 'bg-gray-100'
                          } py-2 z-10 border-b ${
                            darkMode ? 'border-gray-600' : 'border-gray-200'
                          }`}
                        >
                          {subtopicData.title}
                        </h1>
                        <div
                          className={`prose ${
                            darkMode ? 'prose-invert' : ''
                          } prose-xs max-w-none ${textColor} medical-content`}
                          dangerouslySetInnerHTML={{
                            __html: renderContentWithHeadingIds(
                              subtopicData.content,
                              subtopic.id
                            ),
                          }}
                        />
                      </section>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Notes Section */}
          {(viewMode === 'both' || viewMode === 'notes') && (
            <div
              className={`${
                viewMode === 'both' ? 'w-80' : 'w-full'
              } ${cardBgColor} border-l ${
                darkMode ? 'border-gray-600' : 'border-gray-200'
              } flex flex-col`}
            >
              <div className='p-3 border-b border-gray-600'>
                <div className='flex justify-between items-center mb-3'>
                  <h2 className={`text-lg font-bold ${textColor}`}>Notes</h2>
                  <div className='flex items-center'>
                    {renderSaveStatus()}
                    <button
                      onClick={saveNotes}
                      className={`${
                        darkMode
                          ? 'text-blue-600 hover:text-blue-500'
                          : 'text-blue-500 hover:text-blue-600'
                      } transition text-xs flex items-center ml-1`}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-3 w-3 mr-1'
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
                          ? 'text-blue-600 hover:text-blue-500'
                          : 'text-blue-500 hover:text-blue-600'
                      } transition text-xs flex items-center ml-3`}
                    >
                      <span className='text-sm mr-1'>+</span> Page
                    </button>
                  </div>
                </div>
                {/* Page tabs */}
                <div className='mb-3 flex flex-wrap gap-1'>
                  {pages.map((page) => (
                    <button
                      key={page}
                      onClick={() => switchPage(page)}
                      className={`px-2 py-1 rounded text-xs transition flex items-center ${
                        activePage === page
                          ? `${
                              darkMode ? 'bg-blue-600' : 'bg-blue-500'
                            } text-white`
                          : `${
                              darkMode
                                ? 'bg-gray-600 hover:bg-gray-500'
                                : 'bg-gray-200 hover:bg-gray-300'
                            } ${textColor}`
                      }`}
                    >
                      {page}
                      {pages.length > 1 && page !== 'Page 1' && (
                        <span
                          className='ml-1 opacity-60 hover:opacity-100'
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePage(page);
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-2 w-2'
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
              </div>

              {/* Notes Editor Container */}
              <div className='flex-1 p-3 overflow-hidden'>
                <div className='h-full'>
                  <ReactQuill
                    theme='snow'
                    value={notes}
                    onChange={handleNotesChange}
                    modules={modules}
                    formats={formats}
                    className={`${
                      darkMode ? 'dark-quill' : ''
                    } h-full compact-quill`}
                    style={{ height: 'calc(100% - 40px)' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Custom CSS for Medical Content and High-Yield Points */}
      <style>{`
        /* High-Yield Points Special Styling - UPDATED WITH EXACT COLORS */
        .high-yield-section {
          margin: 2rem 0;
        }

        .high-yield-box {
          background: ${
            darkMode
              ? '#20193A'
              : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)'
          };
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1rem 0;
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: ${
            darkMode ? '1px solid rgba(93, 92, 222, 0.3)' : '2px solid #7c3aed'
          };
          position: relative;
          overflow: hidden;
        }

        .high-yield-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${
            darkMode
              ? 'rgba(93, 92, 222, 0.1)'
              : 'linear-gradient(45deg, rgba(124, 58, 237, 0.05) 0%, rgba(167, 139, 250, 0.03) 100%)'
          };
          pointer-events: none;
        }

        .high-yield-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          display: block;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .high-yield-title {
          color: ${darkMode ? '#fbbf24' : '#7c3aed'};
          font-weight: 700;
          font-size: 0.75rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-shadow: ${
            darkMode
              ? '0 1px 2px rgba(0, 0, 0, 0.5)'
              : '0 1px 2px rgba(124, 58, 237, 0.3)'
          };
          position: relative;
          z-index: 1;
        }

        .high-yield-list {
          list-style: none;
          padding: 0;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        .high-yield-list li {
          color: ${darkMode ? '#ffffff' : '#5b21b6'} !important;
          font-size: 0.75rem;
          line-height: 1.6;
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
          position: relative;
          font-weight: 400;
          text-shadow: ${darkMode ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none'};
        }

        .high-yield-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: ${darkMode ? '#ffffff' : '#7c3aed'};
          font-weight: bold;
          font-size: 1.2rem;
          top: 0;
        }

        .high-yield-list li:last-child {
          margin-bottom: 0;
        }

        /* Override any conflicting styles for high-yield content */
        .high-yield-box .high-yield-list li {
          color: ${darkMode ? '#ffffff' : '#5b21b6'} !important;
        }

        .high-yield-box * {
          color: ${darkMode ? '#ffffff' : 'inherit'} !important;
        }

        .high-yield-section h2 {
          display: none; /* Hide the duplicate heading */
        } 

        /* Enhanced dark mode styling */
        .dark-quill .ql-toolbar {
          border-color: #4b5563;
          background-color: #374151;
          padding: 6px;
        }

        .dark-quill .ql-toolbar .ql-stroke {
          stroke: #d1d5db;
        }

        .dark-quill .ql-toolbar .ql-fill {
          fill: #d1d5db;
        }

        .dark-quill .ql-toolbar .ql-picker-label {
          color: #d1d5db;
        }

        .dark-quill .ql-container {
          border-color: #4b5563;
          background-color: #1f2937;
          color: #e5e7eb;
        }

        .dark-quill .ql-editor {
          color: #e5e7eb;
          padding: 8px;
          font-size: 14px;
        }

        .dark-quill .ql-editor.ql-blank::before {
          color: #9ca3af;
        }

        .dark-quill .ql-tooltip {
          background-color: #374151;
          border-color: #4b5563;
          color: #e5e7eb;
        }

        .dark-quill .ql-tooltip input {
          background-color: #1f2937;
          border-color: #4b5563;
          color: #e5e7eb;
        }

        /* Compact quill editor */
        .compact-quill .ql-toolbar {
          padding: 4px;
        }

        .compact-quill .ql-toolbar .ql-formats {
          margin-right: 8px;
        }

        .compact-quill .ql-editor {
          padding: 6px;
          font-size: 13px;
          line-height: 1.4;
        }

        .compact-quill .ql-toolbar button {
          width: 24px;
          height: 24px;
          padding: 2px;
        }

        .compact-quill .ql-toolbar button svg {
          width: 12px;
          height: 12px;
        }

        /* Medical content specific styling */
        .medical-content h2 {
          position: relative;
          scroll-margin-top: 80px;
          padding-top: 0.75rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          border-bottom: 2px solid ${darkMode ? '#374151' : '#e5e7eb'};
          padding-bottom: 0.5rem;
          color: ${darkMode ? '#2563eb' : '#3b82f6'};
          font-weight: 700;
          font-size: 1.25rem;
        }

        .medical-content h3 {
          position: relative;
          scroll-margin-top: 80px;
          padding-top: 0.5rem;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: ${darkMode ? '#a78bfa' : '#7c3aed'};
          font-weight: 600;
          border-left: 3px solid ${darkMode ? '#a78bfa' : '#7c3aed'};
          padding-left: 0.5rem;
          font-size: 1.1rem;
        }

        .medical-content h4 {
          color: ${darkMode ? '#2563eb' : '#3b82f6'};
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.4rem;
          font-size: 1rem;
        }

        /* Enhanced list styling for medical content */
        .medical-content ul {
          margin: 0.75rem 0;
          padding-left: 1.25rem;
        }

        .medical-content li {
          margin: 0.4rem 0;
          line-height: 1.5;
          color: ${darkMode ? '#e5e7eb' : '#374151'};
          font-size: 0.875rem;
        }

        .medical-content ul > li {
          list-style-type: none;
          position: relative;
        }

        .medical-content ul > li::before {
          content: '•';
          color: ${darkMode ? '#2563eb' : '#3b82f6'};
          font-weight: bold;
          position: absolute;
          left: -1rem;
          font-size: 1em;
        }

        /* Strong text styling - PURPLE FOR EMPHASIS */
        .medical-content strong {
          font-weight: 600;
          color: ${darkMode ? '#a78bfa' : '#7c3aed'};
          background: ${
            darkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(124, 58, 237, 0.1)'
          };
          padding: 0.05rem 0.15rem;
          border-radius: 0.15rem;
          font-size: 0.875rem;
        }

        /* Code styling */
        .medical-content code {
          background-color: ${darkMode ? '#374151' : '#f3f4f6'};
          color: ${darkMode ? '#2563eb' : '#3b82f6'};
          padding: 0.15rem 0.3rem;
          border-radius: 0.2rem;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid ${darkMode ? '#4b5563' : '#e5e7eb'};
        }

        .medical-content p {
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 0.75rem 0;
        }

        /* Table styling */
        .medical-content table {
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.875rem;
          width: 100%;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .medical-content th,
        .medical-content td {
          padding: 0.75rem;
          border: 1px solid ${darkMode ? '#4b5563' : '#d1d5db'};
          text-align: left;
        }

        .medical-content th {
          background-color: ${darkMode ? '#374151' : '#f8fafc'};
          font-weight: 600;
          font-size: 0.875em;
          color: ${darkMode ? '#f9fafb' : '#111827'};
        }

        /* Blockquote styling */
        .medical-content blockquote {
          border-left: 4px solid ${darkMode ? '#2563eb' : '#3b82f6'};
          background-color: ${
            darkMode ? 'rgba(37, 99, 235, 0.1)' : 'rgba(59, 130, 246, 0.05)'
          };
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0 0.5rem 0.5rem 0;
          font-style: italic;
        }

        /* Navigation hierarchy improvements */
        .border-l-3 {
          border-left-width: 3px;
          transition: all 0.2s ease-in-out;
        }

        /* Smooth scrolling */
        .scroll-smooth {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: ${darkMode ? '#1f2937' : '#f1f5f9'};
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#4b5563' : '#cbd5e1'};
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#6b7280' : '#94a3b8'};
        }

        /* Medical warning and note boxes */
        .medical-warning {
          background-color: ${
            darkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)'
          };
          border: 1px solid ${
            darkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.3)'
          };
          padding: 1rem;
          border-radius: 0.5rem;
          border-left: 4px solid #ef4444;
          margin: 1.5rem 0;
          font-size: 0.9em;
        }

        .medical-note {
          background-color: ${
            darkMode ? 'rgba(37, 99, 235, 0.1)' : 'rgba(59, 130, 246, 0.1)'
          };
          border: 1px solid ${
            darkMode ? 'rgba(37, 99, 235, 0.3)' : 'rgba(59, 130, 246, 0.3)'
          };
          padding: 1rem;
          border-radius: 0.5rem;
          border-left: 4px solid ${darkMode ? '#2563eb' : '#3b82f6'};
          margin: 1.5rem 0;
          font-size: 0.9em;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .medical-content {
            font-size: 0.8rem;
          }
          
          .medical-content h1 {
            font-size: 1.5rem;
          }
          
          .medical-content h2 {
            font-size: 1.25rem;
          }
          
          .medical-content h3 {
            font-size: 1.1rem;
          }

          .high-yield-box {
            padding: 1rem;
            margin: 0.5rem 0;
          }

          .high-yield-list li {
            font-size: 0.8rem;
            padding-left: 1.2rem;
          }
        }

        /* Animation for active sections */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 200ms;
        }

        /* Focus states for accessibility */
        button:focus {
          outline: 2px solid ${darkMode ? '#2563eb' : '#3b82f6'};
          outline-offset: 1px;
        }

        /* Loading animation */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default TopicContent;
