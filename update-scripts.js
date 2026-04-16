const fs = require('fs');

const files = [
  'south-india-tour.html',
  'north-india-tour.html',
  'east-india-tour.html',
  'west-india-tour.html',
  'north-east-india-tour.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('id="itineraryModal"')) {
    console.log('Skipping ' + file);
    return;
  }

  const regionNameMatch = content.match(/<title>(.*?) Tour Packages/);
  const regionName = regionNameMatch ? regionNameMatch[1] : 'India';

  let packagesGridHTML = `
      <!-- Packages Grid Section -->
      <div class="dt-packages" style="margin-top: 80px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 36px; color: var(--dark); margin-bottom: 40px; font-weight: 700;">${regionName} Packages & Itineraries</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px;">
          
          <!-- Package 1 -->
          <div class="itinerary-card" onclick="openItinerary('pkg1')" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); cursor: pointer; transition: transform 0.3s ease; border: 1px solid #f0f0f0;">
            <div style="position: relative; height: 220px;">
              <img src="https://images.unsplash.com/photo-1593693397690-362cb9666fca?w=600" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s ease;" class="pkg-img">
              <div style="position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); color: white; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;"><i class="fa fa-clock" style="color: var(--gold); margin-right: 4px;"></i> 5 Days / 4 Nights</div>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 10px; color: var(--dark);">Magical ${regionName}</h3>
              <p style="font-size: 14px; color: var(--text-light); margin-bottom: 20px;"><i class="fa fa-map-marker-alt" style="color: var(--gold); margin-right: 6px;"></i> Premium Sightseeing & Stay</p>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 16px;">
                <span style="font-weight: 700; color: var(--dark); font-size: 18px;">₹ 18,500 <span style="font-size: 13px; font-weight: 400; color: #888;">/ pax</span></span>
                <span style="color: var(--gold); font-size: 14px; font-weight: 600;">View Details <i class="fa fa-arrow-right" style="margin-left: 4px;"></i></span>
              </div>
            </div>
          </div>
          
          <!-- Package 2 -->
          <div class="itinerary-card" onclick="openItinerary('pkg2')" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); cursor: pointer; transition: transform 0.3s ease; border: 1px solid #f0f0f0;">
            <div style="position: relative; height: 220px;">
              <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s ease;" class="pkg-img">
              <div style="position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); color: white; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;"><i class="fa fa-clock" style="color: var(--gold); margin-right: 4px;"></i> 4 Days / 3 Nights</div>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 10px; color: var(--dark);">Heart of ${regionName}</h3>
              <p style="font-size: 14px; color: var(--text-light); margin-bottom: 20px;"><i class="fa fa-map-marker-alt" style="color: var(--gold); margin-right: 6px;"></i> Core Cultural Experience</p>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 16px;">
                <span style="font-weight: 700; color: var(--dark); font-size: 18px;">₹ 14,200 <span style="font-size: 13px; font-weight: 400; color: #888;">/ pax</span></span>
                <span style="color: var(--gold); font-size: 14px; font-weight: 600;">View Details <i class="fa fa-arrow-right" style="margin-left: 4px;"></i></span>
              </div>
            </div>
          </div>
          
          <!-- Package 3 -->
          <div class="itinerary-card" onclick="openItinerary('pkg3')" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); cursor: pointer; transition: transform 0.3s ease; border: 1px solid #f0f0f0;">
            <div style="position: relative; height: 220px;">
              <img src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s ease;" class="pkg-img">
              <div style="position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); color: white; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;"><i class="fa fa-clock" style="color: var(--gold); margin-right: 4px;"></i> 7 Days / 6 Nights</div>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 10px; color: var(--dark);">${regionName} Wonders</h3>
              <p style="font-size: 14px; color: var(--text-light); margin-bottom: 20px;"><i class="fa fa-map-marker-alt" style="color: var(--gold); margin-right: 6px;"></i> Extended Grand Tour</p>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 16px;">
                <span style="font-weight: 700; color: var(--dark); font-size: 18px;">₹ 28,000 <span style="font-size: 13px; font-weight: 400; color: #888;">/ pax</span></span>
                <span style="color: var(--gold); font-size: 14px; font-weight: 600;">View Details <i class="fa fa-arrow-right" style="margin-left: 4px;"></i></span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
`;

  let modalHTML = `
  <!-- Itinerary Modal -->
  <div class="itinerary-modal" id="itineraryModal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(5px); z-index: 10000; justify-content: center; align-items: center; padding: 20px; box-sizing: border-box;">
    <div class="modal-content" style="background: white; width: 100%; max-width: 750px; max-height: 85vh; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 20px 50px rgba(0,0,0,0.3); animation: fadeUp 0.4s ease;">
      
      <!-- Header -->
      <div style="padding: 24px 30px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; background: #fafafa;">
        <div>
          <h2 id="modalTitle" style="font-family: 'Playfair Display', serif; font-size: 28px; margin-bottom: 6px; color: var(--dark);">Tour Itinerary</h2>
          <span id="modalDuration" style="font-size: 14px; color: var(--text-light); font-weight: 500;"><i class="fa fa-clock" style="color: var(--gold); margin-right: 6px;"></i> Loading...</span>
        </div>
        <button onclick="closeItinerary()" style="width: 40px; height: 40px; border-radius: 50%; background: #eee; border: none; font-size: 18px; color: #555; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: 0.3s;" onmouseover="this.style.background='#ddd'" onmouseout="this.style.background='#eee'"><i class="fa fa-times"></i></button>
      </div>
      
      <!-- Body -->
      <div style="padding: 30px; overflow-y: auto; flex: 1; background: white;">
        <div id="modalItineraryList" style="display: flex; flex-direction: column; gap: 0;">
          <!-- Day items injected here via JS -->
        </div>
      </div>
      
      <!-- Footer -->
      <div style="padding: 20px 30px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; background: #fafafa;">
        <div id="modalPrice" style="font-size: 20px; font-weight: 700; color: var(--dark);"></div>
        <button style="background: var(--gold); color: white; border: none; padding: 14px 36px; border-radius: 8px; font-weight: 600; font-size: 16px; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 12px rgba(245,166,35,0.3);" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">Book This Tour</button>
      </div>
    </div>
  </div>
`;

  let scriptsHTML = `
  <script>
    const itineraries = {
      'pkg1': {
        title: 'Magical ${regionName}',
        duration: '5 Days / 4 Nights',
        price: '₹ 18,500 <span style="font-size:14px; font-weight:normal; color:#888">/ pax</span>',
        days: [
          { day: 'Day 01', title: 'Arrival & Welcome', desc: 'Arrive at the destination airport or railway station. You will be greeted by our representative and transferred to your premium hotel. Spend the afternoon relaxing or exploring local markets.' },
          { day: 'Day 02', title: 'Local Sightseeing', desc: 'After breakfast, embark on a full-day guided city tour. Visit iconic cultural landmarks, ancient monuments, and scenic viewpoints that define the beauty of ${regionName}.' },
          { day: 'Day 03', title: 'Nature & Adventure', desc: 'Travel to the countryside to experience local nature. Whether it is hills, backwaters, or deserts, today is about breathtaking landscapes and optional adventure activities.' },
          { day: 'Day 04', title: 'Heritage Walk & Leisure', desc: 'Immerse yourself in the local heritage with a guided walk through historical districts. The evening is free for shopping and trying authentic regional cuisine.' },
          { day: 'Day 05', title: 'Departure', desc: 'Enjoy your final breakfast at the hotel. Check out and transfer to the airport or railway station for your onward journey with beautiful memories.' }
        ]
      },
      'pkg2': {
        title: 'Heart of ${regionName}',
        duration: '4 Days / 3 Nights',
        price: '₹ 14,200 <span style="font-size:14px; font-weight:normal; color:#888">/ pax</span>',
        days: [
          { day: 'Day 01', title: 'Arrival & Check-in', desc: 'Welcome to ${regionName}. Transfer to the hotel and rest. Evening stroll along the popular local streets.' },
          { day: 'Day 02', title: 'Core Monuments Tour', desc: 'Visit the most famous landmarks. Enjoy a detailed historic tour followed by a traditional lunch.' },
          { day: 'Day 03', title: 'Cultural Immersion', desc: 'Experience local art forms, visit a museum, and enjoy an evening cultural performance.' },
          { day: 'Day 04', title: 'Happy Departure', desc: 'Morning at leisure. Afternoon transfer to the airport.' }
        ]
      },
      'pkg3': {
        title: '${regionName} Wonders',
        duration: '7 Days / 6 Nights',
        price: '₹ 28,000 <span style="font-size:14px; font-weight:normal; color:#888">/ pax</span>',
        days: [
          { day: 'Day 01', title: 'Grand Welcome', desc: 'VIP pickup and transfer to a luxury resort. Relax and unwind.' },
          { day: 'Day 02', title: 'City Wonders', desc: 'Explore the urban marvels and towering monuments of the city.' },
          { day: 'Day 03', title: 'Journey to the Hills', desc: 'Take a scenic drive to the highest peak in the region. Check-in to a hill-station resort.' },
          { day: 'Day 04', title: 'Nature Safari', desc: 'Early morning wildlife safari or nature walk to spot exotic local flora and fauna.' },
          { day: 'Day 05', title: 'Coastal Retreat', desc: 'Travel down to the relaxing beaches or riverfront. Sunset cruise included.' },
          { day: 'Day 06', title: 'Leisure Day', desc: 'A completely free day to use the resort amenities, get a spa treatment, or shop.' },
          { day: 'Day 07', title: 'Farewell', desc: 'Departure after breakfast with a grand souvenir from NextTrip Holidays.' }
        ]
      }
    };

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
    
    // Custom hover CSS for cards
    const style = document.createElement('style');
    style.innerHTML = \`
      .itinerary-card:hover .pkg-img { transform: scale(1.05); }
      .itinerary-card:hover { transform: translateY(-8px) !important; box-shadow: 0 12px 30px rgba(0,0,0,0.12) !important; }
    \`;
    document.head.appendChild(style);
  </script>
`;

  content = content.replace('<!-- Info section -->', packagesGridHTML + '\n      <!-- Info section -->');
  content = content.replace('</body>', modalHTML + scriptsHTML + '\n</body>');

  fs.writeFileSync(file, content);
  console.log('Updated ' + file + ' with Grid and Modal');
});
