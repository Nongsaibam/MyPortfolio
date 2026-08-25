import React, { useState } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import {
  HiOutlineGlobeAlt,
  HiOutlineCheck,
  HiOutlinePhoto,
  HiOutlineMagnifyingGlass,
  HiOutlineShieldCheck,
  HiOutlineCloudArrowUp,
} from "react-icons/hi2";
import { compressAndConvertToWebP, resolveImagePath } from "../../utils/imageCompressor";

const SeoSettingsTab = () => {
  const { siteSettings, updateSiteSettings } = usePortfolioData();
  const currentSeo = siteSettings.seoSettings || {};

  const [formData, setFormData] = useState({
    metaTitle: currentSeo.metaTitle || `${siteSettings.name || "Nongsaibam Tazkhan"} | Full Stack & AI Developer Portfolio`,
    metaDescription: currentSeo.metaDescription || "Explore Nongsaibam Tazkhan's portfolio featuring full-stack web applications, AI projects, certifications, and developer experience.",
    metaKeywords: currentSeo.metaKeywords || "Nongsaibam Tazkhan, Tazkhan, Full Stack Developer, React, Node.js, Python, AI Developer, Web Development, Portfolio",
    authorName: currentSeo.authorName || siteSettings.name || "Nongsaibam Tazkhan",
    siteUrl: currentSeo.siteUrl || "https://tazkhan.dev",
    ogImage: currentSeo.ogImage || siteSettings.profileImage || "",
    allowIndexing: currentSeo.allowIndexing !== false,
  });

  const [savedMsg, setSavedMsg] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);

  const handleOgUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsCompressing(true);
        const result = await compressAndConvertToWebP(file, "profile", 200);
        setFormData((prev) => ({
          ...prev,
          ogImage: result.path,
        }));
      } catch (err) {
        console.error("OG Image upload error:", err);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSiteSettings({
      ...siteSettings,
      seoSettings: formData,
    });
    setSavedMsg("SEO Settings & Social Sharing Card updated successfully!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  return (
    <div className="space-y-6 text-xs text-slate-300">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <HiOutlineGlobeAlt className="h-5 w-5 text-cyan-400" /> Search Engine Optimization (SEO) & Social Sharing Controls
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Customize search engine meta titles, descriptions, Google Rich Snippets, Open Graph cards, and indexing rules.
        </p>
      </div>

      {savedMsg && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-400 text-center animate-fade-up">
          {savedMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Google Search Result Preview Card */}
        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6 backdrop-blur-md space-y-3">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
            <HiOutlineMagnifyingGlass className="h-4 w-4 text-cyan-400" /> Live Google Search Result Preview
          </h3>
          <div className="rounded-xl border border-white/10 bg-slate-950 p-4 font-sans space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span className="text-emerald-400 font-semibold">{formData.siteUrl || "https://tazkhan.dev"}</span>
              <span>&rsaquo; portfolio</span>
            </div>
            <h4 className="text-base font-bold text-blue-400 hover:underline cursor-pointer leading-snug">
              {formData.metaTitle || "Nongsaibam Tazkhan | Portfolio"}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {formData.metaDescription || "Full stack developer portfolio..."}
            </p>
          </div>
        </div>

        {/* Main SEO Input Fields */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
            Meta Tags & Keywords
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-400">Meta Title (Search Heading)</label>
              <input
                type="text"
                required
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="Nongsaibam Tazkhan | Full Stack Developer Portfolio"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">Author Name</label>
              <input
                type="text"
                required
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="Nongsaibam Tazkhan"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-400">Meta Description (Google Snippet)</label>
            <textarea
              rows={3}
              required
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
              placeholder="150-160 character concise summary displayed on search engines"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-400">Meta Keywords (Comma Separated)</label>
            <input
              type="text"
              value={formData.metaKeywords}
              onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
              placeholder="React, Python, Node.js, Full Stack, Tazkhan, Portfolio"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-400">Primary Website Domain URL</label>
            <input
              type="text"
              value={formData.siteUrl}
              onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
              placeholder="https://tazkhan.dev"
            />
          </div>
        </div>

        {/* Social Sharing Open Graph Image */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
            <HiOutlinePhoto className="h-4 w-4 text-violet-400" /> Open Graph & Twitter Social Card Image
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={resolveImagePath(formData.ogImage, "/vite.svg")}
              alt="OG Preview"
              className="h-28 w-44 rounded-xl border border-white/10 object-cover shrink-0 shadow-md"
            />

            <div className="space-y-3 flex-1 w-full">
              <div>
                <label className="mb-1 block font-semibold text-slate-400">Upload Social Banner Image</label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 cursor-pointer transition">
                    <HiOutlineCloudArrowUp className="h-4 w-4" /> Upload Banner File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleOgUpload}
                      className="hidden"
                    />
                  </label>
                  {isCompressing && (
                    <span className="text-xs text-violet-400 font-semibold animate-pulse">Compressing OG Image...</span>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Or Paste Image URL / Path</label>
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="public/storage/TK/profile/2026-08-25-220700.webp"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Indexing Rules */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-3">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
            <HiOutlineShieldCheck className="h-4 w-4 text-emerald-400" /> Search Engine Indexing Control
          </h3>

          <div className="flex items-center gap-3 pt-1">
            <input
              type="checkbox"
              id="allowIndexing"
              checked={formData.allowIndexing}
              onChange={(e) => setFormData({ ...formData, allowIndexing: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
            />
            <label htmlFor="allowIndexing" className="font-semibold text-slate-200">
              Allow Search Engines to Index Website (<code className="text-emerald-400">index, follow</code>)
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 active:scale-95 transition"
          >
            <HiOutlineCheck className="h-4 w-4" /> Save SEO Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeoSettingsTab;
