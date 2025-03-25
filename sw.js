const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/index.html",
  "/assets/css/style.css",  // Update with actual CSS filename
  "/assets/images/icon-192x192.png",
  "/assets/images/icon-512x512.png"
];

// Install event: Caches assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Serve cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Sync event: Background sync (requires registration in main script)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncDataFunction());
  }
});

async function syncDataFunction() {
  console.log("Syncing data in the background...");
  // Example: Send stored requests to server when online
}

// Push event: Handle push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: "New message received!",
    icon: "/assets/images/icon-192x192.png",
    badge: "/assets/images/icon-192x192.png"
  };
  event.waitUntil(
    self.registration.showNotification("PWA Notification", options)
  );
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
