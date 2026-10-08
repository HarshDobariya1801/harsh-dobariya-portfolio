"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode, UIEvent } from "react";

type EditorId = "harsh" | "guest";
type MobileView = "editor" | "architecture";
type SyncPhase = "idle" | "server-a" | "redis" | "server-b" | "persist" | "synced";

const initialCode = `const workspace = {
  status: "connected",
  collaborators: 2,
};

function applyChange(change) {
  return { ...workspace, ...change };
}`;

const tokenPattern = /(\/\/.*?$|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:const|let|var|function|return|if|else|async|await|true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b)/gm;

function highlightCode(code: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of code.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    const token = match[0];
    if (index > cursor) nodes.push(code.slice(cursor, index));

    const tokenClass = token.startsWith("//") || token.startsWith("/*")
      ? "token-comment"
      : /^["'`]/.test(token)
        ? "token-string"
        : /^\d/.test(token)
          ? "token-number"
          : "token-keyword";

    nodes.push(<span className={tokenClass} key={`${index}-${token}`}>{token}</span>);
    cursor = index + token.length;
  }

  if (cursor < code.length) nodes.push(code.slice(cursor));
  return nodes;
}

type CodeEditorProps = {
  id: EditorId;
  name: string;
  avatar: string;
  value: string;
  status: string;
  isReceiving: boolean;
  onChange: (editor: EditorId, value: string) => void;
  onFocus: (editor: EditorId) => void;
  onBlur: (editor: EditorId) => void;
};

function CodeEditor({ id, name, avatar, value, status, isReceiving, onChange, onFocus, onBlur }: CodeEditorProps) {
  const highlightRef = useRef<HTMLPreElement>(null);
  const numbersRef = useRef<HTMLPreElement>(null);
  const lineCount = Math.max(1, value.split("\n").length);

  const syncScroll = (event: UIEvent<HTMLTextAreaElement>) => {
    const editor = event.currentTarget;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = editor.scrollTop;
      highlightRef.current.scrollLeft = editor.scrollLeft;
    }
    if (numbersRef.current) numbersRef.current.scrollTop = editor.scrollTop;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const editor = event.currentTarget;
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const nextValue = `${value.slice(0, start)}  ${value.slice(end)}`;
    onChange(id, nextValue);
    window.requestAnimationFrame(() => editor.setSelectionRange(start + 2, start + 2));
  };

  return (
    <section className={`editor-window${isReceiving ? " is-receiving" : ""}`} aria-label={`${name} editor`}>
      <header>
        <span className={`avatar${id === "guest" ? " guest" : ""}`}>{avatar}</span>
        <strong>{name}</strong>
        <small aria-live="polite">{status}</small>
      </header>
      <div className="code-editor-frame">
        <pre className="editor-line-numbers" ref={numbersRef} aria-hidden="true">
          {Array.from({ length: lineCount }, (_, index) => String(index + 1).padStart(2, "0")).join("\n")}
        </pre>
        <div className="code-editor-viewport">
          <pre className="editor-highlight" ref={highlightRef} aria-hidden="true"><code>{highlightCode(value)}{"\n"}</code></pre>
          <textarea
            value={value}
            aria-label={`${name} code editor`}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            wrap="off"
            onBlur={() => onBlur(id)}
            onChange={(event) => onChange(id, event.target.value)}
            onFocus={() => onFocus(id)}
            onKeyDown={handleKeyDown}
            onScroll={syncScroll}
          />
        </div>
      </div>
    </section>
  );
}

function ArchitectureNode({ className, title, detail }: { className: string; title: string; detail: string }) {
  return (
    <span className={`sync-node ${className}`}>
      <strong>{title}</strong>
      <small>{detail}</small>
    </span>
  );
}

function SyncLink({ className }: { className: string }) {
  return <span className={`sync-link ${className}`} aria-hidden="true"><i /></span>;
}

