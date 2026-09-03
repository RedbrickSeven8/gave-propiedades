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
    if (mobileFilterBtn && sidebarFilters) {
        mobileFilterBtn.addEventListener('click', () => {
            if (sidebarFilters.classList.contains('hidden')) {
                sidebarFilters.classList.remove('hidden');
                mobileFilterBtn.innerHTML = '<span>Ocultar Filtros</span>';
            } else {
                sidebarFilters.classList.add('hidden');
                mobileFilterBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg> <span>Filtros Avanzados</span>';
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
            if (resultsCount) resultsCount.textContent = '0 resultados';
            return;
        }

        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');
        if (resultsCount) resultsCount.textContent = `Mostrando ${props.length} inmueble${props.length > 1 ? 's' : ''}`;

        props.forEach(p => {
            const statusColor = p.status.toLowerCase() === 'usado' ? 'bg-gave-secondary' : 'bg-gave-primary';
            
            let specsHtml = '';
            if (p.type === 'Lote') {
                specsHtml = `<span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg> ${p.areaTerreno} m² terreno</span>`;
            } else {
                specsHtml = `
                  <span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg> ${p.beds} hab.</span>
                  <span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/></svg> ${p.baths} bñ.</span>
                  <span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg> ${p.areaConstruida} m²</span>`;
            }

            const card = document.createElement('a');
            card.href = `/property.html?id=${p.id}`;
            card.className = 'block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col justify-between';
            card.innerHTML = `
            <div>
              <div class="relative h-60 overflow-hidden bg-gray-200">
                <div class="absolute top-4 left-4 z-10 ${statusColor} text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  ${p.status === 'Usado' ? 'En Venta' : 'Proyecto Nuevo'}
                </div>
                <div class="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md text-gave-primary text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  ${p.type}
                </div>
                <img src="${p.mainImg}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
              </div>
              <div class="p-6">
                <p class="text-gave-primary font-extrabold text-2xl mb-1">${formatPrice(p.price)}</p>
                <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-gave-secondary transition-colors line-clamp-1">${p.title}</h3>
                <p class="text-gray-500 text-sm mb-4 flex items-center gap-1.5 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary flex-shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  ${p.location}
                </p>
                <p class="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">${p.description || ''}</p>
              </div>
            </div>
            <div class="px-6 pb-6 pt-0 border-t border-gray-100 pt-4 flex items-center justify-between">
              <div class="flex flex-wrap gap-3 text-gray-600 text-xs font-semibold">
                ${specsHtml}
              </div>
              <span class="text-xs font-bold text-gave-secondary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Ver detalle →
              </span>
            </div>`;
            grid.appendChild(card);
        });
    };

    const runFilters = () => {
        let typeVal = 'all';
        const typeEl = document.querySelector('input[name="type"]:checked');
        if (typeEl) typeVal = typeEl.value;

        let bedsVal = 'all';
        const bedsEl = document.querySelector('input[name="beds"]:checked');
        if (bedsEl) bedsVal = bedsEl.value;

        let areaVal = 'all';
        const areaEl = document.querySelector('input[name="area"]:checked');
        if (areaEl) areaVal = areaEl.value;

        let filtered = [...properties];

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
            currentSort = e.currentTarget.dataset.sort;
            runFilters();
        });
    });

    const resetFilters = () => {
        const defaultType = document.querySelector('input[name="type"][value="all"]');
        if (defaultType) defaultType.checked = true;
        const defaultBeds = document.querySelector('input[name="beds"][value="all"]');
        if (defaultBeds) defaultBeds.checked = true;
        const defaultArea = document.querySelector('input[name="area"][value="all"]');
        if (defaultArea) defaultArea.checked = true;
        currentSort = 'default';
        runFilters();
    };

    if (clearBtn) clearBtn.addEventListener('click', resetFilters);
    if (clearEmptyBtn) clearEmptyBtn.addEventListener('click', resetFilters);

    renderProperties(properties);
});
