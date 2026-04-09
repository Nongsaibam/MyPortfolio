import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import tkImage from "../assets/1736923031405.jpg";

void motion;

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/Nongsaibam" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/nongsaibam-tazkhan-2a07a22b6/" },
  { icon: FaXTwitter, href: "https://twitter.com/YourHandle" },
  { icon: FaEnvelope, href: "mailto:nongsaibamtazkhan@gmail.com" },
];

const ProfilePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Make sure resume.pdf is in public folder
    link.download = "Tazkhan_Resume.pdf"; // File name when downloaded
    link.click();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      {/* Background Glows */}
      <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-purple-500/20 blur-[180px]" />
      <div className="absolute bottom-[-150px] right-[-120px] w-[500px] h-[500px] bg-cyan-500/20 blur-[160px]" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[180px] top-[-150px] left-[-150px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px] bottom-[-120px] right-[-120px] animate-pulse" />
        <div className="absolute top-[40%] left-[40%] h-[400px] w-[400px] rounded-full bg-slate-950/5 blur-[140px] animate-pulse dark:bg-white/5" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between border-b border-slate-900/10 bg-white/55 px-6 py-4 shadow-lg backdrop-blur-xl transition-colors duration-500 md:px-16 dark:border-white/10 dark:bg-slate-900/15">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]"
        >
          TK
        </motion.div>

        <nav className="hidden md:flex space-x-8">
          {["About", "Experience", "Projects", "Skills"].map((item, i) => (
            <a
              key={i}
              href={`#${item.toLowerCase()}`}
              className="relative text-slate-700 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:text-slate-950 hover:after:w-full dark:text-slate-200 dark:hover:text-white"
            >
              {item}
            </a>
          ))}
          <Link
            to="/certificates"
            className="relative text-slate-700 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:text-slate-950 hover:after:w-full dark:text-slate-200 dark:hover:text-white"
          >
            Certifications
          </Link>
        </nav>

        <button
          onClick={toggleTheme}
          className="rounded-xl px-3 py-2 transition hover:bg-slate-900/10 dark:hover:bg-white/20"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-center gap-20 px-6 md:px-16 pt-50 pb-20 relative z-10">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-slate-900 dark:text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text animate-pulse">
              Nongsaibam Tazkhan
            </span>
          </h1>
          <p className="mb-8 text-lg text-slate-700 md:text-xl dark:text-slate-200">
            Full Stack Developer | MERN Stack | Building Scalable & Modern Web Apps
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-400 to-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(255,0,255,0.5)] transition"
            >
              View Projects
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="rounded-xl border border-slate-300/70 bg-white/60 px-6 py-3 text-slate-800 backdrop-blur-md transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-cyan-400 hover:text-white hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] dark:border-white/10 dark:bg-white/10 dark:text-white"
              onClick={downloadResume}
            >
              Download Resume
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 blur-xl opacity-60 group-hover:opacity-100 animate-spin-slow"></div>
            <img
              src={tkImage}
              alt="Tazkhan"
              className="relative w-56 h-56 md:w-64 md:h-64 rounded-full object-cover border-2 border-white/10 backdrop-blur-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Social Icons */}
          <div className="mt-8 flex justify-center gap-8 text-2xl text-cyan-500 dark:text-cyan-400">
            {socialLinks.map(({ icon: socialIcon, href }, i) => {
              const SocialIcon = socialIcon;

              return (
                <motion.a
                  key={i}
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="transition hover:text-slate-950 dark:hover:text-white"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                  <SocialIcon />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </main>

      {/* Scroll Indicator */}
      <div className="flex flex-col items-center pb-10 animate-bounce">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-slate-500 dark:border-white">
          <div className="mt-2 h-2 w-1 rounded-full bg-slate-700 dark:bg-white"></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
