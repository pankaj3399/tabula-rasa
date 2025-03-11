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

const Dashboard = ({ darkMode, setDarkMode }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-white"> {/* Force full white background */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl py-4"> {/* Match header width */}
        <WelcomeSection />
        <StudyPlan />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <ContinueLearning />
          <TodaysSchedule />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <QuickActions />
          <UpcomingTests />
        </div>
        <PANCEBlueprintProgress />
      </div>
    </div>
  );
};

export default Dashboard;