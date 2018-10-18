var cacheName = 'pwa';
var cacheTargets = [
    '/',
    '/index.html',
    '/images/sample.jpg',
    '/scripts/app.js',
    '/styles/main.css'
];

self.addEventListener('install', function(e) {
    console.log('[Service Worker] Installing...');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching...');
            return cache.addAll(cacheTargets);
        })
    );
    
});

self.addEventListener('activate', function(e) {
    console.log('[Service Worker] Activated');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[Service Worker] Fetching from cache...', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    )
})