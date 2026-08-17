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
   * Builds a shareable link that preserves the ORIGINAL referrer for the
   * whole chain — i.e. if Kenvin's link brought someone in, and that
   * person shares their result with a friend, the friend's link still
   * carries ?ref=Kenvin (not the person's own name). This keeps every
   * lead in a chain attributed to whoever first brought people in,
   * rather than resetting at each share.
   */
  function buildShareUrl() {
    const url = new URL(baseUrl());
    url.searchParams.set("ref", get() || "friend");
    return url.toString();
  }

  return { capture, get, buildShareUrl };
})();
