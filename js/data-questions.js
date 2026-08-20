/**
 * QUESTIONS — V3
 * -----------------------------------------------------------------------
 * Source: "Career & Growth Check — Question Set V3 — Revisi"
 * Dimension codes: A = Ambition, O = Ownership, R = Resilience,
 * L = Learning, P = People, V = Vision
 *
 * V3 changes from V2 (see source doc for full rationale):
 *  - Dimension appearance counts rebalanced to 12-13 each (was as
 *    uneven as 4-16 in V2), so scoring.js normalizes per-dimension
 *    instead of by a flat question count.
 *  - Removed the one-off Neutral/0 option (was only in old Q7) for
 *    consistency — every option now maps to exactly one dimension.
 *  - Option order per question is shuffled (no more fixed A=Ambition,
 *    B=Ownership... pattern every question).
 *  - Several near-duplicate question pairs from V2 were rewritten with
 *    more distinct angles (see doc's "Ringkasan Perubahan" section).
 * -----------------------------------------------------------------------
 */
window.APP_QUESTIONS = [
  {
    id: "q1",
    text: "Saat ini, kalau kamu melihat perjalanan kariermu, mana yang paling terasa dekat dengan kondisimu?",
    options: [
      { id: "q1o1", text: "Aku sedang mencoba menemukan kembali ritme setelah beberapa waktu yang cukup berat.", dim: "R" },
      { id: "q1o2", text: "Aku cukup tahu arah besar yang ingin kutuju, meski belum semua langkahnya jelas.", dim: "V" },
      { id: "q1o3", text: "Aku sedang mempertimbangkan apakah orang-orang dan lingkungan di sekitarku masih pas untukku.", dim: "P" },
      { id: "q1o4", text: "Aku merasa sudah berjalan, tapi ingin progressnya lebih terasa.", dim: "A" },
      { id: "q1o5", text: "Aku merasa ada kemampuan yang perlu kuasah lagi supaya bisa naik level.", dim: "L" },
    ],
  },
  {
    id: "q2",
    text: "Belakangan ini, bagian mana dari perjalanan kariermu yang paling terasa menguras energi?",
    options: [
      { id: "q2o1", text: "Dinamika dengan orang atau lingkungan kerja terasa melelahkan belakangan ini.", dim: "P" },
      { id: "q2o2", text: "Target atau tantangan yang ada terasa kurang memacu perkembanganku.", dim: "A" },
      { id: "q2o3", text: "Rutinitas terasa itu-itu saja, jarang ada hal baru yang bisa kuserap.", dim: "L" },
      { id: "q2o4", text: "Terlalu sering merasa semua hal bergantung sepenuhnya padaku.", dim: "O" },
      { id: "q2o5", text: "Sudah berusaha cukup keras, tapi hasilnya belum banyak berubah.", dim: "R" },
    ],
  },
  {
    id: "q3",
    text: "Kalau ada satu hal yang ingin terasa lebih baik dalam pekerjaan atau aktivitasmu sekarang, mana yang paling kamu cari?",
    options: [
      { id: "q3o1", text: "Kesempatan lebih banyak untuk belajar hal-hal baru.", dim: "L" },
      { id: "q3o2", text: "Lingkungan yang membuatku bertumbuh bersama orang-orang di sekitarku.", dim: "P" },
      { id: "q3o3", text: "Tantangan yang membuatku merasa benar-benar sedang maju.", dim: "A" },
      { id: "q3o4", text: "Keyakinan bahwa aku bisa terus jalan meski keadaan tidak selalu mudah.", dim: "R" },
      { id: "q3o5", text: "Ruang lebih besar untuk mengambil keputusan sendiri dan mengatur caraku sendiri bekerja.", dim: "O" },
    ],
  },
  {
    id: "q4",
    text: "Begitu kamu sadar sesuatu yang sudah kamu usahakan ternyata gagal atau jauh dari harapan, apa reaksi PERTAMA yang paling mungkin muncul?",
    options: [
      { id: "q4o1", text: "Aku langsung memikirkan bagian mana yang masih bisa kukendalikan dari sini.", dim: "O" },
      { id: "q4o2", text: "Aku mengecek lagi apakah kegagalan ini benar-benar mengubah makna dari apa yang sedang aku perjuangkan.", dim: "V" },
      { id: "q4o3", text: "Aku diam sejenak, mencoba melihat pelajaran apa yang bisa kuambil.", dim: "L" },
      { id: "q4o4", text: "Aku ingin cerita dulu ke seseorang yang bisa memberi sudut pandang lain.", dim: "P" },
      { id: "q4o5", text: "Aku menerima bahwa kali ini belum berhasil, lalu mulai memikirkan langkah berikutnya.", dim: "R" },
    ],
  },
  {
    id: "q5",
    text: "Ketika sesuatu yang penting bagimu terasa berat dalam waktu yang cukup lama \u2014 bukan cuma sesaat \u2014 apa yang biasanya membantumu tetap jalan?",
    options: [
      { id: "q5o1", text: "Memberi diri waktu untuk memulihkan energi sebelum lanjut lagi.", dim: "R" },
      { id: "q5o2", text: "Mencari informasi atau cara baru yang belum pernah kucoba.", dim: "L" },
      { id: "q5o3", text: "Meyakinkan diri bahwa perjalanan ini tetap punya alasan yang aku percaya, meski sedang berat.", dim: "V" },
      { id: "q5o4", text: "Mengingat target konkret yang ingin kucapai supaya semangatnya balik lagi.", dim: "A" },
      { id: "q5o5", text: "Mengobrol dengan seseorang yang bisa membantuku melihat situasi lebih jernih.", dim: "P" },
    ],
  },
  {
    id: "q6",
    text: "Ketika kamu masuk ke sesuatu yang benar-benar baru, mana yang paling menggambarkan caramu belajar?",
    options: [
      { id: "q6o1", text: "Aku banyak bertanya sampai polanya mulai terlihat jelas.", dim: "L" },
      { id: "q6o2", text: "Aku langsung ambil langkah dan bertanggung jawab menyesuaikan sambil berjalan.", dim: "O" },
      { id: "q6o3", text: "Aku mencari orang yang sudah lebih dulu melewati hal serupa.", dim: "P" },
      { id: "q6o4", text: "Aku butuh merasa cukup siap secara mental dulu sebelum benar-benar mulai.", dim: "R" },
      { id: "q6o5", text: "Aku ingin tahu dulu ini akan membawaku ke mana, baru melangkah.", dim: "V" },
    ],
  },
  {
    id: "q7",
    text: "Ketika seseorang yang kamu respect memberi feedback yang cukup kritis tentang dirimu, apa yang paling mungkin terjadi?",
    options: [
      { id: "q7o1", text: "Awalnya terasa tidak nyaman, tapi setelah itu aku pikirkan lagi pelan-pelan.", dim: "R" },
      { id: "q7o2", text: "Aku cek dulu apakah feedback itu memang sesuai dengan tanggung jawabku.", dim: "O" },
      { id: "q7o3", text: "Aku pertimbangkan apakah masukan ini penting untuk jangka panjang, bukan cuma untuk situasi saat ini.", dim: "V" },
      { id: "q7o4", text: "Aku ingin memahami dulu kenapa dia melihatku seperti itu.", dim: "P" },
      { id: "q7o5", text: "Aku langsung melihat apa yang bisa segera kuperbaiki.", dim: "L" },
    ],
  },
  {
    id: "q8",
    text: "Ketika cara yang selama ini kamu gunakan sudah tidak menghasilkan hasil yang sama, biasanya kamu...",
    options: [
      { id: "q8o1", text: "Bertanya ke orang lain yang mungkin melihatnya dari sudut berbeda.", dim: "P" },
      { id: "q8o2", text: "Mencoba pendekatan yang belum pernah kupakai, lalu melihat hasilnya.", dim: "L" },
      { id: "q8o3", text: "Mengecek dulu apakah perubahan ini memang akan membawaku ke tempat yang lebih aku inginkan.", dim: "V" },
      { id: "q8o4", text: "Melihat apakah cara baru ini bisa mendekatkanku pada target yang lebih besar.", dim: "A" },
      { id: "q8o5", text: "Menyesuaikan sendiri beberapa bagian sambil terus memegang kendali prosesnya.", dim: "O" },
    ],
  },
  {
    id: "q9",
    text: "Ketika ada kemungkinan baru yang menarik, tapi kamu belum yakin itu cocok untukmu, apa yang paling kamu BUTUHKAN dulu sebelum memutuskan?",
    options: [
      { id: "q9o1", text: "Tahu seberapa besar ruang yang akan kumiliki untuk menentukan caraku sendiri bekerja.", dim: "O" },
      { id: "q9o2", text: "Tahu dulu apa yang perlu kukuasai sebelum benar-benar terjun.", dim: "L" },
      { id: "q9o3", text: "Tahu apakah ini bisa membawa progress yang jauh lebih besar.", dim: "A" },
      { id: "q9o4", text: "Tahu apakah peluang ini benar-benar mendekatkanku ke gambaran besar yang sedang aku bangun untuk hidupku.", dim: "V" },
      { id: "q9o5", text: "Yakin bahwa aku tetap bisa menjalaninya meski hasilnya belum pasti.", dim: "R" },
    ],
  },
  {
    id: "q10",
    text: "Kalau bekerja dengan orang yang cara berpikir atau cara kerjanya sangat berbeda denganmu, mana yang paling dekat dengan responsmu?",
    options: [
      { id: "q10o1", text: "Aku melihat apakah perbedaan ini justru bisa memunculkan cara kerja baru yang lebih efektif.", dim: "L" },
      { id: "q10o2", text: "Aku jadikan gesekan ini pemicu untuk mendorong hasil kerja ke level yang lebih tinggi dari biasanya.", dim: "A" },
      { id: "q10o3", text: "Aku coba memahami dulu bagaimana dia melihat situasinya.", dim: "P" },
      { id: "q10o4", text: "Kalau perbedaan mulai bikin kesal, aku perlu menenangkan diri dulu sebelum merespons.", dim: "R" },
      { id: "q10o5", text: "Aku fokus memastikan bagianku tetap selesai dengan baik, apa pun dinamikanya.", dim: "O" },
    ],
  },
  {
    id: "q11",
    text: "Kalau kamu bisa mengubah SATU hal paling konkret dari cara kerjamu sekarang \u2014 bukan soal perasaan, tapi soal sistem atau strukturnya \u2014 yang mana yang paling kamu pilih?",
    options: [
      { id: "q11o1", text: "Sistem kerja yang memberiku lebih banyak wewenang mengambil keputusan sendiri.", dim: "O" },
      { id: "q11o2", text: "Tim atau lingkaran kerja yang isinya orang-orang yang mendorongku maju.", dim: "P" },
      { id: "q11o3", text: "Kejelasan tentang ke mana sebenarnya semua ini bermuara.", dim: "V" },
      { id: "q11o4", text: "Target dan ukuran keberhasilan yang lebih menantang dari sekarang.", dim: "A" },
      { id: "q11o5", text: "Ritme kerja yang lebih sehat dan bisa kujalani dalam jangka panjang.", dim: "R" },
    ],
  },
  {
    id: "q12",
    text: "Ketika membayangkan perkembangan kariermu, mana yang paling membuatmu merasa \u201cini akan berarti\u201d?",
    options: [
      { id: "q12o1", text: "Membantu orang lain berkembang lewat apa yang aku kerjakan.", dim: "P" },
      { id: "q12o2", text: "Melakukan sesuatu yang terasa selaras dengan apa yang aku yakini penting dalam hidup.", dim: "V" },
      { id: "q12o3", text: "Menjadi jauh lebih menguasai bidangku dibanding sekarang.", dim: "L" },
      { id: "q12o4", text: "Punya sesuatu yang bisa kutunjuk dan kukatakan: ini aku yang membangunnya dari awal.", dim: "O" },
      { id: "q12o5", text: "Melihat usahaku benar-benar menghasilkan pencapaian yang penting bagiku.", dim: "A" },
    ],
  },
  {
    id: "q13",
    text: "Kalau kamu membayangkan kehidupan kerja yang terasa benar-benar cocok untukmu, mana yang paling penting?",
    options: [
      { id: "q13o1", text: "Aku melakukan sesuatu yang terasa berarti bagi orang-orang di sekitarku.", dim: "P" },
      { id: "q13o2", text: "Hidupku tetap bisa berjalan baik meskipun banyak hal berubah.", dim: "R" },
      { id: "q13o3", text: "Pekerjaan yang kulakukan terus membawa aku menuju sesuatu yang lebih besar.", dim: "A" },
      { id: "q13o4", text: "Aku punya kebebasan penuh menentukan caraku sendiri bekerja, tanpa terlalu diatur orang lain.", dim: "O" },
      { id: "q13o5", text: "Aku menjalani sesuatu yang terasa selaras dengan nilai dan tujuan hidupku.", dim: "V" },
    ],
  },
  {
    id: "q14",
    text: "Kalau ada kesempatan untuk mencoba sesuatu di luar aktivitas utamamu, apa yang paling membuatmu PENASARAN untuk mulai menjajakinya \u2014 bukan soal apa yang kamu butuhkan, tapi soal apa yang menarik hatimu?",
    options: [
      { id: "q14o1", text: "Sesuatu yang bisa kucoba pelan-pelan tanpa harus langsung tinggalkan semua yang ada.", dim: "R" },
      { id: "q14o2", text: "Sesuatu yang menjanjikan tantangan dan hasil yang jauh lebih besar.", dim: "A" },
      { id: "q14o3", text: "Sesuatu yang aku pegang penuh kendalinya dari awal sampai akhir.", dim: "O" },
      { id: "q14o4", text: "Sesuatu yang memaksaku mempelajari skill atau dunia yang sama sekali baru.", dim: "L" },
      { id: "q14o5", text: "Sesuatu yang terasa selaras dengan apa yang ingin aku tinggalkan sebagai jejak.", dim: "V" },
    ],
  },
  {
    id: "q15",
    text: "Menurutmu, seperti apa tanda bahwa kariermu sedang berada di jalur yang tepat?",
    options: [
      { id: "q15o1", text: "Aku makin yakin dengan kemampuan dan keahlian yang kumiliki.", dim: "L" },
      { id: "q15o2", text: "Apa yang kukerjakan terasa makin selaras dengan tujuan hidupku.", dim: "V" },
      { id: "q15o3", text: "Hubunganku dengan orang-orang sekitar makin baik dan aku bisa memberi kontribusi nyata.", dim: "P" },
      { id: "q15o4", text: "Aku melihat pencapaian yang makin besar dari waktu ke waktu.", dim: "A" },
      { id: "q15o5", text: "Aku tetap bisa menjalani pekerjaan dengan baik meski menghadapi tekanan atau perubahan.", dim: "R" },
    ],
  },
];
