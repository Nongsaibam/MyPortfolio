import React from "react";
import {
  FaCodeBranch,
  FaMicrophone,
  FaRegCalendarAlt
} from "react-icons/fa";
import { usePortfolioData } from "../context/PortfolioContext";

const getIcon = (iconName, iconObj) => {
  if (iconObj) return iconObj;
  switch (iconName) {
    case "FaMicrophone":
      return <FaMicrophone />;
    case "FaRegCalendarAlt":
      return <FaRegCalendarAlt />;
    default:
      return <FaCodeBranch />;
  }
};

const ActivitiesSection = () => {
  const { activities } = usePortfolioData();

  return (
    <section
      id="activities"
      className="relative overflow-hidden bg-transparent px-6 py-24 text-slate-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* 🔥 Title */}
        <div className="flex justify-center items-center gap-4 mb-16 animate-fade-up">
          <h2 className="text-6xl font-bold text-slate-300 dark:text-white/10">
            04
          </h2>
          <h3 className="theme-gradient-text text-3xl md:text-4xl font-bold">
            Activities & Engagements
          </h3>
        </div>

        {/* 💎 Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 120}ms` }}
              className="group relative rounded-[24px] border border-black/10 bg-white/55 p-6 backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] animate-fade-up"
            >
              {/* Apple Glass Overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-white/10 dark:bg-white/[0.02]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/20" />

              {/* ✨ Shine Sweep */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                <div className="absolute -left-[50%] top-0 h-full w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-xl animate-[shine_1.5s_linear]" />
              </div>

              {/* Icon + Title */}
              <div className="relative z-10 flex items-center mb-4">
                <div className="text-cyan-600 text-2xl transition-transform duration-300 group-hover:scale-125 dark:text-cyan-300">
                  {getIcon(activity.iconName, activity.icon)}
                </div>

                <h4 className="ml-3 text-lg font-semibold text-slate-900 dark:text-white">
                  {activity.title}
                </h4>
              </div>

              {/* Description */}
              <p className="relative z-10 mb-4 text-slate-600 dark:text-white/70">
                {activity.description}
              </p>

              {/* Date */}
              <p className="relative z-10 mb-4 text-sm text-violet-600 dark:text-violet-300">
                {activity.date}
              </p>

              {/* Tags */}
              <div className="relative z-10 flex flex-wrap gap-2">
                {Array.isArray(activity.tags) &&
                  activity.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-xs text-slate-700 transition hover:scale-105 hover:bg-cyan-500/20 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75"
                    >
                      {tag}
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

export default ActivitiesSection;