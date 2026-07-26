import { aboutText, quickFacts, personalInfo } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';

export default function About() {
  const leftRef  = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section id="about" className="pt-32 pb-24 min-h-screen bg-[var(--clr-bg)]">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left: Bio */}
          <div ref={leftRef} className="reveal-left">
            <p
              className="font-mono text-[0.75rem] font-medium text-[var(--clr-accent)] tracking-[0.12em] uppercase mb-3 flex items-center gap-3 section-label"
              data-num="01"
            >
              ABOUT
            </p>
            <h2
              className="font-extrabold tracking-[-0.03em] leading-[1.1] mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
            >
              Who I Am
            </h2>

            <div className="flex flex-col">
              {aboutText.map((para, i) => (
                <p key={i} className="text-[var(--clr-text-secondary)] leading-[1.8] mb-5">
                  {para}
                </p>
              ))}
            </div>

            <ul className="flex flex-col gap-3 mt-6 list-none">
              {[
                'Clean, readable, and maintainable code',
                'Performance-first development mindset',
                'Strong communication and teamwork',
                'Continuous learner, always up to date',
              ].map((item) => (
                <li
                  key={item}
                  className="about-list-item flex items-center text-[0.9rem] text-[var(--clr-text-secondary)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Quick Facts sidebar */}
          <div ref={rightRef} className="reveal-right flex flex-col gap-5">

            {/* Info Card */}
            <div className="p-6 rounded-2xl border border-[var(--clr-border)] backdrop-blur-[12px] bg-[var(--clr-bg-card)] transition-all duration-300 hover:border-[var(--clr-border-hover)] hover:shadow-[0_0_40px_rgba(196,69,245,0.12)]">
              <p className="text-[0.7rem] tracking-[0.1em] uppercase text-[var(--clr-text-muted)] mb-3">
                Quick Facts
              </p>
              <div className="text-[0.9rem] text-[var(--clr-text-secondary)] leading-[1.7]">
                {quickFacts.map((fact, i) => (
                  <div key={i} className="mb-[0.6rem]">
                    <strong className="text-[var(--clr-text-primary)]">{fact.label}:</strong>{' '}
                    {fact.value}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="p-6 rounded-2xl border border-[var(--clr-border)] backdrop-blur-[12px] bg-[var(--clr-bg-card)] transition-all duration-300 hover:border-[var(--clr-border-hover)] hover:shadow-[0_0_40px_rgba(196,69,245,0.12)]">
              <p className="text-[0.7rem] tracking-[0.1em] uppercase text-[var(--clr-text-muted)] mb-3">
                Contact
              </p>
              <div className="text-[0.9rem] text-[var(--clr-text-secondary)] leading-[1.7]">
                <div className="mb-2">
                  <strong className="text-[var(--clr-text-primary)]">Email:</strong>{' '}
                  <a href={`mailto:${personalInfo.email}`} className="text-[var(--clr-accent)]">
                    {personalInfo.email}
                  </a>
                </div>
                <div>
                  <strong className="text-[var(--clr-text-primary)]">Phone:</strong>{' '}
                  {personalInfo.phone}
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="p-6 rounded-2xl border border-[rgba(196,69,245,0.3)] backdrop-blur-[12px] bg-[var(--clr-bg-card)] transition-all duration-300 hover:border-[var(--clr-border-hover)] hover:shadow-[0_0_40px_rgba(196,69,245,0.12)]">
              <p className="text-[0.7rem] tracking-[0.1em] uppercase text-[var(--clr-text-muted)] mb-3">
                Status
              </p>
              <div className="flex items-center gap-[0.6rem]">
                <span
                  className="inline-block w-[10px] h-[10px] rounded-full bg-[#28ca41]"
                  style={{ boxShadow: '0 0 8px #28ca41' }}
                />
                <span className="text-[var(--clr-text-primary)] font-semibold">
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
