import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBKZdhYgwjaTMiiqUeYGlrgQc5m9FllYyg",
  authDomain: "pdsweb-portal-noticias.firebaseapp.com",
  projectId: "pdsweb-portal-noticias",
  storageBucket: "pdsweb-portal-noticias.firebasestorage.app",
  messagingSenderId: "40648932935",
  appId: "1:40648932935:web:4731bfb1dfeb211663fb62"
};

const firebaseApp = initializeApp(config);

export const firestore = getFirestore(firebaseApp);

