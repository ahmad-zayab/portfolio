import { personalInfo } from '../data/portfolio';
import AnimatedButton from './AnimatedButton';

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="py-8 border-t border-[var(--clr-border)]">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-[0.82rem] text-[var(--clr-text-muted)]">
            © {year} {personalInfo.name}. Designed &amp; Built with ❤️
          </p>

          <div className="flex gap-5">
            <a
              id="footer-github"
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="text-[0.82rem] text-[var(--clr-text-secondary)] transition-colors duration-150 hover:text-[var(--clr-accent)]"
            >
              GitHub
            </a>
            <a
              id="footer-linkedin"
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[0.82rem] text-[var(--clr-text-secondary)] transition-colors duration-150 hover:text-[var(--clr-accent)]"
            >
              LinkedIn
            </a>
            <a
              id="footer-email"
              href={`mailto:${personalInfo.email}`}
              className="text-[0.82rem] text-[var(--clr-text-secondary)] transition-colors duration-150 hover:text-[var(--clr-accent)]"
            >
              Email
            </a>
          </div>

          <AnimatedButton
            id="back-to-top"
            onClick={scrollTop}
            contentClassName="px-4 py-2"
            className="text-[0.82rem] text-[var(--clr-text-muted)] hover:text-[var(--clr-accent)]"
          >
            back to top ↑
          </AnimatedButton>
        </div>
      </div>
    </footer>
  );
}
