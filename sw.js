// บังคับให้ Service Worker ตัวใหม่ทำงานทันที
self.addEventListener("install", (e) => {
  self.skipWaiting();
});

// เปิดใช้งาน Service Worker ทันที
self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim());
});

// เหตุการณ์ Fetch (จำเป็นต้องมีเพื่อให้ติดตั้งเป็นแอป PWA ได้)
self.addEventListener("fetch", (e) => {
  // คุณสามารถปล่อยว่างไว้แบบนี้ได้ หรือจะทำระบบ Cache ในอนาคตก็ได้
});
