import { firestore } from '../firebase'; // Importa a configuração do Firestore
import { collection, addDoc, updateDoc, deleteDoc, getDocs, getDoc, doc, query, where } from 'firebase/firestore';

class DAOService {
  constructor(collectionPath) {
    if (!collectionPath) {
      throw new Error('Collection path must be provided');
    }
    // Referência à coleção no Firestore
    this.collectionRef = collection(firestore, collectionPath);
  }

  // Função para buscar documentos por um campo específico
  async search(property, value) {
    try {
      const q = query(this.collectionRef, where(property, '==', value)); // Busca no Firestore
      const querySnapshot = await getDocs(q); // Executa a busca
      const documents = [];

      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() }); // Adiciona o documento encontrado
      });

      return documents; // Retorna os documentos encontrados
    } catch (error) {
      console.error('Erro ao buscar documentos: ', error);
      throw new Error('Erro ao buscar documentos');
    }
  }

  // Função para inserir um novo documento (cadastrar administrador)
  async insert(object) {
    try {
      const docRef = await addDoc(this.collectionRef, object); // Adiciona documento ao Firestore
      return docRef.id; // Retorna o ID do novo documento inserido
    } catch (error) {
      console.error('Erro ao adicionar documento: ', error);
      throw new Error('Erro ao adicionar documento');
    }
  }

  // Função para atualizar um documento existente
  async update(id, object) {
    try {
      const docRef = doc(firestore, this.collectionRef.path, id); // Referência ao documento
      await updateDoc(docRef, object); // Atualiza o documento com os novos dados
    } catch (error) {
      console.error('Erro ao atualizar documento: ', error);
      throw new Error('Erro ao atualizar documento');
    }
  }

  // Função para deletar um documento
  async delete(id) {
    try {
      const docRef = doc(firestore, this.collectionRef.path, id); // Referência ao documento
      await deleteDoc(docRef); // Deleta o documento
    } catch (error) {
      console.error('Erro ao deletar documento: ', error);
      throw new Error('Erro ao deletar documento');
    }
  }

  // Função para obter todos os documentos de uma coleção
  async getAll() {
    try {
      const querySnapshot = await getDocs(this.collectionRef);
      const documents = [];

      querySnapshot.forEach(doc => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      return documents;
    } catch (error) {
      console.error('Erro ao obter documentos: ', error);
      throw new Error('Erro ao obter documentos');
    }
  }

  // Função para obter um único documento por ID
  async get(id) {
    try {
      const docRef = doc(firestore, this.collectionRef.path, id); // Referência ao documento
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }; // Retorna o documento encontrado
      } else {
        throw new Error('Documento não encontrado!');
      }
    } catch (error) {
      console.error('Erro ao obter documento: ', error);
      throw new Error('Erro ao obter documento');
    }
  }
}

export default DAOService;
