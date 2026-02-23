'use client';
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = glowRef.current;
        if (!el) return;
        let raf: number;
        let mx = 0, my = 0, cx = 0, cy = 0;

        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
        window.addEventListener('mousemove', onMove, { passive: true });

        const animate = () => {
            cx += (mx - cx) * 0.12;
            cy += (my - cy) * 0.12;
            el.style.transform = `translate(${cx}px, ${cy}px)`;
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            className="pointer-events-none fixed z-0 top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
                background: 'radial-gradient(circle, rgba(124,106,245,0.08) 0%, transparent 70%)',
                willChange: 'transform',
            }}
        />
    );
}
