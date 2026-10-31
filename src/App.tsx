/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  ArrowUp,
  Sun,
  Moon,
  Mail,
  MessageSquare,
  Github,
  Linkedin,
  Instagram,
  Send,
  Copy,
  Check,
  Download,
  Play,
  BookOpen,
  Award,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import {
  DEFAULT_PROFILE,
  HERO_METRICS,
  ABOUT_NARRATIVE,
  SKILL_CATEGORIES,
  PROJECTS_DATA,
  CERTIFICATES_DATA,
  TIMELINE_DATA,
  TESTIMONIALS_DATA,
  ProfileIdentity,
  ProjectItem,
  CertificateItem,
} from './data/portfolioData';
import { ResilientImage } from './components/ResilientImage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { LiveDemoModal } from './components/LiveDemoModal';
import {
  CertificateDetailModal,
} from './components/CertificateModal';

const STORAGE_KEY_PROFILE = 'aw_portfolio_profile_v1';
const STORAGE_KEY_THEME = 'aw_portfolio_theme_v1';
const STORAGE_KEY_CERTS = 'aw_portfolio_certificates_v1';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function App() {
  // Theme state (Dark mode default as requested by black/white/electric-blue concept)
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  // Profile Identity state (customizable by user)
  const [profile, setProfile] = useState<ProfileIdentity>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Certificates state (default 4 studio certificates + user-added certificates)
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CERTS);
      return saved ? JSON.parse(saved) : CERTIFICATES_DATA;
    } catch {
      return CERTIFICATES_DATA;
    }
  });

  // Initial loading bar animation state
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);

  // Interactive section states
  const [activeSkillTab, setActiveSkillTab] = useState<string>('all');
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>('all');
  const [activeCertFilter, setActiveCertFilter] = useState<string>('all');
  const [activeTimelineFilter, setActiveTimelineFilter] = useState<string>('all');

  // Modals state
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<ProjectItem | null>(null);
  const [selectedLiveDemo, setSelectedLiveDemo] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  // Scroll & Back-to-top state
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Pengembangan Produk & Arsitektur Sistem',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'whatsapp' | null>(null);

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  // Initial smooth entrance readiness
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoaded(true), 180);
    return () => clearTimeout(timer);
  }, []);

  // Scroll listener for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 520);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered skills
  const displayedSkillCategories = useMemo(() => {
    if (activeSkillTab === 'all') return SKILL_CATEGORIES;
    return SKILL_CATEGORIES.filter((cat) => cat.id === activeSkillTab);
  }, [activeSkillTab]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeProjectFilter === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((proj) => proj.category === activeProjectFilter);
  }, [activeProjectFilter]);

  // Filtered certificates
  const filteredCertificates = useMemo(() => {
    if (activeCertFilter === 'all') return certificates;
    return certificates.filter((cert) => cert.category === activeCertFilter);
  }, [activeCertFilter, certificates]);

  // Filtered timeline
  const filteredTimeline = useMemo(() => {
    if (activeTimelineFilter === 'all') return TIMELINE_DATA;
    return TIMELINE_DATA.filter((item) => item.category === activeTimelineFilter);
  }, [activeTimelineFilter]);

  const handleCopyText = (value: string, field: 'email' | 'whatsapp') => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadResumeSummary = () => {
    const a = document.createElement('a');
    a.href = '/images/cv_wegi.jpeg';
    a.download = 'CV_Fadilah_Wegi_Saputra.jpeg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cleanWhatsappNumber = profile.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Animated Blob Background */}
      <div className="blob-bg" aria-hidden="true">
        <span className="blob-c" />
        <span className="blob-d" />
      </div>
      {/* Top Loading Progress Accent Bar */}
      <div
        className={`fixed top-0 left-0 right-0 h-0.5 bg-blue-600 z-50 transition-transform duration-500 origin-left ${
          isInitialLoaded ? 'scale-x-100 opacity-0' : 'scale-x-75 opacity-100'
        }`}
        aria-hidden="true"
      />

      {/* =====================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Top Bar Contract)
          Zone 1: Single-line Brand Title
          Zone 2: 5 concise single-line text nav links
          Zone 3: 1 primary CTA button
      ===================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#FAFAFA]/85 dark:bg-[#050505]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-5 sm:px-8 h-16">
          {/* Zone 1: Brand Title (Single text element, one line) */}
          <a
            href="#hero"
            className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-white whitespace-nowrap shrink-0"
          >
            {profile.fullName}
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            <a
              href="#about"
              className="hover:text-zinc-900 dark:hover:text-white underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#skills"
              className="hover:text-zinc-900 dark:hover:text-white underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-zinc-900 dark:hover:text-white underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#certificates"
              className="hover:text-zinc-900 dark:hover:text-white underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Certificates
            </a>
            <a
              href="#experience"
              className="hover:text-zinc-900 dark:hover:text-white underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Experience
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Hubungi Saya
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ===================================================================
            HERO SECTION (Split-Screen + Full-Width Proof Strip Below)
        =================================================================== */}
        <section
          id="hero"
          className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-12 pb-16 lg:pb-24"
        >
          {/* Workspace Control Strip (Theme Toggle, Mobile Nav Jump, & Identity Customizer) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-zinc-200 dark:border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-medium text-zinc-900 dark:text-zinc-200">
                Portofolio Rekayasa & Arsitektur Produk
              </span>
              <span aria-hidden="true">·</span>
              <span>{profile.location}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                aria-label={isDark ? 'Aktifkan Mode Terang' : 'Aktifkan Mode Gelap'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-blue-500/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-blue-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-blue-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Quick Navigation Strip */}
          <div className="flex md:hidden items-center gap-4 overflow-x-auto pb-6 mb-4 text-xs font-medium text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
            <a href="#about" className="whitespace-nowrap shrink-0 hover:text-blue-500">
              About Me
            </a>
            <span aria-hidden="true">·</span>
            <a href="#skills" className="whitespace-nowrap shrink-0 hover:text-blue-500">
              Skills
            </a>
            <span aria-hidden="true">·</span>
            <a href="#projects" className="whitespace-nowrap shrink-0 hover:text-blue-500">
              Projects
            </a>
            <span aria-hidden="true">·</span>
            <a href="#certificates" className="whitespace-nowrap shrink-0 hover:text-blue-500">
              Certificates
            </a>
            <span aria-hidden="true">·</span>
            <a href="#experience" className="whitespace-nowrap shrink-0 hover:text-blue-500">
              Experience
            </a>
            <span aria-hidden="true">·</span>
            <a href="#contact" className="whitespace-nowrap shrink-0 hover:text-blue-500">
              Contact
            </a>
          </div>

          {/* Split-Screen Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Typographic Hierarchy & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-between space-y-8 py-2"
            >
              <div className="space-y-5">
                {/* Unboxed Metadata Kicker */}
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                  <span>{profile.profession}</span>
                  <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">
                    ·
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Tersedia untuk Mandat Arsitektur & Kolaborasi Eksekutif
                  </span>
                </div>

                {/* Full Name & Headline */}
                <div className="space-y-3">
                  <p className="font-display text-lg sm:text-xl font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight">
                    Halo, saya {profile.fullName}
                  </p>
                  <h1
                    className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08]"
                    style={{ textWrap: 'balance' }}
                  >
                    {profile.headline}
                  </h1>
                </div>

                {/* Short Description */}
                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                  {profile.shortBio}
                </p>
              </div>

              {/* Action Buttons & Social Links */}
              <div className="space-y-8 pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('projects')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Lihat Portofolio</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Hubungi Saya</span>
                  </button>
                </div>

                {/* Social Media Bar */}
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Jaringan Profesional & Repositori Kode
                  </span>

                  <div className="flex items-center gap-3">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={profile.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href={profile.tiktok || 'https://tiktok.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <TikTokIcon className="w-4 h-4" />
                      <span>TikTok</span>
                    </a>
                    <a
                      href={`https://wa.me/${cleanWhatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Editorial Portrait Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-transparent min-h-[420px] sm:min-h-[500px] flex flex-col justify-end"
            >
              <ResilientImage
                src={profile.heroImage}
                alt={`Foto potret profesional ${profile.fullName}`}
                fallbackTitle={profile.fullName}
                fallbackSubtitle={profile.profession}
                className="absolute inset-0 w-full h-full object-contain object-bottom"
              />
              {/* Card info nama — tanpa overlay gelap */}
              <div className="relative z-10 p-4 sm:p-5">
                <div className="p-4 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/60 dark:border-white/10 space-y-1 shadow-sm">
                  <p className="font-display text-base font-semibold text-zinc-900 dark:text-white">
                    {profile.fullName}
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    {profile.profession}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-mono-tabular pt-1">
                    Mahasiswa Aktif Universitas Terbuka · Sistem Informasi
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full-Width 4-Column Quantitative Proof Row Below Hero Split */}
          <div className="mt-12 pt-10 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HERO_METRICS.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-white dark:bg-[#0B0B0E] border border-zinc-200/90 dark:border-zinc-800/90 space-y-1.5"
              >
                <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  {item.value}
                </p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {item.label}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-mono-tabular">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SUBTLE EDITORIAL MARQUEE DIVIDER
        =================================================================== */}
        <div
          className="w-full overflow-hidden border-y border-zinc-200 dark:border-zinc-800/90 bg-zinc-100/60 dark:bg-[#09090C] py-3.5"
          aria-hidden="true"
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {[...Array(2)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex items-center gap-8 shrink-0">
                <span>Arsitektur Sistem Terdistribusi</span>
                <span className="text-blue-600 dark:text-blue-400">·</span>
                <span>Rekayasa Full-Stack Presisi</span>
                <span className="text-blue-600 dark:text-blue-400">·</span>
                <span>Enterprise Design Systems</span>
                <span className="text-blue-600 dark:text-blue-400">·</span>
                <span>Komputasi WebAssembly & WebGL Real-Time</span>
                <span className="text-blue-600 dark:text-blue-400">·</span>
                <span>Infrastruktur Cloud Multi-Region</span>
                <span className="text-blue-600 dark:text-blue-400">·</span>
                <span>Kepemimpinan Teknis & Produk</span>
                <span className="text-blue-600 dark:text-blue-400">·</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================
            ABOUT ME SECTION
        =================================================================== */}
        <section
          id="about"
          className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Section Heading & Executive Actions */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-mono-tabular font-medium text-blue-600 dark:text-blue-400">
                  01. Tentang Saya
                </p>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Perpaduan Disiplin Rekayasa Sistem & Ketajaman Desain.
                </h2>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Setiap baris kode dan keputusan arsitektur diarahkan untuk menciptakan perangkat lunak yang tahan uji, cepat, dan memberikan nilai bisnis terukur.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadResumeSummary}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Ringkasan CV</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('certificates')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Lihat Galeri Sertifikat</span>
                </button>
              </div>
            </div>

            {/* Right Column: 5 Structured Narrative Pillars */}
            <div className="lg:col-span-8 space-y-8">
              {/* Primary Personal Introduction */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
                  <span>Perkenalan Pribadi</span>
                  <span aria-hidden="true">·</span>
                  <span>Filosofi Rekayasa</span>
                </div>
                <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal">
                  {ABOUT_NARRATIVE.introduction}
                </p>
              </div>

              {/* 2x2 Narrative Grid for Education, Passion, Career Goals, and Journey */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                  <p className="text-xs font-mono-tabular text-blue-600 dark:text-blue-400">
                    01 · Latar Belakang Pendidikan
                  </p>
                  <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-white">
                    Fondasi Akademis & Riset
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {ABOUT_NARRATIVE.educationBackground}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                  <p className="text-xs font-mono-tabular text-blue-600 dark:text-blue-400">
                    02 · Minat & Passion
                  </p>
                  <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-white">
                    Eksplorasi Performa & Estetika
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {ABOUT_NARRATIVE.passionAndInterests}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                  <p className="text-xs font-mono-tabular text-blue-600 dark:text-blue-400">
                    03 · Tujuan Karier
                  </p>
                  <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-white">
                    Visi Kepemimpinan Teknologi
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {ABOUT_NARRATIVE.careerGoals}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                  <p className="text-xs font-mono-tabular text-blue-600 dark:text-blue-400">
                    04 · Perjalanan Profesional
                  </p>
                  <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-white">
                    Rekam Jejak Lintas Industri
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {ABOUT_NARRATIVE.professionalJourney}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SKILLS & EXPERTISE SECTION
        =================================================================== */}
        <section
          id="skills"
          className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-mono-tabular font-medium text-blue-600 dark:text-blue-400">
                02. Keahlian & Kompetensi Inti
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                Matriks Kapabilitas Teknis, Desain, Komunikasi & Kepemimpinan.
              </h2>
            </div>

            {/* Interactive Category Filter Control */}
            <div
              className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 w-fit"
              role="tablist"
              aria-label="Filter Kategori Keahlian"
            >
              {[
                { id: 'all', label: 'Semua Kategori' },
                { id: 'technical', label: 'Technical' },
                { id: 'design', label: 'Design' },
                { id: 'communication', label: 'Communication' },
                { id: 'professional', label: 'Professional' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSkillTab === tab.id}
                  onClick={() => setActiveSkillTab(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeSkillTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div
            className={`grid grid-cols-1 ${
              displayedSkillCategories.length > 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-4xl'
            } gap-8`}
          >
            {displayedSkillCategories.map((category, catIdx) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: catIdx * 0.05 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-1.5 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white">
                      {category.title}
                    </h3>
                    <span className="text-xs font-mono-tabular text-blue-600 dark:text-blue-400">
                      {category.skills.length} Kompetensi Inti
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    {category.subtitle}
                  </p>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2 shrink-0 text-xs font-mono-tabular">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {skill.level}%
                          </span>
                        </div>
                      </div>

                      {/* Precision Progress Bar */}
                      <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800/90 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                        />
                      </div>

                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {skill.context}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            MY PROJECTS SECTION (Dynamic Bento Grid + Case Study & Live Demo)
        =================================================================== */}
        <section
          id="projects"
          className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-mono-tabular font-medium text-blue-600 dark:text-blue-400">
                03. Karya & Studi Kasus Terpilih
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                Arsitektur Produksi dengan Dampak Kuantitatif Nyata.
              </h2>
            </div>

            {/* Interactive Category Filter Buttons */}
            <div
              className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 w-fit"
              role="tablist"
              aria-label="Filter Proyek"
            >
              {[
                { id: 'all', label: 'Semua Proyek' },
                { id: 'fintech', label: 'Systems & Fintech' },
                { id: 'spatial', label: 'Spatial & WebGL' },
                { id: 'cloud', label: 'Cloud & Edge' },
                { id: 'commerce', label: 'Digital Commerce' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={activeProjectFilter === filter.id}
                  onClick={() => setActiveProjectFilter(filter.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeProjectFilter === filter.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const isWide =
                  activeProjectFilter === 'all' && project.featured
                    ? 'lg:col-span-7'
                    : activeProjectFilter === 'all'
                    ? 'lg:col-span-5'
                    : 'lg:col-span-6';

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`${isWide} group rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 overflow-hidden flex flex-col justify-between transition-colors`}
                  >
                    <div>
                      {/* Project Thumbnail with Click-to-Inspect */}
                      <div
                        onClick={() => setSelectedProjectDetail(project)}
                        className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer"
                      >
                        <ResilientImage
                          src={project.image}
                          alt={project.title}
                          fallbackTitle={project.title}
                          fallbackSubtitle={project.client}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90" />
                        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                          <div className="text-xs text-zinc-200 font-medium">
                            <span>{project.client}</span>
                          </div>
                          <span className="font-mono-tabular text-xs font-semibold text-blue-400">
                            {project.impactMetrics[0]?.value}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 sm:p-7 space-y-4">
                        {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                          <span className="font-mono-tabular font-semibold text-blue-600 dark:text-blue-400">
                            {project.index}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{project.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">{project.year}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.role}</span>
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                          {project.title}
                        </h3>

                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {project.summary}
                        </p>

                        {/* Unboxed Technology Stack */}
                        <div className="pt-2">
                          <p className="text-xs font-mono-tabular text-zinc-500 dark:text-zinc-400">
                            {project.technologies.join(' · ')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="px-6 sm:px-7 py-4 bg-zinc-50/70 dark:bg-zinc-900/40 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProjectDetail(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Detail Project</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedLiveDemo(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Claim-to-Proof Adjacency: Attributable Executive Testimonials */}
          <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-white">
                Validasi Eksekutif & Dampak Produksi
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Testimoni terverifikasi dari CTO dan VP Product mitra institusional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS_DATA.map((item) => (
                <div
                  key={item.id}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-6"
                >
                  <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    "{item.quote}"
                  </p>
                  <div className="pt-4 border-t border-zinc-200/70 dark:border-zinc-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="font-display text-sm font-bold text-zinc-900 dark:text-white">
                        {item.author}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {item.role} · {item.organization}
                      </p>
                    </div>
                    <span className="text-xs font-mono-tabular font-semibold text-blue-600 dark:text-blue-400">
                      {item.outcomeMetric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            CERTIFICATES & CREDENTIALS GALLERY SECTION (Foto Sertifikat & Penjelasannya)
        =================================================================== */}
        <section
          id="certificates"
          className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-mono-tabular font-medium text-blue-600 dark:text-blue-400">
                04. Galeri Foto Sertifikat & Penjelasan Kredensial
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                Bukti Sertifikasi Profesional, Piagam Penghargaan & Kompetensi Terverifikasi.
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
                Setiap sertifikat dilengkapi dokumentasi foto fisik/digital, rincian materi ujian, ID kredensial resmi, serta dampaknya terhadap proyek nyata. Anda juga dapat mengunggah foto sertifikat baru.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Interactive Certificate Category Filter */}
              <div
                className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 w-fit"
                role="tablist"
                aria-label="Filter Sertifikat"
              >
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'cloud', label: 'Cloud' },
                  { id: 'security', label: 'Security & K8s' },
                  { id: 'architecture', label: 'Architecture' },
                  { id: 'frontend', label: 'Frontend & WebGL' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCertFilter === tab.id}
                    onClick={() => setActiveCertFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeCertFilter === tab.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Certificate Photo Cards */}
            </div>
          </div>

          {/* 2-Column Certificate Photo & Explanation Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCertificates.map((cert) => (
                <motion.article
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 overflow-hidden flex flex-col justify-between transition-colors"
                >
                  <div>
                    {/* Certificate Photo Container */}
                    <div
                      onClick={() => setSelectedCertificate(cert)}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer"
                    >
                      <ResilientImage
                        src={cert.image}
                        alt={`Foto Sertifikat ${cert.title}`}
                        fallbackTitle={cert.title}
                        fallbackSubtitle={cert.issuer}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                      {/* Bottom Overlay Info on Photo */}
                      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                        <div className="space-y-0.5">
                          <p className="text-xs text-blue-400 font-mono-tabular font-medium">
                            ID: {cert.credentialId}
                          </p>
                          <p className="text-xs text-zinc-200 font-medium">
                            {cert.issuer}
                          </p>
                        </div>
                        <span className="font-mono-tabular text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/15 shrink-0">
                          {cert.issueDate}
                        </span>
                      </div>
                    </div>

                    {/* Certificate Explanation Body */}
                    <div className="p-6 sm:p-7 space-y-4">
                      {/* Unboxed Metadata Line */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="font-mono-tabular font-semibold text-blue-600 dark:text-blue-400">
                          Sertifikat {cert.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{cert.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular text-zinc-700 dark:text-zinc-300 font-medium">
                          {cert.examScore}
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        {cert.title}
                      </h3>

                      {/* Detailed Explanation Block */}
                      <div className="space-y-2.5 pt-1">
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          {cert.shortExplanation}
                        </p>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                            Implementasi Nyata:{' '}
                          </span>
                          {cert.practicalImpact}
                        </p>
                      </div>

                      {/* Unboxed Validated Competencies */}
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/70">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                          Kompetensi yang Divalidasi:
                        </p>
                        <p className="text-xs font-mono-tabular text-zinc-700 dark:text-zinc-300">
                          {cert.competencies.join(' · ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="px-6 sm:px-7 py-4 bg-zinc-50/70 dark:bg-zinc-900/40 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-3">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-tabular">
                      Berlaku s/d: {cert.validUntil}
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedCertificate(cert)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Perbesar Foto & Penjelasan</span>
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ===================================================================
            EXPERIENCE & EDUCATION TIMELINE SECTION
        =================================================================== */}
        <section
          id="experience"
          className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-mono-tabular font-medium text-blue-600 dark:text-blue-400">
                05. Rekam Jejak & Linimasa Karier
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                Pengalaman Kerja, Pendidikan, Sertifikasi & Pencapaian.
              </h2>
            </div>

            {/* Interactive Timeline Filter Buttons */}
            <div
              className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 w-fit"
              role="tablist"
              aria-label="Filter Timeline"
            >
              {[
                { id: 'all', label: 'Semua Riwayat' },
                { id: 'work', label: 'Pengalaman Kerja' },
                { id: 'education', label: 'Pendidikan' },
                { id: 'certification', label: 'Sertifikasi' },
                { id: 'achievement', label: 'Prestasi' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTimelineFilter === tab.id}
                  onClick={() => setActiveTimelineFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTimelineFilter === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Architectural Timeline List */}
          <div className="space-y-6">
            {filteredTimeline.map((entry, idx) => {
              const CategoryIcon =
                entry.category === 'work'
                  ? Briefcase
                  : entry.category === 'education'
                  ? GraduationCap
                  : entry.category === 'certification'
                  ? ShieldCheck
                  : Award;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  {/* Left Meta Column */}
                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
                      <CategoryIcon className="w-4 h-4 shrink-0" />
                      <span>{entry.categoryLabel}</span>
                    </div>
                    <p className="font-mono-tabular text-base font-bold text-zinc-900 dark:text-white">
                      {entry.period}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {entry.organization} · {entry.location}
                    </p>
                    {entry.credentialMetric && (
                      <p className="pt-2 text-xs font-mono-tabular font-medium text-zinc-700 dark:text-zinc-300">
                        {entry.credentialMetric}
                      </p>
                    )}
                  </div>

                  {/* Right Content Column */}
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {entry.summary}
                    </p>
                    <ul className="space-y-2 pt-1">
                      {entry.highlights.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="text-blue-600 dark:text-blue-400 font-bold select-none">
                            —
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            CONTACT ME SECTION
        =================================================================== */}
        <section
          id="contact"
          className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Communication Channels */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-mono-tabular font-medium text-blue-600 dark:text-blue-400">
                  06. Hubungi Saya
                </p>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Mari Diskusikan Arsitektur & Produk Digital Anda Berikutnya.
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Terbuka untuk konsultasi arsitektur sistem, kepemimpinan produk skala enterprise, maupun kolaborasi pengembangan proyek strategis.
                </p>
              </div>

              {/* Direct Contact Cards (Email & WhatsApp with Copy Action) */}
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Email Pribadi</span>
                    </p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="block font-mono-tabular text-sm font-semibold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate"
                    >
                      {profile.email}
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyText(profile.email, 'email')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-500" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>WhatsApp Langsung</span>
                    </p>
                    <a
                      href={`https://wa.me/${cleanWhatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-mono-tabular text-sm font-semibold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate"
                    >
                      {profile.whatsapp}
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyText(profile.whatsapp, 'whatsapp')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedField === 'whatsapp' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-500" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Links List */}
              <div className="pt-2 space-y-3">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Media Sosial & Jaringan Profesional
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0B0B0E] text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0B0B0E] text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0B0B0E] text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={profile.tiktok || 'https://tiktok.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0B0B0E] text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition-colors"
                  >
                    <TikTokIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800">
              {contactSubmitted ? (
                <div className="py-8 space-y-6">
                  <div className="space-y-2">
                    <p className="text-xs font-mono-tabular font-semibold text-blue-600 dark:text-blue-400">
                      PESAN TERKONFIRMASI
                    </p>
                    <h3 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
                      Terima kasih, {contactForm.name}.
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Pesan Anda mengenai <span className="font-medium text-zinc-900 dark:text-zinc-200">"{contactForm.subject}"</span> telah tercatat. Anda juga dapat meneruskan pesan ini secara instan melalui WhatsApp atau aplikasi Email Anda:
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 space-y-1">
                    <p><span className="font-semibold">Pengirim:</span> {contactForm.name} ({contactForm.email})</p>
                    <p><span className="font-semibold">Pesan:</span> {contactForm.message}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
                        `Halo ${profile.fullName}, saya ${contactForm.name} (${contactForm.email}).\n\nTopik: ${contactForm.subject}\n\n${contactForm.message}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Teruskan via WhatsApp</span>
                    </a>

                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(
                        `[Portofolio] ${contactForm.subject} — ${contactForm.name}`
                      )}&body=${encodeURIComponent(contactForm.message)}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Buka Aplikasi Email</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactForm({
                          name: '',
                          email: '',
                          subject: 'Pengembangan Produk & Arsitektur Sistem',
                          message: '',
                        });
                      }}
                      className="px-4 py-2.5 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      Kirim Pesan Baru
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="space-y-1 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                      Formulir Komunikasi Profesional
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Waktu respons rata-rata di bawah 4 jam kerja.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Masukkan nama lengkap Anda"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                      >
                        Alamat Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="nama@perusahaan.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                      Topik Diskusi
                    </label>
                    <select
                      id="contact-subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors"
                    >
                      <option value="Pengembangan Produk & Arsitektur Sistem">
                        Pengembangan Produk & Arsitektur Sistem
                      </option>
                      <option value="Konsultasi Teknis & Audit Performa">
                        Konsultasi Teknis & Audit Performa
                      </option>
                      <option value="Tawaran Peran Principal / Staff Engineer">
                        Tawaran Peran Principal / Staff Engineer
                      </option>
                      <option value="Kolaborasi Proyek Khusus">
                        Kolaborasi Proyek Khusus
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                      Pesan Anda
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Ceritakan konteks proyek, target waktu, atau kebutuhan tim Anda..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          MINIMALIST FOOTER (Copyright 2026, Navigation, Socials)
      ===================================================================== */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-1.5">
            <p className="font-display text-base font-bold text-zinc-900 dark:text-white">
              {profile.fullName}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {profile.profession} · © 2026 {profile.fullName}. All rights reserved.
            </p>
          </div>

          <nav
            aria-label="Navigasi Footer"
            className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >
            <a href="#hero" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Beranda
            </a>
            <a href="#about" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Projects
            </a>
            <a href="#certificates" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Certificates
            </a>
            <a href="#experience" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Experience
            </a>
            <a href="#contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={profile.tiktok || 'https://tiktok.com'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${cleanWhatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Kembali ke atas"
            className="fixed bottom-6 right-6 z-30 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-colors cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProjectDetail}
        onClose={() => setSelectedProjectDetail(null)}
        onOpenLiveDemo={(proj) => setSelectedLiveDemo(proj)}
      />

      <LiveDemoModal
        project={selectedLiveDemo}
        onClose={() => setSelectedLiveDemo(null)}
      />

      <CertificateDetailModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

    </div>
  );
}
