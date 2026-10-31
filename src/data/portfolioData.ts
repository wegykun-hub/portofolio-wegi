export interface ProfileIdentity {
  fullName: string;
  profession: string;
  headline: string;
  location: string;
  shortBio: string;
  email: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  github: string;
  heroImage: string;
}

export interface SkillItem {
  name: string;
  level: number;
  experience: string;
  context: string;
}

export interface SkillCategory {
  id: 'technical' | 'design' | 'communication' | 'professional';
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: 'fintech' | 'spatial' | 'cloud' | 'commerce';
  categoryLabel: string;
  year: string;
  client: string;
  role: string;
  featured: boolean;
  image: string;
  summary: string;
  problemStatement: string;
  architectureSolution: string;
  impactMetrics: { label: string; value: string }[];
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
  demoConfig: {
    type: 'fintech' | 'spatial' | 'cloud' | 'commerce';
    primaryMetricLabel: string;
    primaryMetricValue: string;
    interactiveViews: {
      id: string;
      name: string;
      description: string;
      kpis: { label: string; value: string; delta: string }[];
      logEntries: string[];
    }[];
  };
}

export interface TimelineEntry {
  id: string;
  category: 'work' | 'education' | 'certification' | 'achievement';
  categoryLabel: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  summary: string;
  highlights: string[];
  credentialMetric?: string;
}

export interface CertificateItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  issueDate: string;
  validUntil: string;
  credentialId: string;
  category: 'cloud' | 'security' | 'architecture' | 'frontend';
  categoryLabel: string;
  image: string;
  examScore: string;
  shortExplanation: string;
  detailedExplanation: string;
  practicalImpact: string;
  competencies: string[];
  verificationUrl: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  outcomeMetric: string;
}

export const DEFAULT_PROFILE: ProfileIdentity = {
  fullName: 'Fadilah Wegi Saputra',
  profession: 'IT Support & Teknisi Komputer dan Jaringan',
  headline: 'Siap Berkembang di Dunia Usaha dan Teknologi Informasi.',
  location: 'Cianjur, Jawa Barat, Indonesia',
  shortBio:
    'Lulusan SMK Yaspim jurusan Teknik Komputer dan Jaringan yang antusias terhadap perkembangan teknologi IT. Ahli dalam menangani masalah teknis perangkat keras maupun jaringan, dengan kemampuan komunikasi yang baik. Fokus pada pencapaian target kerja dan siap beradaptasi dengan cepat di lingkungan profesional yang dinamis.',
  email: 'gundamin445@gmail.com',
  whatsapp: '+62 821-2440-7106',
  instagram: 'https://www.instagram.com/wegyfutaride27?srtk=MTRnazk2Mzl4MDB0',
  tiktok: 'https://tiktok.com/@gi_shinji2',
  linkedin: 'https://linkedin.com',
  github: 'https://github.com',
  heroImage: '/images/eiii.png',
};

export const HERO_METRICS = [
  {
    value: '5+ Tahun',
    label: 'Pengalaman Kerja di Berbagai Bidang',
    detail: '2021 — 2026',
  },
  {
    value: 'Juara 2',
    label: 'Lomba Robotik Tingkat Nasional',
    detail: 'United Tractors Jakarta Timur, 2019',
  },
  {
    value: 'S1 TI',
    label: 'Sarjana Teknik Informatika (Aktif)',
    detail: 'Universitas Terbuka · Sep 2025',
  },
  {
    value: 'TKJ',
    label: 'Jurusan Teknik Komputer & Jaringan',
    detail: 'SMK Yaspim · Lulus 2020',
  },
];

