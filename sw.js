const cacheName = 'hoptea-v1';
const assets = [
  './customer.html',
  './admin.html',
  './manifest.json',
  './images/icon192.png',
  './images/icon512.png'
];

self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(cacheName).then(cache=>{
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(res=>{
      return res || fetch(e.request);
    })
  );
});
