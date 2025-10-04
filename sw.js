// sw.js - Service Worker for PWA
const CACHE_NAME = "neurosort-v2";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/NeuroSort/",
        "/NeuroSort/index.html",
        "/NeuroSort/manifest.json",
        "/NeuroSort/Images/icon-192.png",
        "/NeuroSort/Images/icon-512.png"
      ]);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});

// Fetch handler
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});