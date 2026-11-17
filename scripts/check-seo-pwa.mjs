import assert from 'node:assert/strict';
const origin=process.env.CHECK_ORIGIN || 'http://localhost:3002';
const publicOrigin=process.env.NEXT_PUBLIC_SITE_URL || 'https://fdevents.vercel.app';
for(const path of ['/', '/event-management/wayanad', '/event-management', '/services/catering']) {
 const r=await fetch(origin+path); const html=await r.text();assert.equal(r.status,200);
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];
 const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
 assert.equal(new URL(canonical).href,new URL(path,publicOrigin).href);
 assert.ok(html.includes('name="description"'));
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 const blocks=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1]));
 assert.ok(blocks.length>0);assert.ok(!JSON.stringify(blocks).includes('vibgyor'));assert.ok(!JSON.stringify(blocks).includes('localhost'));
 console.log(path,JSON.stringify({title,canonical,schemaBlocks:blocks.length}));
}
const manifest=await (await fetch(origin+'/manifest.webmanifest')).json();assert.equal(manifest.display,'standalone');assert.equal(manifest.scope,'/');
for(const icon of manifest.icons){assert.equal((await fetch(origin+icon.src)).status,200);}
const sw=await fetch(origin+'/sw.js');assert.match(sw.headers.get('content-type'),/javascript/);assert.match(sw.headers.get('cache-control'),/no-store/);
const sitemap=await (await fetch(origin+'/sitemap.xml')).text();assert.ok(sitemap.includes(publicOrigin+'/services/catering'));assert.ok(!sitemap.includes('localhost'));
console.log('PASS: manifest, all icons, worker response headers, sitemap and rendered SEO');
