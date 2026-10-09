export default function HeroSculptureVisual() {
  return (
    <div className="hero-sculpture">
      {/* The local Vinext image endpoint is passthrough-only, so an explicit
          srcset prevents the full-resolution hero from reaching small screens. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-system-diagram-refined.webp"
        srcSet="/hero-system-diagram-refined-768.webp 768w, /hero-system-diagram-refined-960.webp 960w, /hero-system-diagram-refined.webp 1194w"
        width="1194"
        height="1317"
        alt=""
        aria-hidden="true"
        sizes="(max-width: 640px) 23rem, (max-width: 900px) 29rem, 34rem"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        draggable="false"
      />
    </div>
  );
}
