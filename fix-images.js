const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Fix flaticon couples
  content = content.replace(
    /<img src="https:\/\/cdn-icons-png\.flaticon\.com\/512\/3257\/3257790\.png" width="56" alt="Couples">/g,
    '<div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; background:#fff3e0; border-radius:50%; flex-shrink:0;"><i class="fa fa-user-friends" style="font-size: 24px; color: var(--gold);"></i></div>'
  );
  
  // Fix flaticon family (various ids might have matched due to bad regex before)
  content = content.replace(
    /<img src="https:\/\/cdn-icons-png\.flaticon\.com\/.*?\.png" width="56" alt="Family">/g,
    '<div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; background:#fff3e0; border-radius:50%; flex-shrink:0;"><i class="fa fa-users" style="font-size: 24px; color: var(--gold);"></i></div>'
  );

  // Provide fallback profile for those that were skipped
  if (content.includes('Map_of_southern_India.svg.png') && !file.includes('south-india')) {
    // If it's another region but still has South India map, replace it with a generic globe or relevant map
    content = content.replace(
      /https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/e\/e0\/Map_of_southern_India.svg\/2000px-Map_of_southern_India.svg.png/g,
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400' // Generic map/travel image
    );
  }

  // Also replace any other broken wikimedia links with a standard beautiful travel image mapped to circle
  content = content.replace(
    /https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/c\/cd\/North_India_map.png\/1024px-North_India_map.png/g,
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400'
  );
  
  // Generic profile injection for anything that missed the previous update (like "family-tours.html", "romantic-tours.html", "urban-apartments.html")
  if (file === 'family-tours.html' || file === 'romantic-tours.html' || file === 'urban-apartments.html' || file === 'east-india-tour.html' || file === 'west-india-tour.html' || file === 'north-east-india-tour.html') {
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1602216056096-3b40cc0f9942\?w=1200/g, 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200'); // General beautiful travel
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1593693397690-362cb9666fca\?w=600/g, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600'); 
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1524492412937-b28074a5d7da\?w=600/g, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600'); 
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log('Fixed broken images in', file);
  }
});
