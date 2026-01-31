const CACHE_NAME = 'sig-senegal-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/leaflet.css',
  '/css/qgis2web.css',
  '/css/L.Control.Locate.min.css',
  '/css/fontawesome-all.min.css',
  '/js/leaflet.js',
  '/js/L.Control.Locate.min.js',
  '/js/leaflet-measure.js',
  '/images/icon-192.svg',
  '/images/icon-512.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, resp.clone());
          return resp;
        });
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
