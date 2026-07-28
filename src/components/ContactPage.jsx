import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolio';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', website_url: '' });
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot check
    if (form.website_url) {
      setIsSending(true);
      setTimeout(() => {
        setSent(true);
        setForm({ name: '', email: '', message: '', website_url: '' });
        setIsSending(false);
        setTimeout(() => setSent(false), 3000);
      }, 500);
      return;
    }

    setIsSending(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSent(true);
          setForm({ name: '', email: '', message: '', website_url: '' });
          setTimeout(() => setSent(false), 3000);
        },
        (error) => {
          console.error('Failed to send message:', error);
          alert('Failed to send the message. Please try again later.');
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section className="pt-32 pb-24 min-h-screen font-sans">
      <div className="max-w-[1100px] mx-auto px-8">
        
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[0.75rem] text-[var(--clr-accent)] tracking-[0.15em] uppercase mb-4">
            01 / CONTACT
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Let's build <span className="text-[var(--clr-accent)]">something.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <p className="text-[var(--clr-text-secondary)] text-[1.05rem] mb-12">
              Drop a message, or reach me directly.
            </p>

            <div className="flex flex-col border-t border-[rgba(255,255,255,0.05)]">
              {/* Email Row */}
              <a href={`mailto:${personalInfo.email}`} className="group flex items-center py-6 border-b border-[rgba(255,255,255,0.05)] transition-colors hover:bg-[rgba(255,255,255,0.02)] no-underline">
                <span className="font-mono text-[var(--clr-accent)] text-[0.8rem] w-32 shrink-0">email</span>
                <span className="text-white font-medium text-[0.95rem] truncate">{personalInfo.email}</span>
                <span className="ml-auto text-[var(--clr-text-muted)] group-hover:text-white transition-colors">↗</span>
              </a>

              {/* GitHub Row */}
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="group flex items-center py-6 border-b border-[rgba(255,255,255,0.05)] transition-colors hover:bg-[rgba(255,255,255,0.02)] no-underline">
                <span className="font-mono text-[var(--clr-accent)] text-[0.8rem] w-32 shrink-0">github</span>
                <span className="text-white font-medium text-[0.95rem] truncate">github.com/{personalInfo.github.split('/').pop()}</span>
                <span className="ml-auto text-[var(--clr-text-muted)] group-hover:text-white transition-colors">↗</span>
              </a>

              {/* LinkedIn Row */}
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center py-6 border-b border-[rgba(255,255,255,0.05)] transition-colors hover:bg-[rgba(255,255,255,0.02)] no-underline">
                <span className="font-mono text-[var(--clr-accent)] text-[0.8rem] w-32 shrink-0">linkedin</span>
                <span className="text-white font-medium text-[0.95rem] truncate">linkedin.com/in/{personalInfo.linkedin.split('/').filter(Boolean).pop()}</span>
                <span className="ml-auto text-[var(--clr-text-muted)] group-hover:text-white transition-colors">↗</span>
              </a>
            </div>

            <div className="mt-16 flex items-center gap-3">
              <span className="inline-block w-[8px] h-[8px] rounded-full bg-[#28ca41]" style={{ boxShadow: '0 0 8px #28ca41' }} />
              <span className="font-mono text-[var(--clr-text-secondary)] text-[0.75rem] uppercase tracking-wider">
                Based in {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-[1.5rem] p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Honeypot field for spam bots */}
                <div className="opacity-0 absolute -z-10 h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website_url">Website URL</label>
                  <input
                    id="website_url"
                    type="text"
                    value={form.website_url}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-[0.7rem] text-[var(--clr-text-muted)] tracking-widest uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-[#0a0a0f] text-white rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[var(--clr-accent)] transition-all placeholder-[var(--clr-text-muted)] text-[0.95rem]"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-[0.7rem] text-[var(--clr-text-muted)] tracking-widest uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-[#0a0a0f] text-white rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[var(--clr-accent)] transition-all placeholder-[var(--clr-text-muted)] text-[0.95rem]"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-mono text-[0.7rem] text-[var(--clr-text-muted)] tracking-widest uppercase">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What are you building?"
                    className="w-full bg-[#0a0a0f] text-white rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[var(--clr-accent)] transition-all placeholder-[var(--clr-text-muted)] text-[0.95rem] resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-[var(--clr-accent)] hover:bg-[#c974c2] text-[#111] font-bold rounded-xl py-[0.85rem] transition-colors flex items-center justify-center gap-2 text-[0.95rem] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? 'Sending...' : sent ? '✓ Sent Successfully' : 'Send message →'}
                  </button>
                  <p className="font-mono text-[0.65rem] text-[var(--clr-text-muted)] text-center mt-4 tracking-wide">
                    I'll get back to you as soon as possible.
                  </p>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
