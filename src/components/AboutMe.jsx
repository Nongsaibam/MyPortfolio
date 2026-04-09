import React from "react";
import { motion } from "framer-motion";

void motion;

const AboutMe = () => {
  const stats = [
    { value: "8+", label: "Months Experience" },
    { value: "5+", label: "Projects Built" },
    { value: "2", label: "Internships" },
    { value: "10+", label: "Technologies" },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-slate-50 px-6 py-24 text-slate-900 transition-colors duration-500 md:px-20 dark:bg-[#030712] dark:text-white"
    >
      {/* Glow Blurs */}
      <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-purple-500/20 blur-[180px] z-0" />
      <div className="absolute bottom-[-150px] right-[-120px] w-[500px] h-[500px] bg-cyan-500/20 blur-[160px] z-0" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] z-0" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto z-10">
        {/* Title */}
        <div className="flex items-center gap-4 mb-16">
          <h1 className="text-7xl font-extrabold text-slate-300 dark:text-white/10">01</h1>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
        </div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative group overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-10 shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 md:p-14"
        >
          <div className="absolute inset-0 rounded-3xl border border-cyan-400/20 opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 blur-xl transition duration-700 group-hover:opacity-100 dark:via-white/5" />

          <article className="relative z-10 space-y-6 text-lg leading-relaxed text-slate-700 dark:text-white/90">
            {[
              <>
                My name is <span className="text-cyan-400 font-semibold">Nongsaibam Tazkhan</span>. I’m basically from <span className="text-purple-400 font-semibold">Manipur</span> and currently living in <span className="text-purple-400 font-semibold">Bangalore</span>. I have completed my Bachelor’s degree in Computer Applications (BCA) from <span className="text-cyan-400 font-semibold">Manipur University</span>.
              </>,
              <>
                During my studies, I completed two MERN stack internships — one for 6 months at <span className="text-purple-400 font-semibold">CodeXp</span> in Manipur, and another for 2 months at <span className="text-purple-400 font-semibold">Wayspire</span> in Delhi.
              </>,
              <>
                During my internship, I created the <span className="text-cyan-400 font-semibold">Manipur Tourism website</span>, focusing on the front-end using <span className="text-purple-400 font-semibold">HTML</span> and <span className="text-purple-400 font-semibold">Tailwind CSS</span>. I also developed a personal web application called the <span className="text-cyan-400 font-semibold">"To-Do List App"</span>, handling front-end with React.js, HTML, CSS, and back-end with Node.js, Express.js, and MongoDB.
              </>
            ].map((content, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.3 }}
              >
                {content}
              </motion.p>
            ))}
          </article>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.08 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-6 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition" />
              <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{item.value}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-gray-300">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
