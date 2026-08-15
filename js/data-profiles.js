/**
 * DIMENSIONS + PROFILES — LOCKED CONTENT
 * -----------------------------------------------------------------------
 * Source: "CONTENT MASTER — CAREER & GROWTH CHECK — VERSION: FINAL"
 * -----------------------------------------------------------------------
 */
window.APP_DIMENSIONS = {
  A: { id: "A", label: "Ambition", definition: "The tendency to seek progress, achievement, challenge, financial growth, and measurable advancement." },
  O: { id: "O", label: "Ownership", definition: "The tendency to take responsibility, make decisions, initiate action, and feel responsible for creating movement." },
  R: { id: "R", label: "Resilience", definition: "The tendency to keep moving, adapt, recover, and continue when facing difficulty, failure, or uncertainty." },
  L: { id: "L", label: "Learning", definition: "The tendency to seek knowledge, understand new things, adapt, learn from experience, and remain open to new perspectives." },
  P: { id: "P", label: "People", definition: "The tendency to gain energy from relationships, collaboration, influence, networking, and helping others grow." },
  V: { id: "V", label: "Vision", definition: "The tendency to think beyond immediate results and connect actions with purpose, meaning, long-term possibilities, and impact." },
};

// Fixed display order used everywhere the six dimensions are rendered together.
window.APP_DIMENSION_ORDER = ["A", "O", "R", "L", "P", "V"];

