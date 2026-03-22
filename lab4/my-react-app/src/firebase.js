import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFbnFLBiCTZkpu4edcyKKMZ6376rjHOg4",
  authDomain: "startup-lab-4.firebaseapp.com",
  projectId: "startup-lab-4",
  storageBucket: "startup-lab-4.firebasestorage.app",
  messagingSenderId: "333677158998",
  appId: "1:333677158998:web:5a99202aaa73626d52d1f7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const db = getFirestore(app);