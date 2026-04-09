import React from "react";
import { motion } from "framer-motion";
import { FaPython, FaReact, FaDatabase, FaTools } from "react-icons/fa";

void motion;

const skills = [
  {
    category: "Python Full Stack + AI Developer",
    icon: <FaPython className="text-cyan-400 w-6 h-6" />,
    items: [
      "Python",
      "HTML",
      "CSS",
      "React.js",
      "Django",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "PyTorch",
      "Node.js",
      "AWS EC2",
      "JavaScript",
    ],
  },
  {
    category: "Full Stack Web Developer (MERN)",
    icon: <FaReact className="text-cyan-400 w-6 h-6" />,
    items: [
      "JavaScript ES6",
      "React.js",
      "Node.js",
      "Redux",
      "Express.js",
      "Tailwind CSS",
      "Bootstrap",
      "HTML",
      "CSS",
      "MongoDB",
    ],
  },
  {
    category: "Backend & Databases",
    icon: <FaDatabase className="text-purple-400 w-6 h-6" />,
    items: ["REST API", "FastAPI", "MongoDB", "MySQL"],
  },
  {
    category: "Tools & Version Control",
    icon: <FaTools className="text-cyan-400 w-6 h-6" />,
    items: ["Git", "GitHub"],
  },
];

const SkillsSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-slate-100 px-6 py-24 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white"
      id="skills"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 blur-[150px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/20 blur-[150px]" />

      {/* ✨ Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* 🔥 Title */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <h2 className="text-6xl font-bold text-slate-300 dark:text-white/10">05</h2>
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Tools
          </h3>
        </div>

        {/* 💎 Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.07, rotateX: 5, rotateY: 5 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white/75 p-6 text-left shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
            >
              {/* Glow Border */}
              <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 opacity-0 group-hover:opacity-100 transition duration-500" />
              {/* Light Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 blur-xl transition duration-700 group-hover:opacity-100 dark:via-white/5" />

              <div className="flex items-center gap-3 mb-4">
                {/* Icon */}
                {skill.icon}
                <h4 className="text-lg font-semibold text-cyan-400">
                  {skill.category}
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ scale: 1.1, rotateZ: 2 }}
                    className="cursor-pointer rounded-full border border-slate-200/80 bg-slate-100/80 px-3 py-1 text-sm text-slate-700 shadow-[0_0_15px_rgba(34,211,238,0.15)] transition hover:bg-cyan-500/20 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:shadow-[0_0_15px_rgba(34,211,238,0.2)] dark:hover:text-white"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
