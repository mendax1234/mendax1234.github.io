document.addEventListener("DOMContentLoaded", () => {
  const desktopBreakpoint = 925;
  const fallbackMastheadHeight = 70;
  const tocContainer = document.querySelector("[data-toc-container]");
  const tocPanel = tocContainer?.querySelector(".toc");
  const tocToggle = tocContainer?.querySelector(".toc__toggle");
  const tocClose = tocContainer?.querySelector(".toc__close");
  const tocBackdrop = tocContainer?.querySelector(".toc__backdrop");

  if (!tocContainer || !tocPanel || !tocToggle) {
    return;
  }

  const tocLinks = Array.from(tocPanel.querySelectorAll('.toc__menu a[href^="#"]'));
  const tocItems = Array.from(tocPanel.querySelectorAll(".toc__menu li"));
  const tocHeadings = tocLinks
    .map((link) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") {
        return null;
      }

      const id = decodeURIComponent(hash.slice(1));
      return document.getElementById(id);
    })
    .filter(Boolean);

  const closeToc = () => {
    tocContainer.classList.remove("is-open");
    tocToggle.setAttribute("aria-expanded", "false");

    if (tocBackdrop) {
      tocBackdrop.hidden = true;
    }
  };

  const openToc = () => {
    tocContainer.classList.add("is-open");
    tocToggle.setAttribute("aria-expanded", "true");

    if (tocBackdrop) {
      tocBackdrop.hidden = false;
    }
  };

  const syncTocMetrics = () => {
    const mastheadHeight = document.querySelector(".masthead")?.offsetHeight || fallbackMastheadHeight;
    const pageHeader = document.querySelector(".page__inner-wrap > header");
    const pageContent = document.querySelector(".page__content");
    let alignOffset = 0;

    document.documentElement.style.setProperty("--masthead-height", `${mastheadHeight}px`);
    tocContainer.style.setProperty("--toc-sticky-top", `${mastheadHeight + 24}px`);

    if (pageHeader && pageContent && window.innerWidth >= desktopBreakpoint) {
      const headerTop = pageHeader.getBoundingClientRect().top + window.scrollY;
      const contentTop = pageContent.getBoundingClientRect().top + window.scrollY;
      alignOffset = Math.max(0, contentTop - headerTop);
    }

    tocContainer.style.setProperty("--toc-align-offset", `${alignOffset}px`);

    if (window.innerWidth >= desktopBreakpoint) {
      closeToc();
    }
  };

  const setActiveTocLink = (activeLink) => {
    if (!activeLink) {
      return;
    }

    tocItems.forEach((item) => item.classList.remove("active"));
    activeLink.closest("li")?.classList.add("active");
  };

  const syncActiveHeading = () => {
    if (!tocHeadings.length || !tocLinks.length) {
      return;
    }

    const mastheadHeight = document.querySelector(".masthead")?.offsetHeight || fallbackMastheadHeight;
    const activationTop = mastheadHeight + 36;
    let activeHeading = tocHeadings[0];

    tocHeadings.forEach((heading) => {
      if (heading.getBoundingClientRect().top <= activationTop) {
        activeHeading = heading;
      }
    });

    const activeLink = tocLinks.find((link) => link.getAttribute("href") === `#${activeHeading.id}`);
    setActiveTocLink(activeLink);
  };

  let ticking = false;
  const requestActiveHeadingSync = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      syncActiveHeading();
      ticking = false;
    });
  };

  syncTocMetrics();
  syncActiveHeading();

  tocToggle.addEventListener("click", () => {
    if (tocContainer.classList.contains("is-open")) {
      closeToc();
      return;
    }

    openToc();
  });

  tocClose?.addEventListener("click", closeToc);
  tocBackdrop?.addEventListener("click", closeToc);

  tocLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < desktopBreakpoint) {
        window.setTimeout(closeToc, 120);
      }
    });
  });

  window.addEventListener("resize", syncTocMetrics);
  window.addEventListener("orientationchange", syncTocMetrics);
  window.addEventListener("scroll", requestActiveHeadingSync, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeToc();
    }
  });
});
