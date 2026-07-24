// Post-build: ensure /jelly.js is in the Cloudflare _redirects whitelist
// before the catch-all /* → /Visit/ rule swallows it.
const fs = require('fs');
const path = 'Target/_redirects';
let content = fs.readFileSync(path, 'utf8');
if (!content.includes('/jelly.js')) {
  content = content.replace(
    '/robots.txt',
    '/jelly.js                 /jelly.js                 200\n/robots.txt'
  );
  fs.writeFileSync(path, content);
  console.log('Injected /jelly.js into _redirects');
}
