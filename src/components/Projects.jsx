import { useState, useRef } from 'react';
import { projects, projectCategories } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';
import AnimatedButton from './AnimatedButton';

function ProjectCard({ project, index }) {
  const ref = useScrollReveal();
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    const rotateX = (ny - 0.5) * -28;
    const rotateY = (nx - 0.5) * 28;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.transition = 'transform 0.1s ease';
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${nx * 100}% ${ny * 100}%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)`;
      glareRef.current.style.opacity = '1';
    }
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
      glareRef.current.style.transition = 'opacity 0.4s ease';
    }
  }

  return (
    <article
      ref={(el) => { ref.current = el; cardRef.current = el; }}
      className="reveal rounded-2xl border border-[var(--clr-border)] backdrop-blur-[12px] bg-[var(--clr-bg-card)] overflow-hidden transition-all duration-300 hover:border-[var(--clr-border-hover)] hover:shadow-[0_0_40px_rgba(196,69,245,0.12)] hover:-translate-y-1"
      style={{
        transitionDelay: `${index * 0.12}s`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Preview Area */}
      <div
        className="h-[200px] border-b border-[var(--clr-border)] flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}22 0%, transparent 60%)` }}
      >
        {/* Browser-style header */}
        <div
          className="absolute top-0 left-0 right-0 px-[0.85rem] py-[0.6rem] flex items-center gap-[0.35rem] border-b border-[var(--clr-border)] font-mono text-[0.7rem] text-[var(--clr-text-muted)]"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--clr-border)]" />
          <span className="w-2 h-2 rounded-full" style={{ background: project.color }} />
          <span className="w-2 h-2 rounded-full bg-[var(--clr-border)]" />
          <span className="ml-2">{project.title}</span>
        </div>
        {/* Decorative dot grid */}
        <div
          className="absolute inset-0 top-9 opacity-60"
          style={{
            backgroundImage: `radial-gradient(circle, ${project.color}30 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />
        <span className="text-[2.5rem] relative z-10">
          {project.tags[0].includes('Python') || project.tags[0].includes('ML') ? '🤖' : '💻'}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <h3 className="text-[1.05rem] font-bold mb-2 flex items-center gap-3">
          {project.title}
          {project.badge && (
            <span
              className="text-[0.65rem] px-2 py-[0.15rem] rounded-full border font-mono"
              style={{
                background: `${project.color}20`,
                color: project.color,
                borderColor: `${project.color}40`,
              }}
            >
              {project.badge}
            </span>
          )}
        </h3>
        <p className="text-[0.875rem] text-[var(--clr-text-secondary)] leading-[1.65] mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-[0.4rem] mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-[0.75rem] font-mono bg-[rgba(196,69,245,0.1)] text-[var(--clr-accent)] border border-[rgba(196,69,245,0.2)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              id={`project-${project.id}-github`}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[0.82rem] text-[var(--clr-text-secondary)] flex items-center gap-[0.35rem] font-mono transition-colors duration-150 hover:text-[var(--clr-accent)]"
            >
              ↗ GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              id={`project-${project.id}-live`}
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[0.82rem] text-[var(--clr-text-secondary)] flex items-center gap-[0.35rem] font-mono transition-colors duration-150 hover:text-[var(--clr-accent)]"
            >
              ↗ Live Demo
            </a>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <span className="text-[0.82rem] text-[var(--clr-text-secondary)] font-mono opacity-50">
              🔒 Private
            </span>
          )}
        </div>
      </div>

      {/* Glare overlay — clipped by article's overflow-hidden */}
      <div
        ref={glareRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 20,
          opacity: 0,
          transition: 'opacity 0.4s ease',
          background: 'transparent',
        }}
      />
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState('All');
  const headingRef = useScrollReveal();

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-[1100px] mx-auto px-8">
        <div ref={headingRef} className="reveal mb-2">
          <p
            className="font-mono text-[0.75rem] font-medium text-[var(--clr-accent)] tracking-[0.12em] uppercase mb-3 flex items-center gap-3 section-label"
            data-num="04"
          >
            SELECTED WORK
          </p>
          <h2
            className="font-extrabold tracking-[-0.03em] leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Featured Projects
          </h2>
          <p className="text-base text-[var(--clr-text-secondary)] max-w-[480px] leading-[1.7]">
            A selection of things I&apos;ve built, real problems, real solutions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 my-8">
          {projectCategories.map((cat) => (
            <AnimatedButton
              key={cat}
              id={`projects-filter-${cat.toLowerCase().replace('/', '-')}`}
              contentClassName="px-4 py-[0.45rem]"
              className={`text-[0.85rem] font-medium transition-all duration-150 cursor-pointer ${
                active === cat
                  ? 'text-white'
                  : 'text-[var(--clr-text-secondary)] hover:text-[var(--clr-accent)]'
              }`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </AnimatedButton>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
