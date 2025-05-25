import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import KnowledgeMap from './pages/KnowledgeMap';
import SubtopicContent from './pages/TopicContent';
import HippocampusHustle from './pages/HippocampusHustle';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import TopicContent from './pages/TopicContent';
import StudyDashboard from './components/StudyDashboard';

// ✅ FIXED: ProtectedRoute now handles loading state properly
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  console.log('[ProtectedRoute] Auth state:', { 
    hasUser: !!currentUser, 
    loading,
    userEmail: currentUser?.email 
  });

  // ✅ Show loading spinner while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // ✅ Only redirect if auth is done loading AND user is not authenticated
  if (!currentUser) {
    console.log('[ProtectedRoute] No user found, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('[ProtectedRoute] User authenticated, rendering protected content');
  return children;
};

// ✅ FIXED: Keep your original structure but fix ProtectedRoute
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