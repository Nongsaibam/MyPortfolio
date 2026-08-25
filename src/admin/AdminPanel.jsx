import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePortfolioData } from "../context/PortfolioContext";

// Tabs
import ProjectsTab from "./tabs/ProjectsTab";
import CertificatesTab from "./tabs/CertificatesTab";
import ExperienceTab from "./tabs/ExperienceTab";
import SkillsTab from "./tabs/SkillsTab";
import ActivitiesTab from "./tabs/ActivitiesTab";
import ThemeSettingsTab from "./tabs/ThemeSettingsTab";
import ProfileBioTab from "./tabs/ProfileBioTab";
import AboutContactTab from "./tabs/AboutContactTab";
import ChatbotTab from "./tabs/ChatbotTab";
import GarbageCollectorTab from "./tabs/GarbageCollectorTab";
import SeoSettingsTab from "./tabs/SeoSettingsTab";

import {
  HiOutlineSquares2X2,
  HiOutlineFolder,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineCpuChip,
  HiOutlineSparkles,
  HiOutlinePaintBrush,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftRight,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineArrowSmallLeft,
  HiOutlineArrowPath,
  HiOutlineTrash,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { logout } = useAuth();
  const { siteSettings, projects, certificates, experiences, skills, activities, resetAllData } = usePortfolioData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all portfolio data back to default values? Any custom items will be cleared."
      )
    ) {
      resetAllData();
      alert("All data reset to defaults!");
    }
  };

  const navItems = [
    { id: "overview", label: "Dashboard", icon: HiOutlineSquares2X2 },
    { id: "theme", label: "Appearance & Theme", icon: HiOutlinePaintBrush },
    { id: "profile", label: "Profile & Hero", icon: HiOutlineUser },
    { id: "about-contact", label: "About & Contact", icon: HiOutlineDocumentText },
    { id: "seo-settings", label: "SEO & Social Sharing", icon: HiOutlineGlobeAlt },
    { id: "projects", label: "Projects", icon: HiOutlineFolder, count: projects.length },
    { id: "certificates", label: "Certificates", icon: HiOutlineAcademicCap, count: certificates.length },
    { id: "experience", label: "Experience", icon: HiOutlineBriefcase, count: experiences.length },
    { id: "skills", label: "Skills", icon: HiOutlineCpuChip, count: skills.length },
    { id: "activities", label: "Activities", icon: HiOutlineSparkles, count: activities.length },
    { id: "chatbot", label: "AI Chatbot", icon: HiOutlineChatBubbleLeftRight },
    { id: "garbage-collector", label: "Garbage Collector 🧹", icon: HiOutlineTrash },
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-60 border-b md:border-b-0 md:border-r border-black/10 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-cyan-500/20">
                {siteSettings.logoText || "A"}
              </div>
              <div>
                <h1 className="font-bold text-xs leading-none">Admin Panel</h1>
                <span className="text-[10px] text-cyan-400 font-mono">Full Control</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex md:flex-col overflow-x-auto pb-2 md:pb-0 gap-1.5 md:space-y-0.5 no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`shrink-0 md:w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600/90 to-cyan-600/90 text-white shadow-lg shadow-cyan-500/10"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="mt-4 pt-3 border-t border-white/10 space-y-1">
          <Link
            to="/"
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition"
          >
            <HiOutlineArrowSmallLeft className="h-4 w-4" />
            <span>Public Site</span>
          </Link>

          <button
            onClick={handleReset}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-amber-400/80 hover:bg-amber-500/10 hover:text-amber-300 transition"
          >
            <HiOutlineArrowPath className="h-4 w-4" />
            <span>Reset Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400/80 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <HiOutlineArrowLeftOnRectangle className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-7xl">
        {/* Render Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Current Font</span>
                  <div className="h-9 w-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                    <HiOutlinePaintBrush className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 text-2xl font-bold text-white">{siteSettings.fontFamily}</div>
                <button
                  onClick={() => setActiveTab("theme")}
                  className="mt-3 text-xs text-violet-400 hover:underline inline-flex items-center gap-1"
                >
                  Change font & color theme &rarr;
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Profile Name</span>
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <HiOutlineUser className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 text-xl font-bold text-white truncate">{siteSettings.name}</div>
                <button
                  onClick={() => setActiveTab("profile")}
                  className="mt-3 text-xs text-cyan-400 hover:underline inline-flex items-center gap-1"
                >
                  Edit profile & hero text &rarr;
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Total Projects</span>
                  <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <HiOutlineFolder className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-bold text-white">{projects.length}</div>
                <button
                  onClick={() => setActiveTab("projects")}
                  className="mt-3 text-xs text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  Manage projects &rarr;
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Total Certificates</span>
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <HiOutlineAcademicCap className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-bold text-white">{certificates.length}</div>
                <button
                  onClick={() => setActiveTab("certificates")}
                  className="mt-3 text-xs text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  Manage certificates &rarr;
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Experience Items</span>
                  <div className="h-9 w-9 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                    <HiOutlineBriefcase className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-bold text-white">{experiences.length}</div>
                <button
                  onClick={() => setActiveTab("experience")}
                  className="mt-3 text-xs text-pink-400 hover:underline inline-flex items-center gap-1"
                >
                  Manage timeline &rarr;
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Skill Groups</span>
                  <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <HiOutlineCpuChip className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-bold text-white">{skills.length}</div>
                <button
                  onClick={() => setActiveTab("skills")}
                  className="mt-3 text-xs text-amber-400 hover:underline inline-flex items-center gap-1"
                >
                  Manage skill categories &rarr;
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Total Activities</span>
                  <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <HiOutlineSparkles className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-bold text-white">{activities.length}</div>
                <button
                  onClick={() => setActiveTab("activities")}
                  className="mt-3 text-xs text-purple-400 hover:underline inline-flex items-center gap-1"
                >
                  Manage activities &rarr;
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">AI Chatbot</span>
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-3xl font-bold text-white">
                    {siteSettings?.chatbotSettings?.enabled !== false ? "Active" : "Off"}
                  </span>
                  <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-300">
                    {siteSettings?.chatbotSettings?.qaPairs?.length || 5} Q&A
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab("chatbot")}
                  className="mt-3 text-xs text-cyan-400 hover:underline inline-flex items-center gap-1"
                >
                  Configure assistant &rarr;
                </button>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Garbage Collector</span>
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <HiOutlineTrash className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-3xl font-bold text-emerald-400">Clean</span>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                    Memory Ready
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab("garbage-collector")}
                  className="mt-3 text-xs text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  Run Garbage Collector 🧹 &rarr;
                </button>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">SEO & Social Sharing</span>
                  <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <HiOutlineGlobeAlt className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-3xl font-bold text-blue-400">Optimized</span>
                  <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-blue-300">
                    Google Ready
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab("seo-settings")}
                  className="mt-3 text-xs text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  Manage SEO Meta Tags &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "theme" && <ThemeSettingsTab />}
        {activeTab === "profile" && <ProfileBioTab />}
        {activeTab === "about-contact" && <AboutContactTab />}
        {activeTab === "seo-settings" && <SeoSettingsTab />}
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "certificates" && <CertificatesTab />}
        {activeTab === "experience" && <ExperienceTab />}
        {activeTab === "skills" && <SkillsTab />}
        {activeTab === "activities" && <ActivitiesTab />}
        {activeTab === "chatbot" && <ChatbotTab />}
        {activeTab === "garbage-collector" && <GarbageCollectorTab />}
      </main>
    </div>
  );
};

export default AdminPanel;
