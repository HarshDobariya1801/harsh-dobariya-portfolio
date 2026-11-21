"use client";

import { useEffect } from "react";

export default function DeferredStyles() {
  useEffect(() => {
    const root = document.documentElement;
    if (document.querySelector('link[data-deferred-styles="journey-scenes"]')) {
      root.dataset.deferredStylesReady = "true";
      return;
    }

    let timer = 0;
    let loading = false;

    const removeInteractionListeners = () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerdown", loadStyles);
      window.removeEventListener("touchstart", loadStyles);
      window.removeEventListener("keydown", loadStyles);
    };

    const appendStylesheet = (
      href: string,
      name: string,
      options: { before?: Element | null; media?: string } = {},
    ) =>
      new Promise<void>((resolve) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.dataset.deferredStyles = name;
        if (options.media) link.media = options.media;
        link.addEventListener("load", () => resolve(), { once: true });
        link.addEventListener("error", () => resolve(), { once: true });

        if (options.before) document.head.insertBefore(link, options.before);
        else document.head.append(link);
      });

    function loadStyles() {
      if (loading) return;
      loading = true;
      window.clearTimeout(timer);
      removeInteractionListeners();

      const firstStylesheet = document.head.querySelector('link[rel="stylesheet"]');
      void Promise.all([
        appendStylesheet("/project-demos.css", "project-demos", { before: firstStylesheet }),
        appendStylesheet("/journey-scenes.css", "journey-scenes"),
        appendStylesheet("/journey-desktop.css", "journey-desktop", {
          media:
            "(min-width: 1120px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
        }),
      ]).then(() => {
        root.dataset.deferredStylesReady = "true";
      });
    }

    function handleScroll() {
      if (window.scrollY > 4) loadStyles();
    }

    const scheduleAfterLoad = () => {
      // Keep below-fold presentation work outside the critical hero render.
      // Any real interaction loads it immediately; this is only the idle fallback.
      timer = window.setTimeout(loadStyles, 4_000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointerdown", loadStyles, { passive: true });
    window.addEventListener("touchstart", loadStyles, { passive: true });
    window.addEventListener("keydown", loadStyles);

    if (document.readyState === "complete") scheduleAfterLoad();
    else window.addEventListener("load", scheduleAfterLoad, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", scheduleAfterLoad);
      removeInteractionListeners();
    };
  }, []);

  return null;
}
