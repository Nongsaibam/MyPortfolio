import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineMagnifyingGlassPlus,
  HiOutlineSparkles,
  HiOutlineXMark,
} from "react-icons/hi2";

/* ---------------- AUTO IMPORT IMAGES ---------------- */

const images = import.meta.glob("../assets/CertificateImage/*", { eager: true });

const getImage = (name) => {
  const path = `../assets/CertificateImage/${name}`;
  return images[path]?.default || "";
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

  const filteredCertificates = useMemo(() => {
    return activeFilter === "All"
      ? certificates
      : certificates.filter((cert) => cert.category === activeFilter);
  }, [activeFilter]);

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
      <section className="relative min-h-screen overflow-hidden bg-transparent px-6 py-10 text-slate-900 dark:text-white md:px-10">
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

              <div className="relative overflow-hidden rounded-[24px] border border-black/10 bg-white/40 dark:border-white/10 dark:bg-white/[0.04]">
                <img
                  src={getImage(certificate.image)}
                  alt={certificate.title}
                  className="h-[24rem] w-full object-contain md:h-[34rem]"
                />
              </div>

              <button
                onClick={() => setZoomImage(getImage(certificate.image))}
                className="absolute right-8 top-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-4 py-2 text-sm text-slate-800 backdrop-blur-xl transition hover:scale-105 hover:bg-white dark:border-white/15 dark:bg-white/[0.08] dark:text-white"
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
                            alt={`Certificate Preview ${index + 1}`}
                            className="h-28 w-full object-cover"
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
            className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
            onClick={() => setZoomImage(null)}
          >
            <div
              className="relative max-h-[92vh] max-w-[95vw] overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-3 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomImage(null)}
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/40 text-white backdrop-blur-xl transition hover:bg-slate-950/60"
              >
                <HiOutlineXMark className="text-2xl" />
              </button>
              <img
                src={zoomImage}
                alt="Zoom Certificate"
                className="max-h-[86vh] max-w-full rounded-[24px] object-contain"
              />
            </div>
          </div>
        )}
      </section>
    );
  }

  /* ---------------- LIST PAGE ---------------- */

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-6 py-10 text-slate-900 dark:text-white md:px-10">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            <span className="text-slate-900 dark:text-white">Certificates &</span>
            <span className="ml-3 bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-300 dark:to-cyan-300">
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
                    ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-md"
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
              className="group relative animate-fade-up"
            >
              <div className="relative h-full overflow-hidden rounded-[32px] border border-black/10 bg-white/55 p-4 backdrop-blur-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-white/10 dark:bg-white/[0.02]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/15" />

                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                  <div className="absolute -left-[50%] top-0 h-full w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-xl animate-[shine_1.5s_linear]" />
                </div>

                <div className="relative">
                  <div className="relative overflow-hidden rounded-[24px] border border-black/10 bg-white/40 dark:border-white/10 dark:bg-white/[0.04]">
                    <img
                      src={getImage(cert.image)}
                      alt={cert.title}
                      className="h-52 w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <button
                      onClick={() => setZoomImage(getImage(cert.image))}
                      className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/40 text-white/90 backdrop-blur-xl transition hover:scale-105 hover:bg-slate-950/60"
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
          className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-[95vw] overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-3 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/40 text-white backdrop-blur-xl transition hover:bg-slate-950/60"
            >
              <HiOutlineXMark className="text-2xl" />
            </button>
            <img
              src={zoomImage}
              alt="Zoom Certificate"
              className="max-h-[86vh] max-w-full rounded-[24px] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesWithDetail;