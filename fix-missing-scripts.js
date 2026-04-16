const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (path.extname(file) === '.html') {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes('script.js')) {
      console.log(`Fixing ${file}...`);
      // Insert script tag before </head>
      if (content.includes('</head>')) {
        content = content.replace('</head>', '  <script src="script.js" defer></script>\n</head>');
        fs.writeFileSync(filePath, content);
      } else {
        console.warn(`Could not find </head> in ${file}`);
      }
    } else {
      console.log(`${file} already has script.js`);
    }
  }
});
