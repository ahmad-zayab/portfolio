import { useState } from 'react';
import { projects, projectCategories } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';

function ProjectCard({ project, index }) {
  const ref = useScrollReveal();
  return (
    <article
      ref={ref}
      className="glass-card project-card reveal"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Preview Area */}
      <div
        className="project-card__preview"
        style={{
          background: `linear-gradient(135deg, ${project.color}22 0%, transparent 60%)`,
        }}
      >
        <div className="project-card__preview-header">
          <span className="project-card__preview-dot" />
          <span className="project-card__preview-dot project-card__preview-dot--accent"
            style={{ background: project.color }} />
          <span className="project-card__preview-dot" />
          <span style={{ marginLeft: '0.5rem' }}>{project.title}</span>
        </div>
        {/* Decorative dot grid */}
        <div style={{
          position: 'absolute', inset: 0, top: '36px',
          backgroundImage: `radial-gradient(circle, ${project.color}30 1px, transparent 1px)`,
          backgroundSize: '24px 24px', opacity: 0.6,
        }} aria-hidden="true" />
        <span style={{ fontSize: '2.5rem', position: 'relative', zIndex: 1 }}>
          {project.tags[0].includes('Python') || project.tags[0].includes('ML') ? '🤖' : '💻'}
        </span>
      </div>

      {/* Card Body */}
      <div className="project-card__body">
        <h3 className="project-card__title">
          {project.title}
          {project.badge && (
            <span
              className="project-card__badge"
              style={{ background: `${project.color}20`, color: project.color, borderColor: `${project.color}40` }}
            >
              {project.badge}
            </span>
          )}
        </h3>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="project-card__links">
          {project.githubUrl && (
            <a id={`project-${project.id}-github`} href={project.githubUrl}
              target="_blank" rel="noreferrer" className="project-link">
              ↗ GitHub
            </a>
          )}
          {project.liveUrl && (
            <a id={`project-${project.id}-live`} href={project.liveUrl}
              target="_blank" rel="noreferrer" className="project-link">
              ↗ Live Demo
            </a>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <span className="project-link" style={{ opacity: 0.5 }}>🔒 Private</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState('All');
  const headingRef = useScrollReveal();

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div ref={headingRef} className="reveal" style={{ marginBottom: '0.5rem' }}>
          <p className="section-label" data-num="04">SELECTED WORK</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">
            A selection of things I&apos;ve built — real problems, real solutions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="projects__filters">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              id={`projects-filter-${cat.toLowerCase().replace('/', '-')}`}
              className={`filter-btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects__grid">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
