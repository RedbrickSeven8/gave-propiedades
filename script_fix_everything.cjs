const fs = require('fs');

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

const footerLogoOld = /<img src="\/logo-bn\.png" alt="Gave Propiedades Logo B\/N"[^>]*>/g;
const footerLogoNew = `<div class="bg-white inline-block p-3 rounded-2xl mb-6 shadow-md"><img src="/logo.png" alt="Gave Propiedades Logo" class="h-16 w-auto object-contain"></div>`;

// --- INDEX.HTML ---
let indexHtml = fs.readFileSync('/workspace/gave_propiedades/index.html', 'utf8');

// Replace mobile menu
indexHtml = indexHtml.replace(/<div class="fixed inset-0[^>]*id="mobile-menu">[\s\S]*?<\/div>\s*<\/header>/, menuHtml + '\n    </header>');

// Replace footer logo
indexHtml = indexHtml.replace(footerLogoOld, footerLogoNew);

// Fix Contact Icons in Index
indexHtml = indexHtml.replace(/<i data-lucide="mail" class="w-5 h-5"><\/i>/g, '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>');
indexHtml = indexHtml.replace(/<i data-lucide="map-pin" class="w-5 h-5"><\/i>/g, '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>');

// Remove gs-reveal from property cards so they appear instantly
indexHtml = indexHtml.replace(/border border-gray-100 group gs-reveal/g, 'border border-gray-100 group');

fs.writeFileSync('/workspace/gave_propiedades/index.html', indexHtml);

// --- CATALOG.HTML ---
let catHtml = fs.readFileSync('/workspace/gave_propiedades/catalog.html', 'utf8');

// Replace mobile menu
catHtml = catHtml.replace(/<div class="fixed inset-0[^>]*id="mobile-menu">[\s\S]*?<\/div>\s*<\/header>/, menuHtml + '\n    </header>');

// Replace footer logo
catHtml = catHtml.replace(footerLogoOld, footerLogoNew);

// Implement Filters HTML
const oldFilters = /<div class="flex flex-wrap gap-4 mb-10 gs-reveal">[\s\S]*?<\/div>/;
const newFilters = `<div id="filter-container" class="flex overflow-x-auto flex-nowrap md:flex-wrap gap-3 mb-10 pb-4 gs-reveal" style="scrollbar-width: none;">
          <button data-filter="all" class="filter-btn flex-shrink-0 px-6 py-2 rounded-full bg-gave-primary text-white font-medium shadow-md transition-colors">Todas</button>
          <button data-filter="venta" class="filter-btn flex-shrink-0 px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 font-medium shadow-sm border border-gray-200 transition-colors">En Venta</button>
          <button data-filter="apartamento" class="filter-btn flex-shrink-0 px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 font-medium shadow-sm border border-gray-200 transition-colors">Apartamentos</button>
          <button data-filter="casa" class="filter-btn flex-shrink-0 px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 font-medium shadow-sm border border-gray-200 transition-colors">Casas</button>
          <button data-filter="lote" class="filter-btn flex-shrink-0 px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 font-medium shadow-sm border border-gray-200 transition-colors">Lotes</button>
        </div>`;
catHtml = catHtml.replace(oldFilters, newFilters);

// Add data-types to catalog cards
catHtml = catHtml.replace('Casa Moderna en Zona Norte</h3>', 'Casa Moderna en Zona Norte</h3><!--DATA:casa,venta-->');
catHtml = catHtml.replace('Apartamento Vista Panorámica</h3>', 'Apartamento Vista Panorámica</h3><!--DATA:apartamento-->');
catHtml = catHtml.replace('Lote Campestre Exclusivo</h3>', 'Lote Campestre Exclusivo</h3><!--DATA:lote,venta-->');
catHtml = catHtml.replace('Apartamento de Lujo con Terraza</h3>', 'Apartamento de Lujo con Terraza</h3><!--DATA:apartamento,venta-->');
catHtml = catHtml.replace('Casa Familiar Amplia</h3>', 'Casa Familiar Amplia</h3><!--DATA:casa,venta-->');

catHtml = catHtml.replace(/<a href="\/property\.html" class="block bg-white/g, '<a href="/property.html" class="property-card block bg-white');

fs.writeFileSync('/workspace/gave_propiedades/catalog.html', catHtml);

// --- MAIN.JS ---
let js = fs.readFileSync('/workspace/gave_propiedades/main.js', 'utf8');
const filterScript = `
// --- Catalog Filter Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    
    if(filterBtns.length > 0) {
        // Tag cards based on comments for simplicity
        propertyCards.forEach(card => {
            const html = card.innerHTML;
            if(html.includes('DATA:casa')) card.dataset.type = (card.dataset.type || '') + ' casa';
            if(html.includes('DATA:apartamento')) card.dataset.type = (card.dataset.type || '') + ' apartamento';
            if(html.includes('DATA:lote')) card.dataset.type = (card.dataset.type || '') + ' lote';
            if(html.includes('DATA:venta') || html.includes('En Venta')) card.dataset.type = (card.dataset.type || '') + ' venta';
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => {
                    b.classList.remove('bg-gave-primary', 'text-white');
                    b.classList.add('bg-white', 'text-gray-700');
                });
                btn.classList.remove('bg-white', 'text-gray-700');
                btn.classList.add('bg-gave-primary', 'text-white');
                
                const filterValue = btn.getAttribute('data-filter');
                
                propertyCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        const types = card.dataset.type || '';
                        if (types.includes(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
});
`;
if(!js.includes('Catalog Filter Logic')) {
    fs.appendFileSync('/workspace/gave_propiedades/main.js', filterScript);
}

