const CACHE = 'tox-prompt-v2';
const ASSETS = [
  '/tox-prompt-builder/',
  '/tox-prompt-builder/index.html',
  '/tox-prompt-builder/manifest.json',
  '/tox-prompt-builder/icon-192.png',
  '/tox-prompt-builder/icon-512.png',
  '/tox-prompt-builder/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
