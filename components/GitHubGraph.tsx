'use client';
import { useRef, useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export default function GitHubGraph() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="github" className="py-20" style={{ background: 'var(--bg-2)' }}>
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-10">
                    <p className="section-label">🟩 Commit History</p>
                    <h2 className="text-3xl font-extrabold">GitHub <span className="gradient-text">Activity</span></h2>
                    <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                        Live contribution heatmap for{' '}
                        <a href="https://github.com/Kumaran18v" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>
                            @Kumaran18v
                        </a>
                    </p>
                </div>

                <div
                    ref={ref}
                    className="glass-card glow-border rounded-2xl p-6 flex justify-center overflow-x-auto transition-all duration-700"
                    style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
                >
                    {visible && (
                        <GitHubCalendar
                            username="Kumaran18v"
                            colorScheme="dark"
                            fontSize={12}
                            blockSize={13}
                            blockMargin={4}
                            theme={{
                                dark: ['#161b22', '#1f2937', '#4c1d95', '#7c3aed', '#a78bfa'],
                            }}
                        />
                    )}
                </div>

                <div className="flex justify-center mt-5">
                    <a
                        href="https://github.com/Kumaran18v"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline text-sm"
                    >
                        View GitHub Profile ↗
                    </a>
                </div>
            </div>
        </section>
    );
}
