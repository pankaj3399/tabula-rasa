import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

const HippocampusHustle = ({ darkMode, setDarkMode }) => {
  const { slug } = useParams();
  const { currentUser } = useAuth();
  const [dueCards, setDueCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setError('Please log in to access Hippocampus Hustle.');
      return;
    }

    // Fetch due card IDs
    axios
      .get(`${import.meta.env.VITE_API_URL}/due-cards`, {
        params: { userId: currentUser.id },
      })
      .then(response => {
        const dueCardIds = response.data.dueCardIds;
        if (dueCardIds.length === 0) {
          setError('No cards due for review.');
          return;
        }

        // Fetch card content
        axios
          .post(`${import.meta.env.VITE_API_URL}/cards`, { ids: dueCardIds })
          .then(cardResponse => {
            setDueCards(cardResponse.data.data);
          })
          .catch(cardError => {
            console.error('Error fetching cards:', cardError);
            setError('Failed to load cards.');
          });
      })
      .catch(error => {
        console.error('Error fetching due cards:', error);
        setError('Failed to load due cards.');
      });
  }, [currentUser]);

  const handleQualityRating = async quality => {
    const currentCard = dueCards[currentCardIndex];
    if (!currentCard) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/update-card-progress`, {
        userId: currentUser.id,
        cardId: currentCard.id,
        quality,
      });

      if (currentCardIndex < dueCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setShowAnswer(false);
      } else {
        setError('No more cards to review.');
        setDueCards([]);
      }
    } catch (error) {
      console.error('Error updating card progress:', error);
      setError('Failed to update card progress.');
    }
  };

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (dueCards.length === 0) return <div className="text-center py-10 text-white">Loading...</div>;

  const currentCard = dueCards[currentCardIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <Link to={`/topic/${slug}`} className="text-blue-400 hover:underline">
            ← Back to Topic
          </Link>
          <h1 className="text-2xl font-bold">Hippocampus Hustle</h1>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4">Ready to train your memory?</h2>
          <p className="text-gray-400 mb-4">
            Master key concepts and ace your exams with spaced repetition.
          </p>
          <p className="text-lg mb-4">{dueCards.length} cards available to study now</p>

          <div className="bg-gray-700 p-4 rounded-md mb-4">
            <div
              className="text-gray-300"
              dangerouslySetInnerHTML={{ __html: currentCard.attributes.question_text }}
            />
            {showAnswer && (
              <>
                <p className="mt-4"><strong>Answer:</strong> {currentCard.attributes.correct_answer}</p>
                <div
                  className="text-gray-300 mt-2"
                  dangerouslySetInnerHTML={{ __html: currentCard.attributes.explanation }}
                />
              </>
            )}
            {!showAnswer && (
              <button
                onClick={() => setShowAnswer(true)}
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md"
              >
                Show Answer
              </button>
            )}
          </div>

          {showAnswer && (
            <div className="mt-4">
              <p className="mb-2">How well did you know this?</p>
              <div className="flex justify-center space-x-2">
                {[0, 1, 2, 3, 4, 5].map(quality => (
                  <button
                    key={quality}
                    onClick={() => handleQualityRating(quality)}
                    className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-500"
                  >
                    {quality}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HippocampusHustle;