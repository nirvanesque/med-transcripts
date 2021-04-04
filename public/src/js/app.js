const manifest = {
  'name': 'Medical Consultation Transcripts',
  'short_name': 'Med. Transcripts',
  'icons': [
      {
          'src': 'src/images/icons/app-icon-48x48.png',
          'type': 'image/png',
          'sizes': '48x48'
      },
      {
          'src': 'src/images/icons/app-icon-96x96.png',
          'type': 'image/png',
          'sizes': '96x96'
      },
      {
          'src': 'src/images/icons/app-icon-144x144.png',
          'type': 'image/png',
          'sizes': '144x144'
      },
      {
          'src': 'src/images/icons/app-icon-192x192.png',
          'type': 'image/png',
          'sizes': '192x192'
      },
      {
          'src': 'src/images/icons/app-icon-256x256.png',
          'type': 'image/png',
          'sizes': '256x256'
      },
      {
          'src': 'src/images/icons/app-icon-384x384.png',
          'type': 'image/png',
          'sizes': '384x384'
      },
      {
          'src': 'src/images/icons/app-icon-512x512.png',
          'type': 'image/png',
          'sizes': '512x512'
      }
  ],
  //"start_url": "index.html",
  //"scope": ".",
  'display': 'standalone',
  'orientation': 'portrait-primary',
  'background_color': '#4db6ac',
  'theme_color': '#3f51b5',
  'description': 'Take transcripts of doctor-patient consultation.',
  'dir': 'ltr',
  'lang': 'en-US'
};


window.addEventListener('load', () => {
  const base = document.querySelector('base');
  let baseUrl = base && base.href || '';

  if (!baseUrl.endsWith('/')) {
      baseUrl = `${baseUrl}/`;
  }

  manifest['start_url'] = `${baseUrl}index.html`;

  manifest.icons.forEach(icon => {
      icon.src = `${baseUrl}${icon.src}`;
  });

  const stringManifest = JSON.stringify(manifest);
  const blob = new Blob([stringManifest], {type: 'application/json'});
  const manifestURL = URL.createObjectURL(blob);
  document.querySelector('#manifestPlaceholder').setAttribute('href', manifestURL);

 if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register(`${baseUrl}sw.js`)
         .then( registration => {
         // Registration was successful
         console.log('ServiceWorker registration successful with scope: ', registration.scope);
     })
     .catch(err => {
         // registration failed :(
         console.log('ServiceWorker registration failed: ', err);
     });
 }

 bgFetchButton = document.querySelector('#bgFetchButton');
 bgFetchButton.addEventListener('click', async event => {
    try {
     const registration = await navigator.serviceWorker.ready;
     registration.backgroundFetch.fetch('my-fetch',  [new Request(`${baseUrl}src/images/main-image-lg.jpg`)]);
   } catch (err) {
     console.error(err);
   }
 });


});