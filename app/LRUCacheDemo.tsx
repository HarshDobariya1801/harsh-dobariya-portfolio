"use client";

import { useEffect, useRef, useState } from "react";

const INITIAL_KEYS = ["A", "B", "C"];
const INITIAL_EVENT = "Cache ready. A is least recently used.";

function keyFromIndex(index: number) {
  let value = index + 1;
  let label = "";

  while (value > 0) {
    value -= 1;
    label = String.fromCharCode(65 + (value % 26)) + label;
    value = Math.floor(value / 26);
  }

  return label;
}

export default function LRUCacheDemo() {
  const [keys, setKeys] = useState<string[]>(INITIAL_KEYS);
  const [nextKeyIndex, setNextKeyIndex] = useState(3);
  const [events, setEvents] = useState<string[]>([INITIAL_EVENT]);
  const [latestResult, setLatestResult] = useState(INITIAL_EVENT);
  const [evictedKey, setEvictedKey] = useState<string | null>(null);
  const evictionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (evictionTimer.current) clearTimeout(evictionTimer.current);
  }, []);

  function record(message: string) {
    setLatestResult(message);
    setEvents((current) => [message, ...current].slice(0, 4));
  }

  function flashEviction(key: string) {
    if (evictionTimer.current) clearTimeout(evictionTimer.current);
    setEvictedKey(key);
    evictionTimer.current = setTimeout(() => setEvictedKey(null), 900);
  }

  function touchB() {
    const position = keys.indexOf("B");

    if (position === -1) {
      record("B is no longer in the cache.");
      return;
    }

    const nextKeys = [...keys.slice(0, position), ...keys.slice(position + 1), "B"];
    setKeys(nextKeys);
    record(position === keys.length - 1
      ? "Touched B. It was already the most recently used entry."
      : "Touched B. It is now the most recently used entry.");
  }

  function addKey() {
    const nextKey = keyFromIndex(nextKeyIndex);
    const evicted = keys[0];
    setKeys([...keys.slice(1), nextKey]);
    setNextKeyIndex((current) => current + 1);
    flashEviction(evicted);
    record(`Added ${nextKey}. Evicted ${evicted} because it was used least recently.`);
  }

  function reset() {
    const message = "Reset cache to A, B, and C. A is least recently used.";
    if (evictionTimer.current) clearTimeout(evictionTimer.current);
    setKeys(INITIAL_KEYS);
    setNextKeyIndex(3);
    setEvictedKey(null);
    setEvents([message]);
    setLatestResult(message);
  }

  return (
    <aside className="cache-workbench" aria-labelledby="cache-workbench-title" data-reveal>
      <div className="cache-workbench-heading">
        <div>
          <p>Browser simulation / Capacity 3</p>
          <h2 id="cache-workbench-title">Try my cache.</h2>
        </div>
        <span aria-hidden="true">LRU</span>
      </div>

      <p className="cache-explainer">
        The oldest untouched entry leaves when a new key arrives.
      </p>

      <div className="cache-track" data-cache-order={keys.join(",")}>
        {evictedKey ? <span className="cache-eviction" aria-hidden="true">Evicted {evictedKey}</span> : null}
        <ol aria-label={`Cache order from least to most recently used: ${keys.join(", ")}`}>
          {keys.map((key, index) => (
            <li data-cache-key={key} key={key}>
              <span>{key}</span>
              <small>{index === 0 ? "Least recent" : index === keys.length - 1 ? "Most recent" : "Cached"}</small>
            </li>
          ))}
        </ol>
        <div className="cache-axis" aria-hidden="true"><span>LRU</span><i /><span>MRU</span></div>
      </div>

      <div className="cache-controls" aria-label="LRU cache controls">
        <button type="button" onClick={touchB}>Touch B</button>
        <button type="button" onClick={addKey}>Add a key</button>
        <button type="button" onClick={reset}>Reset</button>
      </div>

      <div className="cache-readout">
        <p aria-live="polite" aria-atomic="true">{latestResult}</p>
        <ol aria-label="Cache event log">
          {events.map((event, index) => <li key={`${event}-${index}`}>{event}</li>)}
        </ol>
      </div>

      <a className="cache-project-link" href="#distributed-key-value-store">
        Simulation only <span aria-hidden="true">/</span> See the C++ key-value store <span aria-hidden="true">↓</span>
      </a>
    </aside>
  );
}
