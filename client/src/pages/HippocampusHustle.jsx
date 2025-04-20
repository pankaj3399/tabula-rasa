import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";

const HippocampusHustle = ({ darkMode, setDarkMode }) => {
  const { slug } = useParams();
  const { currentUser } = useAuth();
  const [dueCards, setDueCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setError("Please log in to access Hippocampus Hustle.");
      return;
    }

    const initializeCards = async () => {
      try {
        // Fetch due card IDs
        const dueResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/due-cards`,
          {
            params: { userId: currentUser.id },
          }
        );
        let dueCardIds = dueResponse.data.dueCardIds;
        console.log("Due Card IDs:", dueCardIds);

        if (dueCardIds.length === 0) {
          // Initialize with cards from topic if none due
          const topicResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/topic-content/${slug}`
          );
          const cards = topicResponse.data.data[0]?.attributes?.cards?.data || [];
          dueCardIds = cards.map((card) => card.id);

          if (dueCardIds.length > 0) {
            await axios.post(
              `${import.meta.env.VITE_API_URL}/update-card-progress`,
              {
                userId: currentUser.id,
                cardId: dueCardIds[0],
                quality: 0,
              }
            );
            dueCardIds = [dueCardIds[0]];
          } else {
            setError("No cards available for this topic.");
            return;
          }
        }

        // Fetch card content with GET request
        const params = new URLSearchParams();
        dueCardIds.forEach((id, index) => {
          params.append("filters[id][$in]", id); // Simplified to a single array parameter
        });
        params.append("populate", "topic");
        params.append("publicationState", "live");

        const cardResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/cards`,
          {
            params,
          }
        );
        console.log("Fetched Cards:", cardResponse.data.data);
        const cards = cardResponse.data.data.map((card) => ({
          id: card.id,
          ...card.attributes,
        }));
        setDueCards(cards);
      } catch (error) {
        console.error("Error in Hippocampus Hustle setup:", error);
        setError(
          error.response?.status === 400
            ? "Invalid request. Please check the card IDs."
            : "Failed to load due cards or initialize progress."
        );
      }
    };

    initializeCards();
  }, [currentUser, slug]);

  const handleQualityRating = async (quality) => {
    const currentCard = dueCards[currentCardIndex];
    if (!currentCard) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/update-card-progress`,
        {
          userId: currentUser.id,
          cardId: currentCard.id,
          quality,
        }
      );

      if (currentCardIndex < dueCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setShowAnswer(false);
      } else {
        setError("No more cards to review.");
        setDueCards([]);
      }
    } catch (error) {
      console.error("Error updating card progress:", error);
      setError("Failed to update card progress.");
    }
  };

  if (error)
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p className="text-red-400">{error}</p>
            <Link
              to="/knowledge-map"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Return to Mind Map
            </Link>
          </div>
        </div>
      </div>
    );
  if (dueCards.length === 0)
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );

  const currentCard = dueCards[currentCardIndex];
  console.log("Current Card:", currentCard);

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
              dangerouslySetInnerHTML={{
                __html: currentCard.question_text || "No question available",
              }}
            />
            {showAnswer && (
              <>
                <p className="mt-4">
                  <strong>Answer:</strong>{" "}
                  {currentCard.correct_answer || "No answer available"}
                </p>
                <div
                  className="text-gray-300 mt-2"
                  dangerouslySetInnerHTML={{
                    __html: currentCard.explanation || "No explanation available",
                  }}
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
                {[0, 1, 2, 3, 4, 5].map((quality) => (
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