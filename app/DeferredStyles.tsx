"use client";

import { useEffect } from "react";

export default function DeferredStyles() {
  useEffect(() => {
    const root = document.documentElement;
    const existing = document.querySelector<HTMLLinkElement>('link[data-deferred-styles="project-demos"]');
    if (existing) {
      root.dataset.deferredStylesReady = "true";
      return;
    }

    let timer = 0;
    let loading = false;

    const removeListeners = () => {
      window.removeEventListener("scroll", loadStyles);
      window.removeEventListener("pointerdown", loadStyles);
      window.removeEventListener("keydown", loadStyles);
    };

    function loadStyles() {
      if (loading) return;
      loading = true;
      window.clearTimeout(timer);
      removeListeners();

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/project-demos.css";
      link.dataset.deferredStyles = "project-demos";
      link.addEventListener("load", () => { root.dataset.deferredStylesReady = "true"; }, { once: true });
      link.addEventListener("error", () => { root.dataset.deferredStylesReady = "true"; }, { once: true });
      document.head.append(link);
    }

    timer = window.setTimeout(loadStyles, 3_500);
    window.addEventListener("scroll", loadStyles, { passive: true, once: true });
    window.addEventListener("pointerdown", loadStyles, { passive: true, once: true });
    window.addEventListener("keydown", loadStyles, { once: true });

    return () => {
      window.clearTimeout(timer);
      removeListeners();
    };
  }, []);

  return null;
}
