const CACHE_NAME = 'talentglass-cache-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'coi-serviceworker.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Pass-through handler satisfies security metrics
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
