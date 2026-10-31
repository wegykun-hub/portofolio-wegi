import React, { useEffect } from 'react';
import { X, ArrowUpRight, Play, CheckCircle2, Layers } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenLiveDemo: (project: ProjectItem) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenLiveDemo,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 shadow-2xl text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-[#0B0B0E]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-mono-tabular font-medium text-blue-600 dark:text-blue-400">
              {project.index}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail proyek"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Showcase */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
          <ResilientImage
            src={project.image}
            alt={project.title}
            fallbackTitle={project.title}
            fallbackSubtitle={project.client}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-8">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-blue-400 mb-2">
                {project.client} · {project.role}
              </p>
              <h2
                id="modal-project-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
              >
                {project.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Quantitative Impact Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
            {project.impactMetrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {metric.label}
                </p>
                <p className="font-mono-tabular text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-white">
              Ringkasan Eksekutif Proyek
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Problem & Architecture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2.5">
              <h4 className="font-display text-sm font-semibold text-zinc-900 dark:text-white">
                Tantangan Teknis & Bisnis
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2.5">
              <h4 className="font-display text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Solusi Arsitektur & Rekayasa</span>
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.architectureSolution}
              </p>
            </div>
          </div>

          {/* Technology Stack (Unboxed Metadata Discipline) */}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Spesifikasi Teknologi & Stack Produksi</span>
              </p>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {project.technologies.join(' · ')}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLiveDemo(project);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Jalankan Live Demo</span>
              </button>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Dokumentasi Arsitektur</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
