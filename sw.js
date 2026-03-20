self.addEventListener('install', e => { e.waitUntil(caches.open('hoptea-v1').then(cache=>cache.addAll(['/index.html','/customer.html','/admin.html']))); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))); });
