import React from "react";

const GetInTouch = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-100 px-6 py-24 text-center text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-[-80px] top-[-120px] h-[400px] w-[400px] bg-purple-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-120px] right-[-80px] h-[400px] w-[400px] bg-cyan-500/20 blur-[120px]" />

      {/* Noise Texture */}
      <div className="surface-noise pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Title */}
        <h2 className="flex items-center justify-center gap-3 text-4xl font-bold md:text-5xl">
          <span className="text-slate-300 dark:text-white/10">06</span>
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-gray-300">
          I’m actively seeking new opportunities and open to collaborations in{" "}
          <span className="font-semibold text-cyan-400">
            Full Stack Web Development
          </span>{" "}
          and{" "}
          <span className="font-semibold text-purple-400">
            AI / Machine Learning
          </span>
          .
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:nongsaibamtazkhan@gmail.com"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,0.35)] transition hover:shadow-[0_0_25px_rgba(168,85,247,0.45)]"
          >
            Say Hello👋
          </a>

         
        </div>

        {/* Glass Footer */}
        <footer className="group relative mt-20 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/75 py-6 text-sm text-slate-500 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
          {/* Glow Border */}
          <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 opacity-0 transition duration-500 group-hover:opacity-100" />

          {/* Light Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 blur-xl transition duration-700 group-hover:opacity-100 dark:via-white/5" />

          <div className="relative z-10">
            <p>Designed & Built by Nongsaibam Tazkhan © 2026</p>
            <p className="mt-1 text-xs text-slate-400 dark:text-gray-500">
              Crafted with React, Tailwind CSS & Passion ✨
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default GetInTouch;
