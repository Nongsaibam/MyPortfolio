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

const projects = [
  {
    title: "Face2Comic",
    description:
      "A Pix2Pix cGAN-based approach to cartoonify human portraits using TensorFlow and CNN.",
    tags: ["Python", "TensorFlow", "cGAN"],
    image: "/images/face2comic.jpg",
    gitLink: "https://github.com/Nongsaibam/Face2Comic",
    category: "AI/ML",
    featured: true,
  },
  {
    title: "Image Captioning",
    description:
      "Generative model to create captions for images using Flickr8k dataset with CNN and Transformer architecture.",
    tags: ["Python", "CNN", "Transformers"],
    image: "/images/imagecaptioning.jpg",
    gitLink: "https://github.com/Nongsaibam/ImageCaptioning",
    category: "AI/ML",
    featured: true,
  },
  {
    title: "Facial Recognition System",
    description:
      "Real-time facial recognition system using Haar Cascade and OpenCV for accurate identification.",
    tags: ["Python", "OpenCV", "Haar Cascade"],
    image: "/images/facialrecognition.jpg",
    gitLink: "https://github.com/Nongsaibam/FacialRecognitionSystem",
    category: "Computer Vision",
    featured: false,
  },
  {
    title: "Mini CRM",
    description:
      "A simple Customer Relationship Management application with Node.js, Express, React, and Vite for managing leads and customer interactions.",
    tags: ["JavaScript", "Node.js", "React"],
    image: miniCrmImg,
    gitLink: "https://github.com/Nongsaibam/FUTURE_FS_02.git",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "Coffee Shop Business Website",
    description:
      "A modern coffee shop website built with React, Vite, and Tailwind CSS featuring responsive design, menu display, and table booking.",
    tags: ["React", "Tailwind CSS", "Vite", "Frontend"],
    image: coffeeShopImg,
    gitLink: "https://github.com/Nongsaibam/FUTURE_FS_03.git",
    category: "Frontend",
    featured: false,
  },
  {
    title: "OTP Login System (MultiApp)",
    description:
      "A full-stack OTP authentication system with one UI and two backend implementations.",
    features: [
      "Frontend: React + Vite + Tailwind",
      "Backend (Node): Express + MySQL + JWT + Twilio",
      "Backend (Python): FastAPI + MySQL + JWT + Twilio",
    ],
    tags: ["React", "Tailwind CSS", "Vite", "Node.js", "FastAPI"],
    image: multiAppImg,
    gitLink: "https://github.com/Nongsaibam/One-UI-Two-Backend.git",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "EduLearn - Student Portal",
    description:
      "A full-stack learning platform with AI features, gamification, and dashboards.",
    features: [
      "Frontend: React + Vite + Tailwind",
      "Backend: Express.js API",
      "AI chatbot & recommendations",
      "Gamification & leaderboard",
      "Student & Admin dashboards",
    ],
    tags: ["React", "Tailwind CSS", "Node.js", "AI"],
    image: eduImg,
    gitLink: "https://github.com/Nongsaibam/EduLearn.git",
    category: "Full Stack",
    featured: false,
  },
];

const allFilters = [
  "All",
  "Featured",
  "AI/ML",
  "Computer Vision",
  "Full Stack",
  "Frontend",
];

function TiltCard({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export default function FeaturedProjects() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const query = search.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "All"
          ? true
          : activeFilter === "Featured"
            ? project.featured
            : project.category === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-transparent px-6 py-20 text-slate-900 transition-colors duration-500 dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-black md:text-6xl">
            <span className="mr-3 text-slate-300 dark:text-white/20">03</span>
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {allFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-[0_8px_30px_rgba(34,211,238,0.35)]"
                  : "border border-black/10 bg-white/55 text-slate-700 backdrop-blur-xl hover:bg-white hover:text-slate-950 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div key={index}>
              <TiltCard className="group relative h-full transition-all duration-500 hover:-translate-y-3">
                <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-cyan-400/30 via-transparent to-fuchsia-400/20 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-white/55 backdrop-blur-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.15)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                    <div className="absolute -left-[50%] top-0 h-full w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl animate-[shine_1.5s_linear]" />
                  </div>

                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {project.featured && (
                      <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md dark:text-white">
                        Featured
                      </div>
                    )}

                    <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-xs backdrop-blur-md dark:text-white">
                      {project.category}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">
                      {project.description}
                    </p>

                    {project.features && (
                      <div className="mt-4 space-y-2">
                        {project.features.slice(0, 2).map((feature, i) => (
                          <div
                            key={i}
                            className="rounded-xl border border-black/10 bg-white/55 px-3 py-2 text-xs text-slate-700 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <button
                          key={i}
                          onClick={() => setSearch(tag)}
                          className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-xs text-slate-700 transition hover:scale-105 hover:bg-cyan-500/20 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white/55 px-4 py-3 text-sm font-medium text-slate-800 transition hover:scale-105 hover:bg-white dark:border-white/15 dark:bg-white/[0.08] dark:text-white"
                      >
                        <HiOutlineEye />
                        Preview
                      </button>

                      <a
                        href={project.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105"
                      >
                        <HiOutlineCodeBracket />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="rounded-[2rem] border border-black/10 bg-white/55 px-6 py-16 text-center backdrop-blur-2xl dark:border-white/15 dark:bg-white/[0.08]">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              No projects found
            </h3>
            <p className="mt-3 text-slate-600 dark:text-white/55">
              Try another search term or choose a different filter.
            </p>
          </div>
        )}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-black/10 bg-white/55 shadow-[0_20px_80px_rgba(15,23,42,0.2)] backdrop-blur-3xl dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/40 text-white transition hover:bg-slate-950/60"
            >
              <HiOutlineXMark className="text-2xl" />
            </button>

            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full min-h-[280px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-8">
                <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  {selectedProject.category}
                </div>

                <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                  {selectedProject.title}
                </h3>
                <p className="mt-4 leading-8 text-slate-600 dark:text-white/65">
                  {selectedProject.description}
                </p>

                {selectedProject.features && (
                  <div className="mt-5 space-y-2">
                    {selectedProject.features.map((feature, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-black/10 bg-white/55 px-4 py-3 text-sm text-slate-700 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-xs text-slate-700 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={selectedProject.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 font-semibold text-white shadow-lg"
                  >
                    <HiOutlineArrowTopRightOnSquare />
                    Open GitHub
                  </a>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-xl border border-black/10 bg-white/55 px-5 py-3 font-medium text-slate-800 transition hover:bg-slate-200 dark:border-white/15 dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
