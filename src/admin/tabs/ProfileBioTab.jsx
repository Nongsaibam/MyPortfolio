import React, { useState } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import { HiOutlineUser, HiOutlineCheck, HiOutlinePhoto, HiOutlineArrowPath, HiOutlineCloudArrowUp } from "react-icons/hi2";
import defaultTkImage from "../../assets/1736923031405.jpg";

import { compressAndConvertToWebP, resolveImagePath } from "../../utils/imageCompressor";

const ProfileBioTab = () => {
  const { siteSettings, updateSiteSettings } = usePortfolioData();
  const [formData, setFormData] = useState({
    logoText: siteSettings.logoText || "TK",
    name: siteSettings.name || "",
    greetingText: siteSettings.greetingText || "Hi, I'm ",
    title: siteSettings.title || "",
    bio: siteSettings.bio || "",
    profileImage: siteSettings.profileImage || "",
    profileImagePath: siteSettings.profileImagePath || "",
    profileImageSizeKB: siteSettings.profileImageSizeKB || null,
    favicon: siteSettings.favicon || "/vite.svg",
    faviconPath: siteSettings.faviconPath || "",
    faviconSizeKB: siteSettings.faviconSizeKB || null,
    primaryBtnText: siteSettings.primaryBtnText || "Explore Projects",
    resumeLink: siteSettings.resumeLink || "/resume.pdf",
    githubLink: siteSettings.githubLink || "",
    linkedinLink: siteSettings.linkedinLink || "",
    twitterLink: siteSettings.twitterLink || "",
    email: siteSettings.email || "",
    heroJobBadge: siteSettings.heroJobBadge || {
      showBadge: true,
      roleText: "Junior Developer at",
      companyName: "LMP Technology",
      badgeTag: "Present 🚀",
    },
    enableRunningGradientText: siteSettings.enableRunningGradientText !== false,
    runningGradientColors: siteSettings.runningGradientColors || {
      color1: "#38bdf8",
      color2: "#818cf8",
      color3: "#c084fc",
      color4: "#f472b6",
    },
  });

  const [savedMsg, setSavedMsg] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [isFaviconCompressing, setIsFaviconCompressing] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsCompressing(true);
        const result = await compressAndConvertToWebP(file, "profile", 200);
        setFormData((prev) => ({
          ...prev,
          profileImage: result.path,
          profileImagePath: result.path,
          profileImageSizeKB: result.sizeKB,
        }));
      } catch (err) {
        console.error("Compression error:", err);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleFaviconUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsFaviconCompressing(true);
        const result = await compressAndConvertToWebP(file, "favicon", 100);
        setFormData((prev) => ({
          ...prev,
          favicon: result.path,
          faviconPath: result.path,
          faviconSizeKB: result.sizeKB,
        }));
      } catch (err) {
        console.error("Favicon upload error:", err);
      } finally {
        setIsFaviconCompressing(false);
      }
    }
  };

  const handleResetImage = () => {
    setFormData((prev) => ({
      ...prev,
      profileImage: "",
      profileImagePath: "",
      profileImageSizeKB: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSiteSettings(formData);
    setSavedMsg("Profile, Favicon & Hero section updated successfully!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <HiOutlineUser className="h-5 w-5 text-cyan-400" /> Profile, Favicon & Hero Section Controls
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Change website favicon icon, profile photo, headline name, logo branding, taglines, hero bio text, and social links.
        </p>
      </div>

      {savedMsg && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-400 text-center animate-fade-up">
          {savedMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Favicon Image Controller Section */}
        <div className="rounded-2xl border border-violet-500/20 bg-slate-900/60 p-6 backdrop-blur-md space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
            <HiOutlinePhoto className="h-4 w-4 text-violet-400" /> Website Favicon Controller
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Live Favicon Preview */}
            <div className="relative shrink-0 flex flex-col items-center gap-1.5">
              <div className="h-28 w-28 rounded-2xl border-2 border-violet-500/50 bg-slate-950/90 p-4 flex items-center justify-center shadow-xl shadow-violet-500/20 transition hover:scale-105">
                <img
                  src={resolveImagePath(formData.favicon, "/vite.svg")}
                  alt="Favicon Preview"
                  className="h-20 w-20 object-contain drop-shadow-md"
                />
              </div>
              <span className="text-[11px] text-violet-300 font-mono font-semibold">Favicon Icon</span>
            </div>

            {/* Favicon Controls */}
            <div className="space-y-3 flex-1 w-full">
              <div>
                <label className="mb-1 block font-semibold text-slate-400">Upload New Favicon Image</label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 cursor-pointer transition">
                    <HiOutlineCloudArrowUp className="h-4 w-4" /> Upload Favicon File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFaviconUpload}
                      className="hidden"
                    />
                  </label>
                  {isFaviconCompressing && (
                    <span className="text-xs text-violet-400 font-semibold animate-pulse">Saving Favicon to public/storage/TK/favicon...</span>
                  )}
                </div>
              </div>

              {formData.faviconPath && (
                <div className="rounded-xl border border-violet-500/20 bg-violet-950/40 p-2.5 text-[11px] font-mono text-violet-300 space-y-1">
                  <div><span className="text-slate-400 font-sans">Storage Path:</span> {formData.faviconPath}</div>
                  {formData.faviconSizeKB && (
                    <div><span className="text-slate-400 font-sans">Compressed Size:</span> <span className="text-emerald-400 font-bold">{formData.faviconSizeKB} KB</span> (WebP &le; 100KB)</div>
                  )}
                </div>
              )}

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Or Paste Favicon URL / Asset Path</label>
                <input
                  type="text"
                  value={formData.favicon}
                  onChange={(e) => setFormData({ ...formData, favicon: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-violet-500"
                  placeholder="e.g. public/storage/TK/favicon/2026-08-25-222600.webp or /vite.svg"
                />
              </div>

              {formData.favicon && formData.favicon !== "/vite.svg" && (
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, favicon: "/vite.svg", faviconPath: "", faviconSizeKB: null }))}
                  className="inline-flex items-center gap-1 text-[11px] text-amber-400/80 hover:text-amber-300 transition"
                >
                  <HiOutlineArrowPath className="h-3.5 w-3.5" /> Reset to Default Favicon (/vite.svg)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Photo Change Section */}
        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6 backdrop-blur-md space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
            <HiOutlinePhoto className="h-4 w-4 text-cyan-400" /> Profile Photo / Avatar Image
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Live Image Preview */}
            <div className="relative shrink-0">
              <img
                src={resolveImagePath(formData.profileImage, defaultTkImage)}
                alt="Profile Preview"
                className="h-28 w-28 rounded-full border-2 border-cyan-500/40 object-cover shadow-lg shadow-cyan-500/10"
              />
              <span className="absolute bottom-0 right-0 rounded-full bg-cyan-500 p-1.5 text-white shadow-md">
                <HiOutlineCheck className="h-3 w-3" />
              </span>
            </div>

            {/* Controls */}
            <div className="space-y-3 flex-1 w-full">
              <div>
                <label className="mb-1 block font-semibold text-slate-400">Direct Upload & WebP Auto-Compress (Max 200KB)</label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 cursor-pointer transition">
                    <HiOutlineCloudArrowUp className="h-4 w-4" /> Upload Photo File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {isCompressing && (
                    <span className="text-xs text-cyan-400 font-semibold animate-pulse">Converting to WebP & Compressing &le; 200KB...</span>
                  )}
                </div>
              </div>

              {formData.profileImagePath && (
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/40 p-3 text-[11px] font-mono text-cyan-300 space-y-1">
                  <div><span className="text-slate-400 font-sans">Storage Path:</span> {formData.profileImagePath}</div>
                  {formData.profileImageSizeKB && (
                    <div><span className="text-slate-400 font-sans">Compressed Size:</span> <span className="text-emerald-400 font-bold">{formData.profileImageSizeKB} KB</span> (WebP &le; 200KB)</div>
                  )}
                </div>
              )}

              <div>
                <label className="mb-1 block font-semibold text-slate-400">Or Paste Image URL</label>
                <input
                  type="text"
                  value={formData.profileImage}
                  onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                  placeholder="https://images.unsplash.com/... or base64 data URL"
                />
              </div>

              {formData.profileImage && (
                <button
                  type="button"
                  onClick={handleResetImage}
                  className="inline-flex items-center gap-1 text-[11px] text-amber-400/80 hover:text-amber-300 transition"
                >
                  <HiOutlineArrowPath className="h-3.5 w-3.5" /> Reset to Default Photo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Branding & Name */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
            Branding & Headline
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-400">Logo Text / Initials</label>
              <input
                type="text"
                required
                value={formData.logoText}
                onChange={(e) => setFormData({ ...formData, logoText: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="e.g. TK"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="e.g. Nongsaibam Tazkhan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-400">Greeting Text</label>
              <input
                type="text"
                value={formData.greetingText}
                onChange={(e) => setFormData({ ...formData, greetingText: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="e.g. Hi, I'm "
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">Hero Main Title / Tagline</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="e.g. Full Stack Developer..."
              />
            </div>
          </div>

          {/* Running Gradient Color Text Toggle & Color Customizer */}
          <div className="rounded-xl border border-violet-500/30 bg-slate-800/60 p-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="enableRunningGradientText"
                checked={formData.enableRunningGradientText !== false}
                onChange={(e) => setFormData({ ...formData, enableRunningGradientText: e.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-slate-800 text-cyan-400 focus:ring-cyan-500 cursor-pointer"
              />
              <label htmlFor="enableRunningGradientText" className="text-xs font-semibold text-cyan-300 cursor-pointer">
                ✨ Enable Animated Running Gradient Color Text on Name (Nongsaibam Tazkhan)
              </label>
            </div>

            {formData.enableRunningGradientText !== false && (
              <div className="pt-2 border-t border-white/10">
                <label className="mb-2 block font-semibold text-slate-400 text-xs">
                  Customize 4 Running Gradient Colors:
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { key: "color1", label: "Color 1 (Cyan)", default: "#38bdf8" },
                    { key: "color2", label: "Color 2 (Indigo)", default: "#818cf8" },
                    { key: "color3", label: "Color 3 (Purple)", default: "#c084fc" },
                    { key: "color4", label: "Color 4 (Pink)", default: "#f472b6" },
                  ].map(({ key, label, default: defVal }) => (
                    <div key={key} className="space-y-1">
                      <span className="block text-[10px] text-slate-400">{label}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={formData.runningGradientColors?.[key] || defVal}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              runningGradientColors: {
                                ...formData.runningGradientColors,
                                [key]: e.target.value,
                              },
                            })
                          }
                          className="h-8 w-8 rounded-lg cursor-pointer border border-white/20 bg-transparent p-0"
                        />
                        <input
                          type="text"
                          value={formData.runningGradientColors?.[key] || defVal}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              runningGradientColors: {
                                ...formData.runningGradientColors,
                                [key]: e.target.value,
                              },
                            })
                          }
                          className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-1.5 text-xs text-white font-mono outline-none focus:border-cyan-500"
                          placeholder="#hex"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-400">Hero Bio Paragraph</label>
            <textarea
              rows={3}
              required
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
              placeholder="Short bio summary displayed under main headline"
            />
          </div>
        </div>

        {/* Live Hero Job Announcement Badge Controls */}
        <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6 backdrop-blur-md space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center justify-between">
            <span>Live Hero Job Announcement Badge Controls 🚀</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.heroJobBadge?.showBadge !== false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    heroJobBadge: { ...formData.heroJobBadge, showBadge: e.target.checked },
                  })
                }
                className="h-4 w-4 rounded border-white/20 bg-slate-800 text-emerald-500"
              />
              <span className="text-xs text-emerald-400 font-semibold">Enable Live Badge</span>
            </label>
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block font-semibold text-slate-400">Role Text Prefix</label>
              <input
                type="text"
                value={formData.heroJobBadge?.roleText || "Junior Developer at"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    heroJobBadge: { ...formData.heroJobBadge, roleText: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="e.g. Junior Developer at"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">Company Name</label>
              <input
                type="text"
                value={formData.heroJobBadge?.companyName || "LMP Technology"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    heroJobBadge: { ...formData.heroJobBadge, companyName: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="e.g. LMP Technology"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">Badge Tag Label</label>
              <input
                type="text"
                value={formData.heroJobBadge?.badgeTag || "Present 🚀"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    heroJobBadge: { ...formData.heroJobBadge, badgeTag: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="e.g. Present 🚀"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons & Links */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
            Actions & Social Links
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-400">Primary Button Label</label>
              <input
                type="text"
                value={formData.primaryBtnText}
                onChange={(e) => setFormData({ ...formData, primaryBtnText: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="e.g. Explore Projects"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">Resume File URL / Link</label>
              <input
                type="text"
                value={formData.resumeLink}
                onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="e.g. /resume.pdf"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-400">GitHub Profile Link</label>
              <input
                type="text"
                value={formData.githubLink}
                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">LinkedIn Profile Link</label>
              <input
                type="text"
                value={formData.linkedinLink}
                onChange={(e) => setFormData({ ...formData, linkedinLink: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-400">Twitter / X Link</label>
              <input
                type="text"
                value={formData.twitterLink}
                onChange={(e) => setFormData({ ...formData, twitterLink: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="https://twitter.com/..."
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">Contact Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="nongsaibamtazkhan@gmail.com"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 active:scale-95 transition"
          >
            <HiOutlineCheck className="h-4 w-4" /> Save Profile & Favicon Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileBioTab;
