// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIKM9eosJ1k4dQD4yx56UOABqp2-K8c_Y",
  authDomain: "chat-app-reactjs1.firebaseapp.com",
  projectId: "chat-app-reactjs1",
  storageBucket: "chat-app-reactjs1.appspot.com",
  messagingSenderId: "427385397571",
  appId: "1:427385397571:web:ce6b45de81c1e363180ff6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);