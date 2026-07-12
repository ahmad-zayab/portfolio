import { useState } from 'react';
import { personalInfo } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';

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
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact__inner">

          {/* Left — heading + description only */}
          <div ref={leftRef} className="reveal-left">
            <p className="section-label" data-num="05">GET IN TOUCH</p>
            <h2 className="contact__heading">Let&apos;s build<br />something.</h2>
            <p style={{ color: 'var(--clr-text-secondary)', lineHeight: 1.7 }}>
              Whether you have a project, a role, or just want to say hi — my inbox is open.
            </p>
          </div>

          {/* Right: Form */}
          <form
            ref={rightRef}
            id="contact-form"
            className="contact-form reveal-right"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid-2">
              <div className="form-field">
                <label htmlFor="contact-name">name</label>
                <input
                  id="contact-name" type="text" name="name"
                  placeholder="Your name" value={form.name}
                  onChange={handleChange} required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email-input">email</label>
                <input
                  id="contact-email-input" type="email" name="email"
                  placeholder="your@email.com" value={form.email}
                  onChange={handleChange} required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">message</label>
              <textarea
                id="contact-message" name="message"
                placeholder="Tell me about your project, role, or idea..."
                rows={6} value={form.message}
                onChange={handleChange} required
              />
            </div>

            <button
              id="contact-submit"
              type="submit"
              className="btn btn-primary"
              style={{ alignSelf: 'flex-start' }}
            >
              {sent ? '✓ Message Sent!' : 'Send Message →'}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
