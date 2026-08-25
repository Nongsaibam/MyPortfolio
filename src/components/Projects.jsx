import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePortfolioData } from "../context/PortfolioContext";
import SEO from "./SEO";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCodeBracket,
  HiOutlineXMark,
} from "react-icons/hi2";

import miniCrmImg from "../assets/ProjectIMG/crm.png";
import coffeeShopImg from "../assets/ProjectIMG/Business.png";
import multiAppImg from "../assets/ProjectIMG/Multi.png";
import eduImg from "../assets/ProjectIMG/Edu.png";
import dasImg from "../assets/ProjectIMG/das.png";
import vitalImg from "../assets/ProjectIMG/Vital.png";
import myTaskImg from "../assets/ProjectIMG/mytask.png";
import aiImg from "../assets/ProjectIMG/ai.png";
import settingImg from "../assets/ProjectIMG/setting.png";

const initialProjects = [
  {
    slug: "mini-crm",
    title: "Mini CRM",
    description:
      "Customer management system with React, Node.js, and Express.",
    longDescription:
      "Mini CRM helps teams manage customer records, contact workflows, and business operations in one clean full-stack system.",
    tags: ["React", "Node.js", "Express"],
    image: miniCrmImg,
    gitLink: "https://github.com/Nongsaibam/FUTURE_FS_02.git",
    category: "Full Stack",
    featured: true,
  },
  {
    slug: "coffee-shop-website",
    title: "Coffee Shop Website",
    description:
      "Modern responsive coffee website built using React + Tailwind.",
    longDescription:
      "A premium frontend coffee website with responsive sections, modern UI, and a polished brand-focused landing page experience.",
    tags: ["React", "Tailwind"],
    image: coffeeShopImg,
    gitLink: "https://github.com/Nongsaibam/FUTURE_FS_03.git",
    category: "Frontend",
    featured: false,
  },
  {
    slug: "otp-multiapp",
    title: "OTP MultiApp",
    description:
      "OTP authentication system with Node + FastAPI backends.",
    longDescription:
      "OTP MultiApp demonstrates one frontend working with multiple backend implementations, covering secure authentication flow across Node.js and FastAPI.",
    tags: ["React", "Node.js", "FastAPI"],
    image: multiAppImg,
    gitLink: "https://github.com/Nongsaibam/One-UI-Two-Backend.git",
    category: "Full Stack",
    featured: true,
  },
  {
    slug: "edulearn-portal",
    title: "EduLearn Portal",
    description: "Full-stack AI-powered student portal with dashboards.",
    longDescription:
      "EduLearn combines dashboards, student features, and AI-powered workflows into a modern education platform experience.",
    tags: ["React", "Node.js", "AI"],
    image: eduImg,
    gitLink: "https://github.com/Nongsaibam/EduLearn.git",
    category: "Full Stack",
    featured: false,
  },
  {
    slug: "menesments-ai-powered-productivity-platform",
    title: "Menesments – AI-Powered Productivity Platform",
    description:
      "A next-gen full-stack productivity platform featuring AI copilots, smart task automation, analytics dashboard, and seamless user management.",
    longDescription:
      "Menesments is a modern full-stack productivity platform built for task management, analytics, AI-assisted workflows, and smart multi-screen dashboard experiences.",
    tags: ["React", "Next.js", "AI", "Dashboard", "Full Stack"],
    image: [dasImg, vitalImg, myTaskImg, aiImg, settingImg],
    gitLink: "https://github.com/Nongsaibam/TK-To-Do-App.git",
    category: "Full Stack",
    featured: true,
  },
];

const filters = ["All", "Featured", "Full Stack", "Frontend"];

function getPreviewImage(image) {
  const img = Array.isArray(image) ? image[0] : image;
  if (typeof img === "string") {
    if (img.startsWith("public/")) {
      return "/" + img.substring(7);
    }
  }
  return img;
}

