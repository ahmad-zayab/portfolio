import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolio';
import AnimatedButton from './AnimatedButton';

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
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(10,10,15,0.85)] backdrop-blur-[16px] border-b border-[var(--clr-border)]'
          : ''
      }`}
      style={scrolled && theme === 'light' ? { background: 'rgba(244,244,248,0.85)' } : undefined}
    >
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            className="text-base font-bold flex items-center gap-1 tracking-tight no-underline"
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 bg-[var(--clr-accent)] text-white rounded-lg text-[0.875rem] font-extrabold">
              {personalInfo.firstName[0]}
            </span>
            <span className="ml-2 text-[var(--clr-text-primary)]">
              {personalInfo.firstName}{' '}
              <span className="text-[var(--clr-accent)]">{personalInfo.lastName}</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1 list-none">
            {links.map((link) => (
              <li key={link.id}>
                <AnimatedButton
                  id={`nav-${link.id}`}
                  contentClassName="px-4 py-1.5"
                  className={`text-[0.9rem] font-medium transition-all duration-150 cursor-pointer font-[var(--font-sans)] ${
                    activeSection === link.id
                      ? 'text-[var(--clr-accent)]'
                      : 'text-[var(--clr-text-secondary)] hover:text-[var(--clr-text-primary)]'
                  }`}
                  onClick={() => scrollTo(link.id)}
                >
                  {link.label}
                </AnimatedButton>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <AnimatedButton
              id="theme-toggle"
              contentClassName="w-9 h-9 p-0"
              className="text-base text-[var(--clr-text-secondary)] hover:text-[var(--clr-accent)]"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </AnimatedButton>

            {/* Hamburger — visible on mobile only */}
            <button
              id="hamburger-btn"
              className="flex md:hidden flex-col gap-[5px] p-[6px] bg-transparent border-none cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-[22px] h-[2px] bg-[var(--clr-text-primary)] rounded-[2px] transition-all duration-150 origin-center"
                style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }}
              />
              <span
                className="block w-[22px] h-[2px] bg-[var(--clr-text-primary)] rounded-[2px] transition-all duration-150"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-[22px] h-[2px] bg-[var(--clr-text-primary)] rounded-[2px] transition-all duration-150 origin-center"
                style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <ul className="flex flex-col gap-2 py-4 list-none border-t border-[var(--clr-border)] animate-fade-in-down px-2">
            {links.map((link) => (
              <li key={`mobile-${link.id}`} className="w-full">
                <AnimatedButton
                  contentClassName="w-full text-left px-4 py-1.5"
                  className={`w-full text-[0.9rem] font-medium transition-all duration-150 cursor-pointer font-[var(--font-sans)] ${
                    activeSection === link.id
                      ? 'text-[var(--clr-accent)]'
                      : 'text-[var(--clr-text-secondary)] hover:text-[var(--clr-text-primary)]'
                  }`}
                  onClick={() => scrollTo(link.id)}
                >
                  <span className="w-full text-left">{link.label}</span>
                </AnimatedButton>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
