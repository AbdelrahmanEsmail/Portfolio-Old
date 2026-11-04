// Contract for bringing a project card into view from elsewhere (e.g. the
// command palette) even when the Work filter currently hides it.

export const PROJECT_REVEAL_EVENT = 'portfolio:project-reveal';

/**
 * Scroll to a project card by slug. If the active filter hides it, the Work
 * section switches back to "All" first. Setting `location.hash` to
 * `#project-<slug>` has the same effect.
 */
export function revealProject(slug: string) {
  window.dispatchEvent(new CustomEvent<string>(PROJECT_REVEAL_EVENT, { detail: slug }));
}
