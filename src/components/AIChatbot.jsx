import { useEffect, useMemo, useRef, useState } from "react";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";

const BOT_NAME = "Tazkhan AI Assistant";

const QUICK_PROMPTS = [
  "skills",
  "projects",
  "experience",
  "certificates",
  "contact",
];

const SUGGESTIONS = [
  "Tell me about your skills",
  "Show me your projects",
  "What is your experience?",
  "Do you have certificates?",
  "How can I contact you?",
];

const portfolioData = {
  intro:
    "Hi 👋 I’m Tazkhan's AI Assistant. Ask me about skills, projects, experience, certificates, or contact details.",
  skills:
    "Tazkhan works with React, Vite, Tailwind CSS, Node.js, Express.js, FastAPI, MySQL, MongoDB, JavaScript, and AI-based development.",
  experience:
    "Tazkhan has completed internships at Wayspire Ed-Tech, CodeXP, and Future Interns as a Full Stack Web Development Intern.",
  projects:
    "Featured projects include Face2Comic, Image Captioning, Facial Recognition System, Mini CRM, Coffee Shop Business Website, OTP Login System (MultiApp), and EduLearn Student Portal.",
  certificates:
    "Tazkhan has completed multiple certificates and internships from Udemy, Great Learning, Simplilearn, CodeXP, Wayspire, Future Interns, and Cursa.",
  contact:
    "You can contact Tazkhan at nongsaibamtazkhan@gmail.com.",
  education:
    "Tazkhan completed a Bachelor’s degree in Computer Applications (BCA) from Manipur University.",
  location:
    "Tazkhan is from Manipur and is currently based in Bangalore.",
  about:
    "Tazkhan is a Full Stack Developer focused on scalable, modern, and user-friendly applications with clean architecture and maintainable code.",
};

function getResponse(text) {
  const message = text.toLowerCase().trim();

  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  ) {
    return "Hi 👋 Ask me about Tazkhan’s skills, projects, experience, certificates, education, or contact.";
  }

  if (message.includes("about") || message.includes("who is tazkhan")) {
    return portfolioData.about;
  }

  if (
    message.includes("skill") ||
    message.includes("tech stack") ||
    message.includes("technology")
  ) {
    return portfolioData.skills;
  }

  if (
    message.includes("project") ||
    message.includes("work") ||
    message.includes("portfolio")
  ) {
    return portfolioData.projects;
  }

  if (
    message.includes("experience") ||
    message.includes("internship") ||
    message.includes("job")
  ) {
    return portfolioData.experience;
  }

  if (
    message.includes("certificate") ||
    message.includes("certification") ||
    message.includes("achievement")
  ) {
    return portfolioData.certificates;
  }

  if (
    message.includes("education") ||
    message.includes("degree") ||
    message.includes("bca") ||
    message.includes("university")
  ) {
    return portfolioData.education;
  }

  if (
    message.includes("location") ||
    message.includes("from") ||
    message.includes("based")
  ) {
    return portfolioData.location;
  }

  if (
    message.includes("contact") ||
    message.includes("email") ||
    message.includes("hire") ||
    message.includes("reach")
  ) {
    return portfolioData.contact;
  }

  if (
    message.includes("who are you") ||
    message.includes("what are you")
  ) {
    return "I’m the AI assistant built into Tazkhan’s portfolio to help visitors learn about his work, skills, and background.";
  }

  return "I’m still learning 🤖 Try asking about skills, projects, experience, certificates, education, or contact.";
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-1 text-xs text-slate-500 dark:text-slate-300">
      <span className="h-2 w-2 rounded-full bg-slate-500 dark:bg-white" />
      <span className="h-2 w-2 rounded-full bg-slate-500 dark:bg-white" />
      <span className="h-2 w-2 rounded-full bg-slate-500 dark:bg-white" />
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
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat, typing]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const sendMessage = (customMessage) => {
    const userMessage = (customMessage ?? msg).trim();
    if (!userMessage || typing) return;

    setChat((prev) => [...prev, { user: userMessage }]);
    setMsg("");
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(userMessage);
      setChat((prev) => [...prev, { bot: response }]);
      setTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-2xl text-white shadow-[0_12px_40px_rgba(34,211,238,0.35)] backdrop-blur-xl"
        aria-label={open ? "Close chatbot" : "Open chatbot"}
      >
        {open ? <FaTimes /> : <FaRobot />}
      </button>

      {open && (
        <div className="mt-4 flex h-[520px] w-[360px] flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/80">
            <div className="border-b border-white/10 bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 px-5 py-4 text-white backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold">{BOT_NAME}</h3>
                  <p className="text-xs text-white/80">
                    Ask about skills, projects, experience, or contact
                  </p>
                </div>
                <div className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90">
                  Online
                </div>
              </div>
            </div>

            <div
              ref={chatRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm"
            >
              {chat.map((item, index) => (
                <div key={index}>
                  {item.user && (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-slate-200/90 px-4 py-2.5 text-slate-800 shadow-md dark:bg-slate-800 dark:text-white">
                        {item.user}
                      </div>
                    </div>
                  )}

                  {item.bot && (
                    <div className="flex justify-start">
                      <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-gradient-to-r from-cyan-400/15 via-purple-400/15 to-pink-400/15 px-4 py-2.5 text-slate-800 shadow-md backdrop-blur-md dark:text-white">
                        {item.bot}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {typing && <TypingIndicator />}
            </div>

            <div className="border-t border-slate-200/70 px-3 py-3 dark:border-white/10">
              <div className="mb-3 flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((text) => (
                  <button
                    key={text}
                    type="button"
                    onClick={() => sendMessage(text)}
                    className="rounded-full border border-slate-200/80 bg-slate-100/90 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-cyan-400/20 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {text.charAt(0).toUpperCase() + text.slice(1)}
                  </button>
                ))}
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {SUGGESTIONS.slice(0, 2).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMsg(item)}
                    className="text-xs text-slate-500 transition hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-300"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex items-center overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/80 dark:border-white/10 dark:bg-slate-950/40">
                <input
                  ref={inputRef}
                  type="text"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-500 dark:text-white dark:placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={isSendDisabled}
                  className={`mr-2 flex h-10 w-10 items-center justify-center rounded-full transition ${
                    isSendDisabled
                      ? "cursor-not-allowed bg-slate-300/70 text-slate-500 dark:bg-white/10 dark:text-white/40"
                      : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                  }`}
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
