function initMezunlarQuotes() {
  const scroller = document.querySelector<HTMLElement>('[data-quotes-scroller]');
  const track = scroller?.querySelector<HTMLElement>('.quotes-track');
  const cards = track ? Array.from(track.querySelectorAll<HTMLElement>('.quote-slide')) : [];
  const prev = document.querySelector<HTMLButtonElement>('.quotes-nav--prev');
  const next = document.querySelector<HTMLButtonElement>('.quotes-nav--next');
  const dotsWrap = document.querySelector<HTMLElement>('.quotes-dots');
  const section = scroller?.closest<HTMLElement>('.mezunlar-quotes');

  if (!scroller || !track || !cards.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let isAutoScrolling = false;
  let autoplayPaused = false;
  let autoplayTimer = 0;
  let resumeTimer = 0;
  let scrollTimer = 0;
  let sectionVisible = true;

  const scrollLeftForCard = (card: HTMLElement) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const target = cardCenter - scroller.clientWidth / 2;
    const max = scroller.scrollWidth - scroller.clientWidth;
    return Math.max(0, Math.min(target, max));
  };

  const syncCenterPadding = () => {
    const card = cards[0];
    if (!card) return;
    const pad = Math.max(16, (scroller.clientWidth - card.offsetWidth) / 2);
    track.style.setProperty('--quotes-edge-pad', `${pad}px`);
    scroller.style.setProperty('--quotes-edge-pad', `${pad}px`);
  };

  const scrollToCard = (index: number, fromAutoplay = false) => {
    const card = cards[Math.max(0, Math.min(index, cards.length - 1))];
    if (!card) return;
    const left = scrollLeftForCard(card);
    isAutoScrolling = fromAutoplay;
    scroller.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' });
    if (fromAutoplay) {
      window.setTimeout(() => {
        isAutoScrolling = false;
      }, reducedMotion ? 0 : 520);
    }
  };

  const activeIndex = () => {
    const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  };

  const updateDots = () => {
    if (!dotsWrap) return;
    const i = activeIndex();
    dotsWrap.querySelectorAll<HTMLButtonElement>('.quotes-dot').forEach((dot, j) => {
      dot.setAttribute('aria-selected', j === i ? 'true' : 'false');
      dot.classList.toggle('is-active', j === i);
    });
  };

  if (dotsWrap && cards.length > 1) {
    dotsWrap.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'quotes-dot';
      dot.setAttribute('aria-label', `${i + 1}. yorum`);
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => {
        pauseAutoplay(12_000);
        scrollToCard(i);
      });
      dotsWrap.append(dot);
    });
  }

  const pauseAutoplay = (ms = 10_000) => {
    autoplayPaused = true;
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      autoplayPaused = false;
    }, ms);
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplayTimer);
    autoplayTimer = 0;
  };

  const tickAutoplay = () => {
    if (autoplayPaused || !sectionVisible || cards.length < 2) return;
    const next = (activeIndex() + 1) % cards.length;
    scrollToCard(next, true);
    updateDots();
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (reducedMotion || cards.length < 2) return;
    autoplayTimer = window.setInterval(tickAutoplay, 5000);
  };

  const syncAutoplay = () => {
    if (!reducedMotion) startAutoplay();
    else stopAutoplay();
  };

  prev?.addEventListener('click', () => {
    pauseAutoplay(12_000);
    scrollToCard(activeIndex() - 1);
  });
  next?.addEventListener('click', () => {
    pauseAutoplay(12_000);
    scrollToCard(activeIndex() + 1);
  });

  scroller.addEventListener(
    'scroll',
    () => {
      if (!isAutoScrolling) pauseAutoplay(10_000);
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(updateDots, 80);
    },
    { passive: true },
  );

  scroller.addEventListener('pointerdown', () => pauseAutoplay(12_000), { passive: true });
  scroller.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') pauseAutoplay(12_000);
    },
  );

  if (section) {
    const visObs = new IntersectionObserver(
      ([entry]) => {
        sectionVisible = entry?.isIntersecting ?? true;
        if (sectionVisible) syncAutoplay();
        else stopAutoplay();
      },
      { threshold: 0.25 },
    );
    visObs.observe(section);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else syncAutoplay();
  });

  const ro = new ResizeObserver(() => {
    syncCenterPadding();
    updateDots();
  });
  ro.observe(scroller);
  cards.forEach((c) => ro.observe(c));

  syncCenterPadding();
  scrollToCard(0);
  updateDots();
  syncAutoplay();
}

initMezunlarQuotes();
