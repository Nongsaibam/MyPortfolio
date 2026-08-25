import React, { useState } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";

const ICON_OPTIONS = [
  { id: "Rocket", label: "🚀 Rocket Launch", emoji: "🚀" },
  { id: "Briefcase", label: "💼 Briefcase Work", emoji: "💼" },
  { id: "Lightning", label: "⚡ Lightning Speed", emoji: "⚡" },
  { id: "Building", label: "🏢 Company / Office", emoji: "🏢" },
  { id: "Code", label: "💻 Code / Developer", emoji: "💻" },
  { id: "Star", label: "⭐ Star Achievement", emoji: "⭐" },
  { id: "Graduation", label: "🎓 Academic / Degree", emoji: "🎓" },
  { id: "Globe", label: "🌐 Web / Global", emoji: "🌐" },
  { id: "Design", label: "🎨 Design / Creative", emoji: "🎨" },
  { id: "Tools", label: "🔧 Tools / Engineering", emoji: "🔧" },
  { id: "Trophy", label: "🏆 Trophy / Award", emoji: "🏆" },
  { id: "Chart", label: "📊 Chart / Analytics", emoji: "📊" },
  { id: "AI", label: "🧠 AI / Intelligence", emoji: "🧠" },
  { id: "Mobile", label: "📱 Mobile App", emoji: "📱" },
  { id: "Security", label: "🔒 Security / Shield", emoji: "🔒" },
  { id: "Cloud", label: "☁️ Cloud / DevOps", emoji: "☁️" },
  { id: "Gear", label: "⚙️ System / Engine", emoji: "⚙️" },
  { id: "Target", label: "🎯 Target / Milestone", emoji: "🎯" },
  { id: "Idea", label: "💡 Idea / Innovation", emoji: "💡" },
  { id: "Fire", label: "🔥 Fire / Trending", emoji: "🔥" },
  { id: "Heart", label: "💖 Passion / Product", emoji: "💖" },
  { id: "Sparkles", label: "✨ Sparkles / Featured", emoji: "✨" },
];

const ExperienceTab = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    points: "",
    iconType: "Rocket",
  });

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      date: "",
      location: "",
      points: "",
      iconType: "Rocket",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp) => {
    setEditingId(exp.id);
    setFormData({
      title: exp.title,
      date: exp.date || "",
      location: exp.location || "",
      points: Array.isArray(exp.points) ? exp.points.join("\n") : exp.points || "",
      iconType: exp.iconType || "Rocket",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pointsList = formData.points
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      date: formData.date,
      location: formData.location,
      points: pointsList,
      iconType: formData.iconType || "Rocket",
    };

    if (editingId) {
      updateExperience(editingId, payload);
    } else {
      addExperience(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this experience entry?")) {
      deleteExperience(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Manage Experience</h2>
          <p className="text-xs text-slate-400">Add, edit, or delete work experience & internship items</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90 active:scale-95"
        >
          <HiOutlinePlus className="h-4 w-4" /> Add Experience
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id || exp.title}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-xs backdrop-blur-md"
          >
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{exp.title}</h3>
                <div className="mt-0.5 text-slate-400 font-medium">{exp.location}</div>
                <div className="mt-1 text-[11px] text-cyan-400 font-mono">{exp.date}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(exp)}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  title="Edit"
                >
                  <HiOutlinePencilSquare className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
                  title="Delete"
                >
                  <HiOutlineTrash className="h-4 w-4" />
                </button>
              </div>
            </div>

            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate-300">
              {Array.isArray(exp.points) &&
                exp.points.map((point, idx) => <li key={idx}>{point}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 text-slate-100 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold">
                {editingId ? "Edit Experience" : "Add New Experience"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-slate-400">Role / Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="e.g. Full Stack Web Development Intern"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Organization / Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="e.g. Wayspire Ed-Tech Private Limited"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Duration Date</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="e.g. Apr 2024 - Jun 2024"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Timeline Node Icon (22 Icons Available 🚀)</label>
                <select
                  value={formData.iconType || "Rocket"}
                  onChange={(e) => setFormData({ ...formData, iconType: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800 p-2.5 text-white outline-none focus:border-cyan-500"
                >
                  {ICON_OPTIONS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>

                {/* Visual Clickable Grid */}
                <div className="mt-2.5 max-h-36 overflow-y-auto rounded-xl border border-white/10 bg-slate-950/80 p-2 grid grid-cols-3 sm:grid-cols-4 gap-1.5 custom-scrollbar">
                  {ICON_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, iconType: item.id })}
                      className={`flex items-center gap-1.5 rounded-lg p-1.5 text-[11px] font-medium transition ${
                        (formData.iconType || "Rocket") === item.id
                          ? "border border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold shadow-sm"
                          : "border border-white/5 bg-slate-800/60 text-slate-300 hover:bg-slate-700/80"
                      }`}
                    >
                      <span>{item.emoji}</span>
                      <span className="truncate">{item.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Key Points (One per line)</label>
                <textarea
                  rows={4}
                  required
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="Developed a To-Do App using React.&#10;Implemented state management."
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-slate-400 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2 font-semibold text-white hover:opacity-90"
                >
                  {editingId ? "Save Changes" : "Create Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceTab;
