import React, { useState } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheck,
  HiOutlineQuestionMarkCircle,
  HiOutlineCpuChip,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";

const ChatbotTab = () => {
  const { siteSettings, updateSiteSettings } = usePortfolioData();

  const currentBotSettings = siteSettings.chatbotSettings || {
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
  };

  const [formData, setFormData] = useState({
    enabled: currentBotSettings.enabled ?? true,
    botName: currentBotSettings.botName || "Tazkhan AI Assistant",
    subtitle: currentBotSettings.subtitle || "Ask about skills, projects, or contact",
    introMessage: currentBotSettings.introMessage || "",
    quickPromptsStr: Array.isArray(currentBotSettings.quickPrompts)
      ? currentBotSettings.quickPrompts.join(", ")
      : "skills, projects, experience, certificates, contact",
    fallbackAnswer: currentBotSettings.fallbackAnswer || "",
  });

  const [qaPairs, setQaPairs] = useState(
    Array.isArray(currentBotSettings.qaPairs) && currentBotSettings.qaPairs.length > 0
      ? currentBotSettings.qaPairs
      : [
        { id: "qa-1", question: "Skills Inquiry Answer", keyword: "skill, stack, tech", answer: "Tazkhan works with React, Vite, Tailwind CSS, Node.js, Express.js, FastAPI, MySQL, MongoDB, JavaScript, and AI." },
        { id: "qa-2", question: "Projects Inquiry Answer", keyword: "project, app, work", answer: "Projects include Face2Comic, Image Captioning, CRM, Coffee Shop Website, OTP System, EduLearn." },
        { id: "qa-3", question: "Experience Inquiry Answer", keyword: "experience, intern, role", answer: "Internships at Wayspire Ed-Tech, CodeXP, and Future Interns as Full Stack Developer." },
        { id: "qa-4", question: "Certificates Inquiry Answer", keyword: "certificate, cert, course", answer: "Certificates from Udemy, Great Learning, Simplilearn, CodeXP, Wayspire, Future Interns." },
        { id: "qa-5", question: "Contact Inquiry Answer", keyword: "contact, email, hire", answer: "Contact: nongsaibamtazkhan@gmail.com" },
      ]
  );

  const [savedMsg, setSavedMsg] = useState("");

  const handleAddQaPair = () => {
    const newPair = {
      id: `qa-${Date.now()}`,
      question: "New Custom Inquiry Answer",
      keyword: "keyword, topic",
      answer: "Provide detailed answer here...",
    };
    setQaPairs((prev) => [...prev, newPair]);
  };

  const handleUpdateQaPair = (id, field, value) => {
    setQaPairs((prev) =>
      prev.map((pair) => (pair.id === id ? { ...pair, [field]: value } : pair))
    );
  };

  const handleDeleteQaPair = (id) => {
    setQaPairs((prev) => prev.filter((pair) => pair.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const quickPromptsArray = formData.quickPromptsStr
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const updatedBotSettings = {
      enabled: formData.enabled,
      botName: formData.botName,
      subtitle: formData.subtitle,
      introMessage: formData.introMessage,
      quickPrompts: quickPromptsArray,
      fallbackAnswer: formData.fallbackAnswer,
      qaPairs: qaPairs,
    };

    updateSiteSettings({
      ...siteSettings,
      chatbotSettings: updatedBotSettings,
    });

    setSavedMsg("AI Chatbot settings and Knowledge Base updated successfully!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <HiOutlineChatBubbleLeftRight className="h-5 w-5 text-cyan-400" /> AI Chatbot Controller & Dynamic Knowledge Base
        </h2>
      </div>

      {savedMsg && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-400 text-center animate-fade-up">
          {savedMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Toggle Widget & Identity */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HiOutlineCpuChip className="h-4 w-4 text-cyan-400" /> Widget Status & Identity
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Toggle floating assistant on public website</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-400">Bot Name</label>
              <input
                type="text"
                required
                value={formData.botName}
                onChange={(e) => setFormData({ ...formData, botName: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="e.g. Tazkhan AI Assistant"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">Subtitle Tagline</label>
              <input
                type="text"
                required
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="e.g. Ask about skills, projects, or contact"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-400">Welcome / Intro Message</label>
            <textarea
              rows={2}
              required
              value={formData.introMessage}
              onChange={(e) => setFormData({ ...formData, introMessage: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
              placeholder="Initial greeting message when chat opens"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-400">Quick Prompt Chips (Comma separated)</label>
            <input
              type="text"
              required
              value={formData.quickPromptsStr}
              onChange={(e) => setFormData({ ...formData, quickPromptsStr: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
              placeholder="skills, projects, experience, certificates, contact"
            />
          </div>
        </div>

        {/* Dynamic Knowledge Base Q&A Manager */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4 text-xs">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HiOutlineQuestionMarkCircle className="h-4 w-4 text-cyan-400" /> Dynamic Knowledge Base Q&A Pairs
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Easily add, edit, or delete custom automated questions and answers.</p>
          </div>

          <div className="space-y-4">
            {qaPairs.map((pair, index) => (
              <div
                key={pair.id}
                className="rounded-xl border border-white/10 bg-slate-800/50 p-4 space-y-3 relative group transition hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400 flex items-center gap-2 text-xs">
                    #{index + 1} Q&A Entry
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddQaPair}
                      className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-500/20 active:scale-95 transition"
                      title="Add New Q&A Pair"
                    >
                      <HiOutlinePlus className="h-3.5 w-3.5" /> Add Question & Answer
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteQaPair(pair.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition"
                      title="Delete Q&A Pair"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-semibold text-slate-400">Question / Topic Title</label>
                    <input
                      type="text"
                      required
                      value={pair.question}
                      onChange={(e) => handleUpdateQaPair(pair.id, "question", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 p-2 text-white outline-none focus:border-cyan-500"
                      placeholder="e.g. Skills Inquiry Answer"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-semibold text-slate-400">Trigger Keywords (Comma separated)</label>
                    <input
                      type="text"
                      required
                      value={pair.keyword}
                      onChange={(e) => handleUpdateQaPair(pair.id, "keyword", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 p-2 text-white outline-none focus:border-cyan-500"
                      placeholder="e.g. skill, stack, tech"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-slate-400">Automated Bot Answer Text</label>
                  <textarea
                    rows={2}
                    required
                    value={pair.answer}
                    onChange={(e) => handleUpdateQaPair(pair.id, "answer", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 p-2 text-white outline-none focus:border-cyan-500"
                    placeholder="The response text sent by AI assistant..."
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10">
            <label className="mb-1 block font-semibold text-amber-400">Default Fallback Answer (When query doesn't match any keyword)</label>
            <textarea
              rows={2}
              required
              value={formData.fallbackAnswer}
              onChange={(e) => setFormData({ ...formData, fallbackAnswer: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
              placeholder="Response when query does not match known topics"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 active:scale-95 transition"
          >
            <HiOutlineCheck className="h-4 w-4" /> Save Chatbot & Q&A Knowledge Base
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotTab;
