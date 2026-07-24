import { useState } from 'react';
import { personalInfo } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';
import AnimatedButton from './AnimatedButton';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const leftRef  = useScrollReveal();
  const rightRef = useScrollReveal();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body    = encodeURIComponent(form.message);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 bg-[var(--clr-bg-secondary)]">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Left — heading + description */}
          <div ref={leftRef} className="reveal-left">
            <p
              className="font-mono text-[0.75rem] font-medium text-[var(--clr-accent)] tracking-[0.12em] uppercase mb-3 flex items-center gap-3 section-label"
              data-num="05"
            >
              GET IN TOUCH
            </p>
            <h2
              className="font-black tracking-[-0.04em] leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Let&apos;s build<br />something.
            </h2>
            <p className="text-[var(--clr-text-secondary)] leading-[1.7]">
              Whether you have a project, a role, or just want to say hi — my inbox is open.
            </p>
          </div>

          {/* Right: Form */}
          <form
            ref={rightRef}
            id="contact-form"
            className="reveal-right flex flex-col gap-[1.1rem]"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-[0.4rem]">
                <label
                  htmlFor="contact-name"
                  className="text-[0.8rem] font-medium text-[var(--clr-text-secondary)] font-mono"
                >
                  name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input px-4 py-3 rounded-[10px] border border-[var(--clr-border)] bg-[var(--clr-bg-card)] text-[var(--clr-text-primary)] font-[var(--font-sans)] text-[0.9rem] transition-all duration-150 resize-none w-full"
                />
              </div>
              <div className="flex flex-col gap-[0.4rem]">
                <label
                  htmlFor="contact-email-input"
                  className="text-[0.8rem] font-medium text-[var(--clr-text-secondary)] font-mono"
                >
                  email
                </label>
                <input
                  id="contact-email-input"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input px-4 py-3 rounded-[10px] border border-[var(--clr-border)] bg-[var(--clr-bg-card)] text-[var(--clr-text-primary)] font-[var(--font-sans)] text-[0.9rem] transition-all duration-150 resize-none w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[0.4rem]">
              <label
                htmlFor="contact-message"
                className="text-[0.8rem] font-medium text-[var(--clr-text-secondary)] font-mono"
              >
                message
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project, role, or idea..."
                rows={6}
                value={form.message}
                onChange={handleChange}
                required
                className="form-input px-4 py-3 rounded-[10px] border border-[var(--clr-border)] bg-[var(--clr-bg-card)] text-[var(--clr-text-primary)] font-[var(--font-sans)] text-[0.9rem] transition-all duration-150 resize-none w-full"
              />
            </div>

            <AnimatedButton
              id="contact-submit"
              type="submit"
              className="self-start"
            >
              {sent ? '✓ Message Sent!' : 'Send Message →'}
            </AnimatedButton>
          </form>

        </div>
      </div>
    </section>
  );
}
