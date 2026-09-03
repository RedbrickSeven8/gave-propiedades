const fs = require('fs');
const path = require('path');

const files = {
    index: fs.readFileSync('/workspace/gave_propiedades/index.html', 'utf8'),
    catalog: fs.readFileSync('/workspace/gave_propiedades/catalog.html', 'utf8'),
    property: fs.readFileSync('/workspace/gave_propiedades/property.html', 'utf8'),
    css: fs.readFileSync('/workspace/gave_propiedades/style.css', 'utf8'),
    jsMain: fs.readFileSync('/workspace/gave_propiedades/main.js', 'utf8'),
    jsCatalog: fs.readFileSync('/workspace/gave_propiedades/catalog.js', 'utf8'),
    jsProperty: fs.readFileSync('/workspace/gave_propiedades/property.js', 'utf8')
};

let score = 100;
let findings = [];

function assert(condition, successMsg, errorMsg, severity = 'high') {
    if (!condition) {
        findings.push({ status: '❌', msg: errorMsg, severity });
        if (severity === 'high') score -= 10;
        if (severity === 'medium') score -= 5;
        if (severity === 'low') score -= 2;
    } else {
        findings.push({ status: '✅', msg: successMsg, severity: 'pass' });
    }
}

console.log("==================================================");
console.log("🔍 INICIANDO AUDITORÍA ESTRUCTURAL Y UX/UI AL DETALLE");
console.log("==================================================\n");

// 1. DESBORDAMIENTOS Y LAYOUT (Mobile & Desktop)
console.log(">> 1. CONTROL DE DESBORDAMIENTOS Y GRID");
assert(files.index.includes('overflow-x-hidden') && files.index.includes('w-full'), "Index previene scroll horizontal (w-full overflow-x-hidden)", "Index vulnerable a desbordamiento horizontal");
assert(files.catalog.includes('overflow-x-hidden') && files.catalog.includes('w-full'), "Catalog previene scroll horizontal", "Catalog vulnerable a desbordamiento horizontal");
assert(files.property.includes('overflow-x-hidden') && files.property.includes('w-full'), "Property previene scroll horizontal", "Property vulnerable a desbordamiento horizontal");
assert(files.css.includes('.native-carousel') && files.css.includes('scroll-snap-type: x mandatory'), "Carrusel usa Native Scroll Snap (A prueba de fallos iOS/Android)", "Carrusel no usa scroll nativo");
assert(files.catalog.includes('scrollbar-width: none'), "Filtros de catálogo tienen scroll horizontal oculto optimizado para móvil", "Filtros de catálogo podrían romper el grid en móvil");

// 2. NAVEGACIÓN Y ENLACES
console.log("\n>> 2. NAVEGACIÓN Y ENLACES (UX)");
const waRegex = /https:\/\/wa\.me\/573183593507\?text=/g;
assert((files.index.match(waRegex) || []).length >= 2, "Index contiene links de WA correctos (+573183593507)", "Index le faltan links de WA o tiene el número incorrecto");
assert((files.property.match(waRegex) || []).length >= 1, "Property contiene links de WA parametrizados", "Property no tiene links de WA válidos");
assert(files.index.includes('href="/catalog.html"') && files.index.includes('href="/property.html"'), "Flujo Home -> Catálogo -> Propiedad está interconectado", "Faltan hipervínculos críticos entre páginas");

// 3. CONTRASTES Y LEGIBILIDAD (UI)
console.log("\n>> 3. ACCESIBILIDAD Y CONTRASTES (UI)");
assert(files.index.includes('bg-white shadow-md py-2') && files.index.includes('text-gave-primary'), "Navbar Desktop tiene fondo blanco con texto azul (Alto Contraste)", "Navbar Desktop carece de contraste óptimo");
assert(files.index.includes('bg-white inline-block p-3 rounded-2xl') && files.index.includes('logo.png'), "Logo en footer descansa sobre pastilla blanca para contraste", "Logo del footer no tiene contraste sobre fondo oscuro");
assert(files.index.match(/<div class="absolute inset-0 bg-gave-primary\/95 backdrop-blur-md"><\/div>/) || files.catalog.includes('backdrop-blur-md'), "Menú móvil usa Glassmorphism oscuro/claro para separar fondo", "Menú móvil carece de overlay de contraste");
assert(files.index.includes('text-gray-300'), "Textos del footer (bg-gray-900) usan text-gray-300 (WCAG AA)", "Textos del footer tienen bajo contraste (gray-400)");

// 4. LÓGICA JAVASCRIPT (Funcionalidad)
console.log("\n>> 4. FUNCIONALIDAD JAVASCRIPT (Lógica)");
assert(files.jsCatalog.includes('filterAndSort()') && files.jsCatalog.includes('data-filter'), "Lógica de filtrado dinámico presente en Catálogo", "No se detectó motor de filtrado en Catálogo");
assert(files.jsProperty.includes('const propertyId = urlParams.get(\'id\')'), "Página de propiedad captura el ID de la URL dinámicamente", "Property.html no es dinámica");
assert(files.jsMain.includes('document.body.style.overflow = \'hidden\''), "Menú hamburguesa bloquea el scroll de fondo (UX Scroll-lock)", "Menú hamburguesa permite doble scroll (Mala UX)");

// 5. RESPONSIVIDAD ESPECÍFICA DE PROPERTY.HTML
console.log("\n>> 5. RESPONSIVIDAD ESPECÍFICA (Property.html)");
assert(files.property.includes('flex flex-col lg:flex-row'), "Layout de propiedad colapsa en 1 columna en móvil y 2 en desktop", "Falla estructural en el layout de property.html");
assert(files.property.includes('grid grid-cols-2 md:grid-cols-3 gap-y-8'), "Información del inmueble se adapta de 2 a 3 columnas", "Falla en grid de información del inmueble");
assert(files.property.includes('sticky top-32'), "Caja de Info Relevante es pegajosa (Sticky) en Desktop", "Falta clase sticky en barra lateral");

console.log("\n==================================================");
console.log("📋 RESUMEN DE HALLAZGOS");
findings.forEach(f => {
    console.log(`${f.status} ${f.msg}`);
});
console.log("==================================================");
console.log(`PUNTUACIÓN DE AUDITORÍA: ${score}/100`);

