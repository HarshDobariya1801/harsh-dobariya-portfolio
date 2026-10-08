"use client";

import { useEffect, useRef, useState } from "react";

type SyncPhase = "idle" | "gateway" | "redis" | "node" | "persist" | "synced";
type MobileView = "editor" | "architecture";

const sentences = [
  "Design systems should make change predictable.",
  "Reliability starts at clear boundaries.",
] as const;

export default function CollaborativeDemo() {
  const [phase, setPhase] = useState<SyncPhase>("idle");
  const [version, setVersion] = useState(0);
  const [localText, setLocalText] = useState<string>(sentences[0]);
  const [remoteText, setRemoteText] = useState<string>(sentences[0]);
  const [view, setView] = useState<MobileView>("editor");
  const timers = useRef<number[]>([]);
  const typingTimer = useRef<number | null>(null);

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    if (typingTimer.current) window.clearInterval(typingTimer.current);
    typingTimer.current = null;
  };

  useEffect(() => clearTimers, []);

  const sendEdit = () => {
    clearTimers();
    const next = sentences[(version + 1) % sentences.length];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLocalText(next);
    setRemoteText(reduced ? next : "");

    if (reduced) {
      setPhase("synced");
      setVersion((value) => value + 1);
      return;
    }

    setPhase("gateway");
    timers.current.push(window.setTimeout(() => setPhase("redis"), 280));
    timers.current.push(window.setTimeout(() => setPhase("node"), 560));
    timers.current.push(window.setTimeout(() => setPhase("persist"), 920));
    timers.current.push(window.setTimeout(() => {
      setPhase("synced");
      setRemoteText(next);
      setVersion((value) => value + 1);
    }, 1320));

    let index = 0;
    timers.current.push(window.setTimeout(() => {
      typingTimer.current = window.setInterval(() => {
        index += 1;
        setRemoteText(next.slice(0, index));
        if (index >= next.length && typingTimer.current) {
          window.clearInterval(typingTimer.current);
          typingTimer.current = null;
        }
      }, 23);
    }, 320));
  };

  const syncing = phase !== "idle" && phase !== "synced";

  return (
    <div className="collaborative-demo" data-phase={phase} data-view={view}>
      <div className="demo-toolbar collab-toolbar">
        <div className="presence-status">
          <span><i />Connected</span><span>2 collaborators</span><span>{syncing ? "Syncing" : "Synced"}</span>
        </div>
        <button type="button" onClick={sendEdit} disabled={syncing}>Send an edit</button>
      </div>

      <div className="mobile-demo-tabs" role="tablist" aria-label="Collaborative demo views">
        <button type="button" role="tab" id="editor-tab" aria-controls="editor-panel" aria-selected={view === "editor"} onClick={() => setView("editor")}>Editor</button>
        <button type="button" role="tab" id="architecture-tab" aria-controls="architecture-panel" aria-selected={view === "architecture"} onClick={() => setView("architecture")}>Architecture</button>
      </div>

      <div className="collab-editors collab-pane" id="editor-panel" aria-live="polite">
        <section className="editor-window" aria-label="Harsh editor">
          <header><span className="avatar">H</span><strong>Harsh</strong><small>editing</small></header>
          <div className="editor-body"><span>01</span><p>{localText}<i /></p></div>
        </section>
        <section className={syncing ? "editor-window is-receiving" : "editor-window"} aria-label="Guest editor">
          <header><span className="avatar guest">G</span><strong>Guest</strong><small>{syncing ? "receiving" : "up to date"}</small></header>
          <div className="editor-body"><span>01</span><p>{remoteText || "Receiving change..."}</p></div>
        </section>
      </div>

      <div className="collab-architecture collab-pane" id="architecture-panel" role="img" aria-label="Realtime synchronization path">
        <div className="event-path" aria-hidden="true">
          <span className="arch-node client-a">Client A</span><i />
          <span className="arch-node gateway">WebSocket</span><i />
          <span className="arch-node node-one">Node 01</span><i />
          <span className="arch-node redis">Redis</span><i />
          <span className="arch-node node-two">Node 02</span><i />
          <span className="arch-node client-b">Client B</span>
          <b className="arch-node postgres">PostgreSQL<small>durable state</small></b>
        </div>
      </div>
    </div>
  );
}
