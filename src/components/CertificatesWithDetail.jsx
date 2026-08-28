import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePortfolioData } from "../context/PortfolioContext";
import {
  HiOutlineArrowLeft,
  HiOutlineMagnifyingGlassPlus,
  HiOutlineSparkles,
  HiOutlineXMark,
  HiOutlineShieldExclamation,
  HiOutlineLockClosed,
} from "react-icons/hi2";

import { resolveImagePath } from "../utils/imageCompressor";
import SEO from "./SEO";

/* ---------------- AUTO IMPORT IMAGES ---------------- */

const images = import.meta.glob("../assets/CertificateImage/*", { eager: true });

const getImage = (name) => {
  if (!name) return "";
  const resolved = resolveImagePath(name);
  if (resolved && resolved !== name) {
    return resolved;
  }
  if (name.startsWith("http://") || name.startsWith("https://") || name.startsWith("data:")) {
    return name;
  }
  const path = `../assets/CertificateImage/${name}`;
  return images[path]?.default || name;
};

/* ---------------- CERTIFICATE DATA ---------------- */

const certificates = [
  { id: 1, title: "JavaScript Course", platform: "Udemy", category: "Course", image: "Udemy.jpg" },
  { id: 2, title: "Full Stack Web Development", platform: "CodeXp", category: "Internship", image: "Codexp.jpg" },
  { id: 3, title: "Full Stack Web Development", platform: "WaySpire", category: "Internship", image: "Wayspire1.png", extraImages: ["wayspire2.png"] },
  { id: 4, title: "Mti Hub Workshop", platform: "Others", category: "Workshop", image: "Workshop.png" },
  { id: 5, title: "React.js", platform: "Great Learning", category: "Course", image: "GreatLearning.png" },
  { id: 6, title: "Generative AI For Beginners", platform: "Great Learning", category: "Course", image: "GenerativeAIForBeginners.png" },
  { id: 7, title: "Gemini For Google Workspace", platform: "Simplilearn", category: "Course", image: "GeminiForGoogleWorkspace.png" },
  { id: 8, title: "Introduction to Generative AI", platform: "Simplilearn", category: "Course", image: "IntroductionToGenerativeAI.png" },
  { id: 9, title: "Prompt Engineering", platform: "Simplilearn", category: "Course", image: "IntroductionToPromptEngineering.png" },
  { id: 10, title: "Build an App with RAG", platform: "AI Course", category: "Course", image: "BuildAnAppWithRAG.png" },
  { id: 11, title: "Prompt Engineering & Generative AI", platform: "Online Course", category: "Course", image: "Certificate Course in Prompt Engineering and Generative.png" },
  { id: 12, title: "Web Development Course", platform: "Online Course", category: "Course", image: "Certificate Course in Web Development.png" },
  { id: 13, title: "Conflict Modes Simplified", platform: "Professional Training", category: "Course", image: "Conflict Modes Simplified.png" },
  { id: 14, title: "CSS Complete Course", platform: "Online Course", category: "Course", image: "CSS Complete Course For Beginners.png" },
  { id: 15, title: "Executive Diploma", platform: "Professional Certification", category: "Course", image: "Executive Diloma of Chief.png" },
  { id: 16, title: "Generative AI", platform: "AI Certification", category: "Course", image: "Generative AI.png" },
  { id: 17, title: "HTML & CSS Web Design", platform: "Web Development", category: "Course", image: "HTML & CSS Made Easy Web Design & Front-End Web Development.png" },
  { id: 18, title: "Introduction to Express JS", platform: "Backend Development", category: "Course", image: "Introduction to Express JS.png" },
  { id: 19, title: "JavaScript Projects", platform: "JavaScript Training", category: "Course", image: "JavaScript 10 Projects in 10 Days Course for Beginners.png" },
  { id: 20, title: "Mental Champion Training", platform: "Personal Development", category: "Workshop", image: "Mental de Champion transformer tes problèmes en opportunités.png" },
  { id: 21, title: "Modern Web Development", platform: "Programming Course", category: "Course", image: "Modern Web Development with JavaScript, jQuery & TypeScript.png" },
  { id: 22, title: "Passive Income with AI Tools", platform: "AI Workshop", category: "Workshop", image: "PassiveIncomeAI.png" },
  { id: 23, title: "Personality Development", platform: "Training", category: "Workshop", image: "Personality Development.png" },
  { id: 24, title: "ReactJS Projects For Beginners", platform: "React Development", category: "Course", image: "ReactJS Projects For Beginners.png" },
  { id: 25, title: "Full Stack Web Development", platform: "CodeXp", category: "Internship", image: "Recomandation.png" },
  { id: 26, title: "The Quitet Power Quiz", platform: "Training", category: "Workshop", image: "Mahindra.png" },
  { id: 27, title: "Full Stack Web Development", platform: "CODEC Thechnologies", category: "Internship", image: "Codec.png" },
  { id: 28, title: "Full Stack Web Development", platform: "CODEC Thechnologies", category: "Internship", image: "Recommendation.png" },
  { id: 29, title: "Full Stack Web Development", platform: "CODEC Thechnologies", category: "Internship", image: "CourseCompletation.png" },
  { id: 30, title: "Full Stack Web Development", platform: "Future Interns", category: "Internship", image: "futureCerdi.png" },
  { id: 31, title: "Full Stack Web Development", platform: "Future Interns", category: "Internship", image: "futurOffer.png" },
  { id: 32, title: "Full Stack Web Development", platform: "Future Interns", category: "Internship", image: "future LoR.png" },
  { id: 33, title: "Full Stack Web Development", platform: "Cursa", category: "Course", image: "fullCursa.png" },
  { id: 34, title: "MongoDB", platform: "Cursa", category: "Course", image: "cursa.png" },
  { id: 35, title: "AI Tools Workshop", platform: "be10x", category: "Workshop", image: "be10x.png" },
  { id: 36, title: "Internship Common Aptitude Test", platform: "Icat", category: "Workshop", image: "icat.png" },
];

