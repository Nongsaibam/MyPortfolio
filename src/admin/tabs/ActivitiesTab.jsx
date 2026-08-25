import React, { useState } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";

const ActivitiesTab = () => {
  const { activities, addActivity, updateActivity, deleteActivity } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    tags: "",
    iconName: "FaCodeBranch",
  });

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      tags: "",
      iconName: "FaCodeBranch",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (act) => {
    setEditingId(act.id);
    setFormData({
      title: act.title,
      description: act.description || "",
      date: act.date || "",
      tags: Array.isArray(act.tags) ? act.tags.join(", ") : act.tags || "",
      iconName: act.iconName || "FaCodeBranch",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      tags: tagsArray,
      iconName: formData.iconName,
    };

    if (editingId) {
      updateActivity(editingId, payload);
    } else {
      addActivity(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this activity entry?")) {
      deleteActivity(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Manage Activities & Engagements</h2>
          <p className="text-xs text-slate-400">Add, edit, or delete activity cards</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90 active:scale-95"
        >
          <HiOutlinePlus className="h-4 w-4" /> Add Activity
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {activities.map((act) => (
          <div
            key={act.id || act.title}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-xs backdrop-blur-md"
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">{act.title}</h3>
                <div className="mt-0.5 text-[11px] text-cyan-400 font-mono">{act.date}</div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(act)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                  title="Edit"
                >
                  <HiOutlinePencilSquare className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(act.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400"
                  title="Delete"
                >
                  <HiOutlineTrash className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mt-3 text-slate-300">{act.description}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {Array.isArray(act.tags) &&
                act.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400"
                  >
                    {t}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 text-slate-100 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold">
                {editingId ? "Edit Activity" : "Add New Activity"}
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
                <label className="mb-1 block font-semibold text-slate-400">Activity Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="e.g. AI Voice Assistant"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Date / Year</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="e.g. June 2025"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="React, Tailwind, Frontend"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="Multilingual AI assistant..."
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
                  {editingId ? "Save Changes" : "Create Activity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesTab;
