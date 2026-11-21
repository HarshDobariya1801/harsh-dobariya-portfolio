"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

const demos = {
  kv: lazy(() => import("./KVStoreDemo")),
  collaborative: lazy(() => import("./CollaborativeDemo")),
} as const;

type DemoKind = keyof typeof demos;

function DemoPlaceholder({ kind }: { kind: DemoKind }) {
  return (
    <div className="demo-lazy-placeholder" role="status">
      <span>Interactive demo</span>
      <strong>{kind === "kv" ? "Distributed system" : "Collaborative workspace"}</strong>
      <small>Loading as it enters view</small>
    </div>
  );
}

export default function LazyProjectDemo({ kind }: { kind: DemoKind }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const Demo = demos[kind];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldLoad) return;

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = setTimeout(() => setShouldLoad(true), 0);
      return () => clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "1400px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="lazy-demo"
      data-demo-kind={kind}
      data-demo-ready={shouldLoad ? "true" : "false"}
    >
      {shouldLoad ? (
        <Suspense fallback={<DemoPlaceholder kind={kind} />}>
          <Demo />
        </Suspense>
      ) : (
        <DemoPlaceholder kind={kind} />
      )}
    </div>
  );
}
