import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "dsa-visualization-48519.firebaseapp.com",
  projectId: "dsa-visualization-48519",
  storageBucket: "dsa-visualization-48519.appspot.com",
  messagingSenderId: "399530334684",
  appId: "1:399530334684:web:28081dd0b398b218639719"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
