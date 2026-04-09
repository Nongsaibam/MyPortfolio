import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineCodeBracket,
  HiOutlineEye,
  HiOutlineXMark,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";

void motion;

// Import your local images
import miniCrmImg from "../assets/ProjectIMG/crm.png";
import coffeeShopImg from "../assets/ProjectIMG/Business.png";
import multiAppImg from "../assets/ProjectIMG/Multi.png";
import Edu from "../assets/ProjectIMG/Edu.png";

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
    "Student & Admin dashboards"
  ],

  tags: ["React", "Tailwind CSS", "Node.js", "AI"],
  image: Edu,
  gitLink: "https://github.com/Nongsaibam/EduLearn.git",
  category: "Full Stack",
},
];

const allFilters = ["All", "Featured", "AI/ML", "Computer Vision", "Full Stack", "Frontend"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function TiltCard({ children, className = "" }) {
  const [transform, setTransform] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
  );

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 14;
    const rotateX = ((y / rect.height) - 0.5) * -14;

    setTransform(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
    );
  };

  const reset = () => {
    setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform }}
      className={`transition-transform duration-200 will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

export default function FeaturedProjects() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const q = search.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        project.category.toLowerCase().includes(q);

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
      className="relative overflow-hidden bg-slate-50 px-6 py-20 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white"
      id="projects"
    >
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-100px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="absolute right-[-120px] bottom-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute left-[35%] top-[20%] h-[260px] w-[260px] rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-4xl text-center">
         

          <h2 className="mb-4 text-4xl font-black md:text-6xl">
            <span className="mr-3 text-slate-300 dark:text-white/20">03</span>
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

        
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {allFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-[0_8px_30px_rgba(34,211,238,0.35)]"
                  : "border border-slate-300/70 bg-white/70 text-slate-700 backdrop-blur-xl hover:bg-white hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <TiltCard className="group relative h-full">
                <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-cyan-400/30 via-transparent to-fuchsia-400/20 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/10 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="h-56 w-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.45 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                    {project.featured && (
                      <div className="absolute left-4 top-4 rounded-full border border-cyan-300/20 bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-xl">
                        Featured
                      </div>
                    )}

                    <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-slate-950/30 px-3 py-1 text-xs text-white/80 backdrop-blur-xl">
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">
                      {project.description}
                    </p>

                    {project.features && (
                      <div className="mt-4 space-y-2">
                        {project.features.slice(0, 2).map((feature, i) => (
                          <div
                            key={i}
                            className="rounded-xl border border-slate-200/80 bg-slate-100/80 px-3 py-2 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setSearch(tag)}
                          className="rounded-full border border-slate-200/80 bg-slate-100/80 px-3 py-1 text-xs text-slate-700 transition hover:bg-cyan-500/20 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:text-white"
                          whileHover={{ scale: 1.08 }}
                        >
                          {tag}
                        </motion.button>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-slate-100/80 px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
                      >
                        <HiOutlineEye />
                        Preview
                      </button>

                      <a
                        href={project.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/80 to-blue-500/80 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                      >
                        <HiOutlineCodeBracket />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 px-6 py-16 text-center backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No projects found</h3>
            <p className="mt-3 text-slate-600 dark:text-white/55">
              Try another search term or choose a different filter.
            </p>
          </div>
        )}
      </div>

      {/* Quick Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.92 }}
              transition={{ duration: 0.28 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-[0_20px_80px_rgba(15,23,42,0.2)] backdrop-blur-3xl dark:border-white/10 dark:bg-slate-900/90 dark:shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
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

                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">{selectedProject.title}</h3>
                  <p className="mt-4 leading-8 text-slate-600 dark:text-white/65">
                    {selectedProject.description}
                  </p>

                  {selectedProject.features && (
                    <div className="mt-5 space-y-2">
                      {selectedProject.features.map((feature, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-slate-200/80 bg-slate-100/80 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/75"
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
                        className="rounded-full border border-slate-200/80 bg-slate-100/80 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
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
                      className="rounded-xl border border-slate-200/80 bg-slate-100/80 px-5 py-3 font-medium text-slate-800 transition hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
