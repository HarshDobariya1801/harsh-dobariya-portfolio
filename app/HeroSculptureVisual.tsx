export default function HeroSculptureVisual() {
  return (
    <div className="hero-sculpture">
      {/* The local Vinext image endpoint is passthrough-only, so an explicit
          srcset prevents the full-resolution hero from reaching small screens. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-workstation-960.webp"
        srcSet="/hero-workstation-640.webp 640w, /hero-workstation-960.webp 960w, /hero-workstation.webp 1254w"
        width="1254"
        height="1254"
        alt="Layered modular compute unit under smoked glass"
        sizes="(max-width: 900px) 88vw, (max-width: 1200px) 42vw, 36rem"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        draggable="false"
      />
    </div>
  );
}
