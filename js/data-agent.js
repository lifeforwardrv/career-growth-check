/**
 * DEFAULT AGENT (fallback)
 * -----------------------------------------------------------------------
 * PLACEHOLDER CONTENT — please replace `background` and `whyRelevant`
 * with your real bio before this goes live. This is what's shown when
 * a visitor's ?ref= doesn't match anyone in the (future) Agents sheet,
 * or before Phase 3 wires up dynamic per-agent data at all.
 * -----------------------------------------------------------------------
 */
/**
 * DEFAULT AGENT (last-resort fallback only)
 * -----------------------------------------------------------------------
 * Agent info for the "Meet [Name]" card now comes from the Events sheet
 * row assigned to the visitor's ref (title -> name, description ->
 * why-relevant text, image_url -> photo) — see loadAgentInfo() in app.js.
 * This object is ONLY used when no matching Events row exists at all
 * (e.g. an unconfigured ref, or before you've set up Events yet), so the
 * card never breaks or shows blank content.
 * -----------------------------------------------------------------------
 */
window.APP_DEFAULT_AGENT = {
  ref: "",
  name: "Vicia",
  photoUrl: "",
  whyRelevant: "Ngobrol singkat untuk membantu kamu melihat hasil ini dari sudut pandang lain.",
};
