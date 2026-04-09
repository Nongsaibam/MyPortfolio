import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
            className="w-80 h-[480px] bg-white/10 dark:bg-gray-800/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl flex flex-col mt-3 overflow-hidden"
          >

            {/* Header */}
            <div className="bg-gradient-to-tr from-cyan-400/40 via-purple-400/40 to-pink-400/40 text-white p-4 font-bold text-center tracking-wide backdrop-blur-md">
              Tazkhan AI Assistant 🤖
            </div>

            {/* Chat Messages */}
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 text-sm scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-transparent"
            >
              {chat.map((c, i) => (
                <div key={i}>
                  {c.user && (
                    <div className="flex justify-end">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/20 dark:bg-gray-700/40 text-white px-4 py-2 rounded-2xl max-w-[70%] shadow-md backdrop-blur-md"
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
                        className="bg-gradient-to-tr from-cyan-400/20 via-purple-400/20 to-pink-400/20 text-white px-4 py-2 rounded-2xl max-w-[70%] shadow-md backdrop-blur-md"
                      >
                        {c.bot}
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex justify-start items-center text-xs text-gray-300 gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-400"></span>
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
                  className="bg-white/20 dark:bg-gray-700/40 text-white px-3 py-1 rounded-full hover:bg-cyan-400/30 transition transform"
                >
                  {text.charAt(0).toUpperCase() + text.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <div className="flex border-t border-white/20">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask me anything..."
                className="flex-1 p-3 outline-none bg-white/10 dark:bg-gray-700/30 text-white placeholder-gray-300 backdrop-blur-sm"
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
