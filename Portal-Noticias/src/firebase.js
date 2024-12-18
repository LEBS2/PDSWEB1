// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Importando o auth para autenticação
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKZdhYgwjaTMiiqUeYGlrgQc5m9FllYyg",
  authDomain: "pdsweb-portal-noticias.firebaseapp.com",
  projectId: "pdsweb-portal-noticias",
  storageBucket: "pdsweb-portal-noticias.appspot.com",
  messagingSenderId: "40648932935",
  appId: "1:40648932935:web:4731bfb1dfeb211663fb62"
};

// Inicializando o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Exportando Firestore e Auth
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
