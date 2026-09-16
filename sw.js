const CACHE_NAME = "pakglobe-shell-v1";
const SHELL_FILES = ["index.html", "manifest.json", "icon-192.png", "icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Sirf shell files cache se serve karo, baaki sab (dashboard) seedha network se
  if (SHELL_FILES.some((f) => event.request.url.endsWith(f))) {
    event.respondWith(
      caches.match(event.request).then((res) => res || fetch(event.request))
    );
  }
});
