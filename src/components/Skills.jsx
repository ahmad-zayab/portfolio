import { skills } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Skills() {
  const headingRef = useScrollReveal();
  const gridRef    = useScrollReveal();

  return (
    <section id="skills" className="py-24 bg-[var(--clr-bg-secondary)]">
      <div className="max-w-[1100px] mx-auto px-8">
        <div ref={headingRef} className="reveal">
          <p
            className="font-mono text-[0.75rem] font-medium text-[var(--clr-accent)] tracking-[0.12em] uppercase mb-3 flex items-center gap-3 section-label"
            data-num="03"
          >
            SKILLS
          </p>
          <h2
            className="font-extrabold tracking-[-0.03em] leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Skills &amp; Technologies
          </h2>
          <p className="text-base text-[var(--clr-text-secondary)] max-w-[480px] leading-[1.7]">
            The toolkit I reach for across the stack, from interface to data layer.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="reveal grid gap-3 mt-8"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
        >
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="px-4 py-[0.85rem] flex items-center gap-3 rounded-xl border border-[var(--clr-border)] backdrop-blur-[12px] bg-[var(--clr-bg-card)] transition-all duration-300 hover:border-[var(--clr-border-hover)] hover:shadow-[0_0_40px_rgba(196,69,245,0.12)] hover:-translate-y-0.5 cursor-default"
              style={{ transitionDelay: `${i * 0.035}s` }}
            >
              <span className="text-[1.4rem] shrink-0" aria-hidden="true">{skill.icon}</span>
              <span className="text-[0.85rem] font-medium text-[var(--clr-text-primary)]">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
