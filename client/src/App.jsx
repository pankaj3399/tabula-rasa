import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import KnowledgeMap from './pages/KnowledgeMap';
import SubtopicContent from './pages/TopicContent';
import HippocampusHustle from './pages/HippocampusHustle';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import TopicContent from './pages/TopicContent';
import StudyDashboard from './components/StudyDashboard';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/knowledge-map"
          element={
            <ProtectedRoute>
              <KnowledgeMap darkMode={darkMode} setDarkMode={setDarkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topic/:slug"
          element={
            <ProtectedRoute>
              <TopicContent darkMode={darkMode} setDarkMode={setDarkMode} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hippocampus-hustle/:slug"
          element={
            <ProtectedRoute>
              <HippocampusHustle darkMode={darkMode} setDarkMode={setDarkMode} />
            </ProtectedRoute>
          }
        />
        <Route
  path="/study-dashboard/:slug"
  element={
    <ProtectedRoute>
      <StudyDashboard darkMode={darkMode} setDarkMode={setDarkMode} />
    </ProtectedRoute>
  }
/>
      </Routes>
    </AuthProvider>
  );
};

export default App;