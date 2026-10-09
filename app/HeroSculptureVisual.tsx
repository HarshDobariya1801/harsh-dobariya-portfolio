export default function HeroSculptureVisual() {
  return (
    <div className="hero-sculpture">
      {/* The local Vinext image endpoint is passthrough-only, so an explicit
          srcset prevents the full-resolution hero from reaching small screens. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-system-diagram.webp"
        srcSet="/hero-system-diagram-640.webp 640w, /hero-system-diagram.webp 852w"
        width="852"
        height="941"
        alt=""
        aria-hidden="true"
        sizes="(max-width: 900px) 82vw, 42vw"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        draggable="false"
      />
    </div>
  );
}
