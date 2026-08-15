/**
 * REFERRAL
 * -----------------------------------------------------------------------
 * Captures ?ref=Name from the URL on first load, keeps it attached for the
 * whole session (survives navigation between question screens and a page
 * refresh via sessionStorage), and exposes a helper to build share links.
 * The referral value is internal attribution only — never shown to the
 * referred user, and never used to expose recruitment information.
 * -----------------------------------------------------------------------
 */
window.Referral = (function () {
  const STORAGE_KEY = "cgc_referrer";

  function capture() {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref && ref.trim()) {
      sessionStorage.setItem(STORAGE_KEY, ref.trim());
    }
    return get();
  }

  function get() {
    return sessionStorage.getItem(STORAGE_KEY) || "";
  }

  function baseUrl() {
    if (window.APP_CONFIG.SITE_BASE_URL) return window.APP_CONFIG.SITE_BASE_URL;
    return window.location.origin + window.location.pathname;
  }

  /**
   * Builds a shareable link that preserves the CURRENT USER as the new
   * referrer (so their contacts land with ?ref=<their name>), per spec
   * section 17 ("The shared link should preserve the referrer" = the
   * person who is doing the sharing).
   */
  function buildShareUrl(sharerName) {
    const url = new URL(baseUrl());
    url.searchParams.set("ref", sharerName || get() || "friend");
    return url.toString();
  }

  return { capture, get, buildShareUrl };
})();
