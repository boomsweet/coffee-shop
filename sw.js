// sw.js
self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim());
});

// ฟังคำสั่งจากหน้า Admin เพื่อสั่งให้แสดง Notification
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "NEW_ORDER") {
    const options = {
      body: `คุณมีออเดอร์ใหม่จากคุณ ${event.data.name} คอยอยู่ครับ!`,
      icon: "https://cdn-icons-png.flaticon.com/512/2734/2734035.png",
      badge: "https://cdn-icons-png.flaticon.com/512/2734/2734035.png",
      vibrate: [200, 100, 200],
      tag: "new-order-alert", // ป้องกันการแจ้งเตือนซ้ำซ้อน
      data: { url: "admin.html" }
    };

    self.registration.showNotification("🔔 Hop Cafe: ออเดอร์ใหม่!", options);
  }
});

// เมื่อกดที่แถบแจ้งเตือน ให้เปิดหน้าแอปขึ้นมา
self.onnotificationclick = (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("admin.html") && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("admin.html");
    })
  );
};
