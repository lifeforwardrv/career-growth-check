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

  const SESSION_KEY = "cgc_session_v1";

  /** ---------------- state ---------------- */
  let state = restoreSession() || {
    screen: "landing",
    qIndex: 0,
    answers: {}, // { questionId: optionId }
    contact: null, // { name, whatsapp, city }
    result: null, // computed by scoreAssessment
    submission: { status: "idle", error: null }, // idle | pending | done | error
    event: undefined, // undefined = not fetched yet, null = none active, object = active event
    rsvp: { status: "idle", error: null },
  };

  function saveSession() {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
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

  function go(screen) {
    setState({ screen });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /** ---------------- validation helpers ---------------- */
  function isValidWhatsapp(v) {
    const digits = (v || "").replace(/[^\d]/g, "");
    return digits.length >= 9 && digits.length <= 15;
  }

  /** ---------------- SVG: signature growth-print radar ---------------- */
  function radarPoint(cx, cy, radius, index, total, valueRatio) {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = radius * valueRatio;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  }

  function renderRadar(scores) {
    const size = 360;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 72;
    const total = DIM_ORDER.length;
    const rings = [0.25, 0.5, 0.75, 1];

    const ringPolys = rings
      .map((ratio) => {
        const pts = DIM_ORDER.map((_, i) => radarPoint(cx, cy, radius, i, total, ratio).join(",")).join(" ");
        return `<polygon points="${pts}" fill="none" stroke="#e6dccb" stroke-width="1"/>`;
      })
      .join("");

    const axisLines = DIM_ORDER.map((_, i) => {
      const [x, y] = radarPoint(cx, cy, radius, i, total, 1);
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#e6dccb" stroke-width="1"/>`;
    }).join("");

    const dataPts = DIM_ORDER.map((dim, i) => radarPoint(cx, cy, radius, i, total, Math.max(scores[dim], 4) / 100));
    const dataPoly = dataPts.map((p) => p.join(",")).join(" ");
    const dots = dataPts
      .map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#b5502f"/>`)
      .join("");

    const labels = DIM_ORDER.map((dim, i) => {
      const [x, y] = radarPoint(cx, cy, radius + 44, i, total, 1);
      const anchor = x < cx - 4 ? "end" : x > cx + 4 ? "start" : "middle";
      return `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" font-family="IBM Plex Mono, monospace" font-size="9.5" fill="#6e6153" letter-spacing="0.2">${DIMS[dim].label.toUpperCase()}</text>`;
    }).join("");

    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Growth dimension pattern">
      ${ringPolys}${axisLines}
      <polygon points="${dataPoly}" fill="#cf9c86" fill-opacity="0.35" stroke="#b5502f" stroke-width="2"/>
      ${dots}${labels}
    </svg>`;
  }

  function renderGrowthMark() {
    // Decorative hero mark: plain hexagon outline echoing the 6 dimensions,
    // with a small sprouting line — the recurring "growth print" signature.
    return `<svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="43,6 76,24.5 76,61.5 43,80 10,61.5 10,24.5" stroke="#b5502f" stroke-width="1.4"/>
      <polygon points="43,22 62,33 62,55 43,66 24,55 24,33" stroke="#cf9c86" stroke-width="1.2"/>
      <path d="M43 66 C 43 52, 43 46, 43 38" stroke="#6c7355" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M43 46 C 38 44, 35 40, 35 36" stroke="#6c7355" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <path d="M43 52 C 48 50, 51 46, 51 42" stroke="#6c7355" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <circle cx="43" cy="66" r="2.4" fill="#b5502f"/>
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

  /** ---------------- screen: contact gate ---------------- */
  function screenGate() {
    const c = COPY.contactGate;
    const err = state.gateError;
    return `
      <div class="screen">
        <span class="eyebrow">${c.kicker}</span>
        <h2 class="display" style="font-size:30px;margin:6px 0 4px;">${c.heading}</h2>
        <p style="color:var(--ink-soft);font-size:15px;margin:0 0 4px;">${c.subheading}</p>
        <p style="color:var(--ink-soft);font-size:14.5px;line-height:1.55;">${c.body}</p>

        <div class="gate-preview">
          ${c.previewItems
            .map(
              (item) => `
            <div class="gate-preview-item">
              <span class="check">\u2713</span>
              <div><strong>${item.title}</strong><span>${item.text}</span></div>
            </div>`
            )
            .join("")}
        </div>

        ${err ? `<div class="error-banner">${err}</div>` : ""}

        <form id="gate-form">
          <div class="field">
            <label>${c.fields.name}</label>
            <input type="text" name="name" autocomplete="name" placeholder="Nama lengkap" />
          </div>
          <div class="field">
            <label>${c.fields.whatsapp}</label>
            <input type="tel" name="whatsapp" autocomplete="tel" placeholder="08123456789" />
          </div>
          <div class="field">
            <label>${c.fields.city}</label>
            <select name="city">
              <option value="">Pilih domisili</option>
              ${c.cityOptions.map((opt) => `<option value="${opt}">${opt}</option>`).join("")}
            </select>
          </div>
          <label class="consent">
            <input type="checkbox" name="consent" />
            <span>${c.consent}</span>
          </label>
          <button type="submit" class="btn btn-primary btn-block">${c.cta}</button>
        </form>
        <p class="notice">${c.notice}</p>
      </div>`;
  }

  /** ---------------- screen: submitting ---------------- */
  function screenSubmitting() {
    return `
      <div class="screen">
        <div class="loading-inline" style="margin-top:40vh;justify-content:center;">
          <span class="spinner"></span><span>Menyimpan hasilmu\u2026</span>
        </div>
      </div>`;
  }

  function screenSubmitError() {
    const e = COPY.errors;
    return `
      <div class="screen">
        <div class="error-banner" style="margin-top:30vh;">${e.submitFailed}</div>
        <button class="btn btn-primary btn-block" data-action="retry-submit">${e.retry}</button>
      </div>`;
  }

  /** ---------------- screen: result ---------------- */
  function screenResult() {
    const r = state.result;
    const primary = PROFILES[r.primary];
    const secondary = PROFILES[r.secondary];
    const c = COPY.result;
    const share = COPY.share;
    const explore = COPY.explorePossibility;

    return `
      <div class="screen">
        <div class="result-header">
          <span class="eyebrow">Your Career & Growth Profile</span>
          <h2 class="display">${primary.title}</h2>
          <p class="statement">${primary.statement}</p>
        </div>

        <div class="radar-wrap">${renderRadar(r.dimensionScores)}</div>

        <div class="card">
          <p>${primary.description}</p>
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
          <p>${primary.awareOf}</p>
        </div>

        <div class="card">
          <h3>${c.sectionLabels.nextOpportunity}</h3>
          <p>${primary.nextOpportunity}</p>
        </div>

        <div class="card reflection">
          <h3>${c.sectionLabels.reflection}</h3>
          <p>${primary.reflectionQuestion}</p>
        </div>

        <div class="secondary-pattern">
          ${c.secondaryLabel}<br/>
          <strong>${secondary.title}</strong> \u2014 ada pola ${secondary.title} yang juga cukup terlihat dalam jawabanmu.
        </div>

        <div class="share-card">
          <h3 class="display">${share.heading}</h3>
          <p><strong style="display:block;color:var(--ink);margin-bottom:6px;">${share.subheading}</strong>${share.body}</p>
          <button class="btn btn-primary" data-action="share">${share.cta}</button>
        </div>

        <div class="explore-card">
          <span class="eyebrow">${explore.heading}</span>
          <h2 class="display">${explore.headline}</h2>
          <p>${explore.body}<br/><br/>${explore.subBody}</p>
          <button class="btn btn-primary" data-action="explore">${explore.cta}</button>
        </div>

        <footer class="byline">Career & Growth Check \u2014 self-reflection snapshot, bukan diagnosis psikologis.</footer>
      </div>`;
  }

  /** ---------------- screen: explore / event ---------------- */
  function screenEventLoading() {
    return `<div class="screen"><div class="loading-inline" style="margin-top:20vh;justify-content:center;"><span class="spinner"></span><span>Memuat kemungkinan berikutnya\u2026</span></div></div>`;
  }

  function screenEvent() {
    const c = COPY.event;
    const ev = state.event;

    if (!ev) {
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
        <p class="mono" style="font-size:11.5px;color:var(--ink-soft);margin:8px 0 2px;">${c.label}</p>
        <h2 class="display" style="margin:2px 0 16px;">${ev.title || c.heading}</h2>
        ${ev.imageUrl ? `<img class="event-flyer" src="${ev.imageUrl}" alt="${ev.title || ""}" onerror="this.style.display='none'"/>` : ""}
        <p style="color:var(--ink-soft);font-size:14.5px;line-height:1.6;margin-bottom:18px;">${ev.description || c.body}</p>
        <div class="event-meta">
          ${ev.date ? `<div class="event-meta-row"><span class="k">Date</span><span>${ev.date}</span></div>` : ""}
          ${ev.time ? `<div class="event-meta-row"><span class="k">Time</span><span>${ev.time}</span></div>` : ""}
          ${ev.location ? `<div class="event-meta-row"><span class="k">Location</span><span>${ev.location}</span></div>` : ""}
        </div>
        <button class="btn btn-primary btn-block" data-action="rsvp-start">${c.cta}</button>
      </div>`;
  }

  /** ---------------- screen: rsvp ---------------- */
  function screenRsvp() {
    const c = COPY.rsvp;
    const err = state.rsvpError;
    return `
      <div class="screen">
        <span class="eyebrow">${c.heading}</span>
        <h2 class="display" style="font-size:28px;margin:6px 0 4px;">${c.subheading}</h2>
        <p style="color:var(--ink-soft);font-size:14.5px;line-height:1.55;margin-bottom:20px;">${c.body}</p>
        ${err ? `<div class="error-banner">${err}</div>` : ""}
        <form id="rsvp-form">
          <div class="field">
            <label>${c.fields.name}</label>
            <input type="text" name="name" value="${(state.contact && state.contact.name) || ""}" />
          </div>
          <div class="field">
            <label>${c.fields.whatsapp}</label>
            <input type="tel" name="whatsapp" value="${(state.contact && state.contact.whatsapp) || ""}" />
          </div>
          <label class="consent">
            <input type="checkbox" name="consent" />
            <span>${c.consent}</span>
          </label>
          <button type="submit" class="btn btn-primary btn-block">${c.cta}</button>
        </form>
      </div>`;
  }

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
  function render() {
    const map = {
      landing: screenLanding,
      question: screenQuestion,
      gate: screenGate,
      submitting: screenSubmitting,
      submitError: screenSubmitError,
      result: screenResult,
      eventLoading: screenEventLoading,
      event: screenEvent,
      rsvp: screenRsvp,
      rsvpSuccess: screenRsvpSuccess,
    };
    const fn = map[state.screen] || screenLanding;
    root.innerHTML = fn();
  }

  /** ---------------- submission flow ---------------- */
  async function submitAssessment() {
    setState({ screen: "submitting" });
    const record = {
      timestamp: new Date().toISOString(),
      name: state.contact.name,
      whatsapp: state.contact.whatsapp,
      city: state.contact.city,
      ref: window.Referral.get(),
      source: document.referrer || "direct",
      answers: state.answers,
      dimensionScores: state.result.dimensionScores,
      primaryProfile: state.result.primary,
      secondaryPattern: state.result.secondary,
      consent: true,
    };
    try {
      await window.SheetsClient.submitAssessment(record);
      go("result");
    } catch (err) {
      setState({ screen: "submitError" });
    }
  }

  async function loadEvent() {
    setState({ screen: "eventLoading" });
    const ev = await window.SheetsClient.getActiveEvent();
    setState({ event: ev, screen: "event" });
  }

  async function submitRsvp(name, whatsapp) {
    const ref = window.Referral.get();
    const eventTitle = state.event ? state.event.title : COPY.event.heading;
    const eventDate = state.event ? state.event.date : "";
    const eventTime = state.event ? state.event.time : "";

    // Log to Sheets in the background (for your internal record + ref
    // attribution). This is best-effort: a Sheets hiccup should not block
    // the WhatsApp handoff, since the conversation itself carries the
    // name + ref, and the person's seat isn't truly "reserved" until you
    // reply on WhatsApp anyway.
    window.SheetsClient
      .submitRsvp({
        timestamp: new Date().toISOString(),
        name,
        whatsapp,
        ref,
        eventName: eventTitle,
        eventDate,
        eventTime,
        consent: true,
      })
      .catch(() => {
        /* non-fatal — WhatsApp handoff still proceeds below */
      });

    const waBase =
      (state.event && state.event.registrationUrl) || `https://wa.me/${window.APP_CONFIG.FALLBACK_WHATSAPP || ""}`;
    const text = COPY.rsvp.waMessageTemplate(name, eventTitle, eventDate, eventTime, ref);
    const waUrl = `${waBase}?text=${encodeURIComponent(text)}`;

    go("rsvpSuccess");
    window.open(waUrl, "_blank");
  }

  /** ---------------- event delegation ---------------- */
  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === "start") {
      go("question");
    } else if (action === "answer") {
      const q = QUESTIONS[state.qIndex];
      setState({ answers: { ...state.answers, [q.id]: btn.dataset.option } });
    } else if (action === "back") {
      setState({ qIndex: Math.max(0, state.qIndex - 1) });
    } else if (action === "next") {
      const q = QUESTIONS[state.qIndex];
      if (!state.answers[q.id]) return; // guarded by disabled button too
      if (state.qIndex < QUESTIONS.length - 1) {
        setState({ qIndex: state.qIndex + 1 });
      } else {
        go("gate");
      }
    } else if (action === "retry-submit") {
      submitAssessment();
    } else if (action === "share") {
      const url = window.Referral.buildShareUrl(state.contact ? state.contact.name : "");
      const text = COPY.share.waMessageTemplate(url);
      if (navigator.share) {
        navigator.share({ text, url }).catch(() => {});
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
      }
    } else if (action === "explore") {
      loadEvent();
    } else if (action === "retry-event") {
      loadEvent();
    } else if (action === "rsvp-start") {
      go("rsvp");
    }
  });

  root.addEventListener("submit", (e) => {
    if (e.target.id === "gate-form") {
      e.preventDefault();
      const fd = new FormData(e.target);
      const name = (fd.get("name") || "").toString().trim();
      const whatsapp = (fd.get("whatsapp") || "").toString().trim();
      const city = (fd.get("city") || "").toString().trim();
      const consent = fd.get("consent") === "on";
      const errs = COPY.errors;

      if (!name) return setState({ gateError: errs.invalidName });
      if (!isValidWhatsapp(whatsapp)) return setState({ gateError: errs.invalidWhatsapp });
      if (!city) return setState({ gateError: errs.invalidCity });
      if (!consent) return setState({ gateError: errs.consentRequired });

      const result = window.Scoring.scoreAssessment(state.answers);
      setState({ contact: { name, whatsapp, city }, result, gateError: null });
      submitAssessment();
    }

    if (e.target.id === "rsvp-form") {
      e.preventDefault();
      const fd = new FormData(e.target);
      const name = (fd.get("name") || "").toString().trim();
      const whatsapp = (fd.get("whatsapp") || "").toString().trim();
      const consent = fd.get("consent") === "on";
      const errs = COPY.errors;

      if (!name) return setState({ rsvpError: errs.invalidName });
      if (!isValidWhatsapp(whatsapp)) return setState({ rsvpError: errs.invalidWhatsapp });
      if (!consent) return setState({ rsvpError: errs.consentRequired });

      setState({ rsvpError: null });
      submitRsvp(name, whatsapp);
    }
  });

  /** ---------------- boot ---------------- */
  window.Referral.capture();
  render();
})();
