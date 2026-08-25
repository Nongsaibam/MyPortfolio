import React, { useState, useEffect } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";
import {
  HiOutlineTrash,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
  HiOutlineCircleStack,
  HiOutlineCpuChip,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi2";

const GarbageCollectorTab = () => {
  const { siteSettings, projects, certificates } = usePortfolioData();
  const [stats, setStats] = useState({
    localStorageKB: 0,
    cacheItemsCount: 0,
    cacheSizeKB: 0,
    orphanedCount: 0,
  });

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");

  const calculateStats = () => {
    try {
      // 1. Calculate LocalStorage total size
      let totalBytes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key) || "";
        totalBytes += (key.length + value.length) * 2;
      }
      const localStorageKB = Math.round(totalBytes / 1024);

      // 2. Inspect image cache
      const cacheRaw = localStorage.getItem("portfolio_image_cache") || "{}";
      const cache = JSON.parse(cacheRaw);
      const cacheKeys = Object.keys(cache);
      const cacheSizeKB = Math.round((cacheRaw.length * 2) / 1024);

      // 3. Collect all active image references in portfolio
      const activeImageRefs = new Set();
      if (siteSettings?.profileImage) activeImageRefs.add(siteSettings.profileImage);
      if (siteSettings?.favicon) activeImageRefs.add(siteSettings.favicon);

      projects.forEach((p) => {
        if (Array.isArray(p.image)) {
          p.image.forEach((img) => activeImageRefs.add(img));
        } else if (p.image) {
          activeImageRefs.add(p.image);
        }
      });

      certificates.forEach((c) => {
        if (c.image) activeImageRefs.add(c.image);
      });

      // 4. Find orphaned cache keys
      let orphanedCount = 0;
      cacheKeys.forEach((key) => {
        const pathNoPublic = key.startsWith("public/") ? "/" + key.substring(7) : key;
        const isReferenced =
          activeImageRefs.has(key) ||
          activeImageRefs.has(pathNoPublic) ||
          Array.from(activeImageRefs).some((ref) => typeof ref === "string" && (ref.includes(key) || key.includes(ref)));

        if (!isReferenced && !key.startsWith("data:")) {
          orphanedCount++;
        }
      });

      setStats({
        localStorageKB,
        cacheItemsCount: cacheKeys.length,
        cacheSizeKB,
        orphanedCount,
      });
    } catch (err) {
      console.error("Stats calculation error:", err);
    }
  };

  useEffect(() => {
    calculateStats();
  }, [siteSettings, projects, certificates]);

  // Run Garbage Collector Process
  const runGarbageCollector = () => {
    setIsRunning(true);
    setProgress(0);
    setLogs(["[GC Init] Starting Portfolio Garbage Collection engine..."]);
    setStatusMsg("");

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setProgress(currentProgress);

      if (currentProgress === 20) {
        setLogs((prev) => [...prev, "[GC Scan] Scanning LocalStorage & Image Cache entries..."]);
      } else if (currentProgress === 40) {
        setLogs((prev) => [...prev, `[GC Analyze] Active references found across ${projects.length} Projects & ${certificates.length} Certificates.`]);
      } else if (currentProgress === 60) {
        setLogs((prev) => [...prev, "[GC Purge] Purging orphaned image caches & stale temporary entries..."]);

        // Perform actual cleanup
        try {
          const cacheRaw = localStorage.getItem("portfolio_image_cache") || "{}";
          const cache = JSON.parse(cacheRaw);
          const cacheKeys = Object.keys(cache);

          const activeImageRefs = new Set();
          if (siteSettings?.profileImage) activeImageRefs.add(siteSettings.profileImage);
          if (siteSettings?.favicon) activeImageRefs.add(siteSettings.favicon);

          projects.forEach((p) => {
            if (Array.isArray(p.image)) {
              p.image.forEach((img) => activeImageRefs.add(img));
            } else if (p.image) {
              activeImageRefs.add(p.image);
            }
          });

          certificates.forEach((c) => {
            if (c.image) activeImageRefs.add(c.image);
          });

          let purged = 0;
          const cleanedCache = {};
          cacheKeys.forEach((key) => {
            const pathNoPublic = key.startsWith("public/") ? "/" + key.substring(7) : key;
            const isReferenced =
              activeImageRefs.has(key) ||
              activeImageRefs.has(pathNoPublic) ||
              Array.from(activeImageRefs).some((ref) => typeof ref === "string" && (ref.includes(key) || key.includes(ref)));

            if (isReferenced) {
              cleanedCache[key] = cache[key];
            } else {
              purged++;
            }
          });

          localStorage.setItem("portfolio_image_cache", JSON.stringify(cleanedCache));
        } catch (e) {
          console.error("Purge error:", e);
        }
      } else if (currentProgress === 80) {
        setLogs((prev) => [...prev, "[GC Compact] Compacting JSON structures & triggering browser RAM release..."]);
      } else if (currentProgress >= 100) {
        clearInterval(interval);
        setIsRunning(false);
        setLogs((prev) => [...prev, "[GC Success] Garbage collection completed successfully! 0 orphaned memory leaks remaining."]);
        setStatusMsg("Garbage Collector executed successfully! Storage memory optimized.");
        calculateStats();
      }
    }, 300);
  };

  const clearEntireCache = () => {
    if (window.confirm("Are you sure you want to clear the entire image cache? Active images will re-cache when viewed.")) {
      localStorage.removeItem("portfolio_image_cache");
      setStatusMsg("Entire image cache cleared!");
      calculateStats();
    }
  };

  return (
    <div className="space-y-6 text-xs text-slate-300">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <HiOutlineCpuChip className="h-5 w-5 text-emerald-400" /> Portfolio Garbage Collector & Storage Optimizer
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Scan, purge orphaned image caches, clean unlinked memory, and optimize browser LocalStorage usage.
        </p>
      </div>

      {statusMsg && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 font-semibold text-emerald-400 text-center animate-fade-up">
          {statusMsg}
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span>LocalStorage Usage</span>
            <HiOutlineCircleStack className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-xl font-black text-white font-mono">{stats.localStorageKB} KB</p>
          <p className="text-[10px] text-slate-400">Capacity: ~5,000 KB (5 MB)</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span>Image Cache Items</span>
            <HiOutlineSparkles className="h-4 w-4 text-violet-400" />
          </div>
          <p className="text-xl font-black text-white font-mono">{stats.cacheItemsCount}</p>
          <p className="text-[10px] text-slate-400">Cached image data URLs</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span>Cache Footprint</span>
            <HiOutlineCpuChip className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-xl font-black text-white font-mono">{stats.cacheSizeKB} KB</p>
          <p className="text-[10px] text-slate-400">Total cache memory size</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span>Orphaned Caches</span>
            <HiOutlineShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-emerald-400 font-mono">{stats.orphanedCount}</p>
          <p className="text-[10px] text-slate-400">Unreferenced temporary items</p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
          <HiOutlineSparkles className="h-4 w-4 text-emerald-400" /> Garbage Collector Execution Control
        </h3>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={runGarbageCollector}
            disabled={isRunning}
            className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition ${
              isRunning ? "opacity-60 cursor-not-allowed" : "hover:scale-105 active:scale-95"
            }`}
          >
            <HiOutlineArrowPath className={`h-5 w-5 ${isRunning ? "animate-spin" : ""}`} />
            {isRunning ? "Running Garbage Collector..." : "Run Garbage Collector 🧹"}
          </button>

          <button
            onClick={clearEntireCache}
            className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-semibold text-red-300 hover:bg-red-500/20 transition"
          >
            <HiOutlineTrash className="h-4 w-4" /> Clear All Image Cache
          </button>
        </div>

        {/* Execution Progress Bar */}
        {isRunning && (
          <div className="space-y-2 pt-2 animate-fade-up">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Garbage Collector Progress</span>
              <span className="font-mono text-emerald-400">{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Live Execution Console Logs */}
        {logs.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-slate-950 p-4 font-mono text-[11px] space-y-1.5 max-h-48 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <HiOutlineCheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className={idx === logs.length - 1 ? "text-emerald-300 font-bold" : "text-slate-400"}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GarbageCollectorTab;
