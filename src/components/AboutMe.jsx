import React from "react";

const AboutMe = () => {
  const stats = [
    { value: "8+", label: "Months Experience" },
    { value: "5+", label: "Projects Built" },
    { value: "3", label: "Internships" },
    { value: "10+", label: "Technologies" },
  ];

  const paragraphs = [
    <>
      I’m a <span className="font-semibold text-cyan-600 dark:text-cyan-300">Full Stack Developer</span>{" "}
      building scalable and modern applications. I specialize in crafting{" "}
      <span className="font-semibold text-violet-600 dark:text-violet-300">
        end-to-end digital products
      </span>{" "}
      — from intuitive user interfaces to robust backend architectures.
    </>,
    <>
      I work with <span className="font-semibold text-cyan-600 dark:text-cyan-300">React</span>,{" "}
      <span className="font-semibold text-cyan-600 dark:text-cyan-300">Vite</span>, and{" "}
      <span className="font-semibold text-cyan-600 dark:text-cyan-300">Tailwind CSS</span> on the
      frontend, and <span className="font-semibold text-violet-600 dark:text-violet-300">Node.js</span>,{" "}
      <span className="font-semibold text-violet-600 dark:text-violet-300">Express</span>,{" "}
      <span className="font-semibold text-violet-600 dark:text-violet-300">FastAPI</span>, and{" "}
      <span className="font-semibold text-violet-600 dark:text-violet-300">MySQL</span> on the backend.
    </>,
    <>
      My focus stays on <span className="font-semibold text-cyan-600 dark:text-cyan-300">performance</span>,{" "}
      <span className="font-semibold text-cyan-600 dark:text-cyan-300">clean architecture</span>, and{" "}
      <span className="font-semibold text-cyan-600 dark:text-cyan-300">maintainable code</span>,
      delivering smooth and user-friendly experiences.
    </>,
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-transparent px-6 py-24 md:px-20"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-16 flex items-center gap-4 animate-fade-up">
          <h1 className="text-7xl font-extrabold text-slate-300 dark:text-white/10">
            01
          </h1>
          <h2 className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent dark:from-violet-300 dark:to-cyan-300 md:text-5xl">
            About Me
          </h2>
        </div>

        <div className="group relative overflow-hidden rounded-[32px] border border-black/10 bg-white/55 p-10 backdrop-blur-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)] md:p-14 animate-fade-up">
          <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-white/20 dark:bg-white/[0.03]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/20" />

          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
            <div className="absolute -left-[50%] top-0 h-full w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent blur-xl animate-[shine_1.5s_linear]" />
          </div>

          <article className="relative z-10 space-y-6 text-lg leading-relaxed text-slate-700 dark:text-white/75">
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </article>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[24px] border border-black/10 bg-white/50 p-6 text-center backdrop-blur-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-white/[0.07] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.24)] animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-white/10 dark:bg-white/[0.02]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/15" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                <div className="absolute -left-[50%] top-0 h-full w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-xl animate-[shine_1.5s_linear]" />
              </div>

              <h3 className="relative z-10 bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent dark:from-violet-300 dark:to-cyan-300">
                {item.value}
              </h3>
              <p className="relative z-10 mt-2 text-sm text-slate-600 dark:text-white/55">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;