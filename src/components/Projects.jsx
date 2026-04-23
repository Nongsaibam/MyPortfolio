import { useState } from "react";
import { Link, useParams } from "react-router-dom";
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

const projects = [
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
  return Array.isArray(image) ? image[0] : image;
}

function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block rounded-3xl border border-slate-200 bg-white/60 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.06]"
    >
      <img
        src={getPreviewImage(project.image)}
        alt={project.title}
        className="mb-4 h-48 w-full rounded-xl object-cover"
      />

      <h3 className="text-xl font-bold">{project.title}</h3>

      <p className="mt-2 text-sm text-slate-600 dark:text-white/60">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/60 px-3 py-1 text-xs dark:bg-white/[0.08]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-2 text-xs font-semibold text-white transition duration-300 group-hover:scale-105">
        <HiOutlineArrowTopRightOnSquare />
        View Project
      </div>
    </Link>
  );
}

function ProjectDetails({ project }) {
  const gallery = Array.isArray(project.image) ? project.image : [project.image];
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <section className="px-6 py-10 text-slate-900 dark:text-white md:px-10">
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
              {project.tags.map((tag) => (
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

      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl rounded-[24px] border border-white/10 bg-white/10 p-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75"
            >
              <HiOutlineXMark className="text-xl" />
            </button>

            <img
              src={previewImage}
              alt={`${project.title} preview`}
              className="max-h-[82vh] w-full rounded-[18px] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectNotFound() {
  return (
    <section id="projects" className="px-6 py-20 text-slate-900 dark:text-white">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-black/10 bg-white/55 p-10 text-center backdrop-blur-[20px] dark:border-white/15 dark:bg-white/[0.08]">
        <h2 className="text-3xl font-black">Project not found</h2>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-full border border-black/10 bg-white/60 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75 dark:hover:bg-white/10"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export function ProjectDetailsPage() {
  const { slug } = useParams();

  const project = projects.find((item) => item.slug === slug);

  if (!project) return <ProjectNotFound />;

  return <ProjectDetails project={project} />;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Featured") return project.featured;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="px-6 py-20 text-slate-900 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-black md:text-6xl">
          <span className="mr-3 text-slate-400 dark:text-white/20">03</span>
          <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
           Projects
          </span>
        </h2>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "border border-slate-200 bg-white/60 text-slate-700 hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-white/75 dark:hover:bg-white/[0.12]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
