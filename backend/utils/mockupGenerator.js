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
      `**Merefleksii:**`,
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
      `**Merefleksii:**`,
      `Refleksi: Guru memberi umpan balik terhadap hasil dan proses pembelajaran, murid menyampaikan perasaan dan pengalaman belajar dan hasil kerja kelompok tentang ${tema}.`
    ],

    "Project Based Learning (PjBL)": [
      `**Memahami:**`,
      `Pendahuluan: Guru mengarahkan murid untuk menemukan ide proyek yang berhubungan dengan ${tema}, murid mengemukakan ide proyek berdasarkan pengalaman dan referensi yang dimiliki tentang ${tema}.`,
      `Perencanaan proyek: Guru membimbing murid membuat rencana kegiatan dan pembagian tugas, murid menyusun rencana kegiatan projek ${tema} berdasarkan ketersediaan alat dan bahan.`,
      `**Mengaplikasii:**`,
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
  const cpLower   = String(cp || "").toLowerCase();

  // deteksi soft level kognitif dari CP
  let levelKognitif = "memahami";
  if (cpLower.includes("menganalisis")) levelKognitif = "menganalisis";
  else if (cpLower.includes("mengidentifikasi")) levelKognitif = "mengidentifikasi";
  else if (cpLower.includes("menerapkan")) levelKognitif = "menerapkan";
  else if (cpLower.includes("mencipta") || cpLower.includes("mengkreasi")) levelKognitif = "mencipta";

  // generate isi dinamis (boleh campur fallback)
  let dynamicLingkungan = null;
  let dynamicMitra = null;
  let dynamicDigital = null;

  if (praktek.includes("inquiry") && temaLower.includes("wujud")) {
    dynamicLingkungan = [
      `Lingkungan kelas sebagai ruang eksplorasi awal konsep perubahan wujud benda.`,
      `Lingkungan nyata melalui observasi langsung fenomena ${tema}.`,
      `Lingkungan digital berbasis simulasi interaktif untuk ${levelKognitif} proses perubahan wujud benda.`
    ];

    dynamicMitra = [
      `Teman sebaya sebagai kolaborator dalam pengujian hipotesis.`,
      `Narasumber lokal atau sumber belajar kontekstual sesuai fenomena perubahan wujud benda.`,
      `Komunitas belajar atau kelompok diskusi eksploratif secara terstruktur.`
    ];

    dynamicDigital = [
      `Media digital berbasis simulasi interaktif untuk ${levelKognitif} konsep perubahan wujud benda.`,
      `Literasi digital melalui eksplorasi visual ilmiah dan pengamatan hasil percobaan.`,
      `Platform pembelajaran daring untuk dokumentasi refleksi dan diskusi investigatif.`
    ];
  }

  // siapkan integrasi final (boleh fallback ke nilai default)
  const finalLingkungan = dynamicLingkungan || [
    "Lingkungan kelas", "Lingkungan nyata", "Lingkungan digital"
  ];
  const finalMitra = dynamicMitra || [
    "Guru", "Teman sebaya", "Komunitas"
  ];
  const finalDigital = dynamicDigital || [
    "Video", "Slide presentasi", "Laboratorium virtual", "Quiz interaktif"
  ];  

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
    langkah_pembelajaran: langkah,
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
      rubrik: `Buatlah tabel pengukuran ${profilLulusan} dan ${topikKBC} dengan menggunakan skala 1-4, Lakukan refleksi jujur berdasarkan keterlibatan dalam proses pembelajaran.`
    }
  };
}
