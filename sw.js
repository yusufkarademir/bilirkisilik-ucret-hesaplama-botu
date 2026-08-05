/* THH Bilirkişilik Ücret Hesaplama Robotu — service worker
 *
 * Amaç: uygulamayı çevrimdışı çalışabilir kılmak ve ana ekrana eklendiğinde
 * gerçek bir uygulama gibi anında açılmasını sağlamak.
 *
 * ÖNEMLİ: Hesaplama mantığı veya memur aylık katsayısı değiştiğinde
 * aşağıdaki SURUM değerini artırın. Aksi hâlde kullanıcıların cihazında
 * eski sürüm önbellekte kalabilir.
 */
const SURUM = 'v2';
const ONBELLEK = 'thh-bilirkisi-' + SURUM;

const VARLIKLAR = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(ONBELLEK)
      .then((cache) => cache.addAll(VARLIKLAR))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((adlar) => Promise.all(
        adlar.filter((ad) => ad !== ONBELLEK).map((ad) => caches.delete(ad))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'HEMEN_GUNCELLE') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const istek = event.request;

  // Yalnızca kendi kaynağımızdaki GET isteklerini ele al
  if (istek.method !== 'GET') return;
  if (new URL(istek.url).origin !== self.location.origin) return;

  // Sayfa gezinmeleri: önce ağ (güncel sürüm gelsin), olmazsa önbellek.
  // Böylece katsayı güncellemesi kullanıcıya ilk açılışta ulaşır.
  if (istek.mode === 'navigate') {
    event.respondWith(
      fetch(istek)
        .then((yanit) => {
          const kopya = yanit.clone();
          caches.open(ONBELLEK).then((cache) => cache.put('./index.html', kopya));
          return yanit;
        })
        .catch(() => caches.match('./index.html').then((c) => c || caches.match('./')))
    );
    return;
  }

  // Diğer varlıklar (ikonlar, manifest): önce önbellek, arkada tazele.
  event.respondWith(
    caches.match(istek).then((onbellekli) => {
      const agdan = fetch(istek)
        .then((yanit) => {
          if (yanit && yanit.status === 200) {
            const kopya = yanit.clone();
            caches.open(ONBELLEK).then((cache) => cache.put(istek, kopya));
          }
          return yanit;
        })
        .catch(() => onbellekli);
      return onbellekli || agdan;
    })
  );
});
