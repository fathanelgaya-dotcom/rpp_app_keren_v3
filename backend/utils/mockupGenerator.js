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
      `**Orientasi masalah:**`,
      `Guru memunculkan permasalahan kontekstual yang dekat dengan kehidupan murid terkait ${tema} melalui cerita, gambar, atau video sederhana.`,
      `Guru mengajak murid mengamati situasi masalah dengan arahan pertanyaan pemantik.`,
      `Murid menyebutkan hal-hal yang mereka lihat, dengar, atau ketahui dari permasalahan ${tema}.`,
      `Guru membantu murid merumuskan masalah utama secara lisan dengan bahasa sederhana.`,
      `Murid menyepakati masalah yang akan dipelajari bersama sebagai fokus pembelajaran.`,
      `**Organisasi siswa:**`,
      `Guru membagi murid ke dalam kelompok kecil secara heterogen.`,
      `Guru menjelaskan tujuan kegiatan, aturan kerja kelompok, dan hasil yang diharapkan.`,
      `Guru membantu murid menentukan peran sederhana dalam kelompok (misalnya pencatat, penyaji, pengamat).`,
      `Murid berdiskusi singkat untuk memahami tugas kelompok terkait pemecahan masalah ${tema}.`,
      `Murid menyiapkan alat dan bahan yang diperlukan untuk kegiatan penyelidikan.`,
      `**Mengaplikasi:**`,
      `**Penyelidikan:**`,
      `Guru membimbing murid merumuskan pertanyaan sederhana untuk mencari solusi dari masalah ${tema}.`,
      `Guru mengarahkan murid melakukan pengamatan, percobaan sederhana, atau pengumpulan informasi dari lingkungan sekitar.`,
      `Murid mengumpulkan data melalui pengamatan langsung, buku bergambar, atau media digital sederhana.`,
      `Guru mendampingi murid mencatat hasil temuan dengan gambar, simbol, atau kalimat sederhana.`,
      `Murid mendiskusikan hasil penyelidikan dalam kelompok untuk menemukan solusi masalah ${tema}.`,
      `**Pengembangan Solusi:**`,
      `Guru mengajak murid menghubungkan hasil penyelidikan dengan kemungkinan solusi yang dapat dilakukan.`,
      `Murid mengemukakan ide solusi berdasarkan hasil pengamatan dan diskusi kelompok.`,
      `Guru membantu murid memilih solusi yang paling sesuai dan realistis untuk diterapkan.`,
      `Murid menyusun solusi dalam bentuk cerita, gambar, atau model sederhana.`,
      `Guru memberikan penguatan terhadap ide-ide kreatif dan logis yang muncul dari murid.`,
      `**Presentasi:**`, 
      `Guru memfasilitasi murid menyiapkan presentasi sederhana hasil kerja kelompok.`,
      `Murid menyampaikan hasil penyelidikan dan solusi yang diusulkan secara bergiliran.`,
      `Guru membimbing murid lain untuk mendengarkan dan memberikan tanggapan sederhana.`,
      `Murid saling menghargai pendapat dan hasil kerja kelompok lain.`,
      `Guru memberikan klarifikasi dan penguatan terhadap konsep ${tema} yang dipelajari.`,
      `**Merefleksi:**`,
      `**Refleksi:**`,
      `Guru mengajak murid merefleksi kembali proses pembelajaran yang telah dilakukan.`,
      `Murid mengungkapkan perasaan, pengalaman, dan hal yang paling berkesan selama kegiatan.`,
      `Guru mengajukan pertanyaan reflektif tentang manfaat pembelajaran terkait ${tema}.`,
      `Murid menyebutkan hal baru yang mereka pelajari dan pahami dari kegiatan tersebut.`,
      `Guru memberikan umpan balik, apresiasi, dan penguatan nilai karakter yang muncul selama pembelajaran.`,
    ],

    "Project Based Learning (PjBL)": [
  `**Memahami:**`,
  `**Pendahuluan:**`,
  `Guru memunculkan konteks atau permasalahan yang berkaitan dengan ${tema} melalui cerita, gambar, atau contoh nyata.`,
  `Guru mengajukan pertanyaan pemantik untuk menggali pemahaman awal murid tentang ${tema}.`,
  `Murid mengamati, mendengarkan, dan menyampaikan pendapat awal terkait ${tema}.`,
  `Guru mengarahkan murid untuk mengaitkan permasalahan dengan kemungkinan proyek yang dapat dilakukan.`,
  `Murid mengemukakan ide proyek sederhana berdasarkan pengalaman dan pengetahuan awal tentang ${tema}.`,

  `**Perencanaan Proyek:**`,
  `Guru membimbing murid memilih ide proyek yang paling sesuai dengan tujuan pembelajaran ${tema}.`,
  `Guru menjelaskan tujuan proyek, langkah kegiatan, dan hasil akhir yang diharapkan.`,
  `Guru membantu murid menyusun rencana kegiatan proyek secara sederhana.`,
  `Murid berdiskusi untuk menentukan pembagian tugas dalam kelompok.`,
  `Murid menyiapkan alat dan bahan yang diperlukan untuk pelaksanaan proyek ${tema}.`,

  `**Mengaplikasi:**`,
  `**Pelaksanaan Proyek:**`,
  `Guru memfasilitasi dan memantau proses pelaksanaan proyek sesuai rencana.`,
  `Guru memberikan bimbingan dan penguatan selama murid bekerja dalam kelompok.`,
  `Murid melaksanakan proyek ${tema} sesuai pembagian tugas dan kesepakatan kelompok.`,
  `Murid mencatat atau mendokumentasikan proses pembuatan proyek.`,
  `Guru memastikan murid bekerja dengan tertib, aman, dan saling bekerja sama.`,

  `**Presentasi Hasil:**`,
  `Guru memfasilitasi murid menyiapkan penyajian hasil proyek.`,
  `Murid mempresentasikan hasil proyek ${tema} secara bergiliran.`,
  `Guru mengarahkan murid lain untuk menyimak dan memberikan tanggapan sederhana.`,
  `Murid saling menghargai dan mengapresiasi hasil karya kelompok lain.`,
  `Guru memberikan klarifikasi dan penguatan terhadap konsep ${tema} yang dipelajari.`,

  `**Merefleksi:**`,
  `**Refleksi:**`,
  `Guru mengajak murid merefleksi proses dan hasil proyek yang telah dilakukan.`,
  `Murid mengungkapkan perasaan, pengalaman, dan tantangan selama mengerjakan proyek.`,
  `Guru mengajukan pertanyaan reflektif tentang manfaat proyek terkait ${tema}.`,
  `Murid menyimpulkan hasil pembelajaran yang diperoleh dari kegiatan proyek.`,
  `Guru memberikan umpan balik, apresiasi, dan penguatan nilai karakter yang berkembang selama pembelajaran.`
],

    "Inquiry Learning": [
  `**Memahami:**`,
  `**Orientasi Masalah:**`,
  `Guru menghadirkan fenomena atau peristiwa yang menimbulkan rasa ingin tahu murid terkait ${tema} melalui cerita, gambar, video, atau demonstrasi sederhana.`,
  `Guru mengajukan pertanyaan pemantik untuk mengarahkan perhatian murid pada fenomena yang diamati.`,
  `Murid mengamati fenomena dan menyampaikan hal-hal menarik yang mereka temukan.`,
  `Guru menegaskan fokus pembelajaran berdasarkan fenomena yang diamati.`,
  `Murid menyepakati topik atau fokus masalah yang akan diselidiki bersama.`,

  `**Merumuskan Masalah:**`,
  `Guru membimbing murid menyusun pertanyaan penelitian sederhana berdasarkan hasil pengamatan.`,
  `Guru membantu murid merumuskan masalah dengan bahasa yang mudah dipahami.`,
  `Murid mengemukakan pertanyaan tentang ${tema} yang ingin mereka ketahui jawabannya.`,
  `Guru mengarahkan murid memilih satu masalah utama untuk diteliti.`,
  `Murid menyepakati rumusan masalah sebagai dasar kegiatan inquiry.`,

  `**Merumuskan Hipotesis:**`,
  `Guru menjelaskan konsep dugaan awal atau hipotesis dengan contoh sederhana.`,
  `Guru membimbing murid menghubungkan masalah dengan pengetahuan awal yang dimiliki.`,
  `Murid menyampaikan dugaan awal tentang kemungkinan jawaban dari masalah ${tema}.`,
  `Guru membantu murid merumuskan hipotesis dengan kalimat sederhana.`,
  `Murid mencatat hipotesis sebagai jawaban sementara yang akan diuji.`,

  `**Mengaplikasi:**`,
  `**Mengumpulkan Data:**`,
  `Guru memfasilitasi kegiatan pengumpulan data melalui pengamatan, percobaan sederhana, atau studi sumber belajar.`,
  `Guru menjelaskan cara menggunakan alat dan bahan secara aman dan tertib.`,
  `Murid melakukan pengamatan atau percobaan untuk mengumpulkan data terkait ${tema}.`,
  `Murid mencatat hasil pengamatan dalam bentuk gambar, simbol, atau kalimat sederhana.`,
  `Guru mendampingi murid selama proses pengumpulan data.`,

  `**Menguji Hipotesis:**`,
  `Guru membimbing murid membandingkan data yang diperoleh dengan hipotesis awal.`,
  `Guru mengajukan pertanyaan penuntun untuk membantu murid menganalisis data.`,
  `Murid mendiskusikan hasil pengamatan dalam kelompok.`,
  `Murid menentukan apakah hipotesis awal sesuai atau perlu diperbaiki.`,
  `Guru memberikan penguatan terhadap proses berpikir ilmiah murid.`,

  `**Merefleksi:**`,
  `**Membuat Kesimpulan:**`,
  `Guru memfasilitasi murid menyusun kesimpulan berdasarkan hasil analisis data.`,
  `Murid menyampaikan kesimpulan hasil penyelidikan secara lisan atau visual.`,
  `Guru membimbing murid mengaitkan kesimpulan dengan konsep ${tema}.`,
  `Murid mengungkapkan pengalaman dan hal baru yang dipelajari selama kegiatan inquiry.`,
  `Guru memberikan umpan balik, apresiasi, dan penguatan sikap ilmiah murid.`
],

    "LOK-R": [
  `**Memahami:**`,
  `**Literasi:**`,
  `Guru menyediakan bahan bacaan, gambar, video, atau media lain yang relevan dengan ${tema}.`,
  `Guru mengarahkan murid untuk mengamati isi bacaan atau media secara bertahap.`,
  `Murid membaca, mengamati, atau mendengarkan informasi yang disajikan guru.`,
  `Guru mengajukan pertanyaan pemantik untuk menggali pemahaman awal murid.`,
  `Murid menyampaikan hal-hal penting yang mereka pahami dari bahan literasi tentang ${tema}.`,

  `**Orientasi:**`,
  `Guru mengaitkan materi literasi dengan konteks kehidupan sehari-hari dan lingkungan sekitar murid.`,
  `Guru menjelaskan tujuan pembelajaran yang akan dicapai terkait ${tema}.`,
  `Murid menghubungkan pengetahuan baru dengan pengalaman pribadi yang relevan.`,
  `Guru membantu murid memfokuskan perhatian pada isu atau permasalahan utama ${tema}.`,
  `Murid menyepakati fokus pembelajaran yang akan dikaji lebih lanjut.`,

  `**Mengaplikasi:**`,
  `**Komunikasi:**`,
  `Guru memfasilitasi kegiatan diskusi, tanya jawab, atau berbagi pendapat secara terarah.`,
  `Guru memberikan kesempatan kepada murid untuk menyampaikan gagasan atau hasil analisis.`,
  `Murid mengemukakan pendapat, ide, atau solusi sederhana terkait ${tema}.`,
  `Guru membimbing murid menyampaikan pendapat dengan bahasa yang santun dan runtut.`,
  `Murid menanggapi pendapat teman dengan sikap saling menghargai.`,

  `**Merefleksi:**`,
  `**Refleksi:**`,
  `Guru memimpin sesi refleksi untuk meninjau kembali proses dan hasil pembelajaran.`,
  `Guru mengajukan pertanyaan reflektif tentang makna pembelajaran terkait ${tema}.`,
  `Murid mengungkapkan perasaan, pengalaman, dan pemahaman baru yang diperoleh.`,
  `Murid menyebutkan nilai atau sikap positif yang dapat diterapkan dalam kehidupan sehari-hari.`,
  `Guru memberikan penguatan, apresiasi, dan arahan tindak lanjut sesuai dengan tujuan pembelajaran ${tema}.`
],

    "Discovery Learning": [
  `**Memahami:**`,
  `**Stimulasi:**`,
  `Guru memberikan rangsangan berupa gambar, video, cerita, atau pertanyaan yang berkaitan dengan ${tema}.`,
  `Guru mengajak murid mengamati stimulus secara saksama.`,
  `Murid memperhatikan dan menanggapi stimulus yang diberikan guru.`,
  `Guru mengajukan pertanyaan pemantik untuk menumbuhkan rasa ingin tahu murid.`,
  `Murid menyampaikan tanggapan awal dan rasa ingin tahu terhadap ${tema}.`,

  `**Identifikasi Masalah:**`,
  `Guru membimbing murid mengidentifikasi permasalahan yang muncul dari stimulus.`,
  `Guru membantu murid merumuskan masalah dengan bahasa sederhana.`,
  `Murid mengemukakan persoalan-persoalan yang perlu diselidiki terkait ${tema}.`,
  `Guru mengarahkan murid memilih masalah utama yang akan dipelajari.`,
  `Murid menyepakati fokus masalah sebagai dasar kegiatan discovery.`,

  `**Mengaplikasi:**`,
  `**Pengumpulan Data:**`,
  `Guru mengarahkan murid mencari data atau informasi yang relevan dengan masalah.`,
  `Guru menjelaskan cara melakukan pengamatan atau pencarian informasi secara tertib.`,
  `Murid melakukan observasi, membaca sumber, atau mengumpulkan informasi tentang ${tema}.`,
  `Murid mencatat data yang diperoleh dalam bentuk gambar, tabel sederhana, atau catatan singkat.`,
  `Guru mendampingi murid selama proses pengumpulan data.`,

  `**Pengolahan Data:**`,
  `Guru membimbing murid mengelompokkan dan mengolah data yang telah dikumpulkan.`,
  `Guru mengajukan pertanyaan penuntun untuk membantu murid menganalisis data.`,
  `Murid menganalisis data dalam bentuk tabel, bagan, atau diagram sederhana.`,
  `Murid menemukan pola atau informasi bermakna yang berkaitan dengan ${tema}.`,
  `Guru memberikan penguatan terhadap proses berpikir dan temuan murid.`,

  `**Merefleksi:**`,
  `**Verifikasi:**`,
  `Guru menuntun murid membandingkan hasil temuan dengan teori, konsep, atau fakta yang relevan.`,
  `Guru mengajak murid mendiskusikan kebenaran data dan temuan yang diperoleh.`,
  `Murid menyampaikan hasil verifikasi berdasarkan data dan referensi.`,
  `Guru memberikan klarifikasi terhadap konsep ${tema} yang dipelajari.`,
  `Murid memahami kesesuaian antara temuan dan konsep yang benar.`,

  `**Generalisasi:**`,
  `Guru membimbing murid menarik kesimpulan dari hasil kegiatan discovery.`,
  `Murid menyampaikan kesimpulan pembelajaran dengan bahasa sederhana.`,
  `Guru mengaitkan kesimpulan dengan konsep utama ${tema}.`,
  `Murid mempresentasikan hasil pembelajaran dalam bentuk laporan lisan atau visual.`,
  `Guru memberikan umpan balik, apresiasi, dan penguatan terhadap hasil belajar murid.`
],

    "PAIKEM": [
  `**Memahami:**`,
  `**Pengondisian Pembelajaran Aktif:**`,
  `Guru menciptakan suasana belajar yang aktif, inovatif, kreatif, efektif, dan menyenangkan terkait ${tema}.`,
  `Guru menyiapkan media pembelajaran, alat, dan bahan yang diperlukan.`,
  `Guru mengajak murid melakukan pengamatan awal terhadap media atau fenomena yang disajikan.`,
  `Murid terlibat aktif dalam eksplorasi awal dan menunjukkan rasa ingin tahu.`,
  `Guru membangun kesepakatan kelas agar pembelajaran berjalan tertib dan menyenangkan.`,

  `**Pemantik dan Eksplorasi Ide:**`,
  `Guru mengajukan pertanyaan pemantik untuk mendorong rasa ingin tahu dan berpikir kritis murid.`,
  `Guru mengaitkan materi pembelajaran dengan pengalaman sehari-hari murid.`,
  `Murid menyampaikan gagasan awal dan pendapat terkait ${tema}.`,
  `Guru menghargai setiap pendapat dan memberikan penguatan positif.`,
  `Murid menyepakati fokus kegiatan pembelajaran yang akan dilakukan.`,

  `**Mengaplikasi:**`,
  `**Kegiatan Kolaboratif:**`,
  `Guru memfasilitasi aktivitas kolaboratif seperti diskusi kelompok, eksperimen sederhana, atau permainan edukatif.`,
  `Guru menjelaskan tujuan dan aturan kegiatan kolaboratif.`,
  `Murid bekerja sama dalam kelompok untuk menyusun solusi atau produk terkait ${tema}.`,
  `Murid berpartisipasi aktif dan saling membantu dalam menyelesaikan tugas kelompok.`,
  `Guru memantau dan membimbing proses kerja kelompok.`,

  `**Ekspresi Kreatif:**`,
  `Guru membimbing murid mengekspresikan ide melalui karya, presentasi, atau penampilan sederhana.`,
  `Guru memberikan contoh atau arahan cara menyajikan hasil karya.`,
  `Murid mengekspresikan kreativitas melalui produk atau performa yang relevan dengan ${tema}.`,
  `Murid menyajikan hasil karya dengan percaya diri.`,
  `Guru memberikan apresiasi terhadap kreativitas dan usaha murid.`,

  `**Merefleksi:**`,
  `**Refleksi Pembelajaran:**`,
  `Guru memandu murid merefleksi proses dan hasil pembelajaran yang telah dilakukan.`,
  `Guru mengajukan pertanyaan reflektif tentang pengalaman belajar dan manfaat kegiatan.`,
  `Murid mengungkapkan pengalaman, perasaan, dan tantangan selama pembelajaran.`,
  `Murid menyampaikan hal-hal yang sudah dipahami dan yang masih perlu diperbaiki.`,
  `Guru memberikan umpan balik, penguatan, dan arahan tindak lanjut terkait ${tema}.`
],

    "Cooperative Learning": [
  `**Memahami:**`,
  `**Menyajikan Informasi:**`,
  `Guru menyajikan konsep atau materi pembelajaran yang berkaitan dengan ${tema} menggunakan berbagai media.`,
  `Guru menjelaskan tujuan pembelajaran dan aktivitas yang akan dilakukan secara kelompok.`,
  `Murid mendengarkan penjelasan guru dengan penuh perhatian.`,
  `Murid mencatat informasi penting yang berkaitan dengan konsep ${tema}.`,
  `Guru memastikan murid memahami materi awal sebelum kegiatan kelompok dimulai.`,

  `**Membentuk Kelompok:**`,
  `Guru membagi murid ke dalam kelompok secara homogen atau heterogen sesuai kebutuhan pembelajaran.`,
  `Guru menjelaskan aturan kerja kelompok dan tanggung jawab setiap anggota.`,
  `Murid bergabung dengan kelompok dan saling mengenal peran masing-masing.`,
  `Murid memahami tugas kelompok yang harus diselesaikan terkait ${tema}.`,
  `Guru memastikan setiap murid siap bekerja sama dalam kelompok.`,

  `**Mengaplikasi:**`,
  `**Kerja Kelompok:**`,
  `Guru memantau proses diskusi dan kerja kelompok secara berkala.`,
  `Guru memberikan bimbingan atau bantuan ketika kelompok mengalami kesulitan.`,
  `Murid berdiskusi dan bekerja sama menyelesaikan tugas kelompok.`,
  `Murid saling membantu dan bertukar pendapat untuk mencapai tujuan kelompok.`,
  `Guru menegaskan pentingnya sikap kerja sama dan tanggung jawab bersama.`,

  `**Merefleksi:**`,
  `**Evaluasi:**`,
  `Guru memfasilitasi kegiatan penilaian hasil kerja kelompok.`,
  `Guru memberikan kesempatan kepada murid untuk menyajikan hasil kerja kelompok.`,
  `Murid mempresentasikan hasil diskusi dan solusi kelompok terkait ${tema}.`,
  `Murid memberikan penilaian atau umpan balik sederhana terhadap hasil kelompok lain.`,
  `Guru memberikan klarifikasi dan penguatan terhadap konsep ${tema}.`,

  `**Pemberian Penghargaan:**`,
  `Guru memberikan apresiasi terhadap kinerja kelompok maupun individu.`,
  `Guru menyampaikan penghargaan atas kerja sama, keaktifan, dan hasil terbaik.`,
  `Murid menerima penghargaan dengan sikap sportif dan percaya diri.`,
  `Murid memberikan apresiasi dan umpan balik positif kepada kelompok lain.`,
  `Guru menegaskan nilai kerja sama dan saling menghargai dalam pembelajaran.`
],
    
    "Experiential Learning (ARKA)": [
  `**Memahami:**`,
  `**Aktivitas:**`,
  `Guru merancang pengalaman belajar langsung yang kontekstual terkait ${tema}, seperti kegiatan lapangan, simulasi, praktik nyata, atau pengalaman inderawi di lingkungan sekitar.`,
  `Guru memberikan panduan agar murid menjalani aktivitas dengan kesadaran penuh, murid menggunakan pancaindra untuk mengamati, mendengar, merasakan, dan mengalami langsung hal-hal yang berkaitan dengan ${tema}.`,
  `Guru menekankan fokus dan kehadiran penuh selama aktivitas, murid mengikuti kegiatan dengan tertib dan penuh perhatian sebagai bentuk penghargaan terhadap proses belajar.`,

  `**Mengaplikasi:**`,
  `**Refleksi:**`,
  `Guru mengajak murid mengungkapkan pengalaman yang dirasakan selama aktivitas, murid menceritakan perasaan, kesan, dan hal-hal yang paling bermakna terkait ${tema}.`,
  `Guru mengajukan pertanyaan reflektif, murid membandingkan pengalaman sebelum dan sesudah melakukan aktivitas dengan penuh kesadaran.`,
  `Guru menuntun murid menemukan nilai dan pesan dari pengalaman tersebut, murid menyadari pentingnya sikap peduli, menghargai, dan bertanggung jawab dalam konteks ${tema}.`,

  `**Konsep:**`,
  `Guru mengaitkan pengalaman murid dengan konsep pengetahuan, nilai moral, atau nilai keimanan yang relevan dengan ${tema}.`,
  `Guru menjelaskan makna yang lebih dalam dari pengalaman yang telah dialami, murid memahami bahwa pengalaman konkret merupakan pintu masuk untuk memahami konsep abstrak.`,
  `Guru menegaskan hubungan antara pengalaman, nilai, dan pembelajaran, murid menyimpulkan konsep utama yang dipelajari dari kegiatan tersebut.`,

  `**Merefleksi:**`,
  `**Aplikasi:**`,
  `Guru memberikan tantangan penerapan nilai dalam kehidupan sehari-hari, murid merancang tindakan nyata yang dapat dilakukan secara konsisten terkait ${tema}.`,
  `Guru membimbing murid menetapkan komitmen sederhana namun bermakna, murid mempraktikkan sikap dan perilaku positif sesuai nilai yang dipelajari.`,
  `Guru memfasilitasi tindak lanjut dan berbagi pengalaman, murid melaporkan hasil penerapan dan merefleksikan perubahan sikap yang terjadi setelah pembelajaran.`
],

    "Project Based Learning (FIEDS)": [
  `**Memahami:**`,
  `**Feel:**`,
  `Guru menghadirkan situasi nyata, fenomena, cerita kontekstual, atau masalah sehari-hari yang berkaitan dengan ${tema}, murid mengamati dan merasakan persoalan tersebut secara emosional dan personal.`,
  `Guru memantik kesadaran murid melalui pertanyaan reflektif, murid mengekspresikan perasaan, kepedulian, dan pandangan awal terhadap situasi yang berkaitan dengan ${tema}.`,
  `Guru menegaskan bahwa perasaan, kepedulian, dan empati murid adalah pintu masuk pembelajaran, murid memahami bahwa pembelajaran dimulai dari kepekaan terhadap lingkungan, diri, dan sesama.`,

  `**Imagine:**`,
  `Guru mengajak murid membayangkan kondisi ideal atau solusi yang diharapkan terkait ${tema}, murid menuangkan gagasan tentang perubahan, perbaikan, atau karya yang dapat diwujudkan.`,
  `Guru memfasilitasi diskusi imajinatif dan kreatif, murid mengembangkan ide awal tentang bentuk projek, manfaat, dan dampak positif dari projek yang akan dibuat.`,
  `Guru membimbing murid memilih ide yang paling relevan dan realistis, murid menyepakati arah projek yang akan dikerjakan bersama.`,

  `**Mengaplikasi:**`,
  `**Explore:**`,
  `Guru membimbing murid merancang langkah kerja projek, murid menyusun pertanyaan kunci, mencari informasi, dan mengumpulkan data dari berbagai sumber yang berkaitan dengan ${tema}.`,
  `Guru memfasilitasi eksplorasi melalui observasi, wawancara, studi literatur, atau eksperimen sederhana, murid mencatat temuan penting sebagai dasar pelaksanaan projek.`,
  `Guru membantu murid mengorganisasi informasi, murid menyimpulkan hasil eksplorasi sebagai landasan tindakan nyata.`,

  `**Do:**`,
  `Guru memandu pelaksanaan projek sesuai rencana, murid bekerja secara kolaboratif untuk menghasilkan produk, aksi, atau solusi nyata yang berkaitan dengan ${tema}.`,
  `Guru melakukan pendampingan dan umpan balik berkala, murid memperbaiki proses dan hasil kerja berdasarkan arahan dan refleksi sementara.`,
  `Guru memastikan setiap murid berperan aktif, murid menunjukkan tanggung jawab, kreativitas, dan kemandirian selama proses projek.`,

  `**Merefleksi:**`,
  `**Share:**`,
  `Guru memfasilitasi presentasi hasil projek, murid menyampaikan proses, hasil, dan pembelajaran yang diperoleh dari projek ${tema}.`,
  `Guru mengajak murid melakukan refleksi bersama, murid mengevaluasi keberhasilan, tantangan, serta nilai-nilai yang diperoleh selama proses pembelajaran.`,
  `Guru menegaskan makna pembelajaran, murid menyimpulkan bahwa projek bukan hanya menghasilkan produk, tetapi juga membentuk sikap, kepedulian, dan pemahaman yang bermakna tentang ${tema}.`
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
  
  // Project Based Learning (FIEDS)
if (praktek.includes("fieds") || praktek.includes("fields")) {
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

  // Experiential Learning (ARKA)
else if (praktek.includes("experiential") || praktek.includes("arka") || praktek.includes("arka".toLowerCase())) {
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
  if (istema"wujud", "benda", "materi", "energi", "perubahan", "reaksi", "sifat", "ekosistem", "lingkungan")) {
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

 // Project Based Learning (FIEDS)
else if (praktek.includes("fieds") || praktek.includes("fieds") || praktek.includes("fieds".toLowerCase())) {
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

  // Experiential Learning (ARKA)
else if (praktek.includes("experiential") || praktek.includes("arka") || praktek.includes("arka".toLowerCase())) {
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
        `Setelah kamu mengikuti pembelajaran dengan baik bagaimana caramu menunjukkan pemahaman tentang ${tema}?`,
        `Menurut pendapatmu dalam kondisi atau keadaan apa konsep ${tema} dapat diimplementasikan?`,
        `Ungkapkan dengan jujur hal-hal baru yang menarik tentang ${tema}!`
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
  rubrik: `Catatlah keterlibatan anda dalam setiap tahapan kegiatan pembelajaran pada Kegiatan Inti dengan jujur.`,

  // ✅ tabel_penilaian_diri ditambahkan terpisah, tidak mengubah struktur lama
  tabel_penilaian_diri: {
    instruksi: `Isilah tabel penilaian diri berikut, gunakan skala 1–4!`,
     skala: "1-4",
     indikator: langkah
      .filter((x) => !x.startsWith("**"))
      .map((x) => {
        let clean = x.replace(/\*\*/g, "").trim(); // hilangkan dekorasi model seperti **Memahami:**
    
        // Ambil hanya inti fase sebelum narasi guru/murid dimulai
        // Logika: bagian sebelum KALIMAT MULAI (guru/murid/verb panjang)
        let fase = clean.split(/,| murid | guru /i)[0].trim();

        return `Keterlibatan dalam kegiatan: ${fase}`;
      }),
  },

  },
};
};
