'use client';
import { useEffect, useState } from 'react';
import { personal } from '@/lib/data';
import { Mail, Github, Linkedin, Code, FileText } from 'lucide-react';
import ResumeModal from './ResumeModal';

const typingPhrases = [
    'Software Developer',
    'Data Analyst',
    'ML Enthusiast',
    'Web Developer',
    'Problem Solver',
];

function useTypingEffect(phrases: string[], speed = 80, pause = 1800) {
    const [display, setDisplay] = useState('');
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = phrases[phraseIdx];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && charIdx < current.length) {
            timeout = setTimeout(() => setCharIdx(i => i + 1), speed);
        } else if (!deleting && charIdx === current.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIdx > 0) {
            timeout = setTimeout(() => setCharIdx(i => i - 1), speed / 2);
        } else if (deleting && charIdx === 0) {
            // eslint-disable-next-line
            setDeleting(false);
            setPhraseIdx(i => (i + 1) % phrases.length);
        }

        setDisplay(current.slice(0, charIdx));
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

    return display;
}

export default function Hero() {
    const typedText = useTypingEffect(typingPhrases);
    const [resumeOpen, setResumeOpen] = useState(false);

    return (
        <>
            <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
            <section
                id="hero"
                className="min-h-screen flex items-center relative overflow-hidden noise"
                style={{ padding: '120px 24px 80px' }}
            >
                {/* Background decorations */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0" style={{
                        background: `radial-gradient(ellipse 70% 55% at 65% 35%, var(--accent-glow) 0%, transparent 70%),
                         radial-gradient(ellipse 50% 40% at 20% 70%, rgba(147,51,234,0.08) 0%, transparent 70%)`,
                    }} />
                    {/* Grid */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
                        backgroundSize: '64px 64px',
                        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
                    }} />
                    {/* Floating blobs */}
                    <div className="absolute rounded-full" style={{ width: 300, height: 300, top: '8%', right: '15%', background: 'var(--accent-glow)', filter: 'blur(70px)', animation: 'float 8s ease-in-out infinite' }} />
                    <div className="absolute rounded-full" style={{ width: 220, height: 220, bottom: '18%', left: '5%', background: 'rgba(147,51,234,0.07)', filter: 'blur(70px)', animation: 'float 11s ease-in-out infinite', animationDelay: '-3s' }} />
                </div>

                <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">
                    {/* Left */}
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-sm font-medium"
                            style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', color: 'var(--green)' }}>
                            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--green)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                            Open to full-time &amp; internship opportunities
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-3">
                            Hi, I&apos;m{' '}
                            <span className="gradient-text">Kumaran K</span>
                        </h1>

                        {/* Typing subtitle */}
                        <h2 className="text-2xl lg:text-3xl font-light mb-5 h-9 flex items-center" style={{ color: 'var(--text-muted)' }}>
                            {typedText}
                            <span className="ml-0.5 inline-block w-0.5 h-7 rounded-full" style={{ background: 'var(--accent)', animation: 'blink 1s step-end infinite' }} />
                        </h2>

                        <p className="text-base leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--text-muted)' }}>
                            Final-year CSE student at <strong style={{ color: 'var(--text)' }}>Panimalar Engineering College</strong> (CGPA 8.5),
                            passionate about web development, data analytics, and ML — building real-world applications one project at a time.
                        </p>

                        <div className="flex gap-4 flex-wrap mb-8">
                            <a href="#projects" className="btn-primary">
                                <Code size={17} />
                                View Projects
                            </a>
                            <button onClick={() => setResumeOpen(true)} className="btn-outline">
                                <FileText size={17} />
                                View Resume
                            </button>
                            <a href="#contact" className="btn-outline">
                                <Mail size={17} />
                                Contact Me
                            </a>
                        </div>

                        {/* Social Row */}
                        <div className="flex items-center gap-4">
                            <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>Find me on</span>
                            <div className="flex gap-3">
                                {[
                                    { href: personal.github, Icon: Github, label: 'GitHub' },
                                    { href: personal.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                                ].map(({ href, Icon, label }) => (
                                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                                        style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-2)', color: 'var(--text-muted)' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)'; }}>
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right – code window */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="rounded-2xl overflow-hidden w-full max-w-md"
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-2)',
                                boxShadow: '0 32px 80px var(--shadow), 0 0 0 1px var(--border)',
                                backdropFilter: 'blur(12px)',
                                animation: 'float 6s ease-in-out infinite',
                            }}>
                            <div className="flex items-center gap-2 px-4 py-3.5" style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border)' }}>
                                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                <span className="w-3 h-3 rounded-full bg-[#28ca41]" />
                                <span className="ml-3 text-xs" style={{ fontFamily: 'var(--mono)', color: 'var(--text-dim)' }}>about_kumaran.ts</span>
                            </div>
                            <pre className="p-6 text-sm leading-8 overflow-x-auto" style={{ fontFamily: 'var(--mono)' }}>
                                <code><span style={{ color: '#c792ea' }}>const</span> <span style={{ color: '#82aaff' }}>kumaran</span> {`= {`}
                                    <span style={{ color: '#7cb8ff' }}>name</span>: <span style={{ color: '#c3e88d' }}>&quot;Kumaran K&quot;</span>,
                                    <span style={{ color: '#7cb8ff' }}>college</span>: <span style={{ color: '#c3e88d' }}>&quot;Panimalar Engg.&quot;</span>,
                                    <span style={{ color: '#7cb8ff' }}>cgpa</span>: <span style={{ color: '#f78c6c' }}>8.5</span>,
                                    <span style={{ color: '#7cb8ff' }}>status</span>: <span style={{ color: '#c3e88d' }}>&quot;Fresher 🎓&quot;</span>,
                                    <span style={{ color: '#7cb8ff' }}>passion</span>: [
                                    <span style={{ color: '#c3e88d' }}>&quot;Web Dev&quot;</span>,
                                    <span style={{ color: '#c3e88d' }}>&quot;Data Analytics&quot;</span>,
                                    <span style={{ color: '#c3e88d' }}>&quot;Machine Learning&quot;</span>,
                                    ],
                                    <span style={{ color: '#7cb8ff' }}>openToWork</span>: <span style={{ color: '#ff9cac' }}>true</span>,
                                    {`};`}</code>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'var(--text-dim)' }}>
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor: 'var(--text-dim)' }}>
                        <div className="w-1 h-2 rounded-full" style={{ background: 'var(--accent)', animation: 'scroll-bounce 1.5s ease-in-out infinite' }} />
                    </div>
                </div>
            </section>
        </>
    );
}
