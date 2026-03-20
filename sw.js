const cacheName = "hoptea-v1";
const filesToCache = [
  "/customer.html",
  "/admin.html",
  "/manifest.json",
  "/manifest-admin.json",
  "/sw.js",
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js",
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"
];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(cacheName).then(cache=>cache.addAll(filesToCache)));
});

self.addEventListener("activate", e=>{e.waitUntil(self.clients.claim());});

self.addEventListener("fetch", e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
