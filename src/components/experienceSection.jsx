import React from "react";

const experiences = [
  {
    title: "Full Stack Web Development Intern",
    date: "Apr 2024 - Jun 2024",
    location: "Wayspire Ed-Tech Private Limited",
    points: [
      "Developed a To-Do App using React.",
      "Implemented state management and API integration.",
      "Worked in an agile development team.",
    ],
  },
  {
    title: "Full Stack Web Development Intern",
    date: "Jan 2025 - Jun 2025",
    location: "Manipur CodeXP",
    points: [
      "Developed a Tourism Website using MERN stack.",
      "Built responsive UI with React and Tailwind.",
      "Implemented REST APIs and backend services.",
    ],
  },
  {
    title: "Full Stack Web Development Intern",
    date: "Mar 2026 - Apr 2026",
    location: "Future Interns",
    points: [
      "Completed multiple full-stack tasks and projects.",
      "Built scalable backend services using Node.js.",
      "Worked with MySQL & MongoDB.",
      "Improved UI/UX and performance.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-transparent px-6 py-24 md:px-16"
    >
      <div className="relative z-10 mx-auto max-w-5xl">

        {/* 🔥 Title */}
        <div className="mb-20 flex items-center gap-4">
          <h2 className="text-6xl font-bold text-slate-300 dark:text-white/10">
            02
          </h2>
          <h3 className="bg-gradient-to-r from-violet-500 to-cyan-500 dark:from-violet-300 dark:to-cyan-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Experience
          </h3>
        </div>

        {/* Timeline */}
        <div className="relative space-y-16 border-l border-black/10 pl-10 dark:border-white/10">

          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative group transition-all duration-500 hover:-translate-y-2"
            >

              {/* ✨ Animated Dot */}
              <div className="absolute -left-[18px] top-5 h-3.5 w-3.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-pulse" />

              {/* 💎 Glass Card */}
              <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/55 p-6 backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] md:p-8">

                {/* ✨ Shine Animation */}
                <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                  <div className="absolute -left-[50%] top-0 h-full w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl animate-[shine_1.5s_linear]" />
                </div>

                {/* Content */}
                <div className="relative z-10">

                  <div className="mb-3 flex flex-col md:flex-row md:items-center md:justify-between">
                    <h4 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
                      {exp.title}
                    </h4>
                    <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
                      {exp.date}
                    </span>
                  </div>

                  <p className="mb-4 text-slate-600 dark:text-white/60">
                    {exp.location}
                  </p>

                  <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-white/70">
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}