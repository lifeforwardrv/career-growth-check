/**
 * COPY — LOCKED CONTENT
 * -----------------------------------------------------------------------
 * All static, non-question text pulled verbatim from the Content Master.
 * -----------------------------------------------------------------------
 */
window.APP_COPY = {
  landing: {
    eyebrow: "A 3-minute self-discovery",
    headline: "What kind of growth fits you?",
    description:
      "15 pertanyaan singkat untuk melihat pola bagaimana kamu mengejar growth, menghadapi tantangan, belajar, berkembang bersama orang lain, dan melihat kemungkinan di depanmu.",
    cta: "Mulai Career & Growth Check \u2192",
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

  contactGate: {
    kicker: "YOUR PROFILE IS READY",
    heading: "Almost there",
    subheading: "Dapatkan full Career & Growth Profile-mu.",
    body: "Kamu sudah menyelesaikan assessment. Masukkan data di bawah untuk melihat hasil lengkapmu.",
    previewItems: [
      { title: "Natural strengths", text: "Pola kekuatan yang paling menonjol dari jawabanmu." },
      { title: "Something to Be Aware Of", text: "Area yang mungkin layak kamu perhatikan dalam perjalanan growth-mu." },
      { title: "Your next growth opportunity", text: "Satu perspektif untuk membantumu melihat langkah berikutnya." },
    ],
    fields: {
      name: "Nama",
      whatsapp: "WhatsApp",
      city: "Domisili",
    },
    cityOptions: [
      "Jakarta Selatan",
      "Jakarta Pusat",
      "Jakarta Barat",
      "Jakarta Timur",
      "Jakarta Utara",
      "Tangerang / Tangerang Selatan",
      "Bekasi",
      "Depok",
      "Bogor",
      "Luar Jabodetabek",
    ],
    consent: "Saya bersedia dihubungi melalui WhatsApp terkait hasil profile dan informasi lanjutan yang relevan.",
    cta: "See My Full Profile \u2192",
    notice: "Data digunakan untuk menyimpan hasil profile dan follow-up terkait Career & Growth Check.",
  },

  result: {
    secondaryLabel: "Your secondary pattern",
    secondaryTemplate: (profileName) => `${profileName} \u2014 ada pola ${profileName} yang juga cukup terlihat dalam jawabanmu.`,
    sectionLabels: {
      strengths: "Natural Strengths",
      awareOf: "Something to Be Aware Of",
      nextOpportunity: "Your Next Growth Opportunity",
      reflection: "Question Worth Exploring",
    },
  },

  share: {
    heading: "SHARE",
    subheading: "Kenal seseorang yang mungkin penasaran dengan profile-nya?",
    body: "Bagikan Career & Growth Check ini. Mereka akan mendapatkan assessment mereka sendiri.",
    cta: "Share Career & Growth Check \u2192",
    waMessageTemplate: (url) =>
      `Aku baru selesai isi Career & Growth Check \u2014 semacam refleksi singkat soal pola growth diri sendiri. Coba juga, cuma ${"\u00B13 menit"}: ${url}`,
  },

  explorePossibility: {
    heading: "ONE POSSIBILITY WORTH EXPLORING",
    headline: "What if your next career move isn\u2019t what you expected?",
    body: "Kenali satu jalur yang mungkin belum pernah kamu pertimbangkan sebelumnya.",
    subBody: "",
    cta: "Explore a Different Path \u2192",
  },

  event: {
    eyebrow: "ONE POSSIBILITY WORTH EXPLORING",
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
    invalidCity: "Pilih domisili dulu, ya.",
    consentRequired: "Kami perlu persetujuanmu sebelum melanjutkan.",
    submitFailed: "Hasil kamu sudah lengkap, tapi ada gangguan saat menyimpan data. Yuk coba kirim sekali lagi \u2014 jawabanmu tidak hilang.",
    retry: "Coba lagi",
    networkGeneric: "Ada gangguan koneksi. Coba lagi sebentar lagi.",
  },
};
