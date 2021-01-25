const static = "static-cache-v2";
const data = "data-cache-v1";
const offToOn = [
    "/",
    "index.js",
    "manifest.json",
    "styles.css",
    "icons/icons-192x192.png",
    "icons/icons-512x512.png",
    "db.js",
];


self.addEventListener("install", function (evt) {
    evt.waitUntil(
        caches.open(static).then((cache) => {
            console.log("Successfully saved to local system!");
            return cache.addAll(offToOn);
        })
    );

self.skipWaiting();

});



















self.addEventListener("fetch", function (evt) {
    
    if (evt.request.url.includes("/api/")) {
        evt.respondWith(
            caches
            .open(data) 
            .then((cache) => {
                return fetch(evt.request)
                .then((response) => {

                    if (response.status === 200) {
                        cache.put(evt.request.url, response.clone());
                    }

                    return response;
                })
                .catch((err) => {

                    return cache.match(evt.request);
                });
            })
            .catch((err) => console(err))
        );

        return;
    }



    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request).then(function (response) {
                if (response) {
                    return response;
                } else if (event.request.headers.get("accept").includes("text/html")) {
                    
                    return caches.match("/");
                }
            });  
        })
    );
});


