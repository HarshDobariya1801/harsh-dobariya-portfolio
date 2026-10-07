"use client";

import { useEffect } from "react";

export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
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

    const handleScroll = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 18);
      const marker = window.scrollY + window.innerHeight * 0.34;
      const current = [...sections].reverse().find((section) => section.offsetTop <= marker);
      navLinks.forEach((link) => {
        const active = Boolean(current && link.hash === `#${current.id}`);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const closeMenu = () => {
      if (!menu?.open) return;
      menu.open = false;
    };

    const handleMenuToggle = () => {
      const open = Boolean(menu?.open);
      if (open) {
        window.requestAnimationFrame(() => menu?.querySelector<HTMLAnchorElement>("a")?.focus());
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
      window.removeEventListener("scroll", handleScroll);
      menu?.removeEventListener("toggle", handleMenuToggle);
      menu?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu));
      document.removeEventListener("keydown", handleKeyDown);
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
