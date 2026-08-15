/**
 * SHEETS / BACKEND CLIENT
 * -----------------------------------------------------------------------
 * Talks to the Google Apps Script Web App defined in
 * /google-apps-script/Code.gs (see README.md for deployment steps).
 * One endpoint, three "action" values: submit | rsvp | getActiveEvent.
 *
 * If APP_CONFIG.API_ENDPOINT hasn't been configured yet, and
 * ALLOW_LOCAL_FALLBACK is true, submissions/RSVPs are stored in the
 * browser (localStorage) instead of failing outright, so the full flow
 * can be demoed before the real backend is wired up. Once a real
 * endpoint is set, all calls go there and failures surface as real
 * errors (never a silently-fake "success").
 * -----------------------------------------------------------------------
 */
window.SheetsClient = (function () {
  function isConfigured() {
    const url = window.APP_CONFIG.API_ENDPOINT;
    return !!url && url.indexOf("PASTE_YOUR_GOOGLE_APPS_SCRIPT") === -1;
  }

  function localKey(bucket) {
    return `cgc_local_${bucket}`;
  }

  function localSave(bucket, record) {
    const key = localKey(bucket);
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(record);
    localStorage.setItem(key, JSON.stringify(existing));
    return { ok: true, local: true };
  }

  async function post(payload) {
    if (!isConfigured()) {
      if (window.APP_CONFIG.ALLOW_LOCAL_FALLBACK) {
        return localSave(payload.action, payload);
      }
      throw new Error("API_ENDPOINT not configured");
    }

    const res = await fetch(window.APP_CONFIG.API_ENDPOINT, {
      method: "POST",
      // Apps Script Web Apps don't support custom preflight-triggering
      // headers well from a static site; text/plain avoids a CORS
      // preflight while the doPost handler on the Apps Script side
      // still parses the JSON body itself.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Submission failed (${res.status})`);
    }
    const data = await res.json();
    if (!data || data.ok !== true) {
      throw new Error((data && data.error) || "Submission was not confirmed by the server");
    }
    return data;
  }

  /**
   * Submits the completed assessment + contact info.
   * Returns a promise; caller is responsible for retry UI on failure.
   */
  function submitAssessment(record) {
    return post({ action: "submit", ...record });
  }

  function submitRsvp(record) {
    return post({ action: "rsvp", ...record });
  }

  /**
   * Fetches the currently active event. Returns null if none is active
   * or the request fails (caller shows the "no event" empty state either
   * way — a fetch failure and a genuinely empty Events sheet look the
   * same to the end user by design, per spec section 19).
   */
  async function getActiveEvent() {
    if (!isConfigured()) {
      const local = JSON.parse(localStorage.getItem(localKey("event_override")) || "null");
      return local; // null unless a demo event was set locally
    }
    try {
      const url = new URL(window.APP_CONFIG.API_ENDPOINT);
      url.searchParams.set("action", "getActiveEvent");
      const res = await fetch(url.toString(), { method: "GET" });
      if (!res.ok) return null;
      const data = await res.json();
      return data && data.event ? data.event : null;
    } catch (err) {
      return null;
    }
  }

  return { isConfigured, submitAssessment, submitRsvp, getActiveEvent };
})();
