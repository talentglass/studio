/*! coi-serviceworker v0.1.7 | MIT License | https://github.com/gzuidhof/coi-serviceworker */
if (typeof window === "undefined") {
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
    self.addEventListener("fetch", (e) => {
        if (e.request.mode === "navigate") {
            e.respondWith(
                fetch(e.request).then((response) => {
                    const newHeaders = new Headers(response.headers);
                    newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
                    newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
                    return new Response(response.body, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: newHeaders,
                    });
                }).catch((err) => console.error(err))
            );
        }
    });
} else {
    const script = document.currentScript;
    navigator.serviceWorker.register(window.location.pathname + "coi-serviceworker.js")
        .then((reg) => {
            reg.addEventListener("updatefound", () => {
                try { reg.installing.addEventListener("statechange", (e) => {
                    if (e.target.state === "activated") window.location.reload();
                }); } catch(e) {}
            });
            if (reg.active && !navigator.serviceWorker.controller) {
                window.location.reload();
            }
        });
}
