import { applyViewerFraming, getViewerFraming, type ViewerFraming } from './viewer-framing';

const STORAGE_KEY = 'ff_hero_intro_v1';
const STATUS_WIDTH_DESKTOP = 34;
const STATUS_WIDTH_MOBILE = 22;

/** Tek akış — boş string bölüm arası */
const SCRIPT_DESKTOP = [
  '[boot] fellow/v2 — cold start',
  '[init] portal ..................... OK',
  '',
  '>> hoş geldin, aday.',
  '',
  '__status__eğitimler',
  '__status__partnerler',
  '__status__bu iş',
  '__status__network',
  '__status__kariyer',
  '',
  '> GET /anasayfa',
];

const SCRIPT_MOBILE = [
  '[boot] fellow/v2',
  '[init] portal .......... OK',
  '',
  '>> hoş geldin.',
  '',
  '__status__eğitimler',
  '__status__partnerler',
  '__status__bu iş',
  '__status__network',
  '__status__kariyer',
  '',
  '> GET /',
];

function prefersReducedMotion(): boolean {
  return getViewerFraming().reducedMotion;
}

function isMobileFraming(framing: ViewerFraming): boolean {
  return framing.viewport === 'mobile';
}

function isCompactFraming(framing: ViewerFraming): boolean {
  return framing.viewport === 'mobile' || framing.viewport === 'tablet';
}

function statusWidthFor(framing: ViewerFraming): number {
  if (framing.viewport === 'mobile') return STATUS_WIDTH_MOBILE;
  if (framing.viewport === 'tablet') return 28;
  return STATUS_WIDTH_DESKTOP;
}

function shouldForceIntro(): boolean {
  return new URLSearchParams(location.search).get('intro') === '1';
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatStatusLine(label: string, width: number): string {
  const padded = `  ${label}`;
  const suffix = ' OK';
  const dots = Math.max(2, width - padded.length - suffix.length);
  return `${padded}${'.'.repeat(dots)}${suffix}`;
}

function markSeen(): void {
  try {
    localStorage.setItem(STORAGE_KEY, 'seen');
  } catch {
    /* private mode */
  }
}

function finishIntro(overlay: HTMLElement | null): void {
  const root = document.documentElement;
  const hero = document.querySelector('.hero');

  root.classList.remove('hero-intro-pending');
  root.classList.add('hero-intro-skip');
  document.body.style.overflow = '';

  if (overlay) {
    overlay.classList.add('is-handoff');
    overlay.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => {
      overlay.classList.add('is-exiting');
      overlay.hidden = true;
    }, 720);
  }

  hero?.classList.add('hero-intro-ready');
  markSeen();
}

function activatePhase(el: HTMLElement | null): void {
  if (!el) return;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add('is-active'));
}

function leavePhase(el: HTMLElement | null): Promise<void> {
  if (!el) return Promise.resolve();
  el.classList.remove('is-active');
  el.classList.add('is-leaving');
  return wait(280).then(() => {
    el.classList.remove('is-leaving');
    el.hidden = true;
  });
}

async function runEraPhase(eraEl: HTMLElement, mobile: boolean, isSkipped: () => boolean): Promise<void> {
  const base = 'yeni dönem başlıyor';
  const dotFrames = [base, `${base} .`, `${base} . .`, `${base} . . .`];
  const frameMs = mobile ? 240 : 280;

  for (const frame of dotFrames) {
    if (isSkipped()) return;
    eraEl.textContent = frame;
    await wait(frameMs);
  }

  eraEl.innerHTML = 'yeni <span class="g">dönem</span> başlıyor . . .';
  await wait(mobile ? 480 : 620);
}

async function showTerminalOnce(
  termPhase: HTMLElement | null,
  terminal: HTMLElement | null,
  grid: HTMLElement | null,
  mobile: boolean,
): Promise<void> {
  activatePhase(termPhase);
  termPhase?.classList.add('is-booting');
  grid?.classList.add('is-pulse');
  await wait(40);
  terminal?.classList.add('is-open');
  await wait(prefersReducedMotion() ? 60 : mobile ? 340 : 560);
  terminal?.classList.add('is-ready');
  termPhase?.classList.remove('is-booting');
  window.setTimeout(() => grid?.classList.remove('is-pulse'), 1100);
}

function scrollTermToEnd(termOut: HTMLElement): void {
  termOut.scrollTop = termOut.scrollHeight;
}

function setLastTermLine(termOut: HTMLElement, text: string): void {
  const lines = (termOut.textContent ?? '').split('\n');
  if (lines.length === 0) lines.push(text);
  else lines[lines.length - 1] = text;
  termOut.textContent = lines.join('\n');
  scrollTermToEnd(termOut);
}

async function appendLine(
  termOut: HTMLElement,
  line: string,
  charMs: number,
  isSkipped: () => boolean,
): Promise<void> {
  const prefix = termOut.textContent ?? '';
  const linePrefix = prefix ? `${prefix}\n` : '';

  if (line.length === 0) {
    if (isSkipped()) return;
    termOut.textContent = linePrefix;
    scrollTermToEnd(termOut);
    return;
  }

  for (let j = 0; j <= line.length; j++) {
    if (isSkipped()) return;
    termOut.textContent = linePrefix + line.slice(0, j);
    scrollTermToEnd(termOut);
    if (j < line.length) await wait(charMs);
  }
}

function formatCountdownLine(label: string, count: number, width: number): string {
  const padded = `  ${label}`;
  const suffix = ` ${count}`;
  const dots = Math.max(2, width - padded.length - suffix.length);
  return `${padded}${'.'.repeat(dots)}${suffix}`;
}

