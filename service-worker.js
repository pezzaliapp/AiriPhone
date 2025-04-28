self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('airiphone-store').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/manifest.json',
        '/icon/airiphone-192.png',
        '/icon/airiphone-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
