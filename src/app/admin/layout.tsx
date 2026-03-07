export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar Placeholder */}
            <aside className="w-64 bg-white border-r">
                <div className="p-6">
                    <h2 className="text-xl font-bold">Admin Dashboard</h2>
                </div>
                <nav className="px-4 py-2">
                    <ul className="space-y-2">
                        <li>
                            <a href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                Visão Geral
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col">
                {/* Header Placeholder */}
                <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-gray-800">Cantoná Admin</h1>
                    <div>
                        <span className="text-sm text-gray-500">Usuário Logado</span>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