window.APP_PROFILES = {
  BUILDER: {
    id: "BUILDER",
    name: "THE BUILDER",
    title: "The Builder",
    statement: "You are energized by turning ideas into something real.",
    description:
      "Kamu cenderung menikmati ketika memiliki ruang untuk mengambil tanggung jawab, membuat keputusan, dan melihat sesuatu berkembang karena kontribusimu sendiri. Kamu mungkin tidak selalu membutuhkan posisi formal untuk merasa memiliki sebuah peran. Ketika melihat sesuatu yang bisa diperbaiki, dikembangkan, atau dibuat menjadi lebih baik, ada kecenderungan dalam dirimu untuk berpikir, \u201cApa yang bisa aku lakukan supaya ini bergerak?\u201d Bagi kamu, progress terasa paling memuaskan ketika sesuatu yang sebelumnya hanya berupa ide akhirnya menjadi nyata.",
    strengths: [
      { title: "Ownership", text: "Kamu cenderung nyaman mengambil tanggung jawab dan tidak hanya menunggu orang lain menentukan arah." },
      { title: "Initiative", text: "Kamu relatif mudah bergerak ketika melihat sesuatu yang bisa dikembangkan." },
      { title: "Achievement", text: "Kamu menikmati progress yang bisa dilihat dan dirasakan." },
    ],
    awareOf: "Karena kamu terbiasa ingin membuat sesuatu bergerak, kamu mungkin perlu memperhatikan apakah keinginan untuk memastikan semuanya berjalan baik membuatmu mengambil terlalu banyak hal sendiri.",
    nextOpportunity: "Level berikutnya bagi seorang Builder bukan hanya belajar bagaimana membangun sesuatu sendiri, tetapi bagaimana membuat orang lain ingin ikut membangunnya bersamamu.",
    reflectionQuestion: "Apa yang sebenarnya ingin kamu bangun dalam 3\u20135 tahun ke depan?",
    weights: { O: 0.38, A: 0.27, V: 0.18, L: 0.10, P: 0.07 },
  },
  DRIVER: {
    id: "DRIVER",
    name: "THE DRIVER",
    title: "The Driver",
    statement: "You are energized by progress, challenge, and achievement.",
    description:
      "Kamu cenderung mendapatkan energi ketika memiliki sesuatu untuk dikejar. Target yang jelas, tantangan yang membuatmu tertantang, dan hasil yang bisa diukur dapat membuatmu merasa hidup dan bergerak maju. Kamu mungkin termasuk orang yang sulit benar-benar puas jika merasa masih bisa melakukan lebih banyak. Ketika menghadapi hambatan, ada bagian dalam dirimu yang justru terdorong untuk membuktikan bahwa kamu bisa melewatinya. Bagi kamu, pertumbuhan bukan hanya tentang belajar. Ada kebutuhan untuk melihat bahwa pembelajaran itu menghasilkan progress nyata.",
    strengths: [
      { title: "Achievement Drive", text: "Kamu menikmati tantangan dan pencapaian." },
      { title: "Resilience", text: "Kegagalan tidak selalu membuatmu berhenti; sering kali justru membuatmu mencari cara lain." },
      { title: "Initiative", text: "Ketika tahu apa yang ingin dicapai, kamu cenderung lebih mudah bergerak." },
    ],
    awareOf: "Karena kamu cukup terbiasa mengejar hasil, kamu mungkin perlu memperhatikan apakah kecepatan dan pencapaian kadang membuatmu kurang menikmati proses atau kurang memberi ruang bagi orang lain untuk bergerak dengan ritmenya.",
    nextOpportunity: "Pertumbuhan berikutnya mungkin bukan hanya tentang seberapa banyak yang bisa kamu capai, tetapi tentang apa yang bisa terus bertumbuh bahkan tanpa kamu harus selalu mendorongnya sendiri.",
    reflectionQuestion: "Kalau pencapaian bukan lagi satu-satunya ukuran keberhasilan, apa yang ingin kamu bangun melalui semua yang kamu capai?",
    weights: { A: 0.42, R: 0.30, O: 0.14, L: 0.08, V: 0.06 },
  },
  CATALYST: {
    id: "CATALYST",
    name: "THE CATALYST",
    title: "The Catalyst",
    statement: "You grow by helping people grow.",
    description:
      "Kamu cenderung mendapatkan energi dari hubungan dengan orang lain. Kamu mungkin menikmati diskusi, kolaborasi, membantu seseorang melihat sesuatu dari perspektif baru, atau melihat orang lain berkembang karena kontribusimu. Bagi kamu, keberhasilan tidak selalu terasa lengkap kalau hanya kamu yang bertumbuh. Ada kepuasan ketika perkembanganmu juga membawa sesuatu yang positif bagi orang-orang di sekitarmu. Kamu memiliki kecenderungan untuk melihat potensi dalam diri orang lain, bukan hanya apa yang mereka bisa lakukan hari ini.",
    strengths: [
      { title: "People Orientation", text: "Kamu mendapatkan energi dari interaksi dan hubungan." },
      { title: "Influence", text: "Kamu punya kecenderungan untuk membantu orang bergerak atau melihat kemungkinan baru." },
      { title: "Development", text: "Pertumbuhan orang lain dapat menjadi sumber kepuasan bagimu." },
    ],
    awareOf: "Karena kamu cukup peka terhadap orang lain, kamu mungkin perlu memperhatikan apakah terlalu banyak mempertimbangkan kebutuhan atau pendapat orang lain membuatmu menunda keputusan yang sebenarnya perlu kamu ambil sendiri.",
    nextOpportunity: "Kemampuanmu untuk membuat orang lain berkembang akan semakin kuat ketika kamu juga semakin nyaman memimpin arah, bukan hanya mendukung perjalanan orang lain.",
    reflectionQuestion: "Kalau kamu bisa membantu 10 orang menjadi versi terbaik dirinya, kamu ingin mereka menjadi seperti apa?",
    weights: { P: 0.43, O: 0.18, L: 0.16, V: 0.14, R: 0.09 },
  },
  VISIONARY: {
    id: "VISIONARY",
    name: "THE VISIONARY",
    title: "The Visionary",
    statement: "You are energized by purpose, possibility, and impact.",
    description:
      "Kamu cenderung tidak hanya bertanya, \u201cApa yang bisa aku lakukan?\u201d tetapi juga, \u201cUntuk apa aku melakukan ini?\u201d Pekerjaan yang sekadar menghasilkan sesuatu mungkin belum tentu membuatmu merasa puas dalam jangka panjang. Kamu cenderung membutuhkan hubungan antara apa yang kamu kerjakan dengan sesuatu yang menurutmu lebih berarti. Kamu juga mungkin cukup tertarik pada kemungkinan jangka panjang \u2014 bagaimana sesuatu bisa berkembang, siapa yang bisa terdampak, dan seperti apa masa depan yang bisa diciptakan.",
    strengths: [
      { title: "Purpose", text: "Kamu cenderung mencari alasan yang lebih dalam di balik aktivitasmu." },
      { title: "Future Orientation", text: "Kamu relatif nyaman memikirkan kemungkinan jangka panjang." },
      { title: "Impact", text: "Kamu tertarik pada sesuatu yang manfaatnya melampaui dirimu sendiri." },
    ],
    awareOf: "Karena kamu terbiasa melihat gambaran besar, kamu mungkin perlu memperhatikan apakah visi yang besar kadang membuat langkah kecil yang diperlukan terasa kurang menarik atau terlalu lambat.",
    nextOpportunity: "Tantangan berikutnya adalah membawa sesuatu yang kamu percaya dari visi menjadi kenyataan \u2014 satu keputusan, satu langkah, dan satu orang pada satu waktu.",
    reflectionQuestion: "Kalau apa yang kamu kerjakan benar-benar memberi dampak, perubahan apa yang ingin kamu lihat terjadi pada orang lain?",
    weights: { V: 0.43, P: 0.22, L: 0.14, A: 0.11, O: 0.10 },
  },
  EXPLORER: {
    id: "EXPLORER",
    name: "THE EXPLORER",
    title: "The Explorer",
    statement: "You are energized by learning, discovery, and possibility.",
    description:
      "Kamu cenderung tidak ingin terlalu cepat memasukkan dirimu ke dalam satu kotak. Kamu menikmati menemukan hal baru, memahami bagaimana sesuatu bekerja, dan melihat kemungkinan yang sebelumnya belum pernah kamu pertimbangkan. Kamu mungkin merasa paling berkembang ketika berada di lingkungan yang membuatmu terus belajar dan bertemu dengan perspektif baru. Bagi kamu, belum tahu jawabannya bukan selalu sesuatu yang buruk. Kadang justru rasa penasaran terhadap jawabannya yang membuatmu bergerak.",
    strengths: [
      { title: "Curiosity", text: "Kamu tertarik memahami hal yang belum kamu ketahui." },
      { title: "Learning Agility", text: "Kamu relatif terbuka terhadap pengalaman dan cara berpikir baru." },
      { title: "Openness", text: "Kamu mampu melihat lebih dari satu kemungkinan sebelum mengambil keputusan." },
    ],
    awareOf: "Karena kamu bisa melihat banyak kemungkinan, kamu mungkin perlu memperhatikan apakah terlalu banyak pilihan justru membuatmu terlalu lama berada dalam fase eksplorasi.",
    nextOpportunity: "Exploration menjadi semakin berharga ketika akhirnya membantumu memilih sesuatu yang layak diperjuangkan.",
    reflectionQuestion: "Dari semua kemungkinan yang ada di depanmu, kehidupan seperti apa yang sebenarnya ingin kamu pilih?",
    // EXPLORER weights include inverse terms: (100 - Ownership) and (100 - Ambition).
    weights: { L: 0.40, V: 0.25, invO: 0.12, invA: 0.10, P: 0.08, R: 0.05 },
  },
};

// Fixed evaluation order — also used as the deterministic tie-break order
// (see js/scoring.js) since the locked spec references a tie-break rule
// without stating one explicitly.
window.APP_PROFILE_ORDER = ["BUILDER", "DRIVER", "CATALYST", "VISIONARY", "EXPLORER"];
