// A unique name for the cache
const CACHE_NAME = 'gemini-chat-pwa-v1';

// List of files to cache
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com'
];

// Install event: opens the cache and adds the core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serves cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }

        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});

