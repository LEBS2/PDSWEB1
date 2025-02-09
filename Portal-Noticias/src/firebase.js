// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'; // Agora inclui o signOut
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'; // Funções do Firestore
import { getStorage } from 'firebase/storage'; // Função do Firebase Storage
import { getAnalytics } from 'firebase/analytics'; // Função de analytics (caso precise)

const firebaseConfig = {
  apiKey: "AIzaSyBKZdhYgwjaTMiiqUeYGlrgQc5m9FllYyg",
  authDomain: "pdsweb-portal-noticias.firebaseapp.com",
  projectId: "pdsweb-portal-noticias",
  storageBucket: "pdsweb-portal-noticias.firebasestorage.app",
  messagingSenderId: "40648932935",
  appId: "1:40648932935:web:4731bfb1dfeb211663fb62",
  measurementId: "G-V3DHX3CWWV"
};

// Inicializando o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializando o Analytics (se necessário)
const analytics = getAnalytics(firebaseApp);

// Inicializando o Firestore
const firestore = getFirestore(firebaseApp);

// Inicializando o Firebase Storage
const storage = getStorage(firebaseApp);

// Inicializando o Auth
const auth = getAuth(firebaseApp);

// Exportando as instâncias de Auth, Firestore e Storage
export { auth, firestore, storage, signInWithEmailAndPassword, signOut, getDocs, collection, query, where };

// Caso precise do Analytics
export { analytics };
