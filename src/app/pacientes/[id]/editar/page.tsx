'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PacienteForm from '@/components/PacienteForm';
import { PacienteService } from '@/lib/paciente-service';
import { Paciente } from '@/lib/types';

interface EditarPacientePageProps {
  params: {
    id: string;
  };
}

export default function EditarPacientePage({ params }: EditarPacientePageProps) {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    carregarPaciente();
  }, [params.id]);

  const carregarPaciente = async () => {
    try {
      setLoading(true);
      const dados = await PacienteService.buscarPaciente(params.id);
      
      if (!dados) {
        alert('Paciente não encontrado');
        router.push('/pacientes');
        return;
      }
      
      setPaciente(dados);
    } catch (error) {
      alert('Erro ao carregar paciente');
      router.push('/pacientes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados do paciente...</p>
        </div>
      </div>
    );
  }

  if (!paciente) {
    return null;
  }

  return <PacienteForm mode="editar" paciente={paciente} />;
}