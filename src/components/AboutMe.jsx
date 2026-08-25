import React, { useState, useEffect } from "react";
import { usePortfolioData } from "../context/PortfolioContext";

/**
 * Silky-Smooth Ease-Out Animated Counter Component
 */
const AnimatedCounter = ({ value, duration = 1800 }) => {
  const [count, setCount] = useState(0);

  // Extract numeric target and string suffix (e.g. "8+" -> target = 8, suffix = "+")
  const numericMatch = String(value).match(/\d+/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = String(value).replace(/\d+/, "");

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out quad deceleration formula
      const easeOutProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeOutProgress * target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const AboutMe = () => {
  const { siteSettings, projects, certificates } = usePortfolioData();

  const stats = siteSettings?.stats || [
    { value: "8+", label: "Months Experience" },
    { value: `${projects?.length || 5}+`, label: "Projects Built" },
    { value: "3", label: "Internships" },
    { value: `${certificates?.length || 10}+`, label: "Certificates & Achievements" },
  ];

  const paragraphs = siteSettings?.aboutParagraphs || [
    "I’m a Full Stack Developer building scalable and modern applications. I specialize in crafting end-to-end digital products — from intuitive user interfaces to robust backend architectures.",
    "I work with React, Vite, and Tailwind CSS on the frontend, and Node.js, Express, FastAPI, and MySQL on the backend.",
    "My focus stays on performance, clean architecture, and maintainable code, delivering smooth and user-friendly experiences.",
  ];

  return (
    <section
      id="about"
      className="relative min-h-0 overflow-hidden bg-transparent px-3 sm:px-8 py-8 sm:py-16 md:px-14"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-4 sm:mb-8 flex items-center gap-2.5 sm:gap-4 animate-fade-up">
          <h1 className="text-3xl font-extrabold text-slate-300 sm:text-5xl dark:text-white/10">
            {siteSettings?.aboutSectionNumber || "01"}
          </h1>
          <h2 className="theme-gradient-text text-xl font-bold sm:text-3xl md:text-4xl">
            {siteSettings?.aboutTitle || "About Me"}
          </h2>
        </div>

        <div className="group relative overflow-hidden rounded-2xl sm:rounded-[28px] border border-black/10 bg-white/55 p-5 sm:p-10 backdrop-blur-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 hover:-translate-y-1 dark:border-white/15 dark:bg-white/[0.08] animate-fade-up">
          <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-[28px] bg-white/20 dark:bg-white/[0.03]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/20" />

          <article className="relative z-10 space-y-4 text-xs leading-relaxed sm:text-base text-slate-700 dark:text-slate-200">
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </article>
        </div>

        <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-4">
          {stats.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-black/10 bg-white/50 p-3 sm:p-5 text-center backdrop-blur-[18px] shadow-sm transition-all duration-500 hover:-translate-y-1 dark:border-white/15 dark:bg-white/[0.07] animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <h3 className="relative z-10 theme-gradient-text text-2xl font-bold sm:text-4xl">
                <AnimatedCounter value={item.value} />
              </h3>
              <p className="relative z-10 mt-1 text-[11px] font-medium text-slate-600 sm:text-xs dark:text-slate-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
