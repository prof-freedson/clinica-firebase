import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Paciente, PacienteFormData, PacienteListItem } from './types';

const COLLECTION_NAME = 'paciente';

export class PacienteService {
  
  // Listar todos os pacientes
  static async listarPacientes(): Promise<PacienteListItem[]> {
    try {
      console.log('🔍 Iniciando busca de pacientes...');
      console.log('📁 Nome da coleção:', COLLECTION_NAME);
      
      // Query simplificada para não precisar de índice composto
      const collectionRef = collection(db, COLLECTION_NAME);
      console.log('🔎 Referência da coleção criada:', collectionRef);
      
      console.log('⏳ Aguardando resposta do Firestore...');
      const querySnapshot = await getDocs(collectionRef);
      
      console.log('📊 Resposta recebida:', querySnapshot);
      console.log('📄 Número de documentos:', querySnapshot.docs.length);
      
      if (querySnapshot.docs.length > 0) {
        querySnapshot.docs.forEach((doc, index) => {
          console.log(`📋 Documento ${index + 1}:`, doc.id, doc.data());
        });
      }
      
      // Filtrar e ordenar no cliente (temporariamente)
      const todosPacientes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome,
        dataNascimento: doc.data().dataNascimento,
        bairro: doc.data().endereco?.bairro || 'N/A',
        cidade: doc.data().endereco?.cidade || 'N/A',
        ativo: doc.data().ativo
      }));
      
      // Filtrar ativos e ordenar por nome
      const pacientesAtivos = todosPacientes
        .filter(p => p.ativo !== false) // Inclui true e undefined
        .sort((a, b) => a.nome.localeCompare(b.nome));
      
      console.log('✅ Resultado final:', pacientesAtivos);
      return pacientesAtivos;
      
    } catch (error) {
      console.error('❌ Erro ao listar pacientes:', error);
      console.error('🔍 Detalhes do erro:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      throw new Error('Erro ao carregar pacientes');
    }
  }

  // Buscar paciente por ID
  static async buscarPaciente(id: string): Promise<Paciente | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Paciente;
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      throw new Error('Erro ao carregar paciente');
    }
  }

  // Criar novo paciente
  static async criarPaciente(dados: PacienteFormData): Promise<string> {
    try {
      const pacienteData = {
        ...dados,
        ativo: true,
        criadoEm: Timestamp.now(),
        atualizadoEm: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), pacienteData);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      throw new Error('Erro ao criar paciente');
    }
  }

  // Atualizar paciente
  static async atualizarPaciente(id: string, dados: PacienteFormData): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      
      await updateDoc(docRef, {
        ...dados,
        atualizadoEm: Timestamp.now(),
      });
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      throw new Error('Erro ao atualizar paciente');
    }
  }

  // Excluir paciente (soft delete)
  static async excluirPaciente(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      
      await updateDoc(docRef, {
        ativo: false,
        atualizadoEm: Timestamp.now(),
      });
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
      throw new Error('Erro ao excluir paciente');
    }
  }

  // Buscar pacientes por cidade
  static async buscarPorCidade(cidade: string): Promise<PacienteListItem[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('endereco.cidade', '==', cidade),
        where('ativo', '==', true),
        orderBy('nome')
      );
      
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome,
        dataNascimento: doc.data().dataNascimento,
        bairro: doc.data().endereco.bairro,
        cidade: doc.data().endereco.cidade,
      }));
    } catch (error) {
      console.error('Erro ao buscar pacientes por cidade:', error);
      throw new Error('Erro ao buscar pacientes');
    }
  }
}