const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Find Gallery boundaries
const galleryStart = html.indexOf('<!-- ===== GALLERY ===== -->');
const galleryTagStart = html.indexOf('<section class="gallery-section');
const galleryActualStart = galleryStart !== -1 && galleryStart < galleryTagStart ? galleryStart : galleryTagStart;

// Find common end for a section - usually the next comment or section
const nextSectionStart = html.indexOf('<!-- ===== FAQ ===== -->', galleryActualStart + 50);
const footerStart = html.indexOf('<!-- ===== FOOTER ===== -->', galleryActualStart + 50);
const galleryEnd = nextSectionStart !== -1 ? nextSectionStart : footerStart;

if (galleryActualStart !== -1 && galleryEnd !== -1) {
    const galleryHtml = html.substring(galleryActualStart, galleryEnd);
    
    // Remove gallery from original position
    html = html.substring(0, galleryActualStart).trimEnd() + '\n\n' + html.substring(galleryEnd).trimStart();
    
    // Find Trending Tours end
    const trendingEnd = html.indexOf('<!-- ===== TESTIMONIALS ===== -->');
    
    if (trendingEnd !== -1) {
        html = html.substring(0, trendingEnd).trimEnd() + '\n\n' + galleryHtml.trim() + '\n\n' + html.substring(trendingEnd).trimStart();
        fs.writeFileSync('index.html', html, 'utf8');
        console.log('Gallery moved to right after Trending Tours!');
    } else {
        console.log('Could not find Trending Tours / Testimonials boundary');
    }
} else {
    console.log('Could not find Gallery section');
}
