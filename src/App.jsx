import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";

// Immediate Core Layout
import Layout from "./components/Layout";
import ProfilePage from "./components/ProfilePage";
import AboutMe from "./components/AboutMe";
import ExperienceSection from "./components/experienceSection";
import SkillsSection from "./components/SkillsSection";
import ActivitiesSection from "./components/ActivitiesSection";
import GetInTouch from "./components/GetInTouch";
import AIChatbot from "./components/AIChatbot";
import ScrollToTop from "./components/ScrollToTop";

// Lazy Loaded Routes (Code Splitting for Ultra-Low RAM & Fast Bundle Load)
const Projects = lazy(() => import("./components/Projects"));
const ProjectDetailsPage = lazy(() =>
  import("./components/Projects").then((m) => ({ default: m.ProjectDetailsPage }))
);
const CertificatesWithDetail = lazy(() => import("./components/CertificatesWithDetail"));
const AdminPanel = lazy(() => import("./admin/AdminPanel"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const ProtectedRoute = lazy(() => import("./admin/ProtectedRoute"));

// Minimal Loading Fallback to reduce render overhead
const LoadingFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center p-8">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
  </div>
);

// Home Page
const Home = () => (
  <>
    <ProfilePage />
    <AboutMe />
    <ExperienceSection />
    <Suspense fallback={<LoadingFallback />}>
      <Projects />
    </Suspense>
    <ActivitiesSection />
    <SkillsSection />
    <GetInTouch />
  </>
);

const App = () => {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />

              {/* Public Portfolio Routes */}
              <Route
                path="*"
                element={
                  <Layout>
                    <Suspense fallback={<LoadingFallback />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
                        <Route path="/certificates" element={<CertificatesWithDetail />} />
                        <Route path="/certificates/:id" element={<CertificatesWithDetail />} />
                      </Routes>
                    </Suspense>
                    <AIChatbot />
                    <ScrollToTop />
                  </Layout>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
};

export default App;
