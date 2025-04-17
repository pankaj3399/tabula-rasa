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
        <p key={index} className="text-gray-300 mb-4">
          {block.children.map((child, childIndex) => child.text).join("")}
        </p>
      );
    }
    return null;
  });
};

const SubtopicContent = ({ darkMode, setDarkMode }) => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [subtopic, setSubtopic] = useState(null);
  const [notes, setNotes] = useState("");
  const [activePage, setActivePage] = useState("Page 1");
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Fetching subtopic content for ID: ${id}`);
    axios
      .get(`${import.meta.env.VITE_API_URL}/subtopic-content/${id}`)
      .then((response) => {
        console.log(
          "Subtopic Content Response:",
          JSON.stringify(response.data, null, 2)
        );
        if (!response.data.data) {
          throw new Error("Subtopic not found");
        }
        const subtopicData = response.data.data;
        setSubtopic({
          id: subtopicData.id,
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
        console.log(error, "hiiii");
        setError(
          error.response?.status === 404
            ? "Subtopic not found. Please check the ID or ensure it is published."
            : "Failed to load subtopic content. Please try again later."
        );
      });

    if (currentUser) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/subtopic-notes`, {
          params: { userId: currentUser.id, subtopicId: id },
        })
        .then((response) => {
          setNotes(response.data.notes || "");
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    }
  }, [id, currentUser]);

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
          subtopicId: id,
          notes,
        }
      );
      alert("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
      alert("Failed to save notes.");
    }
  };

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!subtopic)
    return <div className="text-center py-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex">
        <div className="w-2/4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/knowledge-map" className="text-blue-400 hover:underline">
              ← Back to Mind Map
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Tabula Rasa</span>
              <Link
                to={`/hippocampus-hustle/${subtopic.id}`}
                className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center"
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

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{subtopic.title}</h2>
            <div className="mb-6">{renderContent(subtopic.content)}</div>
          </div>
        </div>

        <div className="w-1/4 pl-6">
          <div className="bg-gray-800 p-6 rounded-lg sticky top-20">
            <h2 className="text-xl font-bold mb-4">Notes</h2>
            <div className="flex justify-between items-center mb-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
                {activePage}
              </button>
              <button className="text-gray-400 border border-gray-600 px-4 py-2 rounded-md">
                Add Page
              </button>
            </div>
            <ReactQuill
              theme="snow"
              value={notes}
              onChange={handleNotesChange}
              className="bg-gray-700 text-white rounded-md"
              style={{ height: "300px", marginBottom: "50px" }}
            />
            <button
              onClick={saveNotes}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md w-full"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubtopicContent;
