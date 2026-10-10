"use client";

import { useEffect, useRef, useState } from "react";

type Operation = "SET" | "GET" | "DEL";

const commands: Record<Operation, string> = {
  SET: 'SET user:104 "Harsh"',
  GET: "GET user:104",
  DEL: "DEL user:104",
};

const stages = ["Client", "TCP listener", "Worker pool", "KV engine", "Memory"] as const;

export default function KVStoreDemo() {
  const [operation, setOperation] = useState<Operation>("SET");
  const [phase, setPhase] = useState(-1);
  const [hasValue, setHasValue] = useState(false);
  const [result, setResult] = useState("Choose a command to trace its path");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const complete = (next: Operation) => {
    if (next === "SET") {
      setHasValue(true);
      setResult("OK, value stored");
    } else if (next === "GET") {
      setResult(hasValue ? '"Harsh"' : "(nil), key not found");
    } else {
      setResult(hasValue ? "1 key removed" : "0 keys removed");
      setHasValue(false);
    }
  };

  const run = (next: Operation) => {
    clearTimers();
    setOperation(next);
    setResult(`Routing ${next} command`);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase(4);
      complete(next);
      return;
    }

    setPhase(0);
    [1, 2, 3, 4].forEach((stage, index) => {
      timers.current.push(window.setTimeout(() => {
        setPhase(stage);
        if (stage === 4) complete(next);
      }, (index + 1) * 240));
    });
  };

  return (
    <div className="kv-demo" data-phase={phase}>
      <div className="demo-toolbar">
        <div className="command-controls" role="group" aria-label="Key-value commands">
          {(["SET", "GET", "DEL"] as const).map((command) => (
            <button
              type="button"
              key={command}
              onClick={() => run(command)}
              aria-pressed={operation === command}
            >
              {command}
            </button>
          ))}
        </div>
        <div className="demo-status"><i /><span>Ready for commands</span></div>
      </div>

      <div className="kv-command-readout">
        <span>client</span>
        <code>{commands[operation]}</code>
        <strong aria-live="polite">{result}</strong>
      </div>

      <div className="kv-architecture" role="img" aria-label="Command flow through the distributed key-value store">
        <div className="layer-labels" aria-hidden="true"><span>Network</span><span>Compute</span><span>State</span></div>
        <div className="kv-flow" aria-hidden="true">
          {stages.map((stage, index) => (
            <div className={phase === index ? "flow-stage is-active" : phase > index ? "flow-stage is-done" : "flow-stage"} key={stage}>
              <span><i />{stage}</span>
              <small>{index === 0 ? operation : index === 1 ? "TCP" : index === 2 ? "bounded" : index === 3 ? "execute" : hasValue ? "user:104" : "empty"}</small>
              {index < stages.length - 1 && <b />}
            </div>
          ))}
        </div>
        <div className="kv-policies" aria-hidden="true">
          <span><small>Expiry</small><strong>TTL</strong></span>
          <span><small>Eviction</small><strong>LRU</strong></span>
          <span><small>Persistence</small><strong>AOF</strong></span>
        </div>
      </div>
    </div>
  );
}
