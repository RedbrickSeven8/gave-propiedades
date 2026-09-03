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
    const propertyId = urlParams.get('id');
    const property = properties.find(p => p.id === propertyId);
    
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

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    };

    // Build features list
    const featuresHtml = property.features.map(f => `
        <li class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg> 
            ${f}
        </li>`).join('');
        
    // Images
    const thumb1 = property.images[0] || property.mainImg;
    const thumb2 = property.images[1] || property.mainImg;

    // Contact msg
    const waMsg = encodeURIComponent(`Hola, estoy interesado en la propiedad: ${property.title} (Ref: ${property.id})`);

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
              <span class="inline-block px-4 py-1.5 bg-gave-secondary text-white text-xs font-bold rounded-full uppercase tracking-widest mb-4 shadow-sm">${property.status === 'Usado' ? 'En Venta' : 'Proyecto Nuevo'}</span>
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gave-primary leading-tight">${property.title}</h1>
              <p class="text-gray-500 mt-3 text-lg flex items-center gap-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                ${property.location}
              </p>
            </div>
            <div class="text-left lg:text-right bg-white p-4 rounded-2xl shadow-sm border border-gray-100 lg:bg-transparent lg:p-0 lg:shadow-none lg:border-none">
              <p class="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-1">Precio de Venta</p>
              <p class="text-3xl md:text-4xl font-extrabold text-gave-primary">${formatPrice(property.price)}</p>
            </div>
          </div>
        </div>

        <!-- TWO COLUMN LAYOUT -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          <!-- LEFT COLUMN: Gallery & Details -->
          <div class="lg:col-span-2 space-y-8">
            
            <!-- Gallery Grid -->
            <div class="flex flex-col gap-4">
              <!-- Main Image -->
              <div class="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-md bg-gray-200">
                <img src="${property.mainImg}" alt="${property.title}" class="w-full h-full object-cover">
              </div>
              <!-- Thumbnails -->
              <div class="grid grid-cols-2 gap-4">
                <div class="w-full aspect-video md:aspect-[16/7] rounded-2xl overflow-hidden shadow-sm bg-gray-200">
                  <img src="${thumb1}" alt="Interior 1" class="w-full h-full object-cover">
                </div>
                <div class="w-full aspect-video md:aspect-[16/7] rounded-2xl overflow-hidden shadow-sm bg-gray-200">
                  <img src="${thumb2}" alt="Interior 2" class="w-full h-full object-cover">
                </div>
              </div>
            </div>

            <!-- 1. Información del Inmueble -->
            <section class="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold text-gave-primary mb-8 flex items-center gap-3 border-b border-gray-100 pb-4">
                <span class="w-10 h-10 bg-gave-primary/5 rounded-full flex items-center justify-center text-gave-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </span>
                Información del Inmueble
              </h2>
              
              <div class="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Tipo de Inmueble</p><p class="font-semibold text-gray-900 text-lg">${property.type}</p></div>
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Estado</p><p class="font-semibold text-gray-900 text-lg">${property.status}</p></div>
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Antigüedad</p><p class="font-semibold text-gray-900 text-lg">${property.antiguedad}</p></div>
                
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Habitaciones</p><p class="font-semibold text-gray-900 text-lg">${property.beds}</p></div>
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Baños</p><p class="font-semibold text-gray-900 text-lg">${property.baths}</p></div>
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Parqueaderos</p><p class="font-semibold text-gray-900 text-lg">${property.parking}</p></div>
                
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Área Construida</p><p class="font-semibold text-gray-900 text-lg">${property.areaConstruida > 0 ? property.areaConstruida + ' m²' : 'N/A'}</p></div>
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Área Privada</p><p class="font-semibold text-gray-900 text-lg">${property.areaPrivada > 0 ? property.areaPrivada + ' m²' : 'N/A'}</p></div>
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Área del Terreno</p><p class="font-semibold text-gray-900 text-lg">${property.areaTerreno > 0 ? property.areaTerreno + ' m²' : 'N/A'}</p></div>
                
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Estrato</p><p class="font-semibold text-gray-900 text-lg">${property.estrato}</p></div>
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Cantidad Pisos</p><p class="font-semibold text-gray-900 text-lg">${property.pisos}</p></div>
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Remodelado</p><p class="font-semibold text-gray-900 text-lg">${property.remodelado}</p></div>
                <div><p class="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wide">Acepta Permuta</p><p class="font-semibold text-gray-900 text-lg">${property.permuta}</p></div>
              </div>
            </section>

            <!-- 2. Características -->
            <section class="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold text-gave-primary mb-8 flex items-center gap-3 border-b border-gray-100 pb-4">
                <span class="w-10 h-10 bg-gave-primary/5 rounded-full flex items-center justify-center text-gave-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                </span>
                Características destacadas
              </h2>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-lg">
                ${featuresHtml}
              </ul>
            </section>

            <!-- 3. Ubicación -->
            <section class="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold text-gave-primary mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                <span class="w-10 h-10 bg-gave-primary/5 rounded-full flex items-center justify-center text-gave-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                Ubicación
              </h2>
              <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1m1!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade"
                  class="filter grayscale opacity-90 contrast-125">
                </iframe>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-gave-secondary/30 rounded-full border-2 border-gave-secondary flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(62,119,81,0.5)] pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary w-8 h-8 fill-current"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
              </div>
              <p class="text-sm text-gray-500 mt-4 text-center">La ubicación mostrada es una región aproximada, no la ubicación exacta del inmueble.</p>
            </section>

          </div>

          <!-- RIGHT COLUMN: Sticky Info & Contact -->
          <div class="lg:col-span-1">
            <div class="sticky top-32 bg-gave-primary p-6 md:p-8 rounded-3xl shadow-xl text-white">
              <h3 class="text-2xl font-bold mb-6 border-b border-white/20 pb-4">Info Relevante</h3>
              
              <!-- Quick Stats Grid -->
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="bg-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2 text-gave-secondary"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.4-1.7-1-2.1L17 8H7L3 10.9c-.6.4-1 1.2-1 2.1v3c0 .6.4 1 1 1h2"/><path d="M14 17h-4v-2h4v2Z"/><circle cx="6.5" cy="16.5" r="1.5"/><circle cx="17.5" cy="16.5" r="1.5"/></svg>
                  <p class="text-white/70 text-xs uppercase tracking-wider mb-1">Parqueaderos</p>
                  <p class="text-xl font-bold">${property.parking}</p>
                </div>
                <div class="bg-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2 text-gave-secondary"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                  <p class="text-white/70 text-xs uppercase tracking-wider mb-1">Habitaciones</p>
                  <p class="text-xl font-bold">${property.beds}</p>
                </div>
                <div class="bg-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2 text-gave-secondary"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/></svg>
                  <p class="text-white/70 text-xs uppercase tracking-wider mb-1">Baños</p>
                  <p class="text-xl font-bold">${property.baths}</p>
                </div>
                <div class="bg-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2 text-gave-secondary"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
                  <p class="text-white/70 text-xs uppercase tracking-wider mb-1">Área</p>
                  <p class="text-xl font-bold">${property.type === 'Lote' ? property.areaTerreno : property.areaConstruida} m²</p>
                </div>
              </div>

              <h4 class="text-lg font-bold mb-4">¿Te interesa esta propiedad?</h4>
              <p class="text-white/80 mb-6 text-sm">Comunícate con nosotras para agendar una visita o resolver cualquier duda.</p>
              
              <div class="space-y-4">
                <a href="https://wa.me/573183593507?text=${waMsg}" target="_blank" class="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                  Contactar por WhatsApp
                </a>
              </div>
              
              <div class="mt-8 pt-6 border-t border-white/20 flex items-center justify-center gap-4">
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-gave-secondary bg-white p-2 flex items-center justify-center">
                  <img src="/logo.png" alt="Gave Propiedades" class="w-full h-auto object-contain">
                </div>
                <div class="text-left">
                  <p class="font-bold text-lg leading-tight">Gave Propiedades</p>
                  <p class="text-sm text-white/70">Asesoras Inmobiliarias</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    mainContainer.innerHTML = propertyHtml;
});
