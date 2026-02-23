'use client';
import { useEffect, useState } from 'react';
import { X, ExternalLink, Download } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) {
            document.addEventListener('keydown', handler);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
                style={{
                    background: 'var(--bg-2)',
                    border: '1px solid var(--border-2)',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                    height: '90vh',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>📄 Kumaran K — Resume</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href="/resume.pdf"
                            download="Kumaran_K_Resume.pdf"
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                            style={{ background: 'rgba(124,106,245,0.12)', color: 'var(--accent)', border: '1px solid rgba(124,106,245,0.25)' }}
                        >
                            <Download size={13} /> Download
                        </a>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--red)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--red)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                        >
                            <X size={15} />
                        </button>
                    </div>
                </div>
                {/* PDF Embed */}
                <iframe
                    src="/resume.pdf#toolbar=0&navpanes=0"
                    title="Kumaran K Resume"
                    className="w-full"
                    style={{ height: 'calc(90vh - 56px)', border: 'none' }}
                />
            </div>
        </div>
    );
}
