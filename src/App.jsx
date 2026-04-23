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
import AIChatbot from "./components/AIChatbot";
import Projects, { ProjectDetailsPage } from "./components/Projects";


// Home Page
const Home = () => (
  <>
    <ProfilePage />
    <AboutMe />
    <ExperienceSection />
    <Projects/>
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
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
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
