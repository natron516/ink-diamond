const SHELL='ink-diamond-shell-v3';
const PRECACHE=["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./assets/index-D10yon7j.css", "./assets/boot.js", "./assets/b64-part-0.txt", "./assets/b64-part-1.txt", "./assets/b64-part-2.txt", "./assets/b64-part-3.txt", "./assets/b64-part-4.txt", "./assets/b64-part-5.txt"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.hostname.includes('statsapi.mlb.com')){e.respondWith(fetch(e.request));return;}
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(res=>{const copy=res.clone();caches.open(SHELL).then(c=>c.put(e.request,copy));return res;})));
});
