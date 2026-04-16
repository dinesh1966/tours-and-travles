const fs = require('fs');

const places = [
  { id: 'pkg1', name: 'Munnar Tea Gardens', state: 'Kerala', img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fca?w=600', price: '₹ 12,500', days: 3 },
  { id: 'pkg2', name: 'Alleppey Backwaters', state: 'Kerala', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600', price: '₹ 14,200', days: 4 },
  { id: 'pkg3', name: 'Ooty Hill Station', state: 'Tamil Nadu', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600', price: '₹ 15,000', days: 4 },
  { id: 'pkg4', name: 'Coorg Coffee Estates', state: 'Karnataka', img: 'https://images.unsplash.com/photo-1516105348601-1b3d51d0af9f?w=600', price: '₹ 16,500', days: 5 },
  { id: 'pkg5', name: 'Mysore Palace Heritage', state: 'Karnataka', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/India-taj-mahal.jpg/1280px-India-taj-mahal.jpg', price: '₹ 11,000', days: 3 },
  { id: 'pkg6', name: 'Kodaikanal Lakeside', state: 'Tamil Nadu', img: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=600', price: '₹ 13,500', days: 4 },
  { id: 'pkg7', name: 'Wayanad Nature Trails', state: 'Kerala', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', price: '₹ 14,800', days: 4 },
  { id: 'pkg8', name: 'Pondicherry French Colony', state: 'Puducherry', img: 'https://images.unsplash.com/photo-1456516643941-e90de1f80a72?w=600', price: '₹ 10,500', days: 3 },
  { id: 'pkg9', name: 'Hampi Ancient Ruins', state: 'Karnataka', img: 'https://images.unsplash.com/photo-1437395390328-c0fc13a91652?w=600', price: '₹ 18,000', days: 5 },
  { id: 'pkg10', name: 'Madurai Temple Tour', state: 'Tamil Nadu', img: 'https://images.unsplash.com/photo-1488299435215-e1b8f3e40c85?w=600', price: '₹ 9,500', days: 2 },
  { id: 'pkg11', name: 'Kanyakumari Sunset', state: 'Tamil Nadu', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600', price: '₹ 11,500', days: 3 },
  { id: 'pkg12', name: 'Gokarna Beaches', state: 'Karnataka', img: 'https://images.unsplash.com/photo-1491889556014-85f30f4b1c4b?w=600', price: '₹ 12,000', days: 4 },
  { id: 'pkg13', name: 'Kochi Heritage Walk', state: 'Kerala', img: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=600', price: '₹ 10,000', days: 3 },
  { id: 'pkg14', name: 'Tirupati Pilgrimage', state: 'Andhra Pradesh', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600', price: '₹ 8,500', days: 2 },
  { id: 'pkg15', name: 'Rameshwaram Coastal Tour', state: 'Tamil Nadu', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', price: '₹ 13,000', days: 3 },
  { id: 'pkg16', name: 'Chikmagalur Coffee Plantations', state: 'Karnataka', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600', price: '₹ 14,000', days: 4 },
  { id: 'pkg17', name: 'Varkala Cliffs', state: 'Kerala', img: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=600', price: '₹ 15,500', days: 4 },
  { id: 'pkg18', name: 'Kumarakom Bird Sanctuary', state: 'Kerala', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', price: '₹ 12,200', days: 3 },
  { id: 'pkg19', name: 'Bandipur Wildlife Safari', state: 'Karnataka', img: 'https://images.unsplash.com/photo-1566643537521-14f1dc19b9db?w=600', price: '₹ 17,500', days: 3 },
  { id: 'pkg20', name: 'Mahabalipuram Shore Temples', state: 'Tamil Nadu', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600', price: '₹ 11,800', days: 3 },
  { id: 'pkg21', name: 'Yercaud Hills', state: 'Tamil Nadu', img: 'https://images.unsplash.com/photo-1522878519385-8f0d82fb0e6e?w=600', price: '₹ 10,200', days: 3 },
  { id: 'pkg22', name: 'Thekkady Spice Plantations', state: 'Kerala', img: 'https://images.unsplash.com/photo-1514301022161-7a46d19cd819?w=600', price: '₹ 13,800', days: 4 }
];

let html = fs.readFileSync('south-india-tour.html', 'utf8');

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

/* Replace itineraries object */
html = html.replace(/const itineraries = \{[\s\S]*?\n    \};/, itinerariesObj);

fs.writeFileSync('south-india-tour.html', html);
console.log('south-india-tour.html updated successfully with 22 packages.');
