"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Calendar, ExternalLink, Newspaper, Video, ArrowRight, X, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Noticias() {
    const t = useTranslations('Noticias');
    const tHome = useTranslations('Home');

    // Estado unificado: Guarda todo o objeto da notícia/vídeo que foi clicado
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const newsMedia = [
        {
            id: 1,
            type: "video",
            category: t('cat_tv'),
            title: t('news1_title'),
            desc: t('news1_desc'),
            date: "Bom Dia Moçambique",
            source: "TVM",
            thumbnail: "/tvm-gezani.png",
            videoUrl: "/tvm-gezani.mp4",
        },
        {
            id: 2,
            type: "video",
            category: t('cat_tv'),
            title: t('news2_title'),
            desc: t('news2_desc'),
            date: "Bom Dia Moçambique",
            source: "TVM",
            thumbnail: "/tvm-gaza-30t.png",
            videoUrl: "/tvm-gaza-30.mp4",
        },
        {
            id: 3,
            type: "video",
            category: t('cat_tv'),
            title: t('news3_title'),
            desc: t('news3_desc'),
            date: "Telejornal",
            source: "TVM",
            thumbnail: "/tvm-chokwe-kits.png",
            videoUrl: "/tvm-chokwe.mp4",
        },
        // ── NOVOS ARTIGOS ESCRITOS ──
        {
            id: 4,
            type: "article",
            category: "Imprensa Escrita",
            title: "Fundação Cantoná e Parceiros Cumprem Promessa e Apoiam Reconstrução de Oito Casas em Inhambane",
            desc: "A Fundação Cantoná e parceiros entregaram material de construção e bens essenciais para a reconstrução de oito casas destruídas pelo ciclone Gezani em Inhambane.",
            date: "27 Fev 2026",
            source: "Jornal Visão Moçambique",
            thumbnail: "/visao-moz.jpg", // Nome sugerido para a imagem
            fullText: [
                "A Fundação Cantoná e seus parceiros voltaram a cumprir com o compromisso assumido junto às comunidades afetadas pelo ciclone Gezani, que devastou a província de Inhambane, no sul de Moçambique, ao procederem à entrega de material de construção e bens essenciais destinados à reconstrução de oito casas destruídas.",
                "A iniciativa incluiu a doação de chapas de zinco, barrotes, colchões e diversos produtos alimentares, bem como a garantia do pagamento da equipa técnica responsável pela reconstrução das habitações, assegurando assim maior celeridade e qualidade no processo de reposição das infraestruturas perdidas.",
                "A entrega oficial dos materiais decorreu no Centro de Acolhimento de Malembuane, localizado no centro da cidade de Inhambane, e foi liderada pelo Director Executivo da fundação, Milton Viegas, que reiterou o compromisso contínuo da organização com as famílias afetadas.",
                "Segundo Milton Viegas, a ação representa mais do que o simples cumprimento de uma promessa, simbolizando a solidariedade e o compromisso social da instituição para com as comunidades vulneráveis.",
                "“A Fundação Cantoná e parceiros estão, mais uma vez, a honrar o compromisso assumido, apoiando diretamente as famílias que perderam as suas habitações devido ao ciclone que fustigou a província de Inhambane”, afirmou.",
                "O responsável destacou ainda que, para além da reconstrução das residências, a organização está a prestar apoio no processo de desativação do centro de acolhimento, orientando as famílias para zonas consideradas seguras pelas autoridades locais, promovendo assim a sua reintegração gradual e segura nas comunidades.",
                "“A casa pode ter caído, mas as famílias permanecem de pé. Paredes reconstroem-se, mas o amor e a união são insubstituíveis”, sublinhou Milton Viegas, reforçando a mensagem de esperança e resiliência.",
                "Com esta intervenção, a Fundação Cantoná e parceiros reafirmam o seu compromisso com a reconstrução, a dignidade e o bem-estar das populações afectadas por calamidades naturais, contribuindo activamente para a recuperação social e habitacional na província de Inhambane."
            ]
        },
        {
            id: 5,
            type: "article",
            category: "Imprensa Escrita",
            title: "Fundação CANTONA apoia famílias afectadas pelas cheias em Chókwè",
            desc: "A Fundação doou kits de produtos alimentares não perecíveis, mantas e vestuário para ajudar as famílias afetadas pelas cheias na província de Gaza.",
            date: "10 Fev 2026",
            source: "Portal INGD",
            thumbnail: "/ingd-chokwe.jpg", // Nome sugerido para a imagem
            fullText: [
                "A Fundação CANTONA juntou-se às acções de solidariedade em favor das famílias afectadas pelas cheias no Distrito de Chókwè, doando kits de produtos alimentares não perecíveis, mantas e artigos de vestuário.",
                "Durante a ocasião, o coordenador do COE Distrital, Narciso Nhamuhuco, apresentou a radiografia dos centros de acomodação, assim como as necessidades prioritárias das famílias acolhidas nos Centros.",
                "Após a visita ao centro de Chiaquelane e aos subcentros, o representante da Fundação agradeceu a recepção e prometeu mobilizar novos apoios para os afectados pelas cheias."
            ]
        },
        {
            id: 6,
            type: "article",
            category: "Imprensa Escrita",
            title: "Fundação Cantona apoia vítimas das inundações em Gaza",
            desc: "Respondendo ao apelo do Presidente da República, a Fundação Cantona procedeu à doação de três mil kits de produtos alimentares não perecíveis.",
            date: "17 Fev 2026",
            source: "LanceMZ",
            thumbnail: "/lance-mz.jpg", // Nome sugerido para a imagem
            fullText: [
                "Cresce a resposta ao apelo efectuado pelo Presidente da República, Daniel Chapo, para a solidariedade interna em apoio às vítimas das inundações que afectaram várias províncias de Moçambique. Uma das respostas veio da Fundação Cantona, que procedeu à doação de três mil kits de produtos alimentares não perecíveis destinados às vítimas das cheias na província de Gaza.",
                "O acto, que visa minimizar o sofrimento das famílias afectadas pelas inundações e que perderam quase tudo com a fúria das águas, teve lugar recentemente e teve como primeiros beneficiários as populações em dificuldades na província de Gaza, que viu boa parte dos seus distritos submersos.",
                "Falando sobre a iniciativa, o patrono da Fundação Cantona referiu que a organização tem vindo a abraçar diversos projectos de cariz social, reforçando o seu compromisso com as comunidades vulneráveis. Segundo explicou, as primeiras famílias beneficiárias da ajuda, no contexto das inundações, foram assistidas na cidade de Maputo.",
                "Durante a ocasião, o coordenador do Centro Operativo de Emergência (COE) Distrital, Narciso Nhamuhuco, apresentou a radiografia dos centros de acomodação, bem como as necessidades prioritárias das famílias acolhidas.",
                "Após a visita ao centro de Chiaquelane, no distrito de Chokwé, e aos subcentros, o representante da Fundação agradeceu a recepção e prometeu mobilizar novos apoios para os afectados pelas cheias."
            ]
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
                                className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-blue-900/5 border border-gray-100 group cursor-pointer flex flex-col"
                                onClick={() => setSelectedItem(news)}
                            >
                                {/* Media Container */}
                                <div className="relative h-56 overflow-hidden bg-gray-200 shrink-0">
                                    <img src={news.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={news.title} />
                                    <div className="absolute inset-0 bg-[#113255]/20 group-hover:bg-[#113255]/40 transition-colors" />

                                    {news.type === "video" ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                                <Play className="w-5 h-5 text-[#3a7d44] fill-[#3a7d44] ml-1" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform opacity-0 group-hover:opacity-100">
                                                <FileText className="w-5 h-5 text-[#3a7d44]" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 left-4">
                                        <span className={`text-white text-[10px] uppercase font-black px-3 py-1 rounded-lg tracking-widest ${news.type === "video" ? "bg-[#e53935]" : "bg-[#3a7d44]"}`}>
                                            {news.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" /> {news.date}
                                        </div>
                                        <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                        <span className="truncate">{news.source}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#113255] mb-3 leading-tight group-hover:text-[#3a7d44] transition-colors line-clamp-2">
                                        {news.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                        {news.desc}
                                    </p>

                                    <button className="flex items-center gap-2 text-[#113255] font-bold text-sm group/btn mt-auto pt-4 border-t border-gray-100">
                                        {news.type === "video" ? t('btn_watch') || "Ver Vídeo" : "Ler Artigo"}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MODAL UNIVERSAL (VÍDEO OU ARTIGO) ── */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
                        onClick={() => setSelectedItem(null)}
                    >
                        <button
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 p-2 md:p-3 rounded-full transition-all z-[110]"
                            onClick={() => setSelectedItem(null)}
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className={`relative w-full overflow-hidden shadow-2xl border border-white/10 ${selectedItem.type === "video"
                                    ? "max-w-5xl aspect-video bg-black rounded-2xl"
                                    : "max-w-3xl bg-white rounded-3xl max-h-[85vh] flex flex-col"
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Renderização condicional: Vídeo vs Artigo */}
                            {selectedItem.type === "video" ? (
                                <video
                                    src={selectedItem.videoUrl}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="flex flex-col h-full overflow-hidden">
                                    {/* Imagem de Cabeçalho do Artigo */}
                                    <div className="relative h-48 sm:h-64 md:h-80 w-full shrink-0">
                                        <img src={selectedItem.thumbnail} alt={selectedItem.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <span className="bg-[#3a7d44] text-white text-[10px] uppercase font-black px-3 py-1 rounded-lg tracking-widest mb-3 inline-block">
                                                {selectedItem.source}
                                            </span>
                                            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                                                {selectedItem.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Texto do Artigo com Scroll */}
                                    <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
                                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest mb-8 pb-4 border-b border-gray-100">
                                            <Calendar className="w-4 h-4" /> {selectedItem.date}
                                        </div>

                                        <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed font-serif">
                                            {selectedItem.fullText.map((paragraph: string, idx: number) => (
                                                <p key={idx}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
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