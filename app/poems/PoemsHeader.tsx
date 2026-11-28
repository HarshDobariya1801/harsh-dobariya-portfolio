/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation avoids Vinext's production next/link runtime crash. */
export default function PoemsHeader() {
  return (
    <header className="site-header poems-site-header">
      <div className="site-header-inner section-shell">
        <a className="wordmark" href="/" aria-label="Harsh Dobariya, portfolio home">HD / Portfolio</a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="/#experience">Experience</a>
          <a href="/#work">Projects</a>
          <a href="/poems" aria-current="page">Poems</a>
          <a href="/#about">About</a>
        </nav>
        <div className="header-utilities">
          <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume</a>
        </div>
        <details className="mobile-nav">
          <summary>Index</summary>
          <div className="mobile-menu-panel">
            <nav aria-label="Mobile navigation">
              <a href="/">Portfolio home</a>
              <a href="/#experience">Experience</a>
              <a href="/#work">Projects</a>
              <a href="/poems" aria-current="page">Poems</a>
              <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume</a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
