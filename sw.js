// sw.js — Service Worker pour ETF Predictor PWA
// Stratégie : Cache-first pour l'app shell, Network-first pour les données Yahoo

const CACHE_NAME = 'etf-predictor-v1';
const APP_SHELL = [
  './',
  './etf_predictor_v2.html',
  './manifest.json'
];

// Installation : mise en cache de l'app shell
self.addEventListener('install', event => {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Mise en cache app shell');
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', event => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch : stratégie selon la requête
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Requêtes Yahoo Finance → Network only (données temps réel, pas de cache)
  if (url.hostname.includes('yahoo.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // App shell → Cache first, fallback network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Mettre en cache les nouvelles ressources statiques
        if (response.ok && event.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    }).catch(() => {
      // Offline fallback
      return caches.match('./etf_predictor_v2.html');
    })
  );
});
