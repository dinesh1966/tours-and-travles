const fs = require('fs');

const regions = {
  'north-india-tour.html': {
    count: 14,
    places: [
      { id: 'pkg1', name: 'Taj Mahal Tour', state: 'Uttar Pradesh', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/India-taj-mahal.jpg/1280px-India-taj-mahal.jpg', price: '₹ 8,500', days: 2 },
      { id: 'pkg2', name: 'Kashmir Valley Paradise', state: 'Jammu & Kashmir', img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600', price: '₹ 22,500', days: 6 },
      { id: 'pkg3', name: 'Leh Ladakh Expedition', state: 'Ladakh', img: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=600', price: '₹ 25,000', days: 7 },
      { id: 'pkg4', name: 'Shimla & Manali', state: 'Himachal Pradesh', img: 'https://images.unsplash.com/photo-1605649487212-4d43be263b65?w=600', price: '₹ 16,500', days: 5 },
      { id: 'pkg5', name: 'Varanasi Ghats', state: 'Uttar Pradesh', img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600', price: '₹ 11,000', days: 3 },
      { id: 'pkg6', name: 'Rishikesh Rafting', state: 'Uttarakhand', img: 'https://images.unsplash.com/photo-1601267860298-2bf5d96207c4?w=600', price: '₹ 12,500', days: 4 },
      { id: 'pkg7', name: 'Golden Temple', state: 'Punjab', img: 'https://images.unsplash.com/photo-1587635835698-dc532e185f26?w=600', price: '₹ 9,000', days: 2 },
      { id: 'pkg8', name: 'Jaipur Royal City', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600', price: '₹ 14,000', days: 4 },
      { id: 'pkg9', name: 'Udaipur Lakes', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=600', price: '₹ 15,500', days: 4 },
      { id: 'pkg10', name: 'Jaisalmer Desert Safari', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1599814470940-92892994e43b?w=600', price: '₹ 17,200', days: 5 },
      { id: 'pkg11', name: 'Jim Corbett Safari', state: 'Uttarakhand', img: 'https://images.unsplash.com/photo-1584824388147-3dc6fc48bc95?w=600', price: '₹ 13,800', days: 3 },
      { id: 'pkg12', name: 'Haridwar Pilgrimage', state: 'Uttarakhand', img: 'https://images.unsplash.com/photo-1591557022067-c22ba14197ba?w=600', price: '₹ 9,800', days: 3 },
      { id: 'pkg13', name: 'Spiti Valley', state: 'Himachal Pradesh', img: 'https://images.unsplash.com/photo-1626782522774-709deaaaecc2?w=600', price: '₹ 21,000', days: 6 },
      { id: 'pkg14', name: 'Dalhousie Retreat', state: 'Himachal Pradesh', img: 'https://images.unsplash.com/photo-1582236371727-86cbf22fd6fe?w=600', price: '₹ 14,500', days: 4 }
    ]
  },
  'east-india-tour.html': {
    count: 12,
    places: [
      { id: 'pkg1', name: 'Darjeeling Tea Gardens', state: 'West Bengal', img: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600', price: '₹ 14,500', days: 4 },
      { id: 'pkg2', name: 'Kolkata Heritage', state: 'West Bengal', img: 'https://images.unsplash.com/photo-1558481356-f283d5bc0321?w=600', price: '₹ 9,000', days: 3 },
      { id: 'pkg3', name: 'Sundarbans Safari', state: 'West Bengal', img: 'https://images.unsplash.com/photo-1627814421256-4c4c23db2e65?w=600', price: '₹ 12,200', days: 3 },
      { id: 'pkg4', name: 'Puri Jagannath Temple', state: 'Odisha', img: 'https://images.unsplash.com/photo-1563223075-81ffc1cace89?w=600', price: '₹ 10,800', days: 3 },
      { id: 'pkg5', name: 'Konark Sun Temple', state: 'Odisha', img: 'https://images.unsplash.com/photo-1622384918712-ab79cb73b1ff?w=600', price: '₹ 8,500', days: 2 },
      { id: 'pkg6', name: 'Chilika Lake', state: 'Odisha', img: 'https://images.unsplash.com/photo-1600100397608-f010f41bcbf4?w=600', price: '₹ 11,000', days: 3 },
      { id: 'pkg7', name: 'Bodh Gaya Ruins', state: 'Bihar', img: 'https://images.unsplash.com/photo-1614088926978-22fca4662d04?w=600', price: '₹ 13,000', days: 4 },
      { id: 'pkg8', name: 'Nalanda University', state: 'Bihar', img: 'https://images.unsplash.com/photo-1594892429661-82d2c1aa5df4?w=600', price: '₹ 9,500', days: 3 },
      { id: 'pkg9', name: 'Digha Beach', state: 'West Bengal', img: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600', price: '₹ 7,500', days: 2 },
      { id: 'pkg10', name: 'Rajgir Hills', state: 'Bihar', img: 'https://images.unsplash.com/photo-1608670737152-3fb3a4d8ccfb?w=600', price: '₹ 10,200', days: 3 },
      { id: 'pkg11', name: 'Bhubaneswar Temples', state: 'Odisha', img: 'https://images.unsplash.com/photo-1598284534433-e0d0ceebd467?w=600', price: '₹ 9,800', days: 3 },
      { id: 'pkg12', name: 'Kalimpong Hills', state: 'West Bengal', img: 'https://images.unsplash.com/photo-1610444383434-d021c1f4e1f7?w=600', price: '₹ 13,500', days: 4 }
    ]
  },
  'north-east-india-tour.html': {
    count: 12,
    places: [
      { id: 'pkg1', name: 'Kaziranga Rhino Safari', state: 'Assam', img: 'https://images.unsplash.com/photo-1596752003756-3240e4f55928?w=600', price: '₹ 16,500', days: 4 },
      { id: 'pkg2', name: 'Tawang Monastery', state: 'Arunachal Pradesh', img: 'https://images.unsplash.com/photo-1611756543419-db372d8cf4b1?w=600', price: '₹ 18,200', days: 5 },
      { id: 'pkg3', name: 'Cherrapunji Waterfalls', state: 'Meghalaya', img: 'https://images.unsplash.com/photo-1576008678082-f3e1a0bba8cf?w=600', price: '₹ 15,000', days: 4 },
      { id: 'pkg4', name: 'Shillong Peak', state: 'Meghalaya', img: 'https://images.unsplash.com/photo-1610996841804-b6af192ae17d?w=600', price: '₹ 13,800', days: 3 },
      { id: 'pkg5', name: 'Gangtok City', state: 'Sikkim', img: 'https://images.unsplash.com/photo-1590487053535-be96dbd7f999?w=600', price: '₹ 14,500', days: 4 },
      { id: 'pkg6', name: 'Majuli River Island', state: 'Assam', img: 'https://images.unsplash.com/photo-1627814421256-4c4c23db2e65?w=600', price: '₹ 11,500', days: 3 },
      { id: 'pkg7', name: 'Ziro Valley', state: 'Arunachal Pradesh', img: 'https://images.unsplash.com/photo-1582236371727-86cbf22fd6fe?w=600', price: '₹ 19,000', days: 5 },
      { id: 'pkg8', name: 'Pelling Views', state: 'Sikkim', img: 'https://images.unsplash.com/photo-1605649487212-4d43be263b65?w=600', price: '₹ 15,200', days: 4 },
      { id: 'pkg9', name: 'Loktak Lake', state: 'Manipur', img: 'https://images.unsplash.com/photo-1600100397608-f010f41bcbf4?w=600', price: '₹ 14,000', days: 4 },
      { id: 'pkg10', name: 'Tsomgo Lake', state: 'Sikkim', img: 'https://images.unsplash.com/photo-1610444383434-d021c1f4e1f7?w=600', price: '₹ 12,800', days: 3 },
      { id: 'pkg11', name: 'Kohima Heritage', state: 'Nagaland', img: 'https://images.unsplash.com/photo-1594892429661-82d2c1aa5df4?w=600', price: '₹ 16,800', days: 4 },
      { id: 'pkg12', name: 'Agartala Palaces', state: 'Tripura', img: 'https://images.unsplash.com/photo-1622384918712-ab79cb73b1ff?w=600', price: '₹ 13,500', days: 4 }
    ]
  },
  'europe-tour.html': {
    count: 14,
    places: [
      { id: 'pkg1', name: 'Paris Eiffel Tower', state: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', price: '₹ 85,000', days: 5 },
      { id: 'pkg2', name: 'Rome Colosseum', state: 'Italy', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600', price: '₹ 78,000', days: 4 },
      { id: 'pkg3', name: 'Swiss Alps Escape', state: 'Switzerland', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600', price: '₹ 110,000', days: 6 },
      { id: 'pkg4', name: 'Venice Canals', state: 'Italy', img: 'https://images.unsplash.com/photo-1514890547356-5ea0fbdad6b7?w=600', price: '₹ 82,000', days: 4 },
      { id: 'pkg5', name: 'London Eye', state: 'UK', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600', price: '₹ 95,000', days: 5 },
      { id: 'pkg6', name: 'Amsterdam Canals', state: 'Netherlands', img: 'https://images.unsplash.com/photo-1517736996303-4e64a4f87309?w=600', price: '₹ 75,000', days: 4 },
      { id: 'pkg7', name: 'Santorini Sunset', state: 'Greece', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600', price: '₹ 88,000', days: 5 },
      { id: 'pkg8', name: 'Barcelona Gaudi Tour', state: 'Spain', img: 'https://images.unsplash.com/photo-1583422409516-724dc52d8b13?w=600', price: '₹ 80,000', days: 4 },
      { id: 'pkg9', name: 'Munich Castles', state: 'Germany', img: 'https://images.unsplash.com/photo-1542327534-712852655519?w=600', price: '₹ 84,000', days: 4 },
      { id: 'pkg10', name: 'Vienna Music Tour', state: 'Austria', img: 'https://images.unsplash.com/photo-1516550893923-4222ce04ce0b?w=600', price: '₹ 79,000', days: 4 },
      { id: 'pkg11', name: 'Prague Old Town', state: 'Czech Republic', img: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=600', price: '₹ 72,000', days: 4 },
      { id: 'pkg12', name: 'Florence Art Tour', state: 'Italy', img: 'https://images.unsplash.com/photo-1516483638261-f40af5ffce70?w=600', price: '₹ 77,000', days: 4 },
      { id: 'pkg13', name: 'Reykjavik Northern Lights', state: 'Iceland', img: 'https://images.unsplash.com/photo-1520631671917-0b190f8983fb?w=600', price: '₹ 120,000', days: 5 },
      { id: 'pkg14', name: 'Budapest Baths', state: 'Hungary', img: 'https://images.unsplash.com/photo-1549448839-44be2bd0560a?w=600', price: '₹ 68,000', days: 4 }
    ]
  }
};

for (const [filename, data] of Object.entries(regions)) {
  if (!fs.existsSync(filename)) {
    console.log(`File not found: ${filename}`);
    continue;
  }

  let html = fs.readFileSync(filename, 'utf8');

  let packagesHtml = '';
  let itinerariesObj = 'const itineraries = {\n';

  data.places.forEach(p => {
    const nights = p.days - 1;
    packagesHtml += `
          <!-- Package ${p.id} -->
          <div class="itinerary-card" onclick="openItinerary('${p.id}')"
            style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); cursor: pointer; transition: transform 0.3s ease; border: 1px solid #f0f0f0;">
            <div style="position: relative; height: 220px;">
              <img src="${p.img}" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s ease;" class="pkg-img">
              <div style="position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); color: white; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;">
                <i class="fa fa-clock" style="color: var(--gold); margin-right: 4px;"></i> ${p.days} Days / ${nights} Nights
              </div>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 10px; color: var(--dark);">${p.name}</h3>
              <p style="font-size: 14px; color: var(--text-light); margin-bottom: 20px;"><i class="fa fa-map-marker-alt" style="color: var(--gold); margin-right: 6px;"></i> ${p.state}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 16px;">
                <span style="font-weight: 700; color: var(--dark); font-size: 18px;">${p.price} <span style="font-size: 13px; font-weight: 400; color: #888;">/ pax</span></span>
                <span style="color: var(--gold); font-size: 14px; font-weight: 600;">View Details <i class="fa fa-arrow-right" style="margin-left: 4px;"></i></span>
              </div>
            </div>
          </div>
`;

    let daysDesc = [];
    for(let i=1; i<=p.days; i++) {
      if(i === 1) daysDesc.push(`{ day: 'Day 01', title: 'Arrival & Welcome', desc: 'Arrive at the destination. You will be greeted by our representative and transferred to your premium accommodation in ${p.state}.' }`);
      else if(i === p.days) daysDesc.push(`{ day: 'Day 0${i}', title: 'Departure', desc: 'Enjoy your final breakfast at the accommodation. Check out and transfer for your onward journey.' }`);
      else {
        daysDesc.push(`{ day: 'Day 0${i}', title: 'Explore ${p.name}', desc: 'Full day sightseeing and activities around ${p.name}. Evening at leisure.' }`);
      }
    }

    itinerariesObj += `
      '${p.id}': {
        title: '${p.name}',
        duration: '${p.days} Days / ${nights} Nights',
        price: '${p.price} <span style="font-size:14px; font-weight:normal; color:#888">/ pax</span>',
        days: [
          ${daysDesc.join(',\n          ')}
        ]
      },`;
  });

  itinerariesObj += '\n    };';

  const gridStartPattern = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px;">';
  const gridStartIdx = html.indexOf(gridStartPattern);
  const gridEndMatch = html.match(/<\/div>\s*<\/div>\s*<!-- Info section -->/);
  if (gridStartIdx !== -1 && gridEndMatch) {
      html = html.substring(0, gridStartIdx + gridStartPattern.length) + '\n' + packagesHtml + '\n        ' + html.substring(gridEndMatch.index);
  }

  // Replace itineraries
  html = html.replace(/const itineraries = \{[\s\S]*?\n    \};/, itinerariesObj);
  
  // Update tour count gracefully regardless of what number is there
  html = html.replace(/<span\s+style="display:\s*block[^>]*>(\d+)<\/span>\s*<span\s+style="display:\s*block[^>]*>Tour<br>Packages<\/span>/g, `<span style="display: block; font-size: 52px; color: var(--gold); font-weight: 700; line-height: 1; letter-spacing: -1px;">${data.count}</span>
            <span style="display: block; font-size: 16px; color: var(--text-light); line-height: 1.2; margin-top: 8px;">Tour<br>Packages</span>`);

  fs.writeFileSync(filename, html);
  console.log(`${filename} updated successfully with ${data.count} packages.`);
}
