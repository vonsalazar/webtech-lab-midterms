var cacheName = 'pwa';
var cacheTargets = [
    '/',
    '/index.html',
    '/images/homeicon.png',
    '/images/homeicon128.png',
    '/images/homeicon64.png',
    '/images/homeicon32.png',
    '/images/sample1.png',
    '/images/sample2.png',
    '/images/sample3.png',
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

            if (response) {
                console.log("[Service Worker] Exists in cache")
                return response;
            }
            return fetch(e.request);
        })
    )
})