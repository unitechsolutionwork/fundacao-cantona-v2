"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Calendar, ExternalLink, Newspaper, Video, ArrowRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Noticias() {
    const t = useTranslations('Noticias');
    const tHome = useTranslations('Home');

    // Estado que controla qual vídeo está aberto no Pop-up
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    const newsMedia = [
        {
            id: 1,
            type: "video",
            category: t('cat_tv'),
            title: t('news1_title'),
            desc: t('news1_desc'),
            date: "Bom Dia Moçambique",
            source: "TVM",
            thumbnail: "/tvm-gezani.png", // Ajustado para .png conforme o seu VS Code
            videoUrl: "/tvm-gezani.mp4", // Ajustado para o nome do seu vídeo
        },
        {
            id: 2,
            type: "video",
            category: t('cat_tv'),
            title: t('news2_title'),
            desc: t('news2_desc'),
            date: "Bom Dia Moçambique",
            source: "TVM",
            thumbnail: "/tvm-gaza-30t.png", // Ajustado para .png
            videoUrl: "/tvm-gaza-30.mp4", // Ajustado para o nome do seu vídeo
        },
        {
            id: 3,
            type: "video",
            category: t('cat_tv'),
            title: t('news3_title'),
            desc: t('news3_desc'),
            date: "Telejornal",
            source: "TVM",
            thumbnail: "/tvm-chokwe-kits.png", // Ajustado para .png
            videoUrl: "/tvm-chokwe.mp4", // Se tiver um 3º vídeo, coloque o nome dele aqui
        }
    ];

    return (
        <main className="min-h-screen bg-[#f8fafc]">
            <Navbar />

            {/* ── HERO NOTÍCIAS ── */}
            <div className="relative pt-32 pb-20 bg-[#113255] overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#3a7d44]/20 blur-[120px] rounded-full" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[#d4af37] px-4 py-2 rounded-full text-sm font-bold border border-white/10 mb-6">
                        <Newspaper className="w-4 h-4" /> {t('hero_badge')}
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black text-white mb-6">
                        {t('hero_title_1')} <span className="text-[#3a7d44]">{t('hero_title_2')}</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-300 text-lg max-w-2xl mx-auto">
                        {t('hero_subtitle')}
                    </motion.p>
                </div>
            </div>

            {/* ── GRELHA DE NOTÍCIAS ── */}
            <section className="py-20 relative z-20 -mt-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsMedia.map((news, i) => (
                            <motion.div
                                key={news.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-blue-900/5 border border-gray-100 group cursor-pointer"
                                onClick={() => news.type === "video" && setActiveVideo(news.videoUrl)}
                            >
                                {/* Media Container */}
                                <div className="relative h-64 overflow-hidden bg-gray-200">
                                    <img src={news.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={news.title} />
                                    <div className="absolute inset-0 bg-[#113255]/20 group-hover:bg-[#113255]/40 transition-colors" />

                                    {news.type === "video" ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                                <Play className="w-6 h-6 text-[#3a7d44] fill-[#3a7d44] ml-1" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg">
                                            <ExternalLink className="w-5 h-5 text-[#113255]" />
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-[#3a7d44] text-white text-[10px] uppercase font-black px-3 py-1 rounded-lg tracking-widest">
                                            {news.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" /> {news.date}
                                        </div>
                                        <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                        <span>{news.source}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#113255] mb-3 leading-tight group-hover:text-[#3a7d44] transition-colors">
                                        {news.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {news.desc}
                                    </p>

                                    <button className="flex items-center gap-2 text-[#113255] font-bold text-sm group/btn">
                                        {news.type === "video" ? t('btn_watch') : t('btn_read')}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MODAL DE VÍDEO (A Mágica acontece aqui) ── */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setActiveVideo(null)} // Fecha ao clicar fora
                    >
                        <button
                            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                            onClick={() => setActiveVideo(null)}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar no vídeo
                        >
                            <video
                                src={activeVideo}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── CTA ── */}
            <section className="py-20 bg-gray-50 border-y border-gray-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Video className="w-12 h-12 text-[#3a7d44] mx-auto mb-6 opacity-40" />
                    <h2 className="text-3xl font-black text-[#113255] mb-4">{t('cta_title')}</h2>
                    <p className="text-gray-600 mb-8">{t('cta_desc')}</p>
                    <Link href="/contacto" className="inline-flex items-center gap-2 bg-[#113255] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#0a2540] transition-all">
                        {t('cta_btn')}
                    </Link>
                </div>
            </section>

            {/* ── FOOTER REUTILIZADO ── */}
            <footer className="bg-[#113255] text-white py-12">
                <div className="max-w-6xl mx-auto px-4 text-center text-gray-400 text-xs">
                    {tHome('footer_copyright')}
                </div>
            </footer>
        </main>
    );
}