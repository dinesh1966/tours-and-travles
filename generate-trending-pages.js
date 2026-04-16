const fs = require('fs');

const tours = [
  { id: 'thailand-tour.html', title: 'Thailand Explorer', loc: 'Bangkok, Phuket', days: '5 Days / 4 Nights', guests: '12 Guests', price: '₹3,000', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200' },
  { id: 'singapore-tour.html', title: 'Singapore Dream', loc: 'Singapore City', days: '5 Days / 4 Nights', guests: '10 Guests', price: '₹850', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200' },
  { id: 'malaysia-tour.html', title: 'Malaysia Getaway', loc: 'Kuala Lumpur, Langkawi', days: '3 Days / 2 Nights', guests: '8 Guests', price: '₹1,200', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200' },
  { id: 'bali-tour.html', title: 'Bali Paradise', loc: 'Bali, Indonesia', days: '4 Days / 3 Nights', guests: '14 Guests', price: '$700', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=1200' }
];

let template = fs.readFileSync('index.html', 'utf8');

// We will extract navbar and footer
const navMatch = template.match(/(<nav class="navbar" id="navbar">[\s\S]*?<\/nav>)/);
const footerMatch = template.match(/(<footer class="footer">[\s\S]*?<\/footer>)/);

const navHtml = navMatch ? navMatch[0] : '';
const footerHtml = footerMatch ? footerMatch[0] : '';

tours.forEach(tour => {
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
      color: var(--gold);
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
          <i class="fa fa-users"></i>
          <h4>Group Size</h4>
          <p>${tour.guests}</p>
        </div>
        <div class="highlight-box">
          <i class="fa fa-map-marked-alt"></i>
          <h4>Locations</h4>
          <p>${tour.loc}</p>
        </div>
      </div>
      
      <h2>Overview</h2>
      <p>Embark on an unforgettable journey to ${tour.title}. This carefully curated package is designed to offer you the perfect blend of leisure, adventure, and cultural immersion. From pristine beaches to bustling city centers, experience the magic of ${tour.loc} in absolute comfort and style.</p>
      <p>Our expert guides and premium accommodations ensure that every moment of your ${tour.days.split(' ')[0]}-day trip is nothing short of spectacular. Book now to secure your spot on this trending adventure.</p>
      
      <h2>What's Included</h2>
      <ul style="list-style: none; padding: 0; line-height: 2;">
        <li><i class="fa fa-check-circle" style="color: #27ae60; margin-right: 10px;"></i> Premium Accommodation</li>
        <li><i class="fa fa-check-circle" style="color: #27ae60; margin-right: 10px;"></i> Daily Breakfast & Selected Meals</li>
        <li><i class="fa fa-check-circle" style="color: #27ae60; margin-right: 10px;"></i> Expert Local Guide</li>
        <li><i class="fa fa-check-circle" style="color: #27ae60; margin-right: 10px;"></i> Airport Transfers</li>
      </ul>
    </div>
    
    <div class="tour-booking-sidebar">
      <div class="booking-card">
        <h3>Book This Tour</h3>
        <p style="color: #666; margin-bottom: 20px;">Secure your spot instantly.</p>
        <div class="price">${tour.price} <span>/ person</span></div>
        <button class="booking-btn" onclick="openBookingModal()">Book Now</button>
      </div>
    </div>
  </div>

  ${footerHtml}

  <!-- Booking Modal -->
  <div class="booking-modal" id="bookingModal">
    <div class="modal-content">
      <button class="close-modal" onclick="closeBookingModal()"><i class="fa fa-times"></i></button>
      <div class="modal-header">
        <h3>Book Your Dream Trip</h3>
        <p>Fill out the form below to secure your spot for ${tour.title}.</p>
      </div>
      <form class="booking-form" onsubmit="event.preventDefault(); alert('Booking Request Sent for ${tour.title}!'); closeBookingModal();">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" required>
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" required>
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="Enter your phone" required>
        </div>
        <div class="form-group">
          <label>Number of Guests</label>
          <input type="number" min="1" max="20" placeholder="1" required>
        </div>
        <div class="form-group">
          <label>Travel Date</label>
          <input type="date" required>
        </div>
        <button type="submit" class="submit-btn">Confirm Booking</button>
      </form>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>`;

  fs.writeFileSync(tour.id, html);
  console.log('Created ' + tour.id);
});
