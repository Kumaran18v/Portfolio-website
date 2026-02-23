'use client';
import { useState } from 'react';
import { X, Briefcase, Clock, MapPin } from 'lucide-react';

export default function StatusBar() {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-3 px-4"
            style={{
                height: 38,
                background: 'linear-gradient(90deg, #0f0c29, #302b63, #24243e)',
                borderBottom: '1px solid rgba(124,106,245,0.3)',
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.88)',
                letterSpacing: '0.01em',
            }}
        >
            {/* Pulsing dot */}
            <span className="w-2 h-2 rounded-full shrink-0" style={{
                background: '#34d399',
                boxShadow: '0 0 8px #34d399',
                animation: 'pulse-dot 2s ease-in-out infinite',
            }} />

            <div className="flex items-center gap-4 flex-wrap justify-center">
                <span className="font-semibold" style={{ color: '#34d399' }}>Status: Actively Looking</span>
                <span className="hidden sm:flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.55)' }}>·</span>
                <span className="hidden sm:flex items-center gap-1.5">
                    <Clock size={11} style={{ color: '#a78bfa' }} />
                    Available from <strong style={{ color: '#c084fc' }}>May 2027</strong>
                </span>
                <span className="hidden md:flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.55)' }}>·</span>
                <span className="hidden md:flex items-center gap-1.5">
                    <Briefcase size={11} style={{ color: '#a78bfa' }} />
                    Preferred: <strong style={{ color: '#c084fc' }}>Chennai / Remote</strong>
                </span>
                <span className="hidden lg:flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.55)' }}>·</span>
                <span className="hidden lg:flex items-center gap-1.5">
                    <MapPin size={11} style={{ color: '#a78bfa' }} />
                    <strong style={{ color: '#c084fc' }}>Software Engineer / Data Analyst</strong>
                </span>
            </div>

            <button
                onClick={() => setVisible(false)}
                className="ml-auto shrink-0 w-5 h-5 rounded flex items-center justify-center transition-all hover:bg-white/10"
                aria-label="Dismiss"
                style={{ color: 'rgba(255,255,255,0.45)' }}
            >
                <X size={13} />
            </button>
        </div>
    );
}
