importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  console.log("ok");
  const urlsToCache = [
    {
      url: "./",
      revision: 1,
    },
    {
      url: "./index.html",
      revision: 1,
    },
    {
      url: "./favorite.html",
      revision: 1,
    },
    {
      url: "./club.html",
      revision: 1,
    },
    {
      url: "./manifest.json",
      revision: 1,
    },
    {
      url: "./sw.js",
      revision: 1,
    },
    {
      url: "./push.js",
      revision: 1,
    },
    {
      url: "./assets/css/style.css",
      revision: 1,
    },
    {
      url: "./assets/css/materialize.min.css",
      revision: 1,
    },
    {
      url: "./assets/js/main.js",
      revision: 1,
    },
    {
      url: "./assets/js/main-club.js",
      revision: 1,
    },
    {
      url: "./assets/js/main-favorite.js",
      revision: 1,
    },
    {
      url: "./assets/js/init.js",
      revision: 1,
    },
    {
      url: "./assets/js/idb.js",
      revision: 1,
    },
    {
      url: "./assets/js/db.js",
      revision: 1,
    },
    {
      url: "./assets/js/materialize/materialize.min.js",
      revision: 1,
    },
    {
      url: "./assets/js/app/pages/home.js",
      revision: 1,
    },
    {
      url: "./assets/js/app/pages/pages.js",
      revision: 1,
    },
    {
      url: "./assets/js/app/pages/scorers.js",
      revision: 1,
    },
    {
      url: "./assets/js/app/pages/club.js",
      revision: 1,
    },
    {
      url: "./assets/js/app/pages/home.js",
      revision: 1,
    },
    {
      url: "./assets/js/app/pages/favorite.js",
      revision: 1,
    },
    {
      url: "./assets/js/app/pages/home.js",
      revision: 1,
    },
    {
      url: "./assets/js/app/layouts/nav.js",
      revision: 1,
    },
    {
      url: "./assets/pages/scorers.html",
      revision: 1,
    },
    {
      url: "./assets/pages/standings.html",
      revision: 1,
    },
    {
      url: "./assets/pages/layouts/nav.html",
      revision: 1,
    },
    {
      url: "./assets/img/icon-sm.png",
      revision: 1,
    },
    {
      url: "./assets/img/icon-lg.png",
      revision: 1,
    },
  ];

  workbox.precaching.precacheAndRoute(urlsToCache, {
    ignoreURLParametersMatching: [/.*/],
  });

  workbox.routing.registerRoute(
    /.*(?:png|svg|jpg|jpeg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        }),
      ],
    })
  );

  // url luar
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: "google-fonts-webfonts",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 5,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2"),
    workbox.strategies.cacheFirst()
  );
} else {
  console.log("Fail");
}

self.addEventListener("push", (event) => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    vibrate: [100, 50, 100],
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
