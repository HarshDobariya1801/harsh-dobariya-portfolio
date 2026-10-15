"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode, UIEvent } from "react";

type EditorId = "harsh" | "guest";
type MobileView = "editor" | "architecture";
type SyncPhase = "idle" | "server-a" | "redis" | "server-b" | "persist" | "synced";

const editorHints = ["Try editing this code...", "Your changes sync live!"];

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
  hint?: string;
  showHint?: boolean;
  onChange: (editor: EditorId, value: string) => void;
  onFocus: (editor: EditorId) => void;
  onBlur: (editor: EditorId) => void;
  onInteraction: () => void;
};

function CodeEditor({ id, name, avatar, value, status, isReceiving, hint, showHint = false, onChange, onFocus, onBlur, onInteraction }: CodeEditorProps) {
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
    onInteraction();
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
          {showHint ? (
            <span className="editor-typing-hint" data-editor-hint aria-hidden="true">
              <span>{hint}</span><i />
            </span>
          ) : null}
          <textarea
            value={value}
            aria-label={`${name} code editor`}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            wrap="off"
            onBlur={() => onBlur(id)}
            onChange={(event) => {
              onInteraction();
              onChange(id, event.target.value);
            }}
            onFocus={() => {
              onInteraction();
              onFocus(id);
            }}
            onKeyDown={handleKeyDown}
            onPaste={onInteraction}
            onPointerDown={onInteraction}
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
  const [hintText, setHintText] = useState("");
  const [hintDismissed, setHintDismissed] = useState(false);
  const [hintInView, setHintInView] = useState(false);
  const [hintCycle, setHintCycle] = useState(0);
  const demoRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const tabRefs = useRef<Record<MobileView, HTMLButtonElement | null>>({
    editor: null,
    architecture: null,
  });

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    const demo = demoRef.current;
    if (!demo) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHintInView(entry.isIntersecting),
      { rootMargin: "0px 0px -10%", threshold: 0.2 },
    );

    observer.observe(demo);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hintInView || hintDismissed) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer = 0;

    const step = () => {
      const phrase = editorHints[phraseIndex];

      if (deleting) {
        characterIndex -= 1;
        setHintText(phrase.slice(0, characterIndex));

        if (characterIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % editorHints.length;
          timer = window.setTimeout(step, 360);
        } else {
          timer = window.setTimeout(step, 48);
        }
        return;
      }

      characterIndex += 1;
      setHintText(phrase.slice(0, characterIndex));

      if (characterIndex === phrase.length) {
        deleting = true;
        timer = window.setTimeout(step, 1150);
      } else {
        timer = window.setTimeout(step, 86);
      }
    };

    timer = window.setTimeout(() => {
      setHintText(reducedMotion ? editorHints[0] : "");
      if (!reducedMotion) step();
    }, reducedMotion ? 0 : 240);

    return () => window.clearTimeout(timer);
  }, [hintCycle, hintDismissed, hintInView]);

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
    setHintDismissed(false);
    setHintCycle((value) => value + 1);
  };

  const selectMobileView = (nextView: MobileView) => {
    setView(nextView);
    tabRefs.current[nextView]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentView: MobileView) => {
    let nextView: MobileView | undefined;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      nextView = currentView === "editor" ? "architecture" : "editor";
    } else if (event.key === "Home") {
      nextView = "editor";
    } else if (event.key === "End") {
      nextView = "architecture";
    }

    if (!nextView) return;
    event.preventDefault();
    selectMobileView(nextView);
  };

  const syncing = phase !== "idle" && phase !== "synced";
  const editorStatus = (editor: EditorId) => {
    if (activeEditor === editor || (syncing && source === editor)) return "editing";
    if (syncing) return "syncing";
    return "synced";
  };

  return (
    <div
      ref={demoRef}
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

      <div className="mobile-demo-tabs" role="tablist" aria-label="Collaborative demo views" aria-orientation="horizontal">
        <button
          ref={(node) => { tabRefs.current.editor = node; }}
          type="button"
          role="tab"
          id="editor-tab"
          aria-controls="editor-panel"
          aria-selected={view === "editor"}
          tabIndex={view === "editor" ? 0 : -1}
          onClick={() => setView("editor")}
          onKeyDown={(event) => handleTabKeyDown(event, "editor")}
        >
          Editor
        </button>
        <button
          ref={(node) => { tabRefs.current.architecture = node; }}
          type="button"
          role="tab"
          id="architecture-tab"
          aria-controls="architecture-panel"
          aria-selected={view === "architecture"}
          tabIndex={view === "architecture" ? 0 : -1}
          onClick={() => setView("architecture")}
          onKeyDown={(event) => handleTabKeyDown(event, "architecture")}
        >
          Architecture
        </button>
      </div>

      <div className="collab-editors collab-pane" id="editor-panel" role="tabpanel" aria-labelledby="editor-tab">
        <CodeEditor
          id="harsh"
          name="Harsh"
          avatar="H"
          value={code}
          status={editorStatus("harsh")}
          isReceiving={syncing && source === "guest"}
          hint={hintText}
          showHint={hintInView && !hintDismissed}
          onChange={handleChange}
          onFocus={setActiveEditor}
          onBlur={(editor) => setActiveEditor((current) => current === editor ? null : current)}
          onInteraction={() => setHintDismissed(true)}
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
          onInteraction={() => setHintDismissed(true)}
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
