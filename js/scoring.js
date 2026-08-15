/**
 * SCORING ENGINE
 * -----------------------------------------------------------------------
 * Pure, deterministic functions. No AI interpretation, no randomness.
 * Implements exactly the formulas in the locked Content Master:
 *   - dimension score = (answers assigned to dimension / 15) * 100, rounded
 *   - profile score = weighted sum of dimension scores per profile
 *   - primary = highest profile score, secondary = second highest
 *
 * Tie-break: the locked spec references a "predefined tie-breaking rule"
 * without stating one. Ties between the deterministic weighted-sum floats
 * are effectively impossible with this data, but as a documented fallback
 * (not invented content — just an implementation necessity) ties resolve
 * by APP_PROFILE_ORDER, the order the five profiles are listed in the
 * Content Master (Builder > Driver > Catalyst > Visionary > Explorer).
 * -----------------------------------------------------------------------
 */
window.Scoring = (function () {
  const DIMENSION_ORDER = window.APP_DIMENSION_ORDER;
  const PROFILES = window.APP_PROFILES;
  const PROFILE_ORDER = window.APP_PROFILE_ORDER;
  const QUESTIONS = window.APP_QUESTIONS;

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

    const scores = {};
    DIMENSION_ORDER.forEach((dim) => {
      scores[dim] = Math.round((counts[dim] / QUESTIONS.length) * 100);
    });
    return scores;
  }

  /**
   * dimensionScores: output of computeDimensionScores
   * returns: { BUILDER: 62.4, DRIVER: 41.1, ... } (unrounded, for stable ranking)
   */
  function computeProfileScores(dimensionScores) {
    const profileScores = {};
    PROFILE_ORDER.forEach((profileId) => {
      const weights = PROFILES[profileId].weights;
      let total = 0;
      Object.keys(weights).forEach((key) => {
        const w = weights[key];
        if (key.startsWith("inv")) {
          const dim = key.slice(3); // "invO" -> "O"
          total += (100 - dimensionScores[dim]) * w;
        } else {
          total += dimensionScores[key] * w;
        }
      });
      profileScores[profileId] = total;
    });
    return profileScores;
  }

  /**
   * profileScores: output of computeProfileScores
   * returns: { primary: "BUILDER", secondary: "DRIVER" }
   */
  function resolvePrimarySecondary(profileScores) {
    const ranked = PROFILE_ORDER.slice().sort((a, b) => {
      const diff = profileScores[b] - profileScores[a];
      if (Math.abs(diff) > 1e-9) return diff;
      // Deterministic tie-break fallback — see header note.
      return PROFILE_ORDER.indexOf(a) - PROFILE_ORDER.indexOf(b);
    });
    return { primary: ranked[0], secondary: ranked[1] };
  }

  /**
   * Full pipeline used by the app: answers -> complete result object.
   */
  function scoreAssessment(answers) {
    const dimensionScores = computeDimensionScores(answers);
    const profileScores = computeProfileScores(dimensionScores);
    const { primary, secondary } = resolvePrimarySecondary(profileScores);
    return { dimensionScores, profileScores, primary, secondary };
  }

  return { computeDimensionScores, computeProfileScores, resolvePrimarySecondary, scoreAssessment };
})();
