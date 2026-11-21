"use client";

import { useEffect } from "react";

export default function DeferredStyles() {
  useEffect(() => {
    if (document.querySelector('link[data-deferred-styles="journey-scenes"]')) return;

    const projectStyles = document.createElement("link");
    projectStyles.rel = "stylesheet";
    projectStyles.href = "/project-demos.css";
    projectStyles.dataset.deferredStyles = "project-demos";

    const firstStylesheet = document.head.querySelector('link[rel="stylesheet"]');
    document.head.insertBefore(projectStyles, firstStylesheet);

    const sceneStyles = document.createElement("link");
    sceneStyles.rel = "stylesheet";
    sceneStyles.href = "/journey-scenes.css";
    sceneStyles.dataset.deferredStyles = "journey-scenes";
    document.head.append(sceneStyles);

    const desktopStyles = document.createElement("link");
    desktopStyles.rel = "stylesheet";
    desktopStyles.href = "/journey-desktop.css";
    desktopStyles.media =
      "(min-width: 1120px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)";
    desktopStyles.dataset.deferredStyles = "journey-desktop";
    document.head.append(desktopStyles);
  }, []);

  return null;
}
