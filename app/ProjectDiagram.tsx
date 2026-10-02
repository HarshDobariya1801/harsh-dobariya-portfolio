type DiagramKind = "kv" | "realtime";

const labels = {
  kv: "Distributed key-value store architecture from clients through the TCP server, thread pool, key-value engine, TTL and LRU policies, to append-only persistence.",
  realtime: "Collaborative workspace interface and architecture connecting clients through WebSockets and Node.js to Redis Pub/Sub and PostgreSQL.",
} as const;

function StoreArchitecture() {
  return (
    <>
      <div className="visual-caption"><span>Architecture / SYS.01</span><span>Request path</span></div>
      <div className="store-flow" aria-hidden="true">
        <div className="flow-node"><i />Clients</div>
        <span className="flow-link" />
        <div className="flow-node">TCP Server</div>
        <span className="flow-link" />
        <div className="flow-node">Thread Pool</div>
        <span className="flow-link" />
        <div className="flow-node flow-node-accent">Key-Value Engine</div>
        <span className="flow-link" />
        <div className="flow-branch">
          <div className="flow-node">TTL</div>
          <div className="flow-node">LRU</div>
        </div>
        <span className="flow-link" />
        <div className="flow-node">AOF Persistence</div>
        <span className="flow-event" />
      </div>
      <div className="visual-foot" aria-hidden="true">
        <span>Concurrent</span><span>Bounded memory</span><span>Recoverable</span>
      </div>
    </>
  );
}

function WorkspaceVisual() {
  return (
    <>
      <div className="visual-caption"><span>Workspace / RT.02</span><span>3 people online</span></div>
      <div className="workspace-ui" aria-hidden="true">
        <aside className="workspace-sidebar">
          <b>Project Atlas</b>
          <span className="sidebar-active">Overview</span>
          <span>Architecture</span>
          <span>Decisions</span>
          <div className="presence-stack"><i /><i /><i /><small>+3</small></div>
        </aside>
        <div className="workspace-document">
          <div className="workspace-toolbar"><span>System notes</span><span>Saved</span></div>
          <h4>Real-time collaboration</h4>
          <p className="mock-line line-long" />
          <p className="mock-line line-medium" />
          <div className="mock-callout"><i /> Redis keeps live events in sync across instances.</div>
          <p className="mock-line line-short" />
          <p className="mock-line line-medium" />
          <span className="mock-cursor cursor-one">H</span>
          <span className="mock-cursor cursor-two">A</span>
        </div>
      </div>
      <div className="realtime-path" aria-hidden="true">
        <div className="client-group"><span>A</span><span>B</span><span>C</span></div>
        <i />
        <span>WebSocket</span>
        <i />
        <span>Node.js</span>
        <i />
        <span>Redis</span>
        <i />
        <span>PostgreSQL</span>
        <b />
      </div>
    </>
  );
}

export default function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  return (
    <div className={`project-diagram ${kind}`} role="img" aria-label={labels[kind]}>
      {kind === "kv" ? <StoreArchitecture /> : <WorkspaceVisual />}
    </div>
  );
}
