import React from "react";
import { motion } from "framer-motion";

void motion;

// 🔹 Animation configs (reusable)
const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const AboutMe = () => {
  const stats = [
    { value: "8+", label: "Months Experience" },
    { value: "5+", label: "Projects Built" },
    { value: "3", label: "Internships" },
    { value: "10+", label: "Technologies" },
  ];

  const paragraphs = [
    <>
      I’m a{" "}
      <span className="text-cyan-400 font-semibold">
        Full Stack Developer
      </span>{" "}
      building scalable and modern applications. I specialize in crafting{" "}
      <span className="text-purple-400 font-semibold">
        end-to-end digital products
      </span>{" "}
      — from intuitive user interfaces to robust backend architectures.
    </>,
    <>
      I work with{" "}
      <span className="text-cyan-400 font-semibold">React</span>,{" "}
      <span className="text-cyan-400 font-semibold">Vite</span>, and{" "}
      <span className="text-cyan-400 font-semibold">Tailwind CSS</span> on the
      frontend, and{" "}
      <span className="text-purple-400 font-semibold">Node.js</span>,{" "}
      <span className="text-purple-400 font-semibold">Express</span>,{" "}
      <span className="text-purple-400 font-semibold">FastAPI</span>, and{" "}
      <span className="text-purple-400 font-semibold">MySQL</span> on the backend.
    </>,
    <>
      My focus stays on{" "}
      <span className="text-cyan-400 font-semibold">performance</span>,{" "}
      <span className="text-cyan-400 font-semibold">clean architecture</span>, and{" "}
      <span className="text-cyan-400 font-semibold">maintainable code</span>,
      delivering smooth and user-friendly experiences.
    </>,
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-slate-50 px-6 py-24 md:px-20 dark:bg-slate-950"
    >
      {/* 🔥 Background Glow */}
      <div className="pointer-events-none absolute top-[-200px] left-[-150px] h-[600px] w-[600px] bg-purple-500/20 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-[-150px] right-[-120px] h-[500px] w-[500px] bg-cyan-500/20 blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* 🔹 Title */}
        <div className="mb-16 flex items-center gap-4">
          <h1 className="text-7xl font-extrabold text-slate-300 dark:text-white/10">
            01
          </h1>
          <h2 className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            About Me
          </h2>
        </div>

        {/* 🔹 Glass Card */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-10 shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 md:p-14"
        >
          {/* Hover Effects */}
          <div className="absolute inset-0 rounded-3xl border border-cyan-400/20 opacity-0 transition group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 blur-xl transition group-hover:opacity-100 dark:via-white/5" />

          {/* Content */}
          <article className="relative z-10 space-y-6 text-lg leading-relaxed text-slate-700 dark:text-white/90">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.2 }}
              >
                {text}
              </motion.p>
            ))}
          </article>
        </motion.div>

        {/* 🔹 Stats */}
        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.08 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-6 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 opacity-0 transition group-hover:opacity-100" />
              
              <h3 className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
                {item.value}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-gray-300">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