async function runRedirectCountdown(
  termOut: HTMLElement,
  mobile: boolean,
  lineWidth: number,
  isSkipped: () => boolean,
): Promise<void> {
  const typeMs = mobile ? 7 : 10;
  const tickMs = mobile ? 520 : 760;
  const label = mobile ? 'redirect' : 'redirecting';

  await appendLine(termOut, '', 0, isSkipped);
  if (isSkipped()) return;

  await appendLine(termOut, formatCountdownLine(label, 3, lineWidth), typeMs, isSkipped);
  if (isSkipped()) return;
  await wait(tickMs);

  setLastTermLine(termOut, formatCountdownLine(label, 2, lineWidth));
  if (isSkipped()) return;
  await wait(tickMs);

  setLastTermLine(termOut, formatCountdownLine(label, 1, lineWidth));
}

function resolveScriptLine(raw: string, lineWidth: number): string {
  if (raw.startsWith('__status__')) {
    return formatStatusLine(raw.slice('__status__'.length), lineWidth);
  }
  return raw;
}

function pauseAfterLine(line: string, mobile: boolean): number {
  if (line === '') return mobile ? 60 : 80;
  if (line.startsWith('>>')) return mobile ? 200 : 280;
  if (line.startsWith('>')) return mobile ? 120 : 160;
  if (line.startsWith('__status__')) return mobile ? 60 : 80;
  return mobile ? 70 : 90;
}

async function runTerminalSession(
  termOut: HTMLElement,
  cursor: HTMLElement | null,
  framing: ViewerFraming,
  isSkipped: () => boolean,
): Promise<void> {
  termOut.textContent = '';
  if (cursor) {
    cursor.style.opacity = '1';
    cursor.style.visibility = 'hidden';
  }

  const mobile = isMobileFraming(framing);
  const script = mobile ? SCRIPT_MOBILE : SCRIPT_DESKTOP;
  const typeMs = mobile ? 7 : 10;
  const statusMs = mobile ? 5 : 8;
  const lineWidth = statusWidthFor(framing);

  for (const raw of script) {
    const line = resolveScriptLine(raw, lineWidth);
    const ms = raw.startsWith('__status__') ? statusMs : typeMs;
    await appendLine(termOut, line, ms, isSkipped);
    if (isSkipped()) return;
    await wait(pauseAfterLine(raw, mobile));
  }

  if (isSkipped()) return;
  await runRedirectCountdown(termOut, mobile, lineWidth, isSkipped);
}

async function runIntro(): Promise<void> {
  const overlay = document.getElementById('hero-intro');
  const eraPhase = overlay?.querySelector<HTMLElement>('[data-phase="era"]');
  const termPhase = overlay?.querySelector<HTMLElement>('[data-phase="term"]');
  const eraEl = document.getElementById('hero-intro-era');
  const termOut = document.getElementById('hero-intro-term-out');
  const terminal = document.getElementById('hero-intro-terminal');
  const cursor = document.getElementById('hero-intro-cursor');
  const skipBtn = document.getElementById('hero-intro-skip');

  if (!overlay || !eraEl || !termOut) {
    finishIntro(null);
    return;
  }

  overlay.hidden = false;
  overlay.setAttribute('aria-hidden', 'false');
  if (skipBtn) skipBtn.hidden = false;

  let skipped = false;
  const isSkipped = () => skipped;
  const skip = () => {
    if (skipped) return;
    skipped = true;
    finishIntro(overlay);
  };

  skipBtn?.addEventListener('click', skip);
  overlay.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (
      t === overlay ||
      t.classList.contains('hero-intro-bg') ||
      t.classList.contains('hero-intro-grid')
    ) {
      skip();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') skip();
  });

  let safety = 0;

  try {
    const framing = applyViewerFraming();
    const mobile = isMobileFraming(framing);
    const compact = isCompactFraming(framing) || framing.compactHeight;
    const grid = overlay.querySelector<HTMLElement>('.hero-intro-grid');

    overlay.classList.toggle('is-viewport-mobile', mobile);
    overlay.classList.toggle('is-viewport-tablet', framing.viewport === 'tablet');
    overlay.classList.toggle('is-viewport-compact', compact);

    terminal?.classList.toggle('is-viewport-mobile', mobile);
    terminal?.classList.toggle('is-viewport-compact', framing.compactHeight);

    safety = window.setTimeout(skip, mobile ? 13000 : compact ? 14500 : 16000);

    activatePhase(eraPhase);
    await runEraPhase(eraEl, mobile, isSkipped);
    if (isSkipped()) return;

    await leavePhase(eraPhase);
    if (isSkipped()) return;

    await showTerminalOnce(termPhase, terminal, grid, mobile);
    if (isSkipped()) return;

    await runTerminalSession(termOut, cursor, framing, isSkipped);
  } finally {
    if (safety) window.clearTimeout(safety);
    if (!skipped) finishIntro(overlay);
  }
}

function replayHeroIntro(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* private mode */
  }
  const url = new URL(location.href);
  url.searchParams.set('intro', '1');
  location.assign(url.pathname + url.search + url.hash);
}

function bindReplayButton(): void {
  document.getElementById('hero-replay-intro')?.addEventListener('click', replayHeroIntro);
}

function initHeroIntro(): void {
  bindReplayButton();
  const root = document.documentElement;

  if (root.classList.contains('hero-intro-skip')) {
    document.querySelector('.hero')?.classList.add('hero-intro-ready');
    return;
  }

  if (!root.classList.contains('hero-intro-pending')) {
    document.querySelector('.hero')?.classList.add('hero-intro-ready');
    return;
  }

  if (prefersReducedMotion() && !shouldForceIntro()) {
    finishIntro(document.getElementById('hero-intro'));
    return;
  }

  void runIntro();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroIntro);
} else {
  initHeroIntro();
}
