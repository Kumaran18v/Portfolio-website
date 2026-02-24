'use client';
import { personal } from '@/lib/data';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const year = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="border-t border-white/7 bg-[var(--bg)] py-12 mt-0">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    <div>
                        <a href="#hero" className="text-xl font-black">
                            KK<span style={{ color: 'var(--accent)' }}>.</span>
                        </a>
                        <p className="text-sm text-[var(--text-dim)] mt-1">
                            Fresher developer — ready to build &amp; grow.
                        </p>
                    </div>
                    <nav className="flex flex-wrap gap-2 justify-center">
                        {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(item => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm text-[var(--text-dim)] hover:text-white px-3 py-1 rounded-lg transition-colors hover:bg-white/5"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                    <div className="flex gap-3">
                        <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                            className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-white/7 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
                            <Github size={18} />
                        </a>
                        <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                            className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-white/7 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
                            <Linkedin size={18} />
                        </a>
                        <a href={`mailto:${personal.email}`} aria-label="Email"
                            className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-white/7 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
                            <Mail size={18} />
                        </a>
                    </div>
                </div>
                <div className="h-px bg-white/7 mb-6" />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-dim)]">
                    <p>© {year} Kumaran K — Designed &amp; Developed with ❤️</p>
                    <a href="#hero" className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                        <ArrowUp size={13} /> Back to Top
                    </a>
                </div>
            </div>
        </footer>
    );
}
