import { motion } from 'framer-motion';

const ImpactHistory = () => {
    const data = [
        {
            year: "2024",
            title: "Assistência Social e Terceira Idade",
            details: "Lar de Idosos e Associação Hixikanwe. Doação de produtos alimentares e de primeira necessidade.",
            tag: "Trabalho Social"
        },
        {
            year: "2025",
            title: "Ano do Desporto - Liga Canton 7",
            details: "Torneio de um mês com participação do Ministro da Juventude e Desporto. Investimento de 200k (100k + 100k).",
            tag: "Desporto"
        },
        {
            year: "2026",
            title: "Resposta Humanitária - Cheias",
            items: [
                "Moamba: 10 toneladas de produtos alimentares e vestuário.",
                "Boane: 15 toneladas de ajuda humanitária.",
                "Macia: 3000 kits (35 ton de produtos alimentares).",
                "Chókwè: 50 toneladas de produtos e 3 cabeças de gado."
            ],
            tag: "Emergência"
        },
        {
            year: "Março 2026",
            title: "Educação e Saúde Comunitária",
            details: "5 Bolsas de estudo (1 aluno iniciando agora em Março) e Campanhas de Vacinação Comunitária.",
            tag: "Educação & Saúde"
        }
    ];

    return (
        <section className="py-20 bg-gray-50 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-blue-900">O Nosso Impacto</h2>

                <div className="space-y-12">
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-2xl shadow-lg border-l-8 border-blue-600"
                        >
                            <div className="flex-shrink-0">
                                <span className="text-5xl font-black text-blue-200">{item.year}</span>
                            </div>

                            <div className="flex-grow">
                                <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-blue-800 uppercase bg-blue-100 rounded-full">
                                    {item.tag}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>

                                {item.details && <p className="text-gray-600 leading-relaxed">{item.details}</p>}

                                {item.items && (
                                    <ul className="mt-4 grid md:grid-cols-2 gap-4">
                                        {item.items.map((li, i) => (
                                            <li key={i} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                                                <span className="mr-2 text-blue-600">✔</span> {li}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactHistory;