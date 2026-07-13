const CACHE_NAME = "africa-jogo-v18";
const DYNAMIC_CACHE = "africa-dynamic-v18";

const FILES_TO_CACHE = [

    "/index.html",
    "/index.js",
    "/state.js",
    "/styles.css",
    "/manifest.json",

    // Páginas
    "/pages/home/index.js",
    "/pages/grupo/index.js",
    "/pages/participantes/index.js",
    "/pages/configuracao/index.js",
    "/pages/frasesF1G1/index.js",
    "/pages/frasesF1G2/index.js",
    "/pages/espera/index.js",
    "/pages/esperaF1F2/index.js",
    "/pages/esperaF2F3/index.js",
    "/pages/inicioFase1/index.js",
    "/pages/Fase1G1/index.js",
    "/pages/fase1G2/index.js",
    "/pages/fase2G1/index.js",
    "/pages/fase2G2/index.js",
    "/pages/fase3G1/index.js",
    "/pages/fase3G2/index.js",
    "/pages/esperaTurno/index.js",
    "/pages/final/index.js",

    // Imagens essenciais
    "/img/LogoAfrica (1).png",

    "/assets/sounds/alarm.mp3"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});


self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME && key !== DYNAMIC_CACHE) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});


self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request)
                .then(response => {
                    return caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                })
                .catch(() => {
                    // IMPORTANTE: fallback para SPA
                    if (event.request.mode === "navigate") {
                        return caches.match("/index.html");
                    }
                });
        })
    );
});


