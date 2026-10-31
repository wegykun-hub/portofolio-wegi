import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Copy,
  Check,
  ArrowUpRight,
  CheckCircle2,
  Award,
  Upload,
  Plus,
} from 'lucide-react';
import { CertificateItem } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface CertificateDetailModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateDetailModal: React.FC<CertificateDetailModalProps> = ({
  certificate,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const handleCopyCredential = () => {
    navigator.clipboard.writeText(certificate.credentialId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cert-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 shadow-2xl text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-[#0B0B0E]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-mono-tabular font-semibold text-blue-600 dark:text-blue-400">
              {certificate.index}
            </span>
            <span aria-hidden="true">·</span>
            <span>{certificate.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Diterbitkan {certificate.issueDate}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail sertifikat"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High-Resolution Certificate Photo Showcase */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
          <ResilientImage
            src={certificate.image}
            alt={`Foto Sertifikat ${certificate.title}`}
            fallbackTitle={certificate.title}
            fallbackSubtitle={certificate.issuer}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-6 sm:p-8">
            <div className="max-w-3xl space-y-1.5">
              <p className="text-xs font-medium text-blue-400">
                {certificate.issuer}
              </p>
              <h2
                id="modal-cert-title"
                className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
              >
                {certificate.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Detailed Explanation & Verification Metadata */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Credential Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
            <div className="space-y-1">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                ID Kredensial Resmi
              </p>
              <div className="flex items-center gap-2">
                <span className="font-mono-tabular text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                  {certificate.credentialId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCredential}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors cursor-pointer"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Masa Berlaku Akreditasi
              </p>
              <p className="font-mono-tabular text-sm sm:text-base font-semibold text-zinc-900 dark:text-white">
                {certificate.issueDate} — {certificate.validUntil}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Hasil Evaluasi & Predikat
              </p>
              <p className="font-mono-tabular text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400">
                {certificate.examScore}
              </p>
            </div>
          </div>

          {/* Comprehensive Explanation */}
          <div className="space-y-3">
            <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-white">
              Penjelasan Lengkap & Ruang Lingkup Sertifikasi
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {certificate.detailedExplanation}
            </p>
          </div>

          {/* Practical Impact & Validated Competencies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2.5">
              <h4 className="font-display text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Implementasi & Dampak Nyata di Proyek</span>
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {certificate.practicalImpact}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
              <h4 className="font-display text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Kompetensi Teknis yang Tervalidasi</span>
              </h4>
              <ul className="space-y-1.5">
                {certificate.competencies.map((comp, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-bold">—</span>
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Footer Action */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Dokumen sertifikat ini telah diverifikasi sesuai standar kredensial profesional.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors whitespace-nowrap shrink-0"
              >
                <span>Portal Verifikasi Penerbit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AddCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newCert: CertificateItem) => void;
  nextIndexNumber: number;
}

export const AddCertificateModal: React.FC<AddCertificateModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  nextIndexNumber,
}) => {
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('Oktober 2026');
  const [credentialId, setCredentialId] = useState('');
  const [category, setCategory] = useState<'cloud' | 'security' | 'architecture' | 'frontend'>('cloud');
  const [examScore, setExamScore] = useState('Terverifikasi · Lulus Sangat Memuaskan');
  const [shortExplanation, setShortExplanation] = useState('');
  const [detailedExplanation, setDetailedExplanation] = useState('');
  const [practicalImpact, setPracticalImpact] = useState('');
  const [competenciesText, setCompetenciesText] = useState('System Architecture, Cloud Security, Performance Optimization');
  const [imagePreview, setImagePreview] = useState<string>('/src/assets/images/hero_wegi_potrait.jpg');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryLabelMap = {
      cloud: 'Cloud & Distributed Infrastructure',
      security: 'Container Security & Orchestration',
      architecture: 'Financial Systems Architecture',
      frontend: 'Frontend & Graphics Engineering',
    };

    const formattedIdx = String(nextIndexNumber).padStart(2, '0');
    const newCert: CertificateItem = {
      id: `cert-custom-${Date.now()}`,
      index: formattedIdx,
      title,
      issuer,
      issueDate,
      validUntil: 'Seumur Hidup / Aktif',
      credentialId: credentialId || `CRED-${Date.now().toString().slice(-6)}`,
      category,
      categoryLabel: categoryLabelMap[category],
      image: imagePreview,
      examScore,
      shortExplanation,
      detailedExplanation: detailedExplanation || shortExplanation,
      practicalImpact:
        practicalImpact ||
        'Diterapkan secara langsung dalam pengembangan standar kualitas rekayasa dan arsitektur produk.',
      competencies: competenciesText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      verificationUrl: 'https://linkedin.com',
    };

    onAdd(newCert);
    setTitle('');
    setIssuer('');
    setCredentialId('');
    setShortExplanation('');
    setDetailedExplanation('');
    setPracticalImpact('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-cert-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-[#0B0B0E] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 id="add-cert-title" className="font-display text-lg font-semibold">
              Tambah Foto Sertifikat & Penjelasan Baru
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Unggah foto sertifikat Anda dan tuliskan penjelasan detail kompetensinya.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal tambah sertifikat"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Upload Photo Slot */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Foto Sertifikat (Unggah File Gambar atau Pilih Preset)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-5 aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
                <ResilientImage
                  src={imagePreview}
                  alt="Preview Sertifikat"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:col-span-7 space-y-2.5">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-opacity cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih Foto dari Perangkat</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Mendukung format JPG, PNG, atau WebP. Foto disimpan langsung di browser Anda.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Nama Sertifikat / Penghargaan
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: AWS Certified Solutions Architect"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Lembaga Penerbit
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Amazon Web Services (AWS)"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Kategori Bidang
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600"
              >
                <option value="cloud">Cloud & Infrastructure</option>
                <option value="security">Security & Kubernetes</option>
                <option value="architecture">Systems Architecture</option>
                <option value="frontend">Frontend & WebGL</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Tanggal Terbit
              </label>
              <input
                type="text"
                required
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                ID Kredensial
              </label>
              <input
                type="text"
                placeholder="Contoh: AWS-SAP-88219"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Ringkasan Penjelasan Sertifikat (Ditampilkan di Kartu)
            </label>
            <textarea
              rows={2}
              required
              placeholder="Jelaskan secara singkat apa yang divalidasi oleh sertifikat ini..."
              value={shortExplanation}
              onChange={(e) => setShortExplanation(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Penjelasan Detail & Materi yang Diujikan (Ditampilkan di Modal Detail)
            </label>
            <textarea
              rows={3}
              placeholder="Uraikan kurikulum, ujian praktik, dan dampak nyata dari sertifikasi ini..."
              value={detailedExplanation}
              onChange={(e) => setDetailedExplanation(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Skor / Predikat Kelulusan
              </label>
              <input
                type="text"
                value={examScore}
                onChange={(e) => setExamScore(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Kompetensi (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={competenciesText}
                onChange={(e) => setCompetenciesText(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simpan Sertifikat</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
