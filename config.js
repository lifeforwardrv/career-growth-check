/**
 * CONFIG
 * -----------------------------------------------------------------------
 * Edit this file only — never the logic in app.js — to point the site at
 * your own Google Sheets backend, change the assessment name, etc.
 *
 * SUBMIT_ENDPOINT / EVENTS_ENDPOINT are Google Apps Script Web App URLs.
 * See /google-apps-script/Code.gs + README.md for setup instructions.
 * -----------------------------------------------------------------------
 */
window.APP_CONFIG = {
  // Paste the deployed Apps Script Web App URL here (ends in /exec).
  // One endpoint handles both submissions and event lookups (see Code.gs).
  API_ENDPOINT: "https://script.google.com/macros/s/AKfycbxaFsixJBWOCBi8aBycRGtlMW3-7CeOQfPwa1N-xMX7AyGHn1t51nGIpXCocpMkY-Nysw/exec",

  // Shown in the browser tab / share text.
  ASSESSMENT_NAME: "Career & Growth Check",

  // Base URL used when building the shareable referral link.
  // Leave empty to auto-detect from window.location.origin + pathname.
  SITE_BASE_URL: "",

  // Local fallback: if the API endpoint above hasn't been configured yet,
  // the app still works end-to-end and stores submissions in the browser
  // (localStorage) so you can demo / test the full flow before wiring up
  // Google Sheets. Set to false once API_ENDPOINT is live to force real
  // submission (no silent local fallback).
  ALLOW_LOCAL_FALLBACK: true,

  // Used only if an active event's registration_url column is empty.
  // Format: country code + number, no + no spaces, e.g. "6281234567890".
  FALLBACK_WHATSAPP: "",
};
