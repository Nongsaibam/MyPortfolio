import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  { id: 2, title: "Full Stack Web Developer", platform: "CodeXp", category: "Internship", image: "Codexp.jpg" },
  { id: 3, title: "Full Stack Web Developer", platform: "WaySpire", category: "Internship", image: "Wayspire1.png", extraImages: ["wayspire2.png"] },
  { id: 4, title: "IIIT Workshop", platform: "Others", category: "Workshop", image: "Workshop.png" },
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
  { id: 25, title: "Full Stack Web Developer", platform: "CodeXp", category: "Internship", image: "Recomandation.png" },
  { id: 26, title: "The Quitet Power Quiz", platform: "Training", category: "Workshop", image: "Mahindra.png" },
  { id: 27, title: "Full Stack Web Developer", platform: "CODEC Thechnologies", category: "Internship", image: "Codec.png" },
  { id: 28, title: "Full Stack Web Developer", platform: "CODEC Thechnologies", category: "Internship", image: "Recommendation.png" },
  { id: 29, title: "Full Stack Web Developer", platform: "CODEC Thechnologies", category: "Internship", image: "CourseCompletation.png" },
  

  
];

/* ---------------- FILTER OPTIONS ---------------- */

const filters = ["All", "Course", "Internship", "Workshop"];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.55,
      ease: "easeOut",
    },
  }),
};

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
        <div className="flex min-h-screen items-center justify-center bg-[#030712] px-6 text-center text-white">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 backdrop-blur-2xl">
            <h2 className="text-2xl font-bold">Certificate not found</h2>
            <Link
              to="/certificates"
              className="mt-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-cyan-300 transition hover:bg-cyan-400/20"
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
      <section className="relative min-h-screen overflow-hidden bg-[#030712] px-6 py-10 text-white md:px-10">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-8rem] top-[-8rem] h-[26rem] w-[26rem] rounded-full bg-cyan-500/15 blur-[140px]" />
          <div className="absolute right-[-6rem] top-[20%] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/15 blur-[140px]" />
          <div className="absolute bottom-[-10rem] left-[20%] h-[22rem] w-[22rem] rounded-full bg-emerald-500/10 blur-[140px]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:70px_70px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <Link
            to="/certificates"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
          >
            <HiOutlineArrowLeft className="text-lg" />
            Back to Certificates
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"
          >
            {/* Left big preview */}
            <div className="relative rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-cyan-400/5" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
                <img
                  src={getImage(certificate.image)}
                  alt={certificate.title}
                  className="h-[24rem] w-full object-contain md:h-[34rem]"
                />
              </div>

              <button
                onClick={() => setZoomImage(getImage(certificate.image))}
                className="absolute right-8 top-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/90 backdrop-blur-xl transition hover:bg-black/60"
              >
                <HiOutlineMagnifyingGlassPlus className="text-lg" />
                Preview
              </button>
            </div>

            {/* Right info panel */}
            <div className="relative rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/10 via-transparent to-fuchsia-400/10" />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                  <HiOutlineSparkles />
                  Certificate View
                </div>

                <h1 className="text-3xl font-black leading-tight md:text-4xl">
                  {certificate.title}
                </h1>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">Platform</p>
                    <p className="mt-2 text-lg font-semibold text-white">{certificate.platform}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">Category</p>
                    <p className="mt-2 text-lg font-semibold text-white">{certificate.category}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">Certificate ID</p>
                    <p className="mt-2 text-lg font-semibold text-white">#{certificate.id}</p>
                  </div>
                </div>

                {allImages.length > 1 && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                      More Preview Images
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {allImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setZoomImage(img)}
                          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:scale-[1.02] hover:border-cyan-400/20"
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
          </motion.div>
        </div>

        {/* ZOOM MODAL */}
        <AnimatePresence>
          {zoomImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
              onClick={() => setZoomImage(null)}
            >
              <motion.div
                initial={{ scale: 0.88, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[92vh] max-w-[95vw] overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setZoomImage(null)}
                  className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-xl transition hover:bg-black/60"
                >
                  <HiOutlineXMark className="text-2xl" />
                </button>
                <img
                  src={zoomImage}
                  alt="Zoom Certificate"
                  className="max-h-[86vh] max-w-full rounded-[1.4rem] object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  /* ---------------- LIST PAGE ---------------- */

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030712] px-6 py-10 text-white md:px-10">
      {/* Premium Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-cyan-500/12 blur-[170px]" />
        <div className="absolute right-[-8rem] top-[10%] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/12 blur-[160px]" />
        <div className="absolute bottom-[-10rem] left-[28%] h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Top header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
         

          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Certificates &
            <span className="ml-3 bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>

         
        </motion.div>

        {/* FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "border border-cyan-300/30 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-[0_8px_30px_rgba(34,211,238,0.35)]"
                    : "border border-white/10 bg-white/5 text-white/75 backdrop-blur-xl hover:bg-white/10 hover:text-white"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </motion.div>

        {/* GRID */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCertificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                y: -10,
                rotateX: 6,
                rotateY: -6,
                scale: 1.02,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative"
            >
              {/* outer glow */}
              <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-cyan-400/30 via-transparent to-fuchsia-400/20 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

              <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-400/5" />

                <div className="relative">
                  {/* image box */}
                  <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/25">
                    <img
                      src={getImage(cert.image)}
                      alt={cert.title}
                      className="h-52 w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />

                    <button
                      onClick={() => setZoomImage(getImage(cert.image))}
                      className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/90 backdrop-blur-xl transition hover:scale-105 hover:bg-black/60"
                    >
                      <HiOutlineMagnifyingGlassPlus className="text-xl" />
                    </button>
                  </div>

                  {/* content */}
                  <div className="mt-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-lg font-bold leading-snug text-white">
                        {cert.title}
                      </h4>
                    </div>

                    <p className="text-sm text-white/55">{cert.platform}</p>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                        {cert.category}
                      </span>

                      <Link
                        to={`/certificates/${cert.id}`}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ZOOM MODAL */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setZoomImage(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[92vh] max-w-[95vw] overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomImage(null)}
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-xl transition hover:bg-black/60"
              >
                <HiOutlineXMark className="text-2xl" />
              </button>
              <img
                src={zoomImage}
                alt="Zoom Certificate"
                className="max-h-[86vh] max-w-full rounded-[1.4rem] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesWithDetail;
