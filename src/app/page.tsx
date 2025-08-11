import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Gestão Clínica
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gerencie pacientes, endereços e informações médicas de forma simples e eficiente
          </p>
        </div>

        {/* Cards de Funcionalidades */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card Pacientes */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pacientes</h3>
            <p className="text-gray-600 text-sm">
              Cadastre e gerencie informações completas dos pacientes
            </p>
          </div>

          {/* Card Endereços */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Endereços</h3>
            <p className="text-gray-600 text-sm">
              Mantenha dados de endereços organizados e atualizados
            </p>
          </div>

          {/* Card Consultas */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Consultas</h3>
            <p className="text-gray-600 text-sm">
              Agende e acompanhe consultas médicas
            </p>
          </div>

          {/* Card Relatórios */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Relatórios</h3>
            <p className="text-gray-600 text-sm">
              Visualize estatísticas e gere relatórios detalhados
            </p>
          </div>
        </div>

        {/* Botão Principal */}
        <div className="text-center">
          <Link 
            href="/pacientes" 
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">👥</span>
            Gerenciar Pacientes
          </Link>
        </div>

        {/* Informações sobre Firebase */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sobre a Tecnologia
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Firebase Firestore</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Banco de dados NoSQL em tempo real</li>
                <li>• Sincronização automática entre dispositivos</li>
                <li>• Escalabilidade automática</li>
                <li>• Suporte offline nativo</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Next.js + TypeScript</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Framework React moderno</li>
                <li>• Tipagem estática com TypeScript</li>
                <li>• Roteamento automático</li>
                <li>• Performance otimizada</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}