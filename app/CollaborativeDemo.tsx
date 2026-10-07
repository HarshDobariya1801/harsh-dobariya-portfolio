"use client";

import { useEffect, useRef, useState } from "react";

export default function CollaborativeDemo() {
  const [synced, setSynced] = useState(true);
  const [version, setVersion] = useState(1);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const sendEdit = () => {
    if (timer.current) window.clearTimeout(timer.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSynced(false);
    if (reduced) {
      setVersion((value) => value + 1);
      setSynced(true);
      return;
    }
    timer.current = window.setTimeout(() => {
      setVersion((value) => value + 1);
      setSynced(true);
    }, 700);
  };

  const extraLine = version % 2 === 0
    ? "broadcast(change, workspace.members);"
    : "await workspace.save(change);";

  return (
    <div className="collaborative-demo">
      <div className="collab-toolbar">
        <div><span><i />Connected</span><span>2 users</span><span>{synced ? "Synced" : "Syncing"}</span></div>
        <button type="button" onClick={sendEdit}>Send an edit</button>
      </div>
      <div className="editor-grid" aria-live="polite">
        <section className="editor-window" aria-label="Harsh editor">
          <header><span className="avatar">H</span><strong>Harsh</strong><small>editing</small></header>
          <div className="editor-code">
            <p><span>1</span><code>const change = editor.capture();</code></p>
            <p className="active-line"><span>2</span><code>{extraLine}</code><i /></p>
            <p><span>3</span><code>presence.update(&quot;active&quot;);</code></p>
          </div>
        </section>
        <section className={synced ? "editor-window" : "editor-window is-receiving"} aria-label="Guest editor">
          <header><span className="avatar guest">G</span><strong>Guest</strong><small>{synced ? "up to date" : "receiving"}</small></header>
          <div className="editor-code">
            <p><span>1</span><code>const change = editor.capture();</code></p>
            <p className="active-line"><span>2</span><code>{synced ? extraLine : "receiving change..."}</code></p>
            <p><span>3</span><code>presence.update(&quot;active&quot;);</code></p>
          </div>
        </section>
      </div>
      <div className="sync-architecture" aria-label="WebSocket synchronization architecture">
        <span>Client</span><i />
        <span>Node.js</span><i />
        <span className="is-accent">Redis Pub/Sub</span><i />
        <span>Node.js</span><i />
        <span>Client</span>
        <b>PostgreSQL <small>durable history</small></b>
      </div>
    </div>
  );
}
