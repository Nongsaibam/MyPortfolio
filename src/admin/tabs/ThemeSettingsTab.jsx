import React, { useState } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import { useTheme } from "../../context/ThemeContext";
import { HiOutlineSparkles, HiOutlineCheck, HiOutlinePaintBrush, HiOutlineSwatch, HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const fontOptions = [
  { name: "Poppins", family: "Poppins", description: "Modern, geometric, clean & friendly" },
  { name: "Inter", family: "Inter", description: "Crisp, popular UI font for digital products" },
  { name: "Outfit", family: "Outfit", description: "Sleek, luxury tech & designer aesthetic" },
  { name: "Roboto", family: "Roboto", description: "Classic, highly legible sans-serif" },
  { name: "Plus Jakarta Sans", family: "Plus Jakarta Sans", description: "Fresh, premium startup & modern feel" },
  { name: "Space Grotesk", family: "Space Grotesk", description: "Tech-focused, futuristic & punchy" },
  { name: "JetBrains Mono", family: "JetBrains Mono", description: "Developer monospace theme font" },
];

const colorPresets = [
  { id: "violet-cyan", name: "Violet & Cyan", fromHex: "#8b5cf6", toHex: "#06b6d4", label: "Electric HD" },
  { id: "emerald-teal", name: "Emerald & Teal", fromHex: "#10b981", toHex: "#2dd4bf", label: "Nature Mint HD" },
  { id: "rose-amber", name: "Rose & Amber", fromHex: "#f43f5e", toHex: "#fbbf24", label: "Sunset Glow HD" },
  { id: "fuchsia-purple", name: "Fuchsia & Purple", fromHex: "#d946ef", toHex: "#9333ea", label: "Neon Cyber HD" },
  { id: "indigo-sky", name: "Indigo & Sky", fromHex: "#6366f1", toHex: "#38bdf8", label: "Ocean Sky HD" },
];

const darkBgPresets = [
  { id: "default-obsidian", name: "Obsidian Slate", fromHex: "#030712", toHex: "#0b1329", label: "Dark Classic" },
  { id: "midnight-cyber", name: "Midnight Cyber", fromHex: "#0f051d", toHex: "#1e0b36", label: "Deep Purple Cyber" },
  { id: "emerald-forest", name: "Emerald Forest", fromHex: "#022417", toHex: "#053b27", label: "Deep Emerald Dark" },
  { id: "navy-dark", name: "Classic Navy", fromHex: "#040d21", toHex: "#0f172a", label: "Dark Blue Slate" },
];

const lightBgPresets = [
  { id: "clean-studio", name: "Clean Studio", fromHex: "#ffffff", toHex: "#e2e8f0", label: "Light Blue Crisp" },
  { id: "warm-sunset", name: "Warm Sunset", fromHex: "#fff7ed", toHex: "#ffedd5", label: "Warm Cream Light" },
  { id: "soft-sky", name: "Soft Sky", fromHex: "#f0f9ff", toHex: "#e0f2fe", label: "Soft Ice Blue" },
  { id: "rose-blush", name: "Rose Blush", fromHex: "#fff1f2", toHex: "#ffe4e6", label: "Rose Blush Light" },
];

const ThemeSettingsTab = () => {
  const { siteSettings, updateSiteSettings } = usePortfolioData();
  const { isDarkMode, toggleTheme } = useTheme();
  const [successMsg, setSuccessMsg] = useState("");

  const handleFontChange = (fontFamily) => {
    updateSiteSettings({ fontFamily });
    showSuccess(`Font style updated to ${fontFamily}!`);
  };

  const handlePresetChange = (preset) => {
    updateSiteSettings({
      gradientPreset: preset.id,
      customFrom: preset.fromHex,
      customTo: preset.toHex,
    });
    showSuccess(`Accent color theme updated to ${preset.name}!`);
  };

  const handleDarkBgPresetChange = (preset) => {
    updateSiteSettings({
      darkBgPreset: preset.id,
      customDarkBgFrom: preset.fromHex,
      customDarkBgTo: preset.toHex,
    });
    showSuccess(`Dark Mode background theme updated to ${preset.name}!`);
  };

  const handleLightBgPresetChange = (preset) => {
    updateSiteSettings({
      lightBgPreset: preset.id,
      customLightBgFrom: preset.fromHex,
      customLightBgTo: preset.toHex,
    });
    showSuccess(`Light Mode background theme updated to ${preset.name}!`);
  };

  const handleCustomDarkBgFrom = (e) => {
    updateSiteSettings({ darkBgPreset: "custom", customDarkBgFrom: e.target.value });
  };

  const handleCustomDarkBgTo = (e) => {
    updateSiteSettings({ darkBgPreset: "custom", customDarkBgTo: e.target.value });
  };

  const handleCustomLightBgFrom = (e) => {
    updateSiteSettings({ lightBgPreset: "custom", customLightBgFrom: e.target.value });
  };

  const handleCustomLightBgTo = (e) => {
    updateSiteSettings({ lightBgPreset: "custom", customLightBgTo: e.target.value });
  };

  const handleCustomAccentFrom = (e) => {
    updateSiteSettings({ gradientPreset: "custom", customFrom: e.target.value });
  };

  const handleCustomAccentTo = (e) => {
    updateSiteSettings({ gradientPreset: "custom", customTo: e.target.value });
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const currentPreset = colorPresets.find((p) => p.id === siteSettings.gradientPreset) || {
    name: "Custom Palette",
    fromHex: siteSettings.customFrom || "#8b5cf6",
    toHex: siteSettings.customTo || "#06b6d4",
  };

  return (
    <div className="space-y-8">
      <div>
      </div>

      {successMsg && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-400 text-center animate-fade-up">
          {successMsg}
        </div>
      )}

      {/* Mode Switcher */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              {isDarkMode ? <HiOutlineMoon className="text-violet-400" /> : <HiOutlineSun className="text-amber-400" />}
              Active Theme Mode: {isDarkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Toggle theme mode to preview and customize Dark vs Light appearance live</p>
          </div>
          <button
            onClick={toggleTheme}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-md hover:opacity-90 transition"
          >
            Switch to {isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>
        </div>
      </div>

      {/* Dark Mode Background Themes */}
      <div className="rounded-2xl border border-violet-500/20 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HiOutlineMoon className="text-violet-400" /> Dark Mode Background Themes
            </h3>
            <p className="text-xs text-slate-400">Applied when Dark Mode is active</p>
          </div>
          <HiOutlineSwatch className="h-5 w-5 text-violet-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {darkBgPresets.map((preset) => {
            const isSelected = siteSettings.darkBgPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleDarkBgPresetChange(preset)}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${isSelected
                  ? "border-violet-500 bg-violet-500/10 text-white shadow-lg shadow-violet-500/10"
                  : "border-white/10 bg-slate-800/40 text-slate-300 hover:border-white/20 hover:bg-slate-800/70"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-xl border border-white/20 shadow-md"
                    style={{ background: `linear-gradient(135deg, ${preset.fromHex}, ${preset.toHex})` }}
                  />
                  <div>
                    <div className="font-bold text-xs">{preset.name}</div>
                    <div className="text-[10px] text-slate-400">{preset.label}</div>
                  </div>
                </div>
                {isSelected && <HiOutlineCheck className="h-4 w-4 text-violet-400" />}
              </button>
            );
          })}
        </div>

        {/* Custom Dark Background Picker */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-semibold text-slate-300">Custom Dark Background Color Picker:</div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-slate-400">
              Dark From:
              <input
                type="color"
                value={siteSettings.customDarkBgFrom || "#030712"}
                onChange={handleCustomDarkBgFrom}
                className="h-8 w-8 cursor-pointer rounded border border-white/20 bg-transparent p-0"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-400">
              Dark To:
              <input
                type="color"
                value={siteSettings.customDarkBgTo || "#0b1329"}
                onChange={handleCustomDarkBgTo}
                className="h-8 w-8 cursor-pointer rounded border border-white/20 bg-transparent p-0"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Light Mode Background Themes */}
      <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HiOutlineSun className="text-cyan-400" /> Light Mode Background Themes
            </h3>
            <p className="text-xs text-slate-400">Applied when Light Mode is active</p>
          </div>
          <HiOutlineSwatch className="h-5 w-5 text-cyan-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {lightBgPresets.map((preset) => {
            const isSelected = siteSettings.lightBgPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleLightBgPresetChange(preset)}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${isSelected
                  ? "border-cyan-500 bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/10"
                  : "border-white/10 bg-slate-800/40 text-slate-300 hover:border-white/20 hover:bg-slate-800/70"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-xl border border-white/20 shadow-md"
                    style={{ background: `linear-gradient(135deg, ${preset.fromHex}, ${preset.toHex})` }}
                  />
                  <div>
                    <div className="font-bold text-xs">{preset.name}</div>
                    <div className="text-[10px] text-slate-400">{preset.label}</div>
                  </div>
                </div>
                {isSelected && <HiOutlineCheck className="h-4 w-4 text-cyan-400" />}
              </button>
            );
          })}
        </div>

        {/* Custom Light Background Picker */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-semibold text-slate-300">Custom Light Background Color Picker:</div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-slate-400">
              Light From:
              <input
                type="color"
                value={siteSettings.customLightBgFrom || "#ffffff"}
                onChange={handleCustomLightBgFrom}
                className="h-8 w-8 cursor-pointer rounded border border-white/20 bg-transparent p-0"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-400">
              Light To:
              <input
                type="color"
                value={siteSettings.customLightBgTo || "#e2e8f0"}
                onChange={handleCustomLightBgTo}
                className="h-8 w-8 cursor-pointer rounded border border-white/20 bg-transparent p-0"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Font Family Selection */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white">Typography / Font Style</h3>
          <p className="text-xs text-slate-400">Select a font family for the portfolio interface</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fontOptions.map((font) => {
            const isSelected = siteSettings.fontFamily === font.family;
            return (
              <button
                key={font.family}
                onClick={() => handleFontChange(font.family)}
                style={{ fontFamily: `"${font.family}", sans-serif` }}
                className={`p-4 rounded-2xl border text-left transition relative overflow-hidden ${isSelected
                  ? "border-cyan-500 bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/10"
                  : "border-white/10 bg-slate-800/40 text-slate-300 hover:border-white/20 hover:bg-slate-800/70"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{font.name}</span>
                  {isSelected && <HiOutlineCheck className="h-4 w-4 text-cyan-400" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-normal leading-snug">
                  {font.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Palettes */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white">Accent Gradient Color Palettes (HD High Resolution)</h3>
          <p className="text-xs text-slate-400">Choose the primary gradient color theme across buttons, titles, and highlights</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorPresets.map((preset) => {
            const isSelected = siteSettings.gradientPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handlePresetChange(preset)}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${isSelected
                  ? "border-cyan-500 bg-cyan-500/10 text-white"
                  : "border-white/10 bg-slate-800/40 text-slate-300 hover:border-white/20 hover:bg-slate-800/70"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-xl shadow-md"
                    style={{ background: `linear-gradient(135deg, ${preset.fromHex}, ${preset.toHex})` }}
                  />
                  <div>
                    <div className="font-bold text-xs">{preset.name}</div>
                    <div className="text-[10px] text-slate-400">{preset.label}</div>
                  </div>
                </div>
                {isSelected && <HiOutlineCheck className="h-4 w-4 text-cyan-400" />}
              </button>
            );
          })}
        </div>

        {/* Custom Accent Color Pickers */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-semibold text-slate-300">Custom Accent Gradient Color Picker:</div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-slate-400">
              Primary From:
              <input
                type="color"
                value={siteSettings.customFrom || "#8b5cf6"}
                onChange={handleCustomAccentFrom}
                className="h-8 w-8 cursor-pointer rounded border border-white/20 bg-transparent p-0"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-400">
              Primary To:
              <input
                type="color"
                value={siteSettings.customTo || "#06b6d4"}
                onChange={handleCustomAccentTo}
                className="h-8 w-8 cursor-pointer rounded border border-white/20 bg-transparent p-0"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Live Typography & Theme Preview Card */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-md space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Live Preview ({isDarkMode ? "Dark Mode" : "Light Mode"})
        </h3>
        <div
          style={{
            fontFamily: `"${siteSettings.fontFamily}", sans-serif`,
            background: isDarkMode
              ? "linear-gradient(135deg, var(--bg-dark-from) 0%, var(--bg-dark-to) 100%)"
              : "linear-gradient(135deg, var(--bg-light-from) 0%, var(--bg-light-to) 100%)",
          }}
          className={`rounded-2xl border border-white/10 p-6 space-y-4 shadow-2xl transition-all duration-300 ${isDarkMode ? "text-slate-100" : "text-slate-900"
            }`}
        >
          <div className="flex items-center gap-3">
            <span className="theme-gradient-bg px-3 py-1 text-xs font-bold rounded-full text-white">
              {currentPreset.name} Preset
            </span>
            <span className={`text-xs font-mono ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Font: {siteSettings.fontFamily}
            </span>
          </div>

          <h4 className="theme-gradient-text text-2xl font-bold">
            High Definition (HD) Gradient Heading
          </h4>

          <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
            This live preview demonstrates how your font choice, active theme mode ({isDarkMode ? "Dark" : "Light"}), and HD background & accent gradient color palettes interact together seamlessly.
          </p>

          <button className="theme-gradient-bg inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-md">
            <HiOutlineSparkles /> Sample Call To Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettingsTab;
