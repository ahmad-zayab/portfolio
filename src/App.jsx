import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Experience from './components/Experience';
import Skills     from './components/Skills';
import Projects   from './components/Projects';
import Contact    from './components/Contact';
import ContactPage from './components/ContactPage';
import Footer     from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import CursorBlob from './components/CursorBlob';

const SECTIONS = ['home', 'experience', 'skills', 'projects', 'contact'];

function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Intersection Observer — highlights the active nav link
  useEffect(() => {
    const observers = [];

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

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      <CustomCursor />

      <CursorBlob />

      {/* Interactive particle field — fixed canvas behind all content */}
      <ParticleBackground />

      {/* All page content sits above the canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar activeSection={activeSection} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}
