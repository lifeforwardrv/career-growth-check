/**
 * COPY — LOCKED CONTENT
 * -----------------------------------------------------------------------
 * All static, non-question text pulled verbatim from the Content Master.
 * -----------------------------------------------------------------------
 */
window.APP_COPY = {
  landing: {
    eyebrow: "A self-reflection tool",
    headline: "What\u2019s your next growth move?",
    description:
      "Bukan tes psikologi, bukan tes karier. Ini refleksi singkat untuk melihat pola caramu berkembang \u2014 dan kemungkinan apa yang layak kamu jelajahi.",
    cta: "Mulai Refleksi \u2192",
    chips: ["\u00B13 menit", "15 pertanyaan", "Gratis"],
    disclaimer:
      "Tidak ada jawaban benar atau salah. Pilih yang paling terasa seperti kamu \u2014 bukan jawaban yang menurutmu paling ideal. Ini adalah snapshot reflektif, bukan tes psikologis atau diagnosis.",
  },

  questionnaire: {
    back: "Kembali",
    next: "Lanjut",
    finish: "Lihat Hasilku",
    progressLabel: (n, total) => `Pertanyaan ${n} dari ${total}`,
  },

  resultDisclaimer: {
    title: "A reflection, not a diagnosis.",
    body: "Career & Growth Check is a self-reflection tool. Your result is not a psychological test, diagnosis, or a definitive career recommendation. Use it as a starting point to understand patterns in how you tend to grow, reflect on your current situation, and explore what might be next.",
  },

  result: {
    primaryEyebrow: "YOUR PRIMARY PATTERN",
    blendedEyebrow: "YOUR GROWTH PATTERN",
    blendNote: "Jawabanmu menunjukkan campuran yang cukup seimbang antara dua pola \u2014 ini bukan berarti kamu punya dua kepribadian berbeda, tapi caramu berkembang punya dua sisi yang sama-sama kuat.",
    sectionLabels: {
      strengths: "Natural Strengths",
      awareOf: "Something to Be Aware Of",
      nextOpportunity: "Your Next Growth Opportunity",
      reflection: "A Question Worth Exploring",
      supporting: "Your Supporting Pattern",
      combination: "What This Might Mean Together",
    },
  },

  growthIntent: {
    heading: "What feels most relevant to you right now?",
    sub: "Hasil ini bukan untuk memberi tahu kamu harus memilih apa. Tapi mungkin ada beberapa kondisi yang bisa membantu kamu berkembang lebih jauh. Coba lihat mana yang paling terasa relevan dengan situasimu sekarang.",
    instruction: "\u261D\uFE0F Pilih salah satu di bawah ini untuk melanjutkan \u2014 assessment kamu belum selesai sampai di sini.",
    options: [
      { id: "grow_here", label: "Grow where I am", description: "Aku ingin mengembangkan diriku lebih jauh di lingkungan yang sekarang." },
      { id: "explore_side", label: "Explore something on the side", description: "Aku penasaran dengan kemungkinan baru di luar aktivitas utamaku." },
      { id: "build_own", label: "Build something of my own", description: "Aku tertarik melihat seperti apa rasanya membangun sesuatu milikku sendiri." },
      { id: "still_figuring", label: "I\u2019m still figuring it out", description: "Aku belum tahu, dan aku masih ingin mengeksplorasi." },
    ],
  },

  share: {
    heading: "SHARE",
    subheading: "Kenal seseorang yang mungkin penasaran dengan profile-nya?",
    body: "Bagikan Career & Growth Check ini. Mereka akan mendapatkan assessment mereka sendiri.",
    cta: "Share Career & Growth Check \u2192",
    waMessageTemplate: (url) =>
      `Aku baru selesai isi Career & Growth Check \u2014 semacam refleksi singkat soal pola growth diri sendiri. Coba juga, cuma ${"\u00B13 menit"}: ${url}`,
  },

  event: {
    eyebrow: "ONE STEP WORTH EXPLORING",
    label: "UPCOMING EVENT",
    heading: "Explore the Possibility",
    body: "Kesempatan untuk melihat pilihan lain dalam perjalanan kariermu \u2014 mengenal bagaimana sebuah bisnis bekerja, seperti apa cara memulainya, dan apakah kemungkinan ini cocok untukmu.",
    cta: "Reserve My Seat \u2192",
    emptyState: {
      heading: "Event belum tersedia",
      body: "Detail event belum bisa diambil dari database.",
      retry: "Coba lagi",
    },
  },

  rsvp: {
    heading: "RESERVE YOUR SEAT",
    subheading: "Save your seat",
    body: "Data kontakmu sudah tersimpan. Kami hanya perlu konfirmasi untuk RSVP event ini.",
    fields: {
      name: "Nama",
      whatsapp: "WhatsApp",
    },
    consent: "Saya bersedia dihubungi melalui WhatsApp untuk informasi dan reminder terkait event ini.",
    cta: "Reserve My Seat \u2192",
    waMessageTemplate: (name, eventTitle, eventDate, eventTime, ref) => {
      const refLine = ref ? ` (referral: ${ref})` : "";
      return `Halo, saya ${name}${refLine}, ingin reserve seat untuk ${eventTitle} pada ${eventDate} jam ${eventTime}.`;
    },
    success: {
      heading: "YOU'RE IN",
      subheading: "Your seat is reserved.",
      body: "Terima kasih. Detail event dan reminder akan dikirim melalui WhatsApp.",
      footer: "Sampai ketemu di event.",
    },
  },

  errors: {
    missingAnswer: "Pilih salah satu jawaban dulu, ya, sebelum lanjut.",
    invalidWhatsapp: "Nomor WhatsApp sepertinya belum valid. Coba periksa lagi format nomornya (contoh: 08123456789).",
    invalidName: "Nama belum diisi.",
    invalidInstagram: "Instagram belum diisi.",
    consentRequired: "Kami perlu persetujuanmu sebelum melanjutkan.",
    submitFailed: "Hasil kamu sudah lengkap, tapi ada gangguan saat menyimpan data. Yuk coba kirim sekali lagi \u2014 jawabanmu tidak hilang.",
    retry: "Coba lagi",
    networkGeneric: "Ada gangguan koneksi. Coba lagi sebentar lagi.",
  },
};
