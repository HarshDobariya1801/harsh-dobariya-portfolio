"use client";

import { useEffect, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button className="copy-email" type="button" onClick={copy} aria-label={`Copy ${email}`}>
      <span>{copied ? "Copied" : "Copy email"}</span>
      <i aria-hidden="true">{copied ? "✓" : "⧉"}</i>
    </button>
  );
}
