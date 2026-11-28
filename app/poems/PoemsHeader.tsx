import Link from "next/link";

export default function PoemsHeader() {
  return (
    <header className="site-header poems-site-header">
      <div className="site-header-inner section-shell">
        <Link className="wordmark" href="/" aria-label="Harsh Dobariya, portfolio home">HD / Portfolio</Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/#experience">Experience</Link>
          <Link href="/#work">Projects</Link>
          <Link href="/poems" aria-current="page">Poems</Link>
          <Link href="/#about">About</Link>
        </nav>
        <div className="header-utilities">
          <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume</a>
        </div>
        <details className="mobile-nav">
          <summary>Index</summary>
          <div className="mobile-menu-panel">
            <nav aria-label="Mobile navigation">
              <Link href="/">Portfolio home</Link>
              <Link href="/#experience">Experience</Link>
              <Link href="/#work">Projects</Link>
              <Link href="/poems" aria-current="page">Poems</Link>
              <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume</a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
