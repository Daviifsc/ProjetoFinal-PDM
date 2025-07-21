const VERSION = '1.1';
const CACHE_NAME = 'catalogo-pwa-v1';
const URLS_TO_CACHE = [
  'catalogo.html',
  'CSS/style.css',
  'JS/app.js',
  'DATA/produtos.json'
];

// Instala o Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Ativa e limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

// Intercepta requisições para funcionar offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resposta => {
      return resposta || fetch(event.request);
    })
  );
});
