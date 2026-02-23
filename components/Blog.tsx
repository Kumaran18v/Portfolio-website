'use client';
import { useRef, useEffect, useState } from 'react';
import { Clock, ArrowRight, Tag } from 'lucide-react';

const posts = [
    {
        title: 'How I Built an AI Waste Reporting System with YOLOv8',
        excerpt: 'A deep dive into training a YOLOv8 model for real-time waste classification, building the web interface, and deploying it end-to-end.',
        tags: ['AI/ML', 'YOLOv8', 'Python'],
        date: 'Feb 2025',
        readTime: '6 min',
        gradient: 'from-violet-600 to-purple-700',
    },
    {
        title: 'Power BI Dashboard Tips: Analyzing Agricultural Data',
        excerpt: 'Practical lessons from creating an agricultural productivity dashboard — data cleaning, DAX formulas, and making charts that actually tell a story.',
        tags: ['Power BI', 'Data Analytics', 'Excel'],
        date: 'Jan 2025',
        readTime: '5 min',
        gradient: 'from-emerald-500 to-teal-600',
    },
    {
        title: 'My Journey with NLP: Building a Fake Job Detector',
        excerpt: 'From raw job posting text to a trained classifier — how I used scikit-learn, TF-IDF, and FastAPI to build JobCheck, an NLP-powered job fraud detector.',
        tags: ['NLP', 'FastAPI', 'scikit-learn'],
        date: 'Dec 2024',
        readTime: '8 min',
        gradient: 'from-rose-500 to-pink-600',
    },
];

export default function Blog() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="blog" className="py-24" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-14">
                    <p className="section-label">✍️ My Writing</p>
                    <h2 className="text-4xl font-extrabold">Blog & <span className="gradient-text">Articles</span></h2>
                    <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                        Documenting what I learn — project breakdowns, tech deep dives, and lessons from internships.
                    </p>
                </div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {posts.map((post, i) => (
                        <article key={post.title}
                            className="glass-card glow-border rounded-2xl overflow-hidden transition-all duration-700 group cursor-pointer"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                                transitionDelay: `${i * 100}ms`,
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
                        >
                            {/* Banner */}
                            <div className={`h-28 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                                    <span className="text-4xl opacity-30">✍️</span>
                                </div>
                            </div>
                            <div className="p-5">
                                {/* Meta */}
                                <div className="flex items-center gap-3 text-xs mb-3" style={{ color: 'var(--text-dim)' }}>
                                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} read</span>
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-purple-400 transition-colors">{post.title}</h3>
                                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{post.excerpt}</p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {post.tags.map(t => (
                                        <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
                                            style={{ background: 'rgba(124,106,245,0.08)', border: '1px solid rgba(124,106,245,0.18)', color: 'var(--accent-2)' }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <button className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                                    style={{ color: 'var(--accent)' }}>
                                    Read more <ArrowRight size={13} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="text-center">
                    <button className="btn-outline text-sm">View all articles ↗</button>
                </div>
            </div>
        </section>
    );
}
