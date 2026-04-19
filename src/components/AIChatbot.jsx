import { useEffect, useMemo, useRef, useState } from "react";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";

const BOT_NAME = "Tazkhan AI Assistant";

const QUICK_PROMPTS = ["skills", "projects", "experience", "certificates", "contact"];

const portfolioData = {
  intro:
    "Hi 👋 I’m Tazkhan's AI Assistant. Ask me about skills, projects, experience, certificates, or contact details.",
  skills:
    "Tazkhan works with React, Vite, Tailwind CSS, Node.js, Express.js, FastAPI, MySQL, MongoDB, JavaScript, and AI.",
  experience:
    "Internships at Wayspire Ed-Tech, CodeXP, and Future Interns as Full Stack Developer.",
  projects:
    "Projects include Face2Comic, Image Captioning, CRM, Coffee Shop Website, OTP System, EduLearn.",
  certificates:
    "Certificates from Udemy, Great Learning, Simplilearn, CodeXP, Wayspire, Future Interns.",
  contact:
    "Contact: nongsaibamtazkhan@gmail.com",
};

function getResponse(text) {
  const msg = text.toLowerCase();

  if (msg.includes("skill")) return portfolioData.skills;
  if (msg.includes("project")) return portfolioData.projects;
  if (msg.includes("experience")) return portfolioData.experience;
  if (msg.includes("certificate")) return portfolioData.certificates;
  if (msg.includes("contact")) return portfolioData.contact;

  return "Try asking about skills, projects, experience, or contact.";
}

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
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const [chat, setChat] = useState([{ bot: portfolioData.intro }]);

  const chatRef = useRef(null);
  const inputRef = useRef(null);

  const isSendDisabled = useMemo(() => !msg.trim() || typing, [msg, typing]);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chat, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-md transition hover:scale-110"
      >
        {open ? <FaTimes /> : <FaRobot />}
      </button>

      {/* Chat Box */}
      {open && (
        <div className="mt-4 flex h-[500px] w-[340px] flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white/60 backdrop-blur-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

          {/* Header */}
          <div className="border-b border-black/10 px-4 py-3 dark:border-white/10">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {BOT_NAME}
            </h3>
            <p className="text-xs text-slate-500 dark:text-white/60">
              Ask about skills, projects, or contact
            </p>
          </div>

          {/* Chat */}
          <div ref={chatRef} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {chat.map((c, i) => (
              <div key={i}>
                {c.user && (
                  <div className="flex justify-end">
                    <div className="rounded-2xl bg-slate-200 px-4 py-2 text-slate-800 dark:bg-slate-800 dark:text-white">
                      {c.user}
                    </div>
                  </div>
                )}

                {c.bot && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-white/70 px-4 py-2 text-slate-800 backdrop-blur-md dark:bg-white/10 dark:text-white">
                      {c.bot}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {typing && <TypingIndicator />}
          </div>

          {/* Input */}
          <div className="border-t border-black/10 p-3 dark:border-white/10">
            
            {/* Quick Buttons */}
            <div className="mb-2 flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs transition hover:bg-cyan-500/20 dark:border-white/15 dark:bg-white/[0.08]"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex items-center overflow-hidden rounded-xl border border-black/10 bg-white/60 dark:border-white/15 dark:bg-white/[0.08]">
              <input
                ref={inputRef}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask something..."
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
              />

              <button
                onClick={() => sendMessage()}
                disabled={isSendDisabled}
                className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white transition disabled:opacity-40"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}