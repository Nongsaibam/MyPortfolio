import React, { useState } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";

const SkillsTab = () => {
  const { skills, addSkillCategory, updateSkillCategory, deleteSkillCategory } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    iconName: "FaPython",
    items: "",
  });

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      category: "",
      iconName: "FaPython",
      items: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingId(skill.id);
    setFormData({
      category: skill.category,
      iconName: skill.iconName || "FaPython",
      items: Array.isArray(skill.items) ? skill.items.join(", ") : skill.items || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemsArray = formData.items
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      category: formData.category,
      iconName: formData.iconName,
      items: itemsArray,
    };

    if (editingId) {
      updateSkillCategory(editingId, payload);
    } else {
      addSkillCategory(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this skill category?")) {
      deleteSkillCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Manage Skills</h2>
          <p className="text-xs text-slate-400">Add, edit, or remove skill groups and technical items</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90 active:scale-95"
        >
          <HiOutlinePlus className="h-4 w-4" /> Add Skill Category
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {skills.map((skill) => (
          <div
            key={skill.id || skill.category}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-xs backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">{skill.category}</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(skill)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                  title="Edit"
                >
                  <HiOutlinePencilSquare className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400"
                  title="Delete"
                >
                  <HiOutlineTrash className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {Array.isArray(skill.items) &&
                skill.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300"
                  >
                    {item}
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
                {editingId ? "Edit Skill Category" : "Add New Skill Category"}
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
                <label className="mb-1 block font-semibold text-slate-400">Category Name</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="e.g. Python Full Stack + AI Developer"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Icon Identifier</label>
                <select
                  value={formData.iconName}
                  onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                >
                  <option value="FaPython">FaPython (Python / AI)</option>
                  <option value="FaReact">FaReact (React / Frontend)</option>
                  <option value="FaDatabase">FaDatabase (Database / Backend)</option>
                  <option value="FaTools">FaTools (Tools / Version Control)</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Skills (comma separated)</label>
                <textarea
                  rows={3}
                  required
                  value={formData.items}
                  onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="Python, React.js, Node.js, Express, MongoDB"
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
                  {editingId ? "Save Changes" : "Create Skill Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsTab;
