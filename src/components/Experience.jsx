import { experiences } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';

function TimelineItem({ exp, index }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="timeline__item reveal"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <p className="timeline__date">
        {exp.period} · <span style={{ color: 'var(--clr-text-muted)' }}>{exp.type}</span>
      </p>
      <h3 className="timeline__role">{exp.role}</h3>
      <p className="timeline__company">
        {exp.companyUrl ? (
          <a href={exp.companyUrl} target="_blank" rel="noreferrer">{exp.company}</a>
        ) : (
          exp.company
        )}
      </p>
      <p className="timeline__desc">{exp.description}</p>
      <div className="timeline__tags">
        {exp.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const headingRef = useScrollReveal();

  return (
    <section id="experience" className="section">
      <div className="container">
        <div ref={headingRef} className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="section-label" data-num="02">EXPERIENCE</p>
          <h2 className="section-title">Where I&apos;ve Worked</h2>
          <p className="section-desc">
            A timeline of my professional journey — the companies I&apos;ve contributed to and the impact I&apos;ve made.
          </p>
        </div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
