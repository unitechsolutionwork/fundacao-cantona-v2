"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Mail, Phone, MapPin, Send, MessageCircle,
    Heart, CheckCircle2, Loader2, ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTranslations } from 'next-intl';

type FormStatus = "idle" | "loading" | "success";

export default function Contacto() {
    const t = useTranslations('Contacto');
    const tFooter = useTranslations('Home');
    const [formStatus, setFormStatus] = useState<FormStatus>("idle");

    const contactInfo = [
        { icon: <Phone className="w-5 h-5" />, label: t('lbl_phone'), value: "+258 84 372 3482", bg: "bg-blue-50", color: "text-[#113255]", accent: "bg-[#113255]" },
        { icon: <Mail className="w-5 h-5" />, label: t('lbl_email'), value: "geral@fundacaocantona.org.mz", bg: "bg-green-50", color: "text-[#3a7d44]", accent: "bg-[#3a7d44]" },
        { icon: <MapPin className="w-5 h-5" />, label: t('lbl_location'), value: t('val_location'), bg: "bg-yellow-50", color: "text-[#d4af37]", accent: "bg-[#d4af37]" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("loading");
        setTimeout(() => setFormStatus("success"), 1800);
    };

    return (
        <main className="min-h-screen bg-[#f0f4f8]">
            <Navbar />

            {/* ── HERO ── */}
            <div className="relative min-h-[65vh] w-full overflow-hidden flex flex-col items-center justify-center">
                <img src="https://i.imgur.com/GNv4wDa.jpeg" className="absolute inset-0 w-full h-full object-cover object-center" alt="Contacte a Fundação Cantoná" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f33]/95 via-[#113255]/85 to-[#1a4b80]/70" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#d4af37]/10 blur-[100px] pointer-events-none" />
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#3a7d44]/15 blur-[80px] pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto px-4 text-center pt-24 pb-40">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-xs font-semibold border border-white/20 mb-6">
                        <MessageCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                        {t('hero_badge')}
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-xl">
                        {t('hero_title_1')} <span className="text-[#3a7d44]">{t('hero_title_2')}</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
                        {t('hero_subtitle')}
                    </motion.p>
                </div>
            </div>

            {/* ── CONTACT SECTION ── */}
            <section className="relative z-20 -mt-28 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

                        {/* Left: info cards */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="lg:col-span-2 flex flex-col gap-4">
                            {contactInfo.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.1 }} whileHover={{ x: 4 }}
                                    className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center gap-4 overflow-hidden relative">
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.accent} rounded-l-2xl`} />
                                    <div className={`w-11 h-11 ${item.bg} ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                                        <p className="text-[#113255] font-bold text-sm leading-snug">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* WhatsApp */}
                            <motion.a href="https://wa.me/258843723482" target="_blank" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
                                whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                                className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-5 rounded-2xl flex items-center gap-4 shadow-[0_8px_30px_rgba(37,211,102,0.2)] overflow-hidden">
                                <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white/10" />
                                <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div className="relative z-10">
                                    <p className="font-black text-sm leading-tight">{t('whatsapp_title')}</p>
                                    <p className="text-white/75 text-xs font-medium mt-0.5">{t('whatsapp_desc')}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 ml-auto relative z-10 opacity-80" />
                            </motion.a>

                            {/* About mini */}
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
                                className="bg-gradient-to-br from-[#0a1f33] to-[#1a4b80] text-white p-5 rounded-2xl relative overflow-hidden shadow-[0_8px_30px_rgba(17,50,85,0.15)]">
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4af37]/60 via-[#d4af37] to-[#d4af37]/60" />
                                <Heart className="w-5 h-5 text-[#d4af37] mb-3" />
                                <p className="font-black text-sm leading-tight mb-1.5">Fundação Cantoná</p>
                                <p className="text-white/65 text-xs leading-relaxed">{t('mini_about_desc')}</p>
                            </motion.div>
                        </motion.div>

                        {/* Right: form */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="lg:col-span-3">
                            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden">
                                <div className="h-1 w-full bg-gradient-to-r from-[#113255] via-[#3a7d44] to-[#d4af37]" />
                                <div className="p-6 md:p-9">
                                    <AnimatePresence mode="wait">
                                        {(formStatus === "idle" || formStatus === "loading") && (
                                            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                <div className="flex items-center gap-3 mb-7">
                                                    <div className="w-11 h-11 bg-gradient-to-br from-[#113255] to-[#1a4b80] rounded-xl flex items-center justify-center shadow-md">
                                                        <Send className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-black text-[#113255]">{t('form_title')}</h3>
                                                        <p className="text-gray-500 text-xs">{t('form_desc')}</p>
                                                    </div>
                                                </div>

                                                <form onSubmit={handleSubmit} className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="block text-xs font-bold text-[#113255]">{t('form_name')}</label>
                                                            <input type="text" required placeholder={t('form_name_ph')}
                                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#3a7d44] focus:ring-2 focus:ring-[#3a7d44]/10 focus:bg-white outline-none transition-all text-sm font-medium text-[#113255] placeholder:text-gray-400" />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="block text-xs font-bold text-[#113255]">{t('form_email')}</label>
                                                            <input type="email" required placeholder="exemplo@mail.com"
                                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#3a7d44] focus:ring-2 focus:ring-[#3a7d44]/10 focus:bg-white outline-none transition-all text-sm font-medium text-[#113255] placeholder:text-gray-400" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="block text-xs font-bold text-[#113255]">{t('form_phone')} <span className="text-gray-400 font-normal">{t('form_optional')}</span></label>
                                                        <input type="tel" placeholder="+258 84 xxx xxxx"
                                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#3a7d44] focus:ring-2 focus:ring-[#3a7d44]/10 focus:bg-white outline-none transition-all text-sm font-medium text-[#113255] placeholder:text-gray-400" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="block text-xs font-bold text-[#113255]">{t('form_subject')}</label>
                                                        <input type="text" required placeholder={t('form_subject_ph')}
                                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#3a7d44] focus:ring-2 focus:ring-[#3a7d44]/10 focus:bg-white outline-none transition-all text-sm font-medium text-[#113255] placeholder:text-gray-400" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="block text-xs font-bold text-[#113255]">{t('form_message')}</label>
                                                        <textarea rows={4} required placeholder={t('form_message_ph')}
                                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#3a7d44] focus:ring-2 focus:ring-[#3a7d44]/10 focus:bg-white outline-none transition-all resize-none text-sm font-medium text-[#113255] placeholder:text-gray-400" />
                                                    </div>
                                                    <button type="submit" disabled={formStatus === "loading"}
                                                        className="w-full bg-[#113255] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#0a2540] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0">
                                                        {formStatus === "loading"
                                                            ? <><Loader2 className="w-4 h-4 animate-spin" /> {t('form_sending')}</>
                                                            : <>{t('form_btn')} <Send className="w-4 h-4" /></>}
                                                    </button>
                                                </form>
                                            </motion.div>
                                        )}

                                        {formStatus === "success" && (
                                            <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                                                <div className="w-16 h-16 bg-gradient-to-br from-[#3a7d44] to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
                                                    <CheckCircle2 className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-black text-[#113255] mb-2">{t('success_title')}</h3>
                                                <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed mb-6">{t('success_desc')}</p>
                                                <button onClick={() => setFormStatus("idle")} className="text-[#113255] font-bold text-sm hover:underline decoration-2 underline-offset-4">
                                                    {t('success_btn')}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="bg-[#113255] text-white pt-14 pb-8 border-t border-white/10 relative z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">
                        <div className="space-y-4">
                            <img src="https://i.imgur.com/DT0pAf7.png" alt="Fundação Cantoná" className="h-14 w-auto object-contain" />
                            <p className="text-gray-300 text-xs leading-relaxed max-w-xs">{tFooter('footer_desc')}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">{tFooter('footer_links_title')}</h4>
                            <ul className="space-y-3 text-gray-300 text-xs">
                                <li><Link href="/sobre" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_link1')}</Link></li>
                                <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_link2')}</Link></li>
                                <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_link3')}</Link></li>
                                <li><Link href="#" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_link4')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">{tFooter('footer_involved_title')}</h4>
                            <ul className="space-y-3 text-gray-300 text-xs">
                                <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_inv1')}</Link></li>
                                <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_inv2')}</Link></li>
                                <li><Link href="/doar" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_inv3')}</Link></li>
                                <li><Link href="#" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_inv4')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">{tFooter('footer_contact_title')}</h4>
                            <ul className="space-y-3 text-gray-300 text-xs">
                                <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> {tFooter('footer_location')}</li>
                                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> info@fundacaocantona.org</li>
                                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> +258 84 372 3482</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-xs">{tFooter('footer_copyright')}</p>
                        <div className="flex items-center gap-3">
                            <Link href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg></Link>
                            <Link href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg></Link>
                            <Link href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}