import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import {
  HiMiniMoon,
  HiMiniSun,
  HiOutlineArrowLongDown,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineSparkles,
  HiOutlineDocumentArrowDown,
  HiOutlineArrowDown,
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
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const navItems = ["About", "Experience", "Projects", "Skills"];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / (rect.height / 2)) * 18;
    const rotY = (x / (rect.width / 2)) * 18;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

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

  const customRunningStyle = {
    backgroundImage: `linear-gradient(${siteSettings?.gradientAngle || 90}deg, ${siteSettings?.gradientStartColor || "#06b6d4"}, ${siteSettings?.gradientViaColor || "#3b82f6"}, ${siteSettings?.gradientEndColor || "#8b5cf6"})`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "gradientFlow 4s linear infinite",
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent text-slate-900 dark:text-white transition-colors duration-500">
      <SEO />

      {/* Sleek Ultra-Modern Top Navbar (Enlarged) */}
      <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-black/10 bg-white/80 px-5 sm:px-10 py-4 sm:py-5 backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-[#040817]/90 shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Left: Bold Dual-Tone Gradient TK Logo */}
          <Link to="/" className="flex items-center gap-1 text-3xl sm:text-4xl font-black tracking-tight select-none transition hover:scale-105">
            <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              T
            </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
              K
            </span>
          </Link>

          {/* Center: Clean Spaced Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-14">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base font-black tracking-wide text-slate-800 transition duration-300 hover:text-cyan-500 hover:scale-105 dark:text-slate-100 dark:hover:text-cyan-400"
              >
                {item}
              </a>
            ))}
            <Link
              to="/certificates"
              className="text-base font-black tracking-wide text-slate-800 transition duration-300 hover:text-cyan-500 hover:scale-105 dark:text-slate-100 dark:hover:text-cyan-400"
            >
              Certifications
            </Link>
          </nav>

          {/* Right: Theme Toggle Pill Button (Icon + Label) & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2.5 rounded-full border border-slate-700/50 bg-slate-900/90 px-5 py-2.5 text-sm font-bold text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-cyan-500/25 active:scale-95 dark:border-white/25 dark:bg-white/[0.12]"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <>
                  <HiMiniSun className="text-amber-400 text-base" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <HiMiniMoon className="text-indigo-400 text-base" />
                  <span>Dark</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-slate-700 backdrop-blur-xl transition md:hidden dark:border-white/15 dark:bg-white/10 dark:text-white"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <HiOutlineXMark className="text-xl" /> : <HiOutlineBars3 className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="mt-3 mx-auto max-w-7xl rounded-2xl border border-black/10 bg-white/95 p-4 backdrop-blur-2xl shadow-2xl md:hidden dark:border-white/15 dark:bg-slate-950/95">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-2 text-sm font-bold text-slate-800 transition hover:bg-black/5 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  {item}
                </a>
              ))}
              <Link
                to="/certificates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2 text-sm font-bold text-slate-800 transition hover:bg-black/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Certifications
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Hero Container */}
      <main className="mx-auto flex min-h-0 max-w-6xl flex-col-reverse items-center justify-between gap-6 sm:gap-10 md:gap-14 lg:gap-20 px-4 sm:px-6 md:px-12 pb-8 pt-36 sm:pt-40 md:pt-48 lg:pt-52 xl:pt-56 md:flex-row">
        {/* Left Column: Headline & Info */}
        <div className="flex-1 animate-fade-up text-center md:text-left space-y-3 sm:space-y-4 mt-4 sm:mt-6 md:mt-8">
          {/* Ultra-Modern Dynamic Glassmorphic Job Badge */}
          {siteSettings?.heroJobBadge?.showBadge !== false && (
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-slate-900/80 px-4 py-1.5 text-xs backdrop-blur-xl shadow-lg shadow-emerald-500/10 transition-all duration-500 hover:border-emerald-400 hover:shadow-emerald-500/25 hover:scale-105">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-medium text-slate-200">
                {siteSettings?.heroJobBadge?.roleText || "Junior Developer at"}{" "}
                <strong className="theme-gradient-text font-bold">
                  {siteSettings?.heroJobBadge?.companyName || "LMP Technology"}
                </strong>
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                {siteSettings?.heroJobBadge?.badgeTag || "Present 🚀"}
              </span>
            </div>
          )}

          <h1 className="text-2xl font-extrabold tracking-tight leading-snug sm:text-5xl md:text-6xl">
            <span className="text-slate-900 dark:text-white">
              {siteSettings?.greetingText || "Hi, I'm "}
            </span>
            <span style={customRunningStyle} className={siteSettings?.enableRunningGradientText === false ? "text-indigo-300 dark:text-indigo-200" : ""}>
              Nongsaibam
            </span>
            <span style={customRunningStyle} className={`block mt-0.5 sm:mt-1 font-black ${siteSettings?.enableRunningGradientText === false ? "theme-gradient-text" : ""}`}>
              Tazkhan
            </span>
          </h1>

          <p className="text-xs font-medium text-slate-600 sm:text-lg dark:text-slate-300 max-w-xl leading-relaxed">
            {siteSettings?.title || "Full Stack Developer, MERN Stack Building Scalable & Modern Web Apps"}
          </p>

          {siteSettings?.bio && (
            <p className="text-[11px] sm:text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-lg">
              {siteSettings.bio}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-1 md:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition duration-300 hover:scale-105 active:scale-95"
            >
              {siteSettings?.primaryBtnText || "Explore Projects"}
            </a>

            <button
              type="button"
              onClick={downloadResume}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/90 px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-xl shadow-md transition duration-300 hover:border-cyan-400 hover:bg-slate-800 hover:scale-105 active:scale-95 dark:border-white/25 dark:bg-slate-900/90 dark:text-white dark:hover:border-cyan-400 dark:hover:bg-slate-800"
            >
              <HiOutlineDocumentArrowDown className="h-4 w-4 text-cyan-400" /> Download Resume
            </button>
          </div>
        </div>

        {/* Right Column: 3D Holographic Profile Avatar */}
        <div className="relative animate-fade-up text-center shrink-0" style={{ animationDelay: "120ms" }}>
          {/* 3D Interactive Profile Avatar Container (Hover & Tilt trigger ONLY when pointer touches photo) */}
          <div
            className="group relative inline-block cursor-pointer"
            style={{ perspective: "1000px" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleAvatarTouch}
            onTouchStart={handleAvatarTouch}
          >
            {/* 3D Glowing Backdrop Aura */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 opacity-20 blur-2xl transition-all duration-700 group-hover:opacity-75 group-hover:blur-3xl animate-pulse" />

            {/* 3D Main Outer Sphere Ring Container */}
            <div
              style={{
                transform: isHovered
                  ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
                  : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                transformStyle: "preserve-3d",
              }}
              className={`relative rounded-full p-2.5 sm:p-3 border-2 transition-all duration-500 cursor-pointer backdrop-blur-3xl shadow-[0_20px_60px_rgba(6,182,212,0.3)] ${
                isAvatarTouched
                  ? "border-cyan-400 ring-4 ring-cyan-500/40 shadow-cyan-500/60"
                  : "border-cyan-500/40 bg-slate-900/60 hover:border-cyan-400 dark:bg-white/[0.06]"
              }`}
            >
              {/* 3D Orbiting Glowing Rings */}
              <div className="absolute -inset-1.5 rounded-full border border-cyan-400/40 animate-[spin_10s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-3.5 rounded-full border border-indigo-500/30 animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />

              {/* Profile Image with 3D Depth */}
              <div className="relative overflow-hidden rounded-full transform-gpu p-1" style={{ transform: "translateZ(30px)" }}>
                <img
                  src={resolveImagePath(siteSettings?.profileImage, tkImage)}
                  alt={siteSettings?.name || "Tazkhan"}
                  className="h-48 w-48 rounded-full object-contain shadow-2xl transition duration-500 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 group-hover:scale-105"
                />

                {/* 3D Specular Lighting Glare Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              </div>

              {/* Floating 3D Badge 1: Top Right */}
              <div
                className="absolute -right-2 top-4 z-20 hidden sm:flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-slate-950/85 px-3 py-1 text-[11px] font-bold text-cyan-300 backdrop-blur-xl shadow-xl transition-transform duration-500"
                style={{ transform: isHovered ? "translateZ(60px) translateY(-5px)" : "translateZ(40px)" }}
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                ⚡ MERN Stack
              </div>

              {/* Floating 3D Badge 2: Bottom Left */}
              <div
                className="absolute -left-3 bottom-6 z-20 hidden sm:flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-slate-950/85 px-3 py-1 text-[11px] font-bold text-violet-300 backdrop-blur-xl shadow-xl transition-transform duration-500"
                style={{ transform: isHovered ? "translateZ(60px) translateY(5px)" : "translateZ(40px)" }}
              >
                🚀 Full Stack Dev
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-7 flex justify-center gap-4 sm:gap-6 text-lg sm:text-2xl text-slate-600 dark:text-slate-300">
            {socialLinks.map(({ icon, href }, i) => (
              <a
                key={i}
                className="rounded-full p-2 transition-all duration-300 hover:scale-125 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-110 dark:hover:text-cyan-400 bg-white/40 dark:bg-white/[0.05] border border-black/5 dark:border-white/10"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* 3D Vertical Capsule Mouse Scroll Indicator (Bigger & Animated) */}
      <div className="relative z-10 pb-10 pt-6 flex justify-center">
        <button
          type="button"
          onClick={handleScrollToAbout}
          className="group relative flex h-16 w-8 flex-col items-center justify-between rounded-full border-[2.5px] border-indigo-500/60 bg-[#444a57] p-2 shadow-xl shadow-indigo-500/25 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-cyan-400 hover:shadow-cyan-500/50 active:scale-95 cursor-pointer select-none"
          aria-label="Scroll Down to About Me section"
        >
          {/* Top Animated Cyan Scroll Wheel Bar with Smooth Sliding Animation */}
          <div className="relative h-6 w-full flex justify-center">
            <span className="h-3.5 w-1.5 rounded-full bg-cyan-400 animate-scroll-wheel shadow-md shadow-cyan-400/60" />
          </div>

          {/* Bottom Cyan Bouncing Arrow */}
          <HiOutlineArrowDown className="h-4 w-4 text-cyan-400 group-hover:text-cyan-300 transition-colors animate-bounce mb-0.5" />
        </button>
      </div>
    </section>
  );
};

export default ProfilePage;
