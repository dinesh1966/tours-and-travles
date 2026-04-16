const fs = require('fs');

const dataList = [
  { file: 'spiritual-tours.html', name: 'Spiritual', count: '16' },
  { file: 'family-tours.html', name: 'Family', count: '18' },
  { file: 'romantic-tours.html', name: 'Romantic', count: '14' },
  { file: 'europe-tour.html', name: 'Europe', count: '32' },
  { file: 'adventure-tours.html', name: 'Adventure', count: '12' },
  { file: 'cultural-tours.html', name: 'Cultural', count: '15' },
  { file: 'asia-tours.html', name: 'Asia', count: '16' },
  { file: 'beach-tours.html', name: 'Beach', count: '15' },
  { file: 'luxury-tours.html', name: 'Luxury', count: '10' }
];

const template = fs.readFileSync('south-india-tour.html', 'utf8');

dataList.forEach(item => {
  let content = template;
  // Dynamic Replacements manually based on template knowledge
  content = content.replace(/<title>.*?<\/title>/g, `<title>${item.name} Tour Packages - NextTrip Holidays</title>`);
  
  // Breadcrumb replace
  content = content.replace(/India Tour Packages<\/a> <span>»<\/span> <span style="color: #888;">South India Tour Packages/g, `Tour Packages</a> <span>»</span> <span style="color: #888;">${item.name} Packages`);

  // Specific counts and headers replacing
  content = content.replace(/35/g, item.count); // update the big 35 number
  content = content.replace(/South India/g, item.name); // update titles
  
  // Save file
  fs.writeFileSync(item.file, content);
  console.log('Created ' + item.file);
});

// Now let's inject a premium page loader to all HTML files
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
console.log("Added premium loader to " + htmlFiles.length + " files.");
