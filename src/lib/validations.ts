import { PacienteFormData } from './types';

// Funções de validação simples
export const validarPaciente = (dados: PacienteFormData): string[] => {
  const erros: string[] = [];
  
  if (!dados.nome || dados.nome.trim() === '') {
    erros.push('Nome é obrigatório');
  }
  
  if (!dados.dataNascimento) {
    erros.push('Data de nascimento é obrigatória');
  }
  
  if (dados.peso <= 0 || dados.peso > 999) {
    erros.push('Peso deve estar entre 0.1 e 999 kg');
  }
  
  if (dados.altura <= 0 || dados.altura > 3) {
    erros.push('Altura deve estar entre 0.1 e 3 metros');
  }
  
  if (!dados.endereco.rua || dados.endereco.rua.trim() === '') {
    erros.push('Rua é obrigatória');
  }
  
  if (!dados.endereco.cidade || dados.endereco.cidade.trim() === '') {
    erros.push('Cidade é obrigatória');
  }
  
  if (!dados.endereco.estado || dados.endereco.estado.length !== 2) {
    erros.push('Estado deve ter 2 caracteres');
  }
  
  if (dados.telefones.filter(t => t.trim() !== '').length === 0) {
    erros.push('Pelo menos um telefone é obrigatório');
  }
  
  if (dados.emails.filter(e => e.trim() !== '').length === 0) {
    erros.push('Pelo menos um email é obrigatório');
  }
  
  return erros;
};

// Função para validar email
export const validarEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função para validar telefone (formato brasileiro)
export const validarTelefone = (telefone: string): boolean => {
  const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return telefoneRegex.test(telefone);
};

// Função para formatar telefone
export const formatarTelefone = (telefone: string): string => {
  const numeros = telefone.replace(/\D/g, '');
  
  if (numeros.length === 11) {
    return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7)}`;
  } else if (numeros.length === 10) {
    return `(${numeros.slice(0,2)}) ${numeros.slice(2,6)}-${numeros.slice(6)}`;
  }
  
  return telefone;
};

// Função para calcular idade
export const calcularIdade = (dataNascimento: string): number => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  
  return idade;
};

// Função para calcular IMC
export const calcularIMC = (peso: number, altura: number): number => {
  if (altura <= 0) return 0;
  return peso / (altura * altura);
};
