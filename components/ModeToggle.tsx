'use client';
import { useMode } from '@/lib/mode';
import { Briefcase, Code2 } from 'lucide-react';

export default function ModeToggle() {
    const { mode, toggle } = useMode();
    const isRecruiter = mode === 'recruiter';

    return (
        <button
            onClick={toggle}
            title={isRecruiter ? 'Switch to Developer View' : 'Switch to Recruiter View'}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 relative overflow-hidden"
            style={{
                border: '1.5px solid',
                borderColor: isRecruiter ? 'rgba(251,191,36,0.5)' : 'rgba(124,106,245,0.4)',
                background: isRecruiter ? 'rgba(251,191,36,0.08)' : 'rgba(124,106,245,0.08)',
                color: isRecruiter ? '#fbbf24' : '#a78bfa',
                backdropFilter: 'blur(8px)',
            }}
        >
            <span
                className="transition-all duration-300"
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            >
                {isRecruiter
                    ? <><Briefcase size={13} /> Recruiter View</>
                    : <><Code2 size={13} /> Dev View</>
                }
            </span>
        </button>
    );
}
