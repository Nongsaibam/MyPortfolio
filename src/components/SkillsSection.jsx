import React from "react";
import { FaPython, FaReact, FaDatabase, FaTools } from "react-icons/fa";
import { usePortfolioData } from "../context/PortfolioContext";

const getIcon = (iconName, iconObj) => {
  if (iconObj) return iconObj;
  switch (iconName) {
    case "FaReact":
      return <FaReact className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />;
    case "FaDatabase":
      return <FaDatabase className="h-6 w-6 text-violet-600 dark:text-violet-300" />;
    case "FaTools":
      return <FaTools className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />;
    default:
      return <FaPython className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />;
  }
};

const SkillsSection = () => {
  const { skills } = usePortfolioData();

  return (
    <section
      className="relative overflow-hidden bg-transparent px-6 py-24 text-slate-900 dark:text-white"
      id="skills"
    >
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <div className="mb-16 flex items-center justify-center gap-4 animate-fade-up">
          <h2 className="text-6xl font-bold text-slate-300 dark:text-white/10">
            05
          </h2>
          <h3 className="theme-gradient-text text-3xl font-bold md:text-4xl">
            Skills & Tools
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 120}ms` }}
              className="group relative overflow-hidden rounded-[24px] border border-black/10 bg-white/55 p-6 text-left backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] animate-fade-up"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-white/10 dark:bg-white/[0.02]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/20" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                <div className="absolute -left-[50%] top-0 h-full w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-xl animate-[shine_1.5s_linear]" />
              </div>

              <div className="relative z-10 mb-4 flex items-center gap-3">
                <div className="transition-transform duration-300 group-hover:scale-125">
                  {getIcon(skill.iconName, skill.icon)}
                </div>
                <h4 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">
                  {skill.category}
                </h4>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                {Array.isArray(skill.items) &&
                  skill.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-sm text-slate-700 transition duration-300 hover:scale-105 hover:bg-cyan-500/20 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75"
                    >
                      {item}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;