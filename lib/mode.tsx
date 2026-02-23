'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type ViewMode = 'developer' | 'recruiter';
const ModeCtx = createContext<{ mode: ViewMode; toggle: () => void; isRecruiter: boolean }>({
    mode: 'developer', toggle: () => { }, isRecruiter: false,
});

export function ModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<ViewMode>('developer');
    const toggle = () => setMode(m => m === 'developer' ? 'recruiter' : 'developer');
    return (
        <ModeCtx.Provider value={{ mode, toggle, isRecruiter: mode === 'recruiter' }}>
            {children}
        </ModeCtx.Provider>
    );
}

export const useMode = () => useContext(ModeCtx);
