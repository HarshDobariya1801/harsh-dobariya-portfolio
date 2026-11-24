"use client";

import { useEffect } from "react";

export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const menu = document.querySelector<HTMLDetailsElement>("[data-mobile-nav]");
    const menuSummary = menu?.querySelector<HTMLElement>("summary");
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
    const volumes = Array.from(document.querySelectorAll<HTMLDetailsElement>("[data-volume]"));
    const tiltTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const closeButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-volume-close]"));

    let revealObserver: IntersectionObserver | undefined;
    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      root.classList.add("motion-ready");
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8%", threshold: 0.1 },
      );
      revealItems.forEach((item) => revealObserver?.observe(item));
    }

    let animationFrame = 0;
    const updatePageState = () => {
      animationFrame = 0;
      const marker = window.scrollY + Math.min(window.innerHeight * 0.34, 280);
      header?.classList.toggle("is-scrolled", window.scrollY > 16);

      const activeSection = [...sections].reverse().find((section) => section.offsetTop <= marker) ?? sections[0];
      navLinks.forEach((link) => {
        if (activeSection && link.hash === `#${activeSection.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updatePageState);
    };

    const closeMenu = () => {
      if (menu?.open) menu.open = false;
    };
    const handleMenuToggle = () => {
      if (menu?.open) window.requestAnimationFrame(() => menu.querySelector<HTMLAnchorElement>("a")?.focus());
    };

    const handleVolumeToggle = (event: Event) => {
      const opened = event.currentTarget as HTMLDetailsElement;
      if (!opened.open) return;
      const collection = opened.closest(".collection");
      volumes.forEach((volume) => {
        if (volume !== opened && volume.open && volume.closest(".collection") === collection) volume.open = false;
      });
    };

    const handleCloseVolume = (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const volume = button.closest<HTMLDetailsElement>("[data-volume]");
      if (!volume) return;
      volume.open = false;
      volume.querySelector<HTMLElement>("summary")?.focus();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      const bounds = target.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      target.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
      target.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
      target.style.setProperty("--glint-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      target.style.setProperty("--glint-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    };
    const resetTilt = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      target.style.removeProperty("--tilt-x");
      target.style.removeProperty("--tilt-y");
      target.style.removeProperty("--glint-x");
      target.style.removeProperty("--glint-y");
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (menu?.open) {
          closeMenu();
          menuSummary?.focus();
          return;
        }
        const openVolume = [...volumes].reverse().find((volume) => volume.open);
        if (openVolume) {
          openVolume.open = false;
          openVolume.querySelector<HTMLElement>("summary")?.focus();
          return;
        }
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

    const openHashTarget = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const target = document.getElementById(hash);
      const volume = target?.matches("[data-volume]") ? target as HTMLDetailsElement : target?.closest<HTMLDetailsElement>("[data-volume]");
      if (volume) volume.open = true;
    };

    updatePageState();
    openHashTarget();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", openHashTarget);
    menu?.addEventListener("toggle", handleMenuToggle);
    menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    volumes.forEach((volume) => volume.addEventListener("toggle", handleVolumeToggle));
    closeButtons.forEach((button) => button.addEventListener("click", handleCloseVolume));
    document.addEventListener("keydown", handleKeyDown);

    if (finePointer && !reducedMotion) {
      tiltTargets.forEach((target) => {
        target.addEventListener("pointermove", handlePointerMove);
        target.addEventListener("pointerleave", resetTilt);
      });
    }

    return () => {
      revealObserver?.disconnect();
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", openHashTarget);
      menu?.removeEventListener("toggle", handleMenuToggle);
      menu?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu));
      volumes.forEach((volume) => volume.removeEventListener("toggle", handleVolumeToggle));
      closeButtons.forEach((button) => button.removeEventListener("click", handleCloseVolume));
      document.removeEventListener("keydown", handleKeyDown);
      tiltTargets.forEach((target) => {
        target.removeEventListener("pointermove", handlePointerMove);
        target.removeEventListener("pointerleave", resetTilt);
      });
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
