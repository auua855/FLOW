const CACHE_NAME = 'floating-ray-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './icon_192.png',
    './icon_512.png',
    './three.min.js',
    './day musho.mp3',
    './day gal.mp3',
    './day por.mp3',
    './day koky.mp3',
    './night 1.mp3',
    './night seka.mp3',
    './night seka2.mp3',
    './night umi.mp3'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
