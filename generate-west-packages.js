const fs = require('fs');

const places = [
  { id: 'pkg1', name: 'Goa Beach Holiday', state: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600', price: '₹ 15,500', days: 5 },
  { id: 'pkg2', name: 'Mahabaleshwar Hills', state: 'Maharashtra', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600', price: '₹ 12,200', days: 3 },
  { id: 'pkg3', name: 'Gir National Park', state: 'Gujarat', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600', price: '₹ 16,000', days: 4 },
  { id: 'pkg4', name: 'Rann of Kutch', state: 'Gujarat', img: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600', price: '₹ 14,500', days: 4 },
  { id: 'pkg5', name: 'Lonavala & Khandala', state: 'Maharashtra', img: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600', price: '₹ 11,000', days: 3 },
  { id: 'pkg6', name: 'Somnath Temple Tour', state: 'Gujarat', img: 'https://images.unsplash.com/photo-1600100397608-f010f41bcbf4?w=600', price: '₹ 9,500', days: 2 },
  { id: 'pkg7', name: 'Pune City Heritage', state: 'Maharashtra', img: 'https://images.unsplash.com/photo-1563451556943-34e85748cd84?w=600', price: '₹ 10,800', days: 3 },
  { id: 'pkg8', name: 'Diu Island Escape', state: 'Daman & Diu', img: 'https://images.unsplash.com/photo-1590766940554-638c9cee7fa3?w=600', price: '₹ 13,000', days: 4 },
  { id: 'pkg9', name: 'Dwarka Pilgrimage', state: 'Gujarat', img: 'https://images.unsplash.com/photo-1605333334641-7a701d0fe1bd?w=600', price: '₹ 11,500', days: 3 },
  { id: 'pkg10', name: 'Elephanta Caves', state: 'Maharashtra', img: 'https://images.unsplash.com/photo-1514222216668-db8cbdeadd72?w=600', price: '₹ 8,000', days: 2 },
  { id: 'pkg11', name: 'Ajanta & Ellora Caves', state: 'Maharashtra', img: 'https://images.unsplash.com/photo-1596704017254-8c8a7fe2b679?w=600', price: '₹ 14,800', days: 4 },
  { id: 'pkg12', name: 'Statue of Unity', state: 'Gujarat', img: 'https://images.unsplash.com/photo-1580130006760-449e6231c360?w=600', price: '₹ 12,000', days: 3 }
];

let html = fs.readFileSync('west-india-tour.html', 'utf8');

let packagesHtml = '';
let itinerariesObj = 'const itineraries = {\n';

places.forEach(p => {
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
    if(i === 1) daysDesc.push(`{ day: 'Day 01', title: 'Arrival & Welcome', desc: 'Arrive at the destination. You will be greeted by our representative and transferred to your premium hotel in ${p.state}.' }`);
    else if(i === p.days) daysDesc.push(`{ day: 'Day 0${i}', title: 'Departure', desc: 'Enjoy your final breakfast at the hotel. Check out and transfer for your onward journey.' }`);
    else {
      daysDesc.push(`{ day: 'Day 0${i}', title: 'Explore ${p.name}', desc: 'Full day local sightseeing and activities around ${p.name}. Evening at leisure.' }`);
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

html = html.replace(/const itineraries = \{[\s\S]*?\n    \};/, itinerariesObj);
html = html.replace(/<span[\s\S]*?>24<\/span>/, '<span style="display: block; font-size: 52px; color: var(--gold); font-weight: 700; line-height: 1; letter-spacing: -1px;">12</span>');

fs.writeFileSync('west-india-tour.html', html);
console.log('west-india-tour.html updated successfully with 12 packages.');
