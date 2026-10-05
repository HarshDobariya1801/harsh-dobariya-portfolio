import type { ReactNode } from "react";
import type { DiagramKind } from "./portfolio-data";

const labels = {
  kv: "Architecture of a distributed key-value store. Client commands enter a TCP server, move through a request queue and bounded worker pool, then reach an in-memory engine with a hash map, TTL, LRU, and append-only persistence.",
  realtime: "Architecture of a collaborative workspace. Browser clients connect over WebSockets to Node.js instances, which exchange live events through Redis Pub/Sub and persist workspace state in PostgreSQL.",
} as const;

function Node({ title, detail, accent = false, children }: {
  title: string;
  detail?: string;
  accent?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`diagram-node${accent ? " is-accent" : ""}`}>
      <span className="node-light" />
      <strong>{title}</strong>
      {detail && <small>{detail}</small>}
      {children}
    </div>
  );
}

function Flow({ label }: { label: string }) {
  return <div className="diagram-flow"><span>{label}</span><i /></div>;
}

function KVArchitecture() {
  return (
    <div className="kv-map">
      <div className="client-stack">
        <span>GET</span><span>SET</span><span>DEL</span>
        <small>Clients</small>
      </div>
      <Flow label="TCP" />
      <Node title="TCP server" detail="connections" />
      <Flow label="enqueue" />
      <Node title="Request queue" detail="bounded work" />
      <Flow label="dispatch" />
      <Node title="Worker pool" detail="concurrent handlers" />
      <Flow label="execute" />
      <div className="engine-group">
        <Node title="KV engine" detail="in-memory core" accent />
        <div className="engine-policies">
          <span>Hash map</span><span>TTL</span><span>LRU</span><span>AOF</span>
        </div>
      </div>
    </div>
  );
}

function RealtimeArchitecture() {
  return (
    <div className="workspace-window">
      <div className="window-bar">
        <span /><span /><span /><small>workspace / live</small>
      </div>
      <div className="workspace-canvas">
        <div className="presence-strip">
          <span>A</span><span>B</span><span>C</span>
          <small>3 connected</small>
        </div>
        <div className="realtime-map">
          <Node title="Browser clients" detail="React + optimistic UI" />
          <Flow label="WebSocket" />
          <div className="instance-pair">
            <Node title="Node.js 01" detail="application instance" />
            <Node title="Node.js 02" detail="application instance" />
          </div>
          <Flow label="publish / subscribe" />
          <Node title="Redis Pub/Sub" detail="cross-instance events" accent />
          <Flow label="durable writes" />
          <Node title="PostgreSQL" detail="workspace + history">
            <span className="database-mark"><i /><i /><i /></span>
          </Node>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  return (
    <div className={`project-visual project-visual-${kind}`} role="img" aria-label={labels[kind]}>
      <div className="visual-meta" aria-hidden="true">
        <span>{kind === "kv" ? "Request to persistence" : "Client to durable state"}</span>
        <span>{kind === "kv" ? "SYS / 01" : "RT / 02"}</span>
      </div>
      <div aria-hidden="true">
        {kind === "kv" ? <KVArchitecture /> : <RealtimeArchitecture />}
      </div>
    </div>
  );
}
