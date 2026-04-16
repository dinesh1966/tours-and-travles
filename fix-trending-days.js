const fs = require('fs');

const tours = {
  'thailand-tour.html': { 
      name: 'Thailand Explorer',
      days: [
        { day: 'Day 1', title: 'Arrival in Bangkok', desc: 'Welcome to Thailand! Upon arrival at the airport, our representative will transfer you to your premium hotel in Bangkok. Spend the evening resting or exploring local markets.' },
        { day: 'Day 2', title: 'Bangkok City Tour', desc: 'After breakfast, embark on a guided city tour visiting iconic temples like Wat Arun and Wat Phra Kaew. Evening at leisure.' },
        { day: 'Day 3', title: 'Transfer to Phuket', desc: 'Take a short flight to Phuket. Check into your beachside resort and enjoy the sunset by the ocean.' },
        { day: 'Day 4', title: 'Phi Phi Island Tour', desc: 'Set sail on a speedboat to the stunning Phi Phi Islands. Enjoy snorkeling, swimming, and a beachside lunch.' },
        { day: 'Day 5', title: 'Departure', desc: 'Enjoy your final breakfast before transferring to the airport for your journey home.' }
      ]
  },
  'singapore-tour.html': {
      name: 'Singapore Dream',
      days: [
        { day: 'Day 1', title: 'Welcome to Singapore', desc: 'Arrive in Singapore and check into your luxury hotel. Enjoy an evening stroll around the vibrant Marina Bay area.' },
        { day: 'Day 2', title: 'City & Gardens by the Bay', desc: 'Explore the modern marvels of Singapore, including a detailed tour of the flower dome and cloud forest at Gardens by the Bay.' },
        { day: 'Day 3', title: 'Sentosa Island Adventure', desc: 'A full day of fun at Sentosa Island, including Universal Studios, the S.E.A Aquarium, and beautiful beaches.' },
        { day: 'Day 4', title: 'Cultural Immersion', desc: 'Visit Little India and Chinatown to experience the diverse culture and delicious local cuisines of the island.' },
        { day: 'Day 5', title: 'Departure', desc: 'Free morning for shopping before your transfer to Changi Airport.' }
      ]
  },
  'malaysia-tour.html': {
      name: 'Malaysia Getaway',
      days: [
        { day: 'Day 1', title: 'Arrival in Kuala Lumpur', desc: 'Transfer to your city-center hotel. Evening visit to the iconic Petronas Twin Towers and KLCC Park.' },
        { day: 'Day 2', title: 'Batu Caves & Langkawi', desc: 'Morning tour of the majestic Batu Caves. In the afternoon, take a quick flight to the beautiful island of Langkawi.' },
        { day: 'Day 3', title: 'Departure', desc: 'Enjoy the sandy beaches of Langkawi before checking out and heading to the airport.' }
      ]
  },
  'bali-tour.html': {
      name: 'Bali Paradise',
      days: [
        { day: 'Day 1', title: 'Tropical Welcome', desc: 'Arrive in Bali and transfer to your stunning villa. Relax and unwind from your travels.' },
        { day: 'Day 2', title: 'Ubud Cultural Tour', desc: 'Visit the cultural heart of Bali. Explore the Monkey Forest, Tegalalang Rice Terraces, and traditional art markets.' },
        { day: 'Day 3', title: 'Beach & Temple Tour', desc: 'Spend the morning at Seminyak Beach. In the evening, witness the breathtaking sunset at Uluwatu Temple.' },
        { day: 'Day 4', title: 'Departure', desc: 'Enjoy a leisurely breakfast before heading to the airport.' }
      ]
  }
};

for (const [filename, data] of Object.entries(tours)) {
  if (!fs.existsSync(filename)) continue;
  
  let content = fs.readFileSync(filename, 'utf8');
  
  // Create itinerary HTML
  let itineraryHtml = '<h2 style="margin-top: 40px;">Daily Itinerary</h2>\n<div style="margin-bottom: 40px; display: flex; flex-direction: column; gap: 0;">\n';
  
  data.days.forEach((d, index) => {
    const isLast = index === data.days.length - 1;
    itineraryHtml += `
          <div style="display: flex; gap: 24px;">
            <div style="flex-shrink: 0; display: flex; flex-direction: column; align-items: center; width: 44px;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid var(--gold); color: var(--gold); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; box-shadow: 0 4px 10px rgba(245,166,35,0.15); z-index: 2;">${d.day.replace('Day ', '')}</div>
              ${!isLast ? '<div style="width: 2px; height: 100%; background: #eaeaea; margin: 4px 0; min-height: 40px;"></div>' : ''}
            </div>
            <div style="padding-bottom: ${isLast ? '0' : '30px'}; padding-top: 5px;">
              <div style="font-size: 13px; color: var(--gold); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">${d.day}</div>
              <h4 style="font-size: 20px; color: var(--dark); margin-bottom: 10px; font-family: 'Playfair Display', serif;">${d.title}</h4>
              <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">${d.desc}</p>
            </div>
          </div>
`;
  });
  itineraryHtml += '</div>\n';

  // Find where to inject (Right before "<h2>What's Included</h2>")
  const targetStr = "<h2>What's Included</h2>";
  if (content.includes(targetStr) && !content.includes('Daily Itinerary')) {
    content = content.replace(targetStr, itineraryHtml + '      ' + targetStr);
    fs.writeFileSync(filename, content, 'utf8');
    console.log('Injected itinerary into ' + filename);
  } else {
    console.log('Skipped ' + filename + ' (Already has itinerary or missing target)');
  }
}
