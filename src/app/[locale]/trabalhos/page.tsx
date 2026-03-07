"use client";

// AVISO: Se a biblioteca lenis ainda não estiver instalada, por favor execute:
// npm install @studio-freight/react-lenis

import { ReactLenis } from '@studio-freight/react-lenis';
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
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

// ─── BACKGROUND VIDEO SEQUENCE ON SCROLL ───────────────────────────────────
const NUM_FRAMES = 50; // Total de frames configurável
const FrameSequence = ({ scrollProgress }: { scrollProgress: any }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= NUM_FRAMES; i++) {
            const img = new Image();
            // Pads the number to 2 digits. e.g.: 1 -> 01, 15 -> 15
            const frameNum = i.toString().padStart(2, '0');
            img.src = `/logistica/${frameNum}.png`;

            img.onload = () => {
                loadedCount++;
                // Render the first frame as soon as it's loaded to avoid blank flash
                if (loadedCount === 1 && i === 1 && canvasRef.current) {
                    const ctx = canvasRef.current.getContext("2d");
                    ctx?.drawImage(img, 0, 0, 1920, 1080);
                }
            };

            img.onerror = () => {
                console.warn(`Failed to load image: ${img.src}`);
            };

            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    useMotionValueEvent(scrollProgress, "change", (latest: number) => {
        if (!canvasRef.current || images.length === 0) return;

        // Map progress (0 -> 1) to frame index (0 -> NUM_FRAMES - 1)
        const frameIndex = Math.min(NUM_FRAMES - 1, Math.floor(latest * NUM_FRAMES));
        const img = images[frameIndex];

        if (img && img.complete && img.naturalHeight !== 0) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                // Desenha a imagem mantendo uma proporção de 16:9 base.
                // O modo CSS object-cover tratará do responsive.
                ctx.drawImage(img, 0, 0, 1920, 1080);
            }
        }
    });

    return (
        <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
                // Optimizations for canvas rendering in Safari/iOS
                willChange: "transform",
            }}
        />
    );
};


