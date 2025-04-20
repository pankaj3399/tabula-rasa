import React, { useState, useEffect } from "react";
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

const SubtopicContent = ({ darkMode, setDarkMode }) => {
  const { id, slug } = useParams();
  const { currentUser } = useAuth();
  const [subtopic, setSubtopic] = useState(null);
  const [notes, setNotes] = useState("");
  const [activePage, setActivePage] = useState("Page 1");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const subtopicId = id || slug;

  useEffect(() => {
    console.log(`Fetching subtopic content for ID: ${subtopicId}`);
    setLoading(true);
    
    axios
      .get(`${import.meta.env.VITE_API_URL}/subtopic-content/${subtopicId}`)
      .then((response) => {
        console.log("Subtopic Content Response:", JSON.stringify(response.data, null, 2));
        if (!response.data.data) {
          throw new Error("Subtopic not found");
        }
        const subtopicData = response.data.data;
        setSubtopic({
          id: subtopicData.documentId,
          title: subtopicData.title,
          content: subtopicData.content,
        });
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching subtopic content:", {
          message: error.message,
          response: error.response ? error.response.data : "No response",
          status: error.response ? error.response.status : "Unknown",
        });
        setError(
          error.response?.status === 404
            ? "Subtopic not found. Please check the ID or ensure it is published."
            : "Failed to load subtopic content. Please try again later."
        );
      })
      .finally(() => setLoading(false));

    if (currentUser) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/subtopic-notes`, {
          params: { userId: currentUser.id, subtopicId },
        })
        .then((response) => {
          setNotes(response.data.notes || "");
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    }
  }, [subtopicId, currentUser]);

  const handleNotesChange = (value) => {
    setNotes(value);
  };

  const saveNotes = async () => {
    if (!currentUser) {
      alert("Please log in to save notes.");
      return;
    }
    
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/update-subtopic-notes`,
        {
          userId: currentUser.id,
          subtopicId,
          notes,
        }
      );
      alert("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
      alert("Failed to save notes.");
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/knowledge-map" className="text-blue-400 hover:text-blue-300 transition flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Mind Map
          </Link>
          <div className="flex items-center">
            <span className="text-gray-400 mr-3">Tabula Rasa</span>
            <Link
              to={`/hippocampus-hustle/${subtopic.id}`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center transition"
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

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-purple-300 border-b border-gray-700 pb-3">{subtopic.title}</h2>
              <div className="prose prose-invert max-w-none">
                {renderContent(subtopic.content)}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg sticky top-20">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Notes
              </h2>
              
              <div className="flex justify-between items-center mb-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition">
                  {activePage}
                </button>
                <button className="text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 px-4 py-2 rounded-md transition flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Page
                </button>
              </div>
              
              <div className="mb-4 bg-gray-700 bg-opacity-50 rounded-md">
                <ReactQuill
                  theme="snow"
                  value={notes}
                  onChange={handleNotesChange}
                  className="custom-quill bg-gray-700 text-white rounded-md"
                  style={{ minHeight: "200px", marginBottom: '40px' }}
                />
              </div>
              
              <button
                onClick={saveNotes}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md w-full flex items-center justify-center transition"
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
  );
};

export default SubtopicContent;