'use client';
import { useRef, useEffect, useState } from 'react';
import { education, certifications } from '@/lib/data';
import { GraduationCap, Award } from 'lucide-react';

export default function Education() {
    const [tab, setTab] = useState<'edu' | 'cert'>('edu');
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="education" className="py-24" style={{ background: 'var(--bg-2)' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <p className="section-label">My Journey</p>
                    <h2 className="text-4xl font-extrabold">Education &amp; <span className="gradient-text">Certifications</span></h2>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-3 mb-12 flex-wrap">
                    {([['edu', 'Education', GraduationCap], ['cert', 'Badges & Achievements', Award]] as const).map(([key, label, Icon]) => (
                        <button key={key} onClick={() => setTab(key)}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                            style={tab === key
                                ? { background: 'linear-gradient(135deg, #7c6af5, #9333ea)', color: 'white', boxShadow: '0 0 20px rgba(124,106,245,0.35)', border: '1.5px solid transparent' }
                                : { background: 'transparent', color: 'var(--text-muted)', border: '1.5px solid var(--border)' }
                            }>
                            <Icon size={15} /> {label}
                        </button>
                    ))}
                </div>

                <div ref={ref} className="max-w-3xl mx-auto">
                    {tab === 'edu' && (
                        <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                                style={{ background: 'linear-gradient(180deg, var(--accent) 0%, transparent 100%)' }} />
                            <div className="flex flex-col gap-7">
                                {education.map((item, i) => (
                                    <div key={item.institution} className="pl-10 relative"
                                        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease ${i * 100}ms` }}>
                                        <div className="absolute left-[-6px] top-5 w-3.5 h-3.5 rounded-full z-10"
                                            style={{ background: 'var(--accent)', border: '3px solid var(--bg-2)', boxShadow: '0 0 10px var(--accent-glow)' }} />
                                        <div className="rounded-2xl p-6 transition-all duration-200"
                                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = ''; }}>
                                            <div className="flex flex-wrap justify-between gap-3 mb-3">
                                                <div>
                                                    <h3 className="font-bold text-sm leading-snug">{item.degree}</h3>
                                                    <p className="text-sm mt-0.5" style={{ color: 'var(--accent)' }}>{item.institution}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1 shrink-0">
                                                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{item.period}</span>
                                                    <span className="text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wide"
                                                        style={{ background: 'rgba(52,211,153,0.1)', color: 'var(--green)', border: '1px solid rgba(52,211,153,0.25)' }}>
                                                        {item.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--yellow)' }}>{item.detail}</p>
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
                    )}

                    {tab === 'cert' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {certifications.map((cert, i) => (
                                <div key={cert.name}
                                    className="rounded-2xl p-5 flex gap-4 items-start transition-all duration-200"
                                    style={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border)',
                                        opacity: visible ? 1 : 0,
                                        transform: visible ? 'translateY(0)' : 'translateY(16px)',
                                        transition: `all 0.5s ease ${i * 60}ms`,
                                    }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = ''; }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: 'rgba(124,106,245,0.12)', color: 'var(--accent)' }}>
                                        <Award size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold leading-snug mb-1">{cert.name}</h4>
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{cert.issuer}</p>
                                        <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--accent-2)' }}>{cert.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {tab === 'cert' && (
                    <div className="flex justify-center mt-12">
                        <a
                            href="https://drive.google.com/drive/folders/1pYRBkxgxcrJMHOWeH7YxcmCcYhwwtbiZ?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline text-sm flex items-center gap-2"
                        >
                            View All Certificates ↗
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
