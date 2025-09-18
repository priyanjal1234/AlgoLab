import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "full-stack-with-react.firebaseapp.com",
  projectId: "full-stack-with-react",
  storageBucket: "full-stack-with-react.firebasestorage.app",
  messagingSenderId: "586050001068",
  appId: "1:586050001068:web:84f077b6b4ad518d73e709",
  measurementId: "G-S3L4SMP6M9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider()
