const fs = require('fs');

const files = ['index.html', 'catalog.html', 'property.html'];

for (const file of files) {
    let path = '/workspace/gave_propiedades/' + file;
    let html = fs.readFileSync(path, 'utf8');
    
    // El requerimiento pide mejorar legibilidad y contraste del menú móvil.
    // Actualmente: bg-gave-primary (azul oscuro) con texto blanco (text-white) y verde (text-gave-secondary).
    // El texto verde (text-gave-secondary) sobre fondo azul oscuro puede fallar en contraste.
    // Vamos a cambiarlo a un verde más claro, o mantener el acento en botones.
    // Además podemos añadir un overlay de desenfoque al fondo.

    const oldMenuRegex = /<div class="fixed inset-0 bg-gave-primary z-\[9995\] transform translate-x-full transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8" id="mobile-menu">[\s\S]*?<\/div>/;

    const newMenuHtml = `<div class="fixed inset-0 z-[9995] transform translate-x-full transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center space-y-10" id="mobile-menu">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gave-primary/95 backdrop-blur-md"></div>
        
        <!-- Links (Elevated Z to sit on top of backdrop) -->
        <a href="/index.html" class="relative z-10 text-3xl text-white font-bold tracking-wide mobile-link hover:scale-110 transition-transform">Inicio</a>
        <a href="/index.html#nosotros" class="relative z-10 text-3xl text-white font-bold tracking-wide mobile-link hover:scale-110 transition-transform">Nosotros</a>
        <a href="/index.html#servicios" class="relative z-10 text-3xl text-white font-bold tracking-wide mobile-link hover:scale-110 transition-transform">Servicios</a>
        <a href="/catalog.html" class="relative z-10 text-3xl text-white font-bold tracking-wide mobile-link hover:scale-110 transition-transform">Propiedades</a>
        
        <!-- Separator -->
        <div class="relative z-10 w-24 h-px bg-white/20 my-4"></div>
        
        <a href="https://wa.me/573183593507?text=Hola,%20quiero%20agendar%20una%20asesor%C3%ADa" target="_blank" class="relative z-10 text-xl bg-[#25D366] text-white px-8 py-4 rounded-full font-bold tracking-wide mobile-link shadow-lg flex items-center gap-3 hover:bg-[#128C7E] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
          Contactar
        </a>
      </div>`;

    if(oldMenuRegex.test(html)) {
        html = html.replace(oldMenuRegex, newMenuHtml);
        fs.writeFileSync(path, html);
        console.log("Fixed menu visually in: " + file);
    } else {
        console.log("Regex missed menu in: " + file);
    }
}
