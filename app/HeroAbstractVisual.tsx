export default function HeroAbstractVisual() {
  return (
    <div
      className="hero-abstract"
      role="img"
      aria-label="Abstract composition of layered paper forms and flowing contour lines"
    >
      <div className="abstract-surface" aria-hidden="true">
        <span className="abstract-plane abstract-plane-back" />
        <span className="abstract-plane abstract-plane-middle" />
        <span className="abstract-plane abstract-plane-front" />

        <svg className="abstract-contours" viewBox="0 0 560 520" preserveAspectRatio="none">
          <path d="M-30 95 C105 12 230 28 332 108 C420 177 480 172 596 88" />
          <path d="M-36 134 C104 51 221 64 318 140 C409 212 484 206 601 121" />
          <path d="M-42 177 C97 94 214 104 310 180 C401 252 489 247 607 160" />
          <path d="M-48 224 C91 141 208 146 303 222 C395 296 494 291 613 203" />
          <path d="M-54 276 C84 193 201 192 296 267 C389 342 499 338 620 247" />
          <path d="M-60 332 C78 249 195 238 291 313 C385 388 505 385 627 292" />
          <path className="abstract-accent-line" d="M-66 392 C72 308 189 284 286 358 C381 431 512 430 634 337" />
          <path d="M-72 453 C67 369 184 331 282 404 C378 476 519 477 642 382" />
        </svg>

        <span className="abstract-rule abstract-rule-horizontal" />
        <span className="abstract-rule abstract-rule-vertical" />
        <span className="abstract-mark" />
      </div>
    </div>
  );
}
