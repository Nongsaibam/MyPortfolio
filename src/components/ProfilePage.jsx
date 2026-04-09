import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { motion } from "framer-motion";
import tkImage from "../assets/1736923031405.jpg";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/Nongsaibam" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/nongsaibam-tazkhan-2a07a22b6/" },
  { icon: FaXTwitter, href: "https://twitter.com/YourHandle" },
  { icon: FaEnvelope, href: "mailto:nongsaibamtazkhan@gmail.com" },
];

const ProfilePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setIsDarkMode(savedTheme === "dark");
    else setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Make sure resume.pdf is in public folder
    link.download = "Tazkhan_Resume.pdf"; // File name when downloaded
    link.click();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black dark:bg-black transition-colors duration-500">
      {/* Background Glows */}
      <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-purple-500/20 blur-[180px]" />
      <div className="absolute bottom-[-150px] right-[-120px] w-[500px] h-[500px] bg-cyan-500/20 blur-[160px]" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[180px] top-[-150px] left-[-150px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px] bottom-[-120px] right-[-120px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-white/5 rounded-full blur-[140px] top-[40%] left-[40%] animate-pulse" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-6 md:px-16 py-4 backdrop-blur-xl bg-black/5 border-b border-white/10 shadow-lg transition-colors duration-500">
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
              className="relative text-white hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          ))}
          <Link
            to="/certificates"
            className="relative text-white hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Certifications
          </Link>
        </nav>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="px-3 py-2 hover:bg-white/20 transition"
        >
          {isDarkMode ? "🌙" : "☀️"}
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
            <span className="text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text animate-pulse">
              Nongsaibam Tazkhan
            </span>
          </h1>
          <p className="text-white text-lg md:text-xl mb-8">
            MERN Stack Developer building modern web apps with React, Node.js, and AI-powered technologies.
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
              className="px-6 py-3 rounded-xl border border-white/10 text-white backdrop-blur-md 
                 bg-white/10 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-cyan-400 
                 hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] transition-all duration-300"
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
          <div className="flex justify-center mt-8 gap-8 text-2xl text-cyan-400">
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="hover:text-white transition"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Scroll Indicator */}
      <div className="flex flex-col items-center pb-10 animate-bounce">
        <div className="w-6 h-10 border border-white rounded-full flex items-start justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
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