// ─── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function Impacto() {
    const t = useTranslations('ImpactoPage');
    const heroSectionRef = useRef(null);

    // 1. PROGRESSO DO SCROLL PARA A PÁGINA INTEIRA
    const { scrollYProgress } = useScroll();

    // 2. MÁGICA: Transformar o progresso numa cor de fundo suave da página
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.3, 0.6, 0.9],
        ["#f8f6f1", "#f0f4f8", "#f0fdf4", "#f8f6f1"]
    );

    // 3. PROGRESSO ESPECÍFICO DO SCROLL APENAS PARA A HERO SECTION
    const { scrollYProgress: heroScrollProgress } = useScroll({
        target: heroSectionRef,
        offset: ["start start", "end end"]
    });

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
                {
                    phaseNum: 15,
                    title: t('g1_p15_title'),
                    desc: t('g1_p15_desc'),
                    location: t('g1_p15_loc'),
                    media: [
                        "https://i.imgur.com/6ri5bbH.jpeg",
                        "https://i.imgur.com/0ptix17.jpeg"
                    ]
                },
                {
                    phaseNum: 14,
                    title: t('g1_p14_title'),
                    desc: t('g1_p14_desc'),
                    location: t('g1_p14_loc'),
                    media: [
                        "https://i.imgur.com/TSB9c6K.jpeg",
                        "https://i.imgur.com/FJhJwf2.jpeg"
                    ]
                },
                {
                    phaseNum: 13,
                    title: t('g1_p13_title'),
                    desc: t('g1_p13_desc'),
                    location: t('g1_p13_loc'),
                    media: [
                        "https://i.imgur.com/uoi6VkL.jpeg",
                        "https://i.imgur.com/ooldQn2.jpeg",
                        "https://i.imgur.com/dBZ8kgl.jpeg",
                        "https://i.imgur.com/KIX4zDW.jpeg",
                        "https://i.imgur.com/zlSSouq.jpeg",
                        "https://i.imgur.com/3FwTpZg.jpeg",
                        "https://i.imgur.com/z6DcPYx.jpeg",
                        "https://i.imgur.com/Dw1Qivm.jpeg",
                        "https://i.imgur.com/jOISJIB.jpeg",
                        "https://i.imgur.com/msKSlVV.jpeg"
                    ]
                },
                {
                    phaseNum: 12,
                    title: t('g1_p12_title'),
                    desc: t('g1_p12_desc'),
                    location: t('g1_p12_loc'),
                    media: [
                        "https://i.imgur.com/uoi6VkL.jpeg",
                        "https://i.imgur.com/ooldQn2.jpeg",
                        "https://i.imgur.com/dBZ8kgl.jpeg",
                        "https://i.imgur.com/KIX4zDW.jpeg",
                        "https://i.imgur.com/zlSSouq.jpeg",
                        "https://i.imgur.com/3FwTpZg.jpeg",
                        "https://i.imgur.com/z6DcPYx.jpeg",
                        "https://i.imgur.com/Dw1Qivm.jpeg",
                        "https://i.imgur.com/jOISJIB.jpeg",
                        "https://i.imgur.com/msKSlVV.jpeg"
                    ]
                },
                {
                    phaseNum: 11,
                    title: t('g1_p11_title'),
                    desc: t('g1_p11_desc'),
                    location: t('g1_p11_loc'),
                    media: [
                        "https://i.imgur.com/0ptix17.jpeg",
                        "https://i.imgur.com/Iz2ISr8.jpeg",
                        "https://i.imgur.com/LQEsyaG.jpeg"
                    ]
                },
            ],
        },
        {
            year: t('g2_year'),
            phases: [
                {
                    phaseNum: 10,
                    title: t('g2_p10_title'),
                    desc: t('g2_p10_desc'),
                    location: t('g2_p10_loc'),
                    media: [
                        "https://i.imgur.com/cNtZngw.jpeg",
                        "https://i.imgur.com/9CUOdJ4.jpeg",
                        "https://i.imgur.com/LmmwYDo.jpeg",
                        "https://i.imgur.com/o9pAzkk.jpeg",
                        "https://i.imgur.com/6ri5bbH.jpeg",
                        "https://i.imgur.com/2eyZOX0.jpeg",
                        "https://i.imgur.com/cffklhc.jpeg",
                        "https://i.imgur.com/Lp5igmw.jpeg"
                    ]
                },
                {
                    phaseNum: 9,
                    title: t('g2_p9_title'),
                    desc: t('g2_p9_desc'),
                    location: t('g2_p9_loc'),
                    media: [
                        "https://i.imgur.com/irhONdA.jpeg",
                        "https://i.imgur.com/TSB9c6K.jpeg",
                        "https://i.imgur.com/FJhJwf2.jpeg",
                        "https://i.imgur.com/vL1IQyS.jpeg",
                        "https://i.imgur.com/brVsB44.jpeg",
                        "https://i.imgur.com/GtlkMc2.jpeg",
                        "https://i.imgur.com/5wDhNV1.jpeg",
                        "https://i.imgur.com/KrjjVMt.jpeg"
                    ]
                },
                {
                    phaseNum: 8,
                    title: t('g2_p8_title'),
                    desc: t('g2_p8_desc'),
                    location: t('g2_p8_loc'),
                    media: [
                        "https://i.imgur.com/JGPU5FZ.jpeg",
                        "https://i.imgur.com/TEZGKtU.jpeg",
                        "https://i.imgur.com/vtfFNdu.jpeg",
                        "https://i.imgur.com/Lw37j0q.jpeg",
                        "https://i.imgur.com/XJ5rHzO.jpeg"
                    ]
                },
                { phaseNum: 7, title: t('g2_p7_title'), desc: t('g2_p7_desc'), location: t('g2_p7_loc'), media: ["https://i.imgur.com/EFxTdXC.jpeg", "https://i.imgur.com/7o7paMA.jpeg", "https://i.imgur.com/F2xcikf.jpeg", "https://i.imgur.com/Jty3Lpa.jpeg", "https://i.imgur.com/X11tmKR.jpeg", "https://i.imgur.com/pTOsaDX.jpeg", "https://i.imgur.com/8y2W6xZ.jpeg", "https://i.imgur.com/NJloOol.jpeg", "https://i.imgur.com/W2sj9jM.jpeg"] },
                { phaseNum: 6, title: t('g2_p6_title'), desc: t('g2_p6_desc'), location: t('g2_p6_loc'), media: ["https://i.imgur.com/dOnicpr.jpeg", "https://i.imgur.com/vvxcgF2.jpeg", "https://i.imgur.com/3StocjA.jpeg", "https://i.imgur.com/wAcKvXQ.jpeg", "https://i.imgur.com/8YoFRbu.jpeg", "https://i.imgur.com/xriMc5A.jpeg", "https://i.imgur.com/4BeRuOX.jpeg", "https://i.imgur.com/8sbJgNy.jpeg", "https://i.imgur.com/heqp6rc.jpeg"] },
                { phaseNum: 5, title: t('g2_p5_title'), desc: t('g2_p5_desc'), location: t('g2_p5_loc'), media: ["https://i.imgur.com/7DV7KqS.jpeg", "https://i.imgur.com/gFNg8uS.jpeg", "https://i.imgur.com/vR0osa9.jpeg", "https://i.imgur.com/LmgjC7L.jpeg", "https://i.imgur.com/HY14XDa.jpeg", "https://i.imgur.com/gfTshdJ.jpeg", "https://i.imgur.com/YUTkOTr.jpeg"] },
            ],
        },
        {
            year: t('g3_year'),
            phases: [
                {
                    phaseNum: 4,
                    title: t('g3_p4_title'),
                    desc: t('g3_p4_desc'),
                    location: t('g3_p4_loc'),
                    media: [
                        "https://i.imgur.com/3xgxoS9.jpeg",
                        "https://i.imgur.com/xEePYMi.jpeg",
                        "https://i.imgur.com/FfFsSee.jpeg",
                        "https://i.imgur.com/ceQNBf8.jpeg",
                        "https://i.imgur.com/zpVZmGv.jpeg",
                        "https://i.imgur.com/bDl7Dxz.jpeg",
                        "https://i.imgur.com/bOHMJUD.jpeg"
                    ]
                },
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
        // Lenis envole a raiz de componentes para smooth scroll inercial
        <ReactLenis root>
            <motion.main className="min-h-screen transition-colors duration-700 font-sans" style={{ backgroundColor }}>

                {/* BARRA DE PROGRESSO GLOBAL SUPERIOR */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1.5 bg-[#d4af37] z-[100] origin-left"
                    style={{ scaleX: scrollYProgress }}
                />

                <Navbar />

                {/* ── CINEMATIC SCROLL HERO SECTION ── */}
                {/* O contêiner aumenta o espaço de scroll com h-[300vh].
                  O bloco fixo "sticky" vai ficar na tela através da altura 'h-screen'
                  enquanto percorrermos os 300vh do parent.
                */}
                <div ref={heroSectionRef} className="relative h-[300vh] w-full">

                    {/* Elemento fixo durante o scroll da hero */}
                    <div className="sticky top-0 h-screen w-full overflow-hidden">

                        {/* Canvas sequence video on scroll */}
                        <FrameSequence scrollProgress={heroScrollProgress} />

                        {/* Overlay: Gradiente escuro garantindo contraste / legibilidade */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#113255]/70 via-[#113255]/50 to-[#0a1f33]/80 z-10" />

                        {/* Conteúdo do Hero */}
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
                                                    {/* Linha vertical da timeline */}
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
        </ReactLenis>
    );
}