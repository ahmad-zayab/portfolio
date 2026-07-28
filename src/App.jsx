import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import Experience from './components/Experience';
import Skills     from './components/Skills';
import Contact    from './components/Contact';
import Footer     from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CursorBlob from './components/CursorBlob';

// Lazy-loaded components
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const ParticleBackground = lazy(() => import('./components/ParticleBackground'));

const SECTIONS = ['home', 'experience', 'skills', 'projects', 'contact'];

const FallbackSpinner = () => (
  <div className="flex items-center justify-center min-h-[300px] w-full">
    <div className="w-8 h-8 border-[3px] border-[var(--clr-accent)] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <Suspense fallback={<FallbackSpinner />}>
        <Projects />
      </Suspense>
      <Contact />
    </>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Intersection Observer — highlights the active nav link
  useEffect(() => {
    const observers = [];

    // Use a short timeout to ensure lazy-loaded components (like Projects) 
    // are in the DOM before we attach the observer to them.
    const attachObservers = () => {
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(id);
          },
          { threshold: 0.35 }
        );

        observer.observe(el);
        observers.push(observer);
      });
    };

    // Attach immediately for synchronous sections
    attachObservers();

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      <CustomCursor />

      <CursorBlob />

      {/* Interactive particle field — fixed canvas behind all content */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* All page content sits above the canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar activeSection={activeSection} />

        <main>
          <Suspense fallback={<FallbackSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </>
  );
}
