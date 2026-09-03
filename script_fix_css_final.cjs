const fs = require('fs');

let css = fs.readFileSync('/workspace/gave_propiedades/style.css', 'utf8');

// The audit found that the specific mobile query media was missing after the CSS resets.
const newCSS = `
/* NATIVE SCROLL SNAP CAROUSEL MOBILE TWEAKS */
@media (max-width: 768px) {
  #asesoras-carousel {
    height: 350px !important;
  }
}
`;

if (!css.includes('@media (max-width: 768px)')) {
    css += newCSS;
    fs.writeFileSync('/workspace/gave_propiedades/style.css', css);
    console.log("CSS mobile query restored.");
}
