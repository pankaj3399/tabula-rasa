import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

const StudyDashboard = ({ darkMode, setDarkMode }) => {
  const { slug } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // States for dashboard data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topicTitle, setTopicTitle] = useState('');
  const [dueCards, setDueCards] = useState([]);

  // States for study settings
  const [cardLimit, setCardLimit] = useState(10);
  const [includeNewCards, setIncludeNewCards] = useState(true);
  const [enableTimer, setEnableTimer] = useState(false);

  // Dark mode styling variables
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const bgGradient = darkMode
    ? 'from-gray-900 to-indigo-900'
    : 'from-blue-50 to-indigo-100';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const cardBgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const cardBorderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const headingColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedTextColor = darkMode ? 'text-gray-400' : 'text-gray-500';
  const secondaryTextColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  const highlightColor = darkMode ? 'text-indigo-300' : 'text-indigo-600';
  const primaryButtonBg = darkMode
    ? 'bg-indigo-600 hover:bg-indigo-700'
    : 'bg-indigo-500 hover:bg-indigo-600';
  const controlBg = darkMode
    ? 'bg-gray-700 hover:bg-gray-600'
    : 'bg-gray-200 hover:bg-gray-300';

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Only proceed if we have a user
        if (!currentUser) {
          setError('Please log in to access the dashboard.');
          setLoading(false);
          return;
        }

        // 1. Fetch topic information to get the title
        try {
          const topicResponse = await axios.get(`/api/topic-content/${slug}`);
          if (topicResponse.data.data && topicResponse.data.data.length > 0) {
            const topicData = topicResponse.data.data[0];
            const fetchedTitle = topicData.title || 'Topic';
            setTopicTitle(fetchedTitle);
          } else {
            setTopicTitle('Topic');
          }
        } catch (titleError) {
          console.warn('Failed to fetch topic title:', titleError.message);
          setTopicTitle('Topic');
        }

        // 2. Get due cards from the same endpoint that works for HippocampusHustle
        try {
          console.log(
            `Fetching due cards for user ${currentUser.id} and topic ${slug}`
          );
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/topic-cards-due/${slug}`,
            { params: { userId: currentUser.id } }
          );

          console.log('Due cards response:', response.data);

          // Store the actual cards array for reference
          const cards = response.data.data || [];
          setDueCards(cards);

          console.log(`Found ${cards.length} due cards`);
        } catch (dueError) {
          console.error('Failed to fetch due cards:', dueError);
          setError(`Error loading due cards: ${dueError.message}`);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser, slug]);

  // Read settings from localStorage if they exist
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('studySettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setCardLimit(settings.cardLimit || 10);
        setIncludeNewCards(
          settings.includeNewCards !== undefined
            ? settings.includeNewCards
            : true
        );
        setEnableTimer(settings.enableTimer || false);
      }
    } catch (error) {
      console.warn('Error reading saved settings:', error);
    }
  }, []);

  const startStudySession = () => {
    // Save settings in localStorage
    localStorage.setItem(
      'studySettings',
      JSON.stringify({
        cardLimit,
        includeNewCards,
        enableTimer,
      })
    );

    // Navigate to the actual card review page
    navigate(`/hippocampus-hustle/${slug}`);
  };

  // Increase card limit
  const increaseLimit = () => {
    setCardLimit((prev) => Math.min(prev + 5, 50));
  };

  // Decrease card limit
  const decreaseLimit = () => {
    setCardLimit((prev) => Math.max(prev - 5, 5));
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-b ${bgGradient} ${textColor} font-sans`}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className='flex flex-col justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4'></div>
          <p className={secondaryTextColor}>Loading study dashboard...</p>
        </div>
      </div>
    );
  }

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
            <h2 className='text-xl font-bold mb-2 text-red-400'>Error</h2>
            <p className={secondaryTextColor}>{error}</p>
            <Link
              to='/knowledge-map'
              className={`mt-6 inline-block ${primaryButtonBg} text-white px-4 py-2 rounded-md transition`}
            >
              Return to Mind Map
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${bgGradient} ${textColor} font-sans`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <h1 className={`text-3xl font-bold ${headingColor} drop-shadow-md`}>
            Hippocampus Hustle
          </h1>
          <p className={darkMode ? 'text-indigo-200' : 'text-indigo-600'}>
            Master key concepts and ace your exams with spaced repetition.
          </p>
          <h2 className={`text-xl font-semibold mt-4 ${highlightColor}`}>
            {topicTitle}
          </h2>
          <div className='mt-4'>
            <span
              className={`${
                darkMode ? 'bg-indigo-600' : 'bg-indigo-500'
              } px-4 py-1 rounded-full text-sm text-white`}
            >
              {dueCards.length} cards available to study now
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          {/* Due Today */}
          <div
            className={`${cardBgColor} rounded-lg p-6 relative overflow-hidden shadow-md`}
          >
            <div
              className={`absolute top-4 right-4 ${
                darkMode ? 'text-indigo-400' : 'text-indigo-500'
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            </div>
            <h3 className={`${mutedTextColor} text-sm mb-2`}>Due Today</h3>
            <p className={`text-4xl font-bold ${headingColor}`}>
              {dueCards.length}
            </p>
            <p className={`text-sm ${mutedTextColor} mt-1`}>
              Cards to review now
            </p>
          </div>

          {/* Due Tomorrow - PLACEHOLDER */}
          <div
            className={`${cardBgColor} rounded-lg p-6 relative overflow-hidden shadow-md`}
          >
            <div
              className={`absolute top-4 right-4 ${
                darkMode ? 'text-blue-400' : 'text-blue-500'
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h3 className={`${mutedTextColor} text-sm mb-2`}>Due Tomorrow</h3>
            <p className={`text-4xl font-bold ${headingColor}`}>0</p>
            <p className={`text-sm ${mutedTextColor} mt-1`}>Coming up next</p>
          </div>

          {/* New Cards - PLACEHOLDER */}
          <div
            className={`${cardBgColor} rounded-lg p-6 relative overflow-hidden shadow-md`}
          >
            <div
              className={`absolute top-4 right-4 ${
                darkMode ? 'text-green-400' : 'text-green-500'
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </div>
            <h3 className={`${mutedTextColor} text-sm mb-2`}>New Cards</h3>
            <p
              className={`text-4xl font-bold ${
                darkMode ? 'text-green-400' : 'text-green-500'
              }`}
            >
              0
            </p>
            <p className={`text-sm ${mutedTextColor} mt-1`}>
              Fresh content to learn
            </p>
          </div>
        </div>

        {/* Additional Stats - PLACEHOLDERS */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
          {/* Overall Accuracy */}
          <div
            className={`${cardBgColor} rounded-lg p-6 relative overflow-hidden shadow-md`}
          >
            <div
              className={`absolute top-4 right-4 ${
                darkMode ? 'text-yellow-500' : 'text-yellow-600'
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h3 className={`${mutedTextColor} text-sm mb-2`}>
              Overall Accuracy
            </h3>
            <p className={`text-4xl font-bold ${headingColor}`}>0%</p>
            <p className={`text-sm ${mutedTextColor} mt-1`}>Correct answers</p>
          </div>

          {/* Best Streak */}
          <div
            className={`${cardBgColor} rounded-lg p-6 relative overflow-hidden shadow-md`}
          >
            <div
              className={`absolute top-4 right-4 ${
                darkMode ? 'text-red-400' : 'text-red-500'
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                />
              </svg>
            </div>
            <h3 className={`${mutedTextColor} text-sm mb-2`}>Best Streak</h3>
            <p className={`text-4xl font-bold ${headingColor}`}>0</p>
            <p className={`text-sm ${mutedTextColor} mt-1`}>
              Consecutive correct answers
            </p>
          </div>
        </div>

        {/* Study Session Settings */}
        <div className={`${cardBgColor} rounded-lg p-6 mb-8 shadow-md`}>
          <div className='flex items-center mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`h-6 w-6 ${
                darkMode ? 'text-indigo-400' : 'text-indigo-500'
              } mr-2`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            <h3 className={`text-lg font-semibold ${headingColor}`}>
              Study Session Settings
            </h3>
          </div>

          {/* Card Limit */}
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-5 w-5 ${mutedTextColor} mr-2`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                />
              </svg>
              <span className={`text-sm ${secondaryTextColor}`}>
                Card Limit
              </span>
            </div>

            <div className='flex items-center'>
              <button
                onClick={decreaseLimit}
                className={`${controlBg} rounded-l-md w-8 h-8 flex items-center justify-center`}
              >
                -
              </button>
              <div
                className={`${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                } w-12 h-8 flex items-center justify-center ${textColor}`}
              >
                {cardLimit}
              </div>
              <button
                onClick={increaseLimit}
                className={`${controlBg} rounded-r-md w-8 h-8 flex items-center justify-center`}
              >
                +
              </button>
            </div>
          </div>

          {/* Include New Cards */}
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-5 w-5 ${mutedTextColor} mr-2`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
              <span className={`text-sm ${secondaryTextColor}`}>
                Include New Cards
              </span>
            </div>

            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                className='sr-only peer'
                checked={includeNewCards}
                onChange={() => setIncludeNewCards(!includeNewCards)}
              />
              <div
                className={`w-11 h-6 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:${
                  darkMode ? 'bg-indigo-600' : 'bg-indigo-500'
                }`}
              ></div>
            </label>
          </div>

          {/* Enable Timer */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-5 w-5 ${mutedTextColor} mr-2`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span className={`text-sm ${secondaryTextColor}`}>
                Enable Timer
              </span>
            </div>

            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                className='sr-only peer'
                checked={enableTimer}
                onChange={() => setEnableTimer(!enableTimer)}
              />
              <div
                className={`w-11 h-6 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-300'
                } peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:${
                  darkMode ? 'bg-indigo-600' : 'bg-indigo-500'
                }`}
              ></div>
            </label>
          </div>
        </div>

        {/* Start Button */}
        <div className='text-center'>
          <button
            onClick={startStudySession}
            className={`${primaryButtonBg} text-white px-8 py-3 rounded-md text-lg font-semibold transition duration-150 ease-in-out shadow-lg flex items-center justify-center mx-auto`}
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
                strokeWidth={2}
                d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            Start Study Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyDashboard;
