import { useEffect, useMemo, useRef, useState } from "react";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";
import { usePortfolioData } from "../context/PortfolioContext";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/60">
      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 dark:bg-white" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 dark:bg-white delay-150" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 dark:bg-white delay-300" />
      <span>AI is typing...</span>
    </div>
  );
}

export default function AIChatbot() {
  const { siteSettings } = usePortfolioData();
  const botConfig = siteSettings?.chatbotSettings || {
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

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setChat([{ bot: botConfig.introMessage }]);
  }, [botConfig.introMessage]);

  const chatRef = useRef(null);
  const inputRef = useRef(null);

  const isSendDisabled = useMemo(() => !msg.trim() || typing, [msg, typing]);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chat, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (botConfig.enabled === false) {
    return null;
  }

  const getResponse = (text) => {
    const msgLower = text.toLowerCase();

    if (Array.isArray(botConfig.qaPairs) && botConfig.qaPairs.length > 0) {
      for (const pair of botConfig.qaPairs) {
        if (!pair.keyword) continue;
        const keywords = pair.keyword.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
        for (const kw of keywords) {
          if (msgLower.includes(kw)) {
            return pair.answer;
          }
        }
      }
    }

    return botConfig.fallbackAnswer || "Try asking about skills, projects, experience, certificates, or contact.";
  };

  const sendMessage = (custom) => {
    const userMsg = (custom ?? msg).trim();
    if (!userMsg || typing) return;

    setChat((prev) => [...prev, { user: userMsg }]);
    setMsg("");
    setTyping(true);

    setTimeout(() => {
      setChat((prev) => [...prev, { bot: getResponse(userMsg) }]);
      setTyping(false);
    }, 600);
  };

  const quickPromptsList = Array.isArray(botConfig.quickPrompts)
    ? botConfig.quickPrompts
    : ["skills", "projects", "experience", "certificates", "contact"];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle AI Chatbot"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-xl transition hover:scale-110 active:scale-95"
      >
        {open ? <FaTimes className="text-xl" /> : <FaRobot className="text-2xl" />}
      </button>

      {/* Chat Box */}
      {open && (
        <div className="mt-4 flex h-[500px] w-[340px] flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white/80 backdrop-blur-2xl shadow-2xl dark:border-white/15 dark:bg-slate-900/90">
          {/* Header */}
          <div className="border-b border-black/10 px-5 py-3.5 dark:border-white/10">
            <h3 className="font-bold text-slate-900 dark:text-white">
              {botConfig.botName || "Tazkhan AI Assistant"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {botConfig.subtitle || "Ask about skills, projects, or contact"}
            </p>
          </div>

          {/* Chat Messages */}
          <div ref={chatRef} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {chat.map((c, i) => (
              <div key={i}>
                {c.user && (
                  <div className="flex justify-end">
                    <div className="rounded-2xl bg-cyan-600 px-4 py-2 text-white font-medium shadow-sm">
                      {c.user}
                    </div>
                  </div>
                )}

                {c.bot && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-slate-100 border border-slate-200/60 px-4 py-2.5 text-slate-800 backdrop-blur-md shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
                      {c.bot}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {typing && <TypingIndicator />}
          </div>

          {/* Input & Quick Prompts */}
          <div className="border-t border-black/10 p-3 dark:border-white/10 space-y-2">
            {/* Quick Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {quickPromptsList.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-600 transition hover:bg-cyan-500/20 dark:text-cyan-300"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex items-center overflow-hidden rounded-xl border border-black/10 bg-white/70 backdrop-blur-md dark:border-white/15 dark:bg-white/[0.08]">
              <input
                ref={inputRef}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask something..."
                className="flex-1 bg-transparent px-3 py-2 text-xs outline-none text-slate-800 dark:text-white placeholder:text-slate-400"
              />

              <button
                onClick={() => sendMessage()}
                disabled={isSendDisabled}
                aria-label="Send Message"
                className="mr-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white transition disabled:opacity-40"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}