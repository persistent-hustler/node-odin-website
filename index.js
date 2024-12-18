const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
     let filePath;
     if (req.url === '/') {
        filePath = path.join(__dirname, 'index.html');
     } else if(req.url === '/about'){
         filePath = path.join(__dirname, 'about.html');
     }else if(req.url === '/contact-me'){
         filePath = path.join(__dirname, 'contact-me.html');
     } else {
         filePath = path.join(__dirname, '404.html');
         res.statusCode = 404;
     }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        // If there was an error loading the file for 404
        // We can serve a simple message or a 500 error page
       console.error("Error loading file", err);
       res.writeHead(500, { 'Content-Type': 'text/plain' });
       res.end('Internal Server Error');

        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' }); // Tell the browser we are serving HTML
      res.end(content);
    });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});