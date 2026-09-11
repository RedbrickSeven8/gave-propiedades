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

    // --- Load Property Data ---
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id') || 'ref-001';
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
        
    // Images
    const thumb1 = property.images[0] || property.mainImg;
    const thumb2 = property.images[1] || property.mainImg;

    // Contact msg
    const waMsg = encodeURIComponent(`Hola Gave Propiedades, estoy interesado(a) en la propiedad: ${property.title} (Ref: ${property.id}). ¿Podrían brindarme más información?`);

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
              <div class="flex items-center gap-3 mb-4">
                <span class="inline-block px-4 py-1.5 bg-gave-secondary text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-sm">${property.status === 'Usado' ? 'En Venta' : 'Proyecto Nuevo'}</span>
                <span class="inline-block px-3 py-1 bg-gave-primary/10 text-gave-primary text-xs font-semibold rounded-full">${property.type}</span>
                <span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Ref: ${property.id}</span>
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
              <div class="w-full aspect-video md:aspect-[16/9] rounded-3xl overflow-hidden shadow-md bg-gray-200">
                <img id="main-property-img" src="${property.mainImg}" alt="${property.title}" class="w-full h-full object-cover transition-all duration-300">
              </div>
              <!-- Thumbnails -->
              <div class="grid grid-cols-3 gap-3 md:gap-4">
                <div class="w-full aspect-video rounded-2xl overflow-hidden shadow-sm bg-gray-200 cursor-pointer border-2 border-gave-secondary" onclick="document.getElementById('main-property-img').src='${property.mainImg}'">
                  <img src="${property.mainImg}" alt="${property.title} vista 1" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
                </div>
                <div class="w-full aspect-video rounded-2xl overflow-hidden shadow-sm bg-gray-200 cursor-pointer border-2 border-transparent hover:border-gave-secondary" onclick="document.getElementById('main-property-img').src='${thumb1}'">
                  <img src="${thumb1}" alt="${property.title} vista 2" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
                </div>
                <div class="w-full aspect-video rounded-2xl overflow-hidden shadow-sm bg-gray-200 cursor-pointer border-2 border-transparent hover:border-gave-secondary" onclick="document.getElementById('main-property-img').src='${thumb2}'">
                  <img src="${thumb2}" alt="${property.title} vista 3" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
                </div>
              </div>
            </div>

            <!-- Resumen Rápido (Mobile Highlights) -->
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
                <p class="text-2xl font-bold text-gave-primary">${property.parking > 0 ? property.parking : '0'}</p>
              </div>
              <div class="text-center p-3 border-t sm:border-t-0 sm:border-l border-gray-100">
                <p class="text-xs uppercase font-semibold text-gray-400 mb-1">Área Total</p>
                <p class="text-2xl font-bold text-gave-primary">${property.type === 'Lote' ? property.areaTerreno : property.areaConstruida} m²</p>
              </div>
            </div>

            <!-- Descripción Detallada -->
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold text-gave-primary mb-4">Descripción del Inmueble</h2>
              <p class="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line">${property.description || 'Excelente propiedad con acabados de primera calidad, excelente iluminación natural y ubicación estratégica. Ideal para familias o inversionistas que buscan alta valorización y rentabilidad asegurada.'}</p>
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
                  <span class="text-gray-500 font-medium">Área Construida:</span>
                  <span class="font-bold text-gray-900">${property.areaConstruida} m²</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Área Privada:</span>
                  <span class="font-bold text-gray-900">${property.areaPrivada > 0 ? property.areaPrivada + ' m²' : 'N/A'}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Área del Terreno:</span>
                  <span class="font-bold text-gray-900">${property.areaTerreno > 0 ? property.areaTerreno + ' m²' : 'N/A'}</span>
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
                  <span class="text-gray-500 font-medium">Remodelado:</span>
                  <span class="font-bold text-gray-900">${property.remodelado}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500 font-medium">Acepta Permuta:</span>
                  <span class="font-bold text-gray-900">${property.permuta}</span>
                </div>
              </div>
            </div>

            <!-- Características y Comodidades -->
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold text-gave-primary mb-6">Amenidades y Características</h2>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${featuresHtml}
              </ul>
            </div>

            <!-- Ubicación con Mapa Circular (Requerimiento) -->
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h2 class="text-2xl font-bold text-gave-primary">Ubicación y Entorno</h2>
                  <p class="text-gray-500 text-sm mt-1">${property.location} - Zona de alta valorización y seguridad</p>
                </div>
              </div>
              
              <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-200 shadow-inner">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1m1!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade"
                  class="filter grayscale opacity-90 contrast-125 w-full h-full">
                </iframe>
                <!-- Círculo señalando la zona aproximada -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 bg-gave-secondary/30 rounded-full border-2 border-gave-secondary flex items-center justify-center animate-pulse shadow-[0_0_25px_rgba(62,119,81,0.6)] pointer-events-none">
                  <div class="bg-white p-2.5 rounded-full shadow-lg border border-gave-secondary text-gave-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                </div>
              </div>
              <p class="text-xs text-gray-400 mt-3 text-center italic">* Por seguridad y privacidad de nuestros propietarios, el mapa indica la zona y sector de referencia.</p>
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
    `;

    mainContainer.innerHTML = propertyHtml;
});
