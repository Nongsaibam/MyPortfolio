import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope, FaReact, FaNodeJs, FaCode, FaRocket, FaUsers, FaTrophy } from "react-icons/fa6";
import {
  HiMiniMoon,
  HiMiniSun,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineDocumentArrowDown,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { useTheme } from "../context/ThemeContext";
import { usePortfolioData } from "../context/PortfolioContext";
import tkImage from "../assets/1736923031405.jpg";

import { resolveImagePath } from "../utils/imageCompressor";
import SEO from "./SEO";

const ProfilePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { siteSettings } = usePortfolioData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isAvatarTouched, setIsAvatarTouched] = React.useState(false);
  const navItems = ["About", "Experience", "Projects", "Skills"];

  const handleAvatarTouch = () => {
    setIsAvatarTouched(true);
    setTimeout(() => setIsAvatarTouched(false), 1200);
  };

  const socialLinks = [
    { icon: <FaGithub />, href: siteSettings?.githubLink || "https://github.com/Nongsaibam" },
    { icon: <FaLinkedin />, href: siteSettings?.linkedinLink || "https://www.linkedin.com/in/nongsaibam-tazkhan-2a07a22b6/" },
    { icon: <FaXTwitter />, href: siteSettings?.twitterLink || "https://twitter.com/YourHandle" },
    { icon: <FaEnvelope />, href: siteSettings?.email ? `mailto:${siteSettings.email}` : "mailto:nongsaibamtazkhan@gmail.com" },
  ];

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = siteSettings?.resumeLink || "/resume.pdf";
    link.download = "Tazkhan_Resume.pdf";
    link.click();
  };

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    const aboutElem = document.getElementById("about");
    if (aboutElem) {
      aboutElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const colors = siteSettings?.runningGradientColors || {};
  const c1 = colors.color1 || "#38bdf8";
  const c2 = colors.color2 || "#818cf8";
  const c3 = colors.color3 || "#c084fc";
  const c4 = colors.color4 || "#f472b6";

  const customRunningStyle = siteSettings?.enableRunningGradientText !== false ? {
    backgroundImage: `linear-gradient(90deg, ${c1} 0%, ${c2} 25%, ${c3} 50%, ${c4} 75%, ${c1} 100%)`,
    backgroundSize: '300% 300%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    animation: 'gradientFlow 4s linear infinite',
  } : {};

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white transition-colors duration-500">
      <SEO />

      {/* Dynamic Background Lighting Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[600px] w-[600px] rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[130px]" />
      </div>

      {/* Header Navigation */}
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-slate-950/80 px-6 py-4 backdrop-blur-2xl transition duration-300 md:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-2xl font-black tracking-tight md:text-3xl">
            <span style={customRunningStyle} className={siteSettings?.enableRunningGradientText === false ? "theme-gradient-text" : ""}>
              {siteSettings?.logoText || "TK"}
            </span>
          </Link>

          <nav className="hidden items-center space-x-10 md:flex">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase()}`}
                className="relative text-sm font-semibold text-slate-300 transition duration-300 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-[2.5px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            ))}
            <Link
              to="/certificates"
              className="relative text-sm font-semibold text-slate-300 transition duration-300 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-[2.5px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Certifications
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-xl shadow-md transition duration-300 hover:bg-white/20"
            >
              <span className="text-sm">{isDarkMode ? <HiMiniSun className="text-amber-400" /> : <HiMiniMoon className="text-violet-400" />}</span>
              <span>{isDarkMode ? "Light" : "Dark"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-white transition duration-300 hover:bg-white/10 md:hidden"
            >
              {isMobileMenuOpen ? <HiOutlineXMark className="text-2xl" /> : <HiOutlineBars3 className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/95 p-4 backdrop-blur-2xl">
            <nav className="flex flex-col gap-2 text-xs font-semibold">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-slate-200 transition hover:bg-white/10"
                >
                  {item}
                </a>
              ))}
              <Link
                to="/certificates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-slate-200 transition hover:bg-white/10"
              >
                Certifications
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Hero Section Container */}
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 pb-12 pt-36 sm:pt-40 md:pt-44 lg:px-16 lg:pt-48 md:flex-row">
        
        {/* Left Column: Info & Stats */}
        <div className="flex-1 text-center md:text-left space-y-5 animate-fade-up">
          {/* Job Badge */}
          {siteSettings?.heroJobBadge?.showBadge !== false && (
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 px-4 py-1.5 text-xs backdrop-blur-xl shadow-lg shadow-emerald-500/10">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-semibold text-slate-200">
                {siteSettings?.heroJobBadge?.roleText || "Junior Developer at"}{" "}
                <strong className="text-emerald-400 font-bold">
                  {siteSettings?.heroJobBadge?.companyName || "LMP Technology"}
                </strong>
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                {siteSettings?.heroJobBadge?.badgeTag || "Present"}
              </span>
            </div>
          )}

          {/* Large Hero Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1]">
            <span className="block text-white">
              {siteSettings?.greetingText || "Hi, I'm"}
            </span>
            <span style={customRunningStyle} className="block mt-1">
              Nongsaibam
            </span>
            <span style={customRunningStyle} className="block">
              Tazkhan
            </span>
          </h1>

          {/* Subtitle & Paragraph */}
          <div className="space-y-2 max-w-xl text-slate-300">
            <p className="text-base sm:text-xl font-bold text-cyan-300">
              Full Stack Developer | MERN Stack Specialist
            </p>
            <p className="text-sm sm:text-base font-semibold text-slate-200">
              Building Scalable & Modern Web Applications
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
              I craft end-to-end digital experiences — from intuitive user interfaces to robust backend architectures.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center gap-4 pt-2 md:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/30 transition duration-300 hover:scale-105 active:scale-95 hover:shadow-indigo-500/50"
            >
              Explore My Work <HiOutlineArrowRight className="text-lg" />
            </a>

            <button
              type="button"
              onClick={downloadResume}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-slate-900/90 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl shadow-lg transition duration-300 hover:border-cyan-400 hover:bg-slate-800 hover:scale-105 active:scale-95"
            >
              <HiOutlineDocumentArrowDown className="text-lg text-cyan-400" /> Download Resume
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-2xl shadow-2xl">
            <div className="text-center md:text-left space-y-0.5">
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-cyan-400">
                <FaRocket className="text-sm" />
                <span className="text-xl sm:text-2xl font-black text-white">10+</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Projects Completed</p>
            </div>

            <div className="text-center md:text-left space-y-0.5">
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-purple-400">
                <FaCode className="text-sm" />
                <span className="text-xl sm:text-2xl font-black text-white">2+</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Years Experience</p>
            </div>

            <div className="text-center md:text-left space-y-0.5">
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-blue-400">
                <FaUsers className="text-sm" />
                <span className="text-xl sm:text-2xl font-black text-white">5+</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Technologies</p>
            </div>

            <div className="text-center md:text-left space-y-0.5">
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-emerald-400">
                <FaTrophy className="text-sm" />
                <span className="text-xl sm:text-2xl font-black text-white">100%</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Client Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Stage Profile Stage & Floating Icons */}
        <div className="relative flex-1 flex items-center justify-center animate-fade-up">
          
          {/* Outer Neon Orbit Rings */}
          <div className="absolute h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] rounded-full border-2 border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.3)] animate-pulse pointer-events-none" />
          <div className="absolute h-[360px] w-[360px] sm:h-[460px] sm:w-[460px] rounded-full border border-cyan-500/30 rotate-45 pointer-events-none" />

          {/* Floating Tech Badge 1: Code Editor Window (Top Left) */}
          <div className="absolute -left-4 sm:-left-8 top-4 z-20 hidden sm:flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/90 px-3 py-2 text-xs font-mono backdrop-blur-2xl shadow-2xl animate-float-up-down">
            <div className="flex gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="text-cyan-400 font-bold ml-1">developer.jsx</span>
          </div>

          {/* Floating Tech Badge 2: Code </> (Top Right) */}
          <div className="absolute right-0 sm:-right-4 top-10 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-900/90 to-slate-950 p-3 text-purple-300 shadow-xl shadow-purple-500/20 backdrop-blur-xl animate-float-up-down">
            <FaCode className="text-xl" />
          </div>

          {/* Floating Tech Badge 3: React Icon (Bottom Left) */}
          <div className="absolute left-2 sm:-left-4 bottom-16 z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-900/90 to-slate-950 p-3 text-cyan-400 shadow-xl shadow-cyan-500/20 backdrop-blur-xl animate-float-up-down" style={{ animationDelay: "1.2s" }}>
            <FaReact className="text-2xl animate-spin" style={{ animationDuration: "10s" }} />
          </div>

          {/* Floating Tech Badge 4: Node/JS Icon (Bottom Right) */}
          <div className="absolute -right-2 sm:-right-6 bottom-10 z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-900/90 to-slate-950 p-3 text-emerald-400 shadow-xl shadow-emerald-500/20 backdrop-blur-xl animate-float-up-down" style={{ animationDelay: "0.6s" }}>
            <FaNodeJs className="text-2xl" />
          </div>

          {/* Main 3D Pedestal Stage Container */}
          <div className="relative flex flex-col items-center">
            {/* Profile Avatar Image Frame */}
            <div
              onClick={handleAvatarTouch}
              className={`relative z-10 overflow-hidden rounded-full p-2 border-4 transition-all duration-500 cursor-pointer backdrop-blur-2xl shadow-2xl ${
                isAvatarTouched
                  ? "scale-105 border-cyan-400 shadow-cyan-500/60 ring-8 ring-cyan-500/30"
                  : "border-purple-500/50 bg-slate-900/80 shadow-[0_0_80px_rgba(168,85,247,0.4)] hover:scale-105 hover:border-cyan-400"
              }`}
            >
              <img
                src={resolveImagePath(siteSettings?.profileImage, tkImage)}
                alt={siteSettings?.name || "Nongsaibam Tazkhan"}
                className="h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-88 lg:w-88 rounded-full object-cover shadow-2xl transition duration-500"
              />
            </div>

            {/* 3D Glowing Stage Pedestal Base */}
            <div className="relative -mt-8 h-12 w-64 sm:w-80 rounded-[100%] border border-purple-500/50 bg-gradient-to-b from-purple-950 via-slate-950 to-slate-950 shadow-[0_15px_40px_rgba(168,85,247,0.5)]">
              <div className="absolute inset-x-4 top-1 h-3 rounded-[100%] bg-cyan-400/40 blur-sm" />
            </div>
          </div>
        </div>
      </main>

      {/* Scroll Down Indicator */}
      <div className="flex justify-center pb-8 pt-4">
        <button
          type="button"
          onClick={handleScrollToAbout}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl shadow-lg transition duration-300 hover:border-cyan-400 hover:text-white animate-float-up-down"
        >
          <div className="h-4 w-2.5 rounded-full border border-cyan-400/60 p-0.5 flex justify-center">
            <span className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <span>Scroll Down</span>
        </button>
      </div>
    </section>
  );
};

export default ProfilePage;
