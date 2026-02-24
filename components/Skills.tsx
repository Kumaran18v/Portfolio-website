'use client';
import { useEffect, useRef, useState } from 'react';
import { skills } from '@/lib/data';
import { Code2, Globe, BarChart2 } from 'lucide-react';
import { SiPython, SiJavascript, SiC, SiHtml5, SiReact, SiNodedotjs, SiExpress, SiMysql, SiPandas, SiOpenai } from 'react-icons/si';
import { FaJava, FaChartBar } from 'react-icons/fa';

const iconMap: Record<string, React.ReactNode> = {
    code: <Code2 size={22} />,
    globe: <Globe size={22} />,
    'bar-chart': <BarChart2 size={22} />,
};

const SkillLogo = ({ name }: { name: string }) => {
    switch (name.toLowerCase()) {
        case 'python': return <SiPython className="mr-2 opacity-80" />;
        case 'java': return <FaJava className="mr-2 opacity-80" />;
        case 'javascript': return <SiJavascript className="mr-2 opacity-80" />;
        case 'c': return <SiC className="mr-2 opacity-80" />;
        case 'html & css': return <SiHtml5 className="mr-2 opacity-80" />;
        case 'react.js': return <SiReact className="mr-2 opacity-80" />;
        case 'node.js / express': return <SiNodedotjs className="mr-2 opacity-80" />;
        case 'restful apis': return <SiExpress className="mr-2 opacity-80" />;
        case 'sql / mysql': return <SiMysql className="mr-2 opacity-80" />;
        case 'power bi': return <FaChartBar className="mr-2 opacity-80" />;
        case 'pandas / numpy': return <SiPandas className="mr-2 opacity-80" />;
        case 'genai & llms': return <SiOpenai className="mr-2 opacity-80" />;
        default: return null;
    }
};

const colorMap: Record<string, { bg: string; text: string; barFrom: string; barTo: string }> = {
    accent: { bg: 'rgba(124,106,245,0.12)', text: 'var(--accent)', barFrom: '#7c6af5', barTo: '#a78bfa' },
    green: { bg: 'rgba(52,211,153,0.10)', text: 'var(--green)', barFrom: '#34d399', barTo: '#10b981' },
    yellow: { bg: 'rgba(251,191,36,0.10)', text: 'var(--yellow)', barFrom: '#fbbf24', barTo: '#f59e0b' },
};

export default function Skills() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="skills" className="py-24" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="section-label">What I Know</p>
                    <h2 className="text-4xl font-extrabold">Tech <span className="gradient-text">Skills</span></h2>
                </div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {skills.map((cat, i) => {
                        const colors = colorMap[cat.color];
                        return (
                            <div key={cat.category}
                                className={`rounded-2xl p-7 transition-all duration-700 hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border)',
                                    transitionDelay: `${i * 120}ms`,
                                }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-2)')}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>

                                {/* Header */}
                                <div className="flex items-center gap-3 mb-7">
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: colors.bg, color: colors.text }}>
                                        {iconMap[cat.icon]}
                                    </div>
                                    <h3 className="font-bold text-base">{cat.category}</h3>
                                </div>

                                {/* Skill bars */}
                                <div className="flex flex-col gap-4 mb-6">
                                    {cat.items.map(item => (
                                        <div key={item.name}>
                                            <div className="flex justify-between items-center text-sm mb-1.5">
                                                <span style={{ color: 'var(--text-muted)' }} className="flex items-center">
                                                    <SkillLogo name={item.name} />
                                                    {item.name}
                                                </span>
                                                <span className="font-mono text-xs font-semibold" style={{ color: colors.text }}>{item.pct}%</span>
                                            </div>
                                            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                                                <div
                                                    className="h-full rounded-full transition-all duration-1000"
                                                    style={{
                                                        width: visible ? `${item.pct}%` : '0%',
                                                        background: `linear-gradient(90deg, ${colors.barFrom}, ${colors.barTo})`,
                                                        boxShadow: `0 0 8px ${colors.barFrom}66`,
                                                        transitionDelay: `${i * 120 + 200}ms`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-1.5">
                                    {cat.badges.map(b => (
                                        <span key={b} className="text-xs px-2 py-1 rounded-md font-mono transition-all duration-200 cursor-default"
                                            style={{ border: '1px solid var(--border-2)', color: 'var(--text-dim)' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = colors.text; (e.currentTarget as HTMLElement).style.color = colors.text; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-dim)'; }}>
                                            {b}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
