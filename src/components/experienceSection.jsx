import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Full Stack Web Developer Intern",
    date: "Jan 2025 - Jun 2025",
    location: "Manipur CodeXP",
    points: [
      "Developed a Tourism Website using MERN stack.",
      "Built responsive UI with React and Tailwind.",
      "Implemented REST APIs and backend services.",
    ],
  },
  {
    title: "Full Stack Web Developer Intern",
    date: "Apr 2024 - Jun 2024",
    location: "Wayspire Ed-Tech Private Limited",
    points: [
      "Developed a To-Do App using React.",
      "Implemented state management and API integration.",
      "Worked in an agile development team.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative py-24 px-6 md:px-16 bg-black text-white overflow-hidden"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-purple-500/20 blur-[180px]" />
      <div className="absolute bottom-[-150px] right-[-120px] w-[500px] h-[500px] bg-cyan-500/20 blur-[160px]" />

      {/* ✨ Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />

      <div className="relative max-w-5xl mx-auto z-10">
        
        {/* 🔥 Title */}
        <div className="flex items-center gap-4 mb-20">
          <h2 className="text-6xl font-bold text-white/10">02</h2>
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h3>
        </div>

        {/* 🧠 Timeline */}
        <div className="relative border-l border-white/10 pl-10 space-y-16">

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
              <div className="backdrop-blur-2xl bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl shadow-[0_0_60px_rgba(34,211,238,0.15)] hover:scale-[1.03] transition duration-300 relative overflow-hidden group">
                
                {/* Glow Border */}
                <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 opacity-0 group-hover:opacity-100 transition duration-500" />
                {/* Light Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition duration-700" />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-cyan-400">
                    {exp.title}
                  </h4>
                  <span className="text-sm font-medium text-purple-400">
                    {exp.date}
                  </span>
                </div>

                <p className="text-gray-300 mb-4">
                  {exp.location}
                </p>

                <ul className="list-disc list-inside text-gray-300 space-y-1">
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
