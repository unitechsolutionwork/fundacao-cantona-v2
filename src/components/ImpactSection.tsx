// ════════════════════════════════════════════════════════════════
// ImpactSection.tsx  —  scaled down
// ════════════════════════════════════════════════════════════════
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useTranslations } from 'next-intl';

const VideoPlayer = ({ src }: { src: string }) => {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const toggleMute = (e: React.MouseEvent) => {
        e.preventDefault();
        if (videoRef.current) { videoRef.current.muted = !isMuted; setIsMuted(!isMuted); }
    };
    return (
        <>
            <video ref={videoRef} autoPlay loop muted={true} playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={src} />
            <button onClick={toggleMute} className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-[#3a7d44] text-white p-2 rounded-full backdrop-blur-sm transition-all shadow-md border border-white/20">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
        </>
    );
};

export default function ImpactSection() {
    const t = useTranslations('Impact');
    const impactData = [
        { id: 1, tag: t('item1_tag'), title: t('item1_title'), desc: t('item1_desc'), date: t('item1_date'), video: "/doacao.mp4", size: "md:col-span-2 md:row-span-2" },
        { id: 2, tag: t('item2_tag'), title: t('item2_title'), desc: t('item2_desc'), date: t('item2_date'), image: "https://i.imgur.com/BQ4K045.jpeg", size: "col-span-1" },
        { id: 3, tag: t('item3_tag'), title: t('item3_title'), desc: t('item3_desc'), date: t('item3_date'), image: "https://i.imgur.com/kmk0eh0.jpeg", size: "col-span-1" },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-[#f8fafc] text-[#113255] px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-100 shadow-sm">
                        <span className="text-[#3a7d44]">⚡</span> {t('badge')}
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-extrabold text-[#113255]">{t('title')}
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="text-sm text-gray-600">{t('subtitle')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[260px]">
                    {impactData.map((item, index) => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                            className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${item.size}`}>
                            {item.video
                                ? <VideoPlayer src={item.video} />
                                : <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${item.image})` }} />
                            }
                            <div className="absolute inset-0 bg-gradient-to-t from-[#113255]/95 via-[#113255]/50 to-transparent" />
                            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 pointer-events-none">
                                <div className="self-start bg-white/95 text-[#113255] px-2.5 py-1 rounded-lg text-[10px] font-bold mb-auto mt-2 shadow-sm pointer-events-auto">
                                    {item.tag}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 leading-snug">{item.title}</h3>
                                <p className="text-gray-200 text-xs md:text-sm mb-3 line-clamp-2">{item.desc}</p>
                                <div className="flex items-center justify-between pt-3 border-t border-white/20 pointer-events-auto">
                                    <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
                                        <Calendar className="w-3.5 h-3.5" />{item.date}
                                    </div>
                                    <div className="flex items-center gap-1 text-white text-xs font-semibold group-hover:text-[#d4af37] transition-colors cursor-pointer">
                                        {t('read_more')} <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}