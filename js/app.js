/**
 * APP
 * -----------------------------------------------------------------------
 * Vanilla JS screen router + renderer. No build step required.
 * All content lives in data-*.js; all math lives in scoring.js;
 * all network calls live in sheets.js. This file only wires them
 * together and draws the UI.
 * -----------------------------------------------------------------------
 */
(function () {
  const root = document.getElementById("app");
  const QUESTIONS = window.APP_QUESTIONS;
  const COPY = window.APP_COPY;
  const DIMS = window.APP_DIMENSIONS;
  const DIM_ORDER = window.APP_DIMENSION_ORDER;
  const PROFILES = window.APP_PROFILES;
  const COMBINATIONS = window.APP_COMBINATIONS;

  const SESSION_KEY = "cgc_session_v1";

  // Which event category(ies) to show for each growth-intent choice.
  const INTENT_CATEGORIES = {
    grow_here: ["class"],
    explore_side: ["nbo"],
    build_own: ["nbo"],
    still_figuring: ["class", "nbo"],
  };

  /** ---------------- state ---------------- */
  let state = restoreSession() || {
    screen: "landing",
    qIndex: 0,
    answers: {}, // { questionId: optionId }
    growthIntent: null, // one of growthIntent.options[].id — self-reflection, not a gate
    result: null, // computed by scoreAssessment (available immediately after Q15, no contact needed)
    submission: { status: "idle", error: null }, // idle | pending | done | error
    events: undefined, // undefined = not fetched yet, [] = none active, [event,...] = active events
    selectedEvent: null, // the event the person clicked "Reserve My Seat" on
    rsvp: { status: "idle", error: null },
    finished: false, // once true, the session is no longer persisted — a refresh starts fresh at landing
    expandedEventId: null, // which event card currently has its inline RSVP form open
  };

  function saveSession() {
    try {
      if (state.finished) {
        // Journey is done — don't keep it around. A refresh from here on
        // (whether still on the result page, or after exploring events)
        // should start a brand-new session at the landing page.
        sessionStorage.removeItem(SESSION_KEY);
      } else {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
      }
    } catch (e) {
      /* non-fatal */
    }
  }

  function restoreSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setState(patch) {
    state = { ...state, ...patch };
    saveSession();
    render();
  }

  // Not persisted across refresh on purpose \u2014 a fresh page load always
  // starts with no back-history, which is fine since it also starts at
  // the landing screen.
  let history = [];

  // Screens that should never appear as a back-target (transient/loading —
  // landing on the way back to one of these would be confusing).
  const TRANSIENT_SCREENS = ["eventLoading", "registering"];

  function go(screen, extra) {
    if (state.screen !== screen && !TRANSIENT_SCREENS.includes(state.screen)) {
      history.push(state.screen);
    }
    setState({ screen, ...(extra || {}) });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function goBack() {
    const prev = history.pop();
    setState({ screen: prev || "landing" });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /** ---------------- validation helpers ---------------- */
  function isValidWhatsapp(v) {
    const digits = (v || "").replace(/[^\d]/g, "");
    return digits.length >= 9 && digits.length <= 15;
  }

  /** Renders text as one or more <p> tags. Accepts an array of paragraphs
   * or a single string with blank-line-separated paragraphs. */
  function renderParagraphs(text) {
    const parts = Array.isArray(text) ? text : String(text || "").split(/\n\n+/);
    return parts.map((p) => `<p>${p}</p>`).join("");
  }

  /** ---------------- SVG: signature growth-print radar ---------------- */
  function radarPoint(cx, cy, radius, index, total, valueRatio) {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = radius * valueRatio;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  }

  function renderRadar(scores) {
    const size = 420;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 122;
    const total = DIM_ORDER.length;
    const rings = [0.25, 0.5, 0.75, 1];

    const ringPolys = rings
      .map((ratio) => {
        const pts = DIM_ORDER.map((_, i) => radarPoint(cx, cy, radius, i, total, ratio).join(",")).join(" ");
        return `<polygon points="${pts}" fill="none" stroke="#E1DCCF" stroke-width="1"/>`;
      })
      .join("");

    const axisLines = DIM_ORDER.map((_, i) => {
      const [x, y] = radarPoint(cx, cy, radius, i, total, 1);
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#E1DCCF" stroke-width="1"/>`;
    }).join("");

    const dataPts = DIM_ORDER.map((dim, i) => radarPoint(cx, cy, radius, i, total, Math.max(scores[dim], 4) / 100));
    const dataPoly = dataPts.map((p) => p.join(",")).join(" ");
    const dots = dataPts
      .map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#D9794A"/>`)
      .join("");

    const labels = DIM_ORDER.map((dim, i) => {
      const [x, y] = radarPoint(cx, cy, radius + 30, i, total, 1);
      const anchor = x < cx - 4 ? "end" : x > cx + 4 ? "start" : "middle";
      return `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" font-family="Poppins, sans-serif" font-weight="600" font-size="9.5" fill="#6B6A63" letter-spacing="0.1">${DIMS[dim].label.toUpperCase()}</text>`;
    }).join("");

    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Growth dimension pattern">
      ${ringPolys}${axisLines}
      <polygon points="${dataPoly}" fill="#D9794A" fill-opacity="0.28" stroke="#D9794A" stroke-width="2.5"/>
      ${dots}${labels}
    </svg>`;
  }

  function renderGrowthMark() {
    // Decorative hero mark: plain hexagon outline echoing the 6 dimensions,
    // with a small sprouting line — the recurring "growth print" signature.
    return `<svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="43,6 76,24.5 76,61.5 43,80 10,61.5 10,24.5" stroke="#D9794A" stroke-width="1.4"/>
      <polygon points="43,22 62,33 62,55 43,66 24,55 24,33" stroke="#E6E2D8" stroke-width="1.2"/>
      <path d="M43 66 C 43 52, 43 46, 43 38" stroke="#7C8A63" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M43 46 C 38 44, 35 40, 35 36" stroke="#7C8A63" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <path d="M43 52 C 48 50, 51 46, 51 42" stroke="#7C8A63" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <circle cx="43" cy="66" r="2.4" fill="#D9794A"/>
    </svg>`;
  }

  /** ---------------- screen: landing ---------------- */
  function screenLanding() {
    const c = COPY.landing;
    return `
      <div class="screen landing">
        <div class="growth-mark">${renderGrowthMark()}</div>
        <span class="eyebrow">${c.eyebrow}</span>
        <h1 class="display">${c.headline}</h1>
        <p class="description">${c.description}</p>
        <div class="chip-row">${c.chips.map((ch) => `<span class="chip">${ch}</span>`).join("")}</div>
        <button class="btn btn-primary" data-action="start">${c.cta}</button>
        <p class="disclaimer">${c.disclaimer}</p>
      </div>`;
  }

  /** ---------------- screen: questionnaire ---------------- */
  function screenQuestion() {
    const q = QUESTIONS[state.qIndex];
    const c = COPY.questionnaire;
    const selected = state.answers[q.id];
    const isFirst = state.qIndex === 0;
    const isLast = state.qIndex === QUESTIONS.length - 1;
    const pct = Math.round(((state.qIndex + 1) / QUESTIONS.length) * 100);

    return `
      <div class="screen qscreen">
        <div class="progress-wrap">
          <div class="progress-label">
            <span>${c.progressLabel(state.qIndex + 1, QUESTIONS.length)}</span>
            <span class="mono">${pct}%</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>
        <h2 class="question-text display">${q.text}</h2>
        <div class="options">
          ${q.options
            .map(
              (opt) => `
            <button class="option-card${selected === opt.id ? " selected" : ""}" data-action="answer" data-option="${opt.id}">
              <span class="dot"></span>
              <span>${opt.text}</span>
            </button>`
            )
            .join("")}
        </div>
        <div class="qnav">
          ${!isFirst ? `<button class="btn btn-ghost" data-action="back">${c.back}</button>` : ""}
          <button class="btn btn-primary" data-action="next" ${!selected ? "disabled" : ""}>
            ${isLast ? c.finish : c.next}
          </button>
        </div>
      </div>`;
  }

  /** ---------------- screen: result ---------------- */
  function screenResult() {
    const r = state.result;
    const primary = PROFILES[r.primary];
    const supporting = PROFILES[r.supporting];
    const c = COPY.result;
    const disc = COPY.resultDisclaimer;
    const gi = COPY.growthIntent;
    const combinationText = (COMBINATIONS[r.primary] && COMBINATIONS[r.primary][r.supporting]) || "";

    return `
      <div class="screen">
        <div class="result-header">
          <span class="eyebrow">${r.isBlended ? c.blendedEyebrow : c.primaryEyebrow}</span>
          <h2 class="display">${r.isBlended ? `${primary.title} \u00D7 ${supporting.title}` : primary.title}</h2>
          <p class="statement">${primary.statement}</p>
          ${r.isBlended ? `<p class="blend-note">${c.blendNote}</p>` : ""}
        </div>

        <div class="radar-wrap">${renderRadar(r.dimensionScores)}</div>

        <div class="card disclaimer-card">
          <h3>${disc.title}</h3>
          <p>${disc.body}</p>
        </div>

        <div class="card">
          ${renderParagraphs(primary.description)}
        </div>

        <div class="card">
          <h3>${c.sectionLabels.strengths}</h3>
          ${primary.strengths
            .map(
              (s) => `
            <div class="strength-row">
              <span class="bullet"></span>
              <div><strong>${s.title}</strong><span>${s.text}</span></div>
            </div>`
            )
            .join("")}
        </div>

        <div class="card aware">
          <h3>${c.sectionLabels.awareOf}</h3>
          ${renderParagraphs(primary.awareOf)}
        </div>

        <div class="card">
          <h3>${c.sectionLabels.nextOpportunity}</h3>
          <p class="tagline">${primary.nextOpportunityTagline}</p>
          ${renderParagraphs(primary.nextOpportunity)}
        </div>

        <div class="card reflection">
          <h3>${c.sectionLabels.reflection}</h3>
          <p>${primary.reflectionQuestion}</p>
        </div>

        <div class="card">
          <h3>${c.sectionLabels.supporting}</h3>
          <p class="supporting-title">${supporting.title}</p>
          <p>${supporting.supportingDescription}</p>
        </div>

        ${
          combinationText
            ? `
        <div class="card combination">
          <h3>${c.sectionLabels.combination}</h3>
          ${renderParagraphs(combinationText)}
        </div>`
            : ""
        }

        <div class="intent-section">
          <h3 class="display">${gi.heading}</h3>
          <p class="intent-sub">${gi.sub}</p>
          <div class="intent-options">
            ${gi.options
              .map(
                (opt) => `
              <button class="intent-option${state.growthIntent === opt.id ? " selected" : ""}" data-action="select-intent" data-intent="${opt.id}">
                <strong>${opt.label}</strong>
                <span>${opt.description}</span>
              </button>`
              )
              .join("")}
          </div>
          ${
            state.growthIntent
              ? `<button class="btn btn-primary btn-block" style="margin-top:16px;" data-action="go-next-steps">Lanjut \u2192</button>`
              : ""
          }
        </div>

        <footer class="byline">Career & Growth Check \u2014 self-reflection snapshot, bukan diagnosis psikologis.</footer>
      </div>`;
  }

  /** ---------------- screen: explore / event ---------------- */
  function businessEventCard(ev) {
    const isExpanded = String(state.expandedEventId) === String(ev.id);
    const err = isExpanded ? state.eventRegisterError : null;

    return `
      <div class="card event-card">
        <p class="mono" style="font-size:11.5px;color:var(--ink-soft);margin:0 0 6px;">${COPY.event.label}</p>
        <h2 class="display" style="font-size:22px;margin:2px 0 14px;">${ev.title || COPY.event.heading}</h2>
        ${ev.imageUrl ? `<img class="event-flyer" src="${ev.imageUrl}" alt="${ev.title || ""}" onerror="this.style.display='none'"/>` : ""}
        <p style="color:var(--ink-soft);font-size:14.5px;line-height:1.6;margin-bottom:18px;">${ev.description || COPY.event.body}</p>
        <div class="event-meta">
          ${ev.date ? `<div class="event-meta-row"><span class="k">Date</span><span>${ev.date}</span></div>` : ""}
          ${ev.time ? `<div class="event-meta-row"><span class="k">Time</span><span>${ev.time}</span></div>` : ""}
          ${ev.location ? `<div class="event-meta-row"><span class="k">Location</span><span>${ev.location}</span></div>` : ""}
        </div>
        ${err ? `<div class="error-banner">${err}</div>` : ""}
        ${
          isExpanded
            ? `
        <form class="inline-rsvp-form" data-event-id="${ev.id}">
          <div class="field">
            <label>Nama</label>
            <input type="text" name="name" autocomplete="name" placeholder="Nama lengkap" />
          </div>
          <div class="field">
            <label>WhatsApp</label>
            <input type="tel" name="whatsapp" autocomplete="tel" placeholder="08123456789" />
          </div>
          <div class="field">
            <label>Instagram</label>
            <input type="text" name="instagram" autocomplete="off" placeholder="@username" />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Reserve My Seat \u2192</button>
        </form>`
            : `<button class="btn btn-primary btn-block" data-action="expand-event" data-event-id="${ev.id}">${ev.ctaLabel || "Daftar"}</button>`
        }
      </div>`;
  }

  function screenBusinessEvents() {
    const c = COPY.event;
    const events = state.events;

    if (!events || events.length === 0) {
      return `
        <div class="screen">
          <div class="empty-state" style="margin-top:16vh;">
            <span class="eyebrow">${c.eyebrow}</span>
            <h3 class="display">${c.emptyState.heading}</h3>
            <p>${c.emptyState.body}</p>
            <button class="btn btn-ghost" style="margin-top:18px;" data-action="retry-event">${c.emptyState.retry}</button>
          </div>
        </div>`;
    }

    return `
      <div class="screen">
        <span class="eyebrow">${c.eyebrow}</span>
        ${events.length > 1 ? `<p style="color:var(--ink-soft);font-size:14px;margin:8px 0 20px;">Ada ${events.length} kesempatan yang bisa kamu pilih.</p>` : ""}
        ${events.map(businessEventCard).join("")}

        <div class="share-card">
          <h3 class="display">${COPY.share.heading}</h3>
          <p><strong style="display:block;color:var(--ink);margin-bottom:6px;">${COPY.share.subheading}</strong>${COPY.share.body}</p>
          <button class="btn btn-primary" data-action="share">${COPY.share.cta}</button>
        </div>
      </div>`;
  }

  function screenEventLoading() {
    return `<div class="screen"><div class="loading-inline" style="margin-top:20vh;justify-content:center;"><span class="spinner"></span><span>Memuat kemungkinan berikutnya\u2026</span></div></div>`;
  }

  function eventCard(ev) {
    const hasExternalBooking = !!(ev.registrationUrl && String(ev.registrationUrl).trim());
    const ctaButton = hasExternalBooking
      ? `<button class="btn btn-primary btn-block" data-action="open-external-booking" data-url="${ev.registrationUrl}" data-event-id="${ev.id || ""}">${ev.ctaLabel || COPY.event.cta}</button>`
      : `<button class="btn btn-primary btn-block" data-action="register-event" data-event-id="${ev.id || ""}">${ev.ctaLabel || COPY.event.cta}</button>`;

    return `
      <div class="card event-card">
        <p class="mono" style="font-size:11.5px;color:var(--ink-soft);margin:0 0 6px;">${COPY.event.label}</p>
        <h2 class="display" style="font-size:22px;margin:2px 0 14px;">${ev.title || COPY.event.heading}</h2>
        ${ev.imageUrl ? `<img class="event-flyer" src="${ev.imageUrl}" alt="${ev.title || ""}" onerror="this.style.display='none'"/>` : ""}
        <p style="color:var(--ink-soft);font-size:14.5px;line-height:1.6;margin-bottom:18px;">${ev.description || COPY.event.body}</p>
        <div class="event-meta">
          ${ev.date ? `<div class="event-meta-row"><span class="k">Date</span><span>${ev.date}</span></div>` : ""}
          ${ev.time ? `<div class="event-meta-row"><span class="k">Time</span><span>${ev.time}</span></div>` : ""}
          ${ev.location ? `<div class="event-meta-row"><span class="k">Location</span><span>${ev.location}</span></div>` : ""}
        </div>
        ${ctaButton}
      </div>`;
  }

  function screenEvent() {
    const c = COPY.event;
    const events = state.events;

    if (!events || events.length === 0) {
      return `
        <div class="screen">
          <div class="empty-state" style="margin-top:16vh;">
            <span class="eyebrow">${c.eyebrow}</span>
            <h3 class="display">${c.emptyState.heading}</h3>
            <p>${c.emptyState.body}</p>
            <button class="btn btn-ghost" style="margin-top:18px;" data-action="retry-event">${c.emptyState.retry}</button>
          </div>
        </div>`;
    }

    return `
      <div class="screen">
        <span class="eyebrow">${c.eyebrow}</span>
        ${events.length > 1 ? `<p style="color:var(--ink-soft);font-size:14px;margin:8px 0 20px;">Ada ${events.length} cara untuk melangkah lebih jauh dari sini.</p>` : ""}
        ${state.eventRegisterError ? `<div class="error-banner">${state.eventRegisterError}</div>` : ""}
        ${events.map(eventCard).join("")}
      </div>`;
  }

  function screenRegistering() {
    return `
      <div class="screen">
        <div class="loading-inline" style="margin-top:30vh;justify-content:center;">
          <span class="spinner"></span><span>Mendaftarkan kamu ke event\u2026</span>
        </div>
      </div>`;
  }

  /** ---------------- screen: rsvp ---------------- */
  function screenRsvpSuccess() {
    const c = COPY.rsvp.success;
    return `
      <div class="screen success-screen">
        <div class="success-mark">\u2713</div>
        <span class="eyebrow">${c.heading}</span>
        <h2 class="display" style="font-size:26px;margin:2px 0 4px;">${c.subheading}</h2>
        <p style="color:var(--ink-soft);font-size:14.5px;line-height:1.6;max-width:340px;">${c.body}</p>
        <p style="color:var(--ink-soft);font-size:14px;">${c.footer}</p>
      </div>`;
  }

  /** ---------------- render dispatch ---------------- */
  const NO_BACK_SCREENS = ["landing", "eventLoading", "registering", "businessEvents", "rsvpSuccess"];

  function render() {
    const map = {
      landing: screenLanding,
      question: screenQuestion,
      result: screenResult,
      businessEvents: screenBusinessEvents,
      eventLoading: screenEventLoading,
      event: screenEvent,
      registering: screenRegistering,
      rsvpSuccess: screenRsvpSuccess,
    };
    const fn = map[state.screen] || screenLanding;
    let html = fn();
    if (!NO_BACK_SCREENS.includes(state.screen) && history.length > 0) {
      html = html.replace(
        /(<div class="screen[^"]*">)/,
        `$1<button class="back-btn" data-action="go-back" aria-label="Kembali">\u2190 Kembali</button>`
      );
    }
    root.innerHTML = html;
  }

  /** ---------------- submission flow ---------------- */

  /**
   * Fetches all active events and shows only the ones whose `category`
   * (set per-row in the Events sheet) matches the categories mapped to
   * the person's growth-intent choice (see INTENT_CATEGORIES).
   */
  async function openEventsForIntent(intent) {
    setState({ screen: "eventLoading" });
    const allEvents = await window.SheetsClient.getActiveEvents();
    const categories = INTENT_CATEGORIES[intent] || [];
    const events = allEvents.filter((e) => categories.includes(String(e.category || "").trim().toLowerCase()));
    go("businessEvents", { events, expandedEventId: null });
  }

  async function registerForEvent(ev, name, whatsapp, instagram) {
    setState({ selectedEvent: ev, screen: "registering", eventRegisterError: null });

    try {
      await window.SheetsClient.submitRsvp({
        timestamp: new Date().toISOString(),
        name: name || "",
        whatsapp: whatsapp || "",
        instagram: instagram || "",
        sessionId: window.SheetsClient.getSessionId(),
        ref: window.Referral.get(),
        eventName: ev ? ev.title : "",
        eventDate: ev ? ev.date : "",
        eventTime: ev ? ev.time : "",
        consent: true,
      });
      // "class" events are paid — after saving the lead, send them to
      // Lynk.id to actually pay/reserve. Everything else lands on the
      // normal "You're in" confirmation.
      const isPaidClass = ev && String(ev.category || "").trim().toLowerCase() === "class";
      if (isPaidClass && ev.registrationUrl) {
        window.location.href = ev.registrationUrl;
        return;
      }
      go("rsvpSuccess", { finished: true });
    } catch (err) {
      setState({ screen: "businessEvents", eventRegisterError: COPY.errors.submitFailed });
    }
  }

  /** ---------------- event delegation ---------------- */
  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === "start") {
      if (!sessionStorage.getItem("cgc_tracked_quiz_start")) {
        sessionStorage.setItem("cgc_tracked_quiz_start", "1");
        window.SheetsClient.trackEvent("quiz_start");
      }
      go("question");
    } else if (action === "answer") {
      const q = QUESTIONS[state.qIndex];
      setState({ answers: { ...state.answers, [q.id]: btn.dataset.option } });
    } else if (action === "back") {
      if (state.qIndex === 0) {
        goBack();
      } else {
        setState({ qIndex: Math.max(0, state.qIndex - 1) });
      }
    } else if (action === "go-back") {
      goBack();
    } else if (action === "next") {
      const q = QUESTIONS[state.qIndex];
      if (!state.answers[q.id]) return; // guarded by disabled button too
      if (state.qIndex < QUESTIONS.length - 1) {
        setState({ qIndex: state.qIndex + 1 });
      } else {
        const result = window.Scoring.scoreAssessment(state.answers);
        if (!sessionStorage.getItem("cgc_tracked_quiz_complete")) {
          sessionStorage.setItem("cgc_tracked_quiz_complete", "1");
          window.SheetsClient.trackEvent("quiz_complete");
          window.SheetsClient.logAssessment({
            timestamp: new Date().toISOString(),
            ref: window.Referral.get(),
            source: document.referrer || "direct",
            answers: state.answers,
            dimensionScores: result.dimensionScores,
            primaryProfile: result.primary,
            secondaryPattern: result.supporting,
          });
        }
        // Full result is shown immediately — no contact info required.
        go("result", { result });
      }
    } else if (action === "select-intent") {
      const intentId = btn.dataset.intent;
      if (!sessionStorage.getItem(`cgc_tracked_intent_${intentId}`)) {
        sessionStorage.setItem(`cgc_tracked_intent_${intentId}`, "1");
        window.SheetsClient.trackEvent(`growth_intent:${intentId}`);
      }
      setState({ growthIntent: intentId });
    } else if (action === "go-next-steps") {
      if (!sessionStorage.getItem("cgc_tracked_go_next_steps")) {
        sessionStorage.setItem("cgc_tracked_go_next_steps", "1");
        window.SheetsClient.trackEvent(`explore_events:${state.growthIntent}`);
      }
      openEventsForIntent(state.growthIntent);
    } else if (action === "share") {
      const url = window.Referral.buildShareUrl();
      const text = COPY.share.waMessageTemplate(url);
      if (navigator.share) {
        navigator.share({ text, url }).catch(() => {});
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
      }
    } else if (action === "retry-event") {
      openEventsForIntent(state.growthIntent);
    } else if (action === "expand-event") {
      setState({ expandedEventId: btn.dataset.eventId, eventRegisterError: null });
    } else if (action === "open-external-booking") {
      window.SheetsClient.trackEvent(btn.dataset.track === "agent" ? "agent_booking_link_click" : "event_register_external");
      window.open(btn.dataset.url, "_blank");
    } else if (action === "register-event") {
      const eventId = btn.dataset.eventId;
      const selected = (state.events || []).find((e) => String(e.id) === String(eventId)) || (state.events || [])[0] || null;
      registerForEvent(selected);
    }
  });

  root.addEventListener("submit", (e) => {
    if (e.target.classList.contains("inline-rsvp-form")) {
      e.preventDefault();
      const fd = new FormData(e.target);
      const name = (fd.get("name") || "").toString().trim();
      const whatsapp = (fd.get("whatsapp") || "").toString().trim();
      const instagram = (fd.get("instagram") || "").toString().trim();
      const errs = COPY.errors;
      const eventId = e.target.dataset.eventId;
      const ev = (state.events || []).find((x) => String(x.id) === String(eventId));

      if (!name) return setState({ eventRegisterError: errs.invalidName });
      if (!isValidWhatsapp(whatsapp)) return setState({ eventRegisterError: errs.invalidWhatsapp });
      if (!instagram) return setState({ eventRegisterError: errs.invalidInstagram });

      registerForEvent(ev, name, whatsapp, instagram);
    }
  });

  /** ---------------- boot ---------------- */
  window.Referral.capture();
  if (!sessionStorage.getItem("cgc_tracked_landing")) {
    sessionStorage.setItem("cgc_tracked_landing", "1");
    window.SheetsClient.trackEvent("landing_view");
  }
  render();
})();
