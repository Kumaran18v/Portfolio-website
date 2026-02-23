'use client';
import { useRef, useEffect, useState } from 'react';

const testimonials = [
    {
        name: 'Internship Supervisor',
        role: 'Data Science Lead',
        company: 'NDVTechsys Solutions',
        avatar: '👨‍💼',
        text: 'Kumaran demonstrated exceptional analytical skills during his internship. He quickly grasped complex ML concepts and delivered clean, well-documented Python code. His ability to automate data pipelines exceeded our expectations for a fresher.',
        stars: 5,
    },
    {
        name: 'Project Guide',
        role: 'Faculty Mentor',
        company: 'Panimalar Engineering College',
        avatar: '👩‍🏫',
        text: 'An outstanding student with a strong problem-solving mindset. His AI-based waste management project showed real-world applicability and technical depth. Kumaran always goes beyond the syllabus to explore new technologies.',
        stars: 5,
    },
    {
        name: 'Web Dev Mentor',
        role: 'Senior Developer',
        company: 'CODELEVATE',
        avatar: '👨‍💻',
        text: 'During his internship, Kumaran built production-quality responsive websites. He has a great eye for UI/UX and picks up new frameworks rapidly. His attention to performance and cross-browser compatibility was impressive.',
        stars: 5,
    },
];

function Stars({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5 mb-3">
            {Array.from({ length: count }).map((_, i) => (
                <span key={i} style={{ color: 'var(--yellow)' }}>★</span>
            ))}
        </div>
    );
}

export default function Testimonials() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="testimonials" className="py-24" style={{ background: 'var(--bg-2)' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-14">
                    <p className="section-label">💬 Kind Words</p>
                    <h2 className="text-4xl font-extrabold">What People <span className="gradient-text">Say</span></h2>
                </div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div key={t.name}
                            className="glass-card glow-border rounded-2xl p-6 flex flex-col transition-all duration-700"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                                transitionDelay: `${i * 120}ms`,
                            }}
                        >
                            {/* Quote mark */}
                            <div className="text-4xl leading-none mb-4" style={{ color: 'var(--accent)', opacity: 0.4 }}>&ldquo;</div>
                            <Stars count={t.stars} />
                            <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--text-muted)' }}>{t.text}</p>
                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                                    style={{ background: 'rgba(124,106,245,0.12)', border: '1px solid rgba(124,106,245,0.2)' }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{t.name}</p>
                                    <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{t.role} · {t.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
