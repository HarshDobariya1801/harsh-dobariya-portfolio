"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./ui/Icons";

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 1500);
  };

  const label = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy email";

  return (
    <button className="copy-email" type="button" onClick={copy} aria-label={`${label}: ${email}`} data-state={state}>
      <span className="copy-email-icon" aria-hidden="true">
        {state === "copied" ? <CheckIcon /> : <CopyIcon />}
      </span>
      <span aria-live="polite">{label}</span>
    </button>
  );
}
