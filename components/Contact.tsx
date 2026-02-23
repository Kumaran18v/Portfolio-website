'use client';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { personal } from '@/lib/data';
import { Mail, Phone, MapPin, Github, Linkedin, Code2, Send, CheckCircle } from 'lucide-react';

// Set these in .env.local or Vercel environment variables:
// NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
// NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
// NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = 'Name is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
        if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
        return e;
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length) return;
        setLoading(true);
        try {
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '';
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';
            if (serviceId && templateId && publicKey) {
                await emailjs.send(serviceId, templateId, {
                    from_name: form.name,
                    from_email: form.email,
                    subject: form.subject || 'Portfolio Contact',
                    message: form.message,
                    to_email: 'kumaran18v@gmail.com',
                }, publicKey);
            } else {
                // No keys yet — simulate for dev/demo
                await new Promise(r => setTimeout(r, 1200));
            }
            setSuccess(true);
            setForm({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        } catch {
            setErrors({ submit: 'Failed to send. Please email me directly at kumaran18v@gmail.com' });
        } finally {
            setLoading(false);
        }
    };

    const contactItems = [
        { Icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
        { Icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
        { Icon: MapPin, label: 'Location', value: personal.location, href: undefined },
    ];

    const socials = [
        { Icon: Github, href: personal.github, label: 'GitHub' },
        { Icon: Linkedin, href: personal.linkedin, label: 'LinkedIn' },
        { Icon: Code2, href: personal.leetcode, label: 'LeetCode' },
    ];

    return (
        <section id="contact" className="py-24" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="section-label">Get In Touch</p>
                    <h2 className="text-4xl font-extrabold">Let&apos;s <span className="gradient-text">Connect</span></h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* Left info */}
                    <div className="lg:col-span-2">
                        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
                            I&apos;m actively looking for my first opportunity as a software developer or data analyst.
                            If you have a role, internship, or just want to connect — feel free to reach out!
                        </p>

                        <div className="flex flex-col gap-4 mb-8">
                            {contactItems.map(({ Icon, label, value, href }) => {
                                const inner = (
                                    <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ background: 'rgba(124,106,245,0.12)', color: 'var(--accent)' }}>
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{label}</p>
                                            <p className="text-sm font-medium">{value}</p>
                                        </div>
                                    </div>
                                );
                                return href ? (
                                    <a key={label} href={href}
                                        onMouseEnter={e => { const d = e.currentTarget.querySelector('div') as HTMLElement; if (d) d.style.borderColor = 'var(--accent)'; }}
                                        onMouseLeave={e => { const d = e.currentTarget.querySelector('div') as HTMLElement; if (d) d.style.borderColor = 'var(--border)'; }}>
                                        {inner}
                                    </a>
                                ) : <div key={label}>{inner}</div>;
                            })}
                        </div>

                        <div className="flex gap-3">
                            {socials.map(({ Icon, href, label }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                    className="w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200"
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.transform = ''; }}>
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate
                        className="lg:col-span-3 rounded-2xl p-8 flex flex-col gap-5"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                        {[
                            { id: 'name', label: 'Full Name', type: 'text', ph: 'John Doe' },
                            { id: 'email', label: 'Email Address', type: 'email', ph: 'john@example.com' },
                            { id: 'subject', label: 'Subject', type: 'text', ph: 'Job Opportunity / Internship' },
                        ].map(({ id, label, type, ph }) => (
                            <div key={id} className="flex flex-col gap-1.5">
                                <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</label>
                                <input id={id} type={type} placeholder={ph}
                                    value={form[id as keyof typeof form]}
                                    onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                                    className="px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                                    style={{
                                        background: 'rgba(255,255,255,0.04)', border: `1.5px solid ${errors[id] ? 'var(--red)' : 'var(--border)'}`,
                                        color: 'var(--text)', fontFamily: 'inherit',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'rgba(124,106,245,0.06)'; }}
                                    onBlur={e => { e.target.style.borderColor = errors[id] ? 'var(--red)' : 'var(--border)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                                />
                                {errors[id] && <span className="text-xs" style={{ color: 'var(--red)' }}>{errors[id]}</span>}
                            </div>
                        ))}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Message</label>
                            <textarea id="message" rows={5} placeholder="Tell me about the opportunity..."
                                value={form.message}
                                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                className="px-4 py-3 rounded-xl text-sm outline-none resize-y transition-all duration-200"
                                style={{
                                    background: 'rgba(255,255,255,0.04)', border: `1.5px solid ${errors.message ? 'var(--red)' : 'var(--border)'}`,
                                    color: 'var(--text)', fontFamily: 'inherit',
                                }}
                                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'rgba(124,106,245,0.06)'; }}
                                onBlur={e => { e.target.style.borderColor = errors.message ? 'var(--red)' : 'var(--border)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                            />
                            {errors.message && <span className="text-xs" style={{ color: 'var(--red)' }}>{errors.message}</span>}
                        </div>

                        <button type="submit" disabled={loading}
                            className="btn-primary justify-center w-full"
                            style={loading ? { opacity: 0.7, cursor: 'not-allowed' } : {}}>
                            {loading ? (
                                <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /></svg> Sending…</>
                            ) : (
                                <><Send size={17} /> Send Message</>
                            )}
                        </button>

                        {success && (
                            <div className="flex items-center gap-3 p-4 rounded-xl text-sm"
                                style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: 'var(--green)' }}>
                                <CheckCircle size={18} /> Message sent! I&apos;ll get back to you soon.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
