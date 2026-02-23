'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
                background: 'linear-gradient(135deg, #7c6af5, #9333ea)',
                boxShadow: '0 0 24px rgba(124,106,245,0.5)',
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                pointerEvents: show ? 'auto' : 'none',
                color: 'white',
            }}
        >
            <ArrowUp size={18} />
        </button>
    );
}
