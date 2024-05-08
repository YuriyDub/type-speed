import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const API_KEY = import.meta.env.VITE_API_KEY;

const app = initializeApp({
  apiKey: API_KEY,
  authDomain: "type-speed-f60af.firebaseapp.com",
  projectId: "type-speed-f60af",
  storageBucket: "type-speed-f60af.appspot.com",
  messagingSenderId: "183185674560",
  appId: "1:183185674560:web:6b39ba8c3a54ad8d406aa5",
  measurementId: "G-T0PSS09301",
});

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
