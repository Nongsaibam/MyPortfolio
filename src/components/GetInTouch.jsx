import React from "react";
import { motion } from "framer-motion";

const GetInTouch = () => {
  return (
    <section
      className="relative bg-black text-white py-24 px-6 text-center overflow-hidden"
      id="contact"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute top-[-120px] left-[-80px] w-[400px] h-[400px] bg-purple-500/20 blur-[120px]" />
      <div className="absolute bottom-[-120px] right-[-80px] w-[400px] h-[400px] bg-cyan-500/20 blur-[120px]" />

      {/* ✨ Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* 🔥 Title */}
        <h2 className="text-5xl font-bold flex justify-center items-center gap-3">
          <span className="text-white/10">06</span>
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>

        {/* 💬 Description */}
        <p className="mt-6 text-gray-300 text-lg leading-relaxed">
          I’m currently looking for new opportunities and open to collaborations,
          especially in <span className="text-cyan-400">AI</span> and{" "}
          <span className="text-purple-400">Machine Learning</span> projects.
        </p>

        {/* 🚀 Button */}
        <div className="mt-10">
          <motion.a
            href="mailto:nongsaibamtazkhan@gmail.com"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(255,0,255,0.5)] transition"
          >
            Say Hello 🚀
          </motion.a>
        </div>

        {/* 🧊 Glass Footer */}
        <footer className="mt-20 relative group backdrop-blur-2xl bg-white/5 border border-white/10 rounded-xl py-6 text-sm text-gray-400 overflow-hidden">
          {/* Glow Border */}
          <div className="absolute inset-0 rounded-xl border border-cyan-400/20 opacity-0 group-hover:opacity-100 transition duration-500" />
          {/* Light Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition duration-700" />

          <p>Designed & Built by Nongsaibam Tazkhan © 2025</p>
          <p className="mt-1 text-xs text-gray-500">
            Crafted with React, Tailwind & Passion ✨
          </p>
        </footer>

      </div>
    </section>
  );
};

export default GetInTouch;
