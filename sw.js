/* Orlando Trip Hub — offline service worker */
const CACHE = 'triphub-v2';
const ASSETS = [
  './',
  './index.html',
  './trip-hub.html',
  './trip-data.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // The XR app is never served from cache. A stale bundle is far more painful
  // to debug in a headset than no offline support, and the Quest is online for
  // the demo anyway. (Note: trip-data.js IS cached above — the phone app needs
  // it offline, and /xr/ pulls it from the same cached copy.)
  if (url.pathname.includes('/xr/')) return;

  // Live wait times: network first, fall back to last cached response
  if (url.hostname.endsWith('queue-times.com')) {
    e.respondWith(
      fetch(e.request)
        .then((r) => {
          const copy = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return r;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Everything else (app shell, Google Fonts): stale-while-revalidate
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const net = fetch(e.request)
        .then((r) => {
          if (r && (r.ok || r.type === 'opaque')) {
            const copy = r.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return r;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});
