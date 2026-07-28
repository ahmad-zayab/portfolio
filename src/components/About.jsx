import { personalInfo } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';

export default function About() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section id="about" className="pt-32 pb-24 min-h-screen">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-start">

          {/* Left: Bio (60%) */}
          <div ref={leftRef} className="reveal-left">
            <p
              className="font-mono text-[0.75rem] font-medium text-[#7f77dd] tracking-[0.12em] uppercase mb-3 flex items-center gap-3 section-label"
              data-num="01"
            >
              ABOUT
            </p>
            <h2
              className="font-extrabold tracking-[-0.03em] leading-[1.1] mb-6 text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
            >
              Who I Am
            </h2>

            {/* Bio Paragraphs */}
            <div className="flex flex-col text-[#c9c6d6] leading-[1.8] space-y-5 mb-8">
              <p>
                I'm a Full Stack Developer based in Lahore, Pakistan, with a year of experience shipping production web apps. I work across the stack at Metalabs Tech REST APIs, React front ends, and data pipelines with light ML components and previously interned at Arbisoft.
              </p>
              <p>
                I care about clean architecture and fast, reliable UIs.
              </p>
            </div>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2 mb-10">
              {['React.js', 'Next.js', 'Node / Express', 'Django', 'Git'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-[12px] rounded-full border-[0.5px] border-[#4a3f7a] text-[#b6a9ee] bg-[#141220]"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bullet List - 2 Column Grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 list-none mb-10">
              {[
                'Clean, maintainable code',
                'Performance-first mindset',
                'Strong communication',
                'Always learning',
              ].map((item) => (
                <li key={item} className="flex items-center text-[0.9rem] text-[#c9c6d6]">
                  {/* Small check icon */}
                  <svg className="w-4 h-4 mr-3 text-[#7f77dd] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* Download Resume Button */}
            <a
              href={personalInfo.cvUrl}
              target="_blank"
              rel="noreferrer"
              download="Ahmad_Zayab_Resume.pdf"
              className="inline-flex items-center justify-center bg-[#7f77dd] text-[#0a0a0d] font-bold px-6 py-3 rounded-lg hover:bg-[#b6a9ee] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download resume
            </a>
          </div>

          {/* Right: Merged Info Card (40%) */}
          <div ref={rightRef} className="reveal-right">
            <div className="p-8 rounded-2xl border border-[#2a253f] backdrop-blur-[12px] bg-[#141220] transition-all duration-300 hover:border-[#4a3f7a]">

              {/* Top: Status Line */}
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full bg-[#28ca41]"
                  style={{ boxShadow: '0 0 8px #28ca41' }}
                />
                <span className="text-[#c9c6d6] font-semibold text-sm tracking-wide uppercase">
                  Open to work
                </span>
              </div>

              {/* Details: Location, Languages, Education */}
              <div className="flex flex-col gap-5 text-[#c9c6d6] text-[0.95rem]">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[#8b84a8] uppercase tracking-wider text-xs">Location</span>
                  <span className="font-medium text-right">{personalInfo.location}</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[#8b84a8] uppercase tracking-wider text-xs">Languages</span>
                  <span className="font-medium text-right">English, Urdu</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[#8b84a8] uppercase tracking-wider text-xs">Education</span>
                  <span className="font-medium text-right">BSc CS, UET Lahore</span>
                </div>
              </div>

              {/* Horizontal Divider */}
              <div className="w-full h-px bg-[#2a253f] my-8"></div>

              {/* Contact Section */}
              <div className="flex flex-col gap-5">
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 group no-underline text-[#c9c6d6]">
                  <div className="w-10 h-10 rounded-full bg-[#0a0a0d] border border-[#2a253f] flex items-center justify-center group-hover:border-[#7f77dd] transition-colors shrink-0">
                    <svg className="w-4 h-4 text-[#7f77dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#7f77dd] group-hover:text-[#b6a9ee] transition-colors truncate">
                    {personalInfo.email}
                  </span>
                </a>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[#0a0a0d] border border-[#2a253f] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#8b84a8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#c9c6d6]">
                    {personalInfo.phone}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
