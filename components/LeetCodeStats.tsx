'use client';
import { useEffect, useRef, useState } from 'react';
import { Trophy, ExternalLink } from 'lucide-react';

interface LCStats {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    totalQuestions: number;
    ranking: number;
}

const FALLBACK: LCStats = {
    totalSolved: 150,
    easySolved: 80,
    mediumSolved: 60,
    hardSolved: 10,
    totalQuestions: 3500,
    ranking: 350000,
};

export default function LeetCode() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [stats, setStats] = useState<LCStats>(FALLBACK);

    useEffect(() => {
        fetch('https://leetcode-stats-api.herokuapp.com/Kumaran18v')
            .then(r => r.json())
            .then((d: LCStats) => {
                if (d.totalSolved) setStats(d);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const circles = [
        { label: 'Easy', count: stats.easySolved, color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
        { label: 'Medium', count: stats.mediumSolved, color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
        { label: 'Hard', count: stats.hardSolved, color: '#f87171', bg: 'rgba(248,113,113,0.1)' },
    ];

    return (
        <section id="leetcode" className="py-20" style={{ background: 'var(--bg)' }}>
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-10">
                    <p className="section-label">🧩 Problem Solving</p>
                    <h2 className="text-3xl font-extrabold">LeetCode <span className="gradient-text">Stats</span></h2>
                    <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                        Consistent problem-solver on{' '}
                        <a href="https://leetcode.com/u/Kumaran18v/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>
                            LeetCode
                        </a>
                    </p>
                </div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Total solved big card */}
                    <div
                        className="glass-card glow-border rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all duration-700"
                        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
                    >
                        <div
                            className="relative flex items-center justify-center rounded-full"
                            style={{ width: 140, height: 140 }}
                        >
                            <svg className="absolute inset-0" viewBox="0 0 140 140" fill="none">
                                <circle cx="70" cy="70" r="60" stroke="var(--border)" strokeWidth="10" />
                                <circle
                                    cx="70" cy="70" r="60"
                                    stroke="url(#lcGrad)"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(stats.totalSolved / stats.totalQuestions) * 376} 376`}
                                    strokeDashoffset="94"
                                    transform="rotate(-90 70 70)"
                                    style={{ transition: 'stroke-dasharray 1.5s ease' }}
                                />
                                <defs>
                                    <linearGradient id="lcGrad" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#7c6af5" />
                                        <stop offset="100%" stopColor="#c084fc" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="text-center z-10">
                                <div className="text-3xl font-black gradient-text">{stats.totalSolved}</div>
                                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Solved</div>
                            </div>
                        </div>
                        <p className="text-sm font-medium">of {stats.totalQuestions.toLocaleString()} problems</p>
                        {stats.ranking > 0 && (
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                                <Trophy size={12} style={{ color: 'var(--yellow)' }} />
                                Rank #{stats.ranking.toLocaleString()}
                            </div>
                        )}
                    </div>

                    {/* Difficulty breakdown */}
                    <div
                        className="glass-card glow-border rounded-2xl p-6 flex flex-col gap-4 justify-center transition-all duration-700"
                        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '100ms' }}
                    >
                        {circles.map(c => (
                            <div key={c.label} className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-semibold" style={{ color: c.color }}>{c.label}</span>
                                    <span className="font-mono font-bold">{c.count}</span>
                                </div>
                                <div className="h-2.5 rounded-full" style={{ background: 'var(--border)' }}>
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{
                                            width: visible ? `${Math.min((c.count / stats.totalSolved) * 100, 100)}%` : '0%',
                                            background: c.color,
                                            boxShadow: `0 0 8px ${c.color}80`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        <a
                            href="https://leetcode.com/u/Kumaran18v/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 justify-center mt-2 text-xs btn-outline !py-2"
                        >
                            <ExternalLink size={13} /> View LeetCode Profile
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
