// sw.js - Hop Cafe Admin Notification System

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim());
});

// --- ส่วนที่ 1: รับข้อมูลจากหน้า Admin เมื่อมีการตรวจพบออเดอร์ใหม่ ---
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "NEW_ORDER") {
    showNotification(event.data.name);
  }
});

// --- ส่วนที่ 2: ฟังก์ชันแสดงการแจ้งเตือน (ดึงมาไว้ข้างนอกเพื่อให้เรียกใช้ได้หลายทาง) ---
function showNotification(customerName) {
  const options = {
    body: `คุณมีออเดอร์ใหม่จากคุณ ${customerName} คอยอยู่ครับ!`,
    icon: "https://cdn-icons-png.flaticon.com/512/2734/2734035.png",
    badge: "https://cdn-icons-png.flaticon.com/512/2734/2734035.png",
    vibrate: [300, 100, 300, 100, 300], // สั่นแรงขึ้นเพื่อให้รู้ตัว
    tag: "new-order-alert-" + Date.now(), // ใช้ timestamp เพื่อให้เด้งซ้อนกันได้ถ้ามีหลายออเดอร์
    renotify: true, // ให้สั่นและแจ้งเตือนซ้ำแม้จะเป็น tag เดิม
    data: { url: "admin.html" },
    actions: [
      { action: 'open', title: 'ดูออเดอร์เลย' }
    ]
  };

  self.registration.showNotification("🔔 Hop Cafe: ออเดอร์ใหม่!", options);
}

// --- ส่วนที่ 3: จัดการเมื่อมีการคลิกที่แถบแจ้งเตือน ---
self.onnotificationclick = (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // 1. ถ้ามีหน้า Admin เปิดค้างไว้อยู่แล้ว ให้ Focus ไปที่หน้านั้น
      for (const client of clientList) {
        if (client.url.includes("admin.html") && "focus" in client) {
          return client.focus();
        }
      }
      // 2. ถ้าปิดหน้าเว็บไปแล้ว ให้เปิดหน้า Admin ขึ้นมาใหม่
      if (clients.openWindow) {
        return clients.openWindow("admin.html");
      }
    })
  );
};

// --- ส่วนที่ 4: (สำคัญมาก) ป้องกันระบบหลับ (Keep Alive) ---
// ส่วนนี้จะช่วยให้ Service Worker ตื่นตัวบ่อยขึ้นเมื่อมีการใช้งานระบบ Push
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    showNotification(data.name || "ลูกค้า");
  }
});
