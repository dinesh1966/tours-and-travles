const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Fix the broken outside click listener
    const brokenSnippet = /const\s+modal\s*=\s*document\.getElementById\(['"]itineraryModal['"]\);\s*if\s*\(e\.target\s*===\s*modal\)\s*closeItinerary\(\);\s*\}\);/g;
    
    // Check if it's missing the event listener wrapper
    if (content.match(brokenSnippet)) {
        // Only replace if it doesn't have the addEventListener right before it
        // We look for the patterns we found in malaysia, singapore, philippines
        const faultyPattern = /function\s+openBookingModal\(\)\s*\{[\s\S]*?\}\s*\s*const\s+modal\s*=\s*document\.getElementById\(['"]itineraryModal['"]\);\s*if\s*\(e\.target\s*===\s*modal\)\s*closeItinerary\(\);\s*\}\);/g;
        
        content = content.replace(faultyPattern, (match) => {
            const parts = match.split('const modal');
            return parts[0] + "\n        // Close modal on outside click\n        window.addEventListener('click', (e) => {\n            const modal" + parts[1];
        });
        changed = true;
    }

    // Also check for multiple script tags at the end
    // Some files might have duplicated openBookingModal because of previous automated runs
    
    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Fixed ${file}`);
    }
});
