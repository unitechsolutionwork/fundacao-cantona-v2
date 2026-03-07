"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, X, Globe } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

export default function Navbar() {
    const t = useTranslations('Menu');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLanguageChange = (newLocale: string) => {
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
        setIsLangOpen(false);
    };

    const isOverlay = !isScrolled && !isOpen;
    const navBackground = isOverlay
        ? "bg-transparent py-2"
        : "bg-white shadow-sm border-b border-gray-100 py-1.5";
    const linkColor = isOverlay
        ? "text-white hover:text-gray-200 drop-shadow-md"
        : "text-gray-600 hover:text-[#3a7d44]";
    const activeLinkColor = isOverlay
        ? "text-white font-bold drop-shadow-md"
        : "text-[#113255] font-bold hover:text-[#3a7d44]";

    const languages = [
        { code: 'pt', name: 'Português', flag: '🇲🇿' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
        { code: 'ar', name: 'العربية', flag: '🇦🇪' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBackground}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">

                    {/* ── Logo ── */}
                    <Link href="/" className={`flex items-center rounded-lg transition-all ${isOverlay ? "bg-white/10 backdrop-blur-md px-2 py-1 shadow-sm" : ""}`}>
                        <Image src="/logo.png" alt="Fundação Cantoná" width={160} height={50} className="h-8 w-auto object-contain" priority />
                    </Link>

                    {/* ── Desktop links ── */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link href="/" className={`text-sm font-semibold transition-colors ${pathname === `/${locale}` ? activeLinkColor : linkColor}`}>{t('inicio')}</Link>
                        <Link href="/sobre" className={`text-sm font-medium  transition-colors ${pathname.includes("/sobre") ? activeLinkColor : linkColor}`}>{t('sobre')}</Link>
                        <Link href="/trabalhos" className={`text-sm font-medium  transition-colors ${pathname.includes("/trabalhos") ? activeLinkColor : linkColor}`}>{t('impacto')}</Link>
                        <Link href="/doar" className={`text-sm font-medium  transition-colors ${pathname.includes("/doar") ? activeLinkColor : linkColor}`}>{t('doacoes')}</Link>
                        {/* Notícias antes de Contacto */}
                        <Link href="/noticias" className={`text-sm font-medium  transition-colors ${pathname.includes("/noticias") ? activeLinkColor : linkColor}`}>{t('noticias')}</Link>
                        <Link href="/contacto" className={`text-sm font-medium  transition-colors ${pathname.includes("/contacto") ? activeLinkColor : linkColor}`}>{t('contacto')}</Link>
                    </div>

                    {/* ── Right side ── */}
                    <div className="flex items-center gap-2">

                        {/* Language selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={`flex items-center gap-1.5 uppercase text-xs font-bold px-3 py-2 rounded-full transition-all ${isOverlay
                                    ? "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md"
                                    : "bg-white text-[#113255] border border-gray-200 hover:border-gray-300 hover:shadow-sm"}`}
                            >
                                <Globe className="w-3.5 h-3.5" />
                                <span>{locale}</span>
                            </button>

                            {isLangOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-100 p-1.5 z-50 flex flex-col gap-0.5">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${locale === lang.code
                                                ? "bg-[#f0f9f4] text-[#3a7d44]"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-[#113255]"}`}
                                        >
                                            <span className="text-base">{lang.flag}</span>
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Doar button */}
                        <Link
                            href="/doar"
                            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${isOverlay
                                ? "bg-white text-[#3a7d44] hover:bg-gray-50 hover:scale-105"
                                : "bg-[#3a7d44] text-white hover:bg-opacity-90 hover:shadow-md hover:-translate-y-0.5"}`}
                        >
                            {t('doar_btn')}
                            <Heart className={`w-3.5 h-3.5 ${isOverlay ? "fill-[#3a7d44]" : "fill-white"}`} />
                        </Link>

                        {/* Mobile hamburger */}
                        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-1.5 rounded-lg focus:outline-none">
                            {isOpen
                                ? <X className="w-5 h-5 text-[#113255]" />
                                : <Menu className={`w-5 h-5 ${isOverlay ? "text-white" : "text-[#113255]"}`} />
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile menu ── */}
            <div className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-4 pt-3 pb-5 space-y-1">
                    <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-sm font-bold text-[#113255] hover:bg-gray-50 rounded-xl">{t('inicio')}</Link>
                    <Link href="/sobre" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-sm font-bold text-[#113255] hover:bg-gray-50 rounded-xl">{t('sobre')}</Link>
                    <Link href="/trabalhos" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-sm font-bold text-[#113255] hover:bg-gray-50 rounded-xl">{t('impacto')}</Link>
                    <Link href="/doar" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-sm font-bold text-[#113255] hover:bg-gray-50 rounded-xl">{t('doacoes')}</Link>
                    {/* Link Notícias no Mobile */}
                    <Link href="/noticias" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-sm font-bold text-[#113255] hover:bg-gray-50 rounded-xl">{t('noticias')}</Link>
                    <Link href="/contacto" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-sm font-bold text-[#113255] hover:bg-gray-50 rounded-xl">{t('contacto')}</Link>
                    <div className="pt-2">
                        <Link href="/doar" onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 bg-[#3a7d44] text-white w-full py-3 rounded-xl text-sm font-bold">
                            {t('doar_btn')} <Heart className="w-4 h-4 fill-current" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}