const fs = require('fs');
let html = fs.readFileSync('/workspace/gave_propiedades/index.html', 'utf8');

// 1. MANUALLY AUDIT 
console.log("== MANUALLY AUDITING INDEX.HTML ==");
const checks = [
    { name: "Navbar Z-index", regex: /id="navbar"[^>]*z-\[9990\]/ },
    { name: "Mobile Menu Button Z-index", regex: /id="mobile-menu-btn"[^>]*z-\[9999\]/ },
    { name: "Mobile Menu Panel Z-index", regex: /id="mobile-menu"[^>]*z-\[9995\]/ },
    { name: "Carousel exists", regex: /id="asesoras-carousel"/ },
    { name: "WA Phone Updated", regex: /573183593507/ },
];

for(const check of checks) {
    if(check.regex.test(html)) {
        console.log("PASS: " + check.name);
    } else {
        console.error("FAIL: " + check.name);
    }
}

