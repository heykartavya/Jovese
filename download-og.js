const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream('public/og-image.jpg');
https.get('https://placehold.co/1200x630/2563eb/white.jpg?text=Jovese', function(response) {
  response.pipe(file);
});
