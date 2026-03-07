"use client";

import { motion } from "framer-motion";
import { Smartphone, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function DonationSection() {
    const t = useTranslations('Donation');

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-[#fdf8e7] text-[#d4af37] px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                        <span>♥</span> {t('badge')}
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-extrabold text-[#113255]">{t('title')}
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="text-sm text-gray-600">{t('subtitle')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <Link href="/doar">
                        <motion.div whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 flex flex-col items-center text-center cursor-pointer group transition-all">
                            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <Smartphone className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-[#113255] mb-1.5">{t('mpesa_title')}</h3>
                            <p className="text-gray-500 text-sm mb-6">{t('mpesa_desc')}</p>
                            <div className="flex items-center gap-2 text-green-600 font-bold text-sm group-hover:gap-4 transition-all">
                                {t('mpesa_btn')} <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    </Link>

                    <Link href="/doar">
                        <motion.div whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 flex flex-col items-center text-center cursor-pointer group transition-all">
                            <div className="w-16 h-16 bg-blue-50 text-[#113255] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#113255] group-hover:text-white transition-colors">
                                <Landmark className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-[#113255] mb-1.5">{t('bank_title')}</h3>
                            <p className="text-gray-500 text-sm mb-6">{t('bank_desc')}</p>
                            <div className="flex items-center gap-2 text-[#113255] font-bold text-sm group-hover:gap-4 transition-all">
                                {t('bank_btn')} <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </section>
    );
}