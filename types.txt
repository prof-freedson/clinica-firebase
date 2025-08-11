import { Timestamp } from 'firebase/firestore';

export interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface Paciente {
  id?: string;
  nome: string;
  dataNascimento: string;
  peso: number;
  altura: number;
  tipoSanguineo: string;
  endereco: Endereco;
  telefones: string[];
  emails: string[];
  ativo: boolean;
  criadoEm?: Timestamp;
  atualizadoEm?: Timestamp;
}

export interface PacienteFormData {
  nome: string;
  dataNascimento: string;
  peso: number;
  altura: number;
  tipoSanguineo: string;
  endereco: Endereco;
  telefones: string[];
  emails: string[];
}

export interface PacienteListItem {
  id: string;
  nome: string;
  dataNascimento: string;
  bairro: string;
  cidade: string;
}