export const ABOUT_NARRATIVE = {
  introduction:
    'Saya adalah Fadilah Wegi Saputra, lulusan SMK Yaspim jurusan Teknik Komputer dan Jaringan yang memiliki antusiasme tinggi terhadap perkembangan teknologi informasi. Saya ahli dalam menangani masalah teknis perangkat keras maupun jaringan, serta memiliki kemampuan komunikasi yang baik. Saya selalu fokus pada pencapaian target dan siap beradaptasi dengan cepat di lingkungan profesional yang dinamis.',
  educationBackground:
    'Menyelesaikan pendidikan di SMK Yaspim jurusan Teknik Komputer dan Jaringan (2017–2020). Saat ini sedang menempuh pendidikan Sarjana Teknik Informatika (Sistem Informasi) di Universitas Terbuka sejak September 2025. Pernah menjalani PKL sebagai IT Support selama 3 bulan.',
  passionAndInterests:
    'Memiliki ketertarikan mendalam pada jaringan komputer, instalasi dan konfigurasi sistem operasi, serta project management di bidang IT. Senang belajar hal baru dan mengikuti perkembangan teknologi terkini, termasuk broadcasting dan kegiatan kepemimpinan seperti Paskibra.',
  careerGoals:
    'Berkontribusi secara profesional di dunia teknologi informasi, khususnya di bidang jaringan komputer, IT support, dan infrastruktur digital. Terus mengembangkan kompetensi teknis sambil menyelesaikan studi Sarjana Teknik Informatika untuk membangun fondasi karier yang kokoh.',
  professionalJourney:
    'Memulai perjalanan kerja sebagai Security di tahun 2021, kemudian berkembang sebagai Admin di Market Place, lalu dipercaya menjadi Staf Tatausaha dan Pengajar di sekolah, dan yang terbaru sebagai Operator Produksi. Setiap pengalaman memperkuat kemampuan komunikasi, manajemen, dan kedisiplinan kerja.',
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'technical',
    title: 'Technical Skills',
    subtitle: 'Keahlian teknis di bidang jaringan, perangkat keras, dan sistem komputer.',
    skills: [
      {
        name: 'Mengatur & Konfigurasi Jaringan Komputer',
        level: 85,
        experience: '3+ Tahun',
        context: 'Setup LAN/WAN, konfigurasi router & switch, troubleshooting koneksi',
      },
      {
        name: 'Install Ulang & Troubleshoot Komputer/Laptop',
        level: 88,
        experience: '5+ Tahun',
        context: 'Instalasi OS Windows/Linux, driver, software, dan pemulihan sistem',
      },
      {
        name: 'Merakit Komputer & Instalasi Jaringan',
        level: 82,
        experience: '4+ Tahun',
        context: 'Perakitan hardware, crimping kabel, instalasi infrastruktur jaringan',
      },
      {
        name: 'Project Management & Administrasi IT',
        level: 78,
        experience: '3+ Tahun',
        context: 'Pengelolaan inventaris, surat menyurat, jadwal kegiatan IT',
      },
      {
        name: 'Teknik Komputer & Jaringan (TKJ)',
        level: 90,
        experience: '6+ Tahun',
        context: 'Fondasi TKJ dari SMK: hardware, software, jaringan, dan pemrograman dasar',
      },
    ],
  },
  {
    id: 'design',
    title: 'Desain & Multimedia',
    subtitle: 'Kemampuan di bidang desain grafis, konten digital, dan presentasi visual.',
    skills: [
      {
        name: 'Microsoft Office (Word, Excel, PowerPoint)',
        level: 85,
        experience: '5+ Tahun',
        context: 'Pembuatan laporan, presentasi, dan pengolahan data administrasi',
      },
      {
        name: 'Desain Grafis Dasar',
        level: 70,
        experience: '2+ Tahun',
        context: 'Pembuatan materi visual sederhana untuk kebutuhan sekolah dan komunitas',
      },
      {
        name: 'Broadcasting & Konten Digital',
        level: 72,
        experience: '2+ Tahun',
        context: 'Produksi konten, siaran, dan pengelolaan media sosial',
      },
    ],
  },
  {
    id: 'communication',
    title: 'Communication Skills',
    subtitle: 'Kemampuan komunikasi, pelayanan, dan koordinasi tim.',
    skills: [
      {
        name: 'Komunikasi & Pelayanan Pelanggan',
        level: 87,
        experience: '5+ Tahun',
        context: 'Melayani customer, memberikan kenyamanan, dan menangani keluhan',
      },
      {
        name: 'Koordinasi Tim & Kepemimpinan',
        level: 80,
        experience: '3+ Tahun',
        context: 'Pengalaman sebagai Pelatih Paskibra dan koordinasi kegiatan sekolah',
      },
      {
        name: 'Bahasa Jepang (Dasar)',
        level: 40,
        experience: '1 Tahun',
        context: 'Kemampuan dasar percakapan dan penulisan Hiragana/Katakana',
      },
      {
        name: 'Administrasi & Surat Menyurat',
        level: 85,
        experience: '3 Tahun',
        context: 'Membuat surat keluar-masuk, jadwal guru, laporan kegiatan sekolah',
      },
    ],
  },
  {
    id: 'professional',
    title: 'Professional Skills',
    subtitle: 'Sikap profesional, kedisiplinan, dan kemampuan adaptasi di lingkungan kerja.',
    skills: [
      {
        name: 'Kedisiplinan & Tanggung Jawab Kerja',
        level: 92,
        experience: '5+ Tahun',
        context: 'Patroli rutin, pengecekan berkala, dan pemenuhan target kerja',
      },
      {
        name: 'Kemampuan Adaptasi Lingkungan Baru',
        level: 88,
        experience: '5+ Tahun',
        context: 'Berpindah dari security, admin, pengajar, hingga operator produksi',
      },
      {
        name: 'Manajemen Stok & Inventaris',
        level: 80,
        experience: '1+ Tahun',
        context: 'Mengatur barang masuk-keluar, memastikan stok selalu ready, jadwal restock',
      },
      {
        name: 'Mengajar & Pelatihan',
        level: 78,
        experience: '2+ Tahun',
        context: 'Mengajar di kelas sesuai mata pelajaran yang diberikan pihak sekolah',
      },
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'it-support-pkln',
    index: '01',
    title: 'PKL IT Support — Universitas Muhammadiyah',
    category: 'cloud',
    categoryLabel: 'IT Support & Jaringan',
    year: '2020',
    client: 'Universitas Muhammadiyah',
    role: 'IT Support Intern',
    featured: true,
    image: '/images/pkl1.jpeg',
    summary:
      'Program Kerja Lapangan (PKL) selama 3 bulan sebagai IT Support di Universitas Terbuka. Menangani perawatan perangkat keras, troubleshooting jaringan, dan instalasi perangkat lunak untuk mendukung aktivitas akademik.',
    problemStatement:
      'Banyak perangkat komputer dan jaringan di kampus yang membutuhkan perawatan rutin, instalasi ulang sistem operasi, dan perbaikan koneksi jaringan untuk memastikan kelancaran operasional kampus.',
    architectureSolution:
      'Melakukan audit perangkat secara berkala, instalasi ulang OS dan software, konfigurasi jaringan LAN, serta mendokumentasikan setiap penanganan masalah untuk referensi tim IT kampus.',
    impactMetrics: [
      { label: 'Durasi PKL', value: '3 Bulan' },
      { label: 'Perangkat Ditangani', value: '20+ Unit' },
      { label: 'Kepuasan Pengguna', value: 'Sangat Baik' },
    ],
    technologies: ['Windows OS', 'LAN/WAN', 'Hardware Troubleshoot', 'Instalasi Software'],
    liveUrl: '#',
    repoUrl: '#',
    demoConfig: {
      type: 'cloud',
      primaryMetricLabel: 'Durasi PKL',
      primaryMetricValue: '3 Bulan Aktif',
      interactiveViews: [
        {
          id: 'support',
          name: 'Aktivitas IT Support',
          description: 'Rangkuman kegiatan harian selama PKL di Universitas Terbuka.',
          kpis: [
            { label: 'Instalasi OS', value: '15+ Unit', delta: 'Berhasil' },
            { label: 'Konfigurasi Jaringan', value: '5 Ruang', delta: 'Terhubung' },
            { label: 'Troubleshoot Hardware', value: '20+ Kasus', delta: 'Selesai' },
          ],
          logEntries: [
            '[IT-Support] Instalasi Windows 10 dan driver pada 5 unit komputer lab',
            '[Network] Konfigurasi ulang switch dan patch panel ruang dosen',
            '[Hardware] Penggantian RAM dan HDD pada laptop staf administrasi',
          ],
        },
        {
          id: 'documentation',
          name: 'Dokumentasi & Laporan',
          description: 'Pembuatan laporan PKL dan dokumentasi teknis kegiatan.',
          kpis: [
            { label: 'Laporan Harian', value: '60+ Dokumen', delta: 'Terdokumentasi' },
            { label: 'Nilai PKL', value: 'Sangat Baik', delta: 'Lulus' },
            { label: 'Referensi Pembimbing', value: 'Tersedia', delta: 'Terverifikasi' },
          ],
          logEntries: [
            '[Dokumentasi] Laporan akhir PKL diselesaikan dan diserahkan ke kampus',
            '[Evaluasi] Penilaian akhir: Sangat Baik dari supervisor lapangan',
            '[Sertifikat] Sertifikat PKL diterbitkan oleh Universitas Terbuka',
          ],
        },
      ],
    },
  },
  {
    id: 'robotik-nasional',
    index: '02',
    title: 'Lomba Robotik Tingkat Nasional',
    category: 'fintech',
    categoryLabel: 'Prestasi & Kompetisi',
    year: '2019',
    client: 'United Tractors Jakarta Timur',
    role: 'Peserta Lomba Robotik',
    featured: true,
    image: '/images/juara.jpeg',
    summary:
      'Meraih Juara 2 dalam lomba robotik tingkat nasional yang diadakan oleh United Tractors Jakarta Timur. Kompetisi ini merupakan salah satu pencapaian paling membanggakan selama masa sekolah di SMK Yaspim.',
    problemStatement:
      'Membangun dan memprogram robot yang mampu menyelesaikan tantangan teknis di bawah tekanan waktu dan persaingan ketat dari peserta seluruh Indonesia.',
    architectureSolution:
      'Merancang sistem mekanik robot bersama tim, melakukan pemrograman logika kontrol, dan melakukan uji coba berulang untuk memastikan performa robot sesuai kriteria lomba.',
    impactMetrics: [
      { label: 'Peringkat', value: 'Juara 2 Nasional' },
      { label: 'Peserta', value: 'Seluruh Indonesia' },
      { label: 'Penyelenggara', value: 'United Tractors' },
    ],
    technologies: ['Robotika', 'Pemrograman Mikrokontroler', 'Desain Mekanik', 'Kerja Tim'],
    liveUrl: '#',
    repoUrl: '#',
    demoConfig: {
      type: 'fintech',
      primaryMetricLabel: 'Hasil Kompetisi',
      primaryMetricValue: 'Juara 2 Nasional',
      interactiveViews: [
        {
          id: 'robot-design',
          name: 'Desain & Pemrograman Robot',
          description: 'Proses perancangan dan pemrograman robot untuk kompetisi nasional.',
          kpis: [
            { label: 'Tingkat Kompetisi', value: 'Nasional', delta: 'Indonesia' },
            { label: 'Hasil Akhir', value: 'Juara 2', delta: 'Terbaik' },
            { label: 'Tahun', value: '2019', delta: 'SMK Yaspim' },
          ],
          logEntries: [
            '[Robotik] Desain mekanik robot selesai dan diuji coba di sekolah',
            '[Pemrograman] Logika kontrol robot dioptimalkan untuk kecepatan dan akurasi',
            '[Kompetisi] Tim SMK Yaspim meraih Juara 2 Nasional di Jakarta Timur',
          ],
        },
        {
          id: 'teamwork',
          name: 'Kerja Tim & Persiapan',
          description: 'Koordinasi tim dan strategi persiapan menghadapi kompetisi nasional.',
          kpis: [
            { label: 'Anggota Tim', value: '3 Orang', delta: 'Solid' },
            { label: 'Durasi Latihan', value: '3 Bulan', delta: 'Intensif' },
            { label: 'Kehadiran Latihan', value: '100%', delta: 'Disiplin' },
          ],
          logEntries: [
            '[Tim] Koordinasi pembagian tugas antara desain, program, dan strategi',
            '[Latihan] Sesi uji coba intensif setiap hari selama 2 minggu sebelum lomba',
            '[Prestasi] Piagam dan trofi Juara 2 Nasional diterima dari United Tractors',
          ],
        },
      ],
    },
  },
  {
    id: 'tatausaha-sekolah',
    index: '03',
    title: 'Sistem Administrasi & Pengajaran Sekolah',
    category: 'commerce',
    categoryLabel: 'Administrasi & Pendidikan',
    year: '2023',
    client: 'Institusi Pendidikan',
    role: 'Staf Tatausaha & Pengajar',
    featured: false,
    image: '/images/mengajar.jpeg',
    summary:
      'Mengelola administrasi sekolah sebagai Staf Tatausaha sekaligus mengajar di kelas selama periode Juli 2023 hingga Januari 2026. Bertanggung jawab atas pengelolaan jadwal guru, surat menyurat, dan pelaksanaan kegiatan sekolah.',
    problemStatement:
      'Sekolah membutuhkan pengelolaan administrasi yang rapi dan pengajar yang siap mengisi kelas sesuai kebutuhan mata pelajaran, terutama di bidang teknologi dan komputer.',
    architectureSolution:
      'Mengatur jadwal guru secara sistematis, membuat dan mendokumentasikan surat keluar-masuk siswa, serta mempersiapkan materi ajar sesuai kurikulum yang ditetapkan pihak sekolah.',
    impactMetrics: [
      { label: 'Durasi Kerja', value: '2,5 Tahun' },
      { label: 'Surat Dikelola', value: '100+ Dokumen' },
      { label: 'Kelas Diajar', value: 'Aktif' },
    ],
    technologies: ['Microsoft Office', 'Manajemen Administrasi', 'Pengajaran', 'Surat Menyurat'],
    liveUrl: '#',
    repoUrl: '#',
    demoConfig: {
      type: 'commerce',
      primaryMetricLabel: 'Periode Kerja',
      primaryMetricValue: 'Jul 2023 – Jan 2026',
      interactiveViews: [
        {
          id: 'administrasi',
          name: 'Pengelolaan Administrasi',
          description: 'Sistem pengelolaan surat, jadwal, dan dokumentasi sekolah.',
          kpis: [
            { label: 'Jadwal Guru', value: 'Terkelola', delta: 'Teratur' },
            { label: 'Surat Keluar-Masuk', value: '100+ Dok', delta: 'Terdokumentasi' },
            { label: 'Laporan Kegiatan', value: 'Rutin', delta: 'Tepat Waktu' },
          ],
          logEntries: [
            '[Admin] Pembuatan jadwal mingguan untuk seluruh guru mata pelajaran',
            '[Surat] Pengelolaan surat masuk-keluar siswa dan instansi terkait',
            '[Kegiatan] Koordinasi pelaksanaan kegiatan dinas dan individual sekolah',
          ],
        },
        {
          id: 'pengajaran',
          name: 'Kegiatan Mengajar',
          description: 'Aktivitas pengajaran di kelas sesuai mata pelajaran yang ditugaskan.',
          kpis: [
            { label: 'Mata Pelajaran', value: 'IT & Umum', delta: 'Ditugaskan' },
            { label: 'Kehadiran Mengajar', value: 'Konsisten', delta: 'Disiplin' },
            { label: 'Respons Siswa', value: 'Positif', delta: 'Aktif' },
          ],
          logEntries: [
            '[Mengajar] Penyampaian materi teknologi komputer dan jaringan di kelas',
            '[Evaluasi] Pemberian tugas dan penilaian harian kepada siswa',
            '[Pembimbingan] Pendampingan siswa dalam kegiatan praktikum komputer',
          ],
        },
      ],
    },
  },
  {
    id: 'operator-produksi',
    index: '04',
    title: 'Operator Produksi Baker O\'ld',
    category: 'spatial',
    categoryLabel: 'Produksi & Operasional',
    year: '2026',
    client: 'Baker O\'ld',
    role: 'Operator Produksi',
    featured: false,
    image: '/images/1123.jpeg',
    summary:
      'Bekerja sebagai Operator Produksi di Baker O\'ld selama periode Januari 2026 hingga Mei 2026. Bertanggung jawab atas proses produksi, quality control, dan memastikan target produksi harian terpenuhi.',
    problemStatement:
      'Memastikan proses produksi berjalan lancar, sesuai standar kualitas, dan target produksi harian tercapai dalam lingkungan kerja yang dinamis dan bertempo tinggi.',
    architectureSolution:
      'Menjalankan standar operasional prosedur (SOP) produksi secara konsisten, berkoordinasi dengan tim untuk memastikan kelancaran alur produksi, dan segera menangani kendala yang muncul di lapangan.',
    impactMetrics: [
      { label: 'Durasi Kerja', value: '5 Bulan' },
      { label: 'Target Produksi', value: 'Terpenuhi' },
      { label: 'Kualitas Output', value: 'Standar' },
    ],
    technologies: ['Operasional Produksi', 'Quality Control', 'SOP', 'Kerja Tim'],
    liveUrl: '#',
    repoUrl: '#',
    demoConfig: {
      type: 'spatial',
      primaryMetricLabel: 'Periode Kerja',
      primaryMetricValue: 'Jan – Mei 2026',
      interactiveViews: [
        {
          id: 'produksi',
          name: 'Proses Produksi Harian',
          description: 'Aktivitas produksi dan pengendalian kualitas sehari-hari.',
          kpis: [
            { label: 'Target Harian', value: 'Terpenuhi', delta: 'Konsisten' },
            { label: 'Quality Check', value: 'Lulus', delta: 'Standar' },
            { label: 'Kehadiran', value: '100%', delta: 'Disiplin' },
          ],
          logEntries: [
            '[Produksi] Menjalankan SOP produksi sesuai standar perusahaan',
            '[QC] Pemeriksaan kualitas produk sebelum pengiriman ke distribusi',
            '[Tim] Koordinasi dengan rekan kerja untuk kelancaran alur produksi',
          ],
        },
        {
          id: 'evaluasi',
          name: 'Evaluasi & Pengembangan',
          description: 'Evaluasi kinerja dan pengembangan diri selama bekerja.',
          kpis: [
            { label: 'Penilaian Atasan', value: 'Baik', delta: 'Positif' },
            { label: 'Adaptasi Lingkungan', value: 'Cepat', delta: '< 1 Minggu' },
            { label: 'Inisiatif', value: 'Aktif', delta: 'Diakui' },
          ],
          logEntries: [
            '[Evaluasi] Penilaian kinerja bulanan menunjukkan hasil positif',
            '[Pengembangan] Mempelajari proses produksi secara mandiri dan cepat',
            '[Kontribusi] Memberikan masukan untuk efisiensi alur produksi',
          ],
        },
      ],
    },
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-tkj-smk',
    index: '01',
    title: 'Kompetensi Keahlian Teknik Komputer dan Jaringan',
    issuer: 'SMK Yaspim — Badan Nasional Sertifikasi Profesi (BNSP)',
    issueDate: 'Juni 2020',
    validUntil: 'Seumur Hidup',
    credentialId: 'TKJ-SMKY-2020-FWS',
    category: 'frontend',
    categoryLabel: 'Teknik Komputer & Jaringan',
    image: '/images/mikrotik.jpg',
    examScore: 'Lulus Ujian Kompetensi Keahlian',
    shortExplanation:
      'Sertifikat kompetensi keahlian di bidang Teknik Komputer dan Jaringan yang diperoleh setelah menyelesaikan pendidikan di SMK Yaspim dan lulus ujian kompetensi.',
    detailedExplanation:
      'Sertifikat ini memvalidasi kemampuan di bidang perakitan komputer, instalasi sistem operasi, konfigurasi jaringan LAN/WAN, troubleshooting perangkat keras dan lunak, serta administrasi sistem komputer. Diperoleh setelah 3 tahun pendidikan intensif di program TKJ SMK Yaspim.',
    practicalImpact:
      'Menjadi fondasi utama dalam setiap pekerjaan teknis yang dijalani, mulai dari PKL IT Support di kampus hingga kegiatan instalasi dan perbaikan jaringan di berbagai tempat.',
    competencies: [
      'Perakitan & Perbaikan Komputer',
      'Instalasi Sistem Operasi Windows & Linux',
      'Konfigurasi Jaringan LAN/WAN',
      'Crimping Kabel & Instalasi Infrastruktur Jaringan',
      'Troubleshooting Hardware & Software',
    ],
    verificationUrl: '#',
  },
  {
    id: 'cert-robotik-nasional',
    index: '02',
    title: 'Juara 2 Lomba Robotik Tingkat Nasional',
    issuer: 'United Tractors Jakarta Timur',
    issueDate: '2019',
    validUntil: 'Seumur Hidup (Piagam Prestasi)',
    credentialId: 'UT-ROBOTIK-2019-JKT',
    category: 'architecture',
    categoryLabel: 'Prestasi Nasional',
    image: '/images/juara2.jpg',
    examScore: 'Peringkat 2 dari Seluruh Peserta Nasional',
    shortExplanation:
      'Piagam penghargaan atas pencapaian Juara 2 dalam lomba robotik tingkat nasional yang diselenggarakan oleh United Tractors Jakarta Timur pada tahun 2019.',
    detailedExplanation:
      'Kompetisi robotik nasional yang diikuti oleh peserta dari seluruh Indonesia. Tim SMK Yaspim berhasil meraih Juara 2 melalui proses perancangan, pemrograman, dan uji coba robot yang intensif selama beberapa bulan persiapan.',
    practicalImpact:
      'Merupakan pencapaian paling membanggakan selama masa sekolah, membuktikan kemampuan teknis, kerja sama tim, dan daya saing di tingkat nasional.',
    competencies: [
      'Perancangan Sistem Robotik',
      'Pemrograman Mikrokontroler',
      'Kerja Sama Tim',
      'Problem Solving di Bawah Tekanan',
      'Desain Mekanik Robot',
    ],
    verificationUrl: '#',
  },
  {
    id: 'cert-paskibra',
    index: '03',
    title: 'Pelatih Paskibra',
    issuer: 'Institusi Pendidikan / Organisasi Kepemudaan',
    issueDate: '2022',
    validUntil: 'Aktif',
    credentialId: 'PASKIBRA-2022-FWS',
    category: 'security',
    categoryLabel: 'Kepemimpinan & Organisasi',
    image: '/images/pelatih.jpg',
    examScore: 'Aktif sebagai Pelatih',
    shortExplanation:
      'Pengakuan atas peran aktif sebagai Pelatih Paskibra, memimpin dan membina anggota dalam kegiatan baris-berbaris, kedisiplinan, dan upacara kemerdekaan.',
    detailedExplanation:
      'Berperan sebagai Pelatih Paskibra dengan tanggung jawab melatih keterampilan baris-berbaris, membangun kedisiplinan, dan mempersiapkan anggota untuk tampil dalam upacara resmi. Kegiatan ini memperkuat kemampuan kepemimpinan, komunikasi, dan manajemen kelompok.',
    practicalImpact:
      'Memperkuat kemampuan kepemimpinan dan komunikasi yang diterapkan dalam berbagai pekerjaan, termasuk saat berperan sebagai pengajar dan koordinator administrasi sekolah.',
    competencies: [
      'Kepemimpinan & Pembinaan',
      'Manajemen Kelompok',
      'Komunikasi & Instruksi',
      'Kedisiplinan',
      'Perencanaan Kegiatan',
    ],
    verificationUrl: '#',
  },
  {
    id: 'cert-mahasiswa-aktif',
    index: '04',
    title: 'Mahasiswa Aktif — Sarjana Teknik Informatika',
    issuer: 'Universitas Terbuka',
    issueDate: 'September 2025',
    validUntil: 'Sedang Berjalan',
    credentialId: 'UNIMUH-S1TI-2025-FWS',
    category: 'cloud',
    categoryLabel: 'Pendidikan Tinggi',
    image: '/images/mahasiswa.png',
    examScore: 'Semester Aktif',
    shortExplanation:
      'Terdaftar sebagai mahasiswa aktif program Sarjana Teknik Informatika (Sistem Informasi) di Universitas Terbuka sejak September 2025.',
    detailedExplanation:
      'Melanjutkan pendidikan ke jenjang Sarjana Teknik Informatika untuk memperdalam ilmu di bidang Sistem Informasi, pengembangan perangkat lunak, manajemen database, dan teknologi informasi secara menyeluruh. Menggabungkan pengalaman kerja nyata dengan teori akademis untuk membangun kompetensi IT yang komprehensif.',
    practicalImpact:
      'Memberikan fondasi akademis yang kuat untuk mendukung pengembangan karier di bidang IT, melengkapi pengalaman kerja praktis yang sudah dimiliki sebelumnya.',
    competencies: [
      'Sistem Informasi',
      'Pengembangan Perangkat Lunak',
      'Manajemen Database',
      'Analisis & Perancangan Sistem',
      'Teknologi Informasi Terapan',
    ],
    verificationUrl: '#',
  },
];

