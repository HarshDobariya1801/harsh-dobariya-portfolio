import { profile } from "./portfolio-data";

export default function SiteFooter() {
  return (
    <footer className="site-footer site-shell">
      <p className="footer-name">Harsh Dobariya</p>
      <p>Software Engineer<br />{profile.location}</p>
      <nav aria-label="Footer links">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Résumé ↗</a>
      </nav>
      <p>© {new Date().getFullYear()}</p>
    </footer>
  );
}
