const fs = require('fs');

let html = fs.readFileSync('/workspace/gave_propiedades/index.html', 'utf8');

// Replace the image in "Nosotros" with the carousel
const oldImg = '<img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Asesoras Inmobiliarias Profesionales" class="relative rounded-2xl shadow-2xl object-cover h-[500px] w-full">';
const carouselHTML = `<div class="relative rounded-2xl shadow-2xl overflow-hidden crossfade-carousel">
              <img src="/img-asesora-1.png" alt="Asesora 1" class="active">
              <img src="/img-asesora-2.png" alt="Asesora 2">
            </div>`;

html = html.replace(oldImg, carouselHTML);

// Replace "Ver todas las propiedades" links with catalog link
const oldLink1 = '<a href="https://wa.me/573000000000" target="_blank" class="hidden md:inline-flex items-center gap-2 text-gave-secondary font-medium hover:text-gave-primary transition-colors">\n            Ver todas las propiedades <i data-lucide="arrow-right" class="w-4 h-4"></i>\n          </a>';
const newLink1 = '<a href="/catalog.html" class="hidden md:inline-flex items-center gap-2 text-gave-secondary font-medium hover:text-gave-primary transition-colors">\n            Ver catálogo completo <i data-lucide="arrow-right" class="w-4 h-4"></i>\n          </a>';

const oldLink2 = '<a href="https://wa.me/573000000000" target="_blank" class="inline-flex items-center gap-2 text-gave-secondary font-medium px-6 py-3 border border-gave-secondary rounded-full">\n            Ver todas las propiedades <i data-lucide="arrow-right" class="w-4 h-4"></i>\n          </a>';
const newLink2 = '<a href="/catalog.html" class="inline-flex items-center gap-2 text-gave-secondary font-medium px-6 py-3 border border-gave-secondary rounded-full">\n            Ver catálogo completo <i data-lucide="arrow-right" class="w-4 h-4"></i>\n          </a>';

html = html.replace(oldLink1, newLink1);
html = html.replace(oldLink2, newLink2);

fs.writeFileSync('/workspace/gave_propiedades/index.html', html);
console.log("HTML updated");
