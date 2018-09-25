/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])

//Eliminar los warnings
workbox.precaching.suppressWarnings()
//Toma el precatch manifest (js, css, indext.html) y los va a guardar detrás de escena.
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// App Shell
workbox.routing.registerNavigationRoute('/index.html')

//Habilitar Google Analitics offline
workbox.googleAnalytics.initialize();

//Stale to revalidate en la api
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/, workbox.strategies.staleWhileRevalidate(), 'GET')

//Cache first para las fonts
workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  }),
  'GET')

//network first para todas las https con método get
workbox.routing.registerRoute(/^https?.*/, workbox.strategies.networkFirst(), 'GET')