'use client';
import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { personal } from '@/lib/data';
import { X, Terminal } from 'lucide-react';

type Line = { type: 'input' | 'output' | 'error' | 'success' | 'info'; text: string };

const BANNER = [
    { type: 'info' as const, text: '╔══════════════════════════════════════╗' },
    { type: 'info' as const, text: '║   Kumaran K — Interactive Terminal   ║' },
    { type: 'info' as const, text: '╚══════════════════════════════════════╝' },
    { type: 'output' as const, text: "Type 'help' to see available commands." },
    { type: 'output' as const, text: '' },
];

const COMMANDS: Record<string, (args: string[]) => Line[]> = {
    help: () => [
        { type: 'output', text: '' },
        { type: 'info', text: '┌─ Available Commands ──────────────────┐' },
        { type: 'output', text: '  whoami        → About me' },
        { type: 'output', text: '  skills        → Tech stack' },
        { type: 'output', text: '  projects      → My GitHub projects' },
        { type: 'output', text: '  experience    → Internships' },
        { type: 'output', text: '  education     → Academic background' },
        { type: 'output', text: '  contact       → Get in touch' },
        { type: 'output', text: '  status        → Hire me?' },
        { type: 'output', text: '  social        → Links' },
        { type: 'output', text: '  sudo hire me  → 🎉' },
        { type: 'output', text: '  clear         → Clear terminal' },
        { type: 'output', text: '  exit          → Close terminal' },
        { type: 'info', text: '└───────────────────────────────────────┘' },
        { type: 'output', text: '' },
    ],
    whoami: () => [
        { type: 'output', text: '' },
        { type: 'success', text: '👤 Kumaran K' },
        { type: 'output', text: '   Role     : CSE Student & Software Developer' },
        { type: 'output', text: '   College  : Panimalar Engineering College' },
        { type: 'output', text: '   CGPA     : 8.5 / 10' },
        { type: 'output', text: '   Location : Arakkonam, Tamil Nadu 🇮🇳' },
        { type: 'output', text: '   Goal     : Entry-level SWE / Data Analyst' },
        { type: 'output', text: '' },
    ],
    skills: () => [
        { type: 'output', text: '' },
        { type: 'info', text: '⚡ Tech Stack' },
        { type: 'output', text: '   Languages  : Python, Java, JavaScript, C' },
        { type: 'output', text: '   Frontend   : React.js, Next.js, HTML, Tailwind CSS' },
        { type: 'output', text: '   Backend    : Node.js, Express.js, FastAPI' },
        { type: 'output', text: '   Database   : MySQL, MongoDB, Oracle' },
        { type: 'output', text: '   Data       : Power BI, Pandas, NumPy, Excel' },
        { type: 'output', text: '   Tools      : Git, GitHub, VS Code' },
        { type: 'output', text: '' },
    ],
    projects: () => [
        { type: 'output', text: '' },
        { type: 'info', text: '🛠  Projects (10 total)' },
        { type: 'success', text: '   1. AI Smart Waste Reporting System' },
        { type: 'output', text: '      → github.com/Kumaran18v/smart-waste-reporting-system' },
        { type: 'success', text: '   2. JobCheck – Fake Job Detection (NLP)' },
        { type: 'output', text: '      → github.com/Kumaran18v/Fake-Job-Detection-using-NLP' },
        { type: 'success', text: '   3. Recipe Planner AI' },
        { type: 'output', text: '      → github.com/Kumaran18v/Recipe-planner  [Live ↗]' },
        { type: 'output', text: '   + 7 more → github.com/Kumaran18v' },
        { type: 'output', text: '' },
    ],
    experience: () => [
        { type: 'output', text: '' },
        { type: 'info', text: '💼 Internships (3)' },
        { type: 'success', text: '   NDVTechsys Solutions  — Data Expert Intern (2 months)' },
        { type: 'success', text: '   Edunet Foundation    — Data Analysis Intern (1 month)' },
        { type: 'success', text: '   CODELEVATE          — Web Development Intern (6 weeks)' },
        { type: 'output', text: '' },
    ],
    education: () => [
        { type: 'output', text: '' },
        { type: 'info', text: '🎓 Education' },
        { type: 'success', text: '   B.E. CSE — Panimalar Engineering College (2023–2027)' },
        { type: 'output', text: '   CGPA: 8.5 | Python, Java, DSA, DBMS, Web Dev' },
        { type: 'output', text: '   Class XII — Royal Matric HSS (2023) — 86.6%' },
        { type: 'output', text: '   Class X   — Royal Matric HSS (2021) — 100%' },
        { type: 'output', text: '' },
        { type: 'info', text: '🏅 Certifications (9)' },
        { type: 'output', text: '   Oracle GenAI, NPTEL ML, Power BI, Infosys, NASSCOM…' },
        { type: 'output', text: '' },
    ],
    contact: () => [
        { type: 'output', text: '' },
        { type: 'info', text: '📬 Contact' },
        { type: 'success', text: `   Email   : ${personal.email}` },
        { type: 'success', text: `   Phone   : +91 ${personal.phone}` },
        { type: 'output', text: `   GitHub  : https://github.com/Kumaran18v` },
        { type: 'output', text: `   LinkedIn: ${personal.linkedin}` },
        { type: 'output', text: `   LeetCode: ${personal.leetcode}` },
        { type: 'output', text: '' },
    ],
    social: () => [
        { type: 'output', text: '' },
        { type: 'output', text: '   🐙 GitHub   → https://github.com/Kumaran18v' },
        { type: 'output', text: '   💼 LinkedIn → https://linkedin.com/in/kumaran-k-636404293' },
        { type: 'output', text: '   🧩 LeetCode → https://leetcode.com/u/Kumaran18v/' },
        { type: 'output', text: '' },
    ],
    status: () => [
        { type: 'output', text: '' },
        { type: 'success', text: '🟢 Status: ACTIVELY LOOKING' },
        { type: 'output', text: '   Available   : From May 2027' },
        { type: 'output', text: '   Location    : Chennai / Remote preferred' },
        { type: 'output', text: '   Role        : SWE / Data Analyst / Full-Stack Dev' },
        { type: 'output', text: '   Open to     : Internships & Full-time roles' },
        { type: 'output', text: '' },
    ],
};

