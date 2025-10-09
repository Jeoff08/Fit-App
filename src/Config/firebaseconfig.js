// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDflnSAYL9x0sNQPBMmEUv2aQnfAAedwKU",
  authDomain: "fir-app-2fd3a.firebaseapp.com",
  projectId: "fir-app-2fd3a",
  storageBucket: "fir-app-2fd3a.firebasestorage.app",
  messagingSenderId: "523172542485",
  appId: "1:523172542485:web:39536b05656e6fcfe2b61c",
  measurementId: "G-69Q93WZFNS"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, analytics };