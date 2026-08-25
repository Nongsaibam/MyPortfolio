import React, { createContext, useContext, useState, useEffect } from "react";
import { resolveImagePath } from "../utils/imageCompressor";

// Default initial datasets
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
    description: "Customer management system with React, Node.js, and Express.",
    longDescription: "Mini CRM helps teams manage customer records, contact workflows, and business operations in one clean full-stack system.",
    tags: ["React", "Node.js", "Express"],
    image: miniCrmImg,
    gitLink: "https://github.com/Nongsaibam/FUTURE_FS_02.git",
    category: "Full Stack",
    featured: true,
  },
  {
    slug: "coffee-shop-website",
    title: "Coffee Shop Website",
    description: "Modern responsive coffee website built using React + Tailwind.",
    longDescription: "A premium frontend coffee website with responsive sections, modern UI, and a polished brand-focused landing page experience.",
    tags: ["React", "Tailwind"],
    image: coffeeShopImg,
    gitLink: "https://github.com/Nongsaibam/FUTURE_FS_03.git",
    category: "Frontend",
    featured: false,
  },
  {
    slug: "otp-multiapp",
    title: "OTP MultiApp",
    description: "OTP authentication system with Node + FastAPI backends.",
    longDescription: "OTP MultiApp demonstrates one frontend working with multiple backend implementations, covering secure authentication flow across Node.js and FastAPI.",
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
    longDescription: "EduLearn combines dashboards, student features, and AI-powered workflows into a modern education platform experience.",
    tags: ["React", "Node.js", "AI"],
    image: eduImg,
    gitLink: "https://github.com/Nongsaibam/EduLearn.git",
    category: "Full Stack",
    featured: false,
  },
  {
    slug: "menesments-ai-powered-productivity-platform",
    title: "Menesments – AI-Powered Productivity Platform",
    description: "A next-gen full-stack productivity platform featuring AI copilots, smart task automation, analytics dashboard, and seamless user management.",
    longDescription: "Menesments is a modern full-stack productivity platform built for task management, analytics, AI-assisted workflows, and smart multi-screen dashboard experiences.",
    tags: ["React", "Next.js", "AI", "Dashboard", "Full Stack"],
    image: [dasImg, vitalImg, myTaskImg, aiImg, settingImg],
    gitLink: "https://github.com/Nongsaibam/TK-To-Do-App.git",
    category: "Full Stack",
    featured: true,
  },
];

