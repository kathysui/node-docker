const express = require('express')
const https = require('https');
const fs = require('fs');

const app = express()
const hostname = '0.0.0.0';
const port = 8000

// const pages = ['/orion.jpg', '/Home.html', '/HH-24.html', '/Sagittarius-A.html', '/404.html', '/Home.css', '/HH-24.css', '/Sagittarius-A.css', '/nicepage.css', '/nicepage.js', '/jquery-1.9.1.min.js'];

app.get('/', (req, res) => {
    res.redirect('/Home.html')
})

app.get('/test.html', (req, res) => {
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
            for (i of msg) {
                fs.readFile(__dirname + "/html/test.html", function (error, file) {
                    res.send(file.toString().replace("%%%%%", i.url));
                });
            }
        });
    });
})

app.get('/counter.html', (req, res) => {
    fs.readFile(__dirname + "/counter", function (error, file) {
        fs.writeFile(__dirname + "/counter", "" + (parseInt(file.toString()) + 1), () => {})
        res.send("<h1> This page has been visited " + file.toString() + " times </h1>");
    });
})

app.get('*.html|css|js|jpg', (req, res) => {
    const path = __dirname + '/html' + req.originalUrl
    if (fs.existsSync(path)) {
        res.sendFile(path);
    } else {
        res.redirect('404.html')
    }
})

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})