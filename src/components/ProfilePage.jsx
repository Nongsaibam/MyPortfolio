import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import tkImage from "../assets/1736923031405.jpg"; // Check path

const ProfilePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ Load theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // ✅ Apply theme to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white px-4 sm:px-6 md:px-12 py-8 md:py-12 transition-colors duration-300">
      
      {/* Header */}
      <header className="flex flex-wrap justify-between items-center gap-4 mb-12">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">TK</div>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#experience" className="hover:text-blue-600">Experience</a>
          <a href="#projects" className="hover:text-blue-600">Projects</a>
          <a href="#skills" className="hover:text-blue-600">Skills</a>
          <Link to="/certificates" className="hover:text-blue-600">Certifications</Link>
          <a href="#blog" className="hover:text-blue-600">Blog</a>
        </nav>

        {/* Dark Mode Toggle */}
        <button
          className="text-2xl p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle Dark Mode"
          onClick={() => setIsDarkMode(prev => !prev)}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>
      </header>

      {/* Main Section */}
      <main className="flex flex-col md:flex-row justify-center items-center md:items-start gap-16 md:gap-24 lg:gap-40 mt-20">
        
        {/* Text Section */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Hi, I'm <span className="text-blue-600">Nongsaibam Tazkhan</span>
          </h1>
          <h2 className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 mb-4">
            MERN Stack Web Developer with 8 months of experience in React.js, Redux,
            HTML, CSS, and JavaScript ES6. Skilled in Node.js, REST APIs, and backend
            development, with knowledge of C, C++, and Python.
          </h2>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-md border-2 border-transparent hover:bg-white hover:text-blue-600 hover:border-blue-600 transition duration-300">
              View Projects
            </button>
            <button className="border border-gray-300 dark:border-gray-600 px-5 py-2 rounded-md hover:border-blue-500 dark:hover:bg-gray-800 transition hover:text-blue-600">
              Download Resume
            </button>
          </div>
        </div>

        {/* Profile Image + Social Icons */}
        <div className="text-center">
          <img
            src={tkImage}
            alt="Nongsaibam Tazkhan"
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full mx-auto shadow-lg object-cover transform transition-transform duration-300 hover:scale-110"
          />
          <div className="flex justify-center mt-6 gap-6 sm:gap-10 text-2xl">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-blue-600 transform transition-transform duration-300 hover:scale-125" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer" className="hover:text-blue-600 transform transition-transform duration-300 hover:scale-125" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-blue-600 transform transition-transform duration-300 hover:scale-125" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="mailto:nongsiabmtazkhan@gmail.com" className="hover:text-blue-600 transform transition-transform duration-300 hover:scale-125" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </main>

      {/* Scroll Down Indicator */}
      <div className="flex flex-col items-center mt-20 md:mt-32">
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex items-start justify-center">
          <div className="w-1 h-1 bg-gray-500 rounded-full mt-2 animate-bounce"></div>
        </div>
        <div className="mt-2 animate-bounce">
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
