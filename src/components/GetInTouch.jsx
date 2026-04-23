const GetInTouch = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-transparent px-6 py-24 text-center text-slate-900 dark:text-white"
    >
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="animate-fade-up">
          <h2 className="flex items-center justify-center gap-3 text-4xl font-bold md:text-5xl">
            <span className="text-slate-300 dark:text-white/10">06</span>
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-300 dark:to-cyan-300">
              Get In Touch
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-white/70">
            I’m actively seeking new opportunities and open to collaborations in{" "}
            <span className="font-semibold text-cyan-600 dark:text-cyan-300">
              Full Stack Web Development
            </span>{" "}
            and{" "}
            <span className="font-semibold text-violet-600 dark:text-violet-300">
              AI / Machine Learning
            </span>
            .
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up">
          <a
            href="mailto:nongsaibamtazkhan@gmail.com"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:scale-105"
          >
            Say Hello 👋
          </a>
        </div>

        <footer className="group relative mt-20 overflow-hidden rounded-[28px] border border-black/10 bg-white/55 py-6 text-sm text-slate-500 backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-white/[0.08] dark:text-white/55 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.25)] animate-fade-up">
          <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-white/10 dark:bg-white/[0.02]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/20" />

          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
            <div className="absolute -left-[50%] top-0 h-full w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-xl animate-[shine_1.5s_linear]" />
          </div>

          <div className="relative z-10">
            <p>Designed & Built by Nongsaibam Tazkhan</p>
            <p className="mt-1 text-xs text-slate-400 dark:text-white/40">
              Crafted with React, Tailwind CSS & Passion ✨
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default GetInTouch;
