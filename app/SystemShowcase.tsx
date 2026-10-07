"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const tabs = [
  { id: "agenttime", label: "AgentTime" },
  { id: "kv", label: "Distributed KV" },
  { id: "collab", label: "Collaborative workspace" },
  { id: "resume", label: "Resume analyzer" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const events = [
  {
    time: "10:42",
    title: "Snapshot created",
    detail: "Files captured",
    file: "SnapshotRepository.swift",
    before: "return snapshots.last",
    after: "return snapshots.last(where: { $0.isComplete })",
  },
  {
    time: "10:38",
    title: "Modified",
    detail: "src/database/SnapshotRepository.swift",
    file: "SnapshotRepository.swift",
    before: "try database.write(snapshot)",
    after: "try await database.transaction { write(snapshot) }",
  },
  {
    time: "10:31",
    title: "Codex session started",
    detail: "portfolio-site / main",
    file: "Session.swift",
    before: "state = .idle",
    after: "state = .recording(startedAt: .now)",
  },
] as const;

function AgentTimePanel() {
  const [selected, setSelected] = useState(0);
  const event = events[selected];

  return (
    <div className="agenttime-app">
      <aside className="agenttime-sidebar" aria-label="AgentTime projects">
        <p className="demo-label">Projects</p>
        <button className="project-choice is-active" type="button">
          <span className="project-icon">P</span>
          <span><strong>portfolio-site</strong><small>Recent activity</small></span>
        </button>
        <button className="project-choice" type="button">
          <span className="project-icon">S</span>
          <span><strong>sync-engine</strong><small>Session history</small></span>
        </button>
        <button className="project-choice" type="button">
          <span className="project-icon">B</span>
          <span><strong>billing-api</strong><small>Archived session</small></span>
        </button>
      </aside>

      <section className="timeline-panel" aria-labelledby="timeline-title">
        <div className="panel-heading">
          <div><p className="demo-label">Session timeline</p><h3 id="timeline-title">Today, 10:31</h3></div>
          <span className="recording-status"><i />Recording</span>
        </div>
        <div className="timeline-events">
          {events.map((item, index) => (
            <button
              className={selected === index ? "timeline-event is-selected" : "timeline-event"}
              type="button"
              key={`${item.time}-${item.title}`}
              onClick={() => setSelected(index)}
              aria-pressed={selected === index}
            >
              <time>{item.time}</time>
              <span><strong>{item.title}</strong><small>{item.detail}</small></span>
            </button>
          ))}
        </div>
      </section>

      <section className="diff-panel" aria-labelledby="diff-title" aria-live="polite">
        <div className="panel-heading">
          <div><p className="demo-label">Diff</p><h3 id="diff-title">{event.file}</h3></div>
          <span className="change-count">1 change</span>
        </div>
        <div className="code-diff" aria-label={`Code change for ${event.file}`}>
          <p className="line-context"><span>18</span><code>func latestSnapshot() &#123;</code></p>
          <p className="line-removed"><span>19</span><code>- {event.before}</code></p>
          <p className="line-added"><span>19</span><code>+ {event.after}</code></p>
          <p className="line-context"><span>20</span><code>&#125;</code></p>
        </div>
        <p className="diff-note">Select a timeline event to inspect the recorded change.</p>
      </section>
    </div>
  );
}

function KVPreview() {
  return (
    <div className="showcase-preview kv-preview">
      <div className="preview-request"><span>PUT</span><code>user:104</code><small>&quot;Harsh&quot;</small></div>
      <div className="hash-step">hash(key)<i /></div>
      <div className="preview-nodes" aria-label="Five storage nodes">
        {[1, 2, 3, 4, 5].map((node) => <span className={node === 3 ? "is-active" : ""} key={node}>Node {node}</span>)}
      </div>
      <p>Requests move from a TCP connection to the node responsible for the key.</p>
    </div>
  );
}

function CollaborativePreview() {
  return (
    <div className="showcase-preview collab-preview">
      <div className="mini-editor"><span>Harsh <i>typing</i></span><code>const workspace = await connect();</code><b className="remote-caret" /></div>
      <div className="sync-line"><i />WebSocket<i />Redis Pub/Sub<i /></div>
      <div className="mini-editor"><span>Guest <i>synced</i></span><code>const workspace = await connect();</code></div>
    </div>
  );
}

function ResumePreview() {
  return (
    <div className="showcase-preview resume-preview">
      <div className="resume-document"><span>PDF</span><strong>Harsh_Resume.pdf</strong><small>1 page · ready to analyze</small></div>
      <ol className="analysis-flow" aria-label="Resume analysis stages">
        <li><span>01</span><strong>Extract structure</strong></li>
        <li><span>02</span><strong>Identify role signals</strong></li>
        <li><span>03</span><strong>Review alignment</strong></li>
      </ol>
    </div>
  );
}

export default function SystemShowcase() {
  const [active, setActive] = useState<TabId>("agenttime");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleTabKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + offset + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="showcase section-shell" id="work" data-nav-section aria-labelledby="showcase-title">
      <div className="showcase-heading" data-reveal>
        <p className="eyebrow">Selected systems</p>
        <h2 id="showcase-title">The engineering is the interface.</h2>
        <p>Explore compact, working models of the systems and product ideas behind my work.</p>
      </div>

      <div className="product-window" data-reveal>
        <div className="product-tabs" role="tablist" aria-label="Project demonstrations">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              aria-selected={active === tab.id}
              tabIndex={active === tab.id ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(event) => handleTabKeys(event, index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="product-toolbar" aria-hidden="true">
          <span><i /><i /><i /></span>
          <p>{tabs.find((tab) => tab.id === active)?.label}</p>
          <small>Interactive model</small>
        </div>
        <div className="product-panel" role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
          {active === "agenttime" && <AgentTimePanel />}
          {active === "kv" && <KVPreview />}
          {active === "collab" && <CollaborativePreview />}
          {active === "resume" && <ResumePreview />}
        </div>
      </div>
      <div className="showcase-caption" data-reveal>
        <div><span>01</span><p><strong>AgentTime</strong> is a macOS app for inspecting the history of AI coding sessions through snapshots, files, and diffs.</p></div>
        <p>Choose a project tab, then interact with the interface.</p>
      </div>
    </section>
  );
}
