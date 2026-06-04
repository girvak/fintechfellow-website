export type ViewportTier = 'mobile' | 'tablet' | 'desktop';

export type ViewerFraming = {
  viewport: ViewportTier;
  reducedMotion: boolean;
  compactHeight: boolean;
};

function readViewport(): ViewportTier {
  if (window.matchMedia('(max-width: 640px)').matches) return 'mobile';
  if (window.matchMedia('(max-width: 960px)').matches) return 'tablet';
  return 'desktop';
}

export function getViewerFraming(): ViewerFraming {
  return {
    viewport: readViewport(),
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    compactHeight: window.matchMedia('(max-height: 520px)').matches,
  };
}

export function applyViewerFraming(): ViewerFraming {
  const framing = getViewerFraming();
  const root = document.documentElement;

  root.dataset.viewport = framing.viewport;
  root.dataset.motion = framing.reducedMotion ? 'reduced' : 'full';

  if (framing.compactHeight) {
    root.dataset.viewportCompact = 'true';
  } else {
    root.removeAttribute('data-viewport-compact');
  }

  return framing;
}

function debounce(fn: () => void, ms: number): () => void {
  let id = 0;
  return () => {
    window.clearTimeout(id);
    id = window.setTimeout(fn, ms);
  };
}

function initViewerFraming(): void {
  applyViewerFraming();

  const refresh = debounce(() => applyViewerFraming(), 120);
  window.addEventListener('resize', refresh, { passive: true });
  window.addEventListener('orientationchange', refresh, { passive: true });

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  motion.addEventListener?.('change', refresh);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initViewerFraming);
} else {
  initViewerFraming();
}
