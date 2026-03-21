import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCW-ztNX8EAio66VN8ODKo6_z9R8-B99mU",
  authDomain: "coffee-shop-2042e.firebaseapp.com",
  projectId: "coffee-shop-2042e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc };
