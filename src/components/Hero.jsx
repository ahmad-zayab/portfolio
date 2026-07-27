import { useState, useEffect } from 'react';
import { personalInfo, stats } from '../data/portfolio';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero">
      <div className="hero__glow" aria-hidden="true" />

      <div className="container">
        {/* ── Top two-column area ── */}
        <div className="hero__top">

          {/* LEFT column */}
          <div className="hero__left fade-in">
            {/* $ whoami label */}
            <p className="hero__whoami">
              <span className="hero__whoami-prompt">$</span> whoami
            </p>

            {/* Big name */}
            <h1 className="hero__name">
              {personalInfo.firstName}
              <span className="hero__name-accent">{personalInfo.lastName}</span>
            </h1>

            {/* Typewriter role */}
            <p className="hero__role">
              {displayed}
              <span className="hero__cursor" aria-hidden="true" />
            </p>

            {/* Bio */}
            <p className="hero__desc">{personalInfo.bio}</p>

            {/* CTAs — stacked like reference */}
            <div className="hero__ctas">
              <button
                id="hero-view-projects"
                className="btn btn-primary"
                onClick={() => scrollTo('projects')}
              >
                View Projects →
              </button>
              <a
                id="hero-download-cv"
                href={personalInfo.cvUrl}
                className="btn btn-outline"
                target="_blank"
                rel="noreferrer"
              >
                Download Resume
              </a>
              <button
                id="hero-contact"
                className="btn btn-outline"
                onClick={() => scrollTo('contact')}
              >
                Get in Touch
              </button>
            </div>

            {/* Social badges */}
            <div className="hero__social-links">
              <a id="hero-github-link" href={personalInfo.github}
                target="_blank" rel="noreferrer" className="social-badge" aria-label="GitHub">GH</a>
              <a id="hero-linkedin-link" href={personalInfo.linkedin}
                target="_blank" rel="noreferrer" className="social-badge" aria-label="LinkedIn">in</a>
              <a id="hero-email-link" href={`mailto:${personalInfo.email}`}
                className="social-badge" aria-label="Email">@</a>
            </div>
          </div>

          {/* RIGHT column — terminal, shifted 20px up */}
          <div className="hero__terminal fade-in" style={{ animationDelay: '0.2s', marginTop: '-20px' }}>
            {/* Header bar */}
            <div className="terminal__header">
              <div className="terminal__dots">
                <span className="terminal__dot terminal__dot--red" />
                <span className="terminal__dot terminal__dot--yellow" />
                <span className="terminal__dot terminal__dot--green" />
              </div>
              <span className="terminal__title">
                {personalInfo.email.split('@')[0]}@portfolio · zsh
              </span>
            </div>

            {/* Body — interactive shell style */}
            <div className="terminal__body terminal__body--shell">
              {/* Name + interactive shell line */}
              <p className="terminal__shell-name">
                {personalInfo.name} · interactive shell ✦
              </p>
              {/* Help hint */}
              <p className="terminal__shell-hint">type &apos;help&apos; to get started.</p>

              {/* Prompt line */}
              <p className="terminal__shell-prompt">
                <span className="terminal__shell-arrow">→</span>
                <span className="terminal__shell-tilde"> ~ </span>
                <span className="terminal__shell-cmd">type &apos;help&apos;</span>
                <span className="hero__cursor" aria-hidden="true" />
              </p>
            </div>
          </div>
        </div>

        {/* ── Stats strip — full width horizontal bar ── */}
        <div className="hero__stats-bar fade-in" style={{ animationDelay: '0.4s' }}>
          {stats.map((s, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
