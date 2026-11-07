// LP30 offline cache: serve the saved page when there is no signal, refresh it when there is.
const C='lp30-offline-dash1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./lp30-app6.html','./lp30-app7.html','./lp30-app8.html','./lp30-app9.html','./lp30-dash.html']).catch(()=>{})));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(r,{ignoreSearch:true});
  const net=fetch(r).then(res=>{if(res&&res.ok)c.put(r,res.clone());return res}).catch(()=>null);
  return hit||await net||new Response('Offline and not saved yet. Open the app once with signal.',{status:503,headers:{'Content-Type':'text/plain'}})}))});
