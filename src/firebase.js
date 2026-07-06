import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCsdhhTSQhuq2WbA9RxnzJiS7kSyu23OKs",
  authDomain: "dashboard-react-14bb4.firebaseapp.com",
  projectId: "dashboard-react-14bb4",
  storageBucket: "dashboard-react-14bb4.firebasestorage.app",
  messagingSenderId: "369622540665",
  appId: "1:369622540665:web:0ba93472c8107dafa78fa8",
  measurementId: "G-LY8XZJK1VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);