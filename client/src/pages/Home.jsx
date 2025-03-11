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

const Home = ({ darkMode, setDarkMode }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

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

  const openSignUpModal = () => {
    setShowSignUpModal(true);
    setShowLoginModal(false); // Ensure login modal is closed
    document.body.style.overflow = 'hidden';
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
    document.body.style.overflow = '';
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignUpModal(false); // Ensure signup modal is closed
    document.body.style.overflow = 'hidden';
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="relative min-h-screen">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} openSignUpModal={openSignUpModal} openLoginModal={openLoginModal} />
      <div className={(showSignUpModal || showLoginModal) ? 'opacity-75 pointer-events-none' : ''}>
        <HeroSection openModal={openSignUpModal} />
        <HowItWorks />
        <PanceAlignment />
        <FeatureTabs />
        <FAQSection />
        <BetaFeature openModal={openSignUpModal} />
        <CTASection openModal={openSignUpModal} />
        <Footer />
        {showStickyCTA && <StickyCTA openModal={openSignUpModal} />}
      </div>
      {showSignUpModal && <SignUpModal closeModal={closeSignUpModal} />}
      {showLoginModal && <LoginModal closeModal={closeLoginModal} />}
    </div>
  );
};

export default Home;