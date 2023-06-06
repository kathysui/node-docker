const https = require('https');

// https.get('url', response => {});
https.get('https://api.thecatapi.com/v1/images/search', res => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);
    res.on("data", chunk => {
        data.push(chunk);
    });
    // data: "message"
    res.on("end", () => {
        const msg = JSON.parse(Buffer.concat(data).toString());
        console.log(msg);
        for (i of msg) {
            console.log(i.url);
        }
    });
    // end: 
    // i['url']
    /*
    [
        {
            "id": "MjA1OTMwMA",
            "url": "https://cdn2.thecatapi.com/images/MjA1OTMwMA.jpg",
            "width": 500,
            "height": 333
        }
    ]
    */
});