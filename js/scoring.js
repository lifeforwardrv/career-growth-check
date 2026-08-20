/**
 * SCORING ENGINE — V3
 * -----------------------------------------------------------------------
 * Pure, deterministic functions. No AI interpretation, no randomness.
 *   - dimension score = (times dimension X was chosen / times dimension X
 *     appeared across all 75 option-slots) * 100, rounded.
 *     V3's question set balances each dimension to 12-13 appearances
 *     (previously as uneven as 4-16 in V2), and this per-dimension
 *     normalization — instead of a flat "/15" — is what makes every
 *     dimension able to genuinely reach 0-100%, regardless of exactly
 *     how many times it happens to appear.
 *   - profile score = weighted sum of dimension scores per profile
 *     (POSITIVE EVIDENCE ONLY — no inverse/negative terms anywhere,
 *     so Explorer can never win purely by scoring low on other traits)
 *   - primary = highest profile score, supporting = second highest
 *   - Clear Primary vs Blended Profile: a UX interpretation threshold
 *     (BLEND_THRESHOLD), NOT a scientifically validated psychological
 *     cutoff. Deliberately a single tunable constant so it's easy to
 *     adjust once real user data comes in.
 *
 * Tie-break: ties between the deterministic weighted-sum floats are
 * effectively impossible with this data, but as a documented fallback
 * (implementation necessity, not invented content) ties resolve by
 * APP_PROFILE_ORDER (Builder > Driver > Catalyst > Visionary > Explorer).
 * -----------------------------------------------------------------------
 */
window.Scoring = (function () {
  const DIMENSION_ORDER = window.APP_DIMENSION_ORDER;
  const PROFILES = window.APP_PROFILES;
  const PROFILE_ORDER = window.APP_PROFILE_ORDER;
  const QUESTIONS = window.APP_QUESTIONS;

  // Tunable: if (primary score - supporting score) < this, the result is
  // presented as a Blended Profile instead of a Clear Primary.
  const BLEND_THRESHOLD = 3;

  // How many times each dimension actually appears across all options,
  // computed from the live question set rather than hardcoded — so this
  // stays correct automatically if questions are ever edited again.
  function computeDimensionAppearances() {
    const appearances = { A: 0, O: 0, R: 0, L: 0, P: 0, V: 0 };
    QUESTIONS.forEach((q) => {
      q.options.forEach((o) => {
        appearances[o.dim] += 1;
      });
    });
    return appearances;
  }

  /**
   * answers: { [questionId]: optionId }
   * returns: { A: 40, O: 53, R: 33, L: 47, P: 40, V: 60 }
   */
  function computeDimensionScores(answers) {
    const counts = { A: 0, O: 0, R: 0, L: 0, P: 0, V: 0 };
    QUESTIONS.forEach((q) => {
      const chosenOptionId = answers[q.id];
      if (!chosenOptionId) return;
      const opt = q.options.find((o) => o.id === chosenOptionId);
      if (opt) counts[opt.dim] += 1;
    });

    const appearances = computeDimensionAppearances();
    const scores = {};
    DIMENSION_ORDER.forEach((dim) => {
      const possible = appearances[dim] || 1; // guard against div-by-zero if a dim is ever unused
      scores[dim] = Math.round((counts[dim] / possible) * 100);
    });
    return scores;
  }

  /**
   * dimensionScores: output of computeDimensionScores
   * returns: { BUILDER: 62.4, DRIVER: 41.1, ... } (unrounded, for stable ranking)
   * Positive-evidence only: every weight multiplies a dimension score
   * directly. There is no (100 - dimension) term anywhere.
   */
  function computeProfileScores(dimensionScores) {
    const profileScores = {};
    PROFILE_ORDER.forEach((profileId) => {
      const weights = PROFILES[profileId].weights;
      let total = 0;
      Object.keys(weights).forEach((dim) => {
        total += (dimensionScores[dim] || 0) * weights[dim];
      });
      profileScores[profileId] = total;
    });
    return profileScores;
  }

  /**
   * profileScores: output of computeProfileScores
   * returns: { primary, supporting, gap, isBlended }
   */
  function resolvePrimarySupporting(profileScores) {
    const ranked = PROFILE_ORDER.slice().sort((a, b) => {
      const diff = profileScores[b] - profileScores[a];
      if (Math.abs(diff) > 1e-9) return diff;
      // Deterministic tie-break fallback — see header note.
      return PROFILE_ORDER.indexOf(a) - PROFILE_ORDER.indexOf(b);
    });
    const primary = ranked[0];
    const supporting = ranked[1];
    const gap = profileScores[primary] - profileScores[supporting];
    return { primary, supporting, gap, isBlended: gap < BLEND_THRESHOLD };
  }

  /**
   * Full pipeline used by the app: answers -> complete result object.
   * `secondary` is kept as an alias of `supporting` for backward/DB
   * compatibility (Sheets column stays "secondary_pattern"); the UI
   * should always label it "Supporting Pattern".
   */
  function scoreAssessment(answers) {
    const dimensionScores = computeDimensionScores(answers);
    const profileScores = computeProfileScores(dimensionScores);
    const { primary, supporting, gap, isBlended } = resolvePrimarySupporting(profileScores);
    return {
      dimensionScores,
      profileScores,
      primary,
      supporting,
      secondary: supporting, // alias for DB/backward compatibility
      gap,
      isBlended,
    };
  }

  return {
    computeDimensionScores,
    computeProfileScores,
    resolvePrimarySupporting,
    scoreAssessment,
    computeDimensionAppearances,
    BLEND_THRESHOLD,
  };
})();
