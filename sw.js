const CACHE_NAME = 'floating-ray-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './icon_192.png',
    './icon_512.png',
    './three.min.js',
    './昼　無色の呼吸.mp3',
    './昼　静寂のガラス庭園.mp3',
    './昼　静寂のポリリズム.mp3',
    './昼　静寂の呼吸.mp3',
    './夜　1.mp3',

    './夜　静かなままの世界.mp3',
    './夜　静かなままの世界2.mp3',
    './夜　静けさの海へ.mp3'
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
