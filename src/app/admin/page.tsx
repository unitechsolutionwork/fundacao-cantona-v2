export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Visão Geral</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900">Total de Doações</h3>
                    <p className="text-3xl font-bold mt-2">R$ 0,00</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900">Projetos Ativos</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900">Voluntários</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
            </div>
        </div>
    );
}
