const fs = require('fs');

let html = fs.readFileSync('/workspace/gave_propiedades/property.html', 'utf8');

// Replace Mobile Menu
const menuHtml = `
      <div class="fixed inset-0 z-[9995] transform translate-x-full transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8 bg-white" id="mobile-menu">
        <a href="/index.html" class="relative z-10 text-3xl text-gave-primary font-bold tracking-wide mobile-link">Inicio</a>
        <a href="/index.html#nosotros" class="relative z-10 text-3xl text-gave-primary font-bold tracking-wide mobile-link">Nosotros</a>
        <a href="/index.html#servicios" class="relative z-10 text-3xl text-gave-primary font-bold tracking-wide mobile-link">Servicios</a>
        <a href="/catalog.html" class="relative z-10 text-3xl text-gave-primary font-bold tracking-wide mobile-link">Propiedades</a>
        
        <div class="relative z-10 w-24 h-px bg-gray-200 my-4"></div>
        
        <a href="https://wa.me/573183593507?text=Hola,%20quiero%20agendar%20una%20asesor%C3%ADa" target="_blank" class="relative z-10 text-xl bg-[#25D366] text-white px-8 py-4 rounded-full font-bold tracking-wide mobile-link shadow-lg flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
          Contactar
        </a>
      </div>
`;
html = html.replace(/<div class="fixed inset-0[^>]*id="mobile-menu">[\s\S]*?<\/div>\s*<\/header>/, menuHtml + '\n    </header>');

// Fix Footer Logo
const footerLogoOld = /<img src="\/logo-bn\.png" alt="Gave Propiedades Logo"[^>]*>/g;
const footerLogoNew = `<div class="bg-white inline-block p-3 rounded-2xl mb-6 shadow-md"><img src="/logo.png" alt="Gave Propiedades Logo" class="h-16 w-auto object-contain"></div>`;
html = html.replace(footerLogoOld, footerLogoNew);

// Fix layout of the property page (Stacking elements instead of 2 columns)
// In original layout: <div class="flex flex-col lg:flex-row gap-12"> (Sidebar is inside)
// We'll change the grid to stack everything vertically, and move the sticky sidebar to the top or bottom of the gallery.

// Extract the sticky sidebar content and place it above the gallery with key info
const sidebarRegex = /<!-- Sticky Sidebar -->[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/main>)/;
const galleryRegex = /<!-- Image Gallery -->[\s\S]*?(?=<div class="flex flex-col lg:flex-row gap-12">)/;

// Let's completely rewrite the main tag for property.html to ensure perfection based on instructions
const newMainHtml = `
    <main class="pt-32 pb-24">
      <div class="container mx-auto px-4 md:px-8">
        <!-- Back button & Title -->
        <div class="mb-8 gs-reveal">
          <a href="/catalog.html" class="inline-flex items-center gap-2 text-gray-500 hover:text-gave-primary transition-colors mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver al catálogo
          </a>
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span class="inline-block px-3 py-1 bg-gave-secondary text-white text-xs font-bold rounded-full uppercase tracking-wide mb-3">En Venta</span>
              <h1 class="text-3xl md:text-5xl font-bold text-gave-primary relative z-10 pt-2">Casa Moderna en Zona Norte</h1>
              <p class="text-gray-500 mt-2 text-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Bogotá, Colombia
              </p>
            </div>
            <div class="text-left md:text-right">
              <p class="text-3xl md:text-4xl font-bold text-gave-primary">$COP 850.000.000</p>
            </div>
          </div>
        </div>

        <!-- NEW LAYOUT: Image Gallery and Call to Action Side by Side on Desktop -->
        <div class="flex flex-col lg:flex-row gap-8 mb-12 gs-reveal">
            <!-- Gallery (Stacked for mobile, Grid for desktop) -->
            <div class="w-full lg:w-2/3">
                <!-- Main Image -->
                <div class="h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg mb-4">
                    <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Casa principal" class="w-full h-full object-cover">
                </div>
                <!-- Thumbnails (Stacked on mobile, row on desktop) -->
                <div class="flex flex-col md:flex-row gap-4 h-[auto] md:h-[200px]">
                    <div class="w-full md:w-1/2 h-[200px] md:h-full rounded-2xl overflow-hidden shadow-md">
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Interior 1" class="w-full h-full object-cover">
                    </div>
                    <div class="w-full md:w-1/2 h-[200px] md:h-full rounded-2xl overflow-hidden shadow-md">
                        <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Interior 2" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>

            <!-- Call to action Sidebar -->
            <div class="w-full lg:w-1/3">
                <div class="bg-gave-primary p-8 rounded-3xl shadow-xl text-white sticky top-32">
                    <h3 class="text-2xl font-bold mb-4">Info Relevante</h3>
                    
                    <div class="grid grid-cols-2 gap-4 mb-8">
                        <div class="bg-white/10 p-4 rounded-xl">
                            <p class="text-white/60 text-xs uppercase tracking-wide">Área</p>
                            <p class="text-xl font-bold">180 m²</p>
                        </div>
                        <div class="bg-white/10 p-4 rounded-xl">
                            <p class="text-white/60 text-xs uppercase tracking-wide">Habitaciones</p>
                            <p class="text-xl font-bold">3</p>
                        </div>
                        <div class="bg-white/10 p-4 rounded-xl">
                            <p class="text-white/60 text-xs uppercase tracking-wide">Baños</p>
                            <p class="text-xl font-bold">3</p>
                        </div>
                        <div class="bg-white/10 p-4 rounded-xl">
                            <p class="text-white/60 text-xs uppercase tracking-wide">Estado</p>
                            <p class="text-xl font-bold">Usado</p>
                        </div>
                    </div>

                    <a href="https://wa.me/573183593507?text=Hola,%20estoy%20interesado%20en%20la%20propiedad:%20Casa%20Moderna%20en%20Zona%20Norte%20(Ref:%20001)" target="_blank" class="w-full py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-lg mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                        Contactar por WhatsApp
                    </a>
                    
                    <div class="mt-6 pt-6 border-t border-white/20 flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-gave-secondary bg-white p-1 flex items-center justify-center">
                            <img src="/logo.png" alt="Gave Propiedades" class="w-full h-auto object-contain">
                        </div>
                        <div>
                            <p class="font-bold text-sm">Gave Propiedades</p>
                            <p class="text-xs text-white/70">Asesoras Inmobiliarias</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- STACKED INFORMATION SECTIONS -->
        <div class="w-full max-w-4xl space-y-8">
            <!-- Info Inmueble -->
            <section class="gs-reveal bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold text-gave-primary mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Información del Inmueble
              </h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <div><p class="text-xs text-gray-500 mb-1">Tipo de Inmueble</p><p class="font-semibold text-gray-900">Casa</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Estado</p><p class="font-semibold text-gray-900">Usado</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Antigüedad</p><p class="font-semibold text-gray-900">1 a 8 años</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Habitaciones</p><p class="font-semibold text-gray-900">3</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Baños</p><p class="font-semibold text-gray-900">3</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Parqueaderos</p><p class="font-semibold text-gray-900">2</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Área Construida</p><p class="font-semibold text-gray-900">180 m²</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Área Privada</p><p class="font-semibold text-gray-900">125 m²</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Área del Terreno</p><p class="font-semibold text-gray-900">200 m²</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Estrato</p><p class="font-semibold text-gray-900">4</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Piso N°</p><p class="font-semibold text-gray-900">N/A</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Cantidad de Pisos</p><p class="font-semibold text-gray-900">2</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Remodelado</p><p class="font-semibold text-gray-900">Sí</p></div>
                <div><p class="text-xs text-gray-500 mb-1">Acepta Permuta</p><p class="font-semibold text-gray-900">No</p></div>
              </div>
            </section>

            <!-- Zonas Comunes -->
            <section class="gs-reveal bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 class="text-2xl font-bold text-gave-primary mb-4">Zonas Comunes y Exteriores</h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                  <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><polyline points="20 6 9 17 4 12"/></svg> Piscina</li>
                  <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><polyline points="20 6 9 17 4 12"/></svg> Gimnasio dotado</li>
                  <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><polyline points="20 6 9 17 4 12"/></svg> Salón social</li>
                  <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><polyline points="20 6 9 17 4 12"/></svg> Zonas verdes</li>
                  <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><polyline points="20 6 9 17 4 12"/></svg> Vigilancia 24/7</li>
                </ul>
            </section>

            <!-- Características del Sector -->
            <section class="gs-reveal bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 class="text-2xl font-bold text-gave-primary mb-4">Características del Sector</h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                  <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><polyline points="20 6 9 17 4 12"/></svg> Alta valorización</li>
                  <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><polyline points="20 6 9 17 4 12"/></svg> Cerca a centros comerciales</li>
                  <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><polyline points="20 6 9 17 4 12"/></svg> Excelentes vías de acceso</li>
                  <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><polyline points="20 6 9 17 4 12"/></svg> Colegios cercanos</li>
                  <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><polyline points="20 6 9 17 4 12"/></svg> Entorno seguro y residencial</li>
                </ul>
            </section>
        </div>

      </div>
    </main>
`;

html = html.replace(/<main class="pt-32 pb-24">[\s\S]*?<\/main>/, newMainHtml);

fs.writeFileSync('/workspace/gave_propiedades/property.html', html);
console.log("property.html completely rewritten");

