import React, { useState } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
  HiOutlineCheck,
  HiOutlineStar,
} from "react-icons/hi2";
import { compressAndConvertToWebP } from "../../utils/imageCompressor";

const ProjectsTab = () => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    category: "Full Stack",
    description: "",
    longDescription: "",
    tags: "",
    gitLink: "",
    image: "",
    featured: false,
  });

  const openCreateModal = () => {
    setEditingSlug(null);
    setFormData({
      slug: "",
      title: "",
      category: "Full Stack",
      description: "",
      longDescription: "",
      tags: "React, Node.js",
      gitLink: "",
      image: "",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingSlug(project.slug);
    setFormData({
      slug: project.slug,
      title: project.title,
      category: project.category || "Full Stack",
      description: project.description || "",
      longDescription: project.longDescription || "",
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : project.tags || "",
      gitLink: project.gitLink || "",
      image: Array.isArray(project.image) ? project.image.join(", ") : project.image || "",
      featured: !!project.featured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagArray = formData.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const finalSlug = formData.slug.trim().toLowerCase().replace(/\s+/g, "-") || `project-${Date.now()}`;
    
    // Handle image string vs array
    let finalImage = formData.image;
    if (formData.image.includes(",")) {
      finalImage = formData.image.split(",").map((img) => img.trim()).filter(Boolean);
    }

    const payload = {
      slug: finalSlug,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      longDescription: formData.longDescription,
      tags: tagArray,
      gitLink: formData.gitLink,
      image: finalImage,
      featured: formData.featured,
    };

    if (editingSlug) {
      updateProject(editingSlug, payload);
    } else {
      addProject(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(slug);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Manage Projects</h2>
          <p className="text-xs text-slate-400">Add, update, or remove portfolio projects</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90 active:scale-95"
        >
          <HiOutlinePlus className="h-4 w-4" /> Add New Project
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-white/10 bg-slate-800/40 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-5 py-3.5">Title</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Featured</th>
              <th className="px-5 py-3.5">Tags</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.map((project) => (
              <tr key={project.slug} className="transition hover:bg-white/[0.02]">
                <td className="px-5 py-4 font-medium text-white">
                  <div>{project.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{project.slug}</div>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] text-cyan-300">
                    {project.category || "Full Stack"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {project.featured ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-1 text-[11px] font-semibold text-amber-300">
                      <HiOutlineStar className="h-3 w-3" /> Featured
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500">Standard</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(project.tags) &&
                      project.tags.map((t) => (
                        <span key={t} className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                          {t}
                        </span>
                      ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(project)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                      title="Edit"
                    >
                      <HiOutlinePencilSquare className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.slug)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
                      title="Delete"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-6 text-slate-100 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold">
                {editingSlug ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-slate-400">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. Mini CRM"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-slate-400">Slug (URL ID)</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. mini-crm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-slate-400">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI / ML">AI / ML</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-slate-400">GitHub Link</label>
                  <input
                    type="text"
                    value={formData.gitLink}
                    onChange={(e) => setFormData({ ...formData, gitLink: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="React, Node.js, Express"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Direct Image Upload (WebP Auto-Compress &le; 200KB)</label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 cursor-pointer transition">
                      Upload Project Cover Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            try {
                              const result = await compressAndConvertToWebP(file, "projects", 200);
                              setFormData((prev) => ({
                                ...prev,
                                image: result.path,
                                imagePath: result.path,
                                imageSizeKB: result.sizeKB,
                              }));
                            } catch (err) {
                              console.error(err);
                            }
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {formData.imagePath && (
                    <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/40 p-2.5 text-[11px] font-mono text-cyan-300 space-y-1">
                      <div><span className="text-slate-400 font-sans">Storage Path:</span> {formData.imagePath}</div>
                      {formData.imageSizeKB && (
                        <div><span className="text-slate-400 font-sans">Compressed Size:</span> <span className="text-emerald-400 font-bold">{formData.imageSizeKB} KB</span> (WebP &le; 200KB)</div>
                      )}
                    </div>
                  )}

                  <label className="mt-1 block font-semibold text-slate-400">Or Paste Image Asset / URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                    placeholder="e.g. public/storage/TK/projects/2026-08-25-213140.webp or URL"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Short Description</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="Brief summary for card view"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Long Description</label>
                <textarea
                  rows={3}
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="Detailed description for project page"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="featured" className="font-semibold text-slate-300">
                  Featured Project (Show on Home Page)
                </label>
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
                  {editingSlug ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;
