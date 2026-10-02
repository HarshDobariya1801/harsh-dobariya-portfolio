type DiagramKind = "kv" | "realtime";

const labels = {
  kv: "Distributed key-value store architecture from clients through TCP, a thread pool, the storage engine, lifecycle policies, and append-only persistence.",
  realtime: "Real-time workspace architecture connecting clients through WebSockets and Node.js to Redis Pub/Sub and PostgreSQL.",
} as const;

function Node({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return <span className={`architecture-node${accent ? " is-accent" : ""}`}>{children}</span>;
}

function StoreArchitecture() {
  return (
    <div className="architecture architecture-kv" aria-hidden="true">
      <div className="architecture-track">
        <Node>Clients</Node><i />
        <Node>TCP Server</Node><i />
        <Node>Thread Pool</Node><i />
        <Node accent>KV Engine</Node><i />
        <span className="architecture-branch"><Node>TTL</Node><Node>LRU</Node></span><i />
        <Node>AOF</Node>
      </div>
      <span className="architecture-packet" />
    </div>
  );
}

function WorkspaceArchitecture() {
  return (
    <div className="workspace-visual" aria-hidden="true">
      <div className="screenshot-placeholder">
        <span>Product visual</span>
        <strong>Screenshot needed</strong>
        <small>Recommended: 1600 × 1000</small>
      </div>
      <div className="architecture architecture-realtime">
        <span className="client-nodes"><b>A</b><b>B</b><b>C</b></span><i />
        <Node>WebSocket</Node><i />
        <Node>Node.js</Node><i />
        <Node accent>Redis Pub/Sub</Node><i />
        <Node>PostgreSQL</Node>
        <span className="architecture-event" />
      </div>
    </div>
  );
}

export default function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  return (
    <div className={`project-visual project-visual-${kind}`} role="img" aria-label={labels[kind]}>
      <div className="visual-header" aria-hidden="true">
        <span>{kind === "kv" ? "System architecture" : "Product + event path"}</span>
        <span>{kind === "kv" ? "SYS / 01" : "RT / 02"}</span>
      </div>
      {kind === "kv" ? <StoreArchitecture /> : <WorkspaceArchitecture />}
      <div className="visual-footer" aria-hidden="true">
        <span>Interface</span><i /><span>System</span><i /><span>Data</span>
      </div>
    </div>
  );
}