function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/60 p-3.5 backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.06]"
    >
      <div>
        <img
          src={getPreviewImage(project.image)}
          alt={project.title}
          className="mb-3 h-32 sm:h-36 w-full rounded-xl object-cover shadow-sm transition duration-300 group-hover:scale-[1.02]"
        />

        <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-cyan-400 transition">
          {project.title}
        </h3>

        <p className="mt-1 text-xs text-slate-600 line-clamp-2 dark:text-white/60 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-white/[0.08] dark:text-white/70"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:bg-white/[0.05]">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-md shadow-cyan-500/10 transition duration-300 group-hover:scale-105">
          <HiOutlineArrowTopRightOnSquare className="h-3.5 w-3.5" />
          View Project
        </div>
      </div>
    </Link>
  );
}

function ProjectDetails({ project }) {
  const rawGallery = Array.isArray(project.image) ? project.image : [project.image];
  const gallery = rawGallery.map((img) => (typeof img === "string" && img.startsWith("public/") ? "/" + img.substring(7) : img));
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <main className="min-h-screen bg-transparent px-6 pb-20 pt-28 text-slate-900 dark:text-white">
      <SEO title={`${project.title} | Project Details`} description={project.description} image={gallery[0]} />
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-3.5 py-2 text-xs text-slate-700 backdrop-blur-[20px] transition duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75 dark:hover:bg-white/10"
        >
          <HiOutlineArrowLeft className="text-base" />
          Back to Featured Projects
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-black/10 bg-white/55 p-3 backdrop-blur-[22px] dark:border-white/15 dark:bg-white/[0.08]">
            <div className="overflow-hidden rounded-[20px] border border-black/10 bg-white/40 dark:border-white/10 dark:bg-white/[0.04]">
              <img
                src={gallery[0]}
                alt={project.title}
                className="h-[19rem] w-full object-cover md:h-[28rem]"
              />
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewImage(gallery[0])}
                className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-white dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75 dark:hover:bg-white/10"
              >
                Preview Image
              </button>
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPreviewImage(img)}
                    className="overflow-hidden rounded-[16px] border border-black/10 bg-white/50 transition hover:scale-[1.02] dark:border-white/15 dark:bg-white/[0.07]"
                  >
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="h-22 w-full object-cover md:h-24"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white/55 p-5 backdrop-blur-[22px] dark:border-white/15 dark:bg-white/[0.08]">
            <span className="inline-flex rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/60">
              {project.category}
            </span>

            <h1 className="mt-4 text-2xl font-black leading-tight md:text-3xl">
              {project.title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/65 md:text-base">
              {project.longDescription}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {Array.isArray(project.tags) && project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/60 px-2.5 py-1 text-xs dark:bg-white/[0.08]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.gitLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2.5 text-xs font-semibold text-white transition duration-300 hover:scale-105 md:text-sm"
              >
                <HiOutlineCodeBracket />
                Open GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Preview */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-slate-950 p-2 shadow-2xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black"
            >
              <HiOutlineXMark className="text-xl" />
            </button>
            <img
              src={previewImage}
              alt="Project Preview"
              className="max-h-[85vh] w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}

function ProjectNotFound() {
  return (
    <main className="min-h-screen bg-transparent px-6 pb-20 pt-28 text-slate-900 dark:text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-black">Project Not Found</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/60">
          The project you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-xs font-semibold text-white"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export function ProjectDetailsPage() {
  const { slug } = useParams();
  const { projects } = usePortfolioData();

  const project = projects.find((item) => item.slug === slug);

  if (!project) return <ProjectNotFound />;

  return <ProjectDetails project={project} />;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { projects } = usePortfolioData();

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Featured") return project.featured;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="px-3 py-8 sm:px-6 sm:py-20 text-slate-900 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 sm:mb-12 text-center text-3xl font-black md:text-6xl">
          <span className="mr-2 text-slate-400 dark:text-white/20">03</span>
          <span className="theme-gradient-text">
           Projects
          </span>
        </h2>

        <div className="mb-6 sm:mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium transition duration-300 ${
                activeFilter === filter
                  ? "theme-gradient-bg text-white shadow-lg"
                  : "border border-slate-200 bg-white/60 text-slate-700 hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-white/75 dark:hover:bg-white/[0.12]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
