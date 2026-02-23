'use client';
import { useTheme } from '@/lib/theme';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
                background: 'var(--glass-bg)',
                border: '1.5px solid var(--border-2)',
                color: 'var(--text-muted)',
                backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
            }}
        >
            <span
                className="absolute transition-all duration-300"
                style={{ opacity: isDark ? 1 : 0, transform: isDark ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(90deg)' }}
            >
                <Moon size={17} />
            </span>
            <span
                className="absolute transition-all duration-300"
                style={{ opacity: isDark ? 0 : 1, transform: isDark ? 'scale(0) rotate(-90deg)' : 'scale(1) rotate(0deg)' }}
            >
                <Sun size={17} />
            </span>
        </button>
    );
}
