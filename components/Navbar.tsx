'use client';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import ModeToggle from './ModeToggle';
import { Menu, X } from 'lucide-react';


const links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#learning', label: 'Learning' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const ids = links.map(l => l.href.slice(1));
        const observer = new IntersectionObserver(
            entries => {
                const found = entries.find(e => e.isIntersecting);
                if (found) setActive(found.target.id);
            },
            { threshold: 0.3 }
        );
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''
                }`}
            style={{ top: 38, ...(scrolled ? { background: 'rgba(11,12,20,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' } : {}) }}
        >
            <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center gap-6">
                <a href="#hero" className="text-xl font-black tracking-tight shrink-0">
                    KK<span style={{ color: 'var(--accent)' }}>.</span>
                </a>

                {/* Desktop links — scrollable */}
                <ul className="hidden lg:flex gap-0.5 ml-auto overflow-x-auto">
                    {links.map(l => (
                        <li key={l.href}>
                            <a
                                href={l.href}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap"
                                style={
                                    active === l.href.slice(1)
                                        ? { color: 'var(--accent)', background: 'rgba(124,106,245,0.1)' }
                                        : { color: 'var(--text-muted)' }
                                }
                                onMouseEnter={e => { if (active !== l.href.slice(1)) (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                                onMouseLeave={e => { if (active !== l.href.slice(1)) (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden lg:flex items-center gap-2 ml-2">
                    <ModeToggle />
                    <ThemeToggle />
                    <a href="#contact" className="btn-outline !py-2 !px-4 !text-xs">Hire Me</a>
                </div>

                {/* Mobile */}
                <div className="lg:hidden ml-auto flex items-center gap-2">
                    <ThemeToggle />
                    <button onClick={() => setOpen(o => !o)} className="p-2" style={{ color: 'var(--text-muted)' }} aria-label="Toggle menu">
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`lg:hidden fixed inset-0 top-[68px] flex flex-col items-center justify-center gap-5 transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ background: 'var(--bg)', backdropFilter: 'blur(24px)' }}
            >
                {links.map(l => (
                    <a
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="text-xl font-semibold transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                    >
                        {l.label}
                    </a>
                ))}
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2">Hire Me</a>
            </div>
        </nav>
    );
}
