const fs = require('fs');

const files = ['index.html', 'catalog.html', 'property.html'];

for (const file of files) {
    let path = '/workspace/gave_propiedades/' + file;
    let html = fs.readFileSync(path, 'utf8');
    
    // Fix 100vw causing horizontal scrollbar on windows/some devices
    html = html.replace(/max-w-\[100vw\]/g, 'w-full');
    
    // Check contrast of footer text (text-gray-400 to text-gray-300 for WCAG AA compliance on bg-gray-900)
    html = html.replace(/text-gray-400/g, 'text-gray-300');
    
    fs.writeFileSync(path, html);
    console.log("Fixed: " + file);
}
