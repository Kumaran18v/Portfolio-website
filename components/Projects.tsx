'use client';
import { useState, useRef, useCallback } from 'react';
import { projects } from '@/lib/data';
import { Github, ExternalLink } from 'lucide-react';

type FilterKey = 'All' | 'AI/ML' | 'Full-Stack' | 'Data' | 'Frontend' | 'Python';
const filters: FilterKey[] = ['All', 'AI/ML', 'Full-Stack', 'Data', 'Frontend', 'Python'];
const categoryMap: Record<FilterKey, string[]> = {
    'All': ['ai', 'fullstack', 'data', 'frontend', 'python'],
    'AI/ML': ['ai'], 'Full-Stack': ['fullstack'], 'Data': ['data'], 'Frontend': ['frontend'], 'Python': ['python'],
};
const categoryLabel: Record<string, string> = { ai: 'AI / ML', fullstack: 'Full-Stack', data: 'Data', frontend: 'Frontend', python: 'Python' };
const categoryColor: Record<string, { bg: string; text: string; border: string }> = {
    ai: { bg: 'rgba(167,114,250,0.12)', text: '#c084fc', border: 'rgba(167,114,250,0.25)' },
    fullstack: { bg: 'rgba(251,146,60,0.12)', text: '#fb923c', border: 'rgba(251,146,60,0.25)' },
    data: { bg: 'rgba(52,211,153,0.10)', text: '#34d399', border: 'rgba(52,211,153,0.25)' },
    frontend: { bg: 'rgba(96,165,250,0.12)', text: '#60a5fa', border: 'rgba(96,165,250,0.25)' },
    python: { bg: 'rgba(251,191,36,0.10)', text: '#fbbf24', border: 'rgba(251,191,36,0.25)' },
};

function ProjectIcon({ category }: { category: string }) {
    const props = { width: 44, height: 44, viewBox: '0 0 24 24', fill: 'none', stroke: 'rgba(255,255,255,0.75)', strokeWidth: '1.5' };
    if (category === 'ai') return <svg {...props}><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm5 11H7a1 1 0 0 1 0-2h1.4a4 4 0 0 1 7.2 0H17a1 1 0 0 1 0 2z" /></svg>;
    if (category === 'fullstack') return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>;
    if (category === 'data') return <svg {...props}><path d="M18 20V10M12 20V4M6 20v-6" /></svg>;
    if (category === 'frontend') return <svg {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
    return <svg {...props}><path d="M12 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8z" /></svg>;
}

/* 3-D tilt card hook */
function useTilt() {
    const ref = useRef<HTMLElement>(null);
    const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const el = ref.current;
        if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 14;
        const y = ((e.clientY - top) / height - 0.5) * -14;
        el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    }, []);
    const onLeave = useCallback(() => {
        if (ref.current) ref.current.style.transform = '';
    }, []);
    return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

export default function Projects() {
    const [active, setActive] = useState<FilterKey>('All');
    const gridRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    // Use a ref callback instead of useEffect for SSR safety
    const setGridRef = useCallback((node: HTMLDivElement | null) => {
        (gridRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (!node) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
        obs.observe(node);
    }, []);

    const filtered = projects.filter(p => categoryMap[active].includes(p.category));

    return (
        <section id="projects" className="py-24" style={{ background: 'var(--bg-2)' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="section-label">🛠 What I&apos;ve Built</p>
                    <h2 className="text-4xl font-extrabold">My <span className="gradient-text">Projects</span></h2>
                    <p className="mt-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                        {projects.length} projects on{' '}
                        <a href="https://github.com/Kumaran18v" target="_blank" rel="noopener noreferrer"
                            className="underline underline-offset-2" style={{ color: 'var(--accent-2)' }}>
                            GitHub ↗
                        </a>
                    </p>
                </div>

                {/* Filter buttons */}
                <div className="flex justify-center flex-wrap gap-2 mb-12">
                    {filters.map(f => (
                        <button key={f} onClick={() => setActive(f)}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                            style={
                                active === f
                                    ? { background: 'linear-gradient(135deg,#7c6af5,#9333ea)', color: 'white', border: '1.5px solid transparent', boxShadow: '0 0 20px rgba(124,106,245,0.35)' }
                                    : { background: 'transparent', color: 'var(--text-muted)', border: '1.5px solid var(--border)' }
                            }
                            onMouseEnter={e => { if (active !== f) { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; } }}
                            onMouseLeave={e => { if (active !== f) { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; } }}
                        >{f}</button>
                    ))}
                </div>

                {/* Grid with 3-D tilt cards */}
                <div ref={setGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((p, i) => (
                        <TiltCard key={p.title} p={p} i={i} visible={visible} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="https://github.com/Kumaran18v" target="_blank" rel="noopener noreferrer" className="btn-outline">
                        <Github size={17} /> View All on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}

function TiltCard({ p, i, visible }: { p: typeof projects[0]; i: number; visible: boolean }) {
    const { ref, onMouseMove, onMouseLeave } = useTilt();
    const colors = categoryColor[p.category] ?? categoryColor.frontend;

    return (
        <article
            ref={ref as React.RefObject<HTMLElement>}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={`rounded-2xl overflow-hidden group transition-all duration-700`}
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                transitionDelay: `${i * 80}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? '' : 'translateY(24px)',
                willChange: 'transform',
                transitionProperty: 'opacity, transform, box-shadow, border-color',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
        >
            {/* Banner */}
            <div className={`h-36 bg-gradient-to-br ${p.gradient} relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/15" />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-black/55">
                    {p.live !== '#' && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                            onClick={e => e.stopPropagation()}>
                            <ExternalLink size={12} /> Live Demo
                        </a>
                    )}
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-white/10 text-white border border-white/25 hover:bg-white/20 transition-colors"
                        onClick={e => e.stopPropagation()}>
                        <Github size={12} /> GitHub
                    </a>
                </div>
                <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <ProjectIcon category={p.category} />
                </div>
            </div>

            {/* Body */}
            <div className="p-5">
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                        style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                        {categoryLabel[p.category]}
                    </span>
                    {p.featured && (
                        <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(251,191,36,0.10)', color: 'var(--yellow)', border: '1px solid rgba(251,191,36,0.25)' }}>
                            ⭐ Featured
                        </span>
                    )}
                </div>
                <h3 className="text-sm font-bold mb-1.5 leading-snug">{p.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.slice(0, 5).map(t => (
                        <span key={t} className="text-xs px-1.5 py-0.5 rounded font-mono"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', color: 'var(--text-dim)' }}>
                            {t}
                        </span>
                    ))}
                </div>
                <div className="flex gap-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs transition-colors"
                        style={{ color: 'var(--text-dim)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-dim)'}>
                        <Github size={13} /> Code
                    </a>
                    {p.live !== '#' && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs transition-colors"
                            style={{ color: 'var(--text-dim)' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--green)'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-dim)'}>
                            <ExternalLink size={13} /> Live Demo
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
