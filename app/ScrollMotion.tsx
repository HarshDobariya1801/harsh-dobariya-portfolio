"use client";

import { useEffect } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

export default function ScrollMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-motion]"),
    );
    let animationFrame = 0;

    const update = () => {
      const viewportHeight = window.innerHeight;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const reveal = clamp(
          (viewportHeight * 0.9 - rect.top) / (viewportHeight * 0.38),
        );
        const distanceFromCenter =
          (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;

        element.style.setProperty("--reveal-opacity", reveal.toFixed(3));
        element.style.setProperty(
          "--reveal-y",
          `${((1 - reveal) * 64).toFixed(2)}px`,
        );
        element.style.setProperty(
          "--depth-y",
          `${(distanceFromCenter * -34).toFixed(2)}px`,
        );
        element.style.setProperty(
          "--depth-rotate",
          `${(distanceFromCenter * -1.25).toFixed(3)}deg`,
        );
      });

      animationFrame = 0;
    };

    const scheduleUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(update);
      }
    };

    root.classList.add("motion-ready");
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      root.classList.remove("motion-ready");
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return null;
}
