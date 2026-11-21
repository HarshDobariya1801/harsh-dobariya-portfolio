"use client";

import { useEffect } from "react";

export default function DeferredStyles() {
  useEffect(() => {
    if (document.querySelector('link[data-deferred-styles="project-demos"]')) return;

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/project-demos.css";
    stylesheet.dataset.deferredStyles = "project-demos";

    const firstStylesheet = document.head.querySelector('link[rel="stylesheet"]');
    document.head.insertBefore(stylesheet, firstStylesheet);
  }, []);

  return null;
}
