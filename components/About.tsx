'use client';
import { useEffect, useRef, useState } from 'react';
import { stats, softSkills } from '@/lib/data';
import { Download, MapPin } from 'lucide-react';

function useCounter(target: number, duration = 1600, active = false) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!active) return;
        let start: number;
        const step = (ts: number) => {
            if (!start) start = ts;
            const pct = Math.min((ts - start) / duration, 1);
            setVal(Math.floor(pct * target * 10) / 10);
            if (pct < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [active, target, duration]);
    return val;
}

function StatCard({ label, value, suffix, active }: { label: string; value: number; suffix: string; active: boolean }) {
    const animated = useCounter(value, 1500, active);
    const display = Number.isInteger(value) ? Math.round(animated) : animated.toFixed(1);
    return (
        <div className="glass-card glow-border rounded-xl p-4 text-center">
            <div className="text-2xl font-black gradient-text">{display}{suffix}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
        </div>
    );
}

export default function About() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="about" className="py-24" style={{ background: 'var(--bg-2)' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="section-label">01. Who I Am</p>
                    <h2 className="text-4xl font-extrabold">About <span className="gradient-text">Me</span></h2>
                </div>

                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                    {/* Photo with animated ring */}
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="relative w-fit">
                            {/* Animated gradient ring */}
                            <div
                                className="absolute -inset-3 rounded-[22px] pointer-events-none"
                                style={{
                                    background: 'conic-gradient(from 0deg, #7c6af5, #c084fc, #34d399, #7c6af5)',
                                    animation: 'spin-slow 6s linear infinite',
                                    opacity: 0.55,
                                    filter: 'blur(4px)',
                                }}
                            />
                            {/* White ring spacer */}
                            <div className="relative rounded-2xl overflow-hidden" style={{ border: '3px solid var(--bg-2)', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/kumaran-profile.jpg"
                                    alt="Kumaran K – Software Developer"
                                    className="w-72 h-80 object-cover block"
                                    style={{ objectPosition: 'center top' }}
                                />
                            </div>
                            {/* Location badge */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs font-medium px-4 py-1.5 rounded-full whitespace-nowrap"
                                style={{ background: 'var(--bg)', border: '1px solid var(--border-2)', boxShadow: '0 4px 16px var(--shadow)' }}>
                                <MapPin size={12} style={{ color: 'var(--accent)' }} />
                                Arakkonam, Tamil Nadu 🇮🇳
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <h3 className="text-2xl font-bold mb-4">
                            Hello! I&apos;m Kumaran K <span>👋</span>
                        </h3>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                            I&apos;m a final-year Computer Science and Engineering student at{' '}
                            <strong style={{ color: 'var(--text)' }}>Panimalar Engineering College</strong>, with a strong foundation in DSA, Data Analytics,
                            Machine Learning, Java, Python, and Web Development.
                        </p>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                            I&apos;ve completed 3 internships in data analysis and web development, built real-world projects,
                            and earned 9+ certifications from platforms like NPTEL, Infosys Springboard, Oracle, and Udemy.
                            I&apos;m seeking entry-level Software Engineer or Data Analyst roles.
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {['Fresh Graduate 🎓', 'Web Dev 🌐', 'Data Analytics 📊', 'ML Enthusiast 🤖', 'Code & Coffee ☕'].map(tag => (
                                <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-medium"
                                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-2)', color: 'var(--text-muted)' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-3 mb-6">
                            {stats.map(s => (
                                <StatCard key={s.label} label={s.label} value={s.value} suffix={s.suffix} active={visible} />
                            ))}
                        </div>

                        {/* Soft Skills */}
                        <div className="mb-6">
                            <p className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: 'var(--text-dim)' }}>Soft Skills</p>
                            <div className="flex flex-wrap gap-2">
                                {softSkills.map(s => (
                                    <span key={s} className="text-xs px-2.5 py-1 rounded-md"
                                        style={{ background: 'rgba(124,106,245,0.08)', border: '1px solid rgba(124,106,245,0.2)', color: 'var(--accent-2)' }}>
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <a href="/resume.pdf" download="Kumaran_K_Resume.pdf" className="btn-primary">
                            <Download size={17} /> Download Resume
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
