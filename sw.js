/* Service worker que se borra solo. Mientras brosin.app está cerrado,
   los móviles que ya tenían la app guardada se bajan este archivo al
   comprobar si hay versión nueva: borra todo lo guardado, se da de baja
   y recarga la página, que pasa a ser la de "muy pronto". */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (cs) { cs.forEach(function (c) { c.navigate(c.url); }); })
  );
});
