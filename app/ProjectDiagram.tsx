type DiagramKind = "kv" | "realtime";

const diagramCopy = {
  kv: {
    label: "Key-value store architecture: clients connect through a TCP server and thread pool to the key-value engine, TTL and LRU policies, and append-only persistence.",
    nodes: ["Clients", "TCP server", "Thread pool", "KV engine", "TTL", "LRU", "AOF persistence"],
  },
  realtime: {
    label: "Collaborative workspace architecture: clients connect through WebSockets to Node.js instances, Redis Pub/Sub, and PostgreSQL.",
    nodes: ["Client A", "Client B", "Client C", "WebSocket layer", "Node instances", "Redis Pub/Sub", "PostgreSQL"],
  },
} as const;

export default function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  const copy = diagramCopy[kind];

  return (
    <div className={`project-diagram ${kind}`} role="img" aria-label={copy.label}>
      <div className="diagram-coordinate" aria-hidden="true">
        PATH / {kind === "kv" ? "SYS.01" : "RT.02"}
      </div>
      <div className="diagram-grid" aria-hidden="true">
        {copy.nodes.map((node, index) => (
          <span className={`diagram-node node-${index + 1}`} key={node}>
            <i />
            {node}
          </span>
        ))}
        <span className="diagram-flow" />
      </div>
      <div className="diagram-status" aria-hidden="true">
        <span>Interface</span><i /><span>API</span><i /><span>System</span><i /><span>Data</span>
      </div>
    </div>
  );
}
