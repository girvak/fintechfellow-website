function initMezunlarTabs() {
  const root = document.querySelector<HTMLElement>('[data-cohort-tabs]');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  if (!tabs.length || !panels.length) return;

  const activate = (id: string) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.cohort === id;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.id === `cohort-panel-${id}`;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.cohort;
      if (id) activate(id);
    });

    tab.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        tabs[(idx + 1) % tabs.length]?.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        tabs[(idx - 1 + tabs.length) % tabs.length]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        tabs[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        tabs[tabs.length - 1]?.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = tab.dataset.cohort;
        if (id) activate(id);
      }
    });
  });
}

initMezunlarTabs();
