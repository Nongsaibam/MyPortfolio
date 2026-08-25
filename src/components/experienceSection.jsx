import React from "react";
import { usePortfolioData } from "../context/PortfolioContext";
import {
  HiRocketLaunch,
  HiOutlineSparkles,
  HiOutlineCalendar,
  HiOutlineBriefcase,
  HiOutlineBuildingOffice2,
  HiOutlineCodeBracket,
  HiOutlineStar,
  HiOutlineAcademicCap,
  HiOutlineGlobeAlt,
  HiOutlinePaintBrush,
  HiOutlineWrench,
  HiOutlineTrophy,
  HiOutlineChartBar,
  HiOutlineCpuChip,
  HiOutlineDevicePhoneMobile,
  HiOutlineShieldCheck,
  HiOutlineCloud,
  HiOutlineCog6Tooth,
  HiOutlineArrowTrendingUp,
  HiOutlineLightBulb,
  HiOutlineFire,
  HiOutlineHeart,
} from "react-icons/hi2";

const renderNodeIcon = (iconType, isCurrentRole) => {
  if (isCurrentRole) {
    return <HiOutlineSparkles className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400 animate-pulse" />;
  }
  switch (iconType) {
    case "Briefcase":
      return <HiOutlineBriefcase className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />;
    case "Lightning":
      return <HiOutlineSparkles className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400 animate-pulse" />;
    case "Building":
      return <HiOutlineBuildingOffice2 className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />;
    case "Code":
      return <HiOutlineCodeBracket className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />;
    case "Star":
      return <HiOutlineStar className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />;
    case "Graduation":
      return <HiOutlineAcademicCap className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />;
    case "Globe":
      return <HiOutlineGlobeAlt className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />;
    case "Design":
      return <HiOutlinePaintBrush className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />;
    case "Tools":
      return <HiOutlineWrench className="h-5 w-5 sm:h-6 sm:w-6 text-slate-300" />;
    case "Trophy":
      return <HiOutlineTrophy className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />;
    case "Chart":
      return <HiOutlineChartBar className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />;
    case "AI":
      return <HiOutlineCpuChip className="h-5 w-5 sm:h-6 sm:w-6 text-violet-400" />;
    case "Mobile":
      return <HiOutlineDevicePhoneMobile className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />;
    case "Security":
      return <HiOutlineShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />;
    case "Cloud":
      return <HiOutlineCloud className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />;
    case "Gear":
      return <HiOutlineCog6Tooth className="h-5 w-5 sm:h-6 sm:w-6 text-slate-300" />;
    case "Target":
      return <HiOutlineArrowTrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />;
    case "Idea":
      return <HiOutlineLightBulb className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />;
    case "Fire":
      return <HiOutlineFire className="h-5 w-5 sm:h-6 sm:w-6 text-rose-500" />;
    case "Heart":
      return <HiOutlineHeart className="h-5 w-5 sm:h-6 sm:w-6 text-rose-400" />;
    case "Sparkles":
      return <HiOutlineSparkles className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />;
    case "Rocket":
    default:
      return <HiRocketLaunch className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 -rotate-45" />;
  }
};

export default function ExperienceSection() {
  const { experiences } = usePortfolioData();

  // Helper to extract year from date string (e.g. "Apr 2024 - Jun 2024" -> "2024")
  const getYear = (dateStr) => {
    if (!dateStr) return "";
    const match = dateStr.match(/\d{4}/);
    return match ? match[0] : "";
  };

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-transparent px-3 sm:px-8 py-10 sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Header Title */}
        <div className="mb-12 sm:mb-20 flex items-center justify-center gap-3 text-center animate-fade-up">
          <h2 className="text-4xl font-extrabold text-slate-300 sm:text-6xl dark:text-white/10">
            02
          </h2>
          <h3 className="theme-gradient-text text-3xl font-extrabold sm:text-5xl">
            Experience
          </h3>
        </div>

        {/* Main Timeline Container */}
        <div className="relative">
          {/* Central Vertical Line (Desktop: Center, Mobile: Left) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-indigo-500 to-violet-600 shadow-[0_0_12px_rgba(6,182,212,0.5)]" />

          <div className="space-y-12 sm:space-y-20">
            {experiences.map((exp, index) => {
              const isCurrentRole = exp.isCurrent || exp.date?.includes("Present");
              const isEven = index % 2 === 0;
              const year = getYear(exp.date);

              return (
                <div key={exp.id || index} className="relative group animate-fade-up">

                  {/* Year Pill Badge on Vertical Line */}
                  {year && (
                    <div className="absolute left-4 md:left-1/2 -top-6 -translate-x-1/2 z-20">
                      <span className="inline-block rounded-full border border-cyan-500/40 bg-slate-950/90 px-3.5 py-0.5 text-[11px] font-mono font-bold text-cyan-300 shadow-md backdrop-blur-md">
                        {year}
                      </span>
                    </div>
                  )}

                  {/* Glowing Circle Icon Node on Center Line */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-cyan-400 bg-slate-950/90 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)] backdrop-blur-xl transition duration-500 group-hover:scale-110 group-hover:border-emerald-400 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.8)]">
                    {renderNodeIcon(exp.iconType, isCurrentRole)}
                  </div>

                  {/* Desktop Grid Layout: Staggered Left and Right */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    {/* Content Column */}
                    <div
                      className={`pl-12 md:pl-0 ${
                        isEven ? "md:pr-14 md:text-right" : "md:col-start-2 md:pl-14 md:text-left"
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden rounded-2xl border p-5 sm:p-7 backdrop-blur-xl shadow-xl transition-all duration-500 group-hover:-translate-y-1 ${
                          isCurrentRole
                            ? "border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 via-slate-900/90 to-slate-950 shadow-emerald-500/10 hover:border-emerald-400"
                            : "border-black/10 bg-white/60 dark:border-white/15 dark:bg-slate-900/70 hover:border-cyan-500/50"
                        }`}
                      >
                        {/* Status Badge */}
                        {isCurrentRole && (
                          <div className={`mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3 py-0.5 text-[11px] font-extrabold text-emerald-300 shadow-sm ${isEven ? "md:ml-auto" : ""}`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Current Employment 🚀
                          </div>
                        )}

                        {/* Date Label */}
                        <div className={`mb-1 flex items-center gap-1 text-xs font-bold text-cyan-500 font-mono ${isEven ? "md:justify-end" : "justify-start"}`}>
                          <HiOutlineCalendar className="h-3.5 w-3.5" />
                          <span>{exp.date}</span>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-1">
                          {exp.title}
                        </h4>

                        {/* Company Name with Icon */}
                        <div className={`mb-4 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 ${isEven ? "md:justify-end" : "justify-start"}`}>
                          <span className="text-base">🏢</span>
                          <span>{exp.location}</span>
                        </div>

                        {/* Points List */}
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 text-left">
                          {exp.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-cyan-500 font-bold mt-0.5">▸</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Optional Tech Badges if Present */}
                        {exp.tags && exp.tags.length > 0 && (
                          <div className={`mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-white/10 ${isEven ? "md:justify-end" : "justify-start"}`}>
                            {exp.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="rounded-md bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-300 border border-cyan-500/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}