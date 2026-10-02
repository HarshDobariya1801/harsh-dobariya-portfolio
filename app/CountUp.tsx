"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ value }: { value: string }) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^([\d,]+)(.*)$/);
    if (!match || !elementRef.current) return;

    const target = Number(match[1].replaceAll(",", ""));
    const suffix = match[2];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const startedAt = performance.now();
        const duration = 700;

        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          const formatted = target >= 1000 ? current.toLocaleString("en-US") : String(current);
          setDisplay(`${formatted}${suffix}`);
          if (progress < 1) frame = window.requestAnimationFrame(tick);
        };

        setDisplay(`0${suffix}`);
        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={elementRef} className="count-up" aria-label={value}>
      {display}
    </span>
  );
}
