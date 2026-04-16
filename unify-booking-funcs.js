const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (path.extname(file) === '.html') {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let changed = false;

    // 1. Redirect local openBookingModal to global
    // Look for: function openBookingModal() { ... }
    const localFuncs = [
        /function\s+openBookingModal\s*\(\)\s*\{[\s\S]*?\}/g,
        /function\s+openBookingForm\s*\(\)\s*\{[\s\S]*?\}/g,
        /function\s+openProgram\s*\(id\)\s*\{[\s\S]*?\}\s*else\s*alert\("Loading..."\);\s*\}/g // Simplified check for some versions
    ];

    // Actually, it's safer to just replace the CONTENT of these functions to call the global one
    // or just let the global alias handle it.
    
    // The main issue is that some pages have a function that DOES NOT check window.openModal
    // but instead show their own local modal.
    
    // Example in south-india-tour: openBookingForm() shows bookingFormModal.
    // I want it to call window.openBookingModal() instead.
    
    if (content.includes('function openBookingModal')) {
        content = content.replace(/function openBookingModal\(\) \{[\s\S]*?\}/, 'function openBookingModal() { if(typeof window.openModal === "function") window.openModal(); else console.warn("Global booking system not ready"); }');
        changed = true;
    }

    if (content.includes('function openBookingForm')) {
        content = content.replace(/function openBookingForm\(\) \{[\s\S]*?\}/, 'function openBookingForm() { if(typeof window.openBookingModal === "function") window.openBookingModal(); else console.warn("Global booking system not ready"); }');
        changed = true;
    }

    // Also look for buttons with onclick="openBookingForm()" and change to openBookingModal() just to be explicit
    if (content.includes('onclick="openBookingForm()"')) {
        content = content.replace(/onclick="openBookingForm\(\)"/g, 'onclick="openBookingModal()"');
        changed = true;
    }

    if (changed) {
      console.log(`Updated local functions in ${file}`);
      fs.writeFileSync(filePath, content);
    }
  }
});
