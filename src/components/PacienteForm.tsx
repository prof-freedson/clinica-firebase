'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PacienteService } from '@/lib/paciente-service';
import { Paciente, PacienteFormData } from '@/lib/types';
import { validarPaciente } from '@/lib/validations';

interface PacienteFormProps {
  paciente?: Paciente;
  mode: 'criar' | 'editar';
}

const tiposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function PacienteForm({ paciente, mode }: PacienteFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState<PacienteFormData>({
    nome: '',
    dataNascimento: '',
    peso: 0,
    altura: 0,
    tipoSanguineo: 'O+',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    },
    telefones: [''],
    emails: ['']
  });

  // Carregar dados do paciente para edição
  useEffect(() => {
    if (paciente && mode === 'editar') {
      setFormData({
        nome: paciente.nome,
        dataNascimento: paciente.dataNascimento,
        peso: paciente.peso,
        altura: paciente.altura,
        tipoSanguineo: paciente.tipoSanguineo,
        endereco: paciente.endereco,
        telefones: paciente.telefones.length > 0 ? paciente.telefones : [''],
        emails: paciente.emails.length > 0 ? paciente.emails : ['']
      });
    }
  }, [paciente, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar dados
    const validationErrors = validarPaciente(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors([]);

      // Filtrar campos vazios
      const dadosLimpos = {
        ...formData,
        telefones: formData.telefones.filter(tel => tel.trim() !== ''),
        emails: formData.emails.filter(email => email.trim() !== '')
      };

      if (mode === 'criar') {
        await PacienteService.criarPaciente(dadosLimpos);
        alert('Paciente cadastrado com sucesso!');
      } else if (paciente?.id) {
        await PacienteService.atualizarPaciente(paciente.id, dadosLimpos);
        alert('Paciente atualizado com sucesso!');
      }

      router.push('/pacientes');
    } catch (error) {
      alert(mode === 'criar' ? 'Erro ao cadastrar paciente' : 'Erro ao atualizar paciente');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addTelefone = () => {
    setFormData(prev => ({
      ...prev,
      telefones: [...prev.telefones, '']
    }));
  };

  const removeTelefone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      telefones: prev.telefones.filter((_, i) => i !== index)
    }));
  };

  const addEmail = () => {
    setFormData(prev => ({
      ...prev,
      emails: [...prev.emails, '']
    }));
  };

  const removeEmail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      emails: prev.emails.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span>⬅️</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {mode === 'criar' ? 'Cadastrar Paciente' : 'Editar Paciente'}
            </h1>
            <p className="text-gray-600 mt-1">
              {mode === 'criar' 
                ? 'Preencha as informações do novo paciente'
                : 'Atualize as informações do paciente'
              }
            </p>
          </div>
        </div>

        {/* Erros de validação */}
        {errors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-medium mb-2">Corrija os seguintes erros:</h3>
            <ul className="list-disc list-inside text-red-700">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Dados Pessoais */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Dados Pessoais</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nome */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              {/* Data de Nascimento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataNascimento: e.target.value }))}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Tipo Sanguíneo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo Sanguíneo *
                </label>
                <select
                  value={formData.tipoSanguineo}
                  onChange={(e) => setFormData(prev => ({ ...prev, tipoSanguineo: e.target.value }))}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {tiposSanguineos.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              {/* Peso */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.peso}
                  onChange={(e) => setFormData(prev => ({ ...prev, peso: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  min="0.1"
                  max="999"
                  required
                />
              </div>

              {/* Altura */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Altura (m) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.altura}
                  onChange={(e) => setFormData(prev => ({ ...prev, altura: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  min="0.1"
                  max="3"
                  required
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Endereço</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Rua */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rua *
                </label>
                <input
                  type="text"
                  value={formData.endereco.rua}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    endereco: { ...prev.endereco, rua: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nome da rua"
                  required
                />
              </div>

              {/* Número */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número *
                </label>
                <input
                  type="text"
                  value={formData.endereco.numero}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    endereco: { ...prev.endereco, numero: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123"
                  required
                />
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={formData.endereco.estado}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    endereco: { ...prev.endereco, estado: e.target.value.toUpperCase() }
                  }))}
                  className="w-full px-3 py-2 border text-black  border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="MA"
                  required
                />
              </div>

              {/* Bairro */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro *
                </label>
                <input
                  type="text"
                  value={formData.endereco.bairro}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    endereco: { ...prev.endereco, bairro: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nome do bairro"
                  required
                />
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  value={formData.endereco.cidade}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    endereco: { ...prev.endereco, cidade: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nome da cidade"
                  required
                />
              </div>
            </div>
          </div>

          {/* Telefones */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Telefones</h2>
              <button
                type="button"
                onClick={addTelefone}
                className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <span className="mr-1">➕</span>
                Adicionar
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.telefones.map((telefone, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => {
                      const newTelefones = [...formData.telefones];
                      newTelefones[index] = e.target.value;
                      setFormData(prev => ({ ...prev, telefones: newTelefones }));
                    }}
                    className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(98) 91234-5678"
                  />
                  {formData.telefones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTelefone(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      <span>➖</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Emails */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">E-mails</h2>
              <button
                type="button"
                onClick={addEmail}
                className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <span className="mr-1">➕</span>
                Adicionar
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.emails.map((email, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      const newEmails = [...formData.emails];
                      newEmails[index] = e.target.value;
                      setFormData(prev => ({ ...prev, emails: newEmails }));
                    }}
                    className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="email@exemplo.com"
                  />
                  {formData.emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmail(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      <span>➖</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {mode === 'criar' ? 'Cadastrando...' : 'Atualizando...'}
                </>
              ) : (
                <>
                  <span className="mr-2">💾</span>
                  {mode === 'criar' ? 'Cadastrar Paciente' : 'Atualizar Paciente'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}