export default function CollaborativeDemo() {
  const [code, setCode] = useState(initialCode);
  const [phase, setPhase] = useState<SyncPhase>("idle");
  const [source, setSource] = useState<EditorId | null>(null);
  const [activeEditor, setActiveEditor] = useState<EditorId | null>(null);
  const [routeVersion, setRouteVersion] = useState(0);
  const [view, setView] = useState<MobileView>("editor");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const runSync = (editor: EditorId) => {
    clearTimers();
    setSource(editor);
    setRouteVersion((value) => value + 1);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPhase("synced");
      return;
    }

    const route: SyncPhase[] = editor === "harsh"
      ? ["server-a", "redis", "server-b", "persist", "synced"]
      : ["server-b", "redis", "server-a", "persist", "synced"];

    setPhase(route[0]);
    route.slice(1).forEach((nextPhase, index) => {
      timers.current.push(window.setTimeout(() => setPhase(nextPhase), (index + 1) * 170));
    });
  };

  const handleChange = (editor: EditorId, value: string) => {
    setCode(value);
    runSync(editor);
  };

  const resetDemo = () => {
    clearTimers();
    setCode(initialCode);
    setPhase("idle");
    setSource(null);
    setActiveEditor(null);
    setRouteVersion((value) => value + 1);
  };

  const syncing = phase !== "idle" && phase !== "synced";
  const editorStatus = (editor: EditorId) => {
    if (activeEditor === editor || (syncing && source === editor)) return "editing";
    if (syncing) return "syncing";
    return "synced";
  };

  return (
    <div
      className="collaborative-demo"
      data-phase={phase}
      data-source={source ?? "none"}
      data-view={view}
    >
      <div className="demo-toolbar collab-toolbar">
        <div className="presence-status">
          <span><i />Connected</span><span>2 collaborators</span><span aria-live="polite">{syncing ? "Syncing" : "Synced"}</span>
        </div>
        <button type="button" onClick={resetDemo}>Reset demo</button>
      </div>

      <div className="collab-instruction">
        <strong>Interactive synchronization simulation</strong>
        <span>Edit either window and watch the change sync live.</span>
      </div>

      <div className="mobile-demo-tabs" role="tablist" aria-label="Collaborative demo views">
        <button type="button" role="tab" id="editor-tab" aria-controls="editor-panel" aria-selected={view === "editor"} onClick={() => setView("editor")}>Editor</button>
        <button type="button" role="tab" id="architecture-tab" aria-controls="architecture-panel" aria-selected={view === "architecture"} onClick={() => setView("architecture")}>Architecture</button>
      </div>

      <div className="collab-editors collab-pane" id="editor-panel" role="tabpanel" aria-labelledby="editor-tab">
        <CodeEditor
          id="harsh"
          name="Harsh"
          avatar="H"
          value={code}
          status={editorStatus("harsh")}
          isReceiving={syncing && source === "guest"}
          onChange={handleChange}
          onFocus={setActiveEditor}
          onBlur={(editor) => setActiveEditor((current) => current === editor ? null : current)}
        />
        <CodeEditor
          id="guest"
          name="Guest"
          avatar="G"
          value={code}
          status={editorStatus("guest")}
          isReceiving={syncing && source === "harsh"}
          onChange={handleChange}
          onFocus={setActiveEditor}
          onBlur={(editor) => setActiveEditor((current) => current === editor ? null : current)}
        />
      </div>

      <div className="collab-architecture collab-pane" id="architecture-panel" role="tabpanel" aria-labelledby="architecture-tab">
        <div className="architecture-heading">
          <strong>Live synchronization path</strong>
          <span>Bidirectional events with separate durable persistence</span>
        </div>
        <div
          className="sync-diagram"
          role="img"
          aria-label="Client A connects bidirectionally to Node Server A, Redis Pub/Sub, Node Server B, and Client B. Both Node servers write durable state to PostgreSQL."
          key={routeVersion}
        >
          <div className="sync-flow">
            <ArchitectureNode className="client-a" title="Client A" detail="Harsh editor" />
            <SyncLink className="link-client-a" />
            <ArchitectureNode className="server-a" title="Node Server A" detail="WebSocket" />
            <SyncLink className="link-server-a" />
            <ArchitectureNode className="redis" title="Redis Pub/Sub" detail="event channel" />
            <SyncLink className="link-server-b" />
            <ArchitectureNode className="server-b" title="Node Server B" detail="WebSocket" />
            <SyncLink className="link-client-b" />
            <ArchitectureNode className="client-b" title="Client B" detail="Guest editor" />
          </div>

          <div className="persistence-tier">
            <span className="persistence-label">Persistence layer</span>
            <div className="persistence-sources" aria-hidden="true"><span>Node Server A</span><span>Node Server B</span></div>
            <div className="persistence-lines" aria-hidden="true">
              <span className="persist-from-a"><i /></span>
              <span className="persist-from-b"><i /></span>
            </div>
            <ArchitectureNode className="postgres" title="PostgreSQL" detail="durable state" />
          </div>
        </div>
      </div>
    </div>
  );
}
