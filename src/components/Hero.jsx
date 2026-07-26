import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { personalInfo, stats } from '../data/portfolio';
import AnimatedButton from './AnimatedButton';
import TerminalWidget from './TerminalWidget';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const current = personalInfo.roles[roleIndex];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % personalInfo.roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const scrollTo = (id) => {
    if (id === 'contact') {
      navigate('/contact');
      window.scrollTo(0, 0);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Background glow */}
      <div
        className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] pointer-events-none animate-pulse-glow rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(196,69,245,0.18) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="max-w-[1100px] mx-auto px-8 flex flex-col gap-0 w-full">
        {/* ── Top two-column area ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center py-12 lg:py-12 pb-10">

          {/* LEFT column */}
          <div className="flex flex-col animate-fade-in-up">
            {/* $ whoami */}
            <p className="font-mono text-[0.85rem] text-[var(--clr-text-muted)] mb-3 flex items-center gap-1">
              <span className="text-[var(--clr-accent)] font-semibold">$</span> whoami
            </p>

            {/* Big name */}
            <h1 className="font-black tracking-[-0.04em] leading-none mb-1"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}>
              {personalInfo.firstName}
              <span className="text-[var(--clr-accent)] block">{personalInfo.lastName}</span>
            </h1>

            {/* Typewriter role */}
            <p className="text-[1.3rem] font-semibold text-[var(--clr-text-secondary)] mb-5 min-h-[2rem]">
              {displayed}
              <span
                className="inline-block w-[3px] h-[1.2em] bg-[var(--clr-accent)] ml-[2px] align-text-bottom animate-blink"
                aria-hidden="true"
              />
            </p>

            {/* Bio */}
            <p className="text-base text-[var(--clr-text-secondary)] leading-[1.75] max-w-[480px] mb-8">
              {personalInfo.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-6">
              <AnimatedButton
                id="hero-view-projects"
                onClick={() => scrollTo('projects')}
              >
                View Projects →
              </AnimatedButton>
              <AnimatedButton
                id="hero-download-cv"
                as="a"
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noreferrer"
                download="Ahmad_Zayab_Resume.pdf"
              >
                Download Resume
              </AnimatedButton>
              <AnimatedButton
                id="hero-contact"
                onClick={() => scrollTo('contact')}
              >
                Get in Touch
              </AnimatedButton>
            </div>

            {/* Social badges */}
            <div className="flex gap-2">
              <a id="hero-github-link" href={personalInfo.github}
                target="_blank" rel="noreferrer" aria-label="GitHub"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--clr-border)] text-[0.75rem] font-mono font-semibold text-[var(--clr-text-secondary)] transition-all duration-150 hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)] hover:-translate-y-0.5">
                GH
              </a>
              <a id="hero-linkedin-link" href={personalInfo.linkedin}
                target="_blank" rel="noreferrer" aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--clr-border)] text-[0.75rem] font-mono font-semibold text-[var(--clr-text-secondary)] transition-all duration-150 hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)] hover:-translate-y-0.5">
                in
              </a>
              <a id="hero-email-link" href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--clr-border)] text-[0.75rem] font-mono font-semibold text-[var(--clr-text-secondary)] transition-all duration-150 hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)] hover:-translate-y-0.5">
                @
              </a>
            </div>
          </div>

          {/* RIGHT column — interactive terminal */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '0.2s', marginTop: '-20px' }}
          >
            <TerminalWidget />
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 border-t border-[var(--clr-border)] pt-8 pb-6 mt-2 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col gap-[0.3rem] px-2 ${i > 0 ? 'border-l border-[var(--clr-border)]' : ''}`}
            >
              <span
                className="font-extrabold tracking-[-0.04em] leading-none text-[var(--clr-text-primary)]"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}
              >
                {s.value}
              </span>
              <span className="text-[0.68rem] tracking-[0.12em] uppercase text-[var(--clr-text-muted)] font-medium leading-[1.3]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
