const CACHE_NAME = 'dypos';

const URLS_TO_CACHE = [
  '/rspost02a05m01/',
    '/rspost02a05m01/index.html',
    '/rspost02a05m01/icons/icon-192x192.png',
    '/rspost02a05m01/icons/icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js'
];


self.addEventListener('install', event => {
  
  event.waitUntil(
    
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', event => {
  
  event.respondWith(
    
    caches.match(event.request)
      .then(response => {
        
        if (response) {
          return response;
        }
        
       
        return fetch(event.request);
      }
    )
  );
});


self.addEventListener('activate', event => {
  
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});