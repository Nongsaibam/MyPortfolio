import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing Components
import ProfilePage from "./components/ProfilePage";
import AboutMe from "./components/AboutMe";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import GetInTouch from "./components/GetInTouch";
import CertificatesWithDetail from "./components/CertificatesWithDetail";

const App = () => {
  return (
    <Router>
      <div className="font-sans bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <Routes>
          {/* ✅ Home page with all static sections */}
          <Route
            path="/"
            element={
              <>
                <ProfilePage />
                <AboutMe />
                <ExperienceSection />
                <SkillsSection />
                <GetInTouch />
              </>
            }
          />

        <Route path="/certificates" element={<CertificatesWithDetail />} />
<Route path="/certificates/:id" element={<CertificatesWithDetail />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
