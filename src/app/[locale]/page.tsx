"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Truck, Users, CheckCircle, Quote, Volume2, VolumeX, Maximize, MapPin, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import ImpactSection from "@/components/ImpactSection";
import DonationSection from "@/components/DonationSection";
import { useTranslations } from 'next-intl';

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#f8fafc]">
    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#113255]/10 blur-[100px]" />
    <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#3a7d44]/15 blur-[100px]" />
  </div>
);

const heroImages = [
  "https://i.imgur.com/wz6xHwK.jpeg", "https://i.imgur.com/SncAEMv.jpeg", "https://i.imgur.com/7WwYd3z.jpeg",
  "https://i.imgur.com/Rbf1aHI.jpeg", "https://i.imgur.com/JgU5KXO.jpeg", "https://i.imgur.com/YKMx6a4.jpeg",
  "https://i.imgur.com/3StocjA.jpeg", "https://i.imgur.com/4UBkLJM.jpeg", "https://i.imgur.com/GNv4wDa.jpeg",
  "https://i.imgur.com/8YoFRbu.jpeg",
];

export default function Home() {
  const t = useTranslations('Home');
  const [currentImage, setCurrentImage] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentImage((prev) => (prev + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative min-h-screen w-full overflow-hidden flex items-center">
        <AnimatePresence mode="popLayout">
          <motion.img key={currentImage} src={heroImages[currentImage]}
            initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover" alt="Fundação Cantoná" />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[#113255]/90 via-[#113255]/50 to-transparent z-10" />

        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }} className="max-w-2xl space-y-5">
            <div className="inline-block bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-white/30 shadow-md">
              {t('hero_badge')}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
              {t('hero_title')}
            </h1>
            <p className="text-sm md:text-base text-gray-200 max-w-xl leading-relaxed drop-shadow-md">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/trabalhos"
                className="flex items-center justify-center gap-2 border-2 border-white text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-[#113255] transition-all text-sm shadow-[0_0_16px_rgba(255,255,255,0.25)]">
                {t('hero_btn')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="relative py-24 overflow-hidden bg-gray-50 z-20">
        <AnimatedBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#113255] tracking-tight">{t('how_title')}</h2>
            <div className="w-16 h-1 bg-[#3a7d44] mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: t('step1_title'),
                desc: t('step1_desc'),
                video: "/doacao_manhica.mp4"
              },
              {
                icon: <Truck className="w-6 h-6" />,
                title: t('step2_title'),
                desc: t('step2_desc'),
                video: "/doacao_gaza.mp4"
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: t('step3_title'),
                desc: t('step3_desc'),
                bgImage: "https://i.imgur.com/GNv4wDa.jpeg"
              },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-[320px] flex flex-col justify-end">

                <div className="absolute inset-0 z-0">
                  {step.video ? (
                    <div className="relative w-full h-full">
                      <video
                        ref={videoRef}
                        src={step.video}
                        autoPlay muted={isMuted} loop playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Controlos do Vídeo */}
                      <div className="absolute top-4 right-4 z-30 flex gap-2">
                        <button
                          onClick={(e) => { e.preventDefault(); toggleFullscreen(); }}
                          className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-[#113255] transition-all border border-white/20"
                        >
                          <Maximize className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); setIsMuted(!isMuted); }}
                          className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-[#3a7d44] transition-all border border-white/20"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <img src={step.bgImage} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#113255] via-[#113255]/80 to-transparent opacity-95 group-hover:opacity-85 transition-opacity pointer-events-none" />
                </div>

                <div className="relative z-10 p-6 pt-0 pointer-events-none">
                  <div className="w-12 h-12 bg-[#3a7d44] text-white rounded-xl flex items-center justify-center mb-4 shadow-md transform -translate-y-3 group-hover:-translate-y-5 transition-transform pointer-events-auto">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-100 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ImpactSection />

      {/* ── QUOTE ── */}
      <section className="relative py-24 bg-[#113255] overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#3a7d44] rounded-full mix-blend-multiply filter blur-[100px] opacity-40" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Quote className="w-12 h-12 text-[#d4af37] mx-auto mb-8 opacity-80" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-white leading-tight md:leading-snug px-4">
            "{t('quote_text')}"
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }}>
            <div className="w-12 h-0.5 bg-[#d4af37] mx-auto mt-10 mb-5 opacity-50" />
            <p className="font-bold text-[#d4af37] tracking-[0.2em] uppercase text-xs md:text-sm">
              Alcides Viegas <span className="text-gray-400 font-normal ml-2 tracking-normal capitalize">{t('quote_role')}</span>
            </p>
          </motion.div>
        </div>
      </section>

      <DonationSection />

      {/* ── FOOTER ── */}
      <footer className="bg-[#113255] text-white pt-14 pb-8 border-t border-white/10 relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">
            <div className="space-y-4">
              <img src="https://i.imgur.com/DT0pAf7.png" alt="Fundação Cantoná" className="h-14 w-auto object-contain" />
              <p className="text-gray-300 text-xs leading-relaxed max-w-xs">{t('footer_desc')}</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">{t('footer_links_title')}</h4>
              <ul className="space-y-3 text-gray-300 text-xs">
                <li><Link href="/sobre" className="hover:text-[#d4af37] transition-colors">{t('footer_link1')}</Link></li>
                <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">{t('footer_link2')}</Link></li>
                <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">{t('footer_link3')}</Link></li>
                <li><Link href="#" className="hover:text-[#d4af37] transition-colors">{t('footer_link4')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">{t('footer_involved_title')}</h4>
              <ul className="space-y-3 text-gray-300 text-xs">
                <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">{t('footer_inv1')}</Link></li>
                <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">{t('footer_inv2')}</Link></li>
                <li><Link href="/doar" className="hover:text-[#d4af37] transition-colors">{t('footer_inv3')}</Link></li>
                <li><Link href="#" className="hover:text-[#d4af37] transition-colors">{t('footer_inv4')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">{t('footer_contact_title')}</h4>
              <ul className="space-y-3 text-gray-300 text-xs">
                <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> {t('footer_location')}</li>
                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> info@fundacaocantona.org</li>
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> +258 84 372 3482</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">{t('footer_copyright')}</p>
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