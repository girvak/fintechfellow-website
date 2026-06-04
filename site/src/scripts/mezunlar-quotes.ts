function initMezunlarQuotes() {
  const scroller = document.querySelector<HTMLElement>('[data-quotes-scroller]');
  const track = scroller?.querySelector<HTMLElement>('.quotes-track');
  const cards = track ? Array.from(track.querySelectorAll<HTMLElement>('.quote-slide')) : [];
  const prev = document.querySelector<HTMLButtonElement>('.quotes-nav--prev');
  const next = document.querySelector<HTMLButtonElement>('.quotes-nav--next');
  const dotsWrap = document.querySelector<HTMLElement>('.quotes-dots');

  if (!scroller || !track || !cards.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scrollToCard = (index: number) => {
    const card = cards[Math.max(0, Math.min(index, cards.length - 1))];
    if (!card) return;
    const left = card.offsetLeft - track.offsetLeft;
    scroller.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const activeIndex = () => {
    const scrollLeft = scroller.scrollLeft;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - track.offsetLeft - scrollLeft);
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
      dot.addEventListener('click', () => scrollToCard(i));
      dotsWrap.append(dot);
    });
  }

  prev?.addEventListener('click', () => scrollToCard(activeIndex() - 1));
  next?.addEventListener('click', () => scrollToCard(activeIndex() + 1));

  let scrollTimer = 0;
  scroller.addEventListener(
    'scroll',
    () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(updateDots, 80);
    },
    { passive: true },
  );

  updateDots();
}

initMezunlarQuotes();
