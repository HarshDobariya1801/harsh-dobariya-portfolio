"use client";

import { useEffect } from "react";

export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));

    const heroVisual = document.querySelector<HTMLElement>("[data-hero-visual]");
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const moveVisual = (event: PointerEvent) => {
      if (!heroVisual) return;
      const rect = heroVisual.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      heroVisual.style.setProperty("--visual-x", `${(x * 8).toFixed(2)}px`);
      heroVisual.style.setProperty("--visual-y", `${(y * 8).toFixed(2)}px`);
      heroVisual.style.setProperty("--visual-rotate-y", `${(x * 3).toFixed(2)}deg`);
      heroVisual.style.setProperty("--visual-rotate-x", `${(y * -3).toFixed(2)}deg`);
    };

    const resetVisual = () => {
      heroVisual?.style.setProperty("--visual-x", "0px");
      heroVisual?.style.setProperty("--visual-y", "0px");
      heroVisual?.style.setProperty("--visual-rotate-y", "0deg");
      heroVisual?.style.setProperty("--visual-rotate-x", "0deg");
    };

    if (heroVisual && finePointer) {
      heroVisual.addEventListener("pointermove", moveVisual);
      heroVisual.addEventListener("pointerleave", resetVisual);
    }

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
      if (heroVisual && finePointer) {
        heroVisual.removeEventListener("pointermove", moveVisual);
        heroVisual.removeEventListener("pointerleave", resetVisual);
      }
    };
  }, []);

  return null;
}
