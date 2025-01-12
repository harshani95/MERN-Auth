
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-afb45.firebaseapp.com",
  projectId: "mern-auth-afb45",
  storageBucket: "mern-auth-afb45.firebasestorage.app",
  messagingSenderId: "1038940809389",
  appId: "1:1038940809389:web:45af7b75503438972ffe24"
};

export const app = initializeApp(firebaseConfig);