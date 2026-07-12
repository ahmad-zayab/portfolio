import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolio';

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  const links = [
    { id: 'home',       label: 'Home' },
    { id: 'about',      label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills',     label: 'Skills' },
    { id: 'projects',   label: 'Work' },
    { id: 'contact',    label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar__inner">

          {/* Logo */}
          <a
            href="#home"
            className="navbar__logo"
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
          >
            <span className="navbar__logo-initial">
              {personalInfo.firstName[0]}
            </span>
            <span className="navbar__logo-name">
              {personalInfo.firstName} <span>{personalInfo.lastName}</span>
            </span>
          </a>

          {/* Desktop Nav Links — hidden on mobile via CSS */}
          <ul className="navbar__links navbar__links--desktop">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  id={`nav-${link.id}`}
                  className={`navbar__link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => scrollTo(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="navbar__actions">
            <button
              id="theme-toggle"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              id="hamburger-btn"
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown — only visible when open on mobile */}
        {menuOpen && (
          <ul className="navbar__links navbar__links--mobile">
            {links.map((link) => (
              <li key={`mobile-${link.id}`}>
                <button
                  className={`navbar__link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => scrollTo(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
