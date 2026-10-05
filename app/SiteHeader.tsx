/* eslint-disable @next/next/no-html-link-for-pages */
import { profile } from "./portfolio-data";

const homeLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
] as const;

export default function SiteHeader() {
  return (
    <header className="site-header" data-site-header>
      <div className="site-header-inner site-shell">
        <a className="wordmark" href="/#top" aria-label="Harsh Dobariya, home">
          Harsh Dobariya
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {homeLinks.map((link) => (
            <a href={link.href} data-nav-link key={link.href}>{link.label}</a>
          ))}
          <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Résumé</a>
          <a className="nav-contact" href="/#contact">Contact</a>
        </nav>

        <details className="mobile-nav" data-mobile-nav>
          <summary aria-label="Open navigation menu">
            <span>Menu</span><i aria-hidden="true" />
          </summary>
          <div className="mobile-menu-panel">
            <nav aria-label="Mobile navigation">
              {homeLinks.map((link, index) => (
                <a href={link.href} key={link.href}><span>0{index + 1}</span>{link.label}</a>
              ))}
              <a href="/Harsh_Dobariya_Resume.pdf" target="_blank"><span>04</span>Résumé</a>
              <a href={profile.github} target="_blank" rel="noreferrer"><span>05</span>GitHub ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>06</span>LinkedIn ↗</a>
              <a href="/#contact"><span>07</span>Contact</a>
            </nav>
            <p>{profile.location}<br />Open to relocation</p>
          </div>
        </details>
      </div>
    </header>
  );
}
