import { useState, useEffect, useRef } from 'react';
import { personalInfo, skills, projects, experiences } from '../data/portfolio';

function resolveCommand(input) {
  const cmd = input.trim().toLowerCase();

  if (cmd === 'clear') return null;

  if (cmd === 'help') {
    return [{
      type: 'output',
      lines: [
        '┌─ Available Commands ─────────────────┐',
        '│  whoami     → about me              │',
        '│  skills     → tech stack            │',
        '│  projects   → featured work         │',
        '│  experience → work history          │',
        '│  contact    → get in touch          │',
        '│  clear      → clear terminal        │',
        '└──────────────────────────────────────┘',
      ],
    }];
  }

  if (cmd === 'whoami') {
    return [{
      type: 'output',
      lines: [
        '  Name       Ahmad Zayab',
        '  Role       Full Stack Developer',
        '  Location   Lahore, Pakistan',
        '  Status     Open to Opportunities',
        '  Stack      React · Node · Next.js · Python',
        '',
        '  ' + personalInfo.bio,
      ],
    }];
  }

  if (cmd === 'skills') {
    const categories = ['Frontend', 'Backend', 'Tools'];
    const lines = [];
    categories.forEach((cat) => {
      lines.push(`  ── ${cat} ──`);
      skills
        .filter((s) => s.category === cat)
        .forEach((s) => lines.push(`  ${s.icon}  ${s.name}`));
      lines.push('');
    });
    return [{ type: 'output', lines }];
  }

  if (cmd === 'projects') {
    const lines = [];
    projects.forEach((p) => {
      const desc = p.description.length > 80 ? p.description.slice(0, 80) + '...' : p.description;
      lines.push(`  [${p.badge}] ${p.title}`);
      lines.push(`    └─ ${desc}`);
      lines.push('');
    });
    return [{ type: 'output', lines }];
  }

  if (cmd === 'experience') {
    const lines = [];
    experiences.forEach((e) => {
      lines.push(`  ${e.role}  @  ${e.company}`);
      lines.push(`  ${e.period}`);
      lines.push('');
    });
    return [{ type: 'output', lines }];
  }

  if (cmd === 'contact') {
    return [{
      type: 'output',
      lines: [
        '  Email     ahmadzayab2003@gmail.com',
        '  GitHub    github.com/ahmad-zayab',
        '  LinkedIn  linkedin.com/in/ahmad-zayab-26387b240',
        '',
        '  Open to full-time and freelance opportunities.',
      ],
    }];
  }

  if (cmd === 'exit') {
    return [{ type: 'error', lines: ['  nice try. 😄  you cannot escape this portfolio.'] }];
  }

  return [{ type: 'error', lines: [`  command not found: ${input}`, '  type "help" for available commands.'] }];
}

function getLineStyle(entry, j) {
  if (entry.type === 'system') {
    if (j === 0) return { color: '#e8e8f0', fontWeight: '700', fontSize: '0.85rem' };
    if (j === 1) return { color: 'rgba(200,200,220,0.45)' };
  }
  return {};
}

export default function TerminalWidget() {
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    setHistory([
      {
        type: 'system',
        lines: [
          'Ahmad Zayab · interactive shell ✦',
          'Type "help" to see available commands.',
        ],
      },
    ]);
  }, []);

  // Auto-scroll on every history update
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  function handleSubmit() {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    // Echo the typed command
    const inputEntry = { type: 'input', lines: [inputVal] };

    const result = resolveCommand(trimmed);

    if (result === null) {
      // clear command
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, inputEntry, ...result]);
    }
    setInputVal('');
  }

  return (
    <div
      className="rounded-[14px] overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
      style={{ background: '#0d0b14' }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-2 px-[1.1rem] py-[0.85rem] border-b border-[rgba(255,255,255,0.06)]"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      >
        <div className="flex gap-[7px]">
          <span className="w-[13px] h-[13px] rounded-full bg-[#ff5f57]" />
          <span className="w-[13px] h-[13px] rounded-full bg-[#ffbd2e]" />
          <span className="w-[13px] h-[13px] rounded-full bg-[#28ca41]" />
        </div>
        <span className="font-mono text-[0.78rem] text-[rgba(255,255,255,0.35)] ml-[0.4rem] tracking-wide">
          {personalInfo.email.split('@')[0]}@portfolio · zsh
        </span>
      </div>

      {/* Scrollable body */}
      <div
        ref={bodyRef}
        onClick={() => { inputRef.current?.focus(); }}
        className="px-5 pt-5 pb-4 font-mono text-[0.82rem] leading-relaxed flex flex-col gap-[0.15rem] overflow-y-auto"
        style={{ minHeight: '260px', maxHeight: '340px', cursor: 'text' }}
      >
        {/* Render history */}
        {history.map((entry, i) => (
          <div key={i} className="flex flex-col gap-[0.1rem]">
            {entry.type === 'input' && (
              <p className="flex items-center gap-1 text-[0.82rem]">
                <span className="text-[var(--clr-accent)] mr-[2px]">→</span>
                <span className="text-[#28ca41] font-semibold"> ~ </span>
                <span className="text-[rgba(220,220,240,0.9)]">{entry.lines[0]}</span>
              </p>
            )}
            {(entry.type === 'output' || entry.type === 'system') &&
              entry.lines.map((line, j) => (
                <p
                  key={j}
                  className="text-[rgba(200,200,220,0.8)] whitespace-pre-wrap leading-[1.6]"
                  style={getLineStyle(entry, j)}
                >
                  {line || '\u00A0'}
                </p>
              ))}
            {entry.type === 'error' &&
              entry.lines.map((line, j) => (
                <p key={j} className="text-[#ff6b6b] whitespace-pre-wrap leading-[1.6]">
                  {line}
                </p>
              ))}
          </div>
        ))}

        {/* Active input line */}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[var(--clr-accent)] text-[0.9rem] mr-[2px]">→</span>
          <span className="text-[#28ca41] font-semibold text-[0.82rem]"> ~ </span>
          <span className="text-[rgba(220,220,240,0.9)] text-[0.82rem]">{inputVal}</span>
          {/* Blinking cursor */}
          <span
            className="inline-block w-[2px] h-[0.9em] bg-[var(--clr-accent)] ml-[1px] align-middle"
            style={{ animation: 'blink 1s step-end infinite' }}
            aria-hidden="true"
          />
        </div>

        {/* Hidden real input for keyboard capture */}
        <input
          ref={inputRef}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
          aria-label="Terminal input"
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            width: 1,
            height: 1,
          }}
        />
      </div>
    </div>
  );
}
