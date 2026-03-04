import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3YCRI2LnG27iiOun1EORKrvKBN9YJje0",
  authDomain: "spiritlifeekklesianetwor-ec754.firebaseapp.com",
  projectId: "spiritlifeekklesianetwor-ec754",
  storageBucket: "spiritlifeekklesianetwor-ec754.firebasestorage.app",
  messagingSenderId: "546049676429",
  appId: "1:546049676429:web:24519603d7cb367c95bec4",
  measurementId: "G-8LVFP07DD0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };