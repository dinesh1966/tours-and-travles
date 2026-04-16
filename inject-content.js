const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

function getProfile(filename) {
  if(filename.includes('europe')) return {
     imgMain: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200', // Paris
     imgPkg1: 'https://images.unsplash.com/photo-1522878519385-8f0d82fb0e6e?w=600',
     imgPkg2: 'https://images.unsplash.com/photo-1514301022161-7a46d19cd819?w=600',
     brand1: 'France', bS1: 'City of Love',
     brand2: 'Italy', bS2: 'Historic Charm',
     brand3: 'Swiss', bS3: 'Alps & Lakes',
     brand4: 'London', bS4: 'Royal Legacy',
     desc: 'Europe is a continent steeped in history, offering a diverse array of cultures, art, and architecture. From the romantic streets of Paris to the ancient ruins of Rome, Europe provides an unforgettable journey through time.'
  };
  if(filename.includes('asia')) return {
     imgMain: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200', // Asia
     imgPkg1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
     imgPkg2: 'https://images.unsplash.com/photo-1516105348601-1b3d51d0af9f?w=600',
     brand1: 'Japan', bS1: 'Land of Rising Sun',
     brand2: 'Bali', bS2: 'Island of Gods',
     brand3: 'Thailand', bS3: 'Tropical Vibes',
     brand4: 'Dubai', bS4: 'Modern Marvels',
     desc: 'Asia offers deeply spiritual traditions mixed with futuristic skylines. Indulge in diverse cuisine, pristine beaches, and breathtaking natural wonders.'
  };
  if(filename.includes('boat') || filename.includes('cruise')) return {
     imgMain: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=1200', // Houseboat
     imgPkg1: 'https://images.unsplash.com/photo-1504681869696-d977e2a1b289?w=600',
     imgPkg2: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600',
     brand1: 'Alleppey', bS1: 'Venice of the East',
     brand2: 'Kumarakom', bS2: 'Bird Sanctuary',
     brand3: 'Dal Lake', bS3: 'Kashmir Beauty',
     brand4: 'Goa', bS4: 'Coastal Cruises',
     desc: 'Experience life on the water. Houseboats and cruises offer a unique perspective, providing peaceful stays amidst gently swaying waters and local coastal ecosystems.'
  };
  if(filename.includes('villa') || filename.includes('cabin') || filename.includes('home') || filename.includes('retreat')) return {
     imgMain: 'https://images.unsplash.com/photo-1512917774080-9991f7ecd89f?w=1200', // Property
     imgPkg1: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600',
     imgPkg2: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
     brand1: 'Beachfront', bS1: 'Ocean Views',
     brand2: 'Mountains', bS2: 'Cozy Cabins',
     brand3: 'Heritage', bS3: 'Historic Stays',
     brand4: 'Luxury', bS4: 'Premium Pools',
     desc: 'Unlock your private getaway. Our handpicked vacation properties offer privacy, premium amenities, and stunning views, perfectly tailored for families and secluded retreats.'
  };
  if(filename.includes('beach') || filename.includes('luxury') || filename.includes('spiritual') || filename.includes('adventure')) return {
     imgMain: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200', // Beach
     imgPkg1: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600',
     imgPkg2: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600',
     brand1: 'Tropical', bS1: 'Golden Sands',
     brand2: 'Resorts', bS2: '5-Star Comfort',
     brand3: 'Adventures', bS3: 'Thrilling Sports',
     brand4: 'Wellness', bS4: 'Spa & Retreats',
     desc: 'Dive into exclusive experiences. From golden sunsets on sandy beaches to high-adrenaline mountain sports, our specialized tours cater perfectly to your ultimate desires.'
  };
  return null;
}

files.forEach(file => {
  if(file.includes('india-tour') || file === 'index.html') return;
  
  let content = fs.readFileSync(file, 'utf8');
  let profile = getProfile(file);
  
  if(profile) {
    // Replace main image
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1602216056096-3b40cc0f9942\?w=1200/g, profile.imgMain);
    // Replace package images
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1593693397690-362cb9666fca\?w=600/g, profile.imgPkg1);
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1524492412937-b28074a5d7da\?w=600/g, profile.imgPkg2);
    
    // Replace Brand Grid
    content = content.replace(/Kerala<\/div>/g, profile.brand1 + '</div>');
    content = content.replace(/God's Own Country<\/div>/g, profile.bS1 + '</div>');
    content = content.replace(/Tamil Nadu<\/div>/g, profile.brand2 + '</div>');
    content = content.replace(/Land of Temples<\/div>/g, profile.bS2 + '</div>');
    content = content.replace(/Coorg<\/div>/g, profile.brand3 + '</div>');
    content = content.replace(/Scotland of India<\/div>/g, profile.bS3 + '</div>');
    content = content.replace(/Kanyakumari<\/div>/g, profile.brand4 + '</div>');
    content = content.replace(/Cape of India<\/div>/g, profile.bS4 + '</div>');
    
    // Replace descriptive texts
    content = content.replace(/South India, or Southern India.*?architectural heritage\./, profile.desc);
    
    fs.writeFileSync(file, content);
    console.log('Updated content mapping for:', file);
  }
});
