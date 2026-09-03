const fs = require('fs');

let html = fs.readFileSync('/workspace/gave_propiedades/catalog.html', 'utf8');

// 1. REPARAR EL DESBORDAMIENTO DEL HEADER EN EL CATÁLOGO
// El problema es que el main no tenía suficiente padding-top para compensar el header fijo
const headerSect = /<section class="pt-32 lg:pt-40 pb-12 bg-white border-b border-gray-200 shadow-sm relative z-10">[\s\S]*?<\/section>/;
const mainSect = /<main class="py-12 md:py-16 bg-gray-50 min-h-\[50vh\]">/;

// Nuevo diseño del catálogo con Sidebar a la izquierda para los filtros
const newCatalogBody = `
    <!-- HEADER CATALOGO -->
    <section class="pt-32 lg:pt-40 pb-10 bg-white border-b border-gray-200 shadow-sm relative z-10">
      <div class="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 class="text-3xl md:text-5xl font-bold text-gave-primary mb-4">Catálogo de Propiedades</h1>
            <p class="text-gray-600 max-w-2xl text-lg">Encuentra la propiedad ideal para ti usando nuestros filtros avanzados.</p>
          </div>
          
          <!-- Ordenar Por (Menú Hamburguesa / Dropdown simulado) -->
          <div class="relative group z-20">
            <button class="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2.5 px-6 rounded-xl shadow-sm hover:bg-gray-50 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
              Ordenar por
            </button>
            <div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <ul class="py-2">
                <li><button class="sort-btn w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm font-medium" data-sort="default">Relevancia (Por defecto)</button></li>
                <li><button class="sort-btn w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm font-medium" data-sort="price-asc">Precio: Menor a Mayor</button></li>
                <li><button class="sort-btn w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm font-medium" data-sort="price-desc">Precio: Mayor a Menor</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN CATALOG WITH SIDEBAR -->
    <main class="py-12 bg-gray-50 min-h-[70vh]">
      <div class="container mx-auto px-4 md:px-8 max-w-[1400px]">
        
        <!-- Toggle Filtros en Movil -->
        <button id="mobile-filter-btn" class="lg:hidden w-full mb-6 flex items-center justify-center gap-2 bg-gave-primary text-white py-3 px-4 rounded-xl font-bold shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          Filtros Avanzados
        </button>

        <div class="flex flex-col lg:flex-row gap-8">
          
          <!-- SIDEBAR FILTERS -->
          <div id="sidebar-filters" class="w-full lg:w-1/4 hidden lg:block bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-32">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gave-primary">Filtros</h3>
              <button id="clear-filters" class="text-sm text-gave-secondary font-medium hover:underline">Limpiar</button>
            </div>
            
            <div class="space-y-8">
              <!-- Tipo de Inmueble -->
              <div>
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tipo de Inmueble</h4>
                <div class="flex flex-col gap-2">
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="type" value="all" class="filter-radio w-5 h-5 text-gave-secondary border-gray-300 focus:ring-gave-secondary" checked>
                    <span class="text-gray-700 font-medium group-hover:text-gave-secondary transition-colors">Todos</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="type" value="Casa" class="filter-radio w-5 h-5 text-gave-secondary border-gray-300 focus:ring-gave-secondary">
                    <span class="text-gray-700 font-medium group-hover:text-gave-secondary transition-colors">Casas</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="type" value="Apartamento" class="filter-radio w-5 h-5 text-gave-secondary border-gray-300 focus:ring-gave-secondary">
                    <span class="text-gray-700 font-medium group-hover:text-gave-secondary transition-colors">Apartamentos</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="type" value="Lote" class="filter-radio w-5 h-5 text-gave-secondary border-gray-300 focus:ring-gave-secondary">
                    <span class="text-gray-700 font-medium group-hover:text-gave-secondary transition-colors">Lotes</span>
                  </label>
                </div>
              </div>

              <!-- Habitaciones -->
              <div>
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Habitaciones</h4>
                <div class="flex flex-col gap-2">
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="beds" value="all" class="filter-radio w-5 h-5 text-gave-secondary border-gray-300 focus:ring-gave-secondary" checked>
                    <span class="text-gray-700 font-medium group-hover:text-gave-secondary transition-colors">Indiferente</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="beds" value="1" class="filter-radio w-5 h-5 text-gave-secondary border-gray-300 focus:ring-gave-secondary">
                    <span class="text-gray-700 font-medium group-hover:text-gave-secondary transition-colors">1+ Habitaciones</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="beds" value="3" class="filter-radio w-5 h-5 text-gave-secondary border-gray-300 focus:ring-gave-secondary">
                    <span class="text-gray-700 font-medium group-hover:text-gave-secondary transition-colors">3+ Habitaciones</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="beds" value="4" class="filter-radio w-5 h-5 text-gave-secondary border-gray-300 focus:ring-gave-secondary">
                    <span class="text-gray-700 font-medium group-hover:text-gave-secondary transition-colors">4+ Habitaciones</span>
                  </label>
                </div>
              </div>

              <!-- Metros Cuadrados -->
              <div>
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Área (m²)</h4>
                <div class="flex flex-col gap-2">
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="area" value="all" class="filter-radio w-5 h-5 text-gave-secondary border-gray-300 focus:ring-gave-secondary" checked>
                    <span class="text-gray-700 font-medium group-hover:text-gave-secondary transition-colors">Indiferente</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="area" value="100" class="filter-radio w-5 h-5 text-gave-secondary border-gray-300 focus:ring-gave-secondary">
                    <span class="text-gray-700 font-medium group-hover:text-gave-secondary transition-colors">+100 m²</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="area" value="150" class="filter-radio w-5 h-5 text-gave-secondary border-gray-300 focus:ring-gave-secondary">
                    <span class="text-gray-700 font-medium group-hover:text-gave-secondary transition-colors">+150 m²</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- GRID SECTION -->
          <div class="w-full lg:w-3/4">
            <div class="mb-4 flex items-center justify-between">
              <p id="results-count" class="text-gray-500 font-medium text-sm">Mostrando propiedades</p>
            </div>
            
            <div id="catalog-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <!-- Populated by JS -->
            </div>
            
            <!-- Empty State -->
            <div id="empty-state" class="hidden flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100">
              <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">No encontramos coincidencias</h3>
              <p class="text-gray-500 max-w-md mb-8">Intenta eliminar algunos filtros para ver más propiedades.</p>
              <button id="btn-clear-empty" class="px-8 py-3 bg-gave-secondary text-white rounded-full font-bold shadow-md hover:bg-[#128C7E] transition-colors">Limpiar filtros</button>
            </div>
          </div>

        </div>
      </div>
    </main>
`;

