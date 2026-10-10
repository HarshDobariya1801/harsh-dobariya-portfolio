type IconProps = {
  className?: string;
};

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h9M8.75 4.25 12.5 8l-3.75 3.75" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 4.5h6.5V11M11.25 4.75l-7 7" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5.25" y="5.25" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.25 5.25V4.4A1.65 1.65 0 0 0 8.6 2.75H4.4A1.65 1.65 0 0 0 2.75 4.4v4.2a1.65 1.65 0 0 0 1.65 1.65h.85" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8.25 2.75 2.75 6.25-6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
