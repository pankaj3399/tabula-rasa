import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import WelcomeSection from '../components/WelcomeSection';
import StudyPlan from '../components/StudyPlan';
import ContinueLearning from '../components/ContinueLearning';
import TodaysSchedule from '../components/TodaysSchedule';
import QuickActions from '../components/QuickActions';
import UpcomingTests from '../components/UpcomingTests';
import PANCEBlueprintProgress from '../components/PANCEBlueprintProgress';
import RecommendedTopics from '../components/RecommendedTopics';

const Dashboard = ({ darkMode, setDarkMode }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto px-4 max-w-7xl py-4">
        <WelcomeSection />
        <div className="mt-4">
          <StudyPlan />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ContinueLearning />
          <TodaysSchedule />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <QuickActions />
            <div className="mt-4">
              <Link
                to="/hippocampus-hustle/cardiomyopathies" // Adjust slug as needed
                className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
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
          <UpcomingTests />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <PANCEBlueprintProgress />
          </div>
          <div>
            <RecommendedTopics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;