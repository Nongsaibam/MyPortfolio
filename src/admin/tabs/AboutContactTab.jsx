import React, { useState } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import { HiOutlineDocumentText, HiOutlineCheck, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";

const AboutContactTab = () => {
  const { siteSettings, updateSiteSettings } = usePortfolioData();

  const [aboutTitle, setAboutTitle] = useState(siteSettings.aboutTitle || "About Me");
  const [aboutSectionNumber, setAboutSectionNumber] = useState(siteSettings.aboutSectionNumber || "01");
  const [paragraphsText, setParagraphsText] = useState(
    Array.isArray(siteSettings.aboutParagraphs)
      ? siteSettings.aboutParagraphs.join("\n\n")
      : siteSettings.aboutParagraphs || ""
  );

  const [stats, setStats] = useState(siteSettings.stats || []);

  const [contactNumber, setContactNumber] = useState(siteSettings.contactNumber || "06");
  const [contactTitle, setContactTitle] = useState(siteSettings.contactTitle || "Get In Touch");
  const [contactSubtitle, setContactSubtitle] = useState(siteSettings.contactSubtitle || "");
  const [contactBtnText, setContactBtnText] = useState(siteSettings.contactBtnText || "Say Hello 👋");
  const [footerText, setFooterText] = useState(siteSettings.footerText || "");
  const [footerSubtext, setFooterSubtext] = useState(siteSettings.footerSubtext || "");

  const [savedMsg, setSavedMsg] = useState("");

  const handleStatChange = (index, field, value) => {
    const updated = [...stats];
    updated[index][field] = value;
    setStats(updated);
  };

  const addStat = () => {
    setStats([...stats, { value: "10+", label: "New Metric" }]);
  };

  const removeStat = (index) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const paragraphsArray = paragraphsText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    updateSiteSettings({
      aboutTitle,
      aboutSectionNumber,
      aboutParagraphs: paragraphsArray,
      stats,
      contactNumber,
      contactTitle,
      contactSubtitle,
      contactBtnText,
      footerText,
      footerSubtext,
    });

    setSavedMsg("About & Contact content updated successfully!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <HiOutlineDocumentText className="h-5 w-5 text-cyan-400" /> About & Contact Section Controls
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Dynamically manage your About Me paragraphs, stat counters, and Contact section copy.
        </p>
      </div>

      {savedMsg && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-400 text-center animate-fade-up">
          {savedMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* About Section */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
            About Me Section
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-400">Section Title</label>
              <input
                type="text"
                required
                value={aboutTitle}
                onChange={(e) => setAboutTitle(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="About Me"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">Section Number Tag</label>
              <input
                type="text"
                value={aboutSectionNumber}
                onChange={(e) => setAboutSectionNumber(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500 font-mono"
                placeholder="01"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-400">
              About Paragraphs (Separate paragraphs with double enter)
            </label>
            <textarea
              rows={6}
              required
              value={paragraphsText}
              onChange={(e) => setParagraphsText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-3 text-white outline-none focus:border-cyan-500 leading-relaxed"
              placeholder="Paragraph 1...&#10;&#10;Paragraph 2..."
            />
          </div>

          {/* Stats Counter Management */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300">Stats Counters</label>
              <button
                type="button"
                onClick={addStat}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:underline"
              >
                <HiOutlinePlus /> Add Stat Card
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stats.map((st, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/50 p-2.5">
                  <input
                    type="text"
                    value={st.value}
                    onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                    className="w-20 rounded-lg border border-white/10 bg-slate-900 p-1.5 text-center font-bold text-cyan-300 outline-none"
                    placeholder="e.g. 8+"
                  />
                  <input
                    type="text"
                    value={st.label}
                    onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                    className="flex-1 rounded-lg border border-white/10 bg-slate-900 p-1.5 text-slate-200 outline-none"
                    placeholder="e.g. Months Experience"
                  />
                  <button
                    type="button"
                    onClick={() => removeStat(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-400"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Footer Section */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
            Contact & Footer Section
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-400">Contact Headline</label>
              <input
                type="text"
                required
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="Get In Touch"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">Contact Number Tag</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500 font-mono"
                placeholder="06"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-400">Contact Subtitle Text</label>
            <textarea
              rows={2}
              value={contactSubtitle}
              onChange={(e) => setContactSubtitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
              placeholder="I’m actively seeking new opportunities..."
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-400">Button Label</label>
            <input
              type="text"
              value={contactBtnText}
              onChange={(e) => setContactBtnText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
              placeholder="Say Hello 👋"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-400">Footer Primary Line</label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="Designed & Built by..."
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-400">Footer Secondary Subtext</label>
              <input
                type="text"
                value={footerSubtext}
                onChange={(e) => setFooterSubtext(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 p-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="Crafted with React..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 active:scale-95 transition"
          >
            <HiOutlineCheck className="h-4 w-4" /> Save Content Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutContactTab;
