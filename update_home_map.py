import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace coverage section with real interactive Leaflet map container
old_coverage_pattern = re.compile(
    r'<section class=\"py-12 md:py-24 bg-gray-50 overflow-hidden relative\">\s*<div class=\"container mx-auto px-4 md:px-8\">\s*<div class=\"flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-16\">[\s\S]*?</section>',
    re.MULTILINE
)

new_coverage = '''<section class="py-16 md:py-24 bg-gray-50 overflow-hidden relative" id="cobertura">
      <div class="container mx-auto px-4 md:px-8 max-w-7xl">
        <div class="flex flex-col-reverse lg:flex-row items-center gap-10 md:gap-16">
          
          <!-- Leaflet Interactive Map Container with Fixed Zones -->
          <div class="w-full lg:w-1/2 relative gs-reveal">
            <div class="relative w-full aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-slate-100">
              <div id="home-coverage-map" class="w-full h-full z-10" style="min-height: 380px;"></div>
              
              <!-- Map Floating Overlay Badge -->
              <div class="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-gray-200 shadow-lg flex items-center gap-2.5 text-xs font-bold text-gave-primary pointer-events-none">
                <span class="w-2.5 h-2.5 rounded-full bg-gave-secondary animate-pulse"></span>
                Zonas Activas de Asesoría en Colombia
              </div>
            </div>
          </div>
          
          <div class="w-full lg:w-1/2 space-y-5 md:space-y-6 gs-reveal text-center lg:text-left">
            <div class="inline-flex items-center gap-2 text-gave-secondary font-semibold uppercase tracking-wider mx-auto lg:mx-0">
              <span class="w-8 h-0.5 bg-gave-secondary"></span>
              Cobertura Nacional
            </div>
            <h2 class="text-3xl md:text-4xl font-extrabold text-gave-primary leading-tight">
              Conocimiento local con alcance en las mejores zonas del país
            </h2>
            <p class="text-gray-600 text-base md:text-lg leading-relaxed">
              Operamos con presencia directa en las ciudades de mayor valorización inmobiliaria en Colombia: <strong>Armenia (Eje Cafetero), Bogotá, Medellín, Barranquilla, Cali y Bucaramanga</strong>, garantizando estudios legales y estructurales con zona delimitada y fija.
            </p>
            <ul class="space-y-3.5 mt-4 text-gray-700 text-left max-w-lg mx-auto lg:mx-0">
              <li class="flex items-start gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary flex-shrink-0 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span class="text-sm md:text-base font-medium">Análisis de precios y valorización por cuadrantes fijos.</span>
              </li>
              <li class="flex items-start gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary flex-shrink-0 mt-0.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                <span class="text-sm md:text-base font-medium">Estudios de viabilidad estructural, linderos y títulos notariales.</span>
              </li>
              <li class="flex items-start gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-gave-secondary flex-shrink-0 mt-0.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span class="text-sm md:text-base font-medium">Proyección de desarrollo urbano y seguridad residencial.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>'''

text, count = old_coverage_pattern.subn(new_coverage, text)
print('Coverage section replaced in index.html:', count)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)
