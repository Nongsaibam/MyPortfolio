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
import react3dIcon from "../assets/3d-react-icon.png";
import code3dIcon from "../assets/3d-code-icon.png";
import js3dIcon from "../assets/3d-js-icon.png";
import window3dIcon from "../assets/3d-window-icon.png";

import { resolveImagePath } from "../utils/imageCompressor";
import SEO from "./SEO";

const ProfilePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { siteSettings } = usePortfolioData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isAvatarTouched, setIsAvatarTouched] = React.useState(false);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const navItems = ["About", "Experience", "Projects", "Skills"];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 18;
    const rotY = (x / (rect.width / 2)) * 18;

    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
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
    <section className="relative min-h-0 md:min-h-screen overflow-hidden bg-transparent text-slate-900 transition-colors duration-500 dark:text-white">
      <SEO />
      {/* Subtle Background Lighting Orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute left-10 top-20 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      {/* Header Navigation */}
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-black/10 bg-white/75 px-4 py-3.5 sm:py-4 backdrop-blur-2xl transition duration-300 md:px-16 dark:border-white/10 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-2xl font-black tracking-tight md:text-3xl">
            <span
              style={customRunningStyle}
              className={siteSettings?.enableRunningGradientText === false ? "theme-gradient-text" : ""}
            >
              {siteSettings?.logoText || "TK"}
            </span>
          </Link>

          <nav className="hidden items-center space-x-10 md:flex">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase()}`}
                className="relative text-base font-semibold text-slate-800 transition duration-300 hover:text-slate-950 after:absolute after:-bottom-1.5 after:left-0 after:h-[2.5px] after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full dark:text-slate-200 dark:hover:text-white"
              >
                {item}
              </a>
            ))}
            <Link
              to="/certificates"
              className="relative text-base font-semibold text-slate-800 transition duration-300 hover:text-slate-950 after:absolute after:-bottom-1.5 after:left-0 after:h-[2.5px] after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full dark:text-slate-200 dark:hover:text-white"
            >
              Certifications
            </Link>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs sm:text-sm font-bold text-slate-800 backdrop-blur-xl shadow-sm transition duration-300 hover:bg-white dark:border-white/15 dark:bg-white/[0.1] dark:text-white dark:hover:bg-white/20"
            >
              <span className="text-sm">{isDarkMode ? <HiMiniSun className="text-amber-400" /> : <HiMiniMoon className="text-violet-500" />}</span>
              <span>{isDarkMode ? "Light" : "Dark"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-800 transition duration-300 hover:bg-slate-900/10 md:hidden dark:text-white dark:hover:bg-white/10"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <HiOutlineXMark className="text-2xl" /> : <HiOutlineBars3 className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-3 backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/90">
            <nav className="flex flex-col gap-2 text-xs font-semibold">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  {item}
                </a>
              ))}
              <Link
                to="/certificates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
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
        <div className="group animate-fade-up text-center shrink-0" style={{ animationDelay: "120ms" }}>
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={(e) => {
              if (e.touches && e.touches[0]) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left - rect.width / 2;
                const y = e.touches[0].clientY - rect.top - rect.height / 2;
                setTilt({ x: -(y / (rect.height / 2)) * 15, y: (x / (rect.width / 2)) * 15 });
              }
            }}
            onTouchEnd={handleMouseLeave}
            onClick={handleAvatarTouch}
            style={{
              perspective: "1200px",
            }}
            className="relative cursor-pointer select-none p-4"
          >
            {/* 3D Perspective Card Container */}
            <div
              style={{
                transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
                transition: "transform 0.15s ease-out",
                transformStyle: "preserve-3d",
              }}
              className={`relative flex items-center justify-center rounded-full p-3 sm:p-4 border-2 backdrop-blur-2xl transition-all duration-500 shadow-[0_25px_60px_rgba(0,242,254,0.18)] ${
                isAvatarTouched
                  ? "border-cyan-400 shadow-cyan-500/60 ring-4 ring-cyan-500/40"
                  : "border-cyan-500/40 bg-slate-900/60 dark:bg-slate-950/70 hover:border-cyan-400 hover:shadow-cyan-500/40"
              }`}
            >
              {/* 3D Ambient Glowing Neon Backdrop Aura Ring */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-40 blur-2xl animate-pulse"
                style={{ transform: "translateZ(-20px)" }}
              />

              {/* 3D Orbiting Outer Neon Border Ring */}
              <div
                className="absolute -inset-1 rounded-full border border-cyan-400/40 bg-gradient-to-tr from-cyan-500/20 via-transparent to-pink-500/20 shadow-[inset_0_0_20px_rgba(56,189,248,0.3)] animate-spin-slow"
                style={{ transform: "translateZ(10px)", animationDuration: "14s" }}
              />

              {/* Profile Image with 3D Depth & Specular Reflection */}
              <div
                className="relative overflow-hidden rounded-full border-4 border-white/20 shadow-2xl"
                style={{ transform: "translateZ(25px)" }}
              >
                <img
                  src={resolveImagePath(siteSettings?.profileImage, tkImage)}
                  alt={siteSettings?.name || "Tazkhan"}
                  className="h-44 w-44 rounded-full object-cover transition duration-500 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 group-hover:scale-105"
                />

                {/* Glossy Reflection Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60" />
              </div>

              {/* 3D Floating Tech Icon 1 (Top-Left: React Atom 3D) */}
              <div
                className="absolute -left-5 -top-4 sm:-left-8 sm:-top-6 z-30 rounded-2xl border border-cyan-400/40 bg-slate-950/80 p-2 sm:p-3 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,242,254,0.3)] transition-all duration-300 hover:scale-125 hover:border-cyan-300 animate-[bounce_4s_infinite_ease-in-out]"
                style={{ transform: "translateZ(65px)" }}
              >
                <img
                  src={react3dIcon}
                  alt="3D React Icon"
                  className="h-8 w-8 sm:h-12 sm:w-12 object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                />
              </div>

              {/* 3D Floating Tech Icon 2 (Top-Right: Code Window IDE 3D) */}
              <div
                className="absolute -right-5 -top-4 sm:-right-8 sm:-top-6 z-30 rounded-2xl border border-purple-400/40 bg-slate-950/80 p-2 sm:p-3 backdrop-blur-2xl shadow-[0_15px_35px_rgba(168,85,247,0.3)] transition-all duration-300 hover:scale-125 hover:border-purple-300 animate-[pulse_3s_infinite_ease-in-out]"
                style={{ transform: "translateZ(55px)" }}
              >
                <img
                  src={window3dIcon}
                  alt="3D IDE Window Icon"
                  className="h-8 w-8 sm:h-12 sm:w-12 object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                />
              </div>

              {/* 3D Floating Tech Icon 3 (Bottom-Left: Code </> 3D) */}
              <div
                className="absolute -left-5 -bottom-4 sm:-left-8 sm:-bottom-6 z-30 rounded-2xl border border-indigo-400/40 bg-slate-950/80 p-2 sm:p-3 backdrop-blur-2xl shadow-[0_15px_35px_rgba(129,140,248,0.3)] transition-all duration-300 hover:scale-125 hover:border-indigo-300 animate-[bounce_3.5s_infinite_ease-in-out]"
                style={{ transform: "translateZ(60px)" }}
              >
                <img
                  src={code3dIcon}
                  alt="3D Code Icon"
                  className="h-8 w-8 sm:h-12 sm:w-12 object-contain drop-shadow-[0_0_12px_rgba(129,140,248,0.8)]"
                />
              </div>

              {/* 3D Floating Tech Icon 4 (Bottom-Right: JavaScript Hex 3D) */}
              <div
                className="absolute -right-5 -bottom-4 sm:-right-8 sm:-bottom-6 z-30 rounded-2xl border border-emerald-400/40 bg-slate-950/80 p-2 sm:p-3 backdrop-blur-2xl shadow-[0_15px_35px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-125 hover:border-emerald-300 animate-[pulse_4s_infinite_ease-in-out]"
                style={{ transform: "translateZ(70px)" }}
              >
                <img
                  src={js3dIcon}
                  alt="3D JS Icon"
                  className="h-8 w-8 sm:h-12 sm:w-12 object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                />
              </div>
            </div>
          </div>

          <div className="mt-3 sm:mt-6 flex justify-center gap-4 sm:gap-6 text-lg sm:text-2xl text-slate-600 dark:text-slate-300">
            {socialLinks.map(({ icon, href }, i) => (
              <a
                key={i}
                className="rounded-full p-1 transition duration-300 hover:scale-125 active:scale-125 hover:text-cyan-500 active:text-cyan-400 dark:hover:text-cyan-400"
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

      {/* Bottom Scroll Down Indicator with Smooth Up-and-Down Float */}
      <button
        type="button"
        onClick={handleScrollToAbout}
        className="relative z-10 mx-auto flex flex-col items-center justify-center py-2 md:py-6 no-underline cursor-pointer border-none bg-transparent outline-none select-none touch-manipulation animate-float-up-down"
        aria-label="Scroll Down to About Me section"
      >
        <div className="relative flex h-10 w-6 sm:h-14 sm:w-8 flex-col items-center justify-between rounded-full border border-violet-500/40 bg-slate-950/60 p-1 backdrop-blur-xl shadow-xl transition-colors duration-300 hover:border-cyan-400 dark:border-white/30 dark:bg-slate-950/80">
          <div className="h-3 w-1 rounded-full theme-gradient-bg shadow-sm animate-wheel-move" />
          <HiOutlineArrowDown className="text-[10px] sm:text-xs text-cyan-400 dark:text-cyan-300" />
        </div>
      </button>
    </section>
  );
};

export default ProfilePage;