const initialCertificates = [
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

const initialExperiences = [
  {
    id: 0,
    title: "Junior Developer",
    date: "Aug 2026 - Present",
    location: "LMP Technology",
    isCurrent: true,
    points: [
      "Developing scalable full-stack web applications and modern frontend solutions.",
      "Collaborating with cross-functional development teams on production features and REST API integrations.",
      "Writing clean, maintainable, and high-performance code using React, JavaScript, and backend architectures.",
    ],
  },
  {
    id: 1,
    title: "Full Stack Web Development Intern",
    date: "Apr 2024 - Jun 2024",
    location: "Wayspire Ed-Tech Private Limited",
    points: [
      "Developed a To-Do App using React.",
      "Implemented state management and API integration.",
      "Worked in an agile development team.",
    ],
  },
  {
    id: 2,
    title: "Full Stack Web Development Intern",
    date: "Jan 2025 - Jun 2025",
    location: "Manipur CodeXP",
    points: [
      "Developed a Tourism Website using MERN stack.",
      "Built responsive UI with React and Tailwind.",
      "Implemented REST APIs and backend services.",
    ],
  },
  {
    id: 3,
    title: "Full Stack Web Development Intern",
    date: "Mar 2026 - Apr 2026",
    location: "Future Interns",
    points: [
      "Completed multiple full-stack tasks and projects.",
      "Built scalable backend services using Node.js.",
      "Worked with MySQL & MongoDB.",
      "Improved UI/UX and performance.",
    ],
  },
];

const initialSkills = [
  {
    id: 1,
    category: "Python Full Stack + AI Developer",
    iconName: "FaPython",
    items: [
      "Python",
      "HTML",
      "CSS",
      "React.js",
      "Django",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "PyTorch",
      "Node.js",
      "AWS EC2",
      "JavaScript",
    ],
  },
  {
    id: 2,
    category: "Full Stack Web Developer (MERN)",
    iconName: "FaReact",
    items: [
      "JavaScript ES6",
      "React.js",
      "Node.js",
      "Redux",
      "Express.js",
      "Tailwind CSS",
      "Bootstrap",
      "HTML",
      "CSS",
      "MongoDB",
    ],
  },
  {
    id: 3,
    category: "Backend & Databases",
    iconName: "FaDatabase",
    items: ["REST API", "FastAPI", "MongoDB", "MySQL"],
  },
  {
    id: 4,
    category: "Tools & Version Control",
    iconName: "FaTools",
    items: ["Git", "GitHub"],
  },
];

const initialActivities = [
  {
    id: 1,
    title: "Manipur Tourism Website",
    description: "Developed a responsive tourism platform highlighting destinations and culture of Manipur.",
    date: "June 2025",
    tags: ["React", "Tailwind", "Frontend"],
    iconName: "FaCodeBranch",
  },
  {
    id: 2,
    title: "To-Do List Web App",
    description: "Built a full-stack task management system using React.js, Node.js and MongoDB.",
    date: "April 2024",
    tags: ["React", "Node.js", "MongoDB"],
    iconName: "FaCodeBranch",
  },
  {
    id: 3,
    title: "AI Voice Assistant",
    description: "Multilingual AI assistant supporting English and Meitei Mayek with speech recognition.",
    date: "2025",
    tags: ["AI", "Speech"],
    iconName: "FaMicrophone",
  },
  {
    id: 4,
    title: "Web Development Projects",
    description: "Created multiple responsive websites while learning full-stack development.",
    date: "2023-2025",
    tags: ["Projects", "Development"],
    iconName: "FaRegCalendarAlt",
  },
];

const initialSiteSettings = {
  // Theme & Typography
  fontFamily: "Poppins",
  gradientPreset: "violet-cyan",
  customFrom: "#8b5cf6",
  customTo: "#06b6d4",

  // Profile / Hero Section
  logoText: "TK",
  name: "Nongsaibam Tazkhan",
  greetingText: "Hi, I'm ",
  enableRunningGradientText: true,
  runningGradientColors: {
    color1: "#38bdf8",
    color2: "#818cf8",
    color3: "#c084fc",
    color4: "#f472b6",
  },
  title: "Python Full Stack + AI Developer",
  bio: "Full Stack Developer building scalable and modern applications. I specialize in crafting end-to-end digital products — from intuitive user interfaces to robust backend architectures.",
  primaryBtnText: "Explore Projects",
  resumeLink: "/resume.pdf",
  githubLink: "https://github.com/Nongsaibam",
  linkedinLink: "https://www.linkedin.com/in/nongsaibam-tazkhan-2a07a22b6/",
  twitterLink: "https://twitter.com/YourHandle",
  email: "nongsaibamtazkhan@gmail.com",

  // About Section
  aboutTitle: "About Me",
  aboutSectionNumber: "01",
  aboutParagraphs: [
    "I’m a Full Stack Developer building scalable and modern applications. I specialize in crafting end-to-end digital products — from intuitive user interfaces to robust backend architectures.",
    "I work with React, Vite, and Tailwind CSS on the frontend, and Node.js, Express, FastAPI, and MySQL on the backend.",
    "My focus stays on performance, clean architecture, and maintainable code, delivering smooth and user-friendly experiences.",
  ],
  stats: [
    { value: "8+", label: "Months Experience" },
    { value: "5+", label: "Projects Built" },
    { value: "3", label: "Internships" },
    { value: "10+", label: "Technologies" },
  ],

  // Background theme settings (Dark & Light)
  darkBgPreset: "default-obsidian",
  customDarkBgFrom: "#030712",
  customDarkBgTo: "#0b1329",

  lightBgPreset: "clean-studio",
  customLightBgFrom: "#ffffff",
  customLightBgTo: "#e2e8f0",

  // Contact & Footer Section
  contactNumber: "06",
  contactTitle: "Get In Touch",
  contactSubtitle: "I’m actively seeking new opportunities and open to collaborations in Full Stack Web Development and AI / Machine Learning.",
  contactBtnText: "Say Hello 👋",
  footerText: "Designed & Built by Nongsaibam Tazkhan",
  footerSubtext: "Crafted with React, Tailwind CSS & Passion ✨",

  // AI Chatbot Settings
  chatbotSettings: {
    enabled: true,
    botName: "Tazkhan AI Assistant",
    subtitle: "Ask about skills, projects, or contact",
    introMessage: "Hi 👋 I’m Tazkhan's AI Assistant. Ask me about skills, projects, experience, certificates, or contact details.",
    quickPrompts: ["skills", "projects", "experience", "certificates", "contact"],
    fallbackAnswer: "Try asking about skills, projects, experience, certificates, or contact.",
    qaPairs: [
      { id: "qa-1", question: "Skills Inquiry Answer", keyword: "skill, stack, tech", answer: "Tazkhan works with React, Vite, Tailwind CSS, Node.js, Express.js, FastAPI, MySQL, MongoDB, JavaScript, and AI." },
      { id: "qa-2", question: "Projects Inquiry Answer", keyword: "project, app, work", answer: "Projects include Face2Comic, Image Captioning, CRM, Coffee Shop Website, OTP System, EduLearn." },
      { id: "qa-3", question: "Experience Inquiry Answer", keyword: "experience, intern, role", answer: "Internships at Wayspire Ed-Tech, CodeXP, and Future Interns as Full Stack Developer." },
      { id: "qa-4", question: "Certificates Inquiry Answer", keyword: "certificate, cert, course", answer: "Certificates from Udemy, Great Learning, Simplilearn, CodeXP, Wayspire, Future Interns." },
      { id: "qa-5", question: "Contact Inquiry Answer", keyword: "contact, email, hire", answer: "Contact: nongsaibamtazkhan@gmail.com" },
    ],
  },
};

const presetColors = {
  "violet-cyan": { from: "#8b5cf6", to: "#06b6d4", lightFrom: "#6d28d9", lightTo: "#0284c7" },
  "emerald-teal": { from: "#10b981", to: "#2dd4bf", lightFrom: "#047857", lightTo: "#0f766e" },
  "rose-amber": { from: "#f43f5e", to: "#fbbf24", lightFrom: "#be123c", lightTo: "#b45309" },
  "fuchsia-purple": { from: "#d946ef", to: "#9333ea", lightFrom: "#a21caf", lightTo: "#6b21a8" },
  "indigo-sky": { from: "#6366f1", to: "#38bdf8", lightFrom: "#3730a3", lightTo: "#0369a1" },
};

const darkBgPresets = {
  "default-obsidian": { from: "#030712", to: "#0b1329", label: "Dark Obsidian Classic" },
  "midnight-cyber": { from: "#0f051d", to: "#1e0b36", label: "Deep Purple Cyber" },
  "emerald-forest": { from: "#022417", to: "#053b27", label: "Deep Emerald Dark" },
  "navy-dark": { from: "#040d21", to: "#0f172a", label: "Dark Blue Slate" },
};

const lightBgPresets = {
  "clean-studio": { from: "#ffffff", to: "#e2e8f0", label: "Light Studio Crisp" },
  "warm-sunset": { from: "#fff7ed", to: "#ffedd5", label: "Warm Cream Light" },
  "soft-sky": { from: "#f0f9ff", to: "#e0f2fe", label: "Soft Ice Blue" },
  "rose-blush": { from: "#fff1f2", to: "#ffe4e6", label: "Rose Blush Light" },
};

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("portfolio_projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem("portfolio_certificates");
    return saved ? JSON.parse(saved) : initialCertificates;
  });

  const [experiences, setExperiences] = useState(() => {
    const saved = localStorage.getItem("portfolio_experiences");
    return saved ? JSON.parse(saved) : initialExperiences;
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem("portfolio_skills");
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("portfolio_activities");
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem("portfolio_site_settings");
    return saved ? { ...initialSiteSettings, ...JSON.parse(saved) } : initialSiteSettings;
  });

  // Dynamic CSS variables & font & background theme application
  useEffect(() => {
    // Font Family
    document.documentElement.style.setProperty("--site-font", `"${siteSettings.fontFamily}", sans-serif`);

    // Accent Colors (HD High Resolution)
    const accent = presetColors[siteSettings.gradientPreset] || {
      from: siteSettings.customFrom || "#8b5cf6",
      to: siteSettings.customTo || "#06b6d4",
      lightFrom: siteSettings.customFrom || "#6d28d9",
      lightTo: siteSettings.customTo || "#0284c7",
    };

    document.documentElement.style.setProperty("--color-primary-from", accent.from || "#8b5cf6");
    document.documentElement.style.setProperty("--color-primary-to", accent.to || "#06b6d4");

    // Dark Background Theme Colors
    const darkPresetKey = siteSettings.darkBgPreset || "default-obsidian";
    const darkBg = darkBgPresets[darkPresetKey] || darkBgPresets["default-obsidian"];
    const darkFrom = darkPresetKey === "custom" ? (siteSettings.customDarkBgFrom || "#030712") : darkBg.from;
    const darkTo = darkPresetKey === "custom" ? (siteSettings.customDarkBgTo || "#0b1329") : darkBg.to;

    document.documentElement.style.setProperty("--bg-dark-from", darkFrom);
    document.documentElement.style.setProperty("--bg-dark-to", darkTo);

    // Light Background Theme Colors
    const lightPresetKey = siteSettings.lightBgPreset || "clean-studio";
    const lightBg = lightBgPresets[lightPresetKey] || lightBgPresets["clean-studio"];
    const lightFrom = lightPresetKey === "custom" ? (siteSettings.customLightBgFrom || "#ffffff") : lightBg.from;
    const lightTo = lightPresetKey === "custom" ? (siteSettings.customLightBgTo || "#e2e8f0") : lightBg.to;

    document.documentElement.style.setProperty("--bg-light-from", lightFrom);
    document.documentElement.style.setProperty("--bg-light-to", lightTo);

    // Dynamic Favicon Update
    if (siteSettings.favicon) {
      const resolvedFavicon = resolveImagePath(siteSettings.favicon);
      let faviconLink = document.querySelector("link[rel*='icon']");
      if (!faviconLink) {
        faviconLink = document.createElement("link");
        faviconLink.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(faviconLink);
      }
      faviconLink.href = resolvedFavicon;
    }

    localStorage.setItem("portfolio_site_settings", JSON.stringify(siteSettings));
    autoCleanGarbage(siteSettings, projects, certificates);
  }, [siteSettings]);

  // Auto Garbage Cleanup Trigger
  const autoCleanGarbage = (currentSettings, currentProjects, currentCertificates) => {
    try {
      const cacheRaw = localStorage.getItem("portfolio_image_cache");
      if (!cacheRaw) return;
      const cache = JSON.parse(cacheRaw);
      const cacheKeys = Object.keys(cache);

      const activeImageRefs = new Set();
      if (currentSettings?.profileImage) activeImageRefs.add(currentSettings.profileImage);
      if (currentSettings?.favicon) activeImageRefs.add(currentSettings.favicon);

      (currentProjects || []).forEach((p) => {
        if (Array.isArray(p.image)) {
          p.image.forEach((img) => activeImageRefs.add(img));
        } else if (p.image) {
          activeImageRefs.add(p.image);
        }
      });

      (currentCertificates || []).forEach((c) => {
        if (c.image) activeImageRefs.add(c.image);
      });

      const cleanedCache = {};
      let hasChanges = false;
      cacheKeys.forEach((key) => {
        const pathNoPublic = key.startsWith("public/") ? "/" + key.substring(7) : key;
        const isReferenced =
          activeImageRefs.has(key) ||
          activeImageRefs.has(pathNoPublic) ||
          Array.from(activeImageRefs).some((ref) => typeof ref === "string" && (ref.includes(key) || key.includes(ref)));

        if (isReferenced) {
          cleanedCache[key] = cache[key];
        } else {
          hasChanges = true;
        }
      });

      if (hasChanges) {
        localStorage.setItem("portfolio_image_cache", JSON.stringify(cleanedCache));
      }
    } catch (err) {
      console.error("Auto GC Error:", err);
    }
  };

  // Sync datasets to localStorage
  useEffect(() => {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
    autoCleanGarbage(siteSettings, projects, certificates);
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("portfolio_certificates", JSON.stringify(certificates));
    autoCleanGarbage(siteSettings, projects, certificates);
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem("portfolio_experiences", JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem("portfolio_skills", JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem("portfolio_activities", JSON.stringify(activities));
  }, [activities]);

  // Site Settings CRUD
  const updateSiteSettings = (newSettings) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Projects CRUD
  const addProject = (project) => {
    setProjects((prev) => [project, ...prev]);
  };
  const updateProject = (slug, updatedProject) => {
    setProjects((prev) => prev.map((p) => (p.slug === slug ? updatedProject : p)));
  };
  const deleteProject = (slug) => {
    setProjects((prev) => prev.filter((p) => p.slug !== slug));
  };

  // Certificates CRUD
  const addCertificate = (cert) => {
    const id = Date.now();
    setCertificates((prev) => [{ ...cert, id }, ...prev]);
  };
  const addMultipleCertificates = (certsArray) => {
    const newCerts = certsArray.map((cert, index) => ({
      ...cert,
      id: Date.now() + index,
    }));
    setCertificates((prev) => [...newCerts, ...prev]);
  };
  const updateCertificate = (id, updatedCert) => {
    setCertificates((prev) => prev.map((c) => (c.id === id ? { ...updatedCert, id } : c)));
  };
  const deleteCertificate = (id) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
  };

  // Experience CRUD
  const addExperience = (exp) => {
    const id = Date.now();
    setExperiences((prev) => [{ ...exp, id }, ...prev]);
  };
  const updateExperience = (id, updatedExp) => {
    setExperiences((prev) => prev.map((e) => (e.id === id ? { ...updatedExp, id } : e)));
  };
  const deleteExperience = (id) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  // Skills CRUD
  const addSkillCategory = (skillCat) => {
    const id = Date.now();
    setSkills((prev) => [{ ...skillCat, id }, ...prev]);
  };
  const updateSkillCategory = (id, updatedSkill) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...updatedSkill, id } : s)));
  };
  const deleteSkillCategory = (id) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  // Activities CRUD
  const addActivity = (activity) => {
    const id = Date.now();
    setActivities((prev) => [{ ...activity, id }, ...prev]);
  };
  const updateActivity = (id, updatedAct) => {
    setActivities((prev) => prev.map((a) => (a.id === id ? { ...updatedAct, id } : a)));
  };
  const deleteActivity = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  // Reset to original dataset
  const resetAllData = () => {
    setProjects(initialProjects);
    setCertificates(initialCertificates);
    setExperiences(initialExperiences);
    setSkills(initialSkills);
    setActivities(initialActivities);
    setSiteSettings(initialSiteSettings);
    localStorage.removeItem("portfolio_projects");
    localStorage.removeItem("portfolio_certificates");
    localStorage.removeItem("portfolio_experiences");
    localStorage.removeItem("portfolio_skills");
    localStorage.removeItem("portfolio_activities");
    localStorage.removeItem("portfolio_site_settings");
  };

  return (
    <PortfolioContext.Provider
      value={{
        siteSettings,
        updateSiteSettings,
        projects,
        addProject,
        updateProject,
        deleteProject,
        certificates,
        addCertificate,
        addMultipleCertificates,
        updateCertificate,
        deleteCertificate,
        experiences,
        addExperience,
        updateExperience,
        deleteExperience,
        skills,
        addSkillCategory,
        updateSkillCategory,
        deleteSkillCategory,
        activities,
        addActivity,
        updateActivity,
        deleteActivity,
        resetAllData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioData = () => useContext(PortfolioContext);
