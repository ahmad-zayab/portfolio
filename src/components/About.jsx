import { aboutText, quickFacts, personalInfo } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';

export default function About() {
  const leftRef  = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about__inner">
          {/* Left: Bio */}
          <div ref={leftRef} className="reveal-left">
            <p className="section-label" data-num="01">ABOUT</p>
            <h2 className="section-title">Who I Am</h2>

            <div className="about__body">
              {aboutText.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <ul className="about__list">
              <li className="about__list-item">Clean, readable, and maintainable code</li>
              <li className="about__list-item">Performance-first development mindset</li>
              <li className="about__list-item">Strong communication and teamwork</li>
              <li className="about__list-item">Continuous learner — always up to date</li>
            </ul>
          </div>

          {/* Right: Quick Facts */}
          <div ref={rightRef} className="about__sidebar reveal-right">
            {/* Info Card */}
            <div className="glass-card info-card">
              <p className="info-card__title">Quick Facts</p>
              <div className="info-card__content">
                {quickFacts.map((fact, i) => (
                  <div key={i} style={{ marginBottom: '0.6rem' }}>
                    <strong>{fact.label}:</strong> {fact.value}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="glass-card info-card">
              <p className="info-card__title">Contact</p>
              <div className="info-card__content">
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${personalInfo.email}`} style={{ color: 'var(--clr-accent)' }}>
                    {personalInfo.email}
                  </a>
                </div>
                <div>
                  <strong>Phone:</strong> {personalInfo.phone}
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="glass-card info-card" style={{ borderColor: 'rgba(196,69,245,0.3)' }}>
              <p className="info-card__title">Status</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{
                  display: 'inline-block', width: 10, height: 10,
                  borderRadius: '50%', background: '#28ca41',
                  boxShadow: '0 0 8px #28ca41',
                }} />
                <span style={{ color: 'var(--clr-text-primary)', fontWeight: 600 }}>
                  {personalInfo.availability}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
