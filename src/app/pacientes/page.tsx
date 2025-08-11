'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PacienteService } from '@/lib/paciente-service';
import { PacienteListItem } from '@/lib/types';

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<PacienteListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Carregar pacientes
  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = async () => {
    try {
      console.log('🚀 Iniciando carregamento de pacientes na página...');
      setLoading(true);
      
      console.log('📞 Chamando PacienteService.listarPacientes()...');
      const dados = await PacienteService.listarPacientes();
      
      console.log('📥 Dados recebidos na página:', dados);
      console.log('📊 Número de pacientes:', dados.length);
      
      setPacientes(dados);
      console.log('✅ Estado atualizado com sucesso');
      
    } catch (error) {
      console.error('💥 Erro na página ao carregar pacientes:', error);
      alert('Erro ao carregar pacientes');
      console.error(error);
    } finally {
      setLoading(false);
      console.log('🏁 Carregamento finalizado');
    }
  };

  const excluirPaciente = async (id: string, nome: string) => {
    if (!confirm(`Deseja realmente excluir o paciente ${nome}?`)) {
      return;
    }

    try {
      await PacienteService.excluirPaciente(id);
      alert('Paciente excluído com sucesso');
      carregarPacientes();
    } catch (error) {
      alert('Erro ao excluir paciente');
      console.error(error);
    }
  };

  // Filtrar pacientes
  const pacientesFiltrados = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.bairro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando pacientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Pacientes</h1>
            <p className="text-gray-600 mt-1">
              {pacientes.length} paciente{pacientes.length !== 1 ? 's' : ''} cadastrado{pacientes.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <Link 
            href="/pacientes/criar"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">➕</span>
            Novo Paciente
          </Link>
        </div>

        {/* Barra de Pesquisa */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Pesquisar por nome, cidade ou bairro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Lista de Pacientes */}
        {pacientesFiltrados.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <span className="text-6xl mb-4 block">👤</span>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? 'Tente pesquisar com outros termos'
                : 'Comece cadastrando seu primeiro paciente'
              }
            </p>
            {!searchTerm && (
              <Link 
                href="/pacientes/criar"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="mr-2">➕</span>
                Cadastrar Primeiro Paciente
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {pacientesFiltrados.map((paciente) => (
              <div key={paciente.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                <div className="flex items-center justify-between">
                  
                  {/* Informações do Paciente */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="mr-2">👤</span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {paciente.nome}
                      </h3>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Data de Nascimento:</span>
                        <br />
                        {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}
                      </div>
                      
                      <div className="flex items-center">
                        <span className="mr-1">📍</span>
                        <span>{paciente.bairro}</span>
                      </div>
                      
                      <div>
                        <span className="font-medium">Cidade:</span>
                        <br />
                        {paciente.cidade}
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      href={`/pacientes/${paciente.id}/editar`}
                      className="inline-flex items-center px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                      title="Editar paciente"
                    >
                      <span>✏️</span>
                    </Link>
                    
                    <button
                      onClick={() => excluirPaciente(paciente.id, paciente.nome)}
                      className="inline-flex items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      title="Excluir paciente"
                    >
                      <span>🗑️</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}