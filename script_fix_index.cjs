const fs = require('fs');

let html = fs.readFileSync('/workspace/gave_propiedades/index.html', 'utf8');

// The last section '¿Lista para el siguiente paso?' needs icons in index.html, they were missing.
const contactSection = html.indexOf('<section id="contacto"');
const footerSection = html.indexOf('<footer');

let contactChunk = html.substring(contactSection, footerSection);

// We need to inject the SVG icons to mail and map-pin just to be absolutely certain
contactChunk = contactChunk.replace(/<i data-lucide="mail"[^>]*><\/i>/g, '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>');
contactChunk = contactChunk.replace(/<i data-lucide="map-pin"[^>]*><\/i>/g, '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>');

html = html.substring(0, contactSection) + contactChunk + html.substring(footerSection);
fs.writeFileSync('/workspace/gave_propiedades/index.html', html);
console.log("Index icons patched");
