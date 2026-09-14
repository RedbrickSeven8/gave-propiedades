import './style.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
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

    // --- Load Property Data ---
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id') || 'ref-007';
    const property = properties.find(p => p.id === propertyId) || properties[0];
    
    const mainContainer = document.getElementById('property-main');
    
    if (!property) {
        mainContainer.innerHTML = `
        <div class="container mx-auto px-4 py-20 text-center">
            <h1 class="text-3xl font-bold text-gave-primary mb-4">Propiedad no encontrada</h1>
            <p class="text-gray-500 mb-8">Lo sentimos, no pudimos encontrar la propiedad que buscas.</p>
            <a href="/catalog.html" class="px-6 py-3 bg-gave-secondary text-white rounded-full font-medium shadow-sm hover:bg-opacity-90">Volver al catálogo</a>
        </div>`;
        return;
    }

    document.title = `${property.title} | Gave Propiedades`;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    };

    // Build features list
    const featuresHtml = property.features.map(f => `
        <li class="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 text-gray-700 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg> 
            <span>${f}</span>
        </li>`).join('');

    // Contact msg
    const waMsg = encodeURIComponent(`Hola Gave Propiedades, estoy interesado(a) en la propiedad: ${property.title} (Ref: ${property.id}). ¿Podrían brindarme más información?`);

    // All available gallery photos (mainImg + images)
    const allGalleryImages = [property.mainImg, ...(property.images || [])];
    
    const thumbnailsHtml = allGalleryImages.map((imgUrl, idx) => `
        <div class="w-full aspect-square rounded-2xl overflow-hidden shadow-sm bg-gray-200 cursor-pointer border-2 transition-all duration-300 ${idx === 0 ? 'border-gave-secondary ring-2 ring-gave-secondary/20' : 'border-transparent hover:border-gave-secondary'}" onclick="document.getElementById('main-property-img').src='${imgUrl}'; document.querySelectorAll('.gallery-thumb').forEach(el => el.classList.remove('border-gave-secondary', 'ring-2', 'ring-gave-secondary/20')); this.classList.add('border-gave-secondary', 'ring-2', 'ring-gave-secondary/20');" class="gallery-thumb">
          <img src="${imgUrl}" alt="${property.title} foto ${idx + 1}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
        </div>
    `).join('');

    // Video Section with Interactive Lightbox
    const videoSectionHtml = property.videoEmbedUrl ? `
      <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gave-primary flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><polygon points="23 7 16 12 23 17 23 7"/><rect width="15" height="14" x="1" y="5" rx="2" ry="2"/></svg>
              Video Tour del Inmueble
            </h2>
            <p class="text-gray-600 text-sm mt-1">Haz clic sobre la vista previa para abrir el video tour completo en el reproductor interactivo.</p>
          </div>
          <button id="btn-trigger-lightbox" class="inline-flex items-center gap-2 px-5 py-2.5 bg-gave-primary text-white rounded-full font-bold text-xs hover:bg-gave-secondary transition-all cursor-pointer shadow-sm flex-shrink-0 self-start sm:self-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Ver en Pantalla Completa
          </button>
        </div>

        <!-- Embedded Video Player Preview / Lightbox Trigger -->
        <div 
          id="open-video-lightbox"
          class="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg bg-gray-950 group cursor-pointer border border-gray-200 hover:border-gave-secondary transition-all"
        >
          <!-- Background Cover -->
          <img src="${property.mainImg}" alt="Vista previa Video Tour" class="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
          
          <!-- Play Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-center p-6 text-center">
            <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gave-secondary text-white flex items-center justify-center shadow-2xl group-hover:scale-110 active:scale-95 transition-transform duration-300 ring-4 ring-white/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="ml-1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <p class="mt-4 text-white font-extrabold text-lg md:text-2xl drop-shadow-md">Reproducir Video Tour</p>
            <span class="mt-1.5 text-xs text-white/90 font-medium px-3.5 py-1 bg-white/20 rounded-full backdrop-blur-md border border-white/20">Abrir en Lightbox</span>
          </div>
        </div>
      </div>
    ` : '';

    const propertyHtml = `
      <div class="container mx-auto px-4 md:px-8 max-w-7xl">
        
        <!-- Breadcrumb & Header Title -->
        <div class="mb-8">
          <a href="/catalog.html" class="inline-flex items-center gap-2 text-gray-500 hover:text-gave-primary transition-colors mb-6 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver al catálogo
          </a>
          
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <span class="inline-block px-4 py-1.5 bg-gave-secondary text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-sm">${property.status === 'Usado' ? 'En Venta' : 'Proyecto Nuevo'}</span>
                <span class="inline-block px-3 py-1 bg-gave-primary/10 text-gave-primary text-xs font-semibold rounded-full">${property.type}</span>
                <span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Ref: ${property.id}</span>
                ${property.sector ? `<span class="inline-block px-3 py-1 bg-emerald-50 text-gave-secondary text-xs font-semibold rounded-full">Barrio ${property.sector}</span>` : ''}
              </div>
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gave-primary leading-tight">${property.title}</h1>
              <p class="text-gray-500 mt-3 text-lg flex items-center gap-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                ${property.location}
              </p>
            </div>
            <div class="text-left lg:text-right bg-white p-5 rounded-2xl shadow-sm border border-gray-100 lg:bg-transparent lg:p-0 lg:shadow-none lg:border-none">
              <p class="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Precio de Venta</p>
              <p class="text-3xl md:text-4xl font-extrabold text-gave-primary">${formatPrice(property.price)}</p>
              <p class="text-xs text-gray-400 mt-1">Sin cobros ocultos ni comisiones de entrada</p>
            </div>
          </div>
        </div>

        <!-- TWO COLUMN LAYOUT -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          <!-- LEFT COLUMN: Gallery & Details -->
          <div class="lg:col-span-2 space-y-10">
            
            <!-- Gallery Grid -->
            <div class="flex flex-col gap-4">
              <!-- Main Image -->
              <div class="w-full aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden shadow-md bg-gray-200">
                <img id="main-property-img" src="${property.mainImg}" alt="${property.title}" class="w-full h-full object-cover transition-all duration-300">
              </div>
              
              <!-- Thumbnails Grid -->
              <div class="grid grid-cols-4 sm:grid-cols-6 gap-3">
                ${thumbnailsHtml}
              </div>
            </div>

            <!-- Resumen Rápido (Highlights) -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div class="text-center p-3">
                <p class="text-xs uppercase font-semibold text-gray-400 mb-1">Habitaciones</p>
                <p class="text-2xl font-bold text-gave-primary">${property.beds > 0 ? property.beds : 'N/A'}</p>
              </div>
              <div class="text-center p-3 border-l border-gray-100">
                <p class="text-xs uppercase font-semibold text-gray-400 mb-1">Baños</p>
                <p class="text-2xl font-bold text-gave-primary">${property.baths > 0 ? property.baths : 'N/A'}</p>
              </div>
              <div class="text-center p-3 border-t sm:border-t-0 sm:border-l border-gray-100">
                <p class="text-xs uppercase font-semibold text-gray-400 mb-1">Parqueaderos</p>
                <p class="text-2xl font-bold text-gave-primary">${property.parking > 0 ? property.parking : '0'} ${property.parkingType ? `(${property.parkingType})` : ''}</p>
              </div>
              <div class="text-center p-3 border-t sm:border-t-0 sm:border-l border-gray-100">
                <p class="text-xs uppercase font-semibold text-gray-400 mb-1">Área Total</p>
                <p class="text-2xl font-bold text-gave-primary">${property.type === 'Lote' ? property.areaTerreno : property.areaConstruida} m²</p>
              </div>
            </div>

            <!-- Video Section if available -->
            ${videoSectionHtml}

            <!-- Descripción Detallada -->
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold text-gave-primary mb-4">Descripción del Inmueble</h2>
              <p class="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line">${property.description}</p>
            </div>

            <!-- Ficha Técnica Completa -->
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold text-gave-primary mb-6">Especificaciones Técnicas</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Tipo de Inmueble:</span>
                  <span class="font-bold text-gray-900">${property.type}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Estado:</span>
                  <span class="font-bold text-gray-900">${property.status}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Ciudad / Departamento:</span>
                  <span class="font-bold text-gray-900">${property.location}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Sector / Barrio:</span>
                  <span class="font-bold text-gray-900">${property.sector || 'N/A'}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Área Construida / Total:</span>
                  <span class="font-bold text-gray-900">${property.areaConstruida} m²</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Estrato Socioeconómico:</span>
                  <span class="font-bold text-gray-900">Estrato ${property.estrato}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Pisos / Niveles:</span>
                  <span class="font-bold text-gray-900">${property.pisos > 0 ? property.pisos : 'N/A'}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Antigüedad:</span>
                  <span class="font-bold text-gray-900">${property.antiguedad}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Parqueadero:</span>
                  <span class="font-bold text-gray-900">${property.parking} vehículo(s) ${property.parkingType ? `(${property.parkingType})` : ''}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">¿En Conjunto Cerrado?:</span>
                  <span class="font-bold text-gray-900">${property.enConjunto || 'No'}</span>
                </div>
              </div>
            </div>

            <!-- Características y Comodidades -->
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold text-gave-primary mb-6">Amenidades y Características del Inmueble y Sector</h2>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${featuresHtml}
              </ul>
            </div>

            <!-- Ubicación con Mapa Interactivo y Zona Fija Real (Leaflet OpenStreetMap) -->
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 class="text-2xl font-bold text-gave-primary flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    Ubicación y Sector
                  </h2>
                  <p class="text-gray-500 text-sm mt-1">${property.location} · ${property.sector ? `Sector ${property.sector}` : 'Zona Residencial'}</p>
                </div>
                <a 
                  href="https://maps.google.com/?q=${encodeURIComponent((property.sector ? property.sector + ', ' : '') + property.location)}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-xs font-bold text-gave-secondary bg-emerald-50 px-4 py-2 rounded-full hover:bg-gave-secondary hover:text-white transition-all shadow-sm flex-shrink-0 self-start sm:self-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Abrir en Google Maps
                </a>
              </div>
              
              <!-- Map Container with Leaflet Render Target -->
              <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-inner border border-gray-200">
                <div id="property-leaflet-map" class="w-full h-full z-10" style="min-height: 340px;"></div>
                
                <!-- Floating Info Badge on Map -->
                <div class="absolute top-3 left-3 z-[400] bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-gray-200/80 shadow-md flex items-center gap-2 text-xs font-bold text-gave-primary pointer-events-none">
                  <span class="w-2.5 h-2.5 rounded-full bg-gave-secondary animate-pulse"></span>
                  Zona señalada: ${property.sector || property.location.split(',')[0]}
                </div>
              </div>
              <p class="text-xs text-gray-400 mt-3 text-center italic">* El círculo verde representa la zona aproximada del inmueble en el mapa interactivo (puedes hacer zoom y desplazar el mapa libremente manteniendo la zona fija en sus coordenadas geográficas exactas).</p>
            </div>

          </div>

          <!-- RIGHT COLUMN: Contact & Advisor Card (Sticky) -->
          <div class="lg:col-span-1">
            <div class="sticky top-28 bg-gradient-to-br from-gave-primary to-[#00223a] text-white p-8 rounded-3xl shadow-2xl space-y-6">
              
              <div>
                <span class="text-gave-secondary text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Atención Directa</span>
                <h3 class="text-2xl font-bold mt-3 text-white">¿Te interesa esta propiedad?</h3>
                <p class="text-white/80 text-sm mt-2 leading-relaxed">Habla directamente con nuestras asesoras expertas para agendar una visita presencial o recibir el dossier legal completo.</p>
              </div>

              <div class="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-white/70">Referencia:</span>
                  <span class="font-bold text-white">${property.id}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-white/70">Precio:</span>
                  <span class="font-bold text-emerald-400">${formatPrice(property.price)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-white/70">Ubicación:</span>
                  <span class="font-bold text-white">${property.location}</span>
                </div>
              </div>

              <div class="space-y-3 pt-2">
                <a href="https://wa.me/573183593507?text=${waMsg}" target="_blank" class="w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3 shadow-lg transform hover:-translate-y-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.71 14.81 12.14 15.86C14.16 16.73 14.57 16.55 15.02 16.51C15.46 16.47 16.44 15.93 16.64 15.36C16.85 14.78 16.85 14.29 16.78 14.19C16.72 14.08 16.56 14.02 16.32 13.9C16.08 13.78 14.9 13.2 14.68 13.12C14.46 13.04 14.3 13 14.14 13.24C13.98 13.48 13.51 14.02 13.37 14.19C13.23 14.35 13.09 14.37 12.85 14.25C12.61 14.13 11.84 13.88 10.92 13.06C10.2 12.42 9.72 11.63 9.58 11.39C9.44 11.15 9.56 11.02 9.68 10.9C9.79 10.79 9.93 10.61 10.05 10.47C10.17 10.33 10.21 10.23 10.29 10.07C10.37 9.91 10.33 9.77 10.27 9.65C10.21 9.53 9.73 8.35 9.53 7.87C9.33 7.39 9.13 7.45 8.98 7.45C8.84 7.45 8.68 7.33 8.53 7.33Z"/></svg>
                  Contactar por WhatsApp
                </a>
                <a href="/catalog.html" class="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-2xl transition-all flex items-center justify-center gap-2 text-sm">
                  Ver más inmuebles
                </a>
              </div>
              
              <!-- Asesoras Profile -->
              <div class="pt-6 border-t border-white/10 flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl overflow-hidden border-2 border-gave-secondary bg-white p-1.5 flex items-center justify-center flex-shrink-0 shadow-md">
                  <img src="/logo.png" alt="Gave Propiedades" class="w-full h-full object-contain">
                </div>
                <div>
                  <p class="font-bold text-base leading-snug">Gave Propiedades</p>
                  <p class="text-xs text-emerald-300 font-medium">Asesoría Inmobiliaria 1 a 1</p>
                  <p class="text-[11px] text-white/60 mt-0.5">Sin cobros de anticipo</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- Video Lightbox Modal (Full HD Interactive Embed) -->
      ${property.videoEmbedUrl ? `
        <div 
          id="video-lightbox-modal" 
          class="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 opacity-0 pointer-events-none transition-opacity duration-300"
        >
          <div class="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 px-6 bg-gray-900/90 border-b border-white/10">
              <div class="flex items-center gap-2 text-white">
                <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
                <span class="font-bold text-sm md:text-base">${property.title} - Video Tour</span>
              </div>
              <button 
                id="close-video-lightbox" 
                class="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 text-white flex items-center justify-center transition-colors cursor-pointer text-lg font-bold"
                aria-label="Cerrar video"
              >
                ✕
              </button>
            </div>
            
            <!-- Video Iframe Container -->
            <div class="relative w-full aspect-video bg-black">
              <iframe 
                id="lightbox-iframe"
                src="" 
                data-src="${property.videoEmbedUrl}"
                class="w-full h-full" 
                allow="autoplay; fullscreen"
                allowfullscreen
              ></iframe>
            </div>
            
            <!-- Modal Footer -->
            <div class="p-4 px-6 bg-gray-900/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
              <span>Gave Propiedades · Recorrido Virtual</span>
              <a href="https://wa.me/573183593507?text=${waMsg}" target="_blank" class="px-5 py-2 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#128C7E] transition-all flex items-center gap-1.5 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.71 14.81 12.14 15.86C14.16 16.73 14.57 16.55 15.02 16.51C15.46 16.47 16.44 15.93 16.64 15.36C16.85 14.78 16.85 14.29 16.78 14.19C16.72 14.08 16.56 14.02 16.32 13.9C16.08 13.78 14.9 13.2 14.68 13.12C14.46 13.04 14.3 13 14.14 13.24C13.98 13.48 13.51 14.02 13.37 14.19C13.23 14.35 13.09 14.37 12.85 14.25C12.61 14.13 11.84 13.88 10.92 13.06C10.2 12.42 9.72 11.63 9.58 11.39C9.44 11.15 9.56 11.02 9.68 10.9C9.79 10.79 9.93 10.61 10.05 10.47C10.17 10.33 10.21 10.23 10.29 10.07C10.37 9.91 10.33 9.77 10.27 9.65C10.21 9.53 9.73 8.35 9.53 7.87C9.33 7.39 9.13 7.45 8.98 7.45C8.84 7.45 8.68 7.33 8.53 7.33Z"/></svg>
                Agendar Visita
              </a>
            </div>
          </div>
        </div>
      ` : ''}
    `;

    mainContainer.innerHTML = propertyHtml;

    // --- Initialize Leaflet Interactive Map with Fixed Geographic Circle ---
    const mapContainer = document.getElementById('property-leaflet-map');
    if (mapContainer && property.lat && property.lng) {
      try {
        const lat = property.lat;
        const lng = property.lng;
        const zoom = property.zoom || 15;
        const radius = property.zoneRadius || 400;

        const map = L.map('property-leaflet-map', {
          center: [lat, lng],
          zoom: zoom,
          zoomControl: true,
          scrollWheelZoom: false
        });

        // Add CartoDB Positron / OSM tiles (clean, professional aesthetic)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map);

        // Fixed Geographic Circle bound to real coordinates
        const zoneCircle = L.circle([lat, lng], {
          color: '#3E7751',
          fillColor: '#3E7751',
          fillOpacity: 0.28,
          weight: 2.5,
          radius: radius,
          dashArray: '6, 6'
        }).addTo(map);

        // Custom branded Pulsing Icon in the exact center
        const customPinIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
              <div style="position: absolute; inset: 0; border-radius: 50%; background: rgba(62, 119, 81, 0.4); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="position: relative; width: 32px; height: 32px; border-radius: 50%; background: #00375D; border: 2.5px solid #FFFFFF; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: #FFFFFF;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        const marker = L.marker([lat, lng], { icon: customPinIcon }).addTo(map);
        
        // Popup with property details
        marker.bindPopup(`
          <div style="font-family: Inter, sans-serif; padding: 4px; color: #00375D;">
            <strong style="font-size: 13px; display: block; margin-bottom: 2px;">${property.title}</strong>
            <span style="font-size: 11px; color: #3E7751; font-weight: 600;">Sector ${property.sector || property.location}</span>
          </div>
        `);

        // Trigger map resize fix after mount
        setTimeout(() => {
          map.invalidateSize();
        }, 300);

      } catch (err) {
        console.error('Error initializing Leaflet map:', err);
      }
    }

    // Attach Lightbox open/close handlers
    if (property.videoEmbedUrl) {
      const modal = document.getElementById('video-lightbox-modal');
      const iframe = document.getElementById('lightbox-iframe');
      const openTrigger = document.getElementById('open-video-lightbox');
      const btnTrigger = document.getElementById('btn-trigger-lightbox');
      const closeTrigger = document.getElementById('close-video-lightbox');

      const openLightbox = () => {
        if (!modal || !iframe) return;
        iframe.src = iframe.getAttribute('data-src') || '';
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
      };

      const closeLightbox = () => {
        if (!modal || !iframe) return;
        iframe.src = '';
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
      };

      if (openTrigger) openTrigger.addEventListener('click', openLightbox);
      if (btnTrigger) btnTrigger.addEventListener('click', openLightbox);
      if (closeTrigger) closeTrigger.addEventListener('click', closeLightbox);

      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeLightbox();
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('opacity-0')) {
          closeLightbox();
        }
      });
    }
});
