import { skills } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Skills() {
  const headingRef = useScrollReveal();
  const gridRef    = useScrollReveal();

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div ref={headingRef} className="reveal">
          <p className="section-label" data-num="03">SKILLS</p>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <p className="section-desc">
            The toolkit I reach for across the stack, from interface to data layer.
          </p>
        </div>

        {/* Skills Grid — all skills, no filter */}
        <div ref={gridRef} className="skills__grid reveal" style={{ marginTop: '2rem' }}>
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="glass-card skill-card"
              style={{ transitionDelay: `${i * 0.035}s` }}
            >
              <span className="skill-card__icon" aria-hidden="true">{skill.icon}</span>
              <span className="skill-card__name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
