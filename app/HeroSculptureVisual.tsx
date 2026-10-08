import Image from "next/image";

export default function HeroSculptureVisual() {
  return (
    <div className="hero-sculpture">
      <Image
        src="/hero-retro-workstation.png"
        width="1254"
        height="1254"
        alt="Original retro-futurist computing workstation with an amber abstract display"
        priority
        sizes="(max-width: 900px) 88vw, (max-width: 1200px) 42vw, 36rem"
        draggable="false"
      />
    </div>
  );
}