export const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: 'exp-1',
    category: 'work',
    categoryLabel: 'Pengalaman Kerja',
    period: 'Jan 2021 — Des 2021',
    title: 'Security',
    organization: 'Perusahaan Keamanan',
    location: 'Cianjur, Jawa Barat',
    summary:
      'Bertugas menjaga keamanan area yang telah ditentukan oleh atasan, memberikan rasa aman dan nyaman bagi customer maupun pengunjung, serta melakukan patroli dan pengecekan rutin.',
    highlights: [
      'Menjaga keamanan area yang sudah ditentukan oleh atasan.',
      'Siap memberi keamanan dan kenyamanan bagi customer atau pengunjung.',
      'Patroli dan pengecekan setiap 2 jam sekali.',
    ],
    credentialMetric: 'Jan 2021 – Des 2021 · 12 Bulan',
  },
  {
    id: 'exp-2',
    category: 'work',
    categoryLabel: 'Pengalaman Kerja',
    period: 'Feb 2022 — Jan 2023',
    title: 'Admin Market Place',
    organization: 'Market Place',
    location: 'Cianjur, Jawa Barat',
    summary:
      'Bertanggung jawab mengatur dan mengelola barang yang masuk dan keluar, memastikan ketersediaan stok, serta mengatur jadwal restock barang.',
    highlights: [
      'Mengatur dan mengelola barang yang masuk dan keluar.',
      'Memastikan barang selalu ready setiap volume.',
      'Mengatur dan menjalankan kapan barang harus restock.',
    ],
    credentialMetric: 'Feb 2022 – Jan 2023 · 11 Bulan',
  },
  {
    id: 'exp-3',
    category: 'work',
    categoryLabel: 'Pengalaman Kerja',
    period: 'Jul 2023 — Jan 2026',
    title: 'Staf Tatausaha dan Pengajar',
    organization: 'Institusi Pendidikan',
    location: 'Cianjur, Jawa Barat',
    summary:
      'Mengelola administrasi sekolah dan mengajar di kelas. Bertanggung jawab atas jadwal guru, surat menyurat siswa, pelaksanaan kegiatan, dan pengajaran mata pelajaran sesuai penugasan.',
    highlights: [
      'Mengatur jam setiap guru-guru.',
      'Membuat surat keluar masuk siswa.',
      'Membuat surat untuk setiap kegiatan, baik secara dinas maupun individual.',
      'Mengajar di kelas sesuai mata pelajaran yang diberikan pihak sekolah.',
    ],
    credentialMetric: 'Jul 2023 – Jan 2026 · 2,5 Tahun',
  },
  {
    id: 'exp-4',
    category: 'work',
    categoryLabel: 'Pengalaman Kerja',
    period: 'Jan 2026 — Mei 2026',
    title: "Operator Produksi",
    organization: "Baker O'ld",
    location: 'Cianjur, Jawa Barat',
    summary:
      "Bekerja sebagai Operator Produksi di Baker O'ld, bertanggung jawab atas jalannya proses produksi sesuai standar dan target yang telah ditetapkan.",
    highlights: [
      'Menjalankan proses produksi sesuai SOP perusahaan.',
      'Memastikan kualitas produk memenuhi standar.',
      'Berkoordinasi dengan tim produksi untuk kelancaran operasional.',
    ],
    credentialMetric: 'Jan 2026 – Mei 2026 · 5 Bulan',
  },
  {
    id: 'edu-1',
    category: 'education',
    categoryLabel: 'Riwayat Pendidikan',
    period: 'Jul 2017 — Jun 2020',
    title: 'Teknik Komputer dan Jaringan (TKJ)',
    organization: 'SMK Yaspim',
    location: 'Cianjur, Jawa Barat',
    summary:
      'Menempuh pendidikan di SMK Yaspim jurusan Teknik Komputer dan Jaringan. Mempelajari perakitan komputer, instalasi jaringan, pemrograman dasar, dan administrasi sistem.',
    highlights: [
      'Jurusan Teknik Komputer dan Jaringan (TKJ).',
      'PKL di Universitas Terbuka sebagai IT Support selama 3 bulan.',
      'Meraih Juara 2 Lomba Robotik Tingkat Nasional (2019).',
    ],
    credentialMetric: 'Lulus 2020 · TKJ',
  },
  {
    id: 'edu-2',
    category: 'education',
    categoryLabel: 'Riwayat Pendidikan',
    period: 'Sep 2025 — Sekarang',
    title: 'Sarjana Teknik Informatika — Sistem Informasi',
    organization: 'Universitas Terbuka',
    location: 'Cianjur, Jawa Barat',
    summary:
      'Melanjutkan pendidikan ke jenjang Sarjana di bidang Teknik Informatika dengan fokus pada Sistem Informasi, untuk memperdalam ilmu dan memperluas kompetensi di dunia IT.',
    highlights: [
      'Program Studi Sistem Informasi.',
      'Aktif mengikuti perkuliahan sambil mengembangkan keterampilan teknis.',
    ],
    credentialMetric: 'Semester Aktif · Sep 2025–Sekarang',
  },
  {
    id: 'ach-1',
    category: 'achievement',
    categoryLabel: 'Prestasi & Pencapaian',
    period: '2019',
    title: 'Juara 2 Lomba Robotik Tingkat Nasional',
    organization: 'United Tractors Jakarta Timur',
    location: 'Jakarta Timur',
    summary:
      'Meraih Juara 2 dalam lomba robotik yang diadakan oleh United Tractors Jakarta Timur, bersaing dengan peserta dari seluruh Indonesia.',
    highlights: [
      'Juara 2 Nasional dari peserta seluruh Indonesia.',
      'Lomba diselenggarakan oleh United Tractors Jakarta Timur.',
    ],
    credentialMetric: 'Juara 2 Nasional · 2019',
  },
  {
    id: 'ach-2',
    category: 'achievement',
    categoryLabel: 'Prestasi & Pencapaian',
    period: '2022',
    title: 'Pelatih Paskibra',
    organization: 'Organisasi Kepemudaan',
    location: 'Cianjur, Jawa Barat',
    summary:
      'Aktif sebagai Pelatih Paskibra, membina anggota dalam keterampilan baris-berbaris, kedisiplinan, dan persiapan upacara kemerdekaan.',
    highlights: [
      'Melatih anggota Paskibra untuk kegiatan resmi dan upacara.',
      'Mengembangkan kemampuan kepemimpinan dan komunikasi.',
    ],
    credentialMetric: 'Aktif sebagai Pelatih · 2022',
  },
  {
    id: 'ach-3',
    category: 'achievement',
    categoryLabel: 'Prestasi & Pencapaian',
    period: '2020',
    title: 'PKL IT Support — Universitas Terbuka',
    organization: 'Universitas Terbuka',
    location: 'Cianjur, Jawa Barat',
    summary:
      'Menyelesaikan Program Kerja Lapangan (PKL) selama 3 bulan sebagai IT Support di Universitas Terbuka dengan nilai sangat baik.',
    highlights: [
      'Menyelesaikan PKL selama 3 bulan dengan penilaian Sangat Baik.',
      'Menangani perawatan komputer, jaringan, dan dukungan teknis kampus.',
    ],
    credentialMetric: 'PKL 3 Bulan · Nilai Sangat Baik',
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    quote:
      'Wegi adalah tenaga yang disiplin dan cepat belajar. Selama menjalani PKL di kampus kami, ia menunjukkan kemampuan teknis yang baik dalam penanganan perangkat keras dan jaringan, serta sikap profesional yang patut dicontoh.',
    author: 'Pembimbing PKL',
    role: 'Supervisor IT',
    organization: 'Universitas Terbuka',
    outcomeMetric: 'Penilaian PKL: Sangat Baik',
  },
  {
    id: 'test-2',
    quote:
      'Selama menjadi Staf Tatausaha, Wegi sangat membantu kelancaran administrasi sekolah. Ia teliti, bertanggung jawab, dan mampu menyelesaikan tugas-tugas administrasi dengan baik sambil juga mengajar dengan penuh dedikasi.',
    author: 'Kepala Sekolah',
    role: 'Pimpinan Institusi',
    organization: 'Institusi Pendidikan',
    outcomeMetric: 'Dedikasi Kerja 2,5 Tahun',
  },
];
