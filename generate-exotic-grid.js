const fs = require('fs');

const tours = [
  { id: 'pkg1', name: 'Ooty Colonial Heritage & Epigraphy', state: 'Tamil Nadu', img: 'https://images.unsplash.com/photo-1596484552834-6a58f850d18d?w=600', price: '₹4,500', days: 4 },
  { id: 'pkg2', name: 'Munnar Tribal & Cultural Study', state: 'Kerala', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0e9944?w=600', price: '₹3,500', days: 3 },
  { id: 'pkg3', name: 'Palakkad Fort Kalvetu Archives', state: 'Kerala', img: 'https://images.unsplash.com/photo-1582654157770-4965fa28636b?w=600', price: '₹3,500', days: 3 }
];

let baseHtml = fs.readFileSync('index.html', 'utf8');

const navMatch = baseHtml.match(/(<nav class="navbar" id="navbar">[\s\S]*?<\/nav>)/);
const footerMatch = baseHtml.match(/(<footer class="footer">[\s\S]*?<\/footer>)/);

const navHtml = navMatch ? navMatch[0] : '';
const footerHtml = footerMatch ? footerMatch[0] : '';

let packagesHtml = `
  <!-- ===== HERO SECTION ===== -->
  <section class="package-hero"
    style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1596484552834-6a58f850d18d?w=1600&h=600&fit=crop');">
    <div class="package-hero-content">
      <h1>Exotic Student Packages</h1>
      <p>Kalvetu, Culture & Epigraphy Expeditions</p>
    </div>
  </section>

  <!-- ===== BREADCRUMB ===== -->
  <div class="breadcrumb">
    <div class="container">
      <a href="index.html">Home</a>
      <span>/</span>
      <a href="index.html#destinations">Destinations</a>
      <span>/</span>
      <span>Exotic Packages</span>
    </div>
  </div>

  <main style="padding-top: 60px; background: white; min-height: 80vh;">
    <div class="container">
      <div class="dt-header" style="display: flex; justify-content: space-between; align-items: stretch; margin-bottom: 40px;">
        <div class="dt-header-left">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 36px; margin-bottom: 12px; color: var(--dark); font-weight: 700;">
            Featured Batches
          </h2>
        </div>
      </div>
      <div class="dt-packages" style="margin-bottom: 80px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px;">
`;

let itinerariesObj = 'const itineraries = {\n';

tours.forEach(p => {
  const nights = p.days - 1;
  const durationText = `${p.days} Days / ${nights} Nights`;

  packagesHtml += `
          <!-- Package ${p.id} -->
          <div class="itinerary-card" onclick="openItinerary('${p.id}')"
            style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); cursor: pointer; transition: transform 0.3s ease; border: 1px solid #f0f0f0;">
            <div style="position: relative; height: 220px;">
              <img src="${p.img}" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s ease;" class="pkg-img">
              <div style="position: absolute; top: 16px; right: 16px; background: #f39c12; color: white; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;">
                <i class="fa fa-clock" style="color: white; margin-right: 4px;"></i> ${durationText}
              </div>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 10px; color: var(--dark);">${p.name}</h3>
              <p style="font-size: 14px; color: var(--text-light); margin-bottom: 20px;"><i class="fa fa-map-marker-alt" style="color: var(--gold); margin-right: 6px;"></i> ${p.state}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 16px;">
                <span style="font-weight: 700; color: var(--dark); font-size: 18px;">${p.price} <span style="font-size: 13px; font-weight: 400; color: #888;">/ student</span></span>
                <span style="color: var(--gold); font-size: 14px; font-weight: 600;">View Details <i class="fa fa-arrow-right" style="margin-left: 4px;"></i></span>
              </div>
            </div>
          </div>
`;

  let daysDesc = [];
  if (p.name.includes('Ooty')) {
    daysDesc = [
      `{ day: 'Day 01', title: 'Arrival in Ooty & Briefing', desc: 'Settle into the student base camp. Evening lecture on the history of the Nilgiris and British Epigraphy.' }`,
      `{ day: 'Day 02', title: 'Colonial Architecture & Archives', desc: 'Visit historic churches and colonial libraries to examine century-old documents and stones.' }`,
      `{ day: 'Day 03', title: 'Field Walk & Kalvetu Study', desc: 'A guided field study identifying key stone inscriptions left by local communities.' }`,
      `{ day: 'Day 04', title: 'Notes & Departure', desc: 'Final documentation session and morning departure towards the university campus.' }`
    ];
  } else if (p.name.includes('Munnar')) {
    daysDesc = [
      `{ day: 'Day 01', title: 'Munnar Base Camp', desc: 'Arrival. Orientation focusing on the indigenous tribes of the Western Ghats.' }`,
      `{ day: 'Day 02', title: 'Tribal Folklore & Stone Art', desc: 'Engage with local guides to decipher early rock art and tribal kalvetu structures.' }`,
      `{ day: 'Day 03', title: 'Analysis & Return', desc: 'Group presentations of the recorded carvings and return journey.' }`
    ];
  } else if (p.name.includes('Palakkad')) {
    daysDesc = [
      `{ day: 'Day 01', title: 'Palakkad Fort Orientation', desc: 'Arrival and introductory tour inside the fort walls engineered by Hyder Ali.' }`,
      `{ day: 'Day 02', title: 'Kalvetu Documentation', desc: 'Hands-on training in transcribing and documenting the stone inscriptions embedded in the fort structure.' }`,
      `{ day: 'Day 03', title: 'Final Report & Departure', desc: 'Finalizing research logs and departure.' }`
    ];
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
    </div>
  </main>
`;

itinerariesObj += '\n    };';

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
              class="fa fa-clock" style="color: #f39c12; margin-right: 6px;"></i> Loading...</span>
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
          style="background: #f39c12; color: white; border: none; padding: 14px 36px; border-radius: 8px; font-weight: 600; font-size: 16px; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 12px rgba(243,156,18,0.3);"
          onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">Book This
          Batch</button>
      </div>
    </div>
  </div>`;

const bookingModalHTML = `
  <!-- ===== QUICK BOOKING MODAL ===== -->
  <div class="booking-modal-overlay" id="bookingModal">
    <div class="booking-modal-box">
      <button class="close-modal-btn" onclick="closeBookingModal()"><i class="fa fa-times"></i></button>
      <div class="modal-header-premium">
        <h3>Batch <span>Registration</span></h3>
        <p>Register your student batch for the Kalvetu history program.</p>
      </div>
      <form class="modal-booking-form" id="quickBookingForm">
        <div class="modal-form-grid">
          <div class="modal-group">
            <label>Institution Name</label>
            <input type="text" placeholder="College / School" required>
          </div>
          <div class="modal-group">
            <label>Faculty Email</label>
            <input type="email" placeholder="Your Email" required>
          </div>
          <div class="modal-group">
            <label>Phone</label>
            <input type="tel" placeholder="Your Phone" required>
          </div>
          <div class="modal-group">
            <label>Destination</label>
            <input type="text" placeholder="Where to go?" required id="destInput" value="Exotic Student Tour" readonly>
          </div>
        </div>
        <button type="submit" class="modal-submit-btn" style="background: #f39c12; color: white;">Register Batch <i class="fa fa-paper-plane"></i></button>
      </form>
    </div>
  </div>
`;

const functionsJS = `
    function openItinerary(id) {
      const data = itineraries[id];
      document.getElementById('modalTitle').innerText = data.title;
      document.getElementById('modalDuration').innerHTML = '<i class="fa fa-clock" style="color: #f39c12; margin-right: 6px;"></i> ' + data.duration;
      document.getElementById('modalPrice').innerHTML = data.price + ' / student';

      const list = document.getElementById('modalItineraryList');
      list.innerHTML = data.days.map((d, index) => {
        const isLast = index === data.days.length - 1;
        return \`
          <div style="display: flex; gap: 24px;">
            <div style="flex-shrink: 0; display: flex; flex-direction: column; align-items: center; width: 44px;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid #f39c12; color: #f39c12; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; box-shadow: 0 4px 10px rgba(243,156,18,0.15); z-index: 2;">\${d.day.replace('Day ', '')}</div>
              \${!isLast ? '<div style="width: 2px; height: 100%; background: #eaeaea; margin: 4px 0; min-height: 40px;"></div>' : ''}
            </div>
            <div style="padding-bottom: \${isLast ? '0' : '30px'}; padding-top: 5px;">
              <div style="font-size: 13px; color: #f39c12; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">\${d.day}</div>
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
      
      // Auto-update booking form destination based on package
      document.getElementById('destInput').value = data.title;
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

const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exotic Packages - NextTrip</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  ${navHtml}
  ${packagesHtml}
  ${modalHTML}
  ${bookingModalHTML}
  ${footerHtml}

  <script src="script.js"></script>
  <script>
    ${itinerariesObj}
    ${functionsJS}
  </script>
</body>
</html>`;

fs.writeFileSync('exotic-tour.html', finalHtml);
console.log('Rebuilt exotic-tour.html as a multi-package grid.');
