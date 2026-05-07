import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTZyXm2QKzfbJ6l3qfrGd_y4U_eELx9Jc",
  authDomain: "gen-lang-client-0859869369.firebaseapp.com",
  projectId: "gen-lang-client-0859869369",
  storageBucket: "gen-lang-client-0859869369.firebasestorage.app",
  messagingSenderId: "1095005531170",
  appId: "1:1095005531170:web:b96839317c15037a9eee7b",
  measurementId: "G-DT9WSBL4PR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