function processCommand(raw: string): { lines: Line[]; shouldClear?: boolean; shouldClose?: boolean } {
    const trimmed = raw.trim().toLowerCase();
    if (!trimmed) return { lines: [] };
    if (trimmed === 'clear') return { lines: [], shouldClear: true };
    if (trimmed === 'exit') return { lines: [], shouldClose: true };
    if (trimmed === 'sudo hire me') {
        return {
            lines: [
                { type: 'output', text: '' },
                { type: 'success', text: '🎉 CONGRATULATIONS! You just hired Kumaran K!' },
                { type: 'success', text: '   Processing offer letter… ██████████ 100%' },
                { type: 'output', text: '   → Please reach out at kumaran18v@gmail.com' },
                { type: 'output', text: '   → Or call +91 9080879920' },
                { type: 'output', text: '' },
            ],
        };
    }
    const fn = COMMANDS[trimmed];
    if (fn) return { lines: fn([]) };
    return {
        lines: [
            { type: 'error', text: `bash: ${trimmed}: command not found. Type 'help' for commands.` },
        ],
    };
}

export default function TerminalEgg() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Line[]>([...BANNER]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Open on ` key press
    useEffect(() => {
        const handler = (e: globalThis.KeyboardEvent) => {
            if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
                const tag = (e.target as HTMLElement).tagName;
                if (tag === 'INPUT' || tag === 'TEXTAREA') return;
                e.preventDefault();
                setOpen(o => !o);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 80);
        }
    }, [open]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const submit = () => {
        if (!input.trim() && input !== '') { setInput(''); return; }
        const cmd = input;
        setHistory(h => [...h, { type: 'input', text: `kumaran@portfolio:~$ ${cmd}` }]);
        setCmdHistory(h => [cmd, ...h]);
        setHistoryIdx(-1);

        const { lines, shouldClear, shouldClose } = processCommand(cmd);
        if (shouldClear) {
            setHistory([...BANNER]);
        } else if (shouldClose) {
            setOpen(false);
        } else {
            setHistory(h => [...h, ...lines]);
        }
        setInput('');
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { submit(); return; }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const next = historyIdx + 1;
            if (next < cmdHistory.length) { setHistoryIdx(next); setInput(cmdHistory[next]); }
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = historyIdx - 1;
            if (next < 0) { setHistoryIdx(-1); setInput(''); }
            else { setHistoryIdx(next); setInput(cmdHistory[next]); }
        }
        if (e.key === 'Escape') { setOpen(false); }
    };

    const lineColor = (type: Line['type']) => {
        switch (type) {
            case 'input': return '#c084fc';
            case 'success': return '#34d399';
            case 'error': return '#f87171';
            case 'info': return '#7c6af5';
            default: return 'rgba(255,255,255,0.78)';
        }
    };

    return (
        <>
            {/* Hint tooltip */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-8 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all duration-200 hover:scale-105"
                    style={{
                        background: 'rgba(22,25,41,0.92)',
                        border: '1px solid rgba(124,106,245,0.35)',
                        color: 'rgba(255,255,255,0.55)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    }}
                    title="Open Terminal"
                >
                    <Terminal size={12} style={{ color: '#7c6af5' }} />
                    Press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: 4, color: 'white' }}>`</kbd>
                </button>
            )}

            {/* Terminal modal */}
            {open && (
                <div
                    className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4 sm:p-8"
                    style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="w-full max-w-2xl rounded-2xl overflow-hidden"
                        style={{
                            background: '#0d1117',
                            border: '1px solid rgba(124,106,245,0.4)',
                            boxShadow: '0 0 0 1px rgba(124,106,245,0.1), 0 32px 80px rgba(0,0,0,0.8)',
                            height: '480px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Title bar */}
                        <div className="flex items-center gap-2 px-4 py-2.5 shrink-0" style={{ background: '#161b22', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                            <button onClick={() => setOpen(false)} className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                            <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                            <div className="w-3 h-3 rounded-full" style={{ background: '#28ca41' }} />
                            <div className="flex-1 text-center text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                kumaran@portfolio:~
                            </div>
                            <X size={13} className="cursor-pointer" style={{ color: 'rgba(255,255,255,0.35)' }} onClick={() => setOpen(false)} />
                        </div>

                        {/* Output */}
                        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-6" style={{ color: 'rgba(255,255,255,0.78)' }}>
                            {history.map((line, i) => (
                                <div key={i} style={{ color: lineColor(line.type), whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                    {line.text}
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input row */}
                        <div className="flex items-center gap-2 px-4 py-3 shrink-0" style={{ background: '#161b22', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                            <span className="font-mono text-xs shrink-0" style={{ color: '#7c6af5' }}>kumaran@portfolio:~$</span>
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                className="flex-1 bg-transparent outline-none font-mono text-xs"
                                style={{ color: '#c084fc', caretColor: '#c084fc' }}
                                placeholder="type a command…"
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
