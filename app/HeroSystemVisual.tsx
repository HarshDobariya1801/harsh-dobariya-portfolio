"use client";

import { useEffect, useRef, useState } from "react";

const LATENCIES = [24, 31, 27];

export default function HeroSystemVisual() {
  const [phase, setPhase] = useState(5);
  const [request, setRequest] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const clearTimers = () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };

    const runRequest = () => {
      clearTimers();
      setPhase(0);
      [1, 2, 3, 4, 5].forEach((next, index) => {
        timers.current.push(window.setTimeout(() => {
          setPhase(next);
          if (next === 5) setRequest((value) => value + 1);
        }, (index + 1) * 560));
      });
    };

    const firstRun = window.setTimeout(runRequest, 900);
    const interval = window.setInterval(runRequest, 5600);

    return () => {
      window.clearTimeout(firstRun);
      window.clearInterval(interval);
      clearTimers();
    };
  }, []);

  const latency = LATENCIES[request % LATENCIES.length];

  return (
    <div
      className="hero-system"
      data-phase={phase}
      role="img"
      aria-label="Illustrative system flow from a web request through an API gateway, application service, cache, worker, and PostgreSQL database"
    >
      <div className="system-topbar" aria-hidden="true">
        <span><i />System trace</span>
        <small>Illustrative flow</small>
      </div>

      <div className="system-canvas" aria-hidden="true">
        <svg viewBox="0 0 520 390" preserveAspectRatio="none">
          <path d="M126 80 H218" />
          <path d="M286 104 V166" />
          <path d="M255 212 L154 276" />
          <path d="M315 190 H385" />
          <path d="M163 305 L244 330" />
          <path d="M421 219 L314 326" />
          <path className="return-path" d="M276 315 C332 280 354 241 308 212" />
        </svg>

        <span className="request-pulse" />

        <div className="system-node request-node">
          <small>Request</small>
          <code>GET /workspace/42</code>
        </div>
        <div className="system-node api-node">
          <small>API gateway</small>
          <strong>HTTP</strong>
        </div>
        <div className="system-node app-node">
          <small>Application</small>
          <strong>Service</strong>
        </div>
        <div className="system-node worker-node">
          <small>Processing</small>
          <strong>Worker</strong>
        </div>
        <div className="system-node cache-node">
          <small>Cache</small>
          <strong>Redis</strong>
        </div>
        <div className="system-node db-node">
          <small>Data layer</small>
          <strong>PostgreSQL</strong>
        </div>
      </div>

      <div className="system-footer" aria-hidden="true">
        <span><i />Healthy</span>
        <span><small>Response</small><strong>{latency} ms</strong></span>
        <span><small>Connections</small><strong>12 active</strong></span>
      </div>
    </div>
  );
}
