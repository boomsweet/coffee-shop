import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCW-ztNX8EAio66VN8ODKo6_z9R8-B99mU",
  authDomain: "coffee-shop-2042e.firebaseapp.com",
  projectId: "coffee-shop-2042e",
  storageBucket: "coffee-shop-2042e.firebasestorage.app",
  messagingSenderId: "835937086040",
  appId: "1:835937086040:web:e7002f925d0b751cadb82d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot };
