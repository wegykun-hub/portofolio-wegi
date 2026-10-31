import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Terminal, Sliders, ExternalLink, Check } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface LiveDemoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({ project, onClose }) => {
  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const [stressLoad, setStressLoad] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [customLogs, setCustomLogs] = useState<string[]>([]);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    if (project) {
      setActiveViewIdx(0);
      setStressLoad(1);
      setCustomLogs([]);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentView =
    project.demoConfig.interactiveViews[activeViewIdx] ||
    project.demoConfig.interactiveViews[0];

  const handleTriggerDiagnostic = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const timestamp = new Date().toLocaleTimeString('id-ID', { hour12: false });
      const newEntry = `[${timestamp}] Benchmark beban ${stressLoad}x selesai: 0 paket hilang, latensi stabil.`;
      setCustomLogs((prev) => [newEntry, ...prev.slice(0, 3)]);
      setIsSimulating(false);
    }, 280);
  };

  const handleCopyDemoUrl = () => {
    navigator.clipboard.writeText(project.liveUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-demo-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white dark:bg-[#09090C] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser Sandbox Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-zinc-100 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-display text-sm font-semibold text-zinc-900 dark:text-white truncate" id="live-demo-title">
              Simulasi Interaktif: {project.title}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 font-mono-tabular">
            <span className="truncate max-w-[260px]">{project.liveUrl}</span>
            <button
              type="button"
              onClick={handleCopyDemoUrl}
              className="text-blue-600 dark:text-blue-400 hover:underline ml-2 whitespace-nowrap cursor-pointer"
            >
              {copiedUrl ? 'Tersalin' : 'Salin URL'}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup simulasi"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Workspace Controls */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          <div className="flex flex-col gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            {/* View Switcher Tabs — scrollable on mobile */}
            <div className="overflow-x-auto pb-1">
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 w-max min-w-full sm:w-fit sm:min-w-0">
                {project.demoConfig.interactiveViews.map((view, idx) => (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setActiveViewIdx(idx)}
                    className={`px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeViewIdx === idx
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {view.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Load Multiplier & Action — wrap on mobile */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <Sliders className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="shrink-0">Skala Beban:</span>
                {[1, 2, 5].map((mult) => (
                  <button
                    key={mult}
                    type="button"
                    onClick={() => setStressLoad(mult)}
                    className={`px-2.5 py-1 rounded text-xs font-mono-tabular font-medium transition-colors cursor-pointer shrink-0 ${
                      stressLoad === mult
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {mult}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleTriggerDiagnostic}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>Uji Beban</span>
              </button>
            </div>
          </div>

          {/* Active View Description & Primary Metric */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80">
            <div className="space-y-1">
              <h3 className="font-display text-base font-semibold text-zinc-900 dark:text-white">
                {currentView.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                {currentView.description}
              </p>
            </div>
            <div className="sm:text-right shrink-0">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {project.demoConfig.primaryMetricLabel}
              </p>
              <p className="font-mono-tabular text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                {project.demoConfig.primaryMetricValue}
              </p>
            </div>
          </div>

          {/* 3-Column Interactive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentView.kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 space-y-1.5"
              >
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{kpi.label}</p>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono-tabular text-xl font-bold text-zinc-900 dark:text-white">
                    {kpi.value}
                  </span>
                  <span className="text-xs font-mono-tabular text-blue-600 dark:text-blue-400">
                    {kpi.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Execution Output Log */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-200 p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
              <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>Log Eksekusi Modul ({currentView.id})</span>
              </span>
              <span className="font-mono-tabular">Skala Aktif: {stressLoad}x</span>
            </div>
            <div className="space-y-1.5 font-mono-tabular text-xs leading-relaxed">
              {customLogs.map((entry, idx) => (
                <p key={`custom-${idx}`} className="text-blue-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>{entry}</span>
                </p>
              ))}
              {currentView.logEntries.map((entry, idx) => (
                <p key={idx} className="text-zinc-300">
                  {entry}
                </p>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              Teknologi Inti: {project.technologies.join(' · ')}
            </span>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              <span>Buka Lingkungan Staging Eksternal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
