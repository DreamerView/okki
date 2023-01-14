
const cacheName = "okki-version-0.0.1";
const dynamicCache = "okki-dynamic-version-0.0.1"
const cacheList = [
    "/android-chrome-192x192.png"
]

self.addEventListener('install', e=>{
    e.waitUntil(
        (async () => {
          const cache = await caches.open(cacheName);
          await cache.addAll(cacheList);
        })()
      );
    self.skipWaiting();
});
self.addEventListener('activate',async ()=>{
    const cacheNames = await caches.keys()
    await Promise.all(
        cacheNames.filter(name=>name !== cacheName && name !== dynamicCache && name !== 'offline').map(names=>caches.delete(names))
    )
})
self.addEventListener('fetch',e=>{
    const {request} = e
    
    const url = new URL(request.url)
    // if(url === location) {
    //     e.respondWith(cacheAll(request))
    // } else {
    //     if(request.destination !== 'script') e.respondWith(dynamicCacheAll(request))
    // }
    // if(request.destination !== 'script') console.log(request);
    if(request.destination !== 'script' && request.destination !== 'document') {
        // caches.open(dynamicCache).then((cache)=>{
        //     cache.add(url)
        // })
        e.waitUntil(
            (async () => {
              const cache = await caches.open(dynamicCache);
              await cache.add(url);
            })()
          );
        self.skipWaiting();
    }
});

async function cacheAll (req) {
    const cached = await caches.match(req)
    return cached ?? await fetch(req)
}

async function dynamicCacheAll (req) {
    const cache = await caches.open(dynamicCache)
    try {
        const res = await fetch(req)
        await cache.put(req,res.clone())
        return res
    } catch {
        const cached = await cache.match(req)
        return cached
    }
}
