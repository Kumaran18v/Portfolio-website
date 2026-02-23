'use client';
import { useRef, useEffect, useState } from 'react';

const items = [
    { name: 'React Native', icon: '📱', desc: 'Mobile dev for cross-platform apps', pct: 30 },
    { name: 'Docker', icon: '🐳', desc: 'Containerisation & deployment', pct: 35 },
    { name: 'AWS Cloud', icon: '☁️', desc: 'EC2, S3, Lambda basics', pct: 25 },
    { name: 'Next.js', icon: '▲', desc: 'Full-stack React framework (this site)', pct: 60 },
    { name: 'TypeScript', icon: '🔷', desc: 'Typed JavaScript for scale', pct: 55 },
    { name: 'FastAPI', icon: '⚡', desc: 'High-performance Python API', pct: 65 },
];

export default function CurrentlyLearning() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="learning" className="py-24" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-14">
                    <p className="section-label">📚 Always Growing</p>
                    <h2 className="text-4xl font-extrabold">Currently <span className="gradient-text">Learning</span></h2>
                    <p className="mt-3 text-sm max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
                        Technologies I&apos;m actively exploring to stay ahead of the curve.
                    </p>
                </div>

                <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {items.map((item, i) => (
                        <div key={item.name}
                            className="glass-card glow-border rounded-2xl p-6 transition-all duration-700"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                                transitionDelay: `${i * 100}ms`,
                            }}
                        >
                            <div className="text-3xl mb-3">{item.icon}</div>
                            <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                            {/* Progress */}
                            <div className="flex items-center justify-between text-xs mb-1.5">
                                <span style={{ color: 'var(--text-dim)' }}>Progress</span>
                                <span style={{ color: 'var(--accent)' }} className="font-mono">{item.pct}%</span>
                            </div>
                            <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                        width: visible ? `${item.pct}%` : '0%',
                                        background: 'linear-gradient(90deg, #7c6af5, #c084fc)',
                                        transitionDelay: `${i * 100 + 300}ms`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
