/* service-worker.js
 * Static site SW for GitHub Pages (scope: /<repo>/)
 * - HTML: network-first (always fetch latest; fallback to cache)
 * - JS/CSS/IMG/WEBFONT: stale-while-revalidate
 * - /data/*: network only (don't cache live availability/members)
 * - Auto-update on install + activate
 */

const CACHE_VERSION = 'v9';                    // bump to force a fresh cache
const CORE_CACHE   = `core-${CACHE_VERSION}`;
const RUNTIME_CACHE= `rt-${CACHE_VERSION}`;

// Files that are safe to pre-cache (small & stable). Keep this list short.
const CORE_FILES = [
  './',                 // root (index.html)
  './index.html',
  './styles.css',
  './assets/logo.png',
  './manifest.webmanifest'
];

// --- Make new SW take control immediately ---
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CORE_CACHE)
      .then(cache => cache.addAll(CORE_FILES))
      .catch(() => {/* ignore if any file missing */})
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Clean up old caches
    const keep = new Set([CORE_CACHE, RUNTIME_CACHE]);
    const keys = await caches.keys();
    await Promise.all(keys.map(k => keep.has(k) ? null : caches.delete(k)));
    await self.clients.claim();
  })());
});

// Utility: cache strategies
async function networkFirst(req) {
  try {
    const res = await fetch(req);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(req, res.clone());
    return res;
  } catch (err) {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    throw err;
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await caches.match(req, { ignoreSearch: true });
  const fetchPromise = fetch(req)
    .then(res => { cache.put(req, res.clone()); return res; })
    .catch(() => cached);
  return cached || fetchPromise;
}

// Helper to check repo-relative paths under this SW scope
function inScopePath(url, subpath) {
  const scopePath = new URL(self.registration.scope).pathname; // e.g. /Mahab_Room_APP/
  return url.pathname.startsWith(scopePath + subpath.replace(/^\//,''));
}

// Main fetch handler
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;            // let non-GET pass through

  const url = new URL(req.url);

  // 1) HTML navigations -> network-first
  if (req.mode === 'navigate' || (req.destination === 'document')) {
    event.respondWith(networkFirst(req));
    return;
  }

  // 2) Never cache live data under /data/*
  if (inScopePath(url, '/data/')) {
    event.respondWith(fetch(req));
    return;
  }

  // 3) Static assets -> stale-while-revalidate
  const staticTypes = ['script','style','image','font','manifest'];
  if (staticTypes.includes(req.destination)) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // 4) Fallback: try SWR as a reasonable default
  event.respondWith(staleWhileRevalidate(req));
});

// Optional: allow pages to tell the SW to update immediately
self.addEventListener('message', (event) => {
  if (event && event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
