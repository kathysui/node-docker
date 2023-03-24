const http = require('http');
const fs = require('fs');

const hostname = '0.0.0.0';
const port = 8000;

const pages = ['/Home.html', '/HH-24.html', '/Sagittarius-A.html', '/404.html'];
const css = ['/Home.css', '/HH-24.css', '/Sagittarius-A.css', '/nicepage.css'];
const js = ['/nicepage.js', '/jquery-1.9.1.min.js'];

const server = http.createServer((req, res) => {
  if(req.url == '/') {
    res.writeHead(302, {'Location': 'Home.html'});
    res.end();
  } else if(pages.includes(req.url)) {
    fs.readFile("html"+req.url, function (error, file) {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(file);
    });
  } else if(css.includes(req.url)) {
    fs.readFile("html"+req.url, function (error, file) {
      res.writeHead(200, {"Content-Type": "text/css"});
      res.end(file);
    });
  } else if(js.includes(req.url)) {
    fs.readFile("html"+req.url, function (error, file) {
      res.writeHead(200, {"Content-Type": "text/javascript"});
      res.end(file);
    });
  } else {
    console.log(req.url)
    res.writeHead(302, {'Location': '404.html'});
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

