/* ========== buildMock (fallback kalau AI gagal) ========== */
export function buildMock(payload) {
  const {
    namaMadrasah = "Madrasah Mock",
    mataPelajaran = "Mapel Mock",
    fase = "Fase Mock",
    kelas = "X",
    tema = "Tema Mock",
    alokasiWaktu = "2x45'",
    cp = "Capaian pembelajaran",
    profilLulusan = "Bertanggung jawab",
    topikKBC = "Kecintaan lingkungan",
    praktekPedagogik = "Pembelajaran Mendalam (default)",
    tahunAjaran = "2024/2025"
  } = payload || {};

  // ✅ Template literal untuk menyisipkan nilai tema
  const langkahMap = {
    "Pembelajaran Mendalam (default)": [
      `**Memahami:**`,
      `Guru mengaitkan pengetahuan awal siswa dengan konsep baru melalui tanya jawab dan apersepsi tentang ${tema}, murid mendengarkan dan menanggapi pertanyaan guru untuk menggali pengetahuan awal.`,
      `Guru memberikan stimulus berupa teks, gambar, atau video yang relevan dengan ${tema}, murid mengamati stimulus (teks, gambar, video) dan mencatat hal-hal penting.`,
      `Guru menjelaskan konsep inti dan mengarahkan siswa untuk menemukan makna penting dari materi ${tema}, murid mengidentifikasi ide pokok dan mengajukan pertanyaan tentang hal yang belum dipahami.`,
     `**Mengaplikasi:**`,
      `Guru memberikan contoh penerapan konsep ${tema} dalam situasi nyata atau simulasi, murid melakukan kegiatan praktik, eksperimen, atau proyek yang sesuai dengan ${tema}.`,
      `Guru menugaskan murid melakukan kegiatan praktik, eksperimen, atau proyek kecil, murid menggunakan media digital atau alat bantu pembelajaran untuk menerapkan konsep ${tema}.`,
      `Guru membimbing dan memberikan umpan balik selama proses penerapan konsep ${tema}, murid mencatat hasil kegiatan dan mendiskusikan temuan dengan teman atau guru.`,
      `**Merefleksi:**`,
      `Guru memfasilitasi diskusi reflektif di akhir pembelajaran, murid mengemukakan perasaan dan pengalaman selama proses pembelajaran pada topik ${tema}.`,
      `Guru mengajukan pertanyaan pemantik untuk membantu siswa menghubungkan pengalaman belajar dengan nilai atau sikap yang dikembangkan, murid mengidentifikasi hal-hal yang sudah dan belum dipahami.`,
      `Guru memberikan penguatan terhadap sikap, pengetahuan, dan keterampilan yang sudah dikuasai oleh murid, sedangkan murid menyusun kesimpulan dan membuat rencana perbaikan untuk pembelajaran selanjutnya`
    ],

    "Problem Based Learning (PBL)": [
      `**Memahami:**`,
      `Orientasi masalah: Guru menyajikan masalah yang berhubungan dengan ${tema}, murid mengamati dan memahami berbagai masalah ${tema}.`,
      `Organisasi siswa: Guru mengelompokkan siswa dan menjelaskan tugas tiap kelompok, murid membentuk kelompok berdasarkan masalah inti dalam ${tema} dan mendiskusikan perannya masing-masing.`,
      `**Mengaplikasi:**`,
      `Penyelidikan: Guru membimbing siswa mencari data, informasi, atau solusi tentang ${tema}, murid melakukan penyelidikan dengan melibatkan lingkungan belajar dan pemanfaatan digital dalam menyelesaikan ${tema}.`,
      `Presentasi: Guru memfasilitasi penyampaian hasil investigasi setiap kelompok, murid melakukan diskusi antar kelompok dan presentasi hasil sesuai tagihan dari ${tema}.`,
      `**Merefleksi:**`,
      `Refleksi: Guru memberi umpan balik terhadap hasil dan proses pembelajaran, murid menyampaikan perasaan dan pengalaman belajar dan hasil kerja kelompok tentang ${tema}.`
    ],

    "Project Based Learning (PjBL)": [
      `**Memahami:**`,
      `Pendahuluan: Guru mengarahkan murid untuk menemukan ide proyek yang berhubungan dengan ${tema}, murid mengemukakan ide proyek berdasarkan pengalaman dan referensi yang dimiliki tentang ${tema}.`,
      `Perencanaan proyek: Guru membimbing murid membuat rencana kegiatan dan pembagian tugas, murid menyusun rencana kegiatan projek ${tema} berdasarkan ketersediaan alat dan bahan.`,
      `**Mengaplikasi:**`,
      `Pelaksanaan: Guru memantau proses pelaksanaan proyek dan memberikan arahan, murid melaksanakan projek ${tema} sesuai rencana.`,
      `Presentasi: Guru memfasilitasi murid dalam mempresentasikan hasil proyek, murid menyampaikan hasil pengembangan projek ${tema} dan menguji hasilnya.`,
       `**Merefleksi:**`,
      `Refleksi: Guru mengajak murid menganalisis hasil dan proses proyek, murid menyimpulkan hasil kegiatan ${tema} dan menilai hasil karyanya.`
    ],

    "Inquiry Learning": [
       `**Memahami:**`,
      `Orientasi masalah: Guru menghadirkan fenomena yang menimbulkan pertanyaan ilmiah tentang ${tema}, murid engamati fenomena dan mengidentifikasi hal-hal menarik.`,
      `Merumuskan masalah: Guru membimbing murid menyusun rumusan masalah, murid menentukan masalah utama pada ${tema} berdasarkan hasil pengamatan.`,
      `Merumuskan hipotesis: Guru menjelaskan cara membuat dugaan awal yang logis, murid membuat dugaan awal tentang ${tema} sebagai jawaban sementara.`,
      `**Mengaplikasi:**`,
      `Mengumpulkan data: Guru memfasilitasi kegiatan eksperimen, observasi, atau studi literatur, murid melakukan pengumpulan data untuk menjawab persoalan ${tema}.`,
      `Menguji hipotesis: Guru membimbing siswa menganalisis data dan membandingkan dengan hipotesis, murid mengolah dan menganalisis data hasil penelitian tentang ${tema}.`,
      `**Merefleksi:**`,
      `Membuat kesimpulan: Guru memfasilitasi penyusunan kesimpulan dari hasil analisis, murid melakukan presentasi hasil dan kesimpulan dari permasalahan ${tema}.`
    ],

    "LOK-R": [
      `**Memahami:**`,
      `Literasi: Guru memberikan bahan bacaan, video, atau media untuk membangun pengetahuan awal, murid membangun pengetahuan awal melalui membaca, mengamati, dan menulis tentang ${tema}.`,
      `Orientasi: Guru mengarahkan pemahaman murid terhadap ${tema} dan mengaitkannya dengan lingkungan sekitar, murid menghubungkan pengetahuan baru dengan pengalaman sehari-hari.`,
      `**Mengaplikasi:**`,
      `Komunikasi: Guru memfasilitasi diskusi, tanya jawab, atau presentasi hasil analisis, murid menyampaikan hasil analisis, gagasan, atau solusi terhadap masalah ${tema}.`,
      `**Merefleksi:**`,
      `Refleksi: Guru memimpin sesi refleksi untuk mengulas proses dan hasil pembelajaran, murid merefleksikan pengalaman belajar, nilai-nilai yang diperoleh, serta perubahan sikap atau perilaku yang diharapkan sesuai dengan ${tema}.`
    ],

    "Discovery Learning": [
      `**Memahami:**`,
      `Stimulasi: Guru memberikan rangsangan berupa gambar, video, atau pertanyaan untuk menumbuhkan rasa ingin tahu tentang ${tema}, murid mengamati dan menanggapi stimulus yang diberikan.`,
      `Identifikasi masalah: Guru membimbing murid untuk mengidentifikasi masalah dari stimulus, murid mengidentifikasi dan menuliskan persoalan-persoalan yang perlu diselesaikan tentang ${tema}.`,
       `**Mengaplikasi:**`,
      `Pengumpulan data: Guru mengarahkan murid mencari data atau informasi pendukung, murid melakukan observasi dan pengumpulan data dari berbagai sumber tentang ${tema}.`,
      `Pengolahan data: Guru membimbing murid menganalisis data yang terkumpul, murid melakukan analisa dalam bentuk tabel dan diagram tentang sehingga mendapatkan informasi yang bermakna yang berhubungan dengan ${tema}.`,
      `**Merefleksi:**`,
      `Verifikasi: Guru menuntun murid membandingkan hasil dengan teori atau fakta, murid melakukan diskusi tentang kebenaran data ${tema} berdasarkan teori yang sudah ada.`,
      `Generalisasi: Guru menuntun murid menarik kesimpulan dari hasil pembelajaran, murid nyimpulkan dan mempresentasikan hasil kegiatan dalam bentuk laporan akhir tentang ${tema}.`
    ],

    "PAIKEM": [
      `**Memahami:**`,
      `Guru menciptakan suasana belajar yang aktif, inovatif, kreatif, efektif, dan menyenangkan terkait ${tema} dengan mempersiapkan media pembelajaran, alat dan bahan yang dibutuhkan dalam pembelajaran, murid terlibat dalam pengamatan dan eksplorasi awal.`,
      `Guru mengajukan pertanyaan pemantik untuk membangun rasa ingin tahu dan berpikir kritis, murid menyampaikan gagasan awal dan mengaitkannya dengan pengalaman sehari-hari.`,
      `**Mengaplikasi:**`,
      `Guru memfasilitasi aktivitas kolaboratif (diskusi, eksperimen, permainan edukatif), murid bekerja sama menyusun solusi atau produk terkait ${tema}.`,
      `Guru membimbing penyusunan karya/presentasi, murid mengekspresikan kreativitas melalui produk/performance yang relevan dengan ${tema}.`,
      `**Merefleksi:**`,
      `Guru memandu refleksi proses dan hasil belajar, murid mengemukakan pengalaman, tantangan, dan rencana perbaikan terkait ${tema}.`
    ],

    "Cooperative Learning": [
      `**Memahami:**`,
      `Menyajikan informasi: Guru menggunakan berbagai media dalam menjelaskan konsep atau materi yang akan didiskusikan bersama, murid mendengarkan dan mencatat penjelasan guru yang berhubungan dengan konsep ${tema}.`,
      `Membuat kelompok: Guru membagi kelompok baik homogen maupun heterogen berdasarkan topik utama dalam ${tema}, murid bergabung dengan kelompok dan memahami tugas masing-masing.`,
      `**Mengaplikasi:**`,
      `Bimbingan Kelompok: Guru memantau kerja kelompok dan membantu jika ada kesulitan, murid berdiskusi dan menyelesaikan tugas kelompok bersama.`,
      `**Merefleksi:**`,
      `Evaluasi: Guru memberikan peer assessment atau penilaian kelompok tentang ${tema}, murid menyajikan hasil kerja kelompok dan menilai hasil kelompok lain.`,
      `Memberi penghargaan: Guru memberikan apresiasi untuk kelompok/siswa berprestasi baik kelompok maupun individual terkait, murid menerima penghargaan dan memberikan umpan balik positif.`
    ],

    
  };

  const langkah = langkahMap[praktekPedagogik] || langkahMap.default;
  const praktek = String(praktekPedagogik || "").toLowerCase();
  const temaLower = String(tema || "").toLowerCase();
  const cpLower = String(cp || "").toLowerCase();
  

// helper: detect cognitive verb roughly
function detectKognitif(text) {
  const t = String(text || "").toLowerCase();
  if (/\bmenganalisis\b/.test(t) || /\banalysis\b/.test(t)) return "menganalisis";
  if (/\bmengidentifikasi\b/.test(t) || /\bidentif/i.test(t)) return "mengidentifikasi";
  if (/\bmenerapkan\b/.test(t) || /\bmengaplikasikan\b/.test(t)) return "menerapkan";
  if (/\bmencipta\b/.test(t) || /\bmengkreasi\b/.test(t) || /\bcreate\b/.test(t)) return "mencipta";
  if (/\bmenginterpretasi\b/.test(t) || /\binterpret/i.test(t)) return "menginterpretasi";
  // default
  return "memahami";
}

// helper: theme categories
function isTema(...keywords) {
  return keywords.some(k => temaLower.includes(k));
}

// helper: detect madrasah-religious themes
function isMadrasahTheme() {
  const madrasahKeys = ["wudhu", "shalat", "sholat", "zakat", "puasa", "quran", "alquran", "tajwid", "akhlak", "iman", "ibadah", "adab", "dzikir"];
  return madrasahKeys.some(k => temaLower.includes(k));
}

const levelKognitif = detectKognitif(cpLower);

// empty dynamic holders
let dynamicLingkungan = null;
let dynamicMitra = null;
let dynamicDigital = null;

// =====================
// Model-specific logic
// =====================

// INQUIRY (suitable for investigative/explorative themes)
if (praktek.includes("inquiry") || praktek.includes("inQUIRY".toLowerCase())) {
  // broadened theme matches for scientific/investigative topics
  if (isTema("wujud", "benda", "materi", "energi", "perubahan", "reaksi", "sifat", "ekosistem", "lingkungan")) {
    dynamicLingkungan = [
      `Lingkungan kelas sebagai ruang eksplorasi awal konsep dan diskusi hipotesis.`,
      `Lingkungan nyata melalui observasi langsung fenomena terkait ${tema}.`,
      `Lingkungan digital berbasis simulasi interaktif untuk ${levelKognitif} fenomena ${tema}.`
    ];
    dynamicMitra = [
      `Teman sebaya sebagai kolaborator dalam pengujian hipotesis dan eksperimen kecil.`,
      `Sumber belajar kontekstual (buku, modul eksperimen sederhana, bahan ajar terverifikasi).`,
      `Kelompok diskusi untuk refleksi dan validasi temuan.`
    ];
    dynamicDigital = [
      `Simulasi digital interaktif untuk mencoba variasi percobaan dan melihat hasil hipotesis.`,
      `Visualisasi ilmiah dan literasi data untuk menganalisis hasil pengamatan.`,
      `Ruang diskusi daring untuk dokumentasi refleksi dan pembandingan temuan.`
    ];
  } else if (isMadrasahTheme()) {
    // inquiry applied to religious/madrasah topics: reflective / experiential inquiry
    dynamicLingkungan = [
      `Lingkungan kelas sebagai ruang dialog dan kajian teks keagamaan.`,
      `Lingkungan nyata melalui praktik ritual/ibadah atau observasi nilai-nilai adab dalam kehidupan sehari-hari.`,
      `Lingkungan digital untuk eksplorasi teks, dokumentasi pengalaman, dan refleksi bersama.`
    ];
    dynamicMitra = [
      `Teman sebaya untuk diskusi kelompok dan praktik simulasi ritual/ibadah.`,
      `Sumber rujukan keagamaan yang terpercaya (kitab, penjelasan singkat, modul pembelajaran).`,
      `Komunitas atau tokoh lokal sebagai sumber pengalaman kontekstual.`
    ];
    dynamicDigital = [
      `Media pembelajaran digital untuk studi teks dan refleksi terstruktur.`,
      `Visualisasi proses ibadah/ritual untuk observasi dan perbaikan praktik.`,
      `Platform dokumentasi untuk menyimpan refleksi dan evidensi pembelajaran.`
    ];
  } else {
    // generic inquiry fallback
    dynamicLingkungan = [
      `Lingkungan kelas sebagai ruang tanya jawab dan eksplorasi konsep.`,
      `Lingkungan nyata sesuai konteks tema untuk observasi langsung.`,
      `Lingkungan digital untuk eksperimen virtual dan dokumentasi.`
    ];
    dynamicMitra = [
      `Teman sebaya untuk kerja kolaboratif dan uji hipotesis.`,
      `Sumber belajar relevan untuk referensi dan banding hasil.`,
      `Kelompok diskusi untuk refleksi hasil pembelajaran.`
    ];
    dynamicDigital = [
      `Sumber multimedia untuk pengayaan dan visualisasi konsep.`,
      `Simulasi dasar untuk memperlihatkan fenomena yang sulit diamati langsung.`,
      `Ruang kolaborasi daring untuk berbagi hasil dan refleksi.`
    ];
  }
}

// PBL (Problem Based Learning)
else if (praktek.includes("problem") || praktek.includes("pbl")) {
  dynamicLingkungan = [
    `Lingkungan nyata yang relevan dengan masalah kontekstual tema ${tema}.`,
    `Lingkungan kelas sebagai pusat perencanaan dan evaluasi solusi.`,
    `Lingkungan digital untuk riset, pengumpulan bukti, dan presentasi solusi.`
  ];
  dynamicMitra = [
    `Kelompok sebaya sebagai tim pemecahan masalah.`,
    `Mitra eksternal sesuai masalah (komunitas, industri, atau praktisi lokal).`,
    `Sumber data dan referensi untuk analisis masalah.` 
  ];
  dynamicDigital = [
    `Media dokumentasi dan presentasi hasil solusi.`,
    `Alat bantu analisis sederhana dan literatur daring untuk riset.`,
    `Platform kolaborasi untuk manajemen tugas tim.` 
  ];
}

// Project Based Learning (PjBL)
else if (praktek.includes("project") || praktek.includes("pjbl") || praktek.includes("pjbl".toLowerCase())) {
  dynamicLingkungan = [
    `Lingkungan nyata untuk pelaksanaan proyek dan pengujian produk.`,
    `Lingkungan kelas sebagai ruang perencanaan, prototyping, dan presentasi.`,
    `Lingkungan digital untuk dokumentasi proyek dan kolaborasi jarak jauh.`
  ];
  dynamicMitra = [
    `Rekan kelompok sebagai kolaborator berperan pada setiap fase proyek.`,
    `Mitra komunitas atau eksternal yang relevan dengan tujuan proyek.`,
    `Sumber bahan dan dokumentasi teknis untuk pengembangan produk.` 
  ];
  dynamicDigital = [
    `Alat dokumentasi digital untuk merekam proses dan hasil proyek.`,
    `Platform kolaborasi daring untuk pembagian tugas dan revisi karya.`,
    `Sumber referensi digital untuk pengayaan proyek.` 
  ];
}

// Discovery Learning
else if (praktek.includes("discovery")) {
  dynamicLingkungan = [
    `Lingkungan kelas untuk stimulasi awal dan kegiatan pemecahan masalah.`,
    `Lingkungan nyata untuk eksplorasi dan pengumpulan data lapangan.`,
    `Lingkungan digital sebagai pendukung riset mandiri dan presentasi temuan.`
  ];
  dynamicMitra = [
    `Teman sebaya untuk kolaborasi penemuan dan diskusi ide.`,
    `Sumber eksperimen sederhana untuk pembuktian temuan.`,
    `Kelompok refleksi untuk verifikasi dan generalisasi hasil.` 
  ];
  dynamicDigital = [
    `Sumber multimedia untuk memicu rasa ingin tahu dan eksplorasi.`,
    `Simulasi yang memungkinkan penemuan pola secara mandiri.`,
    `Platform dokumentasi untuk menyusun laporan penemuan.` 
  ];
}

// Cooperative Learning
else if (praktek.includes("cooperative")) {
  dynamicLingkungan = [
    `Lingkungan kelas yang diorganisir untuk kerja kelompok terstruktur.`,
    `Lingkungan nyata untuk pertukaran peran dan pembelajaran kontekstual.`,
    `Lingkungan digital untuk koordinasi dan pengiriman tugas kelompok.` 
  ];
  dynamicMitra = [
    `Teman sebaya sebagai rekan belajar dalam struktur kelompok.`,
    `Pengelola komunitas atau fasilitator eksternal saat diperlukan.`,
    `Sumber referensi untuk tugas kolaboratif.` 
  ];
  dynamicDigital = [
    `Ruang kolaborasi daring untuk koordinasi dan refleksi kelompok.`,
    `Media presentasi digital untuk menampilkan hasil kerja bersama.`,
    `Sumber pembelajaran berbasis tugas untuk pengayaan materi.` 
  ];
}

// LOK-R (Literasi, Orientasi, Komunikasi, Refleksi)
else if (praktek.includes("lok")) {
  if (isMadrasahTheme()) {
    dynamicLingkungan = [
      `Lingkungan kelas untuk pengembangan literasi keagamaan dan orientasi nilai.`,
      `Lingkungan nyata melalui praktik kehidupan beriman dan adab sehari-hari.`,
      `Lingkungan digital untuk akses teks dan sumber rujukan keagamaan.` 
    ];
    dynamicMitra = [
      `Teman sebaya untuk diskusi reflektif dan pembacaan teks.`,
      `Sumber kontekstual (kitab/terjemah/sumber rujukan) untuk kajian literasi.`,
      `Kelompok kajian untuk praktik komunikasi dan refleksi nilai.` 
    ];
    dynamicDigital = [
      `Platform literasi digital untuk mengakses teks dan penjelasan ilmiah.`,
      `Visualisasi materi keagamaan untuk memahami praktik dan konteksnya.`,
      `Ruang dokumentasi refleksi keagamaan.` 
    ];
  } else {
    dynamicLingkungan = [
      `Lingkungan kelas untuk pengembangan literasi dan diskusi awal konsep.`,
      `Lingkungan nyata untuk praktik orientasi terhadap fenomena lokal.`,
      `Lingkungan digital untuk mendukung kegiatan literasi dan komunikasi.` 
    ];
    dynamicMitra = [
      `Teman sebaya untuk kolaborasi literasi dan komunikasi.`,
      `Sumber rujukan relevan untuk pengayaan materi.`,
      `Kelompok kecil untuk praktik komunikasi dan refleksi.` 
    ];
    dynamicDigital = [
      `Sumber teks digital untuk pembelajaran literasi.`,
      `Media presentasi untuk komunikasi gagasan.`,
      `Ruang diskusi daring untuk umpan balik.`
    ];
  }
}

// helper: theme categories
function isTema(...keywords) {
  return keywords.some(k => temaLower.includes(k));
}

// helper: detect madrasah-religious themes
function isMadrasahTheme() {
  const madrasahKeys = ["wudhu", "shalat", "sholat", "zakat", "puasa", "quran", "alquran", "tajwid", "akhlak", "iman", "ibadah", "adab", "dzikir"];
  return madrasahKeys.some(k => temaLower.includes(k));
}


// =====================
// Model-specific logic
// =====================

// INQUIRY (suitable for investigative/explorative themes)
if (praktek.includes("inquiry") || praktek.includes("inQUIRY".toLowerCase())) {
  // broadened theme matches for scientific/investigative topics
  if (isTema("wujud", "benda", "materi", "energi", "perubahan", "reaksi", "sifat", "ekosistem", "lingkungan")) {
    dynamicLingkungan = [
      `Lingkungan kelas sebagai ruang eksplorasi awal konsep dan diskusi hipotesis.`,
      `Lingkungan nyata melalui observasi langsung fenomena terkait ${tema}.`,
      `Lingkungan digital berbasis simulasi interaktif untuk ${levelKognitif} fenomena ${tema}.`
    ];
    dynamicMitra = [
      `Teman sebaya sebagai kolaborator dalam pengujian hipotesis dan eksperimen kecil.`,
      `Sumber belajar kontekstual (buku, modul eksperimen sederhana, bahan ajar terverifikasi).`,
      `Kelompok diskusi untuk refleksi dan validasi temuan.`
    ];
    dynamicDigital = [
      `Simulasi digital interaktif untuk mencoba variasi percobaan dan melihat hasil hipotesis.`,
      `Visualisasi ilmiah dan literasi data untuk menganalisis hasil pengamatan.`,
      `Ruang diskusi daring untuk dokumentasi refleksi dan pembandingan temuan.`
    ];
  } else if (isMadrasahTheme()) {
    // inquiry applied to religious/madrasah topics: reflective / experiential inquiry
    dynamicLingkungan = [
      `Lingkungan kelas sebagai ruang dialog dan kajian teks keagamaan.`,
      `Lingkungan nyata melalui praktik ritual/ibadah atau observasi nilai-nilai adab dalam kehidupan sehari-hari.`,
      `Lingkungan digital untuk eksplorasi teks, dokumentasi pengalaman, dan refleksi bersama.`
    ];
    dynamicMitra = [
      `Teman sebaya untuk diskusi kelompok dan praktik simulasi ritual/ibadah.`,
      `Sumber rujukan keagamaan yang terpercaya (kitab, penjelasan singkat, modul pembelajaran).`,
      `Komunitas atau tokoh lokal sebagai sumber pengalaman kontekstual.`
    ];
    dynamicDigital = [
      `Media pembelajaran digital untuk studi teks dan refleksi terstruktur.`,
      `Visualisasi proses ibadah/ritual untuk observasi dan perbaikan praktik.`,
      `Platform dokumentasi untuk menyimpan refleksi dan evidensi pembelajaran.`
    ];
  } else {
    // generic inquiry fallback
    dynamicLingkungan = [
      `Lingkungan kelas sebagai ruang tanya jawab dan eksplorasi konsep.`,
      `Lingkungan nyata sesuai konteks tema untuk observasi langsung.`,
      `Lingkungan digital untuk eksperimen virtual dan dokumentasi.`
    ];
    dynamicMitra = [
      `Teman sebaya untuk kerja kolaboratif dan uji hipotesis.`,
      `Sumber belajar relevan untuk referensi dan banding hasil.`,
      `Kelompok diskusi untuk refleksi hasil pembelajaran.`
    ];
    dynamicDigital = [
      `Sumber multimedia untuk pengayaan dan visualisasi konsep.`,
      `Simulasi dasar untuk memperlihatkan fenomena yang sulit diamati langsung.`,
      `Ruang kolaborasi daring untuk berbagi hasil dan refleksi.`
    ];
  }
}

// PBL (Problem Based Learning)
else if (praktek.includes("problem") || praktek.includes("pbl")) {
  dynamicLingkungan = [
    `Lingkungan nyata yang relevan dengan masalah kontekstual tema ${tema}.`,
    `Lingkungan kelas sebagai pusat perencanaan dan evaluasi solusi.`,
    `Lingkungan digital untuk riset, pengumpulan bukti, dan presentasi solusi.`
  ];
  dynamicMitra = [
    `Kelompok sebaya sebagai tim pemecahan masalah.`,
    `Mitra eksternal sesuai masalah (komunitas, industri, atau praktisi lokal).`,
    `Sumber data dan referensi untuk analisis masalah.` 
  ];
  dynamicDigital = [
    `Media dokumentasi dan presentasi hasil solusi.`,
    `Alat bantu analisis sederhana dan literatur daring untuk riset.`,
    `Platform kolaborasi untuk manajemen tugas tim.` 
  ];
}

// Project Based Learning (PjBL)
else if (praktek.includes("project") || praktek.includes("pjbl") || praktek.includes("pjbl".toLowerCase())) {
  dynamicLingkungan = [
    `Lingkungan nyata untuk pelaksanaan proyek dan pengujian produk.`,
    `Lingkungan kelas sebagai ruang perencanaan, prototyping, dan presentasi.`,
    `Lingkungan digital untuk dokumentasi proyek dan kolaborasi jarak jauh.`
  ];
  dynamicMitra = [
    `Rekan kelompok sebagai kolaborator berperan pada setiap fase proyek.`,
    `Mitra komunitas atau eksternal yang relevan dengan tujuan proyek.`,
    `Sumber bahan dan dokumentasi teknis untuk pengembangan produk.` 
  ];
  dynamicDigital = [
    `Alat dokumentasi digital untuk merekam proses dan hasil proyek.`,
    `Platform kolaborasi daring untuk pembagian tugas dan revisi karya.`,
    `Sumber referensi digital untuk pengayaan proyek.` 
  ];
}

// Discovery Learning
else if (praktek.includes("discovery")) {
  dynamicLingkungan = [
    `Lingkungan kelas untuk stimulasi awal dan kegiatan pemecahan masalah.`,
    `Lingkungan nyata untuk eksplorasi dan pengumpulan data lapangan.`,
    `Lingkungan digital sebagai pendukung riset mandiri dan presentasi temuan.`
  ];
  dynamicMitra = [
    `Teman sebaya untuk kolaborasi penemuan dan diskusi ide.`,
    `Sumber eksperimen sederhana untuk pembuktian temuan.`,
    `Kelompok refleksi untuk verifikasi dan generalisasi hasil.` 
  ];
  dynamicDigital = [
    `Sumber multimedia untuk memicu rasa ingin tahu dan eksplorasi.`,
    `Simulasi yang memungkinkan penemuan pola secara mandiri.`,
    `Platform dokumentasi untuk menyusun laporan penemuan.` 
  ];
}

// Cooperative Learning
else if (praktek.includes("cooperative")) {
  dynamicLingkungan = [
    `Lingkungan kelas yang diorganisir untuk kerja kelompok terstruktur.`,
    `Lingkungan nyata untuk pertukaran peran dan pembelajaran kontekstual.`,
    `Lingkungan digital untuk koordinasi dan pengiriman tugas kelompok.` 
  ];
  dynamicMitra = [
    `Teman sebaya sebagai rekan belajar dalam struktur kelompok.`,
    `Pengelola komunitas atau fasilitator eksternal saat diperlukan.`,
    `Sumber referensi untuk tugas kolaboratif.` 
  ];
  dynamicDigital = [
    `Ruang kolaborasi daring untuk koordinasi dan refleksi kelompok.`,
    `Media presentasi digital untuk menampilkan hasil kerja bersama.`,
    `Sumber pembelajaran berbasis tugas untuk pengayaan materi.` 
  ];
}

// LOK-R (Literasi, Orientasi, Komunikasi, Refleksi)
else if (praktek.includes("lok")) {
  if (isMadrasahTheme()) {
    dynamicLingkungan = [
      `Lingkungan kelas untuk pengembangan literasi keagamaan dan orientasi nilai.`,
      `Lingkungan nyata melalui praktik kehidupan beriman dan adab sehari-hari.`,
      `Lingkungan digital untuk akses teks dan sumber rujukan keagamaan.` 
    ];
    dynamicMitra = [
      `Teman sebaya untuk diskusi reflektif dan pembacaan teks.`,
      `Sumber kontekstual (kitab/terjemah/sumber rujukan) untuk kajian literasi.`,
      `Kelompok kajian untuk praktik komunikasi dan refleksi nilai.` 
    ];
    dynamicDigital = [
      `Platform literasi digital untuk mengakses teks dan penjelasan ilmiah.`,
      `Visualisasi materi keagamaan untuk memahami praktik dan konteksnya.`,
      `Ruang dokumentasi refleksi keagamaan.` 
    ];
  } else {
    dynamicLingkungan = [
      `Lingkungan kelas untuk pengembangan literasi dan diskusi awal konsep.`,
      `Lingkungan nyata untuk praktik orientasi terhadap fenomena lokal.`,
      `Lingkungan digital untuk mendukung kegiatan literasi dan komunikasi.` 
    ];
    dynamicMitra = [
      `Teman sebaya untuk kolaborasi literasi dan komunikasi.`,
      `Sumber rujukan relevan untuk pengayaan materi.`,
      `Kelompok kecil untuk praktik komunikasi dan refleksi.` 
    ];
    dynamicDigital = [
      `Sumber teks digital untuk pembelajaran literasi.`,
      `Media presentasi untuk komunikasi gagasan.`,
      `Ruang diskusi daring untuk umpan balik.`
    ];
  }
}  

// === Pembelajaran Mendalam (default) — reflektif elegan untuk SEMUA tema ===
else if (praktek.includes("mendalam")) {
  dynamicLingkungan = [
    `Lingkungan belajar yang mendorong perenungan makna mendalam dari konsep ${tema} dan relevansinya dengan kehidupan.`,
    `Lingkungan nyata atau pengalaman kontekstual yang memungkinkan murid menghubungkan ${tema} dengan realitas sosial, emosional, atau spiritual.`,
    `Lingkungan digital untuk eksplorasi pemaknaan konseptual dan refleksi mandiri terhadap ${tema}.`
  ];
  dynamicMitra = [
    `Teman sebaya sebagai mitra dialog reflektif untuk menggali makna terdalam dari ${tema}.`,
    `Sumber inspiratif (bacaan, kisah, atau fenomena nyata) yang memperkaya pemahaman kritis dan nilai ${tema}.`,
    `Komunitas belajar atau lingkungan sosial yang relevan sebagai cermin perubahan sikap terhadap ${tema}.`
  ];
  dynamicDigital = [
    `Media reflektif digital untuk mengeksplorasi perspektif yang lebih luas terhadap ${tema}.`,
    `Ruang dokumentasi pengalaman belajar untuk mencatat pemahaman personal dan transformasi diri.`,
    `Platform pembelajaran daring untuk memperdalam penalaran dan refleksi terhadap konteks ${tema}.`
  ];
}

// === Perkuat deteksi PAIKEM agar fleksibel (case-insensitive elegan) ===
else if (praktek.includes("paikem")) {
  dynamicLingkungan = [
    `Lingkungan belajar yang aktif dan elegan untuk mengeksplorasi ide ${tema} secara kreatif dan kritis.`,
    `Lingkungan nyata sebagai sumber inspirasi pengalaman pembelajaran langsung terkait ${tema}.`,
    `Lingkungan digital untuk mengembangkan kreativitas, elaborasi ide, dan kolaborasi inovatif terkait ${tema}.`
  ];
  dynamicMitra = [
    `Teman sebaya sebagai kolaborator untuk merancang ide dan menyampaikan gagasan secara menarik.`,
    `Sumber inspiratif (visual, literasi, atau fenomena nyata) untuk memperkaya kreativitas terhadap ${tema}.`,
    `Komunitas pembelajaran atau narasumber kontekstual sebagai penguat relevansi ide ${tema}.`
  ];
  dynamicDigital = [
    `Media interaktif untuk memfasilitasi elaborasi ide dan ekspresi kreatif murid terkait ${tema}.`,
    `Platform eksplorasi digital untuk menemukan inspirasi dan solusi inovatif terhadap ${tema}.`,
    `Ruang dokumentasi digital untuk menampilkan karya reflektif dan impresif tentang ${tema}.`
  ];
}

const finalLingkungan = dynamicLingkungan;
const finalMitra = dynamicMitra;
const finalDigital = dynamicDigital;

  return {
    identitas: {
      Judul: "RPP Integrasi Pembelajaran Mendalam dan KBC",
      "Nama Madrasah": namaMadrasah,
      "Mata Pelajaran": mataPelajaran,
      Fase: fase,
      Kelas: kelas,
      Tema: tema,
      "Tahun Ajaran": tahunAjaran,
      "Alokasi Waktu": alokasiWaktu,
      "Profil Lulusan": profilLulusan,
      "Topik KBC": topikKBC
    },
    capaian_pembelajaran: cp,
    tujuan_pembelajaran: [
      `Setelah mengikuti kegiatan pembelajaran, murid mampu memahami dan mengaplikasikan konsep dasar ${tema} sebagai bagian dari penerapan bentuk ${topikKBC} dengan penuh ${profilLulusan}.`
    ],
    indikator_tujuan_pembelajaran: [
      `Mengidentifikasi konsep dari ${tema} sebagai wujud ${topikKBC}.`,
      `Menerapkan konsep ${tema} pada kasus nyata dengan dengan sikap ${profilLulusan}.`,
      `Menunjukkan rasa ${topikKBC} dengan mengaplikasikan konsep ${tema}.`,
      `Merefleksi hasil pembelajaran ${tema} sebagai aktualisasi karakter ${profilLulusan}.`
    ],
    materi_insersi_KBC: `Mengimplementasikan ${tema} melalui penerapan ${topikKBC}.`,
    praktek_pedagogik: { model: praktekPedagogik },
    lingkungan_pembelajaran: finalLingkungan,
    mitra_pembelajaran: finalMitra,
    pemanfaatan_digital: finalDigital,
    kegiatan_pembuka: [
      "Guru mengucapkan salam kepada peserta didik.",
      "Guru mengajak peserta didik berdoa bersama sesuai agama dan keyakinan masing-masing.",
      "Guru melakukan presensi dan memastikan kesiapan belajar murid.",
      "Guru menyampaikan tujuan pembelajaran secara jelas dan eksplisit.",
      "Guru memberikan motivasi awal agar murid menyadari makna dan urgensi pembelajaran hari ini.",
      "Guru melakukan ice breaking ringan yang relevan untuk menciptakan suasana belajar yang positif."
    ],
    kegiatan_inti: langkah,
    kegiatan_penutup: [
      "Guru membimbing peserta didik melakukan refleksi terhadap pembelajaran hari ini.",
      "Guru meminta peserta didik menyampaikan kesimpulan atau pemahaman inti yang diperoleh.",
      "Guru memberikan apresiasi dan penguatan atas proses belajar yang berlangsung.",
      "Guru menyampaikan tindak lanjut atau pengayaan untuk pembelajaran berikutnya.",
      "Guru mengajak peserta didik berdoa penutup sesuai agama dan keyakinan masing-masing.",
      "Guru menutup pembelajaran dengan salam penutup."
    ],
    pengalaman_murid: ["memahami, mengaplikasi, dan merefleksi"],
    
    asesmen_formatif: {
      tes_tulis: [
        `Bagaimana caramu menunjukkan pemahaman tentang ${tema}?`,
        `Dalam kondisi atau keadaan apa konsep ${tema} dapat diimplementasikan?`,
        `Sebutkan hal-hal baru yang menarik tentang ${tema}!`
      ],
      observasi: "Partisipasi siswa",
      produk: "Laporan/tugas proyek"
    },
    rubrik_penilaian: {
      skala: "1-4",
      kriteria: { 4: "Sangat baik", 3: "Baik", 2: "Cukup", 1: "Kurang" }
    },
    lembar_kerja: {
  tujuan: `Memastikan target ketercapaian ${cp}`,
  tugas: `Kerjakan soal/tugas dengan ${profilLulusan}`,
  urutan_kerja: "Catatlah setiap tahapan kegiatan pembelajaran yang kamu lakukan, berilah penanda pada poin penting yang dicapai",

  // ✅ rubrik tetap STRING agar FRONTEND TIDAK ERROR
  rubrik: `Catatlah keterlibatan Anda dalam setiap tahapan kegiatan pembelajaran pada Kegiatan Inti menggunakan skala 1–4 secara jujur.`,

  // ✅ tabel_penilaian_diri ditambahkan terpisah, tidak mengubah struktur lama
  tabel_penilaian_diri: {
    instruksi: `Isilah tabel penilaian diri berikut berdasarkan keterlibatan Anda dalam setiap tahapan kegiatan pada Kegiatan Inti, gunakan skala 1–4 secara jujur.`,
    skala: "1-4",
    indikator: langkah
      .filter((x) => !x.startsWith("**"))
      .map((x) => {
    let clean = x.replace(/\*\*/g, "").trim();
    let titleOnly = clean.split(":")[0].trim();
    return `Keterlibatan dalam kegiatan: ${titleOnly}`;
  }),
},
};
}
