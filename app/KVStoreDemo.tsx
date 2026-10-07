"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "hashing" | "routing" | "stored";

export default function KVStoreDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const timeouts = useRef<number[]>([]);

  const clearTimers = () => {
    timeouts.current.forEach((timer) => window.clearTimeout(timer));
    timeouts.current = [];
  };

  useEffect(() => clearTimers, []);

  const runRequest = () => {
    clearTimers();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("stored");
      return;
    }
    setPhase("hashing");
    timeouts.current.push(window.setTimeout(() => setPhase("routing"), 450));
    timeouts.current.push(window.setTimeout(() => setPhase("stored"), 1050));
  };

  const message = {
    idle: "Ready for a request",
    hashing: "Hashing user:104",
    routing: "Routing to Node 3",
    stored: "Stored on Node 3",
  }[phase];

  return (
    <div className="kv-demo" data-phase={phase}>
      <div className="kv-command-bar">
        <div className="kv-command"><span>PUT</span><code>user:104</code><small>&quot;Harsh&quot;</small></div>
        <button type="button" onClick={runRequest}>{phase === "idle" ? "Run request" : "Run again"}</button>
      </div>
      <div className="kv-route" aria-hidden="true">
        <span>Client</span><i /><span>hash(key)</span><i /><span>Node ring</span>
      </div>
      <div className="kv-nodes" aria-label="Five node cluster">
        {[1, 2, 3, 4, 5].map((node) => (
          <div className={node === 3 && (phase === "routing" || phase === "stored") ? "kv-node is-target" : "kv-node"} key={node}>
            <span><i />Node {node}</span>
            <strong>{node === 3 && phase === "stored" ? "user:104" : "ready"}</strong>
          </div>
        ))}
      </div>
      <div className="kv-status" aria-live="polite">
        <span className="kv-status-message"><i />{message}</span>
        <ul>
          <li><strong>5</strong><span>nodes</span></li>
          <li><strong>TCP</strong><span>transport</span></li>
          <li><strong>TTL + LRU</strong><span>memory policy</span></li>
          <li><strong>AOF</strong><span>persistence</span></li>
        </ul>
      </div>
    </div>
  );
}
