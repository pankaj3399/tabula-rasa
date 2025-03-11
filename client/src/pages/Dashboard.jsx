// client/src/pages/Dashboard.jsx
import React from 'react';
import Header from '../components/Header';
import WelcomeSection from '../components/WelcomeSection';
import StudyPlan from '../components/StudyPlan';
import ContinueLearning from '../components/ContinueLearning';
import TodaysSchedule from '../components/TodaysSchedule';
import QuickActions from '../components/QuickActions';
import UpcomingTests from '../components/UpcomingTests';
import PANCEBlueprintProgress from '../components/PANCEBlueprintProgress';
import RecommendedTopics from '../components/RecommendedTopics'; // You'll need to create this component

const Dashboard = ({ darkMode, setDarkMode }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto px-4 max-w-7xl py-6">
        <WelcomeSection />
        <StudyPlan />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ContinueLearning />
          <TodaysSchedule />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <QuickActions />
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