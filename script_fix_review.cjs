const fs = require('fs');

let html = fs.readFileSync('/workspace/gave_propiedades/index.html', 'utf8');

// The Z-index of navbar and mobile menu panel apparently got lost or altered. Let's fix them to be ultra robust.
html = html.replace(/<header class="[^"]*?" id="navbar">/, '<header class="fixed top-0 w-full z-[9990] transition-all duration-300 bg-white shadow-md py-2" id="navbar">');
html = html.replace(/<div class="fixed inset-0 bg-gave-primary[^"]*?" id="mobile-menu">/, '<div class="fixed inset-0 bg-gave-primary z-[9995] transform translate-x-full transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8" id="mobile-menu">');

fs.writeFileSync('/workspace/gave_propiedades/index.html', html);

// Apply to catalog
let catHtml = fs.readFileSync('/workspace/gave_propiedades/catalog.html', 'utf8');
catHtml = catHtml.replace(/<header class="[^"]*?" id="navbar">/, '<header class="fixed top-0 w-full z-[9990] transition-all duration-300 bg-white shadow-md py-2" id="navbar">');
catHtml = catHtml.replace(/<div class="fixed inset-0 bg-gave-primary[^"]*?" id="mobile-menu">/, '<div class="fixed inset-0 bg-gave-primary z-[9995] transform translate-x-full transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8" id="mobile-menu">');
fs.writeFileSync('/workspace/gave_propiedades/catalog.html', catHtml);

// Apply to property
let propHtml = fs.readFileSync('/workspace/gave_propiedades/property.html', 'utf8');
propHtml = propHtml.replace(/<header class="[^"]*?" id="navbar">/, '<header class="fixed top-0 w-full z-[9990] transition-all duration-300 bg-white shadow-md py-2" id="navbar">');
propHtml = propHtml.replace(/<div class="fixed inset-0 bg-gave-primary[^"]*?" id="mobile-menu">/, '<div class="fixed inset-0 bg-gave-primary z-[9995] transform translate-x-full transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8" id="mobile-menu">');
fs.writeFileSync('/workspace/gave_propiedades/property.html', propHtml);

