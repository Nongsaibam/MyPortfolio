import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { useTheme } from "../context/ThemeContext";
import tkImage from "../assets/1736923031405.jpg";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/Nongsaibam" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/nongsaibam-tazkhan-2a07a22b6/" },
  { icon: FaXTwitter, href: "https://twitter.com/YourHandle" },
  { icon: FaEnvelope, href: "mailto:nongsaibamtazkhan@gmail.com" },
];

const ProfilePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navItems = ["About", "Experience", "Projects", "Skills"];

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Tazkhan_Resume.pdf";
    link.click();
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent text-slate-900 transition-colors duration-500 dark:text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-30 border-b border-black/10 bg-white/60 px-4 py-4 backdrop-blur-[20px] transition duration-300 md:px-16 dark:border-white/15 dark:bg-white/[0.08]">
        <div className="flex items-center justify-between">
          <div className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent">
            TK
          </div>

          <nav className="hidden space-x-8 md:flex">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase()}`}
                className="relative text-slate-700 transition duration-300 hover:text-slate-950 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full dark:text-white/70 dark:hover:text-white"
              >
                {item}
              </a>
            ))}
            <Link
              to="/certificates"
              className="relative text-slate-700 transition duration-300 hover:text-slate-950 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full dark:text-white/70 dark:hover:text-white"
            >
              Certifications
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-3 py-2 text-sm font-medium text-slate-700 backdrop-blur-[20px] transition duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75 dark:hover:bg-white/10"
            >
              <span className="text-base">{isDarkMode ? "☀" : "☾"}</span>
              <span className="hidden sm:inline">{isDarkMode ? "Light" : "Dark"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-slate-700 transition duration-300 hover:bg-slate-900/10 md:hidden dark:text-white/75 dark:hover:bg-white/10"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <HiOutlineXMark className="text-2xl" />
              ) : (
                <HiOutlineBars3 className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-4 overflow-hidden rounded-[24px] border border-black/10 bg-white/70 p-4 backdrop-blur-[20px] dark:border-white/15 dark:bg-white/[0.08]">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-slate-700 transition duration-300 hover:bg-white hover:text-slate-950 dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {item}
                </a>
              ))}
              <Link
                to="/certificates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-slate-700 transition duration-300 hover:bg-white hover:text-slate-950 dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
              >
                Certifications
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center gap-20 px-6 pb-20 pt-40 md:flex-row md:px-16">
        <div className="max-w-xl animate-fade-up text-center md:text-left">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            <span className="text-slate-900 dark:text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-300 dark:to-cyan-300">
              Nongsaibam Tazkhan
            </span>
          </h1>

          <p className="mb-8 text-lg text-slate-600 md:text-xl dark:text-white/70">
            Full Stack Developer • MERN Stack • Building Scalable & Modern Web Apps
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:scale-105"
            >
              View Projects
            </a>

            <button
              onClick={downloadResume}
              className="rounded-xl border border-black/10 bg-white/55 px-6 py-3 text-slate-800 backdrop-blur-[20px] transition duration-300 hover:-translate-y-1 hover:bg-white dark:border-white/15 dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/10"
            >
              Download Resume
            </button>
          </div>
        </div>

        <div className="group animate-fade-up text-center" style={{ animationDelay: "120ms" }}>
          <div className="relative overflow-hidden rounded-full border border-black/10 bg-white/30 p-2 backdrop-blur-[18px] dark:border-white/15 dark:bg-white/[0.05]">
            <img
              src={tkImage}
              alt="Tazkhan"
              className="h-56 w-56 rounded-full object-cover transition duration-500 group-hover:scale-105 md:h-64 md:w-64"
            />
          </div>

          <div className="mt-8 flex justify-center gap-8 text-2xl text-slate-600 dark:text-white/70">
            {socialLinks.map(({ icon: SocialIcon, href }, i) => (
              <a
                key={i}
                className="transition duration-300 hover:scale-110 hover:text-slate-950 dark:hover:text-white"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon />
              </a>
            ))}
          </div>
        </div>
      </main>

      <div className="scroll-indicator flex flex-col items-center pb-10">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-slate-500 dark:border-white/50">
          <div className="mt-2 h-2 w-1 rounded-full bg-slate-700 dark:bg-white" />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;