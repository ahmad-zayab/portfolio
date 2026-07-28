import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { personalInfo } from '../data/portfolio';
import AnimatedButton from './AnimatedButton';

export default function Navbar({ activeSection: defaultActiveSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine actual active section based on route
  const activeSection = location.pathname === '/about' ? 'about' 
                      : location.pathname === '/contact' ? 'contact' 
                      : defaultActiveSection;

  const links = [
    { id: 'home',       label: 'Home' },
    { id: 'about',      label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Work' },
    { id: 'contact',    label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (id === 'about') {
      navigate('/about');
      window.scrollTo(0, 0);
    } else if (id === 'contact') {
      navigate('/contact');
      window.scrollTo(0, 0);
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(10,10,15,0.85)] backdrop-blur-[16px] border-b border-[var(--clr-border)]'
          : ''
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            className="text-base font-bold flex items-center gap-1 tracking-tight no-underline"
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
          >
            <span className="text-[var(--clr-text-primary)]">
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
