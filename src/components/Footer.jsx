import { personalInfo } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <p className="footer__copy">
            © {year} {personalInfo.name}. Designed &amp; Built with ❤️
          </p>

          <div className="footer__links">
            <a
              id="footer-github"
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              GitHub
            </a>
            <a
              id="footer-linkedin"
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              LinkedIn
            </a>
            <a
              id="footer-email"
              href={`mailto:${personalInfo.email}`}
              className="footer__link"
            >
              Email
            </a>
          </div>

          <button id="back-to-top" className="footer__top-btn" onClick={scrollTop}>
            back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
