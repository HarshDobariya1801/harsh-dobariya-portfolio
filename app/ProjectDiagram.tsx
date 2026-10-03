import type { ReactNode } from "react";

type DiagramKind = "kv" | "realtime";

const labels = {
  kv: "Distributed key-value store architecture showing client commands moving through a TCP gateway and bounded worker pool into an in-memory engine with TTL, LRU, and append-only persistence.",
  realtime: "Real-time collaborative workspace architecture showing client sessions flowing through a WebSocket gateway and Node.js instances to Redis Pub/Sub and PostgreSQL.",
} as const;

function DiagramNode({
  title,
  detail,
  accent = false,
  children,
}: {
  title: string;
  detail: string;
  accent?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`diagram-node${accent ? " is-accent" : ""}`}>
      <span className="diagram-node-status" />
      <strong>{title}</strong>
      <small>{detail}</small>
      {children}
    </div>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className="diagram-connector">
      <span>{label}</span>
      <i><b /></i>
    </div>
  );
}

function ClientNode({ children }: { children: ReactNode }) {
  return <span className="diagram-client">{children}</span>;
}

function StoreArchitecture() {
  return (
    <div className="architecture-map architecture-map-kv" aria-hidden="true">
      <div className="diagram-stage diagram-client-stage">
        <span className="diagram-stage-label">Client commands</span>
        <div className="diagram-client-list">
          <ClientNode>GET</ClientNode>
          <ClientNode>SET</ClientNode>
          <ClientNode>DEL</ClientNode>
        </div>
      </div>
      <Connector label="TCP" />
      <DiagramNode title="Request Gateway" detail="socket listener" />
      <Connector label="dispatch" />
      <DiagramNode title="Worker Pool" detail="bounded concurrency" />
      <Connector label="read / write" />
      <DiagramNode title="KV Engine" detail="in-memory map" accent />
      <Connector label="policies" />
      <div className="diagram-service-stack">
        <DiagramNode title="TTL Expiry" detail="lifecycle" />
        <DiagramNode title="LRU Eviction" detail="memory bound" />
        <DiagramNode title="AOF Log" detail="persistence" />
      </div>
    </div>
  );
}

function WorkspaceArchitecture() {
  return (
    <div className="architecture-map architecture-map-realtime" aria-hidden="true">
      <div className="diagram-stage diagram-client-stage">
        <span className="diagram-stage-label">Live sessions</span>
        <div className="diagram-client-list is-round">
          <ClientNode>A</ClientNode>
          <ClientNode>B</ClientNode>
          <ClientNode>C</ClientNode>
        </div>
      </div>
      <Connector label="events" />
      <DiagramNode title="WebSocket Gateway" detail="bidirectional updates" />
      <Connector label="route" />
      <div className="diagram-service-stack is-paired">
        <DiagramNode title="Node.js 01" detail="application instance" />
        <DiagramNode title="Node.js 02" detail="application instance" />
      </div>
      <Connector label="fan-out" />
      <DiagramNode title="Redis Pub/Sub" detail="cross-instance events" accent />
      <Connector label="persist" />
      <DiagramNode title="PostgreSQL" detail="durable workspace state">
        <span className="database-glyph"><i /><i /><i /></span>
      </DiagramNode>
    </div>
  );
}

export default function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  return (
    <div className={`project-visual project-visual-${kind}`} role="img" aria-label={labels[kind]}>
      <div className="visual-header" aria-hidden="true">
        <span>{kind === "kv" ? "Request and storage path" : "Realtime event path"}</span>
        <span>{kind === "kv" ? "SYS / 01" : "RT / 02"}</span>
      </div>
      {kind === "kv" ? <StoreArchitecture /> : <WorkspaceArchitecture />}
      <div className="visual-footer" aria-hidden="true">
        <span>Client</span><i /><span>Network</span><i /><span>Compute</span><i /><span>State</span>
      </div>
    </div>
  );
}