/* ---------------- FILTER OPTIONS ---------------- */

const filters = ["All", "Course", "Internship", "Workshop"];

const CertificatesWithDetail = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [zoomImage, setZoomImage] = useState(null);
  const [showSecurityShield, setShowSecurityShield] = useState(false);
  const [isScreenObscured, setIsScreenObscured] = useState(false);
  const [revealedCertId, setRevealedCertId] = useState(null);
  const [isDetailRevealed, setIsDetailRevealed] = useState(false);
  const [isZoomRevealed, setIsZoomRevealed] = useState(false);
  const { certificates } = usePortfolioData();

  useEffect(() => {
    // 1. Keyboard Anti-Screenshot & Inspector Shortcut Listener
    const handleKeyDown = (e) => {
      if (
        e.key === "PrintScreen" ||
        e.keyCode === 44 ||
        (e.ctrlKey && (e.key === "p" || e.key === "P" || e.key === "s" || e.key === "S")) ||
        (e.metaKey && (e.key === "p" || e.key === "P" || e.key === "s" || e.key === "S")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "S" || e.key === "s" || e.key === "C" || e.key === "c")) ||
        (e.metaKey && e.shiftKey && (e.key === "S" || e.key === "s" || e.key === "4" || e.key === "3"))
      ) {
        e.preventDefault();
        e.stopPropagation();
        setIsScreenObscured(true);
        setShowSecurityShield(true);
        setTimeout(() => {
          setIsScreenObscured(false);
          setShowSecurityShield(false);
        }, 3500);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        setIsScreenObscured(true);
        setShowSecurityShield(true);
        setTimeout(() => {
          setIsScreenObscured(false);
          setShowSecurityShield(false);
        }, 3500);
      }
    };

    // 2. Mobile Phone OS Screenshot Protection (Visibility & Window Blur Listener)
    // Mobile OS screenshot gestures trigger immediate tab blur / visibility state change
    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === "hidden") {
        setIsScreenObscured(true);
        setShowSecurityShield(true);
      } else {
        setTimeout(() => {
          setIsScreenObscured(false);
          setShowSecurityShield(false);
        }, 1500);
      }
    };

    const handleWindowBlur = () => {
      setIsScreenObscured(true);
      setShowSecurityShield(true);
      setTimeout(() => {
        setIsScreenObscured(false);
        setShowSecurityShield(false);
      }, 1500);
    };

    // 3. Mobile Multi-Touch & Swipe Screenshot Protection
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length >= 2) {
        e.preventDefault();
        e.stopPropagation();
        setIsScreenObscured(true);
        setShowSecurityShield(true);
        setTimeout(() => {
          setIsScreenObscured(false);
          setShowSecurityShield(false);
        }, 2000);
      }
    };

    const preventContextMenu = (e) => {
      e.preventDefault();
    };

    const preventDrag = (e) => {
      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("contextmenu", preventContextMenu);
    window.addEventListener("dragstart", preventDrag);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("contextmenu", preventContextMenu);
      window.removeEventListener("dragstart", preventDrag);
    };
  }, []);

  const filteredCertificates = useMemo(() => {
    return activeFilter === "All"
      ? certificates
      : certificates.filter((cert) => cert.category === activeFilter);
  }, [activeFilter, certificates]);

  /* ---------------- DETAIL PAGE ---------------- */

  if (id) {
    const certificate = certificates.find((c) => c.id === Number(id));

    if (!certificate) {
      return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-6 text-center text-slate-900 dark:text-white">
          <div className="rounded-[28px] border border-black/10 bg-white/55 px-8 py-10 backdrop-blur-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
            <h2 className="text-2xl font-bold">Certificate not found</h2>
            <Link
              to="/certificates"
              className="mt-4 inline-flex rounded-full border border-black/10 bg-white/55 px-5 py-2 text-slate-700 transition hover:bg-white dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75 dark:hover:bg-white/10"
            >
              Go Back
            </Link>
          </div>
        </div>
      );
    }

    const allImages = [
      getImage(certificate.image),
      ...(certificate.extraImages?.map((img) => getImage(img)) || []),
    ].filter(Boolean);

    return (
      <section className="relative min-h-screen overflow-hidden bg-transparent px-6 py-10 text-slate-900 dark:text-white md:px-10 select-none">
        <SEO title={`${certificate.title} | Certificate Details`} image={getImage(certificate.image)} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Link
            to="/certificates"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-4 py-2 text-sm text-slate-700 backdrop-blur-[20px] transition duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75 dark:hover:bg-white/10"
          >
            <HiOutlineArrowLeft className="text-lg" />
            Back to Certificates
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="group relative overflow-hidden rounded-[32px] border border-black/10 bg-white/55 p-4 backdrop-blur-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-white/10 dark:bg-white/[0.02]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/15" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                <div className="absolute -left-[50%] top-0 h-full w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-xl animate-[shine_1.5s_linear]" />
              </div>

              <div
                onMouseDown={() => setIsDetailRevealed(true)}
                onMouseUp={() => setIsDetailRevealed(false)}
                onMouseLeave={() => setIsDetailRevealed(false)}
                onTouchStart={() => setIsDetailRevealed(true)}
                onTouchEnd={() => setIsDetailRevealed(false)}
                onTouchCancel={() => setIsDetailRevealed(false)}
                className="relative overflow-hidden rounded-[24px] border border-black/10 bg-slate-950 p-1 text-center select-none cursor-pointer transition-all duration-300"
              >
                <img
                  src={getImage(certificate.image)}
                  alt={certificate.title}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    filter: (isDetailRevealed && !isScreenObscured) ? "none" : "blur(80px) brightness(0)",
                    opacity: (isDetailRevealed && !isScreenObscured) ? 1 : 0,
                    transition: "all 0.12s ease-out"
                  }}
                  className="h-[24rem] w-full object-contain md:h-[34rem] select-none pointer-events-none no-screenshot"
                />

                {(!isDetailRevealed || isScreenObscured) && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 p-6 text-white backdrop-blur-2xl pointer-events-none select-none">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-2xl animate-pulse">
                      <HiOutlineLockClosed className="text-3xl text-amber-400" />
                    </div>
                    <p className="mt-4 text-base font-extrabold text-white tracking-wide">
                      Press & Hold to Reveal Certificate
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Anti-Screenshot DRM Active • Release to Obscure
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setZoomImage(getImage(certificate.image))}
                className="absolute right-8 top-8 z-20 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-4 py-2 text-sm text-slate-800 backdrop-blur-xl transition hover:scale-105 hover:bg-white dark:border-white/15 dark:bg-white/[0.08] dark:text-white"
              >
                <HiOutlineMagnifyingGlassPlus className="text-lg" />
                Preview
              </button>
            </div>

            <div className="group relative overflow-hidden rounded-[32px] border border-black/10 bg-white/55 p-6 backdrop-blur-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-white/10 dark:bg-white/[0.02]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/15" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                <div className="absolute -left-[50%] top-0 h-full w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-xl animate-[shine_1.5s_linear]" />
              </div>

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-4 py-2 text-sm text-slate-700 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75">
                  <HiOutlineSparkles />
                  Certificate View
                </div>

                <h1 className="text-3xl font-black leading-tight text-slate-900 dark:text-white md:text-4xl">
                  {certificate.title}
                </h1>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-[24px] border border-black/10 bg-white/50 p-4 backdrop-blur-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/15 dark:bg-white/[0.07] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">
                      Platform
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {certificate.platform}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-black/10 bg-white/50 p-4 backdrop-blur-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/15 dark:bg-white/[0.07] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">
                      Category
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {certificate.category}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-black/10 bg-white/50 p-4 backdrop-blur-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/15 dark:bg-white/[0.07] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">
                      Certificate ID
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      #{certificate.id}
                    </p>
                  </div>
                </div>

                {allImages.length > 1 && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/50">
                      More Preview Images
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {allImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setZoomImage(img)}
                          className="overflow-hidden rounded-[20px] border border-black/10 bg-white/50 backdrop-blur-[18px] transition duration-300 hover:scale-[1.02] hover:bg-white dark:border-white/15 dark:bg-white/[0.07] dark:hover:bg-white/[0.1]"
                        >
                          <img
                            src={img}
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                            style={{ filter: isScreenObscured ? 'blur(60px) brightness(0)' : 'none', opacity: isScreenObscured ? 0 : 1, transition: 'all 0.1s linear' }}
                            alt={`Certificate Preview ${index + 1}`}
                            className="h-28 w-full object-cover select-none pointer-events-none no-screenshot"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {zoomImage && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md select-none"
            onClick={() => setZoomImage(null)}
          >
            <div
              className="relative max-h-[92vh] max-w-[95vw] overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-3 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomImage(null)}
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/40 text-white backdrop-blur-xl transition hover:bg-slate-950/60"
              >
                <HiOutlineXMark className="text-2xl" />
              </button>
              <div
                onMouseDown={() => setIsZoomRevealed(true)}
                onMouseUp={() => setIsZoomRevealed(false)}
                onMouseLeave={() => setIsZoomRevealed(false)}
                onTouchStart={() => setIsZoomRevealed(true)}
                onTouchEnd={() => setIsZoomRevealed(false)}
                onTouchCancel={() => setIsZoomRevealed(false)}
                className="relative overflow-hidden rounded-[24px] bg-slate-950 select-none cursor-pointer"
              >
                <img
                  src={zoomImage}
                  alt="Zoom Certificate"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    filter: (isZoomRevealed && !isScreenObscured) ? "none" : "blur(80px) brightness(0)",
                    opacity: (isZoomRevealed && !isScreenObscured) ? 1 : 0,
                    transition: "all 0.12s ease-out"
                  }}
                  className="max-h-[86vh] max-w-full rounded-[24px] object-contain select-none pointer-events-none no-screenshot"
                />

                {(!isZoomRevealed || isScreenObscured) && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 p-6 text-white backdrop-blur-2xl pointer-events-none select-none">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-xl animate-pulse">
                      <HiOutlineLockClosed className="text-3xl text-amber-400" />
                    </div>
                    <p className="mt-4 text-base font-extrabold text-white tracking-wide">
                      Press & Hold to Reveal Certificate
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Release to Obscure • Screenshot Protected
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Screenshot & Copy Protection Security Shield Modal */}
        {showSecurityShield && (
          <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950/90 p-6 text-center text-white backdrop-blur-2xl animate-fade-in select-none">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/15 text-amber-400 shadow-2xl shadow-amber-500/30 animate-pulse">
              <HiOutlineShieldExclamation className="text-5xl" />
            </div>
            <h3 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Screenshot & Copy Protected
            </h3>
            <p className="mt-2 max-w-md text-xs font-medium text-slate-300 sm:text-sm">
              Certificates and credential documents are private, protected, and copyrighted property of <strong className="text-cyan-400">Nongsaibam Tazkhan</strong>.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-xl">
              <HiOutlineLockClosed className="text-amber-400" /> Private Security Active
            </div>
          </div>
        )}
      </section>
    );
  }

  /* ---------------- LIST PAGE ---------------- */

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-6 py-10 text-slate-900 dark:text-white md:px-10 select-none">
      <SEO title="Certificates & Achievements | Portfolio" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-6 flex justify-start animate-fade-up">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-4.5 py-2.5 text-xs font-bold text-slate-700 backdrop-blur-[20px] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <HiOutlineArrowLeft className="text-sm text-cyan-400" />
            Back to Home
          </Link>
        </div>

        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            <span className="text-slate-900 dark:text-white">Certificates &</span>
            <span className="ml-3 theme-gradient-text">
              Achievements
            </span>
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 animate-fade-up">
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "theme-gradient-bg text-white shadow-md"
                    : "border border-black/10 bg-white/55 text-slate-700 backdrop-blur-[18px] hover:bg-white hover:text-slate-950 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCertificates.map((cert, index) => (
            <div
              key={cert.id}
              style={{ animationDelay: `${index * 80}ms` }}
              className="group relative animate-fade-up select-none"
            >
              <div className="relative h-full overflow-hidden rounded-[32px] border border-black/10 bg-white/55 p-4 backdrop-blur-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-white/10 dark:bg-white/[0.02]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/15" />

                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                  <div className="absolute -left-[50%] top-0 h-full w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-xl animate-[shine_1.5s_linear]" />
                </div>

                <div className="relative">
                  <div
                    onMouseDown={() => setRevealedCertId(cert.id)}
                    onMouseUp={() => setRevealedCertId(null)}
                    onMouseLeave={() => setRevealedCertId(null)}
                    onTouchStart={() => setRevealedCertId(cert.id)}
                    onTouchEnd={() => setRevealedCertId(null)}
                    onTouchCancel={() => setRevealedCertId(null)}
                    className="relative overflow-hidden rounded-[24px] border border-black/10 bg-slate-950 select-none cursor-pointer transition-all duration-300"
                  >
                    <img
                      src={getImage(cert.image)}
                      alt={cert.title}
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      style={{
                        filter: (revealedCertId === cert.id && !isScreenObscured) ? "none" : "blur(80px) brightness(0)",
                        opacity: (revealedCertId === cert.id && !isScreenObscured) ? 1 : 0,
                        transition: "all 0.12s ease-out"
                      }}
                      className="h-52 w-full object-cover transition duration-700 group-hover:scale-110 select-none pointer-events-none no-screenshot"
                    />

                    {(revealedCertId !== cert.id || isScreenObscured) && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 p-4 text-white backdrop-blur-2xl pointer-events-none select-none">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-lg animate-pulse">
                          <HiOutlineLockClosed className="text-xl text-amber-400" />
                        </div>
                        <p className="mt-2 text-xs font-bold text-white tracking-wide">
                          Press & Hold to Reveal
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Anti-Screenshot Protected
                        </p>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomImage(getImage(cert.image));
                      }}
                      className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/50 text-white/90 backdrop-blur-xl transition hover:scale-105 hover:bg-slate-950/70"
                    >
                      <HiOutlineMagnifyingGlassPlus className="text-xl" />
                    </button>
                  </div>

                  <div className="mt-5 space-y-3">
                    <h4 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
                      {cert.title}
                    </h4>

                    <p className="text-sm text-slate-600 dark:text-white/55">
                      {cert.platform}
                    </p>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75">
                        {cert.category}
                      </span>

                      <Link
                        to={`/certificates/${cert.id}`}
                        className="rounded-full border border-black/10 bg-white/55 px-4 py-2 text-sm text-slate-700 backdrop-blur-xl transition hover:bg-white hover:text-slate-950 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {zoomImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md select-none"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-[95vw] overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-3 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/40 text-white backdrop-blur-xl transition hover:bg-slate-950/60"
            >
              <HiOutlineXMark className="text-2xl" />
            </button>
            <div className="relative overflow-hidden rounded-[24px]" onContextMenu={(e) => e.preventDefault()}>
              <img
                src={zoomImage}
                alt="Zoom Certificate"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                className="max-h-[86vh] max-w-full rounded-[24px] object-contain select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Screenshot & Copy Protection Security Shield Modal */}
      {showSecurityShield && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950/90 p-6 text-center text-white backdrop-blur-2xl animate-fade-in select-none">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/15 text-amber-400 shadow-2xl shadow-amber-500/30 animate-pulse">
            <HiOutlineShieldExclamation className="text-5xl" />
          </div>
          <h3 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Screenshot & Copy Protected
          </h3>
          <p className="mt-2 max-w-md text-xs font-medium text-slate-300 sm:text-sm">
            Certificates and credential documents are private, protected, and copyrighted property of <strong className="text-cyan-400">Nongsaibam Tazkhan</strong>.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-xl">
            <HiOutlineLockClosed className="text-amber-400" /> Private Security Active
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesWithDetail;