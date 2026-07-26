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
      <p className="font-mono text-[0.75rem] text-[var(--clr-accent)] mb-2">
        {exp.period} ·{' '}
        <span className="text-[var(--clr-text-muted)]">{exp.type}</span>
      </p>
      <h3 className="text-[1.15rem] font-bold mb-[0.15rem]">{exp.role}</h3>
      <p className="text-[0.9rem] text-[var(--clr-text-secondary)] mb-3">
        {exp.companyUrl ? (
          <a
            href={exp.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--clr-accent)] hover:opacity-80 transition-opacity duration-150"
          >
            {exp.company}
          </a>
        ) : (
          exp.company
        )}
      </p>
      <p className="text-[0.9rem] text-[var(--clr-text-secondary)] leading-[1.7] mb-3">
        {exp.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-[0.75rem] font-mono bg-[rgba(196,69,245,0.1)] text-[var(--clr-accent)] border border-[rgba(196,69,245,0.2)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const headingRef = useScrollReveal();

  return (
    <section id="experience" className="py-24">
      <div className="max-w-[1100px] mx-auto px-8">
        <div ref={headingRef} className="reveal mb-12">
          <p
            className="font-mono text-[0.75rem] font-medium text-[var(--clr-accent)] tracking-[0.12em] uppercase mb-3 flex items-center gap-3 section-label"
            data-num="02"
          >
            EXPERIENCE
          </p>
          <h2
            className="font-extrabold tracking-[-0.03em] leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Where I&apos;ve Worked
          </h2>
          <p className="text-base text-[var(--clr-text-secondary)] max-w-[480px] leading-[1.7]">
            A timeline of my professional journey, the companies I&apos;ve contributed to and the impact I&apos;ve made.
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
