import React from "react";
import { motion } from "framer-motion";

void motion;

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
    "Completed Task 1, Task 2, and Task 3 in a structured full-stack development program.",
    "Developed responsive and modern web interfaces using React.js, Vite, and Tailwind CSS.",
    "Built scalable backend services using Node.js and Express.js.",
    "Integrated REST APIs and implemented full CRUD functionality.",
    "Worked with MySQL and MongoDB for efficient data management.",
    "Applied real-world problem-solving skills through task-based assignments.",
    "Improved UI/UX, performance, and overall project structure.",
    "Maintained clean, modular, and scalable code practices.",
    "Strengthened frontend and backend integration skills.",
    "Collaborated in an industry-oriented development environment."
  ],
}
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-slate-100 px-6 py-24 text-slate-900 transition-colors duration-500 md:px-16 dark:bg-slate-950 dark:text-white"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-purple-500/20 blur-[180px]" />
      <div className="absolute bottom-[-150px] right-[-120px] w-[500px] h-[500px] bg-cyan-500/20 blur-[160px]" />

      {/* ✨ Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />

      <div className="relative max-w-5xl mx-auto z-10">
        
        {/* 🔥 Title */}
        <div className="flex items-center gap-4 mb-20">
          <h2 className="text-6xl font-bold text-slate-300 dark:text-white/10">02</h2>
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h3>
        </div>

        {/* 🧠 Timeline */}
        <div className="relative space-y-16 border-l border-slate-300/80 pl-10 dark:border-white/10">

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative"
            >
              {/* ✨ Neon Dot */}
              <div className="absolute -left-[22px] top-3 w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />

              {/* 💎 Glass Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/75 p-6 shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-2xl transition duration-300 hover:scale-[1.03] dark:border-white/10 dark:bg-white/5 md:p-8">
                
                {/* Glow Border */}
                <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 opacity-0 group-hover:opacity-100 transition duration-500" />
                {/* Light Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 blur-xl transition duration-700 group-hover:opacity-100 dark:via-white/5" />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-cyan-400">
                    {exp.title}
                  </h4>
                  <span className="text-sm font-medium text-purple-400">
                    {exp.date}
                  </span>
                </div>

                <p className="mb-4 text-slate-600 dark:text-gray-300">
                  {exp.location}
                </p>

                <ul className="list-inside list-disc space-y-1 text-slate-600 dark:text-gray-300">
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
