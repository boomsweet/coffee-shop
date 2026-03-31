// sw.js - ปรับปรุงใหม่เพื่อให้รองรับ Background Notification
self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim());
});

// ฟังก์ชันแสดงการแจ้งเตือน
function showNotification(customerName) {
  const options = {
    body: `มีออเดอร์ใหม่จากคุณ ${customerName} เข้ามาครับ!`,
    icon: "https://cdn-icons-png.flaticon.com/512/2734/2734035.png",
    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40],
    tag: "new-order-" + Date.now(),
    renotify: true,
    requireInteraction: true, // แจ้งเตือนจะค้างไว้จนกว่าจะกดปิด
    data: { url: "admin.html" }
  };
  self.registration.showNotification("🔔 Hop Cafe: ออเดอร์ใหม่!", options);
}

// รับข้อความจากหน้า Admin หรือจากระบบ Push
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "NEW_ORDER") {
    showNotification(event.data.name);
  }
});

self.onnotificationclick = (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("admin.html") && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("admin.html");
    })
  );
};
