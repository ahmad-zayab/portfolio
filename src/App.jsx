import { useState, useEffect } from 'react';
import './index.css';
import './components.css';

import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Experience from './components/Experience';
import Skills     from './components/Skills';
import Projects   from './components/Projects';
import Contact    from './components/Contact';
import Footer     from './components/Footer';

const SECTIONS = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

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
      <Navbar activeSection={activeSection} />

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
