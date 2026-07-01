// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR6o-JZncDfopEVYO2A7UqLKP-3Gm1JNQ",
  authDomain: "kerja-ec765.firebaseapp.com",
  databaseURL: "https://kerja-ec765-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kerja-ec765",
  storageBucket: "kerja-ec765.firebasestorage.app",
  messagingSenderId: "589115117069",
  appId: "1:589115117069:web:587240df47f749e6a70f44",
  measurementId: "G-3VPRXZWC5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp };