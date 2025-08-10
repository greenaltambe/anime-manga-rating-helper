const CACHE_NAME = "rating-calc-cache-v1";
const FILES_TO_CACHE = [
	"./",
	"./index.html",
	"./styles.css",
	"./script.js",
	"./manifest.json",
	"./icon-192.png",
	"./icon-512.png",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((response) => response || fetch(event.request))
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((keyList) =>
			Promise.all(
				keyList.map((key) => {
					if (key !== CACHE_NAME) {
						return caches.delete(key);
					}
				})
			)
		)
	);
});
