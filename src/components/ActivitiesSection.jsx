import React from "react";
import { motion } from "framer-motion";
import {
  FaCodeBranch,
  FaMicrophone,
  FaRegCalendarAlt
} from "react-icons/fa";

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
      className="relative bg-black text-white py-24 px-6 overflow-hidden"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 blur-[140px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/20 blur-[140px]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* 🔥 Title */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <h2 className="text-6xl font-bold text-white/10">04</h2>
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
              className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition"
            >

              {/* Icon + Title */}
              <div className="flex items-center mb-4">

                <div className="text-cyan-400 text-2xl group-hover:scale-110 transition">
                  {activity.icon}
                </div>

                <h4 className="ml-3 text-lg font-semibold text-white">
                  {activity.title}
                </h4>

              </div>

              <p className="text-gray-300 mb-4">
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
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-cyan-500/20 hover:text-white transition"
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
