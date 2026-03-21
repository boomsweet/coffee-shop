import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 FIX: config ครบ
const firebaseConfig = {
  apiKey: "AIzaSyCW-ztNX8EAio66VN8ODKo6_z9R8-B99mU",
  authDomain: "coffee-shop-2042e.firebaseapp.com",
  databaseURL: "https://coffee-shop-2042e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coffee-shop-2042e",
  storageBucket: "coffee-shop-2042e.appspot.com",
  messagingSenderId: "835937086040",
  appId: "1:835937086040:web:e7002f925d0b751cadb82d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔥 export ให้ครบ (สำคัญ)
export { db, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc };
