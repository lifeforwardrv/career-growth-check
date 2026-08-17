/**
 * DIMENSIONS + PROFILES — V2 CONTENT (per "Career & Growth Check V2" brief)
 * -----------------------------------------------------------------------
 * Positive-evidence-only scoring. No inverse/negative terms anywhere.
 * Profile content is intentionally long-form (Statement, Core Description,
 * 3 Natural Strengths, Something to Be Aware Of, Next Growth Opportunity,
 * a Question) plus a separate short Supporting Pattern description and
 * 25 combination insights (primary x supporting).
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

window.APP_DIMENSION_ORDER = ["A", "O", "R", "L", "P", "V"];

window.APP_PROFILES = {
  BUILDER: {
    id: "BUILDER",
    name: "THE BUILDER",
    title: "The Builder",
    statement: "I don\u2019t just want to participate. I want to build.",
    description: [
      "Kamu punya kecenderungan kuat untuk mengambil ownership dan membuat sesuatu bergerak. Ketika melihat sesuatu yang bisa dikembangkan, kamu relatif tidak nyaman hanya menunggu orang lain menentukan arah. Ada dorongan untuk mencoba, mengambil keputusan, menyelesaikan sesuatu, dan melihat hasil nyata dari apa yang kamu kerjakan.",
      "Bagi kamu, growth sering terasa paling nyata ketika kamu bisa mengatakan, \u2018Aku ikut membuat ini terjadi.\u2019",
      "Kamu mungkin menikmati kebebasan untuk menentukan cara bekerja, mengambil tanggung jawab yang lebih besar, dan melihat sesuatu berkembang dari sebuah ide menjadi sesuatu yang benar-benar ada.",
    ],
    strengths: [
      { title: "Ownership", text: "Kamu cenderung nyaman mengambil tanggung jawab dan tidak hanya menunggu orang lain menentukan arah." },
      { title: "Initiative", text: "Ketika melihat sesuatu yang bisa dikembangkan, kamu relatif mudah bergerak untuk mulai melakukan sesuatu." },
      { title: "Achievement", text: "Kamu menikmati progress yang bisa dilihat dan dirasakan, terutama ketika hasil tersebut berasal dari usaha yang kamu ambil sendiri." },
    ],
    awareOf: "Karena kamu terbiasa ingin membuat sesuatu bergerak, kamu mungkin perlu memperhatikan apakah keinginan untuk memastikan semuanya berjalan baik membuatmu mengambil terlalu banyak hal sendiri.\n\nOwnership tidak selalu berarti harus melakukan semuanya sendiri. Ada titik ketika growth justru datang dari kemampuan mempercayai, melibatkan, dan mengembangkan orang lain.",
    nextOpportunityTagline: "From building by yourself to building through others.",
    nextOpportunity: [
      "Membangun sesuatu sendiri adalah satu tahap. Tahap berikutnya adalah menciptakan sesuatu yang tetap bisa bertumbuh karena ada orang lain yang ikut memiliki, memahami, dan mengembangkannya bersamamu.",
      "Semakin besar sesuatu yang ingin kamu bangun, semakin penting kemampuanmu untuk menciptakan ownership pada orang lain \u2014 bukan hanya pada dirimu sendiri.",
    ],
    reflectionQuestion: "Apa yang sebenarnya ingin kamu bangun dalam 3\u20135 tahun ke depan \u2014 dan siapa yang ingin kamu ajak membangunnya bersamamu?",
    supportingDescription: "Selain pola utamamu, jawabanmu juga menunjukkan kecenderungan untuk mengambil ownership, membuat sesuatu bergerak, dan melihat ide menjadi sesuatu yang nyata.",
    weights: { O: 0.50, A: 0.25, V: 0.15, L: 0.05, P: 0.05 },
  },

  DRIVER: {
    id: "DRIVER",
    name: "THE DRIVER",
    title: "The Driver",
    statement: "I want to see how far I can go.",
    description: [
      "Kamu cenderung mendapatkan energi ketika memiliki sesuatu untuk dikejar. Target yang jelas, tantangan yang membuatmu tertantang, dan hasil yang bisa diukur dapat membuatmu merasa hidup dan bergerak maju.",
      "Kamu mungkin termasuk orang yang sulit benar-benar puas jika merasa masih bisa melakukan lebih banyak. Ketika menghadapi hambatan, ada bagian dalam dirimu yang justru terdorong untuk membuktikan bahwa kamu bisa melewatinya.",
      "Bagi kamu, growth bukan hanya tentang belajar sesuatu yang baru. Ada kebutuhan untuk melihat bahwa pembelajaran itu menghasilkan progress yang nyata.",
    ],
    strengths: [
      { title: "Achievement Drive", text: "Kamu menikmati tantangan dan pencapaian, terutama ketika ada sesuatu yang jelas untuk dikejar." },
      { title: "Resilience", text: "Kegagalan tidak selalu membuatmu berhenti; sering kali justru membuatmu mencari cara lain untuk terus maju." },
      { title: "Initiative", text: "Ketika tahu apa yang ingin dicapai, kamu cenderung lebih mudah bergerak dan mengambil tindakan." },
    ],
    awareOf: "Karena kamu cukup terbiasa mengejar hasil, kamu mungkin perlu memperhatikan apakah kecepatan dan pencapaian kadang membuatmu kurang menikmati proses atau kurang memberi ruang bagi orang lain untuk bergerak dengan ritmenya.\n\nTidak semua progress harus terjadi secepat mungkin.",
    nextOpportunityTagline: "From achieving more to building what lasts.",
    nextOpportunity: [
      "Pertumbuhan berikutnya mungkin bukan hanya tentang seberapa banyak yang bisa kamu capai, tetapi tentang apa yang bisa terus bertumbuh bahkan ketika kamu tidak harus selalu mendorongnya sendiri.",
      "Achievement memberi kamu momentum. Tetapi sustainability membutuhkan kemampuan membangun sistem, orang, dan sesuatu yang bisa berkembang dalam jangka panjang.",
    ],
    reflectionQuestion: "Kalau pencapaian bukan lagi satu-satunya ukuran keberhasilan, apa yang ingin kamu bangun melalui semua yang kamu capai?",
    supportingDescription: "Selain pola utamamu, jawabanmu juga menunjukkan dorongan terhadap progress, challenge, achievement, dan keinginan untuk melihat seberapa jauh kamu bisa berkembang.",
    weights: { A: 0.50, R: 0.30, O: 0.10, L: 0.05, V: 0.05 },
  },

  CATALYST: {
    id: "CATALYST",
    name: "THE CATALYST",
    title: "The Catalyst",
    statement: "I grow by helping people grow.",
    description: [
      "Kamu cenderung mendapatkan energi dari hubungan dengan orang lain. Kamu mungkin menikmati diskusi, kolaborasi, membantu seseorang melihat sesuatu dari perspektif baru, atau melihat orang lain berkembang karena kontribusimu.",
      "Bagi kamu, keberhasilan tidak selalu terasa lengkap kalau hanya kamu yang bertumbuh. Ada kepuasan ketika perkembanganmu juga membawa sesuatu yang positif bagi orang-orang di sekitarmu.",
      "Kamu mungkin berkembang paling baik ketika berada dalam lingkungan yang memungkinkanmu connect, contribute, influence, dan develop others.",
    ],
    strengths: [
      { title: "People", text: "Kamu cukup peka terhadap hubungan dan menikmati proses belajar serta berkembang bersama orang lain." },
      { title: "Influence", text: "Kamu memiliki kecenderungan untuk membantu orang melihat sesuatu dari sudut pandang yang berbeda." },
      { title: "Development", text: "Melihat orang lain bertumbuh karena kontribusimu dapat menjadi sumber kepuasan dan motivasi." },
    ],
    awareOf: "Karena hubungan dan kebutuhan orang lain cukup penting bagimu, kamu mungkin perlu memperhatikan apakah keinginan untuk membantu atau menjaga hubungan membuatmu terlalu sering menempatkan kebutuhan orang lain di atas arah pertumbuhanmu sendiri.\n\nMembantu orang lain bertumbuh tidak berarti kamu harus mengabaikan pertumbuhanmu sendiri.",
    nextOpportunityTagline: "From helping people one by one to creating an environment where people can grow.",
    nextOpportunity: [
      "Kemampuan membangun hubungan adalah kekuatan. Tetapi ketika dipadukan dengan ownership dan arah yang jelas, kekuatan tersebut bisa berkembang menjadi leadership.",
      "Level berikutnya bukan hanya menjadi seseorang yang membuat orang merasa didukung, tetapi seseorang yang mampu menciptakan lingkungan di mana orang lain benar-benar bertumbuh.",
    ],
    reflectionQuestion: "Apa yang bisa kamu bangun yang membuat lebih banyak orang ikut bertumbuh?",
    supportingDescription: "Selain pola utamamu, jawabanmu juga menunjukkan kecenderungan untuk berkembang melalui people, connection, influence, dan membantu orang lain bertumbuh.",
    weights: { P: 0.55, O: 0.20, L: 0.10, V: 0.10, R: 0.05 },
  },

  VISIONARY: {
    id: "VISIONARY",
    name: "THE VISIONARY",
    title: "The Visionary",
    statement: "I want my work to mean something bigger.",
    description: [
      "Kamu cenderung melihat kesuksesan bukan hanya dari hasil pribadi, tetapi dari sesuatu yang lebih besar yang ingin kamu bangun, ubah, atau tinggalkan.",
      "Kamu mungkin sering bertanya bukan hanya \u2018Apa yang bisa aku lakukan?\u2019, tetapi juga \u2018Untuk apa aku melakukan ini?\u2019",
      "Meaning, impact, future possibilities, dan arah jangka panjang dapat menjadi sumber motivasi yang penting bagimu. Kamu mungkin merasa lebih engaged ketika pekerjaan atau aktivitasmu terasa memiliki hubungan dengan sesuatu yang kamu anggap penting.",
    ],
    strengths: [
      { title: "Purpose", text: "Kamu cenderung mencari alasan yang lebih dalam di balik apa yang kamu kerjakan." },
      { title: "Future Orientation", text: "Kamu mampu membayangkan kemungkinan dan melihat sesuatu melampaui kondisi saat ini." },
      { title: "Impact", text: "Kamu tertarik pada bagaimana apa yang kamu lakukan dapat memberikan manfaat atau perubahan yang lebih luas." },
    ],
    awareOf: "Karena kamu bisa melihat gambaran besar, kamu mungkin perlu memperhatikan apakah vision yang besar membuat langkah kecil terasa terlalu biasa atau terlalu lambat.\n\nVision yang kuat tetap membutuhkan tindakan yang sederhana, konsisten, dan nyata.",
    nextOpportunityTagline: "From seeing what could be to making it real.",
    nextOpportunity: [
      "Vision menjadi semakin kuat ketika diterjemahkan menjadi pilihan, prioritas, dan tindakan yang bisa dilakukan sekarang.",
      "Kamu tidak harus langsung mengetahui seluruh jalannya. Tetapi kamu perlu menemukan langkah berikutnya yang cukup jelas untuk membuat vision tersebut mulai bergerak.",
    ],
    reflectionQuestion: "Kalau 5 tahun ke depan benar-benar berjalan seperti yang kamu harapkan, apa yang akan berbeda bagi orang lain karena apa yang kamu lakukan hari ini?",
    supportingDescription: "Selain pola utamamu, jawabanmu juga menunjukkan kecenderungan untuk mencari purpose, melihat kemungkinan jangka panjang, dan menghubungkan growth dengan sesuatu yang lebih meaningful.",
    weights: { V: 0.55, P: 0.20, L: 0.10, A: 0.10, O: 0.05 },
  },

  EXPLORER: {
    id: "EXPLORER",
    name: "THE EXPLORER",
    title: "The Explorer",
    statement: "I\u2019m still discovering what\u2019s possible.",
    description: [
      "Kamu tampaknya berkembang melalui exposure, belajar, curiosity, dan mencoba berbagai kemungkinan. Kamu tidak selalu merasa perlu langsung mengetahui jawaban atau memilih satu arah sejak awal.",
      "Rasa penasaran terhadap sesuatu yang belum kamu ketahui dapat menjadi sumber energi. Kamu mungkin menikmati pengalaman baru, perspektif berbeda, dan kesempatan untuk mencoba sesuatu yang belum pernah kamu lakukan.",
      "Bagi kamu, growth sering dimulai dari pertanyaan: \u2018What else is possible?\u2019",
      "Dan itu adalah kekuatan. Tetapi semakin banyak kemungkinan yang kamu lihat, semakin penting kemampuan untuk memilih kemungkinan mana yang layak diuji lebih jauh.",
    ],
    strengths: [
      { title: "Curiosity", text: "Kamu tertarik memahami sesuatu yang belum kamu ketahui." },
      { title: "Learning Agility", text: "Kamu relatif terbuka terhadap pengalaman dan cara berpikir baru." },
      { title: "Openness", text: "Kamu mampu melihat lebih dari satu kemungkinan sebelum mengambil keputusan." },
    ],
    awareOf: "Karena kamu bisa melihat banyak kemungkinan, terlalu banyak pilihan juga bisa membuatmu terlalu lama berada dalam fase eksplorasi.\n\nTidak semua kemungkinan harus dipilih. Tetapi beberapa kemungkinan perlu diberi kesempatan untuk diuji agar kamu tahu apakah benar-benar cocok untukmu.",
    nextOpportunityTagline: "From exploration to experimentation.",
    nextOpportunity: [
      "Kamu tidak harus buru-buru menentukan satu jalan untuk selamanya. Tetapi exploration menjadi semakin berharga ketika akhirnya membantumu memilih sesuatu yang cukup menarik untuk dicoba secara nyata.",
      "Daripada bertanya \u2018Apa pilihan yang paling sempurna?\u2019, mungkin pertanyaan yang lebih berguna adalah: \u2018Apa yang cukup menarik untuk aku coba berikutnya?\u2019",
    ],
    reflectionQuestion: "Dari semua kemungkinan yang ada di depanmu, kehidupan seperti apa yang sebenarnya ingin kamu pilih?",
    supportingDescription: "Selain pola utamamu, jawabanmu juga menunjukkan curiosity, openness, dan keinginan untuk terus belajar serta mengeksplorasi kemungkinan baru.",
    weights: { L: 0.60, V: 0.20, P: 0.10, A: 0.05, R: 0.05 },
  },
};

window.APP_PROFILE_ORDER = ["BUILDER", "DRIVER", "CATALYST", "VISIONARY", "EXPLORER"];

/**
 * 25 COMBINATION INSIGHTS (primary x supporting)
 * Shown alongside the Supporting Pattern description when both are known.
 */
