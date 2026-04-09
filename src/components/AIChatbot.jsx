import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

void motion;

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([
    { bot: "Hi 👋 I am Tazkhan's AI Assistant. Ask me about skills, projects, experience, or contact." }
  ]);
  const [typing, setTyping] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chat]);

  const getResponse = (text) => {
    const message = text.toLowerCase();
    if (message.includes("skills")) return "Tazkhan works with React, Tailwind CSS, Node.js, MongoDB, and AI development.";
    if (message.includes("experience")) return "Tazkhan completed internships at CodeXP and Wayspire as a Full Stack Developer.";
    if (message.includes("projects")) return "Tazkhan built projects like a Tourism Website, To-Do App, and AI Voice Assistant.";
    if (message.includes("contact")) return "You can contact Tazkhan via email: nongsaibamtazkhan@gmail.com";
    if (message.includes("who are you")) return "I am the AI assistant built into Tazkhan's portfolio to help visitors learn about his work.";
    return "I'm still learning 🤖. Try asking about skills, projects, experience, or contact.";
  };

  const send = () => {
    if (!msg.trim()) return;
    const userMsg = msg;
    setChat(prev => [...prev, { user: userMsg }]);
    setMsg("");
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(userMsg);
      setChat(prev => [...prev, { bot: response }]);
      setTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">

      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0], repeat: Infinity, duration: 2 }}
        className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-400 shadow-lg flex items-center justify-center text-white text-2xl backdrop-blur-sm"
      >
        <FaRobot />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="mt-3 flex h-[480px] w-80 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-2xl backdrop-blur-2xl dark:border-white/20 dark:bg-gray-800/30"
          >

            {/* Header */}
            <div className="bg-gradient-to-tr from-cyan-400/40 via-purple-400/40 to-pink-400/40 text-white p-4 font-bold text-center tracking-wide backdrop-blur-md">
              Tazkhan AI Assistant 🤖
            </div>

            {/* Chat Messages */}
            <div
              ref={chatRef}
              className="flex-1 space-y-3 overflow-y-auto p-4 text-sm scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-transparent"
            >
              {chat.map((c, i) => (
                <div key={i}>
                  {c.user && (
                    <div className="flex justify-end">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-[70%] rounded-2xl bg-slate-200/80 px-4 py-2 text-slate-800 shadow-md backdrop-blur-md dark:bg-gray-700/40 dark:text-white"
                      >
                        {c.user}
                      </motion.div>
                    </div>
                  )}
                  {c.bot && (
                    <div className="flex justify-start">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-[70%] rounded-2xl bg-gradient-to-tr from-cyan-400/20 via-purple-400/20 to-pink-400/20 px-4 py-2 text-slate-800 shadow-md backdrop-blur-md dark:text-white"
                      >
                        {c.bot}
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex items-center justify-start gap-2 text-xs text-slate-500 dark:text-gray-300">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-600 dark:bg-white"></span>
                  <span className="delay-200 h-2 w-2 animate-bounce rounded-full bg-slate-600 dark:bg-white"></span>
                  <span className="delay-400 h-2 w-2 animate-bounce rounded-full bg-slate-600 dark:bg-white"></span>
                  AI is typing...
                </div>
              )}
            </div>

            {/* Quick Buttons */}
            <div className="flex gap-2 px-3 py-2 flex-wrap text-xs">
              {["skills", "projects", "experience", "contact"].map((text) => (
                <motion.button
                  key={text}
                  onClick={() => setMsg(text)}
                  whileHover={{ scale: 1.1 }}
                  className="transform rounded-full bg-slate-200/80 px-3 py-1 text-slate-800 transition hover:bg-cyan-400/30 dark:bg-gray-700/40 dark:text-white"
                >
                  {text.charAt(0).toUpperCase() + text.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <div className="flex border-t border-slate-200 dark:border-white/20">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-100/80 p-3 text-slate-800 outline-none placeholder-slate-500 backdrop-blur-sm dark:bg-gray-700/30 dark:text-white dark:placeholder-gray-300"
              />
              <motion.button
                onClick={send}
                whileHover={{ scale: 1.1 }}
                className="bg-cyan-400/30 dark:bg-purple-400/30 text-white px-4 flex items-center justify-center hover:bg-cyan-400/50 transition"
              >
                <FaPaperPlane />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
