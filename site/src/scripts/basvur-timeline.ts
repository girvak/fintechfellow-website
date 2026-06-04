export function initApplyTimeline() {
  const timeline = document.getElementById('applyTimeline');
  if (!timeline) return;

  const steps = Array.from(
    timeline.querySelectorAll<HTMLElement>('.tl-step, .tl-notice-step'),
  );
  const progress = timeline.querySelector<HTMLElement>('.apply-timeline-progress');
  const rail = timeline.querySelector<HTMLElement>('.apply-timeline-rail');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!steps.length || !progress || !rail) return;

  const positionRail = () => {
    const firstDot = steps[0].querySelector<HTMLElement>('.tl-marker-num');
    const lastDot = steps[steps.length - 1].querySelector<HTMLElement>('.tl-marker-num');
    if (!firstDot || !lastDot) return;

    const timelineTop = timeline.getBoundingClientRect().top + window.scrollY;
    const firstCenter =
      firstDot.getBoundingClientRect().top +
      firstDot.getBoundingClientRect().height / 2 +
      window.scrollY;
    const lastCenter =
      lastDot.getBoundingClientRect().top +
      lastDot.getBoundingClientRect().height / 2 +
      window.scrollY;

    const top = firstCenter - timelineTop;
    const height = Math.max(0, lastCenter - firstCenter);

    rail.style.top = `${top}px`;
    rail.style.height = `${height}px`;
  };

  const setProgress = () => {
    positionRail();

    const firstDot = steps[0].querySelector<HTMLElement>('.tl-marker-num');
    const lastDot = steps[steps.length - 1].querySelector<HTMLElement>('.tl-marker-num');
    if (!firstDot || !lastDot) return;

    const start =
      firstDot.getBoundingClientRect().top +
      firstDot.getBoundingClientRect().height / 2 +
      window.scrollY;
    const end =
      lastDot.getBoundingClientRect().top +
      lastDot.getBoundingClientRect().height / 2 +
      window.scrollY;
    const viewportMid = window.scrollY + window.innerHeight * 0.42;
    const ratio = Math.min(1, Math.max(0, (viewportMid - start) / (end - start || 1)));

    progress.style.height = `${ratio * 100}%`;

    steps.forEach((step, i) => {
      const marker = step.querySelector('.tl-marker-num');
      if (!marker) return;
      const markerRect = marker.getBoundingClientRect();
      const markerY = markerRect.top + markerRect.height / 2 + window.scrollY;
      const nextMarker = steps[i + 1]?.querySelector('.tl-marker-num');
      const nextY = nextMarker
        ? nextMarker.getBoundingClientRect().top +
          nextMarker.getBoundingClientRect().height / 2 +
          window.scrollY
        : markerY + 9999;

      const isNotice = step.classList.contains('tl-notice-step');
      step.classList.toggle('is-past', viewportMid > markerY + 8);
      step.classList.toggle(
        'is-active',
        !isNotice && viewportMid >= markerY - 40 && viewportMid < nextY - 20,
      );
    });
  };

  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );

  steps.forEach((step) => {
    if (reduced) {
      step.classList.add('in');
      return;
    }
    stepObserver.observe(step);
  });

  if (reduced) {
    positionRail();
    progress.style.height = '100%';
    steps.forEach((s) => s.classList.add('is-past', 'is-active'));
    return;
  }

  setProgress();
  window.addEventListener('scroll', setProgress, { passive: true });
  window.addEventListener('resize', setProgress, { passive: true });
  window.addEventListener('load', setProgress, { once: true });
}
