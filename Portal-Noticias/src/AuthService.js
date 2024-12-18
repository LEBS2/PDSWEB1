import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, getDoc, doc } from './firebase';

class AuthService {
  // Método de login que usa Firebase Authentication
  async login(email, senha) {
    try {
      // Tenta fazer login com e-mail e senha
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      
      const user = userCredential.user; // O usuário autenticado
      const userId = user.uid; // ID único do usuário no Firebase

      // Agora, vamos buscar os dados adicionais do usuário no Firestore
      const userDoc = await getDoc(doc(db, 'usuarios', userId)); // Supondo que os dados do usuário estão na coleção 'usuarios'
      
      if (userDoc.exists()) {
        // Se o documento do usuário existir, retornamos os dados do usuário
        return { ...userDoc.data(), uid: userId }; 
      } else {
        throw new Error('Usuário não encontrado no banco de dados');
      }
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  }
}

export default new AuthService();
