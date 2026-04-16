const fs = require('fs');

const tour = { 
  id: 'exotic-tour.html', 
  title: 'Exotic History Tour', 
  loc: 'Ooty, Munnar & Palakkad', 
  days: '4 Days / 3 Nights', 
  guests: 'Student Batches', 
  price: '₹4,500', 
  img: 'https://images.unsplash.com/photo-1622384918712-ab79cb73b1ff?w=1200' 
};

let template = fs.readFileSync('index.html', 'utf8');

const navMatch = template.match(/(<nav class="navbar" id="navbar">[\s\S]*?<\/nav>)/);
const footerMatch = template.match(/(<footer class="footer">[\s\S]*?<\/footer>)/);

const navHtml = navMatch ? navMatch[0] : '';
const footerHtml = footerMatch ? footerMatch[0] : '';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tour.title} - NextTrip Holidays</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    .single-hero {
      height: 60vh;
      background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${tour.img}') center/cover;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      padding-top: 80px;
    }
    .single-hero h1 {
      font-size: 56px;
      font-family: 'Playfair Display', serif;
      margin-bottom: 20px;
    }
    .single-hero p {
      font-size: 22px;
      font-weight: 300;
    }
    .tour-details-container {
      max-width: 1200px;
      margin: 80px auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 40px;
    }
    .tour-overview h2 {
      font-size: 32px;
      margin-bottom: 20px;
      color: var(--dark);
      font-family: 'Playfair Display', serif;
    }
    .tour-overview p {
      font-size: 16px;
      line-height: 1.8;
      color: #555;
      margin-bottom: 30px;
    }
    .tour-highlights {
      display: flex;
      gap: 20px;
      margin-bottom: 40px;
    }
    .highlight-box {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 12px;
      flex: 1;
      text-align: center;
      border: 1px solid #eee;
    }
    .highlight-box i {
      font-size: 24px;
      color: #8e44ad;
      margin-bottom: 10px;
    }
    .highlight-box h4 {
      font-size: 14px;
      color: #777;
      margin-bottom: 5px;
    }
    .highlight-box p {
      font-size: 18px;
      font-weight: 600;
      color: var(--dark);
      margin: 0;
    }
    .booking-card {
      background: white;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.08);
      position: sticky;
      top: 120px;
    }
    .booking-card h3 {
      font-size: 28px;
      margin-bottom: 10px;
      color: var(--dark);
    }
    .booking-card .price {
      font-size: 36px;
      color: var(--gold);
      font-weight: 700;
      margin-bottom: 30px;
    }
    .booking-card .price span {
      font-size: 16px;
      color: #888;
      font-weight: 400;
    }
    .booking-btn {
      display: block;
      width: 100%;
      padding: 16px;
      background: var(--gold);
      color: white;
      text-align: center;
      border-radius: 8px;
      font-size: 18px;
      font-weight: 600;
      text-decoration: none;
      transition: 0.3s;
      border: none;
      cursor: pointer;
    }
    .booking-btn:hover {
      background: #e5951a;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  ${navHtml}

  <section class="single-hero">
    <div class="container">
      <h1>${tour.title}</h1>
      <p><i class="fa fa-location-dot"></i> ${tour.loc}</p>
    </div>
  </section>

  <div class="tour-details-container">
    <div class="tour-overview">
      <div class="tour-highlights">
        <div class="highlight-box">
          <i class="fa fa-clock"></i>
          <h4>Duration</h4>
          <p>${tour.days}</p>
        </div>
        <div class="highlight-box">
          <i class="fa fa-graduation-cap"></i>
          <h4>Category</h4>
          <p>${tour.guests}</p>
        </div>
        <div class="highlight-box">
          <i class="fa fa-monument"></i>
          <h4>Focus</h4>
          <p>History & Kalvetu</p>
        </div>
      </div>
      
      <h2>Overview</h2>
      <p>Embark on an unforgettable educational journey through the historical landscapes of Ooty, Munnar, and Palakkad. Specially designed for students, this exotic tour focuses intensely on South Indian culture, ancient history, and reading stone inscriptions (Kalvetu) at various monument sites.</p>
      <p>Guided by historians and local experts, students will discover the hidden stories of the past while enjoying the breathtaking altitude and sceneries of the Western Ghats. Discover ancient forts in Palakkad, colonial heritage in Ooty, and historic tribal cultures of Munnar.</p>

      <h2 style="margin-top: 40px;">Daily Itinerary</h2>
      <div style="margin-bottom: 40px; display: flex; flex-direction: column; gap: 0;">
        <div style="display: flex; gap: 24px;">
          <div style="flex-shrink: 0; display: flex; flex-direction: column; align-items: center; width: 44px;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid var(--gold); color: var(--gold); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; box-shadow: 0 4px 10px rgba(245,166,35,0.15); z-index: 2;">1</div>
            <div style="width: 2px; height: 100%; background: #eaeaea; margin: 4px 0; min-height: 40px;"></div>
          </div>
          <div style="padding-bottom: 30px; padding-top: 5px;">
            <div style="font-size: 13px; color: var(--gold); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Day 1</div>
            <h4 style="font-size: 20px; color: var(--dark); margin-bottom: 10px; font-family: 'Playfair Display', serif;">Palakkad Fort & Kalvetu Studies</h4>
            <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">Arrival in Palakkad. Begin the tour with an extensive walk through the historic Palakkad Fort (Tipu's Fort). Students will gather and study the architectural style and document specific stone inscriptions (kalvetu) found in the vicinity.</p>
          </div>
        </div>

        <div style="display: flex; gap: 24px;">
          <div style="flex-shrink: 0; display: flex; flex-direction: column; align-items: center; width: 44px;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid var(--gold); color: var(--gold); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; box-shadow: 0 4px 10px rgba(245,166,35,0.15); z-index: 2;">2</div>
            <div style="width: 2px; height: 100%; background: #eaeaea; margin: 4px 0; min-height: 40px;"></div>
          </div>
          <div style="padding-bottom: 30px; padding-top: 5px;">
            <div style="font-size: 13px; color: var(--gold); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Day 2</div>
            <h4 style="font-size: 20px; color: var(--dark); margin-bottom: 10px; font-family: 'Playfair Display', serif;">Munnar Tribal Culture</h4>
            <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">Drive up to Munnar. Aside from the scenic tea gardens, the focus will be on the ancient tribal settlements of the Western Ghats. Students will have a supervised interaction session to learn about their traditions, folklore, and historic roots.</p>
          </div>
        </div>

        <div style="display: flex; gap: 24px;">
          <div style="flex-shrink: 0; display: flex; flex-direction: column; align-items: center; width: 44px;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid var(--gold); color: var(--gold); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; box-shadow: 0 4px 10px rgba(245,166,35,0.15); z-index: 2;">3</div>
            <div style="width: 2px; height: 100%; background: #eaeaea; margin: 4px 0; min-height: 40px;"></div>
          </div>
          <div style="padding-bottom: 30px; padding-top: 5px;">
            <div style="font-size: 13px; color: var(--gold); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Day 3</div>
            <h4 style="font-size: 20px; color: var(--dark); margin-bottom: 10px; font-family: 'Playfair Display', serif;">Ooty Colonial History</h4>
            <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">Journey to Ooty. Examine the British colonial architecture, historic churches, and the Nilgiri Mountain Railway. A special seminar on colonial-era epigraphy and historic documentation will be held in the evening.</p>
          </div>
        </div>

        <div style="display: flex; gap: 24px;">
          <div style="flex-shrink: 0; display: flex; flex-direction: column; align-items: center; width: 44px;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid var(--gold); color: var(--gold); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; box-shadow: 0 4px 10px rgba(245,166,35,0.15); z-index: 2;">4</div>
          </div>
          <div style="padding-bottom: 0px; padding-top: 5px;">
            <div style="font-size: 13px; color: var(--gold); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Day 4</div>
            <h4 style="font-size: 20px; color: var(--dark); margin-bottom: 10px; font-family: 'Playfair Display', serif;">Field Notes & Departure</h4>
            <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">Compile field notes and group presentations over breakfast. Depart Ooty with a wealth of historical knowledge and unforgettable memories.</p>
          </div>
        </div>
      </div>
      
      <h2>What's Included</h2>
      <ul style="list-style: none; padding: 0; line-height: 2;">
        <li><i class="fa fa-check-circle" style="color: #27ae60; margin-right: 10px;"></i> Student Dorm/Hostel Accommodation</li>
        <li><i class="fa fa-check-circle" style="color: #27ae60; margin-right: 10px;"></i> 3 Meals Daily included</li>
        <li><i class="fa fa-check-circle" style="color: #27ae60; margin-right: 10px;"></i> Expert Historian Guide</li>
        <li><i class="fa fa-check-circle" style="color: #27ae60; margin-right: 10px;"></i> Entry to all Monuments & Forts</li>
      </ul>
    </div>
    
    <div class="tour-booking-sidebar">
      <div class="booking-card">
        <h3>Book This Tour</h3>
        <p style="color: #666; margin-bottom: 20px;">Register your student batch.</p>
        <div class="price">${tour.price} <span>/ student</span></div>
        <button class="booking-btn" onclick="openBookingModal()">Book Now</button>
      </div>
    </div>
  </div>

  ${footerHtml}

  <!-- ===== QUICK BOOKING MODAL ===== -->
  <div class="booking-modal-overlay" id="bookingModal">
    <div class="booking-modal-box">
      <button class="close-modal-btn" onclick="closeBookingModal()"><i class="fa fa-times"></i></button>
      <div class="modal-header-premium">
        <h3>Quick <span>Booking</span></h3>
        <p>Register your student batch details below.</p>
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
            <input type="text" placeholder="Where to go?" required id="destInput" value="Exotic History Tour" readonly>
          </div>
          <div class="modal-group full">
            <label>Special Instructions</label>
            <textarea rows="3" placeholder="Tell us more about the curriculum focus..."></textarea>
          </div>
        </div>
        <button type="submit" class="modal-submit-btn">Reserve Now <i class="fa fa-paper-plane"></i></button>
      </form>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>`;

fs.writeFileSync(tour.id, html);
console.log('Created ' + tour.id);
