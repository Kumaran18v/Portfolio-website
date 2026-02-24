'use client';
import { useRef, useEffect, useState } from 'react';
import { certifications } from '@/lib/data';
import { Award } from 'lucide-react';

export default function Certifications() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="certifications" className="py-24" style={{ background: 'var(--bg-2)' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <p className="section-label">My Growth</p>
                    <h2 className="text-4xl font-extrabold">Badges &amp; <span className="gradient-text">Achievements</span></h2>
                </div>

                <div ref={ref} className="max-w-3xl mx-auto">
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
                </div>
            </div>
        </section>
    );
}
