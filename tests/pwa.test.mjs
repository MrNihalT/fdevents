import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../public/sw.js", import.meta.url), "utf8");

function worker({ offline = false, cached = new Response("Offline contacts") } = {}) {
  const listeners = {};
  const deleted = [];
  const added = [];
  let claimed = false;
  const network = new Response("Live page");
  vm.runInNewContext(source, {
    self: {
      location: { origin: "https://fdevents.vercel.app" },
      clients: { claim: async () => { claimed = true; } },
      addEventListener: (name, listener) => { listeners[name] = listener; },
    },
    caches: {
      open: async () => ({ add: async (path) => added.push(path), match: async () => cached }),
      keys: async () => ["fd-events-offline-v0", "fd-events-offline-v1", "unrelated-cache"],
      delete: async (key) => deleted.push(key),
    },
    fetch: async () => { if (offline) throw new TypeError("Offline"); return network; },
    URL, Response,
  });
  const fetchRequest = (path, overrides = {}) => {
    let response;
    listeners.fetch({
      request: { url: new URL(path, "https://fdevents.vercel.app").href, method: "GET", mode: "navigate", ...overrides },
      respondWith: (result) => { response = result; },
    });
    return response;
  };
  return { listeners, deleted, added, fetchRequest, network, claimed: () => claimed };
}

test("precache only the standalone offline page", async () => {
  const w = worker();
  let completion;
  w.listeners.install({ waitUntil: (promise) => { completion = promise; } });
  await completion;
  assert.deepEqual(w.added, ["/offline.html"]);
});

test("activation removes only old FD Events offline caches", async () => {
  const w = worker();
  let completion;
  w.listeners.activate({ waitUntil: (promise) => { completion = promise; } });
  await completion;
  assert.deepEqual(w.deleted, ["fd-events-offline-v0"]);
  assert.equal(w.claimed(), true);
});

test("online navigation always receives the live network response", async () => {
  const w = worker();
  assert.equal(await w.fetchRequest("/services/catering?utm_source=test"), w.network);
});

test("offline navigation shows contact fallback and survives a missing cache", async () => {
  assert.equal(await (await worker({ offline: true }).fetchRequest("/contact")).text(), "Offline contacts");
  assert.equal((await worker({ offline: true, cached: null }).fetchRequest("/")).status, 503);
});

test("never intercept admin, APIs, RSC, assets, external requests or form submissions", () => {
  const w = worker({ offline: true });
  for (const path of ["/admin", "/admin/photos", "/api/data", "https://other.example/contact"]) {
    assert.equal(w.fetchRequest(path), undefined, path);
  }
  assert.equal(w.fetchRequest("/contact", { method: "POST" }), undefined);
  assert.equal(w.fetchRequest("/?_rsc=123", { mode: "cors" }), undefined);
  assert.equal(w.fetchRequest("/_next/static/app.js", { mode: "no-cors" }), undefined);
});
