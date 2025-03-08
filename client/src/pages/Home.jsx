// client/src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import PanceAlignment from '../components/PanceAlignment';
import FeatureTabs from '../components/FeatureTabs';
import FAQSection from '../components/FAQSection';
import BetaFeature from '../components/BetaFeature';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import SignUpModal from '../components/SignUpModal';
import LoginModal from '../components/LoginModal';
import StickyCTA from '../components/StickyCTA';
import { useAuth } from '../contexts/AuthContext';

const Home = ({ darkMode, setDarkMode }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setShowDashboard(true);
    } else {
      setShowDashboard(false);
    }
  }, [currentUser]);

  const openSignUpModal = () => {
    setShowSignUpModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
    if (!showLoginModal && !showDashboard) {
      document.body.style.overflow = '';
    }
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    if (!showSignUpModal && !showDashboard) {
      document.body.style.overflow = '';
    }
  };

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <div className="relative min-h-screen">
      <Header
        openSignUpModal={openSignUpModal}
        openLoginModal={openLoginModal}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        toggleDashboard={toggleDashboard}
        showDashboard={showDashboard}
        setShowDashboard={setShowDashboard}
      />
      <div className={(showSignUpModal || showLoginModal) ? 'opacity-50 pointer-events-none' : ''}>
        {showDashboard ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold dark:text-white">Welcome to Your Dashboard</h1>
            <p className="mt-4 dark:text-gray-300">
              This is your personalized dashboard. Start exploring your learning tools and track your progress!
            </p>
          </div>
        ) : (
          <>
            <HeroSection openModal={openSignUpModal} />
            <HowItWorks />
            <PanceAlignment />
            <FeatureTabs />
            <FAQSection />
            <BetaFeature openModal={openSignUpModal} />
            <CTASection openModal={openSignUpModal} />
            <Footer />
            {showStickyCTA && <StickyCTA openModal={openSignUpModal} />}
          </>
        )}
      </div>
      {showSignUpModal && <SignUpModal closeModal={closeSignUpModal} setShowDashboard={setShowDashboard} />}
      {showLoginModal && <LoginModal closeModal={closeLoginModal} setShowDashboard={setShowDashboard} />}
    </div>
  );
};

export default Home;