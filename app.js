// ===== MENU STORAGE =====
export function getMenu() {
  const local = localStorage.getItem("menu");
  return local ? JSON.parse(local) : [];
}

export function saveMenu(menu) {
  localStorage.setItem("menu", JSON.stringify(menu));
}

// ===== FIREBASE SYNC =====
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

export function syncMenu(db, callback) {
  const menuRef = ref(db, "menu");
  onValue(menuRef, (snap) => {
    const data = snap.val();
    if (data) {
      const menu = Object.values(data);
      saveMenu(menu);
      callback(menu);
    }
  });
}

export function updateMenuToFirebase(db, menu) {
  const obj = {};
  menu.forEach(m => obj[m.id] = m);
  set(ref(db, "menu"), obj);
}
