"use client";

import { useEffect } from "react";

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

function documentTop(element: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = element;

  while (node) {
    top += node.offsetTop;
    node = node.offsetParent instanceof HTMLElement ? node.offsetParent : null;
  }

  return top;
}

export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cinematicQuery = window.matchMedia(
      "(min-width: 1120px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
    );
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
    const journey = document.querySelector<HTMLElement>("[data-journey]");
    const journeyCards = Array.from(document.querySelectorAll<HTMLElement>("[data-journey-card]"));
    const journeyLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-journey-link]"));
    const journeyProgress = document.querySelector<HTMLElement>("[data-journey-progress]");
    const menu = document.querySelector<HTMLDetailsElement>("[data-mobile-nav]");
    const menuSummary = menu?.querySelector<HTMLElement>("summary");

    let revealObserver: IntersectionObserver | undefined;
    if (reduceMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
    } else {
      root.classList.add("reveal-ready");
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10%", threshold: 0.12 },
      );
      items.forEach((item) => revealObserver?.observe(item));
    }

    let animationFrame = 0;

    const updateJourney = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const marker = scrollY + viewportHeight * 0.44;
      const stageTop = clamp(viewportHeight * 0.09, 76, 94);
      let activeIndex = 0;

      root.classList.toggle("journey-ready", cinematicQuery.matches);
      header?.classList.toggle("is-scrolled", scrollY > 18);

      const currentSection = [...sections]
        .reverse()
        .find((section) => documentTop(section) <= scrollY + viewportHeight * 0.34);
      navLinks.forEach((link) => {
        const active = Boolean(currentSection && link.hash === `#${currentSection.id}`);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });

      journeyCards.forEach((card, index) => {
        const top = documentTop(card);
        const transitionDistance = Math.max(card.offsetHeight * 0.86, viewportHeight * 0.74);
        const exit = clamp((scrollY + stageTop - top) / transitionDistance);
        const naturalTop = top - scrollY;
        const entry = clamp((viewportHeight - naturalTop) / Math.max(viewportHeight - stageTop, 1));
        const scale = 0.985 + entry * 0.015 - exit * 0.045;
        const opacity = clamp(0.48 + entry * 0.52 - exit * 0.25);

        card.style.setProperty("--journey-exit", exit.toFixed(4));
        card.style.setProperty("--journey-entry", entry.toFixed(4));
        card.style.setProperty("--journey-enter-y", `${((1 - entry) * 96).toFixed(2)}px`);
        card.style.setProperty("--journey-exit-y", `${(-exit * 28).toFixed(2)}px`);
        card.style.setProperty("--journey-z", `${(-exit * 84).toFixed(2)}px`);
        card.style.setProperty("--journey-scale", scale.toFixed(4));
        card.style.setProperty("--journey-rotate-x", `${(exit * 1.15).toFixed(2)}deg`);
        card.style.setProperty("--journey-opacity", opacity.toFixed(4));
        card.style.setProperty("--journey-blur", `${(exit * 0.8).toFixed(2)}px`);
        if (top <= marker) activeIndex = index;
      });

      journeyCards.forEach((card, index) => {
        card.classList.toggle("is-active", index === activeIndex);
        card.classList.toggle("is-behind", index < activeIndex);
      });

      journeyLinks.forEach((link, index) => {
        if (index === activeIndex) link.setAttribute("aria-current", "step");
        else link.removeAttribute("aria-current");
      });

      if (journey && journeyProgress) {
        const journeyTop = documentTop(journey);
        const distance = Math.max(journey.offsetHeight - viewportHeight, 1);
        const progress = clamp((scrollY - journeyTop) / distance);
        journeyProgress.style.setProperty("--journey-progress", progress.toFixed(4));
      }
    };

    const scheduleJourneyUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateJourney);
    };

    updateJourney();
    window.addEventListener("scroll", scheduleJourneyUpdate, { passive: true });
    window.addEventListener("resize", scheduleJourneyUpdate);
    cinematicQuery.addEventListener("change", scheduleJourneyUpdate);
    document.fonts.ready.then(scheduleJourneyUpdate).catch(() => undefined);

    const closeMenu = () => {
      if (!menu?.open) return;
      menu.open = false;
    };

    const handleMenuToggle = () => {
      if (menu?.open) {
        window.requestAnimationFrame(() => menu.querySelector<HTMLAnchorElement>("a")?.focus());
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu?.open) {
        closeMenu();
        menuSummary?.focus();
        return;
      }

      if (event.key !== "Tab" || !menu?.open) return;
      const focusable = Array.from(menu.querySelectorAll<HTMLElement>("summary, a[href]"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    menu?.addEventListener("toggle", handleMenuToggle);
    menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      revealObserver?.disconnect();
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleJourneyUpdate);
      window.removeEventListener("resize", scheduleJourneyUpdate);
      cinematicQuery.removeEventListener("change", scheduleJourneyUpdate);
      menu?.removeEventListener("toggle", handleMenuToggle);
      menu?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu));
      document.removeEventListener("keydown", handleKeyDown);
      root.classList.remove("reveal-ready", "journey-ready");
    };
  }, []);

  return null;
}
