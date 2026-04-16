const fs = require('fs');

const parentFiles = [
  'boat-houses.html',
  'international-packages.html',
  'properties.html'
];

let baseTemplate = fs.readFileSync('south-india-tour.html', 'utf8');

parentFiles.forEach(parentFile => {
  let content = fs.readFileSync(parentFile, 'utf8');
  
  // We need to replace the cards and also extract the data to build child pages.
  // Regex to match the card and its content.
  // Example:
  // <div class="tour-type-card" style="background-image: url('...');">
  //   <div class="tour-type-content">
  //     <h3>Beach Villas</h3>
  //     <span class="tour-count">32 TOURS</span>
  //   </div>
  // </div>
  
  // We will replace <span class="tour-count">32 TOURS</span> with <a href="..." class="tour-count">32 TOURS</a>
  // And maybe add onclick to the card.
  
  const regex = /<div class="tour-type-card"(.*?)>\s*<div class="tour-type-content">\s*<h3>(.*?)<\/h3>\s*<span class="tour-count">(.*?)<\/span>/g;
  
  let newContent = content.replace(regex, (match, cardProps, title, countStr) => {
    // Generate slug from title
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.html';
    
    // Create the child page using template
    let countInt = countStr.replace(/[^0-9]/g, '');
    let childContent = baseTemplate.replace(/<title>.*?<\/title>/g, `<title>${title} Packages - NextTrip Holidays</title>`);
    childContent = childContent.replace(/India Tour Packages<\/a> <span>»<\/span> <span style="color: #888;">South India Tour Packages/g, `Tour Packages</a> <span>»</span> <span style="color: #888;">${title} Packages`);
    childContent = childContent.replace(/35/g, countInt); // update big number
    childContent = childContent.replace(/South India/g, title); // update titles
    
    fs.writeFileSync(slug, childContent);
    console.log('Generated sub-page:', slug);
    
    // return modified HTML for parent
    // remove any existing onclick if present to avoid duplication, then add new
    let cleanProps = cardProps.replace(/onclick=".*?"/, '');
    return `<div class="tour-type-card" onclick="window.location.href='${slug}'"${cleanProps}>\n          <div class="tour-type-content">\n            <h3>${title}</h3>\n            <a href="${slug}" class="tour-count">${countStr}</a>`;
  });
  
  fs.writeFileSync(parentFile, newContent);
  console.log('Updated parent file:', parentFile);
});

// Just to be safe, let's inject the loader into ANY newly created html files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const loaderHTML = `
  <!-- Premium Page Loader -->
  <style>
    #premiumLoader {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: var(--dark);
      z-index: 999999;
      display: flex; justify-content: center; align-items: center;
      transition: opacity 0.8s cubic-bezier(0.8, 0, 0.2, 1), transform 0.8s cubic-bezier(0.8, 0, 0.2, 1);
    }
    #premiumLoader.fade-out {
      opacity: 0;
      transform: translateY(-100%);
      pointer-events: none;
    }
    .loader-ring {
      width: 60px; height: 60px;
      border: 3px solid rgba(245,166,35, 0.2);
      border-top: 3px solid var(--gold);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    .body-loaded main, .body-loaded section {
      animation: smoothFadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    @keyframes smoothFadeUp {
      0% { opacity: 0; transform: translateY(30px); filter: blur(4px); }
      100% { opacity: 1; transform: translateY(0); filter: blur(0); }
    }
  </style>
  <div id="premiumLoader"><div class="loader-ring"></div></div>
  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loader = document.getElementById('premiumLoader');
        if(loader) loader.classList.add('fade-out');
        document.body.classList.add('body-loaded');
      }, 400); // Small delay to appreciate the loader
    });
    
    // Add page exit transitions for links
    document.querySelectorAll('a').forEach(link => {
       if(link.target !== '_blank' && link.href && link.href.indexOf('#') === -1) {
          link.addEventListener('click', (e) => {
             const loader = document.getElementById('premiumLoader');
             if(loader) {
                e.preventDefault();
                loader.style.transition = 'opacity 0.4s ease'; // fast fade-in
                loader.style.transform = 'translateY(0)';
                loader.style.opacity = '1';
                setTimeout(() => window.location = link.href, 400);
             }
          });
       }
    });
  </script>
`;

htmlFiles.forEach(file => {
  let cnt = fs.readFileSync(file, 'utf8');
  if(!cnt.includes('id="premiumLoader"')) {
     cnt = cnt.replace('</head>', loaderHTML + '\n</head>');
     fs.writeFileSync(file, cnt);
  }
});
console.log('Ensured premium loader everywhere.');
