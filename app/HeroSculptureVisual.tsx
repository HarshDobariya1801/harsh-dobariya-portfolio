import Image from "next/image";

export default function HeroSculptureVisual() {
  return (
    <div className="hero-sculpture">
      <Image
        src="/hero-sculpture-3d.png"
        width="1199"
        height="1312"
        alt="Abstract three-dimensional technology sculpture with precision rings and layered data surfaces"
        priority
        sizes="(max-width: 900px) 88vw, (max-width: 1200px) 42vw, 36rem"
        draggable="false"
      />
    </div>
  );
}