window.APP_COMBINATIONS = {
  BUILDER: {
    BUILDER: "Ownership adalah pola yang sangat kuat dalam caramu berkembang. Kamu bukan hanya nyaman mengambil tanggung jawab, tetapi juga menikmati ketika bisa melihat sesuatu bergerak karena keputusan dan usahamu sendiri.\n\nTantangan berikutnya mungkin bukan membuktikan bahwa kamu bisa membangun sesuatu, tetapi memilih apa yang benar-benar layak dibangun dan bagaimana membuatnya terus bertumbuh tanpa semuanya bergantung padamu.",
    DRIVER: "Kamu tidak hanya ingin membangun sesuatu. Kamu juga ingin melihat hasilnya bergerak maju.\n\nKombinasi ini bisa membuatmu sangat action-oriented: kamu suka mengambil ownership sekaligus menikmati target yang jelas. Tantangannya adalah memastikan kecepatan mengejar hasil tidak membuatmu membangun sesuatu yang sebenarnya tidak terlalu kamu pedulikan.",
    CATALYST: "Kamu punya dorongan untuk membuat sesuatu bergerak, tetapi orang lain juga memainkan peran penting dalam cara kamu berkembang.\n\nPotensimu bisa semakin besar ketika kemampuan membangun sesuatu tidak berhenti pada \u2018aku bisa melakukannya\u2019, tetapi berkembang menjadi \u2018aku bisa membuat orang lain ikut membangunnya.\u2019",
    VISIONARY: "Kamu punya kecenderungan untuk membuat sesuatu menjadi nyata, sekaligus memikirkan ke mana sesuatu itu seharusnya membawa kamu.\n\nKamu mungkin paling puas ketika tindakanmu bukan hanya menghasilkan sesuatu, tetapi menghasilkan sesuatu yang punya arah dan arti.",
    EXPLORER: "Kamu punya dorongan untuk membuat sesuatu bergerak, tetapi kamu juga tidak ingin terlalu cepat membatasi kemungkinan.\n\nKekuatanmu bisa muncul ketika kamu mengubah eksplorasi menjadi eksperimen: tidak sekadar mencari kemungkinan, tetapi mencoba satu kemungkinan sampai menjadi sesuatu yang nyata.",
  },
  DRIVER: {
    BUILDER: "Kamu punya dorongan kuat untuk mencapai sesuatu, tetapi ada juga kebutuhan untuk memiliki sesuatu yang bisa kamu bangun dan kembangkan.\n\nKamu mungkin tidak puas hanya dengan memenangkan permainan yang sudah dibuat orang lain. Pada titik tertentu, kamu bisa mulai bertanya: \u2018Apa yang bisa aku bangun sendiri?\u2019",
    DRIVER: "Progress dan achievement tampaknya menjadi sumber energi yang kuat bagimu.\n\nTantanganmu mungkin bukan mencari motivasi, tetapi memastikan bahwa apa yang kamu kejar memang layak dikejar dan bahwa pencapaian tersebut membawa kamu ke arah kehidupan yang kamu inginkan.",
    CATALYST: "Kamu punya dorongan untuk mencapai hasil, tetapi hubungan dan perkembangan orang lain juga punya tempat penting dalam caramu bertumbuh.\n\nLevel berikutnya mungkin bukan hanya menjadi orang yang paling cepat mencapai target, tetapi menjadi orang yang membuat orang lain ikut mencapai lebih banyak.",
    VISIONARY: "Kamu suka progress dan pencapaian, tetapi ada sisi lain yang ingin memastikan bahwa semua itu menuju sesuatu yang lebih besar.\n\nAmbition memberi kamu tenaga untuk bergerak. Vision membantu menentukan ke mana tenaga itu seharusnya diarahkan.",
    EXPLORER: "Kamu punya dorongan untuk maju, tetapi juga cukup terbuka terhadap kemungkinan dan cara baru untuk berkembang.\n\nKamu mungkin berkembang paling cepat ketika punya target yang jelas tetapi cara mencapainya tetap memberi ruang untuk belajar dan bereksperimen.",
  },
  CATALYST: {
    BUILDER: "Kamu mendapatkan energi dari orang lain, tetapi juga punya dorongan untuk membuat sesuatu bergerak.\n\nPotensimu mungkin muncul ketika kamu tidak hanya membantu orang lain berkembang, tetapi menciptakan sesuatu yang membuat lebih banyak orang bisa berkembang.",
    DRIVER: "Kamu peduli pada orang lain, tetapi kamu juga menikmati progress dan pencapaian.\n\nKamu bisa menjadi orang yang tidak hanya membuat orang merasa didukung, tetapi juga membantu mereka bergerak menuju hasil yang nyata.",
    CATALYST: "People dan development tampaknya menjadi bagian yang sangat kuat dalam caramu berkembang.\n\nTantangan berikutnya adalah memperluas impact: bukan hanya membantu satu orang pada satu waktu, tetapi membangun cara yang membuat pertumbuhan bisa terjadi berulang kali.",
    VISIONARY: "Kamu berkembang melalui orang lain dan pada saat yang sama mencari sesuatu yang lebih meaningful.\n\nKombinasi ini bisa membuatmu sangat tertarik pada pekerjaan atau lingkungan di mana impact terhadap manusia terasa nyata.",
    EXPLORER: "Kamu mendapatkan energi dari hubungan, sekaligus tertarik pada pengalaman dan kemungkinan baru.\n\nKamu mungkin berkembang paling baik ketika bisa belajar bersama orang lain, bertukar perspektif, dan menemukan kemungkinan baru melalui hubungan.",
  },
  VISIONARY: {
    BUILDER: "Kamu punya gambaran tentang sesuatu yang lebih besar, sekaligus dorongan untuk membuatnya menjadi nyata.\n\nTantanganmu bukan hanya memiliki visi yang bagus. Dunia berubah ketika visi diterjemahkan menjadi sesuatu yang bisa dibangun.",
    DRIVER: "Kamu tidak hanya ingin sesuatu memiliki arti. Kamu juga ingin melihat sesuatu benar-benar bergerak.\n\nAmbition bisa menjadi mesin yang membawa vision-mu keluar dari kepala dan masuk ke dunia nyata.",
    CATALYST: "Kamu peduli pada arah dan makna, sekaligus melihat orang lain sebagai bagian penting dari perubahan.\n\nVision yang kuat tidak hanya membutuhkan ide. Ia membutuhkan orang yang percaya, ikut bergerak, dan merasa menjadi bagian dari sesuatu.",
    VISIONARY: "Kamu cenderung melihat lebih jauh dari kebutuhan saat ini dan memikirkan apa yang mungkin diciptakan di masa depan.\n\nTantanganmu adalah menjaga agar vision tidak berhenti sebagai sesuatu yang menginspirasi. Vision menjadi kuat ketika diterjemahkan menjadi pilihan dan tindakan.",
    EXPLORER: "Kamu punya sense of purpose, tetapi kamu juga ingin terus memahami kemungkinan sebelum menentukan arah.\n\nKamu bisa sangat kuat dalam melihat \u2018what could be\u2019. Tantangannya adalah mengubah banyak kemungkinan menjadi satu arah yang cukup jelas untuk diuji.",
  },
  EXPLORER: {
    BUILDER: "Kamu suka menemukan kemungkinan baru, tetapi ada juga dorongan untuk membuat sesuatu menjadi nyata.\n\nCuriosity-mu tidak harus berhenti pada eksplorasi. Kamu punya potensi untuk mencoba, membangun, lalu belajar dari apa yang kamu buat.",
    DRIVER: "Kamu suka belajar dan menemukan kemungkinan baru, tetapi juga punya dorongan untuk melihat progress yang nyata.\n\nKamu mungkin berkembang paling baik ketika diberi tantangan + ruang belajar + hasil yang bisa dilihat.",
    CATALYST: "Kamu tidak hanya tertarik pada kemungkinan baru. Kamu juga mendapatkan energi dari orang-orang, perspektif, dan perkembangan bersama.\n\nKamu mungkin berkembang paling baik ketika eksplorasi tidak dilakukan sendirian \u2014 ketika ada orang yang bisa diajak berdiskusi, mencoba, memberi perspektif, dan bertumbuh bersama.",
    VISIONARY: "Kamu terbuka terhadap banyak kemungkinan, tetapi pada saat yang sama ada kebutuhan untuk menemukan sesuatu yang terasa meaningful.\n\nTantanganmu bukan kekurangan pilihan. Justru mungkin terlalu banyak pilihan. Vision bisa membantu curiosity-mu menemukan arah.",
    EXPLORER: "Learning, curiosity, dan openness tampaknya menjadi pola yang sangat kuat dalam caramu berkembang.\n\nKamu mungkin sedang berada dalam fase di mana exposure sangat penting. Kamu tidak perlu buru-buru menentukan seluruh masa depan \u2014 tetapi jangan biarkan eksplorasi menjadi alasan untuk tidak pernah memilih sesuatu untuk diuji.",
  },
};
