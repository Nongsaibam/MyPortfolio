// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout";
import ProfilePage from "./components/ProfilePage";
import AboutMe from "./components/AboutMe";
import ExperienceSection from "./components/experienceSection";
import SkillsSection from "./components/SkillsSection";
import ActivitiesSection from "./components/ActivitiesSection";
import GetInTouch from "./components/GetInTouch";
import CertificatesWithDetail from "./components/CertificatesWithDetail";
import FeaturedProjects from "./components/FeaturedProjects";
import AIChatbot from "./components/AIChatbot";


// Home Page
const Home = () => (
  <>
    <ProfilePage />
    <AboutMe />
    <ExperienceSection />
    <FeaturedProjects />
    <ActivitiesSection />
    <SkillsSection />
    <GetInTouch />
  </>
);

const App = () => {
  return (
    <Router>

      {/* Main layout with relative positioning */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificates" element={<CertificatesWithDetail />} />
          <Route path="/certificates/:id" element={<CertificatesWithDetail />} />
        </Routes>

        {/* Global AI Chatbot */}
        <AIChatbot />
      </Layout>
    </Router>
  );
};

export default App;
