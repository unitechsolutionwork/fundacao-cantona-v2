"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTranslations } from 'next-intl';

// ─── FUNDO COM IMAGENS EM OPACIDADE ────────────────────────────────────────
const bgImages = [
    { src: "https://i.imgur.com/xriMc5A.jpeg", top: "2%", left: "1%", w: "22vw", rot: -3 },
    { src: "https://i.imgur.com/8sbJgNy.jpeg", top: "5%", left: "30%", w: "18vw", rot: 2 },
    { src: "https://i.imgur.com/u2wjQGD.jpeg", top: "3%", left: "58%", w: "20vw", rot: -2 },
    { src: "https://i.imgur.com/SncAEMv.jpeg", top: "3%", left: "80%", w: "19vw", rot: 3 },
    { src: "https://i.imgur.com/iKNHyzJ.jpeg", top: "35%", left: "0%", w: "21vw", rot: 2 },
    { src: "https://i.imgur.com/JgU5KXO.jpeg", top: "38%", left: "24%", w: "19vw", rot: -3 },
    { src: "https://i.imgur.com/cDvcu8b.jpeg", top: "36%", left: "52%", w: "22vw", rot: 2 },
    { src: "https://i.imgur.com/wz6xHwK.jpeg", top: "37%", left: "78%", w: "21vw", rot: -2 },
    { src: "https://i.imgur.com/xriMc5A.jpeg", top: "70%", left: "5%", w: "20vw", rot: -1 },
    { src: "https://i.imgur.com/8sbJgNy.jpeg", top: "72%", left: "35%", w: "18vw", rot: 3 },
    { src: "https://i.imgur.com/u2wjQGD.jpeg", top: "71%", left: "62%", w: "21vw", rot: -2 },
    { src: "https://i.imgur.com/iKNHyzJ.jpeg", top: "70%", left: "83%", w: "17vw", rot: 2 },
];

const FloatingImages = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bgImages.map((img, i) => (
            <motion.div
                key={i}
                className="absolute rounded-2xl overflow-hidden shadow-md"
                style={{
                    top: img.top, left: img.left, width: img.w, aspectRatio: "4/3", rotate: img.rot, opacity: 0.1,
                }}
                animate={{ y: [0, i % 2 === 0 ? -15 : 15, 0], rotate: [img.rot, img.rot + (i % 2 === 0 ? 2 : -2), img.rot] }}
                transition={{ duration: 8 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
            </motion.div>
        ))}
        {/* Camada que funde as imagens flutuantes com a cor de fundo animada */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 10%, rgba(255,255,255,0.7) 100%)" }} />
    </div>
);

