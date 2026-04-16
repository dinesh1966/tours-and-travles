const fs = require('fs');

const files = [
  'thailand-tour.html',
  'singapore-tour.html',
  'malaysia-tour.html',
  'bali-tour.html'
];

const properModalHtml = `
  <!-- ===== QUICK BOOKING MODAL ===== -->
  <div class="booking-modal-overlay" id="bookingModal">
    <div class="booking-modal-box">
      <button class="close-modal-btn" onclick="closeBookingModal()"><i class="fa fa-times"></i></button>
      <div class="modal-header-premium">
        <h3>Quick <span>Booking</span></h3>
        <p>Fill in the details below and we'll get back to you shortly.</p>
      </div>
      <form class="modal-booking-form" id="quickBookingForm">
        <div class="modal-form-grid">
          <div class="modal-group">
            <label>Name</label>
            <input type="text" placeholder="Your Name" required>
          </div>
          <div class="modal-group">
            <label>Email</label>
            <input type="email" placeholder="Your Email" required>
          </div>
          <div class="modal-group">
            <label>Phone</label>
            <input type="tel" placeholder="Your Phone" required>
          </div>
          <div class="modal-group">
            <label>Destination</label>
            <input type="text" placeholder="Where to go?" required id="destInput">
          </div>
          <div class="modal-group full">
            <label>Special Instructions</label>
            <textarea rows="3" placeholder="Tell us more..."></textarea>
          </div>
        </div>
        <button type="submit" class="modal-submit-btn">Reserve Now <i class="fa fa-paper-plane"></i></button>
      </form>
    </div>
  </div>`;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');

  // Replace the old bad modal
  const startIdx = content.indexOf('<!-- Booking Modal -->');
  const endIdx = content.indexOf('<script src="script.js"></script>');
  
  if (startIdx !== -1 && endIdx !== -1) {
    let title = file.split('-tour.html')[0];
    title = title.charAt(0).toUpperCase() + title.slice(1);
    
    // Inject the proper modal but with the destination prefilled 
    let customModal = properModalHtml.replace('id="destInput"', `id="destInput" value="${title} Explorer" readonly`);
    
    const newContent = content.substring(0, startIdx) + customModal + '\n\n  ' + content.substring(endIdx);
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
