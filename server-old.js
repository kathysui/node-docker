
const http = require('http');
const https = require('https');
const fs = require('fs');

const hostname = '0.0.0.0';
const port = 8000;

const pages = ['/Home.html', '/HH-24.html', '/Sagittarius-A.html', '/404.html'];
const css = ['/Home.css', '/HH-24.css', '/Sagittarius-A.css', '/nicepage.css'];
const js = ['/nicepage.js', '/jquery-1.9.1.min.js'];

const server = http.createServer((req, res) => {
  if (req.url == '/') {
    res.writeHead(302, { 'Location': 'Home.html' });
    res.end();
  } else if (req.url == '/test.html') {
    https.get('https://api.thecatapi.com/v1/images/search', res2 => {
      let data = [];
      const headerDate = res2.headers && res2.headers.date ? res2.headers.date : 'no response date';
      console.log('Status Code:', res2.statusCode);
      console.log('Date in Response header:', headerDate);
      res2.on("data", chunk => {
        data.push(chunk);
      });
      res2.on("end", () => {
        const msg = JSON.parse(Buffer.concat(data).toString());
        console.log(msg);
        for (i of msg) {
          console.log(i.url);
          fs.readFile("html/test.html", function (error, file) {
            res.writeHead(200, { "Content-Type": "text/html" });
            console.log(file.toString().replace("%%%%%", i.url));
            res.end(file.toString().replace("%%%%%", i.url));
          });
        }
      });
    });
  } else if (pages.includes(req.url)) {
    fs.readFile("html" + req.url, function (error, file) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(file);
    });
  } else if (css.includes(req.url)) {
    fs.readFile("html" + req.url, function (error, file) {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(file);
    });
  } else if (js.includes(req.url)) {
    fs.readFile("html" + req.url, function (error, file) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(file);
    });
  } else {
    console.log(req.url)
    res.writeHead(302, { 'Location': '404.html' });
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