// ─── MEDIA CAROUSEL ────────────────────────────────────────────────────────
const MediaCarousel = ({ media }: { media: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!media || media.length <= 1) return;
        const id = setInterval(() => setCurrentIndex((p) => (p + 1) % media.length), 4000);
        return () => clearInterval(id);
    }, [media, currentIndex]);

    if (!media || media.length === 0) return null;

    return (
        <div className="relative w-full h-full group">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={media[currentIndex]}
                    initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover" alt={`Mídia ${currentIndex + 1}`}
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#113255]/60 via-transparent to-transparent pointer-events-none" />
            {media.length > 1 && (
                <>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p - 1 + media.length) % media.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-[#113255] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 shadow-lg">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p + 1) % media.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-[#113255] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 shadow-lg">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {media.map((_, idx) => (
                            <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }} className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white w-8" : "bg-white/50 w-2.5 hover:bg-white/80"}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function Impacto() {
    const t = useTranslations('ImpactoPage');
    const heroRef = useRef(null);

    // 1. LER O PROGRESSO DO SCROLL (0 no topo, 1 no fim da página)
    const { scrollYProgress } = useScroll();

    // 2. MÁGICA: Transformar o progresso numa cor de fundo suave!
    // Transita de Creme -> Azul Suave -> Verde Suave -> Creme
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.3, 0.6, 0.9],
        ["#f8f6f1", "#f0f4f8", "#f0fdf4", "#f8f6f1"]
    );

    const stats = [
        { value: t('stat1_val'), label: t('stat1_label') },
        { value: t('stat2_val'), label: t('stat2_label') },
        { value: t('stat3_val'), label: t('stat3_label') },
        { value: t('stat4_val'), label: t('stat4_label') },
    ];

    const timelineData = [
        {
            year: t('g1_year'),
            phases: [
                { phaseNum: 15, title: t('g1_p15_title'), desc: t('g1_p15_desc'), location: t('g1_p15_loc'), media: ["https://i.imgur.com/xriMc5A.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Vacinação+Foto+2"] },
                { phaseNum: 14, title: t('g1_p14_title'), desc: t('g1_p14_desc'), location: t('g1_p14_loc'), media: ["https://i.imgur.com/JgU5KXO.jpeg", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Bolsas+Foto+2"] },
                { phaseNum: 13, title: t('g1_p13_title'), desc: t('g1_p13_desc'), location: t('g1_p13_loc'), media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Casas+Malembuane+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Casas+Malembuane+2"] },
                { phaseNum: 12, title: t('g1_p12_title'), desc: t('g1_p12_desc'), location: t('g1_p12_loc'), media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Mercado+Tofo+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Barra+Casas+2"] },
                { phaseNum: 11, title: t('g1_p11_title'), desc: t('g1_p11_desc'), location: t('g1_p11_loc'), media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Ciclone+Foto+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Ciclone+Foto+2"] },
            ],
        },
        {
            year: t('g2_year'),
            phases: [
                { phaseNum: 10, title: t('g2_p10_title'), desc: t('g2_p10_desc'), location: t('g2_p10_loc'), media: ["https://i.imgur.com/8sbJgNy.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Xai-Xai+Foto+2"] },
                { phaseNum: 9, title: t('g2_p9_title'), desc: t('g2_p9_desc'), location: t('g2_p9_loc'), media: ["https://i.imgur.com/u2wjQGD.jpeg", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Chokwe+Gado"] },
                { phaseNum: 8, title: t('g2_p8_title'), desc: t('g2_p8_desc'), location: t('g2_p8_loc'), media: ["https://i.imgur.com/iKNHyzJ.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Macia+Kits"] },
                { phaseNum: 7, title: t('g2_p7_title'), desc: t('g2_p7_desc'), location: t('g2_p7_loc'), media: ["https://i.imgur.com/EFxTdXC.jpeg", "https://i.imgur.com/7o7paMA.jpeg", "https://i.imgur.com/F2xcikf.jpeg", "https://i.imgur.com/Jty3Lpa.jpeg", "https://i.imgur.com/X11tmKR.jpeg", "https://i.imgur.com/pTOsaDX.jpeg", "https://i.imgur.com/8y2W6xZ.jpeg", "https://i.imgur.com/NJloOol.jpeg", "https://i.imgur.com/W2sj9jM.jpeg"] },
                { phaseNum: 6, title: t('g2_p6_title'), desc: t('g2_p6_desc'), location: t('g2_p6_loc'), media: ["https://i.imgur.com/dOnicpr.jpeg", "https://i.imgur.com/vvxcgF2.jpeg", "https://i.imgur.com/3StocjA.jpeg", "https://i.imgur.com/wAcKvXQ.jpeg", "https://i.imgur.com/8YoFRbu.jpeg", "https://i.imgur.com/xriMc5A.jpeg", "https://i.imgur.com/4BeRuOX.jpeg", "https://i.imgur.com/8sbJgNy.jpeg", "https://i.imgur.com/heqp6rc.jpeg"] },
                { phaseNum: 5, title: t('g2_p5_title'), desc: t('g2_p5_desc'), location: t('g2_p5_loc'), media: ["https://i.imgur.com/7DV7KqS.jpeg", "https://i.imgur.com/gFNg8uS.jpeg", "https://i.imgur.com/vR0osa9.jpeg", "https://i.imgur.com/LmgjC7L.jpeg", "https://i.imgur.com/HY14XDa.jpeg", "https://i.imgur.com/gfTshdJ.jpeg", "https://i.imgur.com/YUTkOTr.jpeg"] },
            ],
        },
        {
            year: t('g3_year'),
            phases: [
                { phaseNum: 4, title: t('g3_p4_title'), desc: t('g3_p4_desc'), location: t('g3_p4_loc'), media: ["https://i.imgur.com/JgU5KXO.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Torneio+Dez+2"] },
                { phaseNum: 3, title: t('g3_p3_title'), desc: t('g3_p3_desc'), location: t('g3_p3_loc'), media: ["https://i.imgur.com/gWN9XQP.jpeg", "https://i.imgur.com/SDPRWdn.jpeg", "https://i.imgur.com/mZ9M9JT.jpeg", "https://i.imgur.com/N9z9hey.jpeg", "https://i.imgur.com/55o2RLG.jpeg", "https://i.imgur.com/ELdTtrV.jpeg", "https://i.imgur.com/tyM8yLT.jpeg", "https://i.imgur.com/9d9Hdyf.jpeg"] },
            ],
        },
        {
            year: t('g4_year'),
            phases: [
                { phaseNum: 2, title: t('g4_p2_title'), desc: t('g4_p2_desc'), location: t('g4_p2_loc'), media: ["https://i.imgur.com/cDvcu8b.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Hixikanwe+Foto+2"] },
                { phaseNum: 1, title: t('g4_p1_title'), desc: t('g4_p1_desc'), location: t('g4_p1_loc'), media: ["https://i.imgur.com/UBPWOUe.jpeg", "https://i.imgur.com/QwNKEf2.jpeg", "https://i.imgur.com/q9H352p.jpeg", "https://i.imgur.com/5Rb99pR.jpeg", "https://i.imgur.com/zQwFMRP.jpeg", "https://i.imgur.com/0Ar8YEt.jpeg", "https://i.imgur.com/wbOLnUQ.jpeg", "https://i.imgur.com/xumNWeS.jpeg", "https://i.imgur.com/G97RaKE.jpeg", "https://i.imgur.com/W1LWDPq.jpeg", "https://i.imgur.com/UXqHvXR.jpeg"] },
            ],
        },
    ];

    return (
        // 3. APLICAÇÃO: Mudámos a tag <main> para <motion.main> com o estilo dinâmico
        <motion.main className="min-h-screen transition-colors duration-700" style={{ backgroundColor }}>

            {/* 4. BARRA DE PROGRESSO DE LEITURA (Scroll Progress Bar) */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-[#d4af37] z-[100] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <Navbar />

            {/* ── FULLSCREEN HERO ── */}
            <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
                <img
                    src="https://i.imgur.com/SncAEMv.jpeg"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    alt="Fundação Cantoná"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#113255]/70 via-[#113255]/50 to-[#0a1f33]/80 z-10" />

                <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4 sm:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold border border-white/25 shadow-lg mb-6"
                    >
                        <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                        {t('hero_badge')}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight"
                    >
                        {t('hero_title_1')}{" "}<br className="hidden sm:block" />
                        <span className="text-[#3a7d44]">{t('hero_title_2')}</span> {t('hero_title_3')}{" "}
                        <span className="text-[#d4af37]">{t('hero_title_4')}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed mb-10"
                    >
                        {t('hero_subtitle')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-center hover:bg-white/20 transition-colors">
                                <p className="text-3xl font-black text-white">{stat.value}</p>
                                <p className="text-xs text-gray-300 mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                    >
                        <p className="text-white/60 text-xs uppercase tracking-widest">{t('scroll_hint')}</p>
                        <motion.div
                            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center pt-1.5"
                        >
                            <div className="w-1 h-2 bg-[#d4af37] rounded-full" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* ── TIMELINE ── */}
            <section className="relative py-24 transition-colors duration-500">
                <div className="absolute inset-0 overflow-hidden mix-blend-multiply">
                    <FloatingImages />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-32">
                        {timelineData.map((group, groupIdx) => (
                            <div key={groupIdx} className="relative">
                                <div className="sticky top-20 z-20 mb-16">
                                    <div className="inline-block bg-white/80 backdrop-blur-xl py-5 px-8 rounded-3xl border border-white/60 shadow-xl">
                                        <h2 className="text-3xl md:text-4xl font-black text-[#113255]">{group.year}</h2>

                                    </div>
                                </div>

                                <div className="space-y-32">
                                    {group.phases.map((phase, phaseIdx) => {
                                        const isEven = phaseIdx % 2 === 0;
                                        return (
                                            <div
                                                key={phase.phaseNum}
                                                className={`flex flex-col gap-12 lg:gap-20 items-center relative ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                                            >
                                                {/* Linha vertical da timeline adaptada para cores mais escuras */}
                                                <div className="hidden lg:block absolute left-1/2 top-0 bottom-[-128px] w-px bg-gradient-to-b from-[#113255]/30 to-transparent -translate-x-1/2 z-0" />

                                                <motion.div
                                                    initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.95 }}
                                                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                                                    className="w-full lg:w-5/12 z-10"
                                                >
                                                    <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl bg-white p-2 hover:shadow-[0_20px_50px_rgba(17,50,85,0.15)] transition-shadow duration-500">
                                                        <div className="w-full h-full rounded-[32px] overflow-hidden">
                                                            <MediaCarousel media={phase.media} />
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                <div className="hidden lg:flex w-2/12 justify-center z-10">
                                                    <motion.div
                                                        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring" }}
                                                        className="w-16 h-16 bg-[#113255] rounded-full border-4 border-white flex items-center justify-center shadow-2xl"
                                                    >
                                                        <span className="text-[#d4af37] font-black text-2xl">{phase.phaseNum}</span>
                                                    </motion.div>
                                                </div>

                                                <motion.div
                                                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ duration: 0.8, delay: 0.2 }}
                                                    className="w-full lg:w-5/12 space-y-6 z-10 relative"
                                                >
                                                    <div className="lg:hidden absolute -top-5 left-8 bg-[#113255] text-[#d4af37] px-4 py-1 rounded-full text-sm font-black shadow-md z-10">
                                                        {t('phase_label')} {phase.phaseNum}
                                                    </div>

                                                    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[32px] shadow-xl border border-white hover:border-[#3a7d44]/30 transition-colors duration-300">
                                                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#113255] leading-tight pt-4 lg:pt-0 mb-4">
                                                            {phase.title}
                                                        </h3>
                                                        <p className="text-lg text-gray-600 leading-relaxed">
                                                            {phase.desc}
                                                        </p>
                                                        <div className="flex items-center gap-2 pt-6 border-t border-gray-100 mt-6">
                                                            <div className="flex items-center gap-2 text-[#3a7d44] font-bold bg-[#3a7d44]/10 px-4 py-2 rounded-full text-sm">
                                                                <MapPin className="w-4 h-4" />
                                                                {phase.location}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ── */}
            <section className="py-24 bg-[#113255] relative overflow-hidden mt-20">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#3a7d44]/20 blur-3xl" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        {t('cta_title_1')} <br /><span className="text-[#d4af37]">{t('cta_title_2')}</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        {t('cta_desc')}
                    </p>
                    <Link
                        href="/doar"
                        className="inline-flex items-center justify-center gap-3 bg-[#3a7d44] text-white px-10 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-[0_10px_30px_rgba(58,125,68,0.4)] hover:-translate-y-1 text-lg"
                    >
                        {t('cta_btn')} <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </motion.main>
    );
}