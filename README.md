# Career & Growth Check

Website self-discovery assessment (15 pertanyaan → 6 Growth Dimensions →
5 Career & Growth Profiles) dengan referral tracking, Google Sheets
logging, dan section "Explore the Possibility" berbasis event aktif.

Tidak butuh build step. Semua file adalah HTML/CSS/JS polos — cukup
di-host sebagai static site (GitHub Pages, Netlify, Vercel, dsb — sama
seperti FBC landing page kamu).

## Struktur file

```
index.html                     shell halaman, memuat semua script
css/style.css                  seluruh styling
js/config.js                   EDIT INI — URL endpoint Google Sheets
js/data-questions.js           15 pertanyaan (locked content)
js/data-profiles.js            6 dimensi + 5 profil + bobot scoring (locked)
js/data-copy.js                semua teks statis: landing, contact gate,
                                share, explore possibility, event, RSVP (locked)
js/scoring.js                  mesin scoring — deterministik, tanpa AI
js/referral.js                 tangkap & simpan ?ref=Nama
js/sheets.js                   klien untuk kirim data ke Google Sheets
js/app.js                      router layar + rendering + form handling
google-apps-script/Code.gs     backend Apps Script (submit, rsvp, event)
```

Kalau nanti isi pertanyaan/profil/scoring perlu diubah, cukup edit
file di `js/data-*.js` — tidak perlu sentuh `app.js` atau CSS.

## Setup Google Sheets (5 menit)

1. Buat Google Sheet baru — ini akan jadi database submission, RSVP,
   dan daftar event.
2. Buka **Extensions → Apps Script**.
3. Hapus isi default, lalu paste seluruh isi `google-apps-script/Code.gs`.
4. Klik **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Klik Deploy, salin URL yang berakhiran `/exec`.
6. Buka `js/config.js`, tempel URL itu ke `API_ENDPOINT`.
7. Refresh Google Sheet-nya — tab `Submissions`, `RSVPs`, dan `Events`
   akan otomatis dibuat begitu ada data pertama masuk (atau setelah
   request pertama ke endpoint).

Sebelum `API_ENDPOINT` diisi, website tetap bisa dicoba end-to-end:
submission/RSVP disimpan sementara di browser (`localStorage`) supaya
kamu bisa demo alurnya duluan. Begitu URL asli dipasang, semua
tersimpan ke Sheets sungguhan dan kegagalan submit akan tampil sebagai
error asli (tidak ada "sukses" palsu).

## Kelola Events tanpa ubah kode

Tab **Events** di Google Sheet punya kolom:

`event_id | status | title | description | date | time | location | image_url | registration_url | display_order`

- Isi baris baru untuk event berikutnya.
- Set `status` = `ACTIVE` supaya tampil di "Explore the Possibility".
- Set `status` selain `ACTIVE` (mis. `DRAFT` atau `PAST`) untuk
  menyembunyikannya — tanpa perlu ubah kode apa pun.
- Kalau ada beberapa baris `ACTIVE`, yang `display_order` paling kecil
  yang ditampilkan.
- `image_url` untuk flyer dari Google Drive: buka file di Drive, klik
  **Share → Anyone with the link**, ambil FILE_ID dari URL-nya
  (`.../d/FILE_ID/view`), lalu isi kolom dengan:
  `https://drive.google.com/uc?export=view&id=FILE_ID`
- `registration_url` diisi link WhatsApp **dasar tanpa teks**, contoh:
  `https://wa.me/6281234567890`. Nomor ini bisa Anda ganti kapan saja
  di Sheets (mis. minggu ini pakai nomor Anda, minggu depan pakai
  nomor co-host) — situs otomatis ikut.

### Alur "Reserve My Seat"

1. Orang mengisi nama + WhatsApp + consent di form RSVP dalam situs.
2. Data itu tersimpan ke tab `RSVPs` (termasuk kolom `ref` — jadi Anda
   tahu siapa yang mereferensikan orang tersebut) sebagai arsip Anda.
   Ini berjalan di latar belakang dan tidak memblokir langkah 3 kalau
   Sheets sedang bermasalah.
3. Browser otomatis membuka WhatsApp ke nomor di `registration_url`,
   dengan pesan yang sudah terisi nama orang tersebut dan nama
   referrer-nya, contoh:
   *"Halo, saya Sarah (referral: Vicia), ingin reserve seat untuk
   Future Builders Circle pada 29 Agustus 2026 jam 10.00 WIB."*

## Referral

Bagikan link dengan `?ref=NamaKamu`, contoh:

```
https://domainkamu.com/?ref=Vicia
```

Nama itu otomatis tersimpan (session) dan ikut terekam di kolom `ref`
saat orang tersebut submit assessment atau RSVP. Tombol "Share Your
Result" otomatis membuat link baru dengan `?ref=` memakai nama orang
yang baru saja submit, supaya rantai referral berlanjut.

## Catatan tentang tie-break profil

Content Master menyebut "predefined tie-breaking rule" tanpa
menuliskan aturannya. Karena skor profil dihitung dari weighted sum
desimal, dasi (tie) hampir mustahil terjadi. Sebagai fallback teknis
(bukan konten baru), kalau suatu saat betul-betul dasi, urutan
menang mengikuti urutan profil di Content Master: Builder → Driver →
Catalyst → Visionary → Explorer. Ini didokumentasikan di
`js/scoring.js`.

## Checklist QA (sesuai 7 test di spesifikasi)

1. **Selesaikan assessment** → profil, primary & secondary pattern
   muncul benar.
2. **Submit contact form** → cek baris baru di tab `Submissions`
   (15 jawaban, skor, profil semua terekam).
3. **Buka `?ref=Vicia`, selesaikan assessment** → kolom `ref` di
   `Submissions` terisi `Vicia`.
4. **Klik Share Your Result** → WhatsApp share terbuka dengan link
   personal yang benar.
5. **Klik Explore the Possibility** → event aktif dari tab `Events`
   tampil.
6. **Set event jadi non-ACTIVE** → event hilang dari halaman publik
   tanpa redeploy.
7. **Matikan/rusak endpoint sementara** → user melihat pesan error
   yang jelas dan tombol "Coba lagi"; jawaban tidak hilang.

## Yang belum dibangun (sengaja, sesuai spesifikasi §20)

Arsitektur sudah disiapkan supaya nanti bisa ditambah tanpa rombak
besar: dashboard admin untuk lihat submission/referral performance,
UI untuk edit pertanyaan/profil tanpa sentuh kode, dsb. Belum
dibangun sekarang karena spesifikasi eksplisit meminta itu ("Do not
build unnecessary admin features now").