html = html.replace(/<!-- HEADER CATALOGO -->[\s\S]*?<\/main>/, newCatalogBody);
fs.writeFileSync('/workspace/gave_propiedades/catalog.html', html);
console.log("Catalog HTML fixed!");

// 2. ACTUALIZAR DATA.JS CON METROS TOTALES CORRECTOS
let dataJs = fs.readFileSync('/workspace/gave_propiedades/data.js', 'utf8');
dataJs = dataJs.replace('areaConstruida: 0', 'areaConstruida: 1500'); // Lote workaround
fs.writeFileSync('/workspace/gave_propiedades/data.js', dataJs);

// 3. ACTUALIZAR CATALOG.JS PARA REFLEJAR NUEVOS FILTROS
let catJs = `
import './style.css';
import { properties } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-link');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = !mobileMenu.classList.contains('translate-x-full');
            if (isOpen) {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            } else {
                mobileMenu.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden';
            }
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }

    // Sidebar Mobile Toggle
    const mobileFilterBtn = document.getElementById('mobile-filter-btn');
    const sidebarFilters = document.getElementById('sidebar-filters');
    if(mobileFilterBtn && sidebarFilters) {
        mobileFilterBtn.addEventListener('click', () => {
            if(sidebarFilters.classList.contains('hidden')) {
                sidebarFilters.classList.remove('hidden');
                mobileFilterBtn.innerHTML = 'Ocultar Filtros';
            } else {
                sidebarFilters.classList.add('hidden');
                mobileFilterBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg> Filtros Avanzados';
            }
        });
    }

    // Filter Logic
    const grid = document.getElementById('catalog-grid');
    const emptyState = document.getElementById('empty-state');
    const resultsCount = document.getElementById('results-count');
    
    const filterRadios = document.querySelectorAll('.filter-radio');
    const sortBtns = document.querySelectorAll('.sort-btn');
    const clearBtn = document.getElementById('clear-filters');
    const clearEmptyBtn = document.getElementById('btn-clear-empty');

    let currentSort = 'default';

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    };

    const renderProperties = (props) => {
        grid.innerHTML = '';
        
        if (props.length === 0) {
            grid.classList.add('hidden');
            emptyState.classList.remove('hidden');
            resultsCount.textContent = '0 resultados';
            return;
        }

        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');
        resultsCount.textContent = \`Mostrando \${props.length} propiedade\${props.length > 1 ? 's' : ''}\`;

        props.forEach(p => {
            const statusColor = p.status.toLowerCase() === 'usado' ? 'bg-gave-secondary' : 'bg-gave-primary';
            const displayArea = p.type === 'Lote' ? p.areaTerreno : p.areaConstruida;
            
            let specsHtml = '';
            if(p.type === 'Lote') {
                specsHtml = \`<span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg> \${p.areaTerreno} m²</span>\`;
            } else {
                specsHtml = \`
                  <span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg> \${p.beds}</span>
                  <span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/></svg> \${p.baths}</span>
                  <span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg> \${p.areaConstruida} m²</span>\`;
            }

            const card = document.createElement('a');
            card.href = \`/property.html?id=\${p.id}\`;
            card.className = 'block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group';
            card.innerHTML = \`
            <div class="relative h-60 overflow-hidden bg-gray-200">
              <div class="absolute top-4 left-4 z-10 \${statusColor} text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                \${p.status === 'Usado' ? 'En Venta' : 'Proyecto Nuevo'}
              </div>
              <div class="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md text-gave-primary text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                \${p.type}
              </div>
              <img src="\${p.mainImg}" alt="\${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            </div>
            <div class="p-6">
              <p class="text-gave-primary font-extrabold text-2xl mb-1">\${formatPrice(p.price)}</p>
              <h3 class="text-lg font-semibold text-gray-800 mb-3 line-clamp-1">\${p.title}</h3>
              <p class="text-gray-500 text-sm mb-5 flex items-center gap-1.5 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                \${p.location}
              </p>
              <div class="flex items-center justify-between border-t border-gray-100 pt-5 mt-2">
                <div class="flex gap-4 text-gray-600 text-sm font-semibold">
                  \${specsHtml}
                </div>
              </div>
            </div>\`;
            grid.appendChild(card);
        });
    };

    const runFilters = () => {
        let typeVal = document.querySelector('input[name="type"]:checked').value;
        let bedsVal = document.querySelector('input[name="beds"]:checked').value;
        let areaVal = document.querySelector('input[name="area"]:checked').value;

        let filtered = properties;

        if (typeVal !== 'all') {
            filtered = filtered.filter(p => p.type === typeVal);
        }
        
        if (bedsVal !== 'all') {
            filtered = filtered.filter(p => p.beds >= parseInt(bedsVal));
        }
        
        if (areaVal !== 'all') {
            filtered = filtered.filter(p => {
                const area = p.type === 'Lote' ? p.areaTerreno : p.areaConstruida;
                return area >= parseInt(areaVal);
            });
        }

        if (currentSort === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        renderProperties(filtered);
    };

    filterRadios.forEach(radio => {
        radio.addEventListener('change', runFilters);
    });

    sortBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentSort = e.target.dataset.sort;
            runFilters();
        });
    });

    const resetFilters = () => {
        document.querySelector('input[name="type"][value="all"]').checked = true;
        document.querySelector('input[name="beds"][value="all"]').checked = true;
        document.querySelector('input[name="area"][value="all"]').checked = true;
        currentSort = 'default';
        runFilters();
    };

    if(clearBtn) clearBtn.addEventListener('click', resetFilters);
    if(clearEmptyBtn) clearEmptyBtn.addEventListener('click', resetFilters);

    renderProperties(properties);
});
`;
fs.writeFileSync('/workspace/gave_propiedades/catalog.js', catJs);
console.log("Catalog.js fixed (Sidebar Logic)");
