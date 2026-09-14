import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

old_prop_section = re.search(r'<section id="propiedades"[\s\S]*?</section>', text)

new_prop_section = '''<section id="propiedades" class="py-24 bg-white">
      <div class="container mx-auto px-4 md:px-8 max-w-7xl">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gs-reveal">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 text-gave-secondary font-semibold uppercase tracking-wider mb-4">
              <span class="w-8 h-0.5 bg-gave-secondary"></span>
              Catálogo Selecto
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gave-primary">Propiedad Destacada</h2>
            <p class="text-gray-600 mt-2">Inmueble verificado jurídica y técnicamente para una compra segura.</p>
          </div>
          <a href="/catalog.html" class="hidden md:inline-flex items-center gap-2 text-gave-secondary font-bold hover:text-gave-primary transition-colors text-base">
            Ver en catálogo <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

        <div class="max-w-xl mx-auto">
          <!-- Propiedad: Casa en Las Américas, Armenia (Ref: ref-001) -->
          <a href="/property.html?id=ref-001" class="block bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col justify-between">
            <div>
              <div class="relative h-72 md:h-80 overflow-hidden bg-gray-200">
                <div class="absolute top-4 left-4 z-10 bg-gave-secondary text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  En Venta
                </div>
                <div class="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md text-gave-primary text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  Casa
                </div>
                <img src="/properties/ref-001/foto_4.jpg" alt="Casa en Venta en Sector Las Américas, Armenia" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
              </div>
              <div class="p-6 md:p-8">
                <p class="text-gave-primary font-extrabold text-3xl mb-1">$ 340.000.000 COP</p>
                <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-gave-secondary transition-colors">Casa en Sector Las Américas</h3>
                <p class="text-gray-500 text-sm mb-4 flex items-center gap-1.5 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> Armenia, Quindío
                </p>
                <p class="text-gray-600 text-sm leading-relaxed line-clamp-2">Hermosa casa de 2 niveles ubicada en el prestigioso y tranquilo sector de Las Américas en Armenia. 3 habitaciones, 3 baños, sala, comedor, cocina integral, patio y parqueadero cubierto.</p>
              </div>
            </div>
            <div class="px-6 md:px-8 pb-6 md:pb-8 border-t border-gray-100 pt-5 flex items-center justify-between">
              <div class="flex gap-4 text-gray-700 text-sm font-semibold">
                <span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg> 3 hab.</span>
                <span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/></svg> 3 bñ.</span>
                <span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg> 125 m²</span>
              </div>
              <span class="text-sm font-bold text-gave-secondary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Ver detalle →</span>
            </div>
          </a>
        </div>

        <div class="mt-12 text-center md:hidden">
          <a href="/catalog.html" class="inline-flex items-center justify-center gap-2 text-gave-secondary font-bold px-8 py-3.5 border-2 border-gave-secondary rounded-full w-full max-w-xs">
            Ver en catálogo <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>'''

if old_prop_section:
    text = text[:old_prop_section.start()] + new_prop_section + text[old_prop_section.end():]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Updated index.html propiedades section successfully")
else:
    print("Could not find section in index.html")
