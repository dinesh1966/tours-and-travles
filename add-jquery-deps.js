const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const jqueryTag = '  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js"></script>';

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // If it has script.js but no jquery
    if (content.includes('script.js') && !content.includes('jquery-')) {
        console.log(`Adding jQuery to ${file}`);
        
        // Insert before script.js
        content = content.replace(/<script src="script\.js"/, (match) => {
            return jqueryTag + '\n  ' + match;
        });
        
        fs.writeFileSync(file, content);
    }
});
