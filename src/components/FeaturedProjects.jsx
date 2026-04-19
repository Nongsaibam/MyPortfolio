import React, { useMemo, useState } from "react";
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCodeBracket,
  HiOutlineEye,
  HiOutlineXMark,
} from "react-icons/hi2";

import miniCrmImg from "../assets/ProjectIMG/crm.png";
import coffeeShopImg from "../assets/ProjectIMG/Business.png";
import multiAppImg from "../assets/ProjectIMG/Multi.png";
import eduImg from "../assets/ProjectIMG/Edu.png";

/* ---------------- PROJECT DATA ---------------- */

const projects = [
  {
    title: "Mini CRM",
    description:
      "Customer management system with React, Node.js, and Express.",
    tags: ["React", "Node.js", "Express"],
    image: miniCrmImg,
    gitLink: "https://github.com/Nongsaibam/FUTURE_FS_02.git",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "Coffee Shop Website",
    description:
      "Modern responsive coffee website built using React + Tailwind.",
    tags: ["React", "Tailwind"],
    image: coffeeShopImg,
    gitLink: "https://github.com/Nongsaibam/FUTURE_FS_03.git",
    category: "Frontend",
  },
  {
    title: "OTP MultiApp",
    description:
      "OTP authentication system with Node + FastAPI backends.",
    tags: ["React", "Node.js", "FastAPI"],
    image: multiAppImg,
    gitLink: "https://github.com/Nongsaibam/One-UI-Two-Backend.git",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "EduLearn Portal",
    description:
      "Full-stack AI-powered student portal with dashboards.",
    tags: ["React", "Node.js", "AI"],
    image: eduImg,
    gitLink: "https://github.com/Nongsaibam/EduLearn.git",
    category: "Full Stack",
  },
];

const filters = ["All", "Featured", "Full Stack", "Frontend"];

/* ---------------- COMPONENT ---------------- */

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Featured") return p.featured;
      return p.category === activeFilter;
    });
  }, [activeFilter]);

  return (
    <section className="px-6 py-20 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <h2 className="text-center text-4xl md:text-6xl font-black mb-12">
          <span className="text-slate-400 dark:text-white/20 mr-3">03</span>
          <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeFilter === f
                  ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white"
                  : "border border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/[0.06]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <div
              key={i}
              className="group rounded-3xl border border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/[0.06] backdrop-blur-xl p-5 transition hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={project.image}
                alt=""
                className="rounded-xl mb-4 h-48 w-full object-cover"
              />

              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-sm mt-2 text-slate-600 dark:text-white/60">
                {project.description}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-white/60 dark:bg-white/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="grid grid-cols-2 gap-3 mt-6">

                {/* ✅ FIXED PREVIEW BUTTON */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="
                    flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300

                    border border-slate-200 bg-white/70 text-slate-800
                    hover:bg-white hover:shadow-md

                    dark:border-white/10 dark:bg-white/[0.06] dark:text-white/80
                    dark:hover:bg-white/[0.12] dark:hover:text-white

                    hover:scale-105
                  "
                >
                  <HiOutlineEye />
                  Preview
                </button>

                {/* GITHUB */}
                <a
                  href={project.gitLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 text-sm font-semibold hover:scale-105 transition"
                >
                  <HiOutlineCodeBracket />
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedProject && (
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white/70 dark:bg-white/[0.08] backdrop-blur-2xl rounded-3xl p-6 max-w-xl w-full relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4"
              >
                <HiOutlineXMark size={24} />
              </button>

              <img
                src={selectedProject.image}
                className="rounded-xl mb-4"
              />

              <h3 className="text-2xl font-bold">
                {selectedProject.title}
              </h3>
              <p className="mt-3 text-slate-600 dark:text-white/60">
                {selectedProject.description}
              </p>

              <a
                href={selectedProject.gitLink}
                target="_blank"
                className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-3 rounded-xl"
              >
                <HiOutlineArrowTopRightOnSquare />
                Open GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}