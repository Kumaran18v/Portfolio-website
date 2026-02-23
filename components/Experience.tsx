'use client';
import { useRef, useEffect, useState } from 'react';
import { internships } from '@/lib/data';

export default function Experience() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="experience" className="py-24" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="section-label">Work History</p>
                    <h2 className="text-4xl font-extrabold">Internship <span className="gradient-text">Experience</span></h2>
                </div>

                <div ref={ref} className="max-w-3xl mx-auto relative">
                    {/* Timeline line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                        style={{ background: 'linear-gradient(180deg, var(--accent) 0%, transparent 100%)' }} />

                    <div className="flex flex-col gap-8">
                        {internships.map((item, i) => (
                            <div key={item.company} className="grid pl-10 relative"
                                style={{
                                    transitionDelay: `${i * 120}ms`,
                                    transition: 'all 0.7s ease',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                                }}>
                                {/* Dot */}
                                <div className="absolute left-[-6px] top-6 w-3.5 h-3.5 rounded-full z-10"
                                    style={{ background: 'var(--accent)', border: '3px solid var(--bg)', boxShadow: '0 0 12px var(--accent-glow)' }} />

                                <div className="rounded-2xl p-6 transition-all duration-200"
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = ''; }}>
                                    <div className="flex flex-wrap justify-between gap-3 mb-4">
                                        <div>
                                            <h3 className="font-bold text-base">{item.role}</h3>
                                            <p className="text-sm mt-0.5" style={{ color: 'var(--accent)' }}>{item.company}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{item.duration}</span>
                                            <span className="text-xs uppercase tracking-wide px-2 py-0.5 rounded"
                                                style={{ background: 'rgba(124,106,245,0.12)', color: 'var(--accent-2)' }}>
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                    <ul className="flex flex-col gap-2 mb-4">
                                        {item.highlights.map(h => (
                                            <li key={h} className="flex gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                                                <span style={{ color: 'var(--accent)' }} className="shrink-0 mt-0.5">▹</span> {h}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.tags.map(t => (
                                            <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
                                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-dim)' }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
