import React from "react";
import { motion } from "framer-motion";
import {
  FaCodeBranch,
  FaMicrophone,
  FaRegCalendarAlt
} from "react-icons/fa";

void motion;

const activities = [
  {
    title: "Manipur Tourism Website",
    description:
      "Developed a responsive tourism platform highlighting destinations and culture of Manipur.",
    date: "June 2025",
    tags: ["React", "Tailwind", "Frontend"],
    icon: <FaCodeBranch />,
  },
  {
    title: "To-Do List Web App",
    description:
      "Built a full-stack task management system using React.js, Node.js and MongoDB.",
    date: "April 2024",
    tags: ["React", "Node.js", "MongoDB"],
    icon: <FaCodeBranch />,
  },
  {
    title: "AI Voice Assistant",
    description:
      "Multilingual AI assistant supporting English and Meitei Mayek with speech recognition.",
    date: "2025",
    tags: ["AI", "Speech"],
    icon: <FaMicrophone />,
  },
  {
    title: "Web Development Projects",
    description:
      "Created multiple responsive websites while learning full-stack development.",
    date: "2023-2025",
    tags: ["Projects", "Development"],
    icon: <FaRegCalendarAlt />,
  },
];

const ActivitiesSection = () => {
  return (
    <section
      id="activities"
      className="relative overflow-hidden bg-slate-50 px-6 py-24 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 blur-[140px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/20 blur-[140px]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* 🔥 Title */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <h2 className="text-6xl font-bold text-slate-300 dark:text-white/10">04</h2>
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Activities & Engagements
          </h3>
        </div>

        {/* 💎 Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.06 }}
              className="group rounded-2xl border border-slate-200/80 bg-white/75 p-6 shadow-xl backdrop-blur-xl transition hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
            >

              {/* Icon + Title */}
              <div className="flex items-center mb-4">

                <div className="text-cyan-400 text-2xl group-hover:scale-110 transition">
                  {activity.icon}
                </div>

                <h4 className="ml-3 text-lg font-semibold text-slate-900 dark:text-white">
                  {activity.title}
                </h4>

              </div>

              <p className="mb-4 text-slate-600 dark:text-gray-300">
                {activity.description}
              </p>

              <p className="text-sm text-purple-400 mb-4">
                {activity.date}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">

                {activity.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-slate-200/80 bg-slate-100/80 px-3 py-1 text-xs text-slate-600 transition hover:bg-cyan-500/20 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white"
                  >
                    {tag}
                  </span>
                ))}

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ActivitiesSection;
