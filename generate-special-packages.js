const fs = require('fs');

const regions = {
  'international-packages.html': {
    title: 'International Tour Packages',
    places: [
      { id: 'pkg1', name: 'Bali Beach Retreat', state: 'Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', price: '₹ 45,000', days: 6 },
      { id: 'pkg2', name: 'Maldives Overwater', state: 'Maldives', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600', price: '₹ 85,000', days: 5 },
      { id: 'pkg3', name: 'Dubai Desert Safari', state: 'UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600', price: '₹ 55,000', days: 5 },
      { id: 'pkg4', name: 'Singapore Excursion', state: 'Singapore', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600', price: '₹ 48,000', days: 4 },
      { id: 'pkg5', name: 'Tokyo Highlights', state: 'Japan', img: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600', price: '₹ 95,000', days: 7 },
      { id: 'pkg6', name: 'Swiss Alps Escape', state: 'Switzerland', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600', price: '₹ 110,000', days: 6 },
      { id: 'pkg7', name: 'Paris Romance', state: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', price: '₹ 85,000', days: 5 },
      { id: 'pkg8', name: 'Rome Historical Tour', state: 'Italy', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600', price: '₹ 75,000', days: 4 },
      { id: 'pkg9', name: 'New York Explorer', state: 'USA', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600', price: '₹ 140,000', days: 7 },
      { id: 'pkg10', name: 'Sydney Coasts', state: 'Australia', img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600', price: '₹ 120,000', days: 8 }
    ]
  },
  'popular-packages.html': {
    title: 'Most Popular Packages Globally',
    places: [
      { id: 'pkg1', name: 'Kerala Backwaters', state: 'India', img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fca?w=600', price: '₹ 15,500', days: 4 },
      { id: 'pkg2', name: 'Taj Mahal Tour', state: 'India', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/India-taj-mahal.jpg/1280px-India-taj-mahal.jpg', price: '₹ 8,500', days: 2 },
      { id: 'pkg3', name: 'Maldives Escape', state: 'Maldives', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600', price: '₹ 85,000', days: 5 },
      { id: 'pkg4', name: 'Bali Beaches', state: 'Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', price: '₹ 45,000', days: 6 },
      { id: 'pkg5', name: 'Paris Eiffel Heights', state: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', price: '₹ 85,000', days: 5 },
      { id: 'pkg6', name: 'Dubai Luxury', state: 'UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600', price: '₹ 55,000', days: 5 },
      { id: 'pkg7', name: 'Goa Nightlife', state: 'India', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600', price: '₹ 16,000', days: 4 },
      { id: 'pkg8', name: 'Venice Gondola Ride', state: 'Italy', img: 'https://images.unsplash.com/photo-1514890547356-5ea0fbdad6b7?w=600', price: '₹ 82,000', days: 4 }
    ]
  },
  'properties.html': {
    title: 'Top Vacation Properties & Villas',
    places: [
      { id: 'pkg1', name: 'Ocean View Villa', state: 'Maldives', img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600', price: '₹ 40,000 / night', days: 1 },
      { id: 'pkg2', name: 'Mountain Cabin', state: 'Swiss Alps', img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600', price: '₹ 35,000 / night', days: 1 },
      { id: 'pkg3', name: 'Heritage Mansion', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', price: '₹ 25,000 / night', days: 1 },
      { id: 'pkg4', name: 'Luxury Apartment', state: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600', price: '₹ 30,000 / night', days: 1 },
      { id: 'pkg5', name: 'Santorini Cliff House', state: 'Greece', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600', price: '₹ 55,000 / night', days: 1 },
      { id: 'pkg6', name: 'Bali Pool Villa', state: 'Indonesia', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600', price: '₹ 20,000 / night', days: 1 },
      { id: 'pkg7', name: 'French Chateau', state: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', price: '₹ 60,000 / night', days: 1 },
      { id: 'pkg8', name: 'Goan Beach Hut', state: 'India', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600', price: '₹ 10,000 / night', days: 1 }
    ]
  },
  'boat-houses.html': {
    title: 'Luxury Boat House Experiences',
    places: [
      { id: 'pkg1', name: 'Alleppey Premium Houseboat', state: 'Kerala', img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fca?w=600', price: '₹ 12,000', days: 2 },
      { id: 'pkg2', name: 'Kumarakom Luxury Cruise', state: 'Kerala', img: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=600', price: '₹ 15,000', days: 2 },
      { id: 'pkg3', name: 'Dal Lake Houseboat', state: 'Kashmir', img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600', price: '₹ 14,000', days: 3 },
      { id: 'pkg4', name: 'Srinagar Shikara Stay', state: 'Kashmir', img: 'https://images.unsplash.com/photo-1626782522774-709deaaaecc2?w=600', price: '₹ 10,500', days: 2 },
      { id: 'pkg5', name: 'Goa River Cruise Package', state: 'Goa', img: 'https://images.unsplash.com/photo-1504681869696-d977e2a1b289?w=600', price: '₹ 18,000', days: 3 },
      { id: 'pkg6', name: 'Sundarban Boat Safari', state: 'West Bengal', img: 'https://images.unsplash.com/photo-1627814421256-4c4c23db2e65?w=600', price: '₹ 16,500', days: 3 }
    ]
  }
};

const modalHTML = `
  <!-- Itinerary Modal -->
  <div class="itinerary-modal" id="itineraryModal"
    style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(5px); z-index: 10000; justify-content: center; align-items: center; padding: 20px; box-sizing: border-box;">
    <div class="modal-content"
      style="background: white; width: 100%; max-width: 750px; max-height: 85vh; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 20px 50px rgba(0,0,0,0.3); animation: fadeUp 0.4s ease;">
      <!-- Header -->
      <div
        style="padding: 24px 30px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; background: #fafafa;">
        <div>
          <h2 id="modalTitle"
            style="font-family: 'Playfair Display', serif; font-size: 28px; margin-bottom: 6px; color: var(--dark);">
            Tour Itinerary</h2>
          <span id="modalDuration" style="font-size: 14px; color: var(--text-light); font-weight: 500;"><i
              class="fa fa-clock" style="color: var(--gold); margin-right: 6px;"></i> Loading...</span>
        </div>
        <button onclick="closeItinerary()"
          style="width: 40px; height: 40px; border-radius: 50%; background: #eee; border: none; font-size: 18px; color: #555; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: 0.3s;"
          onmouseover="this.style.background='#ddd'" onmouseout="this.style.background='#eee'"><i
            class="fa fa-times"></i></button>
      </div>
      <!-- Body -->
      <div style="padding: 30px; overflow-y: auto; flex: 1; background: white;">
        <div id="modalItineraryList" style="display: flex; flex-direction: column; gap: 0;">
        </div>
      </div>
      <!-- Footer -->
      <div
        style="padding: 20px 30px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; background: #fafafa;">
        <div id="modalPrice" style="font-size: 20px; font-weight: 700; color: var(--dark);"></div>
        <button onclick="openBookingModal()"
          style="background: var(--gold); color: white; border: none; padding: 14px 36px; border-radius: 8px; font-weight: 600; font-size: 16px; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 12px rgba(245,166,35,0.3);"
          onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">Book This
          Tour</button>
      </div>
    </div>
  </div>`;

const functionsJS = `
    function openItinerary(id) {
      const data = itineraries[id];
      document.getElementById('modalTitle').innerText = data.title;
      document.getElementById('modalDuration').innerHTML = '<i class="fa fa-clock" style="color: var(--gold); margin-right: 6px;"></i> ' + data.duration;
      document.getElementById('modalPrice').innerHTML = data.price;

      const list = document.getElementById('modalItineraryList');
      list.innerHTML = data.days.map((d, index) => {
        const isLast = index === data.days.length - 1;
        return \`
          <div style="display: flex; gap: 24px;">
            <div style="flex-shrink: 0; display: flex; flex-direction: column; align-items: center; width: 44px;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid var(--gold); color: var(--gold); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; box-shadow: 0 4px 10px rgba(245,166,35,0.15); z-index: 2;">\${d.day.replace('Day ', '')}</div>
              \${!isLast ? '<div style="width: 2px; height: 100%; background: #eaeaea; margin: 4px 0; min-height: 40px;"></div>' : ''}
            </div>
            <div style="padding-bottom: \${isLast ? '0' : '30px'}; padding-top: 5px;">
              <div style="font-size: 13px; color: var(--gold); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">\${d.day}</div>
              <h4 style="font-size: 20px; color: var(--dark); margin-bottom: 10px; font-family: 'Playfair Display', serif;">\${d.title}</h4>
              <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">\${d.desc}</p>
            </div>
          </div>
        \`;
      }).join('');

      const modal = document.getElementById('itineraryModal');
      modal.style.display = 'flex';
      setTimeout(() => modal.style.opacity = '1', 10);
      document.body.style.overflow = 'hidden';
    }

    function closeItinerary() {
      const modal = document.getElementById('itineraryModal');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    const style = document.createElement('style');
    style.innerHTML = \`
      .itinerary-card:hover .pkg-img { transform: scale(1.05); }
      .itinerary-card:hover { transform: translateY(-8px) !important; box-shadow: 0 12px 30px rgba(0,0,0,0.12) !important; }
    \`;
    document.head.appendChild(style);
`;

for (const [filename, data] of Object.entries(regions)) {
  if (!fs.existsSync(filename)) {
    console.log(`File not found: ${filename}`);
    continue;
  }

  let html = fs.readFileSync(filename, 'utf8');

  // Check if grid already exists to avoid duplicate insertion
  if (html.includes('class="dt-packages"')) {
    console.log(`${filename} already has a grid!`);
    continue;
  }

  let packagesHtml = `
      <!-- Packages Grid Section -->
      <div class="dt-packages container" style="margin-top: 80px; margin-bottom: 80px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 36px; color: var(--dark); margin-bottom: 40px; font-weight: 700;">
          ${data.title}
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px;">
`;
          
  let itinerariesObj = 'const itineraries = {\n';

  data.places.forEach(p => {
    let nights = p.days > 1 ? p.days - 1 : 0;
    
    // For single day (like Properties), don't show nights
    let durationText = p.days === 1 ? '1 Day / 1 Night' : `${p.days} Days / ${nights} Nights`;

    packagesHtml += `
          <!-- Package ${p.id} -->
          <div class="itinerary-card" onclick="openItinerary('${p.id}')"
            style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); cursor: pointer; transition: transform 0.3s ease; border: 1px solid #f0f0f0;">
            <div style="position: relative; height: 220px;">
              <img src="${p.img}" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s ease;" class="pkg-img">
              <div style="position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); color: white; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;">
                <i class="fa fa-clock" style="color: var(--gold); margin-right: 4px;"></i> ${durationText}
              </div>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 10px; color: var(--dark);">${p.name}</h3>
              <p style="font-size: 14px; color: var(--text-light); margin-bottom: 20px;"><i class="fa fa-map-marker-alt" style="color: var(--gold); margin-right: 6px;"></i> ${p.state}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 16px;">
                <span style="font-weight: 700; color: var(--dark); font-size: 18px;">${p.price}</span>
                <span style="color: var(--gold); font-size: 14px; font-weight: 600;">View Details <i class="fa fa-arrow-right" style="margin-left: 4px;"></i></span>
              </div>
            </div>
          </div>
`;

    let daysDesc = [];
    if (p.days === 1) {
      daysDesc.push(`{ day: 'Day 01', title: 'Check In', desc: 'Arrive at your destination and enjoy an exclusive stay. Free time to relax and experience the local surroundings.' }`);
    } else {
      for(let i=1; i<=p.days; i++) {
        if(i === 1) daysDesc.push(`{ day: 'Day 01', title: 'Arrival & Welcome', desc: 'Arrive at the destination. You will be greeted by our representative and transferred to your accommodation in ${p.state}.' }`);
        else if(i === p.days) daysDesc.push(`{ day: 'Day 0${i}', title: 'Departure', desc: 'Enjoy your final breakfast. Check out and transfer for your onward journey.' }`);
        else {
          daysDesc.push(`{ day: 'Day 0${i}', title: 'Explore ${p.name}', desc: 'Enjoy sightseeing and activities around ${p.name}. Evening at leisure.' }`);
        }
      }
    }

    itinerariesObj += `
      '${p.id}': {
        title: '${p.name}',
        duration: '${durationText}',
        price: '${p.price}',
        days: [
          ${daysDesc.join(',\n          ')}
        ]
      },`;
  });

  packagesHtml += `
        </div>
      </div>
`;
  itinerariesObj += '\n    };';

  // Inject into HTML right before FOOTER
  const footerPattern = /<!-- ===== FOOTER ===== -->/i;
  const match = html.match(footerPattern);
  
  if (match) {
      let injection = packagesHtml + '\n' + modalHTML + '\n  <script>\n' + itinerariesObj + '\n' + functionsJS + '\n  </script>\n';
      html = html.substring(0, match.index) + injection + '\n  ' + html.substring(match.index);
      fs.writeFileSync(filename, html);
      console.log(`${filename} successfully injected with its grid and modal!`);
  } else {
      console.log(`Could not find footer in ${filename}`);
  }
}
