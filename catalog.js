import './style.css';
import { properties } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Setup ---
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

    // --- Catalog Filter Logic ---
    const grid = document.getElementById('catalog-grid');
    const emptyState = document.getElementById('empty-state');
    const resultsCount = document.getElementById('results-count');
    
    const typeBtns = document.querySelectorAll('.filter-btn-type');
    const featureCheckboxes = document.querySelectorAll('.feature-checkbox');
    const sortSelect = document.getElementById('sort-select');
    const clearBtn = document.getElementById('clear-filters');
    const clearEmptyBtn = document.getElementById('btn-clear-empty');

    let currentType = 'all';
    let currentFeatures = [];
    let currentSort = 'default';

    // Format currency
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    };

    // Render properties
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
        resultsCount.textContent = `Mostrando ${props.length} propiedade${props.length > 1 ? 's' : ''}`;
        if(currentType !== 'all' || currentFeatures.length > 0 || currentSort !== 'default') {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }

        props.forEach(p => {
            // Determine status color
            const statusColor = p.status.toLowerCase() === 'usado' ? 'bg-gave-secondary' : 'bg-gave-primary';
            
            // Build features string (Beds, Baths, Area) based on type
            let specsHtml = '';
            if(p.type === 'Lote') {
                specsHtml = `<span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg> ${p.areaTerreno} m² terreno</span>`;
            } else {
                specsHtml = `
                  <span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg> ${p.beds}</span>
                  <span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/></svg> ${p.baths}</span>
                  <span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg> ${p.areaConstruida} m²</span>`;
            }

            const card = document.createElement('a');
            // Navigate to property page with URL param
            card.href = `/property.html?id=${p.id}`;
            card.className = 'block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group';
            card.innerHTML = `
            <div class="relative h-64 overflow-hidden">
              <div class="absolute top-4 left-4 z-10 ${statusColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                ${p.status === 'Usado' ? 'En Venta' : 'Proyecto Nuevo'}
              </div>
              <div class="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-gave-primary text-xs font-bold px-3 py-1 rounded-full tracking-wide shadow-sm">
                ${p.type}
              </div>
              <img src="${p.mainImg}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
                <p class="text-white font-bold text-xl">${formatPrice(p.price)}</p>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-1">${p.title}</h3>
              <p class="text-gray-500 text-sm mb-4 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                ${p.location}
              </p>
              <div class="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                <div class="flex gap-4 text-gray-600 text-sm">
                  ${specsHtml}
                </div>
              </div>
            </div>`;
            
            grid.appendChild(card);
        });
    };

    const filterAndSort = () => {
        let filtered = properties;

        // Type filter
        if (currentType !== 'all') {
            filtered = filtered.filter(p => p.type.toLowerCase() === currentType.toLowerCase());
        }

        // Features filter
        if (currentFeatures.length > 0) {
            filtered = filtered.filter(p => {
                // Must have ALL selected features
                return currentFeatures.every(f => p.features.some(pf => pf.toLowerCase().includes(f.toLowerCase())));
            });
        }

        // Sort
        if (currentSort === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        renderProperties(filtered);
    };

    // Events: Type Buttons
    typeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            typeBtns.forEach(b => {
                b.classList.remove('bg-gave-primary', 'text-white', 'border-transparent');
                b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
            });
            btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
            btn.classList.add('bg-gave-primary', 'text-white', 'border-transparent');
            
            currentType = btn.dataset.type;
            filterAndSort();
        });
    });

    // Events: Feature Checkboxes
    featureCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            currentFeatures = Array.from(featureCheckboxes)
                .filter(c => c.checked)
                .map(c => c.value);
            filterAndSort();
        });
    });

    // Events: Sort Select
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        filterAndSort();
    });

    const resetFilters = () => {
        currentType = 'all';
        currentFeatures = [];
        currentSort = 'default';
        
        typeBtns.forEach(b => {
            if(b.dataset.type === 'all') {
                b.classList.add('bg-gave-primary', 'text-white', 'border-transparent');
                b.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
            } else {
                b.classList.remove('bg-gave-primary', 'text-white', 'border-transparent');
                b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
            }
        });
        
        featureCheckboxes.forEach(cb => cb.checked = false);
        sortSelect.value = 'default';
        
        filterAndSort();
    };

    clearBtn.addEventListener('click', resetFilters);
    if(clearEmptyBtn) clearEmptyBtn.addEventListener('click', resetFilters);

    // Initial render
    renderProperties(properties);
});
