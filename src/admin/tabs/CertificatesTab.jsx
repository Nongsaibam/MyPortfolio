import React, { useState } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
  HiOutlineArrowUpTray,
  HiOutlineSparkles,
  HiOutlineCheck,
} from "react-icons/hi2";
import { compressAndConvertToWebP, resolveImagePath } from "../../utils/imageCompressor";

const CertificatesTab = () => {
  const { certificates, addCertificate, addMultipleCertificates, updateCertificate, deleteCertificate } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    category: "Course",
    image: "",
  });

  // Bulk Multi-Upload State
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkCategory, setBulkCategory] = useState("Course");
  const [bulkPlatform, setBulkPlatform] = useState("Udemy");
  const [bulkItems, setBulkItems] = useState([]);
  const [isProcessingBulk, setIsProcessingBulk] = useState(false);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      platform: "",
      category: "Course",
      image: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cert) => {
    setEditingId(cert.id);
    setFormData({
      title: cert.title,
      platform: cert.platform || "",
      category: cert.category || "Course",
      image: cert.image || "",
    });
    setIsModalOpen(true);
  };

  const openBulkModal = () => {
    setBulkCategory("Course");
    setBulkPlatform("Udemy");
    setBulkItems([]);
    setIsBulkModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      platform: formData.platform,
      category: formData.category,
      image: formData.image,
    };

    if (editingId) {
      updateCertificate(editingId, payload);
    } else {
      addCertificate(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      deleteCertificate(id);
    }
  };

  // Process multiple file uploads at once
  const handleBulkFileSelection = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsProcessingBulk(true);
    const newItems = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        // Auto-extract clean title from filename: e.g. "Full_Stack_React.png" -> "Full Stack React"
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[_-]+/g, " ")
          .trim();
        const formattedTitle = cleanName ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1) : `Certificate ${i + 1}`;

        // Compress and save physical WebP file to public/storage/TK/cerdificate/
        const result = await compressAndConvertToWebP(file, "cerdificate", 200);

        newItems.push({
          tempId: Date.now() + i,
          title: formattedTitle,
          platform: bulkPlatform || "Udemy",
          category: bulkCategory || "Course",
          image: result.path,
          imagePath: result.path,
          sizeKB: result.sizeKB,
        });
      } catch (err) {
        console.error("Bulk processing error for file:", file.name, err);
      }
    }

    setBulkItems((prev) => [...prev, ...newItems]);
    setIsProcessingBulk(false);
  };

  // Remove single item from bulk queue
  const removeBulkItem = (tempId) => {
    setBulkItems((prev) => prev.filter((item) => item.tempId !== tempId));
  };

  // Update item details inside bulk queue
  const updateBulkItem = (tempId, field, value) => {
    setBulkItems((prev) =>
      prev.map((item) => (item.tempId === tempId ? { ...item, [field]: value } : item))
    );
  };

  // Apply category to all queued bulk items
  const applyCategoryToAll = (newCat) => {
    setBulkCategory(newCat);
    setBulkItems((prev) => prev.map((item) => ({ ...item, category: newCat })));
  };

  // Save all queued bulk certificates
  const handleBulkSubmit = (e) => {
    e.preventDefault();
    if (!bulkItems.length) return;

    const payloadArray = bulkItems.map(({ title, platform, category, image }) => ({
      title,
      platform,
      category,
      image,
    }));

    addMultipleCertificates(payloadArray);
    setIsBulkModalOpen(false);
    setBulkItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <HiOutlineSparkles className="h-5 w-5 text-cyan-400" /> Manage Certificates
          </h2>
          <p className="text-xs text-slate-400">Add, bulk upload, edit, or delete certificates and credentials</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openBulkModal}
            className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2.5 text-xs font-semibold text-violet-300 shadow-lg hover:bg-violet-500/20 active:scale-95 transition"
          >
            <HiOutlineArrowUpTray className="h-4 w-4 text-violet-400" /> One-Time Bulk Upload
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90 active:scale-95"
          >
            <HiOutlinePlus className="h-4 w-4" /> Add Certificate
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-white/10 bg-slate-800/40 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-5 py-3.5">Title</th>
              <th className="px-5 py-3.5">Platform</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Image Storage Path</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {certificates.map((cert) => (
              <tr key={cert.id} className="transition hover:bg-white/[0.02]">
                <td className="px-5 py-4 font-medium text-white">{cert.title}</td>
                <td className="px-5 py-4 text-slate-300">{cert.platform}</td>
                <td className="px-5 py-4">
                  <span className="rounded-md bg-violet-500/20 px-2.5 py-1 text-[11px] text-violet-300">
                    {cert.category}
                  </span>
                </td>
                <td className="px-5 py-4 font-mono text-[11px] text-slate-400">
                  {cert.image}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(cert)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                      title="Edit"
                    >
                      <HiOutlinePencilSquare className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
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

      {/* Single Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 text-slate-100 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold">
                {editingId ? "Edit Certificate" : "Add New Certificate"}
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
                <label className="mb-1 block font-semibold text-slate-400">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="e.g. Full Stack Web Development"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Platform / Organization</label>
                <input
                  type="text"
                  required
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="e.g. Udemy, CodeXp, WaySpire"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                >
                  <option value="Course">Course</option>
                  <option value="Internship">Internship</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Certification">Certification</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Direct Image Upload (WebP Auto-Compress &le; 200KB)</label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 cursor-pointer transition">
                      Upload Certificate Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            try {
                              const result = await compressAndConvertToWebP(file, "cerdificate", 200);
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
                    placeholder="e.g. public/storage/TK/cerdificate/2026-08-11-103106.webp"
                  />
                </div>
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
                  {editingId ? "Save Changes" : "Create Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ONE-TIME BULK MULTI-UPLOAD MODAL */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl my-8 rounded-3xl border border-violet-500/30 bg-slate-950 p-6 text-slate-100 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 text-violet-300">
                  <HiOutlineArrowUpTray className="h-5 w-5 text-violet-400" /> One-Time Bulk Multi-Upload
                </h3>
                <p className="text-xs text-slate-400 mt-1">Select multiple certificate files at once to auto-compress and add to your portfolio</p>
              </div>
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Batch Defaults */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block font-semibold text-slate-300">Default Category for Batch</label>
                  <select
                    value={bulkCategory}
                    onChange={(e) => applyCategoryToAll(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-800 p-2.5 text-white outline-none focus:border-violet-500"
                  >
                    <option value="Course">Course</option>
                    <option value="Internship">Internship</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Certification">Certification</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-slate-300">Default Platform / Organization</label>
                  <input
                    type="text"
                    value={bulkPlatform}
                    onChange={(e) => {
                      setBulkPlatform(e.target.value);
                      setBulkItems((prev) => prev.map((item) => ({ ...item, platform: e.target.value })));
                    }}
                    className="w-full rounded-xl border border-white/10 bg-slate-800 p-2.5 text-white outline-none focus:border-violet-500"
                    placeholder="e.g. Udemy, Great Learning, Simplilearn"
                  />
                </div>
              </div>

              {/* Multi-File Upload Drop Area */}
              <div className="rounded-2xl border-2 border-dashed border-violet-500/40 bg-violet-950/20 p-6 text-center space-y-3">
                <HiOutlineArrowUpTray className="h-8 w-8 text-violet-400 mx-auto animate-bounce" />
                <div>
                  <p className="font-semibold text-sm text-slate-200">Select Multiple Certificate Image Files</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Upload 5, 10, or 20 images at once. Files auto-convert to WebP &le; 200KB and save to public/storage/TK/cerdificate/</p>
                </div>
                <label className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-2.5 text-xs font-semibold text-white cursor-pointer shadow-lg hover:opacity-90 transition">
                  Browse Files (Multi-Select)
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleBulkFileSelection}
                    className="hidden"
                  />
                </label>
                {isProcessingBulk && (
                  <div className="text-xs text-violet-400 font-semibold animate-pulse pt-2">
                    Auto-compressing images & saving to disk... Please wait...
                  </div>
                )}
              </div>

              {/* Uploaded Items Queue */}
              {bulkItems.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-200">Batch Certificates Queue ({bulkItems.length} items ready)</h4>
                    <button
                      type="button"
                      onClick={() => setBulkItems([])}
                      className="text-[11px] text-red-400 hover:underline"
                    >
                      Clear Queue
                    </button>
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-2.5 pr-2">
                    {bulkItems.map((item) => (
                      <div
                        key={item.tempId}
                        className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-3"
                      >
                        <img
                          src={resolveImagePath(item.image)}
                          alt="Cert Preview"
                          className="h-14 w-20 rounded-xl object-cover shrink-0 border border-white/10"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full text-xs">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateBulkItem(item.tempId, "title", e.target.value)}
                            className="rounded-lg border border-white/10 bg-slate-800 p-2 text-white outline-none focus:border-violet-500"
                            placeholder="Certificate Title"
                          />
                          <input
                            type="text"
                            value={item.platform}
                            onChange={(e) => updateBulkItem(item.tempId, "platform", e.target.value)}
                            className="rounded-lg border border-white/10 bg-slate-800 p-2 text-white outline-none focus:border-violet-500"
                            placeholder="Platform"
                          />
                          <select
                            value={item.category}
                            onChange={(e) => updateBulkItem(item.tempId, "category", e.target.value)}
                            className="rounded-lg border border-white/10 bg-slate-800 p-2 text-white outline-none focus:border-violet-500"
                          >
                            <option value="Course">Course</option>
                            <option value="Internship">Internship</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Certification">Certification</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeBulkItem(item.tempId)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-500/20 hover:text-red-400"
                          title="Remove item"
                        >
                          <HiOutlineTrash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsBulkModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-slate-400 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBulkSubmit}
                  disabled={!bulkItems.length}
                  className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-2.5 font-semibold text-white transition ${
                    !bulkItems.length ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 shadow-lg shadow-cyan-500/20"
                  }`}
                >
                  <HiOutlineCheck className="h-4 w-4" /> Save All ({bulkItems.length}) Certificates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesTab;
