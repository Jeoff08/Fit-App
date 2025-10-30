import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAY7MxxnploG50dSP9InYESxpsxSrRjWWE",
  authDomain: "fitness-application-dad09.firebaseapp.com",
  projectId: "fitness-application-dad09",
  storageBucket: "fitness-application-dad09.firebasestorage.app",
  messagingSenderId: "339926986731",
  appId: "1:339926986731:web:bccc64f75922e9437cb3ae",
  measurementId: "G-TERLH7KR06"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, analytics };