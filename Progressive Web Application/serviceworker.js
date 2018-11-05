var cacheName = 'pwa';
var cacheTargets = [
    '/',
    '/manifest.json',
    '/index.html',
    '/disasters.html',
    '/preparedness.html',
    '/pubservices.html',
    '/fonts/segoeui.woff',
    '/images/homeicon.png',
    '/images/homeicon128.png',
    '/images/homeicon64.png',
    '/images/homeicon32.png',
    '/images/homebanner.jpg',
    '/images/educatecolumn1.png',
    '/images/preparecolumn2.png',
    '/images/locatecolumn3.png',
    '/images/earthquake.jpg',
    '/images/flooding.jpg',
    '/images/landslide.jpg',
    '/images/PAGASAstormWarningSystem.png',
    '/images/sampleImage.jpg',
    '/images/sampleMap.jpg',
    '/images/tropicalCyclone.jpg',
    '/images/locations/amdc_baguio.jpg',
    '/images/locations/amdc_latrinidad.jpg',
    '/images/locations/bcpo_station1.jpg',
    '/images/locations/bcpo_station2.jpg',
    '/images/locations/bcpo_station3.jpg',
    '/images/locations/bcpo_station4.jpg',
    '/images/locations/bcpo_station5.jpg',
    '/images/locations/bcpo_station7.jpg',
    '/images/locations/bcpo_station9.jpg',
    '/images/locations/benguetpolice_km6outpost.jpg',
    '/images/locations/benguetpolice_municipal.jpg',
    '/images/locations/firedept_baguio.jpg',
    '/images/locations/hospital_baguiogeneral.jpg',
    '/images/locations/hospital_baguiomedcenter.jpg',
    '/images/locations/hospital_benguetgeneral.jpg',
    '/images/locations/hospital_campdangwa.jpg',
    '/images/locations/hospital_divinegrace.jpg',
    '/images/locations/hospital_notredame.jpg',
    '/images/locations/hospital_pines.jpg',
    '/images/locations/hospital_sacredheart.jpg',
    '/images/locations/redcross_baguio.jpg',
    '/images/locations/redcross_latrinidad.jpg',
    '/images/locations/sample_firedept.jpg',
    '/images/locations/sample_hospital.jpg',
    '/images/locations/sample_policestation.jpg',
    '/scripts/app.js',
    '/scripts/location.js',
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