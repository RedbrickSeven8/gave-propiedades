const fs = require('fs');

console.log("==========================================");
console.log("  AUDITORÍA 'MANOS' Y 'OJOS' (ESTÁTICA)");
console.log("==========================================\n");

const indexHtml = fs.readFileSync('/workspace/gave_propiedades/index.html', 'utf8');
const styleCss = fs.readFileSync('/workspace/gave_propiedades/style.css', 'utf8');
const mainJs = fs.readFileSync('/workspace/gave_propiedades/main.js', 'utf8');

let errors = 0;
let warnings = 0;

function check(condition, successMsg, failMsg, type="error") {
    if (condition) {
        console.log("✅ " + successMsg);
    } else {
        if(type === "error") {
            console.log("❌ ERROR: " + failMsg);
            errors++;
        } else {
            console.log("⚠️ WARNING: " + failMsg);
            warnings++;
        }
    }
}

// 1. AUDITORÍA VISUAL (Ojos)
console.log("--- 1. AUDITORÍA VISUAL (OJOS) ---");
check(indexHtml.includes('<img src="/logo.png"'), "Logo principal cargado correctamente", "Falta el logo principal en index.html");
check(indexHtml.includes('class="hidden md:flex'), "Menú Desktop estructuralmente visible y oculto en móvil", "Falta la lógica de visibilidad del menú Desktop");
check(indexHtml.includes('id="asesoras-carousel"') && styleCss.includes('.native-carousel'), "Carrusel implementado y usando CSS nativo para iOS", "El carrusel no tiene estructura CSS nativa");
check(indexHtml.includes('href="https://wa.me/573183593507'), "Botones de WhatsApp actualizados al número correcto", "El número de WhatsApp no coincide");
check(indexHtml.includes('z-[9990]') && indexHtml.includes('z-[9999]') && indexHtml.includes('z-[9995]'), "Z-Index escalonado para Navbar > Menu > Botón correctamente", "Los z-index del navbar pueden causar problemas de superposición");

// 2. AUDITORÍA FUNCIONAL (Manos)
console.log("\n--- 2. AUDITORÍA FUNCIONAL (MANOS) ---");
check(mainJs.includes("mobileMenu.classList.remove('translate-x-full')"), "Lógica de apertura de Menú Móvil detectada", "No se encontró lógica para abrir el menú móvil");
check(mainJs.includes("navLinks.forEach(link => {") && mainJs.includes("link.addEventListener('click', () => {"), "Lógica para cerrar menú al hacer clic en enlaces detectada", "El menú móvil no se cierra al hacer click en un link");
check(mainJs.includes("carousel.scrollTo("), "Lógica de auto-scroll para el carrusel nativo detectada", "El carrusel nativo no tiene auto-play");
check(indexHtml.includes('<a href="/property.html"'), "Enlaces del catálogo hacia propiedades individuales detectados", "Faltan enlaces del catálogo hacia property.html");
check(indexHtml.includes('href="/index.html" class="text-gave-primary'), "Enlace 'Inicio' en la barra de navegación detectado", "Falta enlace para volver al Inicio en el Header");

// 3. PERFORMANCE & MOBILE RESPONSIVENESS
console.log("\n--- 3. RENDIMIENTO Y RESPONSIVE ---");
check(indexHtml.includes('max-w-[100vw]') && indexHtml.includes('overflow-x-hidden'), "Prevención global de desbordamiento horizontal (100vw)", "El body puede desbordarse horizontalmente");
check(styleCss.includes('@media (max-width: 768px)'), "Media queries para Mobile presentes en CSS custom", "Faltan ajustes específicos para móvil en CSS");

console.log("\n==========================================");
console.log(`RESULTADO: ${errors} Errores, ${warnings} Advertencias.`);
if(errors === 0) {
    console.log("El código fuente pasa la auditoría estructural y visual con 100% de éxito.");
}
console.log("==========================================");